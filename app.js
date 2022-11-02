const cardContainer = document.querySelector(".card-container");

// creating empty library array
let myLibrary = [
  { title: "One Piece", author: "Eichiro Oda", totalPages: 300, read: true },
  { title: "Ranma", author: "Rumiko Takahashi", totalPages: 300, read: true },
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
  for (let book in myLibrary) {
    let card = document.createElement("div");
    card.classList.add("card");
    cardContainer.appendChild(card);
  }
}
