console.log('book-service.js loaded')


import { storageService } from './async-storage.service.js'
import { makeId } from './util.service.js'

const BOOK_KEY = 'bookDB'
_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    getDefaultFilter
}

async function query(filterBy = {}) {
    return storageService.query(BOOK_KEY).then(books => {
        if (filterBy.txt) {
            const regex = new RegExp(filterBy.txt, 'i')
            books = books.filter(book => regex.test(book.title))
        }
        return books
    })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    return book.id
        ? storageService.put(BOOK_KEY, book)
        : storageService.post(BOOK_KEY, book)
}

function getEmptyBook(title = '', amount = 0) {
    return {
        id: '',
        title,
        description: '',
        thumbnail: '',
        listPrice: {
            amount,
            currencyCode: 'USD',
            isOnSale: false
        }
    }
}

function getDefaultFilter() {
    return { txt: '' }
}

function _createBooks() {
    let books = JSON.parse(localStorage.getItem(BOOK_KEY)) || []
    if (!books.length) {
        books = [
            _createBook('The Great Gatsby', 25),
            _createBook('To Kill a Mockingbird', 30),
            _createBook('1984', 20),
        ]
        localStorage.setItem(BOOK_KEY, JSON.stringify(books))
    }
}

function _createBook(title, amount) {
    return {
        id: makeId(),
        title,
        description: 'A classic novel',
        thumbnail: `https://picsum.photos/seed/${makeId()}/200/300`,
        listPrice: {
            amount,
            currencyCode: 'USD',
            isOnSale: false
        }
    }
}

