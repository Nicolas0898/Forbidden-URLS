const list = document.getElementById("list")
const scrollList = document.getElementById("scrollList")
const dyr = document.getElementById("dyr")
const fue = document.getElementById("fue")
const password_input = document.getElementById("password")
const block = document.getElementById("block")
const addBtn   = document.getElementById("addBtn")
const addInput = document.getElementById("addInput")
const password = "9876543210abcdefghijklmnopqrstuvwxyz0123456789"


function createWebsiteWidget(name){
    let div = document.createElement("div")
    div.className = "border rounded p-3 m-1 d-flex justify-content-between px-2"

    let span = document.createElement("span")
    span.innerHTML = name
    // span.className = "fw-bold"

    let btn = document.createElement("button")
    btn.className = "btn-close"
    btn.addEventListener("click",()=>{
        removeElement(name)
    })

    div.appendChild(span)
    div.appendChild(btn)

    return div
}

async function removeElement(element){
    const values = (await chrome.storage.local.get("redirectionURLS")).redirectionURLS
    var result = []


    for(i in values){
        if(values[i]!=element) result.push(values[i])
    }

    chrome.storage.local.set({"redirectionURLS":result})
    updateList(result)
}

function updateList(values){
    scrollList.innerHTML = ''
    for (i in values) {
        console.log(`i: ${i}\nalues[i]:${values[i]}`)
        let element = values[i]
        let div = createWebsiteWidget(element)
        scrollList.appendChild(div)
    }
}

chrome.storage.local.get("redirectionURLS", function (item) {
    // list.value = ""
    const values = item.redirectionURLS
    updateList(values)
});

function regBool(name) {
    let node = document.getElementById(name)
    chrome.storage.local.get(name, function (value) {
        if (value[name] == null)
            node.checked = true

        node.checked = value[name]
    })

    node.addEventListener("change", ev => {
        let data = {}
        data[name] = node.checked
        chrome.storage.local.set(data)
    })
}

regBool("fue")
regBool("dyr")

// list.addEventListener("change", ev => {
//     chrome.storage.local.set({ "redirectionURLS": [list.value.split(",")] })
// })

addBtn.addEventListener("click",async ()=>{
    const values = (await chrome.storage.local.get("redirectionURLS")).redirectionURLS
    console.log(values)
    values.push(addInput.value)
    addInput.value = ''
    chrome.storage.local.set({"redirectionURLS":values})
    updateList(values)
})

password_input.addEventListener("input",()=>{
    if(password_input.value == password){
        block.classList.remove("d-none")
    }else{
        block.classList.add("d-none")
    }
})