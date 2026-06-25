::@echo off
chcp 65001 1>nul 2>nul
pushd "%~sdp0"
::---------------------------------------------
mkdir "chrome" 1>nul 2>nul
pushd "chrome"
copy /y "..\manifest.chrome.json" ".\manifest.json"
copy /y "..\_locales"      "."
copy /y "..\changelog.txt" "."
copy /y "..\LICENSE"       "."
copy /y "..\speedup.css"   "."
copy /y "..\speedup.js"    "."
copy /y "..\sw.js"         "."
call "7z.exe" a -tzip -x!"chrome.zip" -x!"chrome.zip" -y -sse -mmt4 -mx9 "-mm=Deflate" "-mem=ZipCrypto" "-sccUTF-8" "-scsUTF-8" "-sns-" -ssp -stl -ssw "chrome.zip" *
move /y "chrome.zip" ".\.."
popd
::---------------------------------------------
mkdir "firefox" 1>nul 2>nul
pushd "firefox"
copy /y "..\manifest.firefox.json" ".\manifest.json"
copy /y "..\_locales"      "."
copy /y "..\changelog.txt" "."
copy /y "..\LICENSE"       "."
copy /y "..\speedup.css"   "."
copy /y "..\speedup.js"    "."
copy /y "..\sw.js"         "."
call "7z.exe" a -tzip -x!"firefox.zip" -x!"firefox.zip" -y -sse -mmt4 -mx9 "-mm=Deflate" "-mem=ZipCrypto" "-sccUTF-8" "-scsUTF-8" "-sns-" -ssp -stl -ssw "firefox.zip" *
move /y "firefox.zip" ".\.."
popd
::---------------------------------------------
pause