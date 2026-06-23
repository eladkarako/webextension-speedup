"use strict";

const api        = chrome || browser || {runtime:{lastError:true}}
     ,alarm_name = api.i18n.getMessage("alarm_name") || "alarm_to_discard_tabs"
     ,alarm_info = {periodInMinutes : 1.0
                   }
     ,query_info = {active    : false
                   ,audible   : false
                   ,discarded : false
                   ,frozen    : false
                   }
     ;


const installed_handler = (details)=>{
  if("undefined" !== typeof api.runtime.lastError && null !== api.runtime.lastError){ return true; }
  api.alarms.create(alarm_name, alarm_info)
  .then(alarm=>{ 
  }).catch(err=>{ 
  });
};

const discard_single_tab = async (tab)=>{
  if(!tab.id){return true;}
  return api.tabs.discard(tab.id);
};

const discard_tabs = async ()=>{
  let tabs = await api.tabs.query(query_info);
  const settled_results = await Promise.allSettled(tabs.map(tab=>(discard_single_tab(tab))));
  tabs = tabs.map((tab,index)=>{
    const o = {};
    o.tab = tab;
    o.settled_result = settled_results[index];
    return o;
  });
  return tabs;
};

const all_alarms_handler = (alarm)=>{
  if("undefined" !== typeof api.runtime.lastError && null !== api.runtime.lastError){ return true; }
  if (!alarm || alarm_name !== alarm.name){ return true; }

  discard_tabs().then(tabs=>{
  }).catch(err=>{
  });
};

queueMicrotask(()=>{
  api.runtime.onInstalled.addListener(installed_handler);
  api.alarms.onAlarm.addListener(all_alarms_handler);
});


/* https://developer.chrome.com/docs/extensions/reference/api/i18n
 * https://developer.chrome.com/docs/extensions/reference/api/alarms
 * https://developer.chrome.com/docs/extensions/reference/api/tabs
 * https://developer.chrome.com/docs/extensions/reference/api/runtime
 * https://developer.chrome.com/docs/web-platform/page-lifecycle-api
 * https://developer.mozilla.org/en-US/docs/Web/API/Window/queueMicrotask
 *
 * notes:
 * - `api.runtime.lastError` - Chrome needs you to check it. doing so triggers via its getter a secondary system that marks "you have checked it" for the developer extension page. it is only available from within callbacks. when there is no error in Chromium based browsers the value will be undefined, but in Mozilla it will be null.
 * - `chrome || browser` will handle chromium and firefox based browsers.
 * - `api.alarms.get(alarm_name);` is not needed. creating alarm with same-name replaces any existing one.
 * - `queueMicrotask` may be removed. there aren't tiny tasks in here really.
 * - there are several empty .then and .catch for example `discard_tabs().then(tabs=>{` you can include console.log to view the states. it isn't really needed, it is just for debug, bug without console.log line in the code. I can confirm that chromium and edge respect the discard call and instead of waiting for the tab to sleep then discard it in about 5minute - 1 hour (demanding on available RAM and CPU), it changes state right away.
 * licensed under MIT. https://github.com/eladkarako/webextension-speedup/issues/new  
 *
 * ░▒▓█■═▬─—▄▀
 */


void 0;