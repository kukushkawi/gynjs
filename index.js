let mySites = []
const sitesFromLocalStorage = JSON.parse(localStorage.getItem("mySites"))
const tabBtn = document.getElementById("save-btn")
const inputBtn = document.getElementById("input-btn")
const deleteBtn = document.getElementById("delete-btn")
const ulEl= document.getElementById("ul-el")
const inputEl = document.getElementById("input-el")

if (sitesFromLocalStorage) {
    mySites = sitesFromLocalStorage
    render(mySites)
}

function render(sites) {
    let listItems = ""
    for (let i = 0; i < sites.length; i++) {
        listItems += `
        <li>
            <a target='_blank' href='${sites[i]}'>
                ${sites[i]}
            </a>
        </li>`
    }
    ulEl.innerHTML= listItems
}

tabBtn.addEventListener("click", function() {
    browser.tabs.query({currentWindow: true, active: true}, function(tabs) {
        mySites.push(tabs[0].url)
        localStorage.setItem("mySites", JSON.stringify(mySites))
        render(mySites)
    })
})

deleteBtn.addEventListener("dblclick", function() {
    mySites = []
    localStorage.clear()
    render(mySites)
})

inputBtn.addEventListener("click", function() {
    mySites.push(inputEl.value)
    localStorage.setItem("mySites", JSON.stringify(mySites))
    render(mySites)
    inputEl.value = ""
})
