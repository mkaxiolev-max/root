#!/usr/bin/env bash
set -e
INSTALL_DIR="$HOME/.local/bin"
mkdir -p "$INSTALL_DIR"
echo "Installing ROOT..."
curl -sL "https://raw.githubusercontent.com/mkaxiolev-max/root/main/root.py" -o "$INSTALL_DIR/root"
chmod +x "$INSTALL_DIR/root"
if [ -f "$HOME/.zshrc" ] && ! grep -q 'local/bin' "$HOME/.zshrc" 2>/dev/null; then
  echo 'export PATH="$HOME/.local/bin:$PATH"' >> "$HOME/.zshrc"
fi
if [ -f "$HOME/.bashrc" ] && ! grep -q 'local/bin' "$HOME/.bashrc" 2>/dev/null; then
  echo 'export PATH="$HOME/.local/bin:$PATH"' >> "$HOME/.bashrc"
fi
export PATH="$INSTALL_DIR:$PATH"
echo "ROOT installed. Run: root"
