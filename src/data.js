const list = document.getElementById("list")
const dyr = document.getElementById("dyr")
const fue = document.getElementById("fue")

chrome.storage.sync.get("redirectionURLS", function (item) {
    list.value = ""
    for (i in item) {
        let element = item[i]
        list.value += element.toString() + ","
    }
});

function regBool(name) {
    let node = document.getElementById(name)
    chrome.storage.sync.get(name, function (value) {
        if (value[name] == null)
            node.checked = true

        node.checked = value[name]
    })

    node.addEventListener("change", ev => {
        let data = {}
        data[name] = node.checked
        chrome.storage.sync.set(data)
    })
}

regBool("fue")
regBool("dyr")

list.addEventListener("change", ev => {
    chrome.storage.sync.set({ "redirectionURLS": [list.value.split(",")] })
})

