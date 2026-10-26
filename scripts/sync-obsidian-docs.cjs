const fs = require('fs');
const path = require('path');

const VAULT_DIR = path.resolve(__dirname, '../Agro Tech');
const OUTPUT_FILE = path.resolve(__dirname, '../src/data/obsidianDocs.json');

function extractFrontmatterAndContent(raw) {
  let tags = [];
  let aliases = [];
  let title = '';
  let content = raw;

  if (raw.startsWith('---')) {
    const endFm = raw.indexOf('\n---', 3);
    if (endFm !== -1) {
      const fmContent = raw.substring(3, endFm).trim();
      content = raw.substring(endFm + 4).trim();
      
      const lines = fmContent.split('\n');
      for (const line of lines) {
        const [key, ...vals] = line.split(':');
        if (!key) continue;
        const cleanKey = key.trim();
        const cleanVal = vals.join(':').trim();
        if (cleanKey === 'tags' || cleanKey === 'tag') {
          tags = cleanVal.split(',').map(t => t.trim().replace(/^#/, '')).filter(Boolean);
        } else if (cleanKey === 'aliases' || cleanKey === 'alias') {
          aliases = cleanVal.split(',').map(a => a.trim()).filter(Boolean);
        } else if (cleanKey === 'title') {
          title = cleanVal;
        }
      }
    }
  }

  // Si no hay título en frontmatter, buscar primer encabezado H1
  if (!title) {
    const h1Match = content.match(/^#\s+(.+)$/m);
    if (h1Match) {
      title = h1Match[1].trim();
    }
  }

  // Extraer wikilinks [[...]]
  const wikilinks = Array.from(new Set(
    (content.match(/\[\[([^\]]+)\]\]/g) || []).map(link => {
      const inner = link.slice(2, -2).trim();
      return inner.split('|')[0].trim();
    })
  ));

  // Generar resumen inicial (primer párrafo que no sea encabezado ni cita)
  const paragraphs = content.split('\n\n').map(p => p.trim()).filter(p => p && !p.startsWith('#') && !p.startsWith('---'));
  let summary = paragraphs[0] || '';
  if (summary.startsWith('>')) {
    summary = paragraphs[1] || summary.replace(/^>\s*/, '');
  }
  if (summary.length > 200) {
    summary = summary.substring(0, 197) + '...';
  }

  return { title, tags, aliases, wikilinks, summary, content };
}

function scanVault(dir, baseDir = VAULT_DIR) {
  let notes = [];
  if (!fs.existsSync(dir)) return notes;

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    // Ignorar .obsidian y archivos ocultos
    if (entry.name.startsWith('.')) continue;

    const fullPath = path.join(dir, entry.name);
    const relPath = path.relative(baseDir, fullPath);

    if (entry.isDirectory()) {
      notes = notes.concat(scanVault(fullPath, baseDir));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      const raw = fs.readFileSync(fullPath, 'utf8');
      const { title, tags, aliases, wikilinks, summary, content } = extractFrontmatterAndContent(raw);
      
      const category = relPath.startsWith('Informes Generados') 
        ? 'informe-generado' 
        : relPath.startsWith('Plantillas Informes') 
        ? 'plantilla' 
        : 'conocimiento-vivo';

      notes.push({
        id: 'vault-' + relPath.replace(/[^a-zA-Z0-9_-]/g, '_').toLowerCase(),
        fileName: entry.name,
        relPath: relPath,
        vaultPath: `Agro Tech/${relPath}`,
        title: title || entry.name.replace(/\.md$/, ''),
        tags: tags.length ? tags : ['#AgroTech', '#Vault'],
        aliases,
        wikilinks,
        summary: summary || 'Documentación oficial AgroTech.',
        category,
        lineCount: raw.split('\n').length,
        byteSize: Buffer.byteLength(raw, 'utf8'),
        contentMarkdown: content
      });
    }
  }

  return notes;
}

function runSync() {
  console.log('🔄 Sincronizando Vault de Obsidian:', VAULT_DIR);
  const notes = scanVault(VAULT_DIR);
  
  const payload = {
    updatedAt: new Date().toISOString(),
    totalNotes: notes.length,
    categories: {
      conocimientoVivo: notes.filter(n => n.category === 'conocimiento-vivo').length,
      informesGenerados: notes.filter(n => n.category === 'informe-generado').length,
      plantillas: notes.filter(n => n.category === 'plantilla').length,
    },
    notes
  };

  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(payload, null, 2), 'utf8');
  console.log(`✅ Sincronización exitosa: ${notes.length} notas exportadas a ${OUTPUT_FILE}`);
}

runSync();
