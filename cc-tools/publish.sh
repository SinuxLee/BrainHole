#!/usr/bin/env bash
time=$(date "+%Y%m%d-%H%M%S")
echo "window.Version = \"${time}\";" > ../assets/script/version.js
/Applications/CocosCreator2010.app/Contents/MacOS/CocosCreator --path ../  --build "platform=web-mobile;debug=true;embedWebDebugger=true"
