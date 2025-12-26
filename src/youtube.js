var isActive = true

function a(e) {
    console.log(isActive)
    var check = window.location.href
    if (e) check = e

    if (check.indexOf("results") == -1
        && !document.querySelector("#style_remover")
        && isActive) {

        var style = document.createElement("style")
        style.id = "style_remover"
        style.innerHTML = ".ytd-rich-item-renderer,#contents{display:none !important;}"
        document.head.appendChild(style)
    } else {
        if (document.querySelector("#style_remover")) document.querySelector("#style_remover").remove()
    }
}

navigation.addEventListener("navigate", e => {
    a(e.destination.url)
})

chrome.storage.sync.get("dyr", function (value) {
    if (value.dyr==null)
        isActive = true
    isActive = value.dyr
    a()
})

chrome.storage.onChanged.addListener((changes) => {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    if(key=="dyr"){
        isActive = newValue
        a()
    }
  }
});