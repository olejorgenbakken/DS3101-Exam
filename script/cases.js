const officers = [{
    name: "Hans Sverre Sjøvold",
    img: "https://www.pst.no/globalassets/bilder/ledere/hans-sverre-sjovold.jpg?width=756&height=756&quality=75",
}, {
    name: "Roger Berg",
    img: "https://www.pst.no/globalassets/bilder/ledere/roger.jpg?width=756&height=756&quality=75",
}, {
    name: "Signe Astrup Arnesen",
    img: "https://www.pst.no/globalassets/bilder/ledere/signe.jpg?width=756&height=756&quality=75",
}, {
    name: "Geir Garø",
    img: "https://www.pst.no/globalassets/bilder/ledere/geir.jpg?width=756&height=756&quality=75",
}, {
    name: "Anita Wattum",
    img: "https://www.pst.no/globalassets/bilder/ledere/wattum-anita-20190826-017.jpg?width=756&height=756&quality=75",
}];
const caseTypes = ["terrorisme", "spionasje"];
let cases = [];
if(localStorage.getItem("cases") != null) {
    cases = JSON.parse(localStorage.getItem("cases"));
    cases.forEach(newCase => {
        makeElement(newCase);
    });
};

const selectOfficers = document.querySelectorAll(".select-officer");
selectOfficers.forEach(select => {
    for(let i = 0; i < officers.length; i++){
        select.innerHTML += `<option>${officers[i].name}</option>`
    };
});
const selectType = document.querySelectorAll(".select-type");
selectType.forEach(select => {
    for(let i = 0; i < caseTypes.length; i++){
        select.innerHTML += `<option>${caseTypes[i]}</option>`
    };
});

/* To give a case ID I chose to store the caseNr variable in local storage, 
   just to make sure it doesn't reset at some random and unwanted time. */
let caseNr = 0;
if(localStorage.getItem("caseNr") != null) {
    caseNr = JSON.parse(localStorage.getItem("caseNr"));
}
localStorage.setItem("caseNr", JSON.stringify(caseNr));

const form = document.querySelector(".new-case-form");
const submitForm = () => {
    let newCaseID = JSON.parse(localStorage.getItem("caseNr"));
    const newCaseTitle = document.querySelector(".input-title").value;
    const newCaseType = document.querySelector(".new-case-form .select-type").value;
    const newCaseDesc = document.querySelector(".input-description").value;
    const newCasePlace = document.querySelector(".input-place").value;
    const newCaseSuspects = document.querySelector(".input-suspects").value.split(", ");
    const newCaseOfficer = document.querySelector(".new-case-form .select-officer").value;

    let newCase = {
        id: newCaseID,
        title: newCaseTitle,
        type: newCaseType,
        desc: newCaseDesc,
        place: newCasePlace,
        suspects: newCaseSuspects,
        officerOnCase: newCaseOfficer,
        open: true,
        date: new Date().getTime(),
    }
    cases.push(newCase);
    localStorage.setItem("cases", JSON.stringify(cases));
    newCaseID++;
    localStorage.setItem("caseNr", JSON.stringify(newCaseID));
    makeElement(newCase);
}
const formSubmitBtn = document.querySelector(".new-case-form .make-case");
if(formSubmitBtn != undefined) {
    formSubmitBtn.addEventListener("click", submitForm);
}