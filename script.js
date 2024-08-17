"use strict";

console.log("Loading script to HTML")

// Memory Store
const bookCollection = []

// Make object
function bookEntry(title, author, pages, isRead) {
    this.title = title
    this.author = author
    this.pages = pages
    this.isRead = isRead
}

// populate bookshelf
function populateBookshelf() {
    bookshelf.innerHTML = ""
    for (const [id, book] of bookCollection.entries()) {
        console.log("Creating book div", id, book)
        createBookCard(book, id)
    }
}

// Library CRUD
function insertBook(book) {
    bookCollection.push(book)
}
function removeBook(event) {
    console.log("removing book", event.target.id)
    bookCollection.splice(event.target.getAttribute("id"),1)
    event.target.parentNode.removeChild(event.target)
    //event.target.removeEventlistener("click", removeBook)
    console.log("refreshing bookshelf")
    populateBookshelf()
}

// Book card component
console.log("Creating book card")
const bookshelf = document.querySelector(".bookshelf")
function createBookCard(book, id) {
    console.log("creating book card for book id:", id, book)
    const bookCard = document.createElement("div")
    bookCard.attributes.bookId = id
    let bookDetails = ""
    const closeButton = document.createElement("button")
    closeButton.id = id
    closeButton.className = "delete"
    closeButton.innerHTML = "X"
    closeButton.style.fontWeight= "bold"
    for (let [key, value] of Object.entries(book)) {
        bookDetails += `<li><b>${key.toUpperCase()}:</b> ${value}</li>`
    }
    bookCard.innerHTML =`
    <div class="bookCard">
        ${closeButton.outerHTML}
        <ul>
            ${bookDetails}
        </ul>
    </div>
    `
    bookshelf.appendChild(bookCard)
}

// add some fake books entries
const book1 = new bookEntry()
book1.title="Lets talk Money",
book1.author="Monika Halan",
book1.pages=200,
book1.isRead=true
insertBook(book1)

// Modal controls
const addBook = document.querySelector(".addNew")
const entryModal = document.querySelector(".book-modal")
const openBookEntryModal = () => {
    entryModal.showModal()
    return
}
const closeBookEntryModal = () => {
    entryModal.close()
    return
}
addBook.addEventListener("click", openBookEntryModal)

// Handle form submission
const handleFormData = () => {
    const bookFormData = document.querySelector("#book-form-entry")
    const formdata = new FormData(bookFormData)
    console.log("New book received for submission")
    console.log(formdata)
    const book = new bookEntry()
    book.title=formdata.get("title"),
    book.author=formdata.get("author"),
    book.pages=formdata.get("pages"),
    book.isRead=(formdata.get("readState") === "on")? true : false
    insertBook(book)
    console.log("Library updated")
    console.log(bookCollection)
    populateBookshelf()
}
const submitForm = document.querySelector("#submit-form-data")
submitForm.addEventListener("click", (event) => {
    event.preventDefault()
    handleFormData()
    closeBookEntryModal()
})

// delete button event delegation
bookshelf.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete")) {
        removeBook(event)
    }
})
