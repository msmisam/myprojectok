let myLeads = [];

const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const tabBtn = document.getElementById("tab-btn")
const deleteBtn = document.getElementById("delete-btn");
const ulEl = document.querySelector("#ul-el");
const leadsFromlocalStorage = JSON.parse( localStorage.getItem("myLeads") )

if (leadsFromlocalStorage) {
    myLeads = leadsFromlocalStorage
    render(myLeads)
}



tabBtn.addEventListener("click", function() {
    chrome.tabs.query( {active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)

    })
})

function render(leads) {
    let listItems = "" 
    for ( let i = 0; i < leads.length; i++ ) {
        //? Creating HTML li elements for each lead
        listItems += `
        <li> 
            <a href='${leads[i]}' target='_blank'>
                ${leads[i]}
            </a>
        </li>
        `
    }
ulEl.innerHTML = listItems;
}



inputBtn.addEventListener("click", function() {    
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    
    render(myLeads)
    // console.log( localStorage.getItem("myLeads") )
});


deleteBtn.addEventListener("dblclick", function() {
    //? Listening to double clicks
    localStorage.clear()
    myLeads = []
    render(myLeads)
});