#!/usr/bin/env bash
# Sincroniza la plataforma unificada AgriTwin (Hub tronco + Predio rama) con agritwin-app en GitHub Pages
set -e

AGROTECH_DIR="/Users/danielsantander/Documents/Agrotech"
HUB_DIR="$AGROTECH_DIR/agritwin-hub"
PREDIO_DIR="$AGROTECH_DIR/agritwin-predio"
TARGET_DIR="/Users/danielsantander/Documents/agritwin-app"

echo "🧹 Limpiando árbol objetivo manteniendo .git..."
find "$TARGET_DIR" -mindepth 1 -maxdepth 1 ! -name '.git' ! -name '.gitignore' -exec rm -rf {} +

echo "🌾 Sincronizando AgriTwin Hub (Tronco Principal) -> agritwin-app..."
rsync -av \
  --exclude='.git' \
  --exclude='.DS_Store' \
  --exclude='server.log' \
  --exclude='predio' \
  "$HUB_DIR/" "$TARGET_DIR/"

echo "🌱 Sincronizando AgriTwin Predio (Rama 3D Fundo Meniel) -> agritwin-app/predio/..."
mkdir -p "$TARGET_DIR/predio"
rsync -av \
  --exclude='.git' \
  --exclude='.DS_Store' \
  --exclude='AgriTwin 3D.app' \
  --exclude='set_icon' \
  --exclude='sync-github.sh' \
  "$PREDIO_DIR/" "$TARGET_DIR/predio/"

# Asegurar .nojekyll para que GitHub Pages sirva todas las carpetas y archivos
touch "$TARGET_DIR/.nojekyll"

cd "$TARGET_DIR"
git add -A
if git diff-index --quiet HEAD --; then
  echo "✅ No hay cambios nuevos pendientes en git."
else
  MSG="${1:-feat: desplegar plataforma unificada AgriTwin Hub (tronco) con dossier interactivo y rama predio}"
  git commit -m "$MSG"
  git push origin main
  echo "🚀 Cambios subidos exitosamente a https://github.com/danisantanderurrutia-coder/agritwin-app"
fi
