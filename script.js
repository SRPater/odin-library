let myLibrary = [];

class Book {
    constructor(id, title, author, numPages, read) {
        if (!new.target) {
            throw Error("Must use 'new' keyword to call constructor!");
        }

        this.id = id;
        this.title = title;
        this.author = author;
        this.numPages = numPages;
        this.read = read;
    }
    
    toggleRead() {
        this.read = !this.read;
    }
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
    container.innerHTML = "";

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

        const toggleRead = document.createElement("button");
        toggleRead.dataset.id = book.id;
        toggleRead.innerHTML = "Toggle Read Status";

        toggleRead.addEventListener("click", (e) => {
            let toggleBook = myLibrary.find(b => {
                return b.id === e.target.dataset.id;
            });

            toggleBook.toggleRead();
            displayLibrary();
        })

        const removeButton = document.createElement("button");
        removeButton.dataset.id = book.id;
        removeButton.innerHTML = "Remove Book";

        removeButton.addEventListener("click", (e) => {
            myLibrary = myLibrary.filter((b) => {
                return b.id !== e.target.dataset.id;
            });

            displayLibrary();
        });

        bookDiv.appendChild(title);
        bookDiv.appendChild(author);
        bookDiv.appendChild(pages);
        bookDiv.appendChild(toggleRead);
        bookDiv.appendChild(removeButton);
        container.appendChild(bookDiv);
    });
}

const dialog = document.querySelector("dialog");
const newBookButton = document.querySelector(".new-book");
const addButton = document.querySelector("#add");
const cancelButton = document.querySelector("#cancel");

const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const readInput = document.querySelector("#read");

newBookButton.addEventListener("click", () => {
    dialog.showModal();
});

addButton.addEventListener("click", (e) => {
    e.preventDefault();

    console.log(titleInput);
    
    addBookToLibrary(
        titleInput.value,
        authorInput.value,
        pagesInput.value,
        readInput.checked
    );


    displayLibrary();

    dialog.close();
})

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
