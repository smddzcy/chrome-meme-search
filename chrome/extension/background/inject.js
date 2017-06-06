function isInjected(tabId) {
  return chrome.tabs.executeScriptAsync(tabId, {
    code: `var injected = window.memeSearchInjected;
      window.memeSearchInjected = true;
      injected;`,
    runAt: 'document_start'
  });
}

function loadScript(name, tabId, cb) {
  if (process.env.NODE_ENV === 'production') {
    if (chrome.runtime.lastError) return;
    chrome.tabs.executeScript(tabId, { file: `/js/${name}.bundle.js`, runAt: 'document_end' }, cb);
  } else {
    // dev: async fetch bundle
    fetch(`http://localhost:3000/js/${name}.bundle.js`)
    .then(res => res.text())
    .then((fetchRes) => {
      if (chrome.runtime.lastError) return;
      chrome.tabs.executeScript(tabId, { code: fetchRes, runAt: 'document_end' }, cb);
    });
  }
}

chrome.tabs.onUpdated.addListener(async (tabId) => {
  const result = await isInjected(tabId);
  if (chrome.runtime.lastError || result[0]) return;

  loadScript('inject', tabId, () => console.log('load inject bundle success!'));
});
