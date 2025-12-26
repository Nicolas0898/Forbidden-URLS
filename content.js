var c_url = "https://google.com"
var redirection_enabled = true

var redirectPatterns = ["shorts"]

function isPatternArrayInUrl(patternArray, Url) {

  for (i in patternArray) {
    let value = patternArray[i]

    console.log(value)
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

function redirect() {
  if (redirection_enabled == false) return

  if (isPatternArrayInUrl(redirectPatterns, window.location.href)) {
    window.location.href = c_url;
  }
}

function loadData() {
  chrome.storage.sync.get("fue", function (item) {
    redirection_enabled = item.fue

    chrome.storage.sync.get("redirectionURLS", function (item) {
      redirectPatterns = item.redirectionURLS[0]
      redirect()
    })
  })


}

navigation.addEventListener("navigate", e => {
  if (isPatternArrayInUrl(redirectPatterns, e.destination.url)) return
  loadData()
});

loadData()

// checks for changes
chrome.storage.onChanged.addListener((changes) => {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    if (key == "fue") {
      redirection_enabled = newValue
      redirect()
    }
    if (key == "redirectionURLS") {
      redirectPatterns = newValue
      redirect()
    }
  }
});
