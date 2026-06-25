"use strict";

/* - register a 1 minute alarm.
 * - discard all tabs that are not recently activated, nor audible.
 *
 * - note. storing the last 3 IDs, of the most recently activated tabs. (IDs are relevant to current browser session. storage is kept for session as well).
 */

const api = chrome || browser || {runtime:{lastError:true}};

const installed_handler = (details)=>{
  if("undefined" !== typeof api.runtime.lastError && null !== api.runtime.lastError){ return true; }
  api.alarms.create("alarm_to_discard_tabs", {periodInMinutes : 1.0})
    .then(alarm=>{ 
    })
    .catch(err=>{ 
    });
};

const add_id = async (id)=>{
  let ids = ((await api.storage.session.get("ids")) || {"ids":[]})["ids"];
  ids.unshift(id);
  ids.length = 3;
  return api.storage.session.set({"ids":ids});
};

const tab_activated_handler = (tab_active_info)=>{
  if("undefined" !== typeof api.runtime.lastError && null !== api.runtime.lastError){ return true; }

  add_id(tab_active_info.tabId)
  .then(()=>{
  })
  .catch(err=>{
  });
};

const discard_single_tab = async (tab)=>{
  if(!tab.id){return true;}
  const ids = ((await api.storage.session.get("ids")) || {"ids":[]}).ids;
  const is_recently_activated = (-1 !== ids.indexOf(tab.id));
  if(true === is_recently_activated){return true;}
  return api.tabs.discard(tab.id);
};

const discard_tabs = async ()=>{
  let tabs = await api.tabs.query({active:false, audible:false, discarded:false, WindowType:"normal"});
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

  discard_tabs()
  .then(()=>{
  })
  .catch(err=>{
  });
};

queueMicrotask(()=>{
  api.runtime.onInstalled.addListener(installed_handler);
  api.tabs.onActivated.addListener(tab_activated_handler);
  api.alarms.onAlarm.addListener(all_alarms_handler);
});

/* notes:
 * - `api.runtime.lastError`'s getter is consumed via callback to make chromium happy.
 * - `const api = chrome || browser` for Firefox.
 * - `api.alarms.get(alarm_name);` is not needed. creating an alarm with same-name replaces any existing one.
 * - `queueMicrotask` to set hooks since its fast.
 * - empty `.then` and `.catch` are for debug purposes. add console.log if needed.
 * - maintaining array of the last 3 recently activated tabs, to avoid discarding them. the data is stored in session storage. tab IDs are not private information, just numbers relevant to order of tabs within current session. data is optional, just to improve user experience, there is a chance recent tabs will be reused more often.
 * licensed under MIT. https://github.com/eladkarako/webextension-speedup/issues/new  
 *
 * ░▒▓█■═▬─—▄▀
 */


void 0;