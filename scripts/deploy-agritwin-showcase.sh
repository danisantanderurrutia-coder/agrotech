#!/usr/bin/env bash
# Despliega exclusivamente la "Carta de Presentación" de AgriTwin a https://danisantanderurrutia-coder.github.io/agritwin-app/
# Cero fugas de propiedad intelectual: elimina código fuente interno, mallas 3D y scripts del despliegue público.
set -e

AGROTECH_DIR="/Users/danielsantander/Documents/Agrotech"
DIST_DIR="$AGROTECH_DIR/webAgrotech/dist"
TARGET_DIR="/Users/danielsantander/Documents/agritwin-app"

echo "🔨 1. Compilando la última versión de la Carta de Presentación en webAgrotech..."
cd "$AGROTECH_DIR"
npm run build

echo "🧹 2. Limpiando archivos del repositorio público en $TARGET_DIR (conservando .git y workflows)..."
find "$TARGET_DIR" -mindepth 1 -maxdepth 1 ! -name '.git' ! -name '.github' ! -name '.gitignore' -exec rm -rf {} +

echo "📦 3. Copiando paquete estático público a agritwin-app..."
cp -r "$DIST_DIR/"* "$TARGET_DIR/"
touch "$TARGET_DIR/.nojekyll"

echo "🚀 4. Preparando commit en agritwin-app..."
cd "$TARGET_DIR"
git add -A

if git diff-index --quiet HEAD --; then
  echo "✅ No hay cambios pendientes en agritwin-app."
else
  MSG="${1:-feat: publicar carta de presentacion ejecutiva de AgriTwin (showcase B2B seguro)}"
  git commit -m "$MSG"
  echo "✨ Commit listo en agritwin-app: $MSG"
  echo "Para publicar en vivo ejecuta en $TARGET_DIR:"
  echo "  git push origin main"
fi
