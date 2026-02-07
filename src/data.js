const list = document.getElementById("list")
const dyr = document.getElementById("dyr")
const fue = document.getElementById("fue")
const password_input = document.getElementById("password")
const block = document.getElementById("block")
const password = "a1b2c3d4e5f6g7h8i9j10k11l12m13n14o15p16q17r18s19t20u21v22w23x24y25z26"

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

password_input.addEventListener("input",()=>{
    if(password_input.value == password){
        block.classList.remove("d-none")
    }else{
        block.classList.add("d-none")
    }
})