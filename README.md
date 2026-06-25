speedup

<img src="icon.png" />  

- discard tabs that are not active, nor auditable (playing, background), nor the last 3 you've switched-to.
- CSS to reduce rendering quality.  
- JS to set lazy loading and no preloading of media.  

<img src="screenshot_1.png" />  

<hr/>

expected issues, by design.  

- when a browser restores a discarded tab, it usually reloads it. you might loose information or you'll be presented with a message that a form will be re-sent (if the page was a result of a form).  
- the web-extension will not discard the last 3 tabs you've recently switched to, on top of current active tabs (might be more than one if you have multiple windows) and audible ones.  
- expect jagged lines and lower rendering quality (no antialiasing).  

<hr/>

<details>
<summary>test latest nightly version</summary>

Chrome/Chromium/Edge/.., and Firefox allow loading a folder of unpacked web-extension.  
0. download and unpack - https://github.com/eladkarako/webextension-speedup/archive/refs/heads/master.zip
1. rename either `manifest.chrome.json`, or `manifest.firefox.json` - to `manifest.json` .
2. use `chrome://extensions/`, or `about:debugging#/runtime/this-firefox` to load up the folder.  
3. Old Firefox might also need `about:config` to have `dom.serviceWorkers.enable` set to `true` and `devtools.aboutdebugging.new-enabled` also set to `true` .  

<hr/>

the folder should include those 6 items - `manifest.json`, `icon.png`, `speedup.css`, `speedup.js`, `sw.js`, and the `_locales` folder. that's it.

<hr/>

`zip.cmd` (uses `7z.exe`) is used to automate the copy and zip process.

</details>

<hr/>

there are no ads, no analytics, the web-extension is completely offline,  
no password protected 7z files or obfuscated code :), code is opened for review under MIT license.  

please enjoy.

<hr/>

feel free to open up an issue with  
https://github.com/eladkarako/webextension-speedup/issues/new  
if you have any question.

<a href="https://paypal.me/31adkarak0" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/Sponsor-Donate-blue?logo=paypal&style=flat" alt="PayPal Donation"><br/><img src="https://www.paypalobjects.com/webstatic/mktg/Logo/pp-logo-100px.png" alt="PayPal Donation"></a>

<br/> 