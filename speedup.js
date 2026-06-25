(()=>{
  "use strict";

  const query = 'img,iframe,video,audio';

  const action_per_element = async (element)=>{
    element.loading = "lazy"; //supported for img,iframe and in some cases video.
    element.preload = "none"; //supported in video and audio. does not matter for other nodes (has no setter).
  };

  const action = async ()=>{
    let elements = Array.from(document.querySelectorAll(query));
    const settled_results = await Promise.allSettled(elements.map(element=>action_per_element(element)));
    elements = elements.map((element,index)=>{
      const o = {};
      o.element = element;
      o.settled_result = settled_results[index];
      return o;
    });
    return elements;
  };

  action().then(elements=>{
  }).catch(err=>{
  });

})();


/* - code is triggered by manifest.json two times, no additional events. 
 * - lazy-loading is managed by the browser, loading lazy is a marker. 
 * - most likely this code won't catch all the elements on the page. for now, that's fine. 
 * - some elements won't support .loading nor .preload, it will just be ignored, that's fine too. 
 * licensed under MIT. https://github.com/eladkarako/webextension-speedup/issues/new  
 *
 * ░▒▓█■═▬─—▄▀
 */


void 0;