// Data Structures

const myLibrary = [
    {
        title: "Wind, Sand and Stars",
        author: "Antoine de Saint-Exupéry",
        pages: "224",
        isRead: true,
    },
];

class Book {
    constructor(
        title = "Unknown",
        author = "Unknown",
        pages = "0",
        isRead = false
    ) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
    }
}

displayBooks();

// User Interface

const booksGrid = document.querySelector("main.books-grid");
const addDialog = document.querySelector("dialog");
const addMenuButton = document.querySelector("button.addMenu");
const confirmAddButton = document.querySelector("button.add");
const titleInput = document.querySelector("input[name=title]");
const authorInput = document.querySelector("input[name=author]");
const pagesInput = document.querySelector("input[name=pages]");
const isReadCheckbox = document.querySelector("input[name=isRead]");

function displayBooks() {
    booksGrid.innerHTML = "";
    for (const bookData of myLibrary) {
        booksGrid.appendChild(
            generateBookCard(bookData.title, bookData.author, bookData.pages)
        );
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
        isReadCheckbox.checked
    );
    addDialog.close(JSON.stringify(bookData));
});

addDialog.addEventListener("close", (e) => {
    console.log(addDialog.returnValue);

    try {
        const bookData = JSON.parse(addDialog.returnValue);

        if (bookData && typeof bookData === "object") {
            myLibrary.push(bookData);
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

    const isReadButton = document.createElement("button");
    isReadButton.classList.add("read");
    isReadButton.innerText = "Read";

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("del");
    deleteButton.innerText = "Delete";

    bookCard.appendChild(titleSpan);
    bookCard.appendChild(authorSpan);
    bookCard.appendChild(pagesSpan);
    bookCard.appendChild(isReadButton);
    bookCard.appendChild(deleteButton);

    return bookCard;
}

// Local Storage
// Auth
// Firestore
// Utils
