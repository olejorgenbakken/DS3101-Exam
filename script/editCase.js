/* I figured the best way of handling case editing was to just store the index
of the case that was clicked on, that way there isn't a need for splicing the 
array at any point. That usually created a bit of a hassle with the IDs, which
now is set to the new ID stored in local storage to ensure there won't be any
duplicates. */ 
let index = JSON.parse(localStorage.getItem("theCase"));

let title = form.querySelector(".input-title");
title.value = cases[index].title;
let type = form.querySelector(".select-type");
type.value = cases[index].type;
let desc = form.querySelector(".input-description");
desc.value = cases[index].desc;
let place = form.querySelector(".input-place");
place.value = cases[index].place;
let people = form.querySelector(".input-suspects");
people.value = cases[index].suspects;
let officer = form.querySelector(".select-officer");
officer.value = cases[index].officerOnCase;

let editTheCase = () => {
    let newCaseID = JSON.parse(localStorage.getItem("caseNr"));

    cases[index] = {
        id: newCaseID,
        title: title.value,
        type: type.value,
        desc: desc.value,
        place: place.value,
        suspects: people.value.split(","),
        officerOnCase: officer.value,
        open: true,
        date: new Date().getTime(),
    }
    localStorage.setItem("cases", JSON.stringify(cases));
    newCaseID++;
    localStorage.setItem("caseNr", JSON.stringify(newCaseID));
    /* After the case is edited Ifigured the best way of letting the user know something had happened
    was to send them back to the detailed view of all cases. */
    window.location.href = "page2.html"; 
}

let submitBtn = form.querySelector("button");
submitBtn.addEventListener("click", () => {
    editTheCase();
});