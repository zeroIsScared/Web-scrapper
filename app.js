'use strict';

const URL = 'https://en.wikipedia.org/wiki/List_of_programming_languages';

function render(languages) {

    let body = document.body;
    let table = document.createElement('table');
    let rows = [];
    let cells = [];
    let numbOfRows = Math.round(languages.length / 4);

    do {

        let tr = document.createElement('tr');
        rows.push(tr);
        rows;
    } while (numbOfRows !== rows.length);

    console.log(rows)

    for (let i = 0; i < languages.length; i++) {

        let td = document.createElement('td');
        td.innerText = languages[i];
        cells.push(td);
    }

    let limitPerRow = [4];
    let x = limitPerRow[0];
    while (x < languages.length) {
        x += 4;
        limitPerRow.push(x);

    }
    console.log(limitPerRow)
    let r = 0;
    let addedCells = 0;
    let z = 0;

    do {
        for (let j = 0; j < cells.length; j++) {
            let row = rows[r];
            console.log(r)
            console.log(rows[r])
            let cell = cells[j];
            console.log(typeof cell)

            if (typeof cell === 'object') {
                row.appendChild(cell);
                addedCells++;
            }

            if (j === limitPerRow[r] - 1) {

                table.appendChild(row);
                body.appendChild(table);

                r++;
            }

        }

    } while (addedCells === limitPerRow[r])
}



function loadPage(cb) {
    //1. prep the connection object
    let xhr = new XMLHttpRequest();

    //2. setup
    xhr.open('GET', URL);

    // 2.a. callback
    xhr.onload = () => {

        //Parse the Doc
        let html = xhr.responseText; // string
        let parser = new DOMParser();
        let htmlDOC = parser.parseFromString(html, 'text/html');
        console.log(htmlDOC)
        //Traverse the DOM structure And scrape
        let languages = [];
        let divs = htmlDOC.querySelectorAll('.div-col');
        console.log(divs)
        let div = divs[9];
        let lis = div.firstElementChild.children;

        for (let i = 0; i < lis.length; i++) {
            languages.push(lis[i].firstElementChild.innerText);
        }
        console.log(languages)


        // HW render the gathered info into HTML table
        //using DOM OOP approach

        cb(languages);
        console.log(xhr.responseText);
    }

    // 3. send the request

    xhr.send()
}
loadPage(render)
