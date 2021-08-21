const filterCases = (typeOfFilter, filterValue) => {
    let articles = document.querySelectorAll(".case");
    for(let i = 0; i < articles.length; i++) {
        articles[i].remove();
    }

    let headerText = document.querySelector("#cases-header h2");

    let results = "";
    if(typeOfFilter == "officerFilter") {
        results = cases.filter(theCase => theCase.officerOnCase == filterValue);
        headerText.innerText = filterValue + "s saker";
    } else {
        results = cases.filter(theCase => theCase.type == filterValue);
        headerText.innerText = filterValue + " saker";
    }

    results.forEach(result => {
        makeElement(result);
    });
}

/* The same classes are used two times in my code, so this just checks if 
there are two at the given page, and adds an event listener to the correct one */
if(selectOfficers.length > 1){
    selectOfficers[1].addEventListener("change", () => {
        filterCases("officerFilter", selectOfficers[1].value);
    });
}else {
    selectOfficers[0].addEventListener("change", () => {
        filterCases("officerFilter", selectOfficers[0].value)
    });
};

if(selectType.length > 1) {
    selectType[1].addEventListener("change", () => {
        filterCases("typeFilter", selectType[1].value)
    });
} else {
    selectType[0].addEventListener("change", () => {
        filterCases("typeFilter", selectType[0].value)
    });
};