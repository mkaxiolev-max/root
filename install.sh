#!/usr/bin/env bash
set -e
TMP_FILE="/tmp/root"
INSTALL_PATH="/usr/local/bin/root"
echo "Installing ROOT..."
SCRIPT_URL="${ROOT_SCRIPT_URL:-https://raw.githubusercontent.com/YOURNAME/root/main/root.py}"
curl -L "$SCRIPT_URL" -o "$TMP_FILE"
chmod +x "$TMP_FILE"
if [ -w "/usr/local/bin" ]; then
  mv "$TMP_FILE" "$INSTALL_PATH"
else
  sudo mv "$TMP_FILE" "$INSTALL_PATH"
fi
echo ""
echo "ROOT installed."
echo "Run:"
echo "root"
