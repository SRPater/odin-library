const myLibrary = [];

function Book(id, title, author, numPages, read) {
    if (!new.target) {
        throw Error("Must use 'new' keyword to call constructor!");
    }

    this.id = id;
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.read = read;
}

function addBookToLibrary(title, author, numPages, read) {
    const book = new Book(
        crypto.randomUUID(),
        title,
        author,
        numPages,
        read
    );
    
    myLibrary.push(book);
}

function displayLibrary() {
    const container = document.querySelector(".container");

    myLibrary.forEach((book) => {
        const bookDiv = document.createElement("div");
        bookDiv.classList.add("book");

        if (book.read) {
            bookDiv.classList.add("read");
        }

        const title = document.createElement("h2");
        title.innerHTML = book.title;

        const author = document.createElement("h3");
        author.innerHTML = book.author;

        const pages = document.createElement("h4");
        pages.innerHTML = `${book.numPages} pages`;

        bookDiv.appendChild(title);
        bookDiv.appendChild(author);
        bookDiv.appendChild(pages);
        container.appendChild(bookDiv);
    });
}

const dialog = document.querySelector("dialog");
const newBookButton = document.querySelector(".new-book");
const cancelButton = document.querySelector("#cancel");

newBookButton.addEventListener("click", () => {
    dialog.showModal();
});

cancelButton.addEventListener("click", () => {
    dialog.close();
});

addBookToLibrary(
    "The Hobbit, or There and Back Again",
    "J.R.R. Tolkien",
    310,
    false
);

addBookToLibrary(
    "The Fellowship of the Ring",
    "J.R.R. Tolkien",
    423,
    false
);

addBookToLibrary(
    "The Two Towers",
    "J.R.R. Tolkien",
    352,
    false
);

addBookToLibrary(
    "The Return of the King",
    "J.R.R. Tolkien",
    416,
    false
);

displayLibrary();
