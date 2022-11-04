const cardContainer = document.querySelector(".card-container");
const addBookBtn = document.querySelector("#add-book-btn");
const addBookForm = document.querySelector(".form-container");
const cancelNewBookBtn = document.querySelector(".cancel-btn");

// creating empty library array
let myLibrary = [
  { title: "One Piece", author: "Eichiro Oda", totalPages: 300, read: true },
  { title: "Ranma", author: "Rumiko Takahashi", totalPages: 300, read: true },
  {
    title: "Detective Conan",
    author: "Gosho Aoyama",
    totalPages: 300,
    read: false,
  },
];

// creating constructor function to create book objects
function Book(title, author, totalPages, read) {
  this.title = title;
  this.author = author;
  this.totalPages = totalPages;
  this.read = read;
  this.info = function () {
    let readYet;
    if (read) {
      readYet = "already read";
    } else {
      readYet = "not read yet";
    }
    return `${title} by ${author}, ${totalPages} pages, ${readYet}`;
  };
}

// creating function to add book to library array
function addBookToLibrary(book) {
  myLibrary.push(book);
}

// creating a function that loops through the array and displays each book on the page
function createBookCard(myLibrary) {
  for (let book of myLibrary) {
    console.log(book);
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
    // add card to container
    card.appendChild(infoContainer);
    cardContainer.appendChild(card);
  }
}

// adding functionality to the "add a book" button to pop up a form allowing users to input the details for the new book

addBookBtn.addEventListener(
  "click",
  () => (addBookForm.style.display = "block")
);

cancelNewBookBtn.addEventListener(
  "click",
  () => (addBookForm.style.display = "none")
);
