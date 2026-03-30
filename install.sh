#!/usr/bin/env bash
set -e
INSTALL_DIR="$HOME/.local/bin"
mkdir -p "$INSTALL_DIR"
echo "Installing ROOT..."
curl -sL "https://raw.githubusercontent.com/mkaxiolev-max/root/main/root.py" -o "$INSTALL_DIR/root"
chmod +x "$INSTALL_DIR/root"
if [[ ":$PATH:" != *":$INSTALL_DIR:"* ]]; then
  echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc
  export PATH="$HOME/.local/bin:$PATH"
fi
echo ""
echo "ROOT installed. Run: root"
