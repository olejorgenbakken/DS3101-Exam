const changeCaseState = (header, theCase) => {
    header.toggleAttribute("open");
    let stateText = header.querySelector(".state h3");
    let btnText = header.parentElement.querySelector("button");
    if (theCase.open) {
        theCase.open = false;
        stateText.innerText = "Lukket";
        btnText.innerText = "Åpne sak";
    } else {
        theCase.open = true;
        stateText.innerText = "Åpen";
        btnText.innerText = "Lukk sak"
    }

    localStorage.setItem("cases", JSON.stringify(cases));
}

const editCase = (theCaseIndex) => {
    localStorage.setItem("theCase", theCaseIndex);
    window.location.href = "page3.html";
}

const casesContainer = document.querySelector(".cases");
const makeElement = (newCase) => {
    if (casesContainer != null) {
        let article = document.createElement("article");
        article.className = "case";
        article.addEventListener("click", () => {
            article.toggleAttribute("open");
        });
        article.id = newCase.id;
        casesContainer.appendChild(article);

        let header = document.createElement("header");
        if (newCase.open) {
            header.setAttribute("open", true);
        }
        article.appendChild(header);

        let title = document.createElement("section");
        title.innerHTML = `<label>Tittel</label><h2>${newCase.title}</h2>`;
        header.appendChild(title);

        let state = document.createElement("section");
        state.className = "state";
        if (newCase.open) {
            state.innerHTML = "<label>Tilstand</label><h3>Åpen</h3>";
        } else {
            state.innerHTML = "<label>Tilstand</label><h3>Lukket</h3>";
        }
        header.appendChild(state);

        let type = document.createElement("section");
        type.innerHTML = `<label>Type sak</label><h3>${newCase.type}</h3>`;
        header.appendChild(type);

        let desc = document.createElement("section");
        desc.className = "description";
        desc.innerHTML = `<label>Beskrivelse</label><p>${newCase.desc}</p>`;
        article.appendChild(desc);

        let suspectList = document.createElement("section");
        suspectList.className = "suspects";
        suspectList.innerHTML = `<label>Mistenkte</label>`
        article.appendChild(suspectList);

        if (newCase.suspects != undefined) {
            let ul = document.createElement("ul");
            suspectList.appendChild(ul);

            newCase.suspects.forEach(suspect => {
                let li = document.createElement("li");
                li.innerText = suspect;
                ul.appendChild(li);
            });
        }

        let place = document.createElement("section");
        place.className = "place";
        /* The place gets an image from unsplash.com based on what's written.
        If the space is empty it generates a random image */
        place.innerHTML = `<label>Sted</label><p>${newCase.place}</p><img src="https://source.unsplash.com/1600x900/?${newCase.place}" alt="bilde av ${newCase.place}">`;
        article.appendChild(place);

        let officer = document.createElement("section");
        officer.className = "officer";
        officer.innerHTML = `<label>Betjent på saken</label>`;
        officers.forEach(officerInArray => {
            if (newCase.officerOnCase == officerInArray.name) {
                officer.innerHTML += `<img src="${officerInArray.img}" alt="${officerInArray.name}">
            <h3>${newCase.officerOnCase}</h3>`
            }
        });
        article.appendChild(officer);

        let date = new Date(newCase.date);
        let time = document.createElement("section");
        time.className = "time-created";
        time.innerHTML = `<label>Saken opprettet</label><p>${date.getDate()}.${date.getMonth()}.${date.getFullYear()}</p>`;
        article.appendChild(time);

        let stateBtn = document.createElement("button");
        stateBtn.className = "state-btn"
        if (newCase.open) {
            stateBtn.innerText = "Lukk sak";
        } else {
            stateBtn.innerText = "Åpne sak";
        }
        stateBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            changeCaseState(header, newCase);
        });
        article.appendChild(stateBtn);

        let editBtn = document.createElement("button");
        editBtn.className = "state-btn"
        editBtn.innerText = "Rediger sak";
        editBtn.addEventListener("click", (e) => {
            e.stopPropagation();  // Preventing the page from loading prematurely, as that's supposed to be done later.
            let cases = JSON.parse(localStorage.getItem("cases"));
            cases.forEach(theCase => {
                if (article.id == theCase.id) {
                    editCase(cases.indexOf(theCase));
                };
            });
        });
        article.appendChild(editBtn);
    }
}