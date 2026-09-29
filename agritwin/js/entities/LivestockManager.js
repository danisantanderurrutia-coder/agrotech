/**
 * AgriTwin - LivestockManager Module
 * 
 * Implements:
 *  - Pastoreo Racional Voisin (PRV) con 8 Potreros Subdivididos (P1 a P8)
 *  - Ubicaciones georreferenciadas requeridas por el usuario:
 *      * Vacas en la esquina Sur-Oeste (x: -34, z: 36)
 *      * Ovejas en el Centro-Oeste (x: -29, z: 4)
 *      * Gallinas y Egg Mobile al Nor-Este del predio (x: 6, z: -2), despejadas de los paneles solares
 *      * Abrevadero móvil acorde a la red hidráulica (x: -22, z: 18)
 *      * Caballos chilenos sueltos y libres en la pradera (x: 16 a 24, z: 20 a 28)
 *  - Animales interactivos: clic abre su ficha técnica con edición en vivo (Nombre, Caravana, Peso, Raza, Salud, Notas)
 *  - Herramienta de Reubicación 3D en Terreno (clic para mover a cualquier punto adaptado a cota DEM)
 *  - Animación procedural de pastoreo (cabeceo, colas, picoteo)
 */

import { bus } from '../utils/EventBus.js';

export class LivestockManager {
  constructor(mapManager) {
    this.mapManager = mapManager;
    this.scene = mapManager.scene;
    this.group = new THREE.Group();
    this.group.name = 'livestockGroup';
    this.scene.add(this.group);

    this.visible = true;
    this.paddockMeshes = [];

    // Grupos 3D por especie
    this.cowsGroup = new THREE.Group();
    this.sheepGroup = new THREE.Group();
    this.coopGroup = new THREE.Group();
    this.horsesGroup = new THREE.Group();
    this.waterTroughGroup = new THREE.Group();

    this.group.add(this.cowsGroup);
    this.group.add(this.sheepGroup);
    this.group.add(this.coopGroup);
    this.group.add(this.horsesGroup);
    this.group.add(this.waterTroughGroup);

    // Estado interactivo de reubicación
    this.relocatingAnimalId = null;
    this.placementRing = null;

    // Estado Inicial PRV
    this.activePaddockId = 'P3';
    this.coopPaddockId = 'P8';

    // 8 Potreros PRV distribuidos estratégicamente
    this.paddocks = [
      { id: 'P1', name: 'Potrero 1 - Trébol Blanco & Festuca', x: -34, z: 28, w: 7, d: 7, restDays: 44, forrajeCm: 24, kgMsHa: 2850, status: 'ready' },
      { id: 'P2', name: 'Potrero 2 - Alfalfa & Raygrass Perenne', x: -26, z: 28, w: 7, d: 7, restDays: 41, forrajeCm: 22, kgMsHa: 2600, status: 'ready' },
      { id: 'P3', name: 'Potrero 3 - Pastura Sur-Oeste (Vacas Activo)', x: -34, z: 36, w: 7.5, d: 7.5, restDays: 1, forrajeCm: 25, kgMsHa: 3100, status: 'active' },
      { id: 'P4', name: 'Potrero 4 - Silvopastoreo Borde Cerezos', x: -26, z: 36, w: 7, d: 7, restDays: 32, forrajeCm: 18, kgMsHa: 1950, status: 'resting' },
      { id: 'P5', name: 'Potrero 5 - Trébol Subterráneo & Dáctilo (Ovejas)', x: -29, z: 4, w: 8, d: 7, restDays: 24, forrajeCm: 16, kgMsHa: 1750, status: 'resting' },
      { id: 'P6', name: 'Potrero 6 - Pradera Regenerativa Este', x: 16, z: 9, w: 6.5, d: 6.5, restDays: 16, forrajeCm: 12, kgMsHa: 1250, status: 'resting' },
      { id: 'P7', name: 'Potrero 7 - Franja de Infiltración Sur', x: 18, z: 24, w: 8, d: 6.5, restDays: 8, forrajeCm: 10, kgMsHa: 950, status: 'resting' },
      { id: 'P8', name: 'Potrero 8 - Cuadro Nor-Este (Egg Mobile)', x: 6, z: -2, w: 8, d: 6, restDays: 4, forrajeCm: 8, kgMsHa: 750, status: 'coop' }
    ];

    // Registro maestro de animales individuales
    this.animals = new Map();

    this.initPaddocks3D();
    this.initPlacementMarker();
    this.createCows3D();
    this.createSheep3D();
    this.createHorses3D();
    this.createEggMobile3D();
    this.createWaterTrough3D();
    this.createHerdFloatingBadges();

    // Eventos
    bus.on('prv:move_herd', (paddockId) => this.moveToPaddock(paddockId));
    bus.on('prv:move_coop', (paddockId) => this.positionCoopInPaddock(paddockId));
    bus.on('layer:livestock', (visible) => this.toggleVisibility(visible));

    this.mapManager.addAnimated(this.group, (time) => this.updateAnimations(time));
    this.setupMapPlacementListener();
  }

  getElev(x, z, offset = 0.05) {
    if (this.mapManager && typeof this.mapManager.getTerrainElevation === 'function') {
      return this.mapManager.getTerrainElevation(x, z) + offset;
    }
    return 0.46 + offset;
  }

  initPlacementMarker() {
    const geo = new THREE.RingGeometry(0.8, 1.1, 32);
    geo.rotateX(-Math.PI / 2);
    const mat = new THREE.MeshBasicMaterial({
      color: 0x22c55e,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8
    });
    this.placementRing = new THREE.Mesh(geo, mat);
    this.placementRing.visible = false;
    this.scene.add(this.placementRing);
  }

  initPaddocks3D() {
    this.paddocks.forEach(p => {
      const padGroup = new THREE.Group();
      const pElev = this.getElev(p.x, p.z, 0.12);
      padGroup.position.set(p.x, pElev, p.z);

      // Suelo tintado según estado forrajero
      const geo = new THREE.PlaneGeometry(p.w - 0.4, p.d - 0.4);
      geo.rotateX(-Math.PI / 2);

      let color = '#15803d'; // Verde listo
      let opacity = 0.42;

      if (p.status === 'active') {
        color = '#f59e0b'; // Ámbar activo
        opacity = 0.65;
      } else if (p.status === 'coop') {
        color = '#38bdf8'; // Azul gallinero
        opacity = 0.45;
      } else if (p.restDays < 15) {
        color = '#84cc16'; // Verde claro rebrote
        opacity = 0.35;
      } else {
        color = '#22c55e'; // Listo para comer
        opacity = 0.45;
      }

      const mat = new THREE.MeshStandardMaterial({
        color: color,
        roughness: 0.8,
        metalness: 0.05,
        transparent: true,
        opacity: opacity,
        side: THREE.DoubleSide
      });

      const groundMesh = new THREE.Mesh(geo, mat);
      groundMesh.receiveShadow = true;
      padGroup.add(groundMesh);

      // Cerco Eléctrico Perimetral con postes de madera
      const fenceGroup = this.createElectricFence(p.w, p.d);
      padGroup.add(fenceGroup);

      // Insignia Flotante con ID de Potrero y Altura de Pasto
      const badge = this.createPaddockBadge(p);
      badge.position.set(0, 2.4, 0);
      padGroup.add(badge);

      const entityData = {
        type: 'paddock_prv',
        id: `paddock_${p.id}`,
        name: p.name,
        paddockId: p.id,
        restDays: p.restDays,
        forrajeCm: p.forrajeCm,
        kgMsHa: p.kgMsHa,
        status: p.status,
        areaM2: Math.round(p.w * p.d * 100)
      };

      groundMesh.userData = entityData;
      this.mapManager.addPickable(groundMesh, entityData);

      p.mesh = padGroup;
      p.groundMesh = groundMesh;
      p.badge = badge;
      p.mat = mat;
      this.group.add(padGroup);
      this.paddockMeshes.push(padGroup);
    });
  }

  createElectricFence(width, depth) {
    const fenceGroup = new THREE.Group();
    const halfW = width / 2;
    const halfD = depth / 2;

    const corners = [
      new THREE.Vector3(-halfW, 0, -halfD),
      new THREE.Vector3(halfW, 0, -halfD),
      new THREE.Vector3(halfW, 0, halfD),
      new THREE.Vector3(-halfW, 0, halfD)
    ];

    const postGeo = new THREE.CylinderGeometry(0.08, 0.09, 1.2, 6);
    const postMat = new THREE.MeshStandardMaterial({ color: '#78350f', roughness: 0.9 });

    corners.forEach(pos => {
      const post = new THREE.Mesh(postGeo, postMat);
      post.position.set(pos.x, 0.6, pos.z);
      post.castShadow = true;
      fenceGroup.add(post);
    });

    const wirePoints = [
      new THREE.Vector3(-halfW, 0.85, -halfD),
      new THREE.Vector3(halfW, 0.85, -halfD),
      new THREE.Vector3(halfW, 0.85, halfD),
      new THREE.Vector3(-halfW, 0.85, halfD),
      new THREE.Vector3(-halfW, 0.85, -halfD)
    ];

    const wireGeo = new THREE.BufferGeometry().setFromPoints(wirePoints);
    const wireMat = new THREE.LineBasicMaterial({
      color: 0xfef08a,
      linewidth: 3,
      transparent: true,
      opacity: 0.85
    });
    const wireLine = new THREE.Line(wireGeo, wireMat);
    fenceGroup.add(wireLine);

    return fenceGroup;
  }

  createPaddockBadge(paddock) {
    const group = new THREE.Group();
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = paddock.status === 'active' ? '#b45309' : (paddock.restDays >= 35 ? '#15803d' : '#1e293b');
    ctx.roundRect(4, 4, 120, 56, 12);
    ctx.fill();
    ctx.strokeStyle = '#fef08a';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.fillStyle = '#fff';
    ctx.font = 'bold 22px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(paddock.id, 64, 28);

    ctx.font = 'bold 13px monospace';
    ctx.fillStyle = paddock.status === 'active' ? '#fde047' : '#86efac';
    ctx.fillText(`${paddock.restDays}d • ${paddock.forrajeCm}cm`, 64, 48);

    const texture = new THREE.CanvasTexture(canvas);
    const planeGeo = new THREE.PlaneGeometry(1.8, 0.9);
    const planeMat = new THREE.MeshBasicMaterial({ map: texture, transparent: true, side: THREE.DoubleSide });
    const mesh = new THREE.Mesh(planeGeo, planeMat);

    group.add(mesh);
    group.userData = { texture, canvas, ctx };
    return group;
  }

  createHerdFloatingBadges() {
    // Insignia Vacas Sur-Oeste
    this.badgeCows = this.buildFloatingBanner('🐄 Rebaño Bovino Sur-Oeste (P3)', '6 Bovinos Clavel & Angus', '#fde047', 'rgba(120, 53, 15, 0.92)');
    this.badgeCows.position.set(-34, this.getElev(-34, 36, 4.3), 36);
    this.group.add(this.badgeCows);

    // Insignia Ovejas Centro-Oeste
    this.badgeSheep = this.buildFloatingBanner('🐑 Rebaño Ovino Centro-Oeste (P5)', '5 Ovinos Suffolk Down', '#86efac', 'rgba(21, 128, 61, 0.92)');
    this.badgeSheep.position.set(-29, this.getElev(-29, 4, 3.8), 4);
    this.group.add(this.badgeSheep);

    // Insignia Caballos Libres
    this.badgeHorses = this.buildFloatingBanner('🐎 Caballos Chilenos Sueltos', '4 Equinos en Pradera Abierta', '#fed7aa', 'rgba(154, 52, 18, 0.92)');
    this.badgeHorses.position.set(20, this.getElev(20, 24, 4.2), 24);
    this.group.add(this.badgeHorses);

    // Insignia Egg Mobile Nor-Este
    this.badgeCoop = this.buildFloatingBanner('🐓 Gallinero Móvil Nor-Este (P8)', '60 Ponedoras Sanitizadoras', '#7dd3fc', 'rgba(3, 105, 161, 0.92)');
    this.badgeCoop.position.set(6, this.getElev(6, -2, 3.8), -2);
    this.group.add(this.badgeCoop);
  }

  buildFloatingBanner(title, subtitle, accentColor, bgColor) {
    const group = new THREE.Group();
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 70;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = bgColor;
    ctx.roundRect(4, 4, 248, 62, 14);
    ctx.fill();
    ctx.strokeStyle = accentColor;
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.fillStyle = accentColor;
    ctx.font = 'bold 13px monospace';
    ctx.fillText(title, 14, 28);

    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 11px sans-serif';
    ctx.fillText(subtitle, 14, 48);

    const texture = new THREE.CanvasTexture(canvas);
    const planeGeo = new THREE.PlaneGeometry(3.6, 1.0);
    const planeMat = new THREE.MeshBasicMaterial({ map: texture, transparent: true, side: THREE.DoubleSide });
    const mesh = new THREE.Mesh(planeGeo, planeMat);
    group.add(mesh);
    return group;
  }

  // ─── 1. Vacas en la esquina Sur-Oeste ──────────────────────────────────────────
  createCows3D() {
    this.cows = [];
    const cowDefs = [
      { id: 'cow_1', name: 'Clavelina', tag: 'CLAV-01', breed: 'Clavel Alemán (Overo Colorado)', weight: 540, health: 'Excelente', x: -35.2, z: 34.5 },
      { id: 'cow_2', name: 'Margarita', tag: 'OV-02', breed: 'Overo Negro Holando', weight: 515, health: 'Excelente', x: -33.4, z: 36.8 },
      { id: 'cow_3', name: 'Tizón', tag: 'ANG-03', breed: 'Aberdeen Angus Negro', weight: 580, health: 'Excelente', x: -36.8, z: 37.2 },
      { id: 'cow_4', name: 'Estrella', tag: 'CLAV-04', breed: 'Clavel Alemán', weight: 495, health: 'Excelente', x: -32.5, z: 33.6 },
      { id: 'cow_5', name: 'Canelo', tag: 'ANG-05', breed: 'Angus Colorado', weight: 560, health: 'Excelente', x: -31.8, z: 38.2 },
      { id: 'cow_6', name: 'Blanquita', tag: 'HOL-06', breed: 'Overo Holando Lechera', weight: 530, health: 'Excelente', x: -34.8, z: 39.4 }
    ];

    cowDefs.forEach((def, i) => {
      const cowMesh = this.buildCowMesh(i, def.breed.includes('Colorado'));
      const elev = this.getElev(def.x, def.z, 0.05);
      cowMesh.position.set(def.x, elev, def.z);
      cowMesh.rotation.y = (i * 1.1) + 0.3;
      this.cowsGroup.add(cowMesh);
      this.cows.push(cowMesh);

      const animalData = {
        id: def.id,
        name: def.name,
        tag: def.tag,
        type: 'livestock_animal',
        animalType: 'cow',
        icon: '🐄',
        species: 'Bovino',
        breed: def.breed,
        category: 'Vaca de Pastoreo PRV',
        weightKg: def.weight,
        health: def.health,
        paddockId: 'P3',
        locationSector: 'Esquina Sur-Oeste',
        x: def.x,
        z: def.z,
        y: elev,
        notes: 'Alimentación 100% pastizal polifítico. Cero antibióticos ni granos concentrados.',
        mesh: cowMesh
      };

      this.animals.set(def.id, animalData);
      cowMesh.userData = animalData;
      this.mapManager.addPickable(cowMesh.children[0] || cowMesh, animalData);
    });
  }

  buildCowMesh(index, isBrown = false) {
    const cow = new THREE.Group();
    const bodyGeo = new THREE.BoxGeometry(1.6, 0.9, 0.8);
    const bodyMat = new THREE.MeshStandardMaterial({
      color: isBrown ? '#854d0e' : '#18181b',
      roughness: 0.75,
      metalness: 0.05
    });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = 0.95;
    body.castShadow = true;
    cow.add(body);

    const patchGeo = new THREE.BoxGeometry(0.7, 0.7, 0.82);
    const patchMat = new THREE.MeshStandardMaterial({ color: '#f8fafc', roughness: 0.8 });
    const patch = new THREE.Mesh(patchGeo, patchMat);
    patch.position.set(0.1, 0.95, 0);
    cow.add(patch);

    const headGroup = new THREE.Group();
    headGroup.position.set(0.85, 1.25, 0);

    const headGeo = new THREE.BoxGeometry(0.55, 0.5, 0.5);
    const headMat = new THREE.MeshStandardMaterial({ color: isBrown ? '#854d0e' : '#18181b', roughness: 0.7 });
    const head = new THREE.Mesh(headGeo, headMat);
    head.castShadow = true;
    headGroup.add(head);

    const muzzleGeo = new THREE.BoxGeometry(0.25, 0.28, 0.38);
    const muzzleMat = new THREE.MeshStandardMaterial({ color: '#fda4af', roughness: 0.5 });
    const muzzle = new THREE.Mesh(muzzleGeo, muzzleMat);
    muzzle.position.set(0.3, -0.1, 0);
    headGroup.add(muzzle);

    const hornMat = new THREE.MeshStandardMaterial({ color: '#fef08a', roughness: 0.4 });
    [-0.22, 0.22].forEach(z => {
      const hornGeo = new THREE.ConeGeometry(0.05, 0.22, 4);
      hornGeo.rotateZ(-Math.PI / 4);
      const horn = new THREE.Mesh(hornGeo, hornMat);
      horn.position.set(-0.05, 0.32, z);
      headGroup.add(horn);

      const earGeo = new THREE.BoxGeometry(0.12, 0.06, 0.2);
      const earMat = new THREE.MeshStandardMaterial({ color: isBrown ? '#854d0e' : '#18181b' });
      const ear = new THREE.Mesh(earGeo, earMat);
      ear.position.set(-0.1, 0.15, z > 0 ? 0.32 : -0.32);
      headGroup.add(ear);
    });

    cow.add(headGroup);
    cow.userData.headGroup = headGroup;

    const legGeo = new THREE.BoxGeometry(0.18, 0.75, 0.18);
    const legMat = new THREE.MeshStandardMaterial({ color: '#f8fafc', roughness: 0.8 });
    [
      [-0.55, -0.26],
      [-0.55, 0.26],
      [0.55, -0.26],
      [0.55, 0.26]
    ].forEach(([x, z]) => {
      const leg = new THREE.Mesh(legGeo, legMat);
      leg.position.set(x, 0.38, z);
      leg.castShadow = true;
      cow.add(leg);
    });

    const tailGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.6, 4);
    const tailMat = new THREE.MeshStandardMaterial({ color: isBrown ? '#854d0e' : '#18181b' });
    const tail = new THREE.Mesh(tailGeo, tailMat);
    tail.position.set(-0.85, 0.8, 0);
    tail.rotation.z = Math.PI / 6;
    cow.add(tail);
    cow.userData.tail = tail;

    cow.scale.set(0.9, 0.9, 0.9);
    cow.userData.animOffset = index * 1.3;
    return cow;
  }

  // ─── 2. Ovejas en el Centro-Oeste ─────────────────────────────────────────────
  createSheep3D() {
    this.sheep = [];
    const sheepDefs = [
      { id: 'sheep_1', name: 'Copito', tag: 'SUF-01', breed: 'Suffolk Down', weight: 78, x: -30.5, z: 2.8 },
      { id: 'sheep_2', name: 'Lana', tag: 'SUF-02', breed: 'Suffolk Down', weight: 82, x: -28.2, z: 4.6 },
      { id: 'sheep_3', name: 'Sombra', tag: 'SUF-03', breed: 'Suffolk Cara Negra', weight: 74, x: -31.6, z: 5.2 },
      { id: 'sheep_4', name: 'Trébol', tag: 'SUF-04', breed: 'Suffolk Down', weight: 80, x: -27.5, z: 2.2 },
      { id: 'sheep_5', name: 'Nube', tag: 'SUF-05', breed: 'Suffolk Down', weight: 76, x: -29.8, z: 6.4 }
    ];

    sheepDefs.forEach((def, i) => {
      const sMesh = this.buildSheepMesh(i);
      const elev = this.getElev(def.x, def.z, 0.05);
      sMesh.position.set(def.x, elev, def.z);
      sMesh.rotation.y = (i * 1.4) + 0.8;
      this.sheepGroup.add(sMesh);
      this.sheep.push(sMesh);

      const animalData = {
        id: def.id,
        name: def.name,
        tag: def.tag,
        type: 'livestock_animal',
        animalType: 'sheep',
        icon: '🐑',
        species: 'Ovino',
        breed: def.breed,
        category: 'Oveja de Lana & Pastoreo',
        weightKg: def.weight,
        health: 'Excelente',
        paddockId: 'P5',
        locationSector: 'Centro-Oeste',
        x: def.x,
        z: def.z,
        y: elev,
        notes: 'Ramoneo bajo y control de malezas en bordes de viña.',
        mesh: sMesh
      };

      this.animals.set(def.id, animalData);
      sMesh.userData = animalData;
      this.mapManager.addPickable(sMesh.children[0] || sMesh, animalData);
    });
  }

  buildSheepMesh(index) {
    const sheep = new THREE.Group();
    const bodyGeo = new THREE.DodecahedronGeometry(0.52, 1);
    const bodyMat = new THREE.MeshStandardMaterial({ color: '#f5f5f4', roughness: 0.95 });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = 0.55;
    body.castShadow = true;
    sheep.add(body);

    const headGeo = new THREE.BoxGeometry(0.32, 0.28, 0.26);
    const headMat = new THREE.MeshStandardMaterial({ color: '#18181b', roughness: 0.8 });
    const head = new THREE.Mesh(headGeo, headMat);
    head.position.set(0.48, 0.65, 0);
    head.castShadow = true;
    sheep.add(head);

    const legGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.4, 6);
    const legMat = new THREE.MeshStandardMaterial({ color: '#18181b' });
    [
      [-0.24, -0.18],
      [-0.24, 0.18],
      [0.24, -0.18],
      [0.24, 0.18]
    ].forEach(([x, z]) => {
      const leg = new THREE.Mesh(legGeo, legMat);
      leg.position.set(x, 0.2, z);
      sheep.add(leg);
    });

    sheep.scale.set(0.9, 0.9, 0.9);
    sheep.userData.animOffset = index * 2.1;
    sheep.userData.head = head;
    return sheep;
  }

  // ─── 3. Caballos Sueltos y Libres ─────────────────────────────────────────────
  createHorses3D() {
    this.horses = [];
    const horseDefs = [
      { id: 'horse_1', name: 'Lucero', tag: 'CAB-01', breed: 'Caballo Chileno Bayo Dorado', weight: 460, coat: '#c29858', mane: '#1c1917', x: 18.5, z: 22.2 },
      { id: 'horse_2', name: 'Canela', tag: 'CAB-02', breed: 'Yegua Alazana Tostada', weight: 440, coat: '#9a3412', mane: '#ea580c', x: 23.2, z: 25.8 },
      { id: 'horse_3', name: 'Puelche', tag: 'CAB-03', breed: 'Caballo Zaino Colorado', weight: 475, coat: '#451a03', mane: '#18181b', x: 15.8, z: 27.4 },
      { id: 'horse_4', name: 'Nevada', tag: 'CAB-04', breed: 'Yegua Tordilla Rosilla', weight: 450, coat: '#cbd5e1', mane: '#64748b', x: 21.6, z: 19.4 }
    ];

    horseDefs.forEach((def, i) => {
      const horseMesh = this.buildHorseMesh(i, def.coat, def.mane);
      const elev = this.getElev(def.x, def.z, 0.05);
      horseMesh.position.set(def.x, elev, def.z);
      horseMesh.rotation.y = (i * 1.5) + 0.5;
      this.horsesGroup.add(horseMesh);
      this.horses.push(horseMesh);

      const animalData = {
        id: def.id,
        name: def.name,
        tag: def.tag,
        type: 'livestock_animal',
        animalType: 'horse',
        icon: '🐎',
        species: 'Equino',
        breed: def.breed,
        category: 'Caballo Chileno Suelto',
        weightKg: def.weight,
        health: 'Excelente',
        paddockId: 'P7',
        locationSector: 'Pradera Abierta Este',
        x: def.x,
        z: def.z,
        y: elev,
        notes: 'Pastoreo libre y descompactación ligera de suelo. Aptitud rústica criolla.',
        mesh: horseMesh
      };

      this.animals.set(def.id, animalData);
      horseMesh.userData = animalData;
      this.mapManager.addPickable(horseMesh.children[0] || horseMesh, animalData);
    });
  }

  buildHorseMesh(index, coatColor = '#c29858', maneColor = '#1c1917') {
    const horse = new THREE.Group();

    // 1. Torso muscular
    const bodyGeo = new THREE.BoxGeometry(1.85, 0.95, 0.72);
    const bodyMat = new THREE.MeshStandardMaterial({ color: coatColor, roughness: 0.65, metalness: 0.1 });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = 1.25;
    body.castShadow = true;
    horse.add(body);

    // 2. Cuello arqueado
    const neckGroup = new THREE.Group();
    neckGroup.position.set(0.85, 1.45, 0);

    const neckGeo = new THREE.BoxGeometry(0.55, 1.05, 0.38);
    const neckMesh = new THREE.Mesh(neckGeo, bodyMat);
    neckMesh.position.set(0.18, 0.45, 0);
    neckMesh.rotation.z = -Math.PI / 4.5;
    neckMesh.castShadow = true;
    neckGroup.add(neckMesh);

    // Crin (Mane)
    const maneGeo = new THREE.BoxGeometry(0.14, 1.0, 0.18);
    const maneMat = new THREE.MeshStandardMaterial({ color: maneColor, roughness: 0.9 });
    const maneMesh = new THREE.Mesh(maneGeo, maneMat);
    maneMesh.position.set(0.08, 0.52, 0);
    maneMesh.rotation.z = -Math.PI / 4.5;
    neckGroup.add(maneMesh);

    // Cabeza fina y noble
    const headGeo = new THREE.BoxGeometry(0.68, 0.42, 0.34);
    const headMesh = new THREE.Mesh(headGeo, bodyMat);
    headMesh.position.set(0.48, 0.88, 0);
    headMesh.castShadow = true;
    neckGroup.add(headMesh);

    // Hocico
    const muzzleGeo = new THREE.BoxGeometry(0.32, 0.26, 0.28);
    const muzzleMat = new THREE.MeshStandardMaterial({ color: '#1c1917', roughness: 0.7 });
    const muzzleMesh = new THREE.Mesh(muzzleGeo, muzzleMat);
    muzzleMesh.position.set(0.85, 0.78, 0);
    neckGroup.add(muzzleMesh);

    // Orejas alertas erguidas
    const earGeo = new THREE.ConeGeometry(0.05, 0.22, 4);
    [-0.1, 0.1].forEach(z => {
      const ear = new THREE.Mesh(earGeo, bodyMat);
      ear.position.set(0.32, 1.15, z);
      neckGroup.add(ear);
    });

    horse.add(neckGroup);
    horse.userData.neckGroup = neckGroup;

    // 3. Patas esbeltas con cascos oscuros
    const legGeo = new THREE.CylinderGeometry(0.08, 0.06, 0.95, 6);
    const legMat = new THREE.MeshStandardMaterial({ color: coatColor, roughness: 0.7 });
    const hoofGeo = new THREE.CylinderGeometry(0.07, 0.08, 0.15, 6);
    const hoofMat = new THREE.MeshStandardMaterial({ color: '#171717', roughness: 0.5 });

    [
      [-0.65, -0.24],
      [-0.65, 0.24],
      [0.65, -0.24],
      [0.65, 0.24]
    ].forEach(([x, z]) => {
      const legGroup = new THREE.Group();
      legGroup.position.set(x, 0.55, z);

      const leg = new THREE.Mesh(legGeo, legMat);
      leg.castShadow = true;
      legGroup.add(leg);

      const hoof = new THREE.Mesh(hoofGeo, hoofMat);
      hoof.position.y = -0.42;
      legGroup.add(hoof);

      horse.add(legGroup);
    });

    // 4. Cola larga y frondosa
    const tailGeo = new THREE.CylinderGeometry(0.05, 0.14, 1.05, 6);
    const tail = new THREE.Mesh(tailGeo, maneMat);
    tail.position.set(-1.0, 1.1, 0);
    tail.rotation.z = Math.PI / 7;
    horse.add(tail);
    horse.userData.tail = tail;

    horse.scale.set(0.95, 0.95, 0.95);
    horse.userData.animOffset = index * 1.8;
    return horse;
  }

  // ─── 4. Gallinas & Egg Mobile al Nor-Este (Despejadas de Paneles) ─────────────
  createEggMobile3D() {
    const coop = new THREE.Group();

    // Carro de madera remolcable
    const cartGeo = new THREE.BoxGeometry(2.6, 1.4, 1.8);
    const cartMat = new THREE.MeshStandardMaterial({ color: '#b45309', roughness: 0.8 });
    const cart = new THREE.Mesh(cartGeo, cartMat);
    cart.position.y = 1.1;
    cart.castShadow = true;
    coop.add(cart);

    // Techo verde a dos aguas
    const roofGeo = new THREE.ConeGeometry(2.3, 1.1, 4);
    roofGeo.rotateY(Math.PI / 4);
    const roofMat = new THREE.MeshStandardMaterial({ color: '#15803d', roughness: 0.5 });
    const roof = new THREE.Mesh(roofGeo, roofMat);
    roof.position.y = 2.25;
    roof.castShadow = true;
    coop.add(roof);

    // Ruedas de carreta
    const wheelGeo = new THREE.CylinderGeometry(0.45, 0.45, 0.18, 12);
    wheelGeo.rotateZ(Math.PI / 2);
    const wheelMat = new THREE.MeshStandardMaterial({ color: '#18181b', roughness: 0.9 });
    [
      [-0.9, -0.98],
      [0.9, -0.98],
      [-0.9, 0.98],
      [0.9, 0.98]
    ].forEach(([x, z]) => {
      const wheel = new THREE.Mesh(wheelGeo, wheelMat);
      wheel.position.set(x, 0.45, z);
      wheel.castShadow = true;
      coop.add(wheel);
    });

    // Gallinas de pastoreo picoteando alrededor
    this.chickens = [];
    const chMat = new THREE.MeshStandardMaterial({ color: '#ea580c', roughness: 0.7 });
    const beakMat = new THREE.MeshStandardMaterial({ color: '#facc15' });

    for (let c = 0; c < 8; c++) {
      const ch = new THREE.Group();
      const body = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.35, 5), chMat);
      body.rotation.x = Math.PI / 2;
      ch.add(body);

      const beak = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.1, 4), beakMat);
      beak.position.set(0, 0, 0.2);
      beak.rotation.x = -Math.PI / 2;
      ch.add(beak);

      const rad = 2.2 + (c * 0.4);
      const angle = (c / 8) * Math.PI * 2;
      ch.position.set(Math.cos(angle) * rad, 0.18, Math.sin(angle) * rad);
      coop.add(ch);
      this.chickens.push(ch);
    }

    // Posición inicial: Nor-Este del predio (x: 6, z: -2)
    const initX = 6.0;
    const initZ = -2.0;
    const elev = this.getElev(initX, initZ, 0.05);
    coop.position.set(initX, elev, initZ);
    this.coopGroup.add(coop);
    this.eggMobile = coop;

    const coopData = {
      id: 'coop_main',
      name: 'Gallinero Móvil (Egg Mobile)',
      tag: 'AV-60',
      type: 'livestock_animal',
      animalType: 'coop',
      icon: '🐓',
      species: 'Aves de Pastoreo',
      breed: 'Hy-Line Brown & Barrada',
      category: '60 Gallinas Ponedoras',
      weightKg: 126,
      health: 'Excelente (Postura 94%)',
      paddockId: 'P8',
      locationSector: 'Nor-Este (Despejado de Paneles)',
      x: initX,
      z: initZ,
      y: elev,
      notes: 'Sanitización de pasturas, control biológico de larvas y abono nitrogenado.',
      mesh: coop
    };

    this.animals.set('coop_main', coopData);
    coop.userData = coopData;
    this.mapManager.addPickable(cart, coopData);
  }

  // ─── 5. Abrevadero Móvil ──────────────────────────────────────────────────────
  createWaterTrough3D() {
    const tank = new THREE.Group();

    // Tina de acero inoxidable
    const tinaGeo = new THREE.BoxGeometry(2.4, 0.65, 1.1);
    const tinaMat = new THREE.MeshStandardMaterial({
      color: '#94a3b8',
      roughness: 0.25,
      metalness: 0.85
    });
    const tina = new THREE.Mesh(tinaGeo, tinaMat);
    tina.position.y = 0.35;
    tina.castShadow = true;
    tank.add(tina);

    // Superficie de agua azul translúcida
    const waterGeo = new THREE.PlaneGeometry(2.2, 0.9);
    waterGeo.rotateX(-Math.PI / 2);
    const waterMat = new THREE.MeshStandardMaterial({
      color: '#0284c7',
      roughness: 0.1,
      metalness: 0.2,
      transparent: true,
      opacity: 0.85
    });
    const water = new THREE.Mesh(waterGeo, waterMat);
    water.position.y = 0.62;
    tank.add(water);

    // Posición estratégica acorde entre potreros (x: -22, z: 18)
    const initX = -22.0;
    const initZ = 18.0;
    const elev = this.getElev(initX, initZ, 0.05);
    tank.position.set(initX, elev, initZ);

    this.waterTroughGroup.add(tank);
    this.waterTrough = tank;
  }

  // ─── Reubicación Interactiva & Gestión de Datos ──────────────────────────────
  getAnimal(id) {
    return this.animals.get(id);
  }

  getAllAnimals() {
    return Array.from(this.animals.values());
  }

  updateAnimalData(id, newData) {
    const animal = this.animals.get(id);
    if (!animal) return;

    Object.assign(animal, newData);
    if (newData.x !== undefined && newData.z !== undefined) {
      this.relocateAnimal(id, newData.x, newData.z);
    }
    bus.emit('ui:show_toast', `💾 Ficha de ${animal.name} (${animal.tag}) guardada correctamente.`);
  }

  relocateAnimal(id, newX, newZ) {
    const animal = this.animals.get(id);
    if (!animal || !animal.mesh) return;

    animal.x = newX;
    animal.z = newZ;
    animal.y = this.getElev(newX, newZ, 0.05);

    animal.mesh.position.set(animal.x, animal.y, animal.z);

    // Actualizar insignias si corresponde
    if (animal.animalType === 'cow' && this.badgeCows) {
      this.badgeCows.position.set(newX, this.getElev(newX, newZ, 4.3), newZ);
    } else if (animal.animalType === 'sheep' && this.badgeSheep) {
      this.badgeSheep.position.set(newX, this.getElev(newX, newZ, 3.8), newZ);
    } else if (animal.animalType === 'horse' && this.badgeHorses) {
      this.badgeHorses.position.set(newX, this.getElev(newX, newZ, 4.2), newZ);
    } else if (animal.animalType === 'coop' && this.badgeCoop) {
      this.badgeCoop.position.set(newX, this.getElev(newX, newZ, 3.8), newZ);
    }

    bus.emit('livestock:animal_moved', animal);
    bus.emit('ui:show_toast', `📍 ${animal.name} reubicado en (${newX.toFixed(1)}, ${newZ.toFixed(1)})`);
  }

  startInteractiveRelocation(animalId) {
    const animal = this.animals.get(animalId);
    if (!animal) return;

    this.relocatingAnimalId = animalId;
    if (this.placementRing) {
      this.placementRing.position.set(animal.x, animal.y + 0.1, animal.z);
      this.placementRing.visible = true;
    }
    bus.emit('ui:show_toast', `🎯 Modo Reubicación Activo: Haz clic en cualquier punto del terreno para trasladar a ${animal.name}`);
  }

  cancelRelocation() {
    this.relocatingAnimalId = null;
    if (this.placementRing) this.placementRing.visible = false;
  }

  setupMapPlacementListener() {
    const canvas = this.mapManager?.renderer?.domElement;
    if (!canvas) return;

    canvas.addEventListener('mousemove', (e) => {
      if (!this.relocatingAnimalId || !this.placementRing) return;
      const rect = canvas.getBoundingClientRect();
      const mouse = new THREE.Vector2(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1
      );
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, this.mapManager.camera);
      const hits = raycaster.intersectObject(this.mapManager.groundMesh);
      if (hits.length > 0) {
        const p = hits[0].point;
        this.placementRing.position.set(p.x, p.y + 0.12, p.z);
      }
    });

    canvas.addEventListener('click', (e) => {
      if (!this.relocatingAnimalId) return;

      const rect = canvas.getBoundingClientRect();
      const mouse = new THREE.Vector2(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1
      );
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, this.mapManager.camera);
      const hits = raycaster.intersectObject(this.mapManager.groundMesh);

      if (hits.length > 0) {
        const p = hits[0].point;
        const targetId = this.relocatingAnimalId;
        this.relocatingAnimalId = null;
        if (this.placementRing) this.placementRing.visible = false;

        this.relocateAnimal(targetId, p.x, p.z);
        e.stopPropagation();
      }
    });
  }

  teleportPreset(animalId, preset) {
    const presets = {
      sur_oeste: { x: -34.0, z: 36.0, label: 'Esquina Sur-Oeste (Vacas)' },
      centro_oeste: { x: -29.0, z: 4.0, label: 'Centro-Oeste (Ovejas)' },
      nor_este: { x: 6.0, z: -2.0, label: 'Nor-Este (Gallinero Móvil)' },
      pradera_central: { x: 18.0, z: 22.0, label: 'Pradera Abierta (Caballos)' }
    };

    const target = presets[preset];
    if (target) {
      this.relocateAnimal(animalId, target.x, target.z);
    }
  }

  positionCoopInPaddock(paddockId) {
    const p = this.paddocks.find(item => item.id === paddockId);
    if (!p || !this.eggMobile) return;

    this.relocateAnimal('coop_main', p.x, p.z);
  }

  moveToPaddock(targetPaddockId) {
    if (this.activePaddockId === targetPaddockId) return;

    const oldPaddock = this.paddocks.find(p => p.id === this.activePaddockId);
    const newPaddock = this.paddocks.find(p => p.id === targetPaddockId);
    if (!newPaddock) return;

    if (oldPaddock) {
      oldPaddock.status = 'resting';
      oldPaddock.restDays = 1;
      oldPaddock.forrajeCm = 6;
      this.updatePaddockVisual(oldPaddock);
    }

    newPaddock.status = 'active';
    this.activePaddockId = targetPaddockId;
    this.updatePaddockVisual(newPaddock);

    // Mover grupo de vacas al nuevo potrero
    this.cows.forEach((cow, i) => {
      const offsetX = ((i % 3) - 1) * 1.5;
      const offsetZ = (Math.floor(i / 3) - 0.5) * 1.5;
      const tx = newPaddock.x + offsetX;
      const tz = newPaddock.z + offsetZ;
      const a = this.animals.get(`cow_${i+1}`);
      if (a) this.relocateAnimal(a.id, tx, tz);
    });

    bus.emit('ui:show_toast', `🐄 Rebaño trasladado a ${newPaddock.name}. Potrero anterior entra en descanso.`);
  }

  updatePaddockVisual(paddock) {
    if (!paddock.mat) return;
    if (paddock.status === 'active') {
      paddock.mat.color.set('#f59e0b');
      paddock.mat.opacity = 0.65;
    } else if (paddock.status === 'coop') {
      paddock.mat.color.set('#38bdf8');
      paddock.mat.opacity = 0.45;
    } else if (paddock.restDays >= 35) {
      paddock.mat.color.set('#15803d');
      paddock.mat.opacity = 0.45;
    } else {
      paddock.mat.color.set('#84cc16');
      paddock.mat.opacity = 0.35;
    }
    this.updateBadgeText(paddock);
  }

  updateBadgeText(paddock) {
    if (!paddock.badge || !paddock.badge.userData.ctx) return;
    const ctx = paddock.badge.userData.ctx;
    const canvas = paddock.badge.userData.canvas;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = paddock.status === 'active' ? '#b45309' : (paddock.restDays >= 35 ? '#15803d' : '#1e293b');
    ctx.roundRect(4, 4, 120, 56, 12);
    ctx.fill();
    ctx.strokeStyle = '#fef08a';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.fillStyle = '#fff';
    ctx.font = 'bold 22px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(paddock.id, 64, 28);

    ctx.font = 'bold 13px monospace';
    ctx.fillStyle = paddock.status === 'active' ? '#fde047' : '#86efac';
    ctx.fillText(`${paddock.restDays}d • ${paddock.forrajeCm}cm`, 64, 48);

    paddock.badge.userData.texture.needsUpdate = true;
  }

  updateAnimations(time) {
    // Billboarding para insignias flotantes
    const cam = this.mapManager?.camera;
    if (cam) {
      this.paddocks.forEach(p => {
        if (p.badge) p.badge.quaternion.copy(cam.quaternion);
      });
      if (this.badgeCows) this.badgeCows.quaternion.copy(cam.quaternion);
      if (this.badgeSheep) this.badgeSheep.quaternion.copy(cam.quaternion);
      if (this.badgeHorses) this.badgeHorses.quaternion.copy(cam.quaternion);
      if (this.badgeCoop) this.badgeCoop.quaternion.copy(cam.quaternion);
    }

    // Pastoreo en vacas
    this.cows.forEach((cow) => {
      const off = cow.userData.animOffset || 0;
      if (cow.userData.headGroup) {
        cow.userData.headGroup.rotation.x = Math.sin(time * 0.002 + off) * 0.25 - 0.15;
      }
      if (cow.userData.tail) {
        cow.userData.tail.rotation.z = Math.PI / 6 + Math.sin(time * 0.006 + off) * 0.18;
      }
    });

    // Pastoreo en ovejas
    this.sheep.forEach((sheep) => {
      const off = sheep.userData.animOffset || 0;
      if (sheep.userData.head) {
        sheep.userData.head.rotation.x = Math.sin(time * 0.003 + off) * 0.2 + 0.1;
      }
    });

    // Movimiento natural en caballos (cuello y cola)
    this.horses.forEach((horse) => {
      const off = horse.userData.animOffset || 0;
      if (horse.userData.neckGroup) {
        horse.userData.neckGroup.rotation.x = Math.sin(time * 0.0018 + off) * 0.18 - 0.08;
      }
      if (horse.userData.tail) {
        horse.userData.tail.rotation.z = Math.PI / 7 + Math.sin(time * 0.005 + off) * 0.15;
      }
    });

    // Gallinas picoteando
    if (this.chickens) {
      this.chickens.forEach((ch, i) => {
        ch.rotation.x = Math.sin(time * 0.008 + i * 2) * 0.4 + 0.2;
      });
    }
  }

  toggleVisibility(visible) {
    this.visible = visible;
    this.group.visible = visible;
  }
}
