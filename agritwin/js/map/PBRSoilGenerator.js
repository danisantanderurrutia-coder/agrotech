/**
 * AgriTwin 3D - PBRSoilGenerator Module
 * Procedural PBR Soil Texture Generator (Normal & Roughness Maps)
 * 
 * Simulates:
 * - Directional agricultural plowing furrows (surcos de arado periódicos)
 * - Micro-topography with organic humus clods and gravel aggregate
 * - High-efficiency canvas-to-texture generation with seamless tiling (RepeatWrapping)
 */

export class PBRSoilGenerator {
  /**
   * Generates a seamless 1024×1024 Normal Map encoding agricultural furrows and humus texture.
   * Uses Sobel elevation gradients to construct tangent-space normal vectors.
   * 
   * @param {number} size - Resolution (e.g., 1024)
   * @returns {THREE.CanvasTexture}
   */
  static createSoilNormalMap(size = 1024) {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    const imgData = ctx.createImageData(size, size);
    const data = imgData.data;

    // 1. Generate procedural heightfield
    const heightField = new Float32Array(size * size);
    const furrowFrequency = 16.0; // Number of plowing furrows per texture tile

    for (let y = 0; y < size; y++) {
      const ny = y / size;
      const angle = ny * Math.PI * 2 * furrowFrequency;

      for (let x = 0; x < size; x++) {
        const nx = x / size;

        // Primary plowing furrow (sinusoidal ridge with tractor depression)
        const furrow = Math.sin(angle) * 0.5 + Math.cos(angle * 2.0) * 0.15;

        // Micro-humus organic noise (pseudo-fractal clods)
        const clod1 = Math.sin(nx * 120 + ny * 60) * Math.cos(ny * 140 - nx * 30) * 0.18;
        const clod2 = Math.sin(nx * 320 - ny * 180) * Math.sin(ny * 290 + nx * 110) * 0.09;
        const clod3 = (Math.random() - 0.5) * 0.04; // fine sand grain

        heightField[y * size + x] = furrow + clod1 + clod2 + clod3;
      }
    }

    // 2. Compute Sobel normal gradients (dh/dx, dh/dy) with wrapping for seamless tiling
    const strength = 4.2; // Normal intensity

    for (let y = 0; y < size; y++) {
      const ym1 = (y - 1 + size) % size;
      const yp1 = (y + 1) % size;

      for (let x = 0; x < size; x++) {
        const xm1 = (x - 1 + size) % size;
        const xp1 = (x + 1) % size;

        // Horizontal Sobel kernel
        const dx = (
          -heightField[ym1 * size + xm1] + heightField[ym1 * size + xp1]
          - 2.0 * heightField[y * size + xm1] + 2.0 * heightField[y * size + xp1]
          - heightField[yp1 * size + xm1] + heightField[yp1 * size + xp1]
        ) * strength;

        // Vertical Sobel kernel
        const dy = (
          -heightField[ym1 * size + xm1] - 2.0 * heightField[ym1 * size + x] - heightField[ym1 * size + xp1]
          + heightField[yp1 * size + xm1] + 2.0 * heightField[yp1 * size + x] + heightField[yp1 * size + xp1]
        ) * strength;

        const dz = 1.0;

        // Normalize (nx, ny, nz)
        const len = Math.sqrt(dx * dx + dy * dy + dz * dz);
        const nx = -dx / len;
        const ny = -dy / len;
        const nz = dz / len;

        const idx = (y * size + x) * 4;
        // Pack into 8-bit RGB normal map: [0, 255]
        data[idx]     = Math.floor((nx * 0.5 + 0.5) * 255); // Red = X
        data[idx + 1] = Math.floor((ny * 0.5 + 0.5) * 255); // Green = Y
        data[idx + 2] = Math.floor((nz * 0.5 + 0.5) * 255); // Blue = Z
        data[idx + 3] = 255;                                // Alpha
      }
    }

    ctx.putImageData(imgData, 0, 0);

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(28, 28);
    texture.anisotropy = 8;
    texture.needsUpdate = true;
    return texture;
  }

  /**
   * Generates a 1024×1024 Roughness Map.
   * Furrow valleys hold moisture -> smoother/more specular (darker gray ~0.35)
   * Furrow crests are dry aerated soil -> rougher/matte (light gray ~0.88)
   * 
   * @param {number} size
   * @returns {THREE.CanvasTexture}
   */
  static createSoilRoughnessMap(size = 1024) {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    const imgData = ctx.createImageData(size, size);
    const data = imgData.data;

    const furrowFrequency = 16.0;

    for (let y = 0; y < size; y++) {
      const ny = y / size;
      const angle = ny * Math.PI * 2 * furrowFrequency;

      for (let x = 0; x < size; x++) {
        const nx = x / size;

        // Valleys: sin(angle) < 0 (wetter soil), Crests: sin(angle) > 0 (dry clods)
        const furrowVal = Math.sin(angle);
        const clods = Math.sin(nx * 140) * Math.cos(ny * 120) * 0.15;

        // Base roughness between 0.38 (humid trench) and 0.88 (dry loam)
        let r = 0.65 + furrowVal * 0.22 + clods;
        r = Math.max(0.28, Math.min(0.95, r));

        const byteVal = Math.floor(r * 255);
        const idx = (y * size + x) * 4;
        data[idx]     = byteVal;
        data[idx + 1] = byteVal;
        data[idx + 2] = byteVal;
        data[idx + 3] = 255;
      }
    }

    ctx.putImageData(imgData, 0, 0);

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(28, 28);
    texture.anisotropy = 8;
    texture.needsUpdate = true;
    return texture;
  }
}
