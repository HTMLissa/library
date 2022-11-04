const cardContainer = document.querySelector(".card-container");
const addBookBtn = document.querySelector("#add-book-btn");
const addBookFormContainer = document.querySelector(".form-container");
const bookForm = document.querySelector(".add-form");
const cancelNewBookBtn = document.querySelector(".cancel-btn");

// creating empty library array
let myLibrary = [
  //   { title: "One Piece", author: "Eichiro Oda", totalPages: 300, read: true },
  //   { title: "Ranma", author: "Rumiko Takahashi", totalPages: 300, read: true },
  //   {
  //     title: "Detective Conan",
  //     author: "Gosho Aoyama",
  //     totalPages: 300,
  //     read: false,
  //   },
];

// creating constructor function to create book objects
function Book(title, author, totalPages, read) {
  this.title = title;
  this.author = author;
  this.totalPages = totalPages;
  this.read = read;
}

// creating function to add book to library array
function addBookToLibrary(book) {
  myLibrary.push(book);
}

// creating a function that loops through the array and displays each book on the page
function createBookCard(myLibrary) {
  for (let book of myLibrary) {
    // create new card
    let card = document.createElement("div");
    card.classList.add("card");
    // add book title to card
    let title = document.createElement("h2");
    title.textContent = `${book.title}`;
    card.appendChild(title);
    // create container for book info
    let infoContainer = document.createElement("div");
    infoContainer.classList.add("info-container");
    // add author to card
    let author = document.createElement("div");
    author.textContent = `Author: ${book.author}`;
    infoContainer.appendChild(author);
    // add pages to card
    let pages = document.createElement("div");
    pages.textContent = `Total Pages: ${book.totalPages}`;
    infoContainer.appendChild(pages);
    // add read to card
    let read = document.createElement("div");
    read.textContent = `${book.read}`;
    if (read.textContent == "true") {
      read.classList.add("already-read");
      read.textContent = `Already read`;
    } else {
      read.classList.add("not-read-yet");
      read.textContent = `Still have to read`;
    }
    infoContainer.appendChild(read);
    // add remove button to card
    let removeBtn = document.createElement("button");
    removeBtn.setAttribute("class", "btn remove-btn");
    removeBtn.textContent = "Remove";
    infoContainer.appendChild(removeBtn);
    // add card to container
    card.appendChild(infoContainer);
    cardContainer.appendChild(card);
  }
}

// adding functionality to the "add a book" button to pop up a form allowing users to input the details for the new book

addBookBtn.addEventListener("click", () => {
  addBookFormContainer.style.display = "block";
  //   adding blur effect to cards
  let cards = document.querySelectorAll(".card");
  for (let card of cards) {
    card.classList.add("blur");
  }
});

cancelNewBookBtn.addEventListener("click", function (e) {
  // preventing default behaviour so existing cards won't disappear on click
  e.preventDefault();
  addBookFormContainer.style.display = "none";
  //   removing blur effect
  let cards = document.querySelectorAll(".card");
  for (let card of cards) {
    card.classList.remove("blur");
  }
});

// function to clear input field
function clearInput() {
  let inputs = document.querySelectorAll("input");
  for (let input of inputs) {
    input.value = "";
  }
}

// function to clear .card-container so cards won't show up multiple times
function clearCardContainer() {
  let cards = document.querySelectorAll(".card");
  for (let card of cards) {
    cardContainer.removeChild(card);
  }
}

// listening to submit event and prevent default behaviour
bookForm.addEventListener("submit", function (e) {
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const totalPages = document.querySelector("#total-pages").value;
  const read = document.querySelector("#read").checked;
  // prevent default behaviour and display new book
  e.preventDefault();
  // clear cardContainer
  clearCardContainer();
  // create new book obj
  let book = new Book(title, author, totalPages, read);
  addBookToLibrary(book);
  createBookCard(myLibrary);
  // clear input fields in form
  clearInput();
  // remove form from window
  addBookFormContainer.style.display = "none";
});
