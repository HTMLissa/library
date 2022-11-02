// creating empty library array
let myLibrary = [];

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
