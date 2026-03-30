#!/usr/bin/env bash
set -e
TMP_FILE="/tmp/root_cli"
INSTALL_PATH="/usr/local/bin/root"
echo "Installing ROOT..."
curl -sL "https://raw.githubusercontent.com/mkaxiolev-max/root/main/root.py" -o "$TMP_FILE"
chmod +x "$TMP_FILE"
echo "Moving to $INSTALL_PATH (may require password)..."
sudo mv "$TMP_FILE" "$INSTALL_PATH"
echo ""
echo "ROOT installed. Run: root"
