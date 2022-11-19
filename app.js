const cardContainer = document.querySelector(".card-container");
const addBookBtn = document.querySelector("#add-book-btn");
const addBookFormContainer = document.querySelector(".form-container");
const bookForm = document.querySelector(".add-form");
const cancelNewBookBtn = document.querySelector(".cancel-btn");

// ****************************************
// CREATING EMPTY LIBRARY ARRAY
let myLibrary = [
  // { title: "One Piece", author: "Eichiro Oda", totalPages: 300, read: true },
];

// ****************************************
// CREATING CLASS TO BUILD NEW BOOK OBJECTS
class Book {
  constructor(title, author, totalPages, read) {
    this.title = title;
    this.author = author;
    this.totalPages = totalPages;
    this.read = read;
  }
}

// ****************************************
// FUNCTION TO ADD BOOK-OBJ TO LIBRARY ARR
function addBookToLibrary(book) {
  myLibrary.push(book);
}

// ****************************************
// LOOP OVER LIBRARY-ARR & DISPLAY EACH ITEM
function createBookCard(library) {
  for (let book of library) {
    // create new card
    let card = makeCard();
    // add book title to card
    let title = addTitle(book);
    card.appendChild(title);
    // create container for book info
    let infoContainer = makeInfoContainer();
    // add author to card
    let author = addAuthor(book);
    infoContainer.appendChild(author);
    // add pages to card
    let pages = addPages(book);
    infoContainer.appendChild(pages);
    // add read to card
    let read = addRead(book);
    infoContainer.appendChild(read);
    // add container for buttons
    let cardBtnContainer = makeCardBtnContainer();
    infoContainer.appendChild(cardBtnContainer);
    // add button to toggle read status
    let readBtn = makeReadBtn(book);
    readBtn.addEventListener("click", () => {
      toggleReadStatus(readBtn, read);
    });
    cardBtnContainer.appendChild(readBtn);
    // add remove button to card
    let removeBtn = makeRemoveBtn(book);
    removeBtn.addEventListener("click", function () {
      deleteCard(removeBtn);
      clearCardContainer();
      createBookCard(myLibrary);
    });
    cardBtnContainer.appendChild(removeBtn);
    // add card to container
    card.appendChild(infoContainer);
    cardContainer.appendChild(card);
  }
}

function makeCard() {
  let card = document.createElement("div");
  card.classList.add("card");
  return card;
}

function addTitle(book) {
  let title = document.createElement("h2");
  title.textContent = `${book.title}`;
  return title;
}

function makeInfoContainer() {
  let infoContainer = document.createElement("div");
  infoContainer.classList.add("info-container");
  return infoContainer;
}

function addAuthor(book) {
  let author = document.createElement("div");
  author.textContent = `Author: ${book.author}`;
  return author;
}

function addPages(book) {
  let pages = document.createElement("div");
  pages.textContent = `Total Pages: ${book.totalPages}`;
  return pages;
}

function addRead(book) {
  let read = document.createElement("div");
  read.textContent = `${book.read}`;
  if (read.textContent == "true") {
    read.classList.add("already-read");
    read.textContent = `Already read`;
  } else {
    read.classList.add("not-read-yet");
    read.textContent = `Still have to read`;
  }
  return read;
}

function makeCardBtnContainer() {
  let cardBtnContainer = document.createElement("div");
  cardBtnContainer.setAttribute("class", "card-btn-container");
  return cardBtnContainer;
}

function makeReadBtn(book) {
  let readBtn = document.createElement("button");
  readBtn.setAttribute("class", "btn read-btn");
  readBtn.setAttribute("data-index", myLibrary.indexOf(book));
  readBtn.textContent = "Update Read Status";
  return readBtn;
}

function makeRemoveBtn(book) {
  let removeBtn = document.createElement("button");
  removeBtn.setAttribute("class", "btn remove-btn");
  removeBtn.setAttribute("data-index", myLibrary.indexOf(book));
  removeBtn.textContent = "Remove";
  return removeBtn;
}

// ****************************************
// ADDING FUNCTIONALITY TO THE "ADD A BOOK" BTN TO POP UP A FORM ALLOWING USERS TO INPUT BOOK DETAILS
addBookBtn.addEventListener("click", showForm);

function showForm() {
  // display form
  addBookFormContainer.style.display = "block";
  // loop over existing cards and add blur effect
  let cards = document.querySelectorAll(".card");
  for (let card of cards) {
    card.classList.add("blur");
  }
}

// ****************************************
// ADDING FUNCTIONALITY TO CANCEL-BTN
cancelNewBookBtn.addEventListener("click", function (e) {
  // preventing default behaviour so existing cards won't disappear on click
  e.preventDefault();
  cancelNewBook();
});

function cancelNewBook() {
  addBookFormContainer.style.display = "none";
  // removing blur effect
  let cards = document.querySelectorAll(".card");
  card.classList.remove("blur");
}

// ****************************************
// FUNCTION TO CLEAR INPUT FIELD
function clearInput() {
  let inputs = document.querySelectorAll("input");
  for (let input of inputs) {
    input.value = "";
  }
}

// ****************************************
// FUNCTION TO CLEAR CARD CONTAINER SO CARDS WON'T SHOW UP MULTIPLE TIMES
function clearCardContainer() {
  let cards = document.querySelectorAll(".card");
  for (let card of cards) {
    cardContainer.removeChild(card);
  }
}

// ****************************************
// LISTENING FOR SUBMIT EVENT AND PREVENT DEFAULT BEHAVIOUR
bookForm.addEventListener("submit", function (e) {
  e.preventDefault();
  submitForm();
});

function submitForm() {
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const totalPages = document.querySelector("#total-pages").value;
  const read = document.querySelector("#read").checked;
  // clear card container
  clearCardContainer();
  // create new book obj
  let book = new Book(title, author, totalPages, read);
  addBookToLibrary(book);
  createBookCard(myLibrary);
  // clear input fields in form
  clearInput();
  // remove form from window
  addBookFormContainer.style.display = "none";
}

// ****************************************
// FUNCTION TO REMOVE CARDS
function deleteCard(btn) {
  let index = btn.getAttribute("data-index");
  myLibrary.splice(index, 1);
}

// ****************************************
// FUNCTION TO TOGGLE READ STATUS ON CARDS
function toggleReadStatus(btn, toggledElement) {
  let index = btn.getAttribute("data-index");
  if (myLibrary[index].read == true) {
    toggledElement.classList.remove("already-read");
    toggledElement.classList.add("not-read-yet");
    toggledElement.textContent = "Still have to read";
    myLibrary[index].read = false;
  } else if (myLibrary[index].read == false) {
    toggledElement.classList.remove("not-read-yet");
    toggledElement.classList.add("already-read");
    toggledElement.textContent = "Already read";
    myLibrary[index].read = true;
  }
}
