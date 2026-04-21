var c_url = "./blocked.html"
var redirection_enabled = true

var redirectPatterns = ["shorts"]

function isPatternArrayInUrl(patternArray, Url) {

  for (i in patternArray) {
    let value = patternArray[i]

    if(value[0]==":"){
      let c =  (":"+ ( Url.split("/")[2] )) == value
      if(c) return c 
    }else{
      if (Url.indexOf(value) != -1) {
        return true
      }
    }
  }

  return false
}

function redirect(tab) {
  if (!tab) return
  if (redirection_enabled == false) return
  console.log("QUERYING REDIRECTION")
  if (isPatternArrayInUrl(redirectPatterns, tab.url)) {
    // window.location.href = c_url;
    // document.body.remove()
    // document.head.remove()
    // window.location.replace(c_url);
    console.log(`REDIRECTION ${tab.url} to ${c_url}`)
    chrome.tabs.update(tab.id,{url:c_url})
  }
}

function loadData() {
  chrome.storage.local.get(["fue","redirectionURLS"], function (item) {
    redirection_enabled = item.fue

    redirectPatterns = item.redirectionURLS
  })


}

// navigation.addEventListener("navigate", e => {
//   if (isPatternArrayInUrl(redirectPatterns, e.destination.url)) return
//   loadData()
// });

loadData()

chrome.tabs.onActivated.addListener(async obj=>{
  console.log("activated tab")
  const tab = await chrome.tabs.get(obj.tabId)
  console.log(tab)
  // console.log(window)
  // console.log(chrome.tabs.pendingUrl)
  redirect(tab)
})

chrome.tabs.onUpdated.addListener(async tabId=>{
  console.log("updated tab")
  const tab = await chrome.tabs.get(tabId)
  console.log(tab)

  redirect(tab)
})

// checks for changes
chrome.storage.onChanged.addListener((changes) => {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    if (key == "fue") {
      redirection_enabled = newValue
    }
    if (key == "redirectionURLS") {
      redirectPatterns = newValue
    }
  }
});
