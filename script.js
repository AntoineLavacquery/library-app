// User Interface
const booksGrid = document.querySelector("main.books-grid");
const addDialog = document.querySelector("dialog");
const addMenuButton = document.querySelector("button.addMenu");
const confirmAddButton = document.querySelector("button.add");
const titleInput = document.querySelector("input[name=title]");
const authorInput = document.querySelector("input[name=author]");
const pagesInput = document.querySelector("input[name=pages]");
const isReadAddCheckbox = document.querySelector("input[name=isRead]");
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
        const bookExists = this.books.some(
            (book) =>
                book.title === newBook.title && book.author === newBook.author
        );

        if (!bookExists) {
            this.books.push(newBook);
        } else {
            alert("The book is already present");
        }
    }

    updateIsRead(bookTitle, bookAuthor, bookPages, bookIsRead) {
        const foundBook = this.books.find(
            (book) =>
                book.title === bookTitle ||
                book.author === bookAuthor ||
                book.pages === bookPages ||
                book.isRead === bookIsRead
        );

        foundBook.isRead = !foundBook.isRead;
    }

    removeBook(bookTitle, bookAuthor, bookPages, bookIsRead) {
        console.log(bookPages);
        for (let book of this.books) {
            console.log(book.pages);
            console.log(book.pages === bookPages);
        }
        this.books = this.books.filter(
            (book) =>
                book.title !== bookTitle ||
                book.author !== bookAuthor ||
                book.pages !== bookPages ||
                book.isRead !== bookIsRead
        );
    }
}

const myLibrary = new Library();
displayBooks();

// Functions

function displayBooks() {
    booksGrid.innerHTML = "";
    for (const bookData of myLibrary.books) {
        booksGrid.appendChild(
            generateBookCard(
                bookData.title,
                bookData.author,
                bookData.pages,
                bookData.isRead
            )
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
        isReadAddCheckbox.checked
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

function generateBookCard(title, author, pages, isRead) {
    const bookCard = document.createElement("div");
    bookCard.classList.add("card");

    const titleSpan = document.createElement("span");
    titleSpan.classList.add("title");
    titleSpan.innerText = title;

    const authorSpan = document.createElement("span");
    authorSpan.classList.add("author");
    authorSpan.innerText = author;

    const pagesDisplay = document.createElement("div");
    const numSpan = document.createElement("span");
    numSpan.classList.add("pages");
    numSpan.innerText = pages;
    const pagesSpan = document.createElement("span");
    pagesSpan.innerText = " pages";
    pagesDisplay.appendChild(numSpan);
    pagesDisplay.appendChild(pagesSpan);

    const isReadContainer = document.createElement("div");
    isReadContainer.classList.add("isRead");

    const isReadCardLabel = document.createElement("label");
    isReadCardLabel.for = "isRead";
    isReadCardLabel.innerText = "Read";

    const isReadCardCheckbox = document.createElement("input");
    isReadCardCheckbox.name = "isRead";
    isReadCardCheckbox.type = "checkbox";
    isReadCardCheckbox.classList.add("isRead");
    isReadCardCheckbox.checked = isRead;

    isReadContainer.appendChild(isReadCardLabel);
    isReadContainer.appendChild(isReadCardCheckbox);

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("del");
    deleteButton.innerText = "Delete";

    bookCard.appendChild(titleSpan);
    bookCard.appendChild(authorSpan);
    bookCard.appendChild(pagesDisplay);
    bookCard.appendChild(isReadContainer);
    bookCard.appendChild(deleteButton);

    return bookCard;
}

booksGrid.addEventListener("click", function (event) {
    if (event.target.classList.contains("del")) {
        const card = event.target.closest(".card");

        if (card) {
            const bookTitle = card.querySelector("span.title").textContent;
            const bookAuthor = card.querySelector("span.author").textContent;
            const bookPages = card.querySelector("span.pages").textContent;
            const bookIsRead = card.querySelector("input.isRead").checked;

            myLibrary.removeBook(bookTitle, bookAuthor, bookPages, bookIsRead);
            displayBooks();
        }
    }
});

booksGrid.addEventListener("click", function (event) {
    if (event.target.classList.contains("isRead")) {
        const card = event.target.closest(".card");

        if (card) {
            const bookTitle = card.querySelector("span.title").textContent;
            const bookAuthor = card.querySelector("span.author").textContent;
            const bookPages = card.querySelector("span.pages").textContent;
            const bookIsRead = card.querySelector("input.isRead").checked;

            myLibrary.updateIsRead(
                bookTitle,
                bookAuthor,
                bookPages,
                bookIsRead
            );
            displayBooks();
        }
    }
});

// Local Storage
// Auth
// Firestore
// Utils

var people = {
    people: ["Will", "Steve"],
    init: function () {
        this.cacheDom();
        this.bindEvents();
        this.render();
    },
    cacheDom: function () {
        this.$el = $("#peopleModule");
        this.$button = this.$el.find("button");
        this.$input = this.$el.find("input");
        this.$ul = this.$el.find("ul");
        this.template = this.$el.find("#people-template").html();
    },
    bindEvents: function () {
        this.$button.on("click", this.addPerson.bind(this));
        this.$ul.delegate("i.del", "click", this.deletePerson.bind(this));
    },
    render: function () {
        var data = {
            people: this.people,
        };
        this.$ul.html(Mustache.render(this.template, data));
    },
    addPerson: function (value) {
        this.people.push(value || this.$input.val());
        this.render();
        this.$input.val("");
    },
    deletePerson: function (event) {
        var $remove = $(event.target).closest("li");
        var i = this.$ul.find("li").index($remove);
        this.people.splice(i, 1);
        this.render();
    },
};
