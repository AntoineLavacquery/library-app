const booksGrid = document.querySelector("main.books-grid");

const addDialog = document.querySelector("dialog");
const addMenuButton = document.querySelector("button.addMenu");
const confirmAddButton = document.querySelector("button.add");
// const closeButton = document.querySelector("button.close");

const titleInput = document.querySelector("input[name=title]");
const authorInput = document.querySelector("input[name=author]");
const pagesInput = document.querySelector("input[name=pages]");
const readCheckbox = document.querySelector("input[name=read]");


const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

const firstBook = new Book(
    "Terre des hommes",
    "Antoine de Saint-Exupéry",
    224
)

booksGrid.innerHTML = "";
booksGrid.appendChild(generateBookCard("Wind, Sand and Stars", "Antoine de Saint-Exupéry", 224));

function displayBooks() {
    booksGrid.innerHTML = "";
    booksGrid.appendChild(generateBookCard("Wind, Sand and Stars", "Antoine de Saint-Exupéry", 224));

    for (const bookData of myLibrary) {
        booksGrid.appendChild(generateBookCard(bookData.title, bookData.author, bookData.pages));
    }
}


addMenuButton.addEventListener("click", () => {
    addDialog.showModal();
});

confirmAddButton.addEventListener("click", (event) => {
    event.preventDefault();
    const bookData = new Book(
        titleInput.value,
        authorInput.value,
        pagesInput.value,
        readCheckbox.checked
    );
    addDialog.close(JSON.stringify(bookData));
});

addDialog.addEventListener("close", (e) => {
    console.log(addDialog.returnValue);

    try {
        const bookData = JSON.parse(addDialog.returnValue);

        if (bookData && typeof bookData === "object") {
            myLibrary.push(bookData);
            // console.log(bookData.title);
            // console.log(bookData.author);
            // console.log(bookData.pages);
            // generateBookCard(bookData.title, bookData.author, bookData.pages);
        }
    } catch (error) {
        console.error("Error when analysing JSON :", error);
    }

    displayBooks();
});

function generateBookCard(title, author, pages) {
    console.log(title, typeof author, typeof pages);
    const bookCard = document.createElement("div");
    bookCard.classList.add("card");

    const titleSpan = document.createElement("span");
    titleSpan.classList.add("title");
    titleSpan.innerText = title;

    const authorSpan = document.createElement("span");
    authorSpan.classList.add("author");
    authorSpan.innerText = author;

    const pagesSpan = document.createElement("span");
    pagesSpan.classList.add("pages");
    pagesSpan.innerText = pages;

    const readButton = document.createElement("button");
    readButton.classList.add("read");
    readButton.innerText = "Read";

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("del");
    deleteButton.innerText = "Delete";

    // Ajouter les éléments au div de la carte
    bookCard.appendChild(titleSpan);
    bookCard.appendChild(authorSpan);
    bookCard.appendChild(pagesSpan);
    bookCard.appendChild(readButton);
    bookCard.appendChild(deleteButton);

    return bookCard;
}
