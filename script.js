const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary() {
    // do things
}

const dialog = document.querySelector("dialog");
const addButton = document.querySelector("button.addMenu");
const closeButton = document.querySelector("button.close");

addButton.addEventListener("click", () => {
  dialog.showModal();
});

closeButton.addEventListener("click", () => {
  dialog.close();
});
