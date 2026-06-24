speedup

<img src="icon.png" />  

- discard tabs that are not active nor auditable (playing).
- CSS to reduce rendering quality.  
- JS to set lazy loading and no preloading of media.  

<img src="screenshot_1.png" />  

<hr/>

expected issues, by design.  

when a tab is clicked or switched to,  
it will be restored which often also refresh it.  
this might not be suitable for login pages, or forms.  
it can be really annoying when you switch between two tabs.  
for now, you can move one of the tabs to a new windows,  

jagged lines in every graphic resource (no antialiasing).  

possible solution is to filter out tabs based on their creation timestamp (sort, pop),  
but a recent timestamp does not tell you anything about the recent switching order,  
...and I prefer to not query and maintain the last N switched tabs (I might had to though).

<hr/>

<details>
<summary>test latest nightly version</summary>

to get the latest (nightly) version, download and unpack  
https://github.com/eladkarako/webextension-speedup/archive/refs/heads/master.zip  
- for Chrome (or Edge), copy `manifest.chrome.json` to `manifest.json`. use `chrome://extensions/`, switch ON the developer-mode and click `load unpacked` (select the unpacked folder).  
- for Firefox make-sure `about:config` has `dom.serviceWorkers.enable` set to `true`,  
and `devtools.aboutdebugging.new-enabled` also set to `true`,  
copy `manifest.firefox.json` to `manifest.json`
which has 

```json
,"background"       : {"service_worker": "sw.js"}
```

set to 

```json
,"background"       : {"scripts"    : ["sw.js"]
                      }
```

the open up `about:debugging#/runtime/this-firefox` click `Load Temporary Add-on…` and click the `manifest.json` in the folder.  

the issue here is that firefox based browser ignores what you click, and will look inside the `manifest.json` in that folder. misleading. 
to be clear I've made sure NOT to include explicitly any `manifest.json` but let you copy the one you want to use to `manifest.json` . 

- https://github.com/mozilla/web-ext/issues/3045#issuecomment-4784791063  
- https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Background_scripts#specify_the_background_scripts  
- https://web.archive.org/web/20260624004141/https://developer.chrome.com/docs/extensions/develop/migrate/to-service-workers  

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