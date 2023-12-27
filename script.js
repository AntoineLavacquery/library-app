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

const addDialog = document.querySelector("dialog");
const addMenuButton = document.querySelector("button.addMenu");
const confirmAddButton = document.querySelector("button.add");
// const closeButton = document.querySelector("button.close");
const titleInput = document.querySelector("input[name=title]");

const pageTitle = document.querySelector("h1");

addMenuButton.addEventListener("click", () => {
    addDialog.showModal();
});

confirmAddButton.addEventListener("click", (event) => {
    event.preventDefault();
    const chosenTitle = addDialog.close(titleInput.value);
});


addDialog.addEventListener("close", (e) => {
    pageTitle.innerText =
    addDialog.returnValue === "default"
        ? "Pas de valeur retournée."
        : `${addDialog.returnValue}`;
  });













// cpassInput.addEventListener('input', function () {
//     const passValue = passInput.value;
//     const cpassValue = this.value;

//     if (passValue !== cpassValue) {
//         passInput.setCustomValidity("Passwords don't match");
//         this.setCustomValidity("Passwords don't match");
//     } else {
//         passInput.setCustomValidity("");
//         this.setCustomValidity("");
//     }
// });
