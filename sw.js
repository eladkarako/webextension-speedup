"use strict";
const api = chrome || browser || {runtime:{lastError:true}};

const installed_handler = (details)=>{
  if("undefined" !== typeof api.runtime.lastError && null !== api.runtime.lastError){ return true; }
  api.alarms.create("alarm_to_discard_tabs", {periodInMinutes:1.0})
  .then(alarm=>{ 
  })
  .catch(err=>{ 
  });
};

const add_id = async (id)=>{
  const IDS_MAX_LENGTH = 3;
  const o = await api.storage.session.get("ids");
  o.ids = o.ids || [];
  o.ids.unshift(id);
  o.ids.length = IDS_MAX_LENGTH;
  return api.storage.session.set(o);
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
  const o = await api.storage.session.get("ids");
  o.ids = o.ids || [];
  const is_recently_activated = (-1 !== o.ids.indexOf(tab.id));
  if(true === is_recently_activated){return true;}
  return api.tabs.discard(tab.id);
};

const discard_tabs = async ()=>{
  let tabs = await api.tabs.query({active:false, audible:false, discarded:false, WindowType:"normal"});
  tabs = tabs.filter(tab=>("complete" === tab.status));
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
  if (!alarm || "alarm_to_discard_tabs" !== alarm.name){ return true; }

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
 * - `api.alarms.get("alarm_to_discard_tabs");` is not needed. creating an alarm with same-name replaces any existing one.
 * - `queueMicrotask` to set hooks since its fast.
 * - return true is just an old practice for callbacks ;) not really needed.
 * - empty `.then` and `.catch` are for debug purposes. add console.log if needed.
 *
 *
 * - register a 1 minute alarm.
 * - discard all tabs that are not active, audible, or in a list of 3 IDs of 3 most recently "switched-to" tabs.
 * - the 3 tab-id of recently switched-to tabs, is relevant to current browser session, 
 * - it is stored in a local, temporary session-storage too (deleted when browser restarts).
 * - it is considered volatile, and optional, just to improve user experience and make this web-extension more seamless.
 *
 * licensed under MIT. https://github.com/eladkarako/webextension-speedup/issues/new  
 *
 * ░▒▓█■═▬─—▄▀
 */


void 0;