console.log('this is a trial');
showNotes();
let btn = document.getElementById('addBtn');
btn.addEventListener('click', func1);
function func1() {
    let text = document.getElementById('addTxt');
    let title = document.getElementById('addTitle');

    let notes = localStorage.getItem('notes');
    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    
    let myObj = {
         title: title.value,
         text: text.value
    }
    notesObj.push(myObj);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    title.value = '';
    text.value = '';
    showNotes();
}

function showNotes() {
    let notes = localStorage.getItem('notes');
    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `<div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${element.title}</h5>
                        <p class="card-text">${element.text}</p>
                        <button id='${index}' onclick='deleteNote(this.id)' class="btn btn-primary">Delete note</button>
                    </div>
                </div>`
    });
     let notesElem = document.getElementById('notes');
     if(notesObj.length !=0){
         notesElem.innerHTML = html;
     }
     else{
        notesElem.innerHTML = `Nothing to show! Use 'Add a Note' section to add notes`;
     }
}
function deleteNote(index) {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    showNotes();
}

let search = document.getElementById('searchTxt');
search.addEventListener('input', func2);
function func2() {
    
    let inputVal = search.value.toLowerCase();
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function (element) {

        // let cardTxt = element.getElementsByTagName('p')[0].innerText;
        // let cardTitle = element.getElementsByTagName('h5')[0].innerText;
        let cardTxt = element.children[0].children[1].innerText;
        let cardTitle = element.children[0].children[0].innerText;
        // console.log(cardTitle);
        // console.log(cardTxt);
        if(cardTxt.includes(inputVal) || cardTitle.includes(inputVal)){
            element.style.display = 'block';
        }
        else{
            element.style.display = 'none';
        }
    })
}
