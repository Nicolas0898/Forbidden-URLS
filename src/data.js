const list = document.getElementById("list")
const scrollList = document.getElementById("scrollList")
const dyr = document.getElementById("dyr")
const fue = document.getElementById("fue")
const password_input = document.getElementById("password")
const block = document.getElementById("block")
const addBtn   = document.getElementById("addBtn")
const addInput = document.getElementById("addInput")
const next = document.getElementById("next")

const alphabet = "abcdefghijklmnopqrstuvwxyz"
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const numbers  = "0123456789"
const symbols  = "!@#$%&*(){}/=-+_,.<>;:"
const password = generatePassword()

function random(min,max){
    return Math.round(Math.random() * (max-min)) + min
}

function generatePassword(){
    let pass = ''
    const size = 25

    for(let i = 0;i<size;i++){
        const rnd = random(1,4)
        switch(rnd){
            case 1:
                pass+=alphabet[random(0,alphabet.length - 1)]
                break
            case 2:
                pass+=ALPHABET[random(0,ALPHABET.length - 1)]
                break
            case 3:
                pass+=numbers[random(0,numbers.length - 1)]
                break
            case 4:
                pass+=symbols[random(0,symbols.length - 1)]
                break
        }
    }
    


    return pass
}


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
    let equal = true
    for(i in password_input.value){
        const char  = password_input.value[i]
        const other = password[i]
        if(char!=other){
            equal = false
            break
        }
    }

    if(equal){
        password_input.classList.remove("border-danger")
        password_input.classList.remove("text-danger")
    }else{
        password_input.classList.add("border-danger")
        password_input.classList.add("text-danger")
    }


    const nextchar = password[password_input.value.length]
    if(nextchar){
        next.innerText = nextchar 
    }else{
        next.innerText = "UNLOCKED!"
    }
    if(password_input.value == password){
        block.classList.remove("d-none")
    }else{
        block.classList.add("d-none")
    }
})

next.innerText = password[0]