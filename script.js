// User Interface
const booksGrid = document.querySelector("main.books-grid");
const addDialog = document.querySelector("dialog");
const addMenuButton = document.querySelector("button.addMenu");
const confirmAddButton = document.querySelector("button.add");
const titleInput = document.querySelector("input[name=title]");
const authorInput = document.querySelector("input[name=author]");
const pagesInput = document.querySelector("input[name=pages]");
const isReadCheckbox = document.querySelector("input[name=isRead]");
const delButton = document.querySelector("button.del");

// Data Structures

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

class Library {
    constructor() {
        this.books = [
            {
                title: "Wind, Sand and Stars",
                author: "Antoine de Saint-Exupéry",
                pages: "224",
                isRead: true,
            },
        ];
    }

    addBook(newBook) {
        this.books.push(newBook);
    }

    removeBook(bookTitle) {
        this.books = this.books.filter((book) => book.title !== bookTitle)
    }
}

// const myLibrary = [
//     {
//         title: "Wind, Sand and Stars",
//         author: "Antoine de Saint-Exupéry",
//         pages: "224",
//         isRead: true,
//     },
// ];

const myLibrary = new Library();
displayBooks();

// Functions

function displayBooks() {
    booksGrid.innerHTML = "";
    for (const bookData of myLibrary.books) {
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
        titleInput.value.trim() || undefined,
        authorInput.value.trim() || undefined,
        pagesInput.value.trim() || undefined,
        isReadCheckbox.checked
    );
    addDialog.close(JSON.stringify(bookData));
});

addDialog.addEventListener("close", (e) => {
    console.log(addDialog.returnValue);

    try {
        const bookData = JSON.parse(addDialog.returnValue);

        if (bookData && typeof bookData === "object") {
            myLibrary.addBook(bookData);
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
    isReadButton.classList.add("isRead");
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

booksGrid.addEventListener("click", function (event) {
    if (event.target.classList.contains("del")) {
        var card = event.target.closest(".card");

        if (card) {
            var bookTitle = card.querySelector(".title").textContent;

            myLibrary.removeBook(bookTitle);
            displayBooks();
        }
    }
});

// Local Storage
// Auth
// Firestore
// Utils
