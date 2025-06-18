console.log('book-service.js loaded')


import { storageService } from './async-storage.service.js'
import { makeId, makeLorem, getRandomIntInclusive } from './util.service.js'

const BOOK_KEY = 'bookDB'
_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    getDefaultFilter,
    addReview,
    removeReview,
    addGoogleBook,
}

async function query(filterBy = {}) {
    let books = await storageService.query('bookDB')

    // If no books exist, demo books
    if (!books || !books.length) {
        console.log('📚 No books found — seeding data...')
        books = _createBooks()
        const savePromises = books.map(book => storageService.post('bookDB', book))
        await Promise.all(savePromises)
        books = await storageService.query('bookDB')
    }

    // Apply filters
    if (filterBy.title) {
        const regex = new RegExp(filterBy.title, 'i')
        books = books.filter(book => regex.test(book.title))
    }
    if (filterBy.maxPrice) {
        books = books.filter(book => book.listPrice.amount <= +filterBy.maxPrice)
    }
    if (filterBy.isOnSale) {
        books = books.filter(book => book.listPrice.isOnSale)
    }

    return books
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

function addReview(bookId, review) {
    return bookService.get(bookId).then(book => {
        if (!book.reviews) book.reviews = []
        review.id = makeId()
        book.reviews.push(review)
        return bookService.save(book)
    })
}

function removeReview(bookId, reviewId) {
    return bookService.get(bookId).then(book => {
        if (!book.reviews) return Promise.reject('No reviews found')
        book.reviews = book.reviews.filter(review => review.id !== reviewId)
        return bookService.save(book)
    })
}

function getDefaultFilter() {
    return { txt: '' }
}

function _createBooks() {
    const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion']
    let books = JSON.parse(localStorage.getItem(BOOK_KEY)) || []

    if (!books.length) {
        books = []
        for (let i = 0; i < 20; i++) {
            const book = {
                id: makeId(),
                title: makeLorem(2),
                subtitle: makeLorem(4),
                authors: [makeLorem(1)],
                publishedDate: getRandomIntInclusive(1950, 2024),
                description: makeLorem(20),
                pageCount: getRandomIntInclusive(20, 600),
                categories: [ctgs[getRandomIntInclusive(0, ctgs.length - 1)]],
                thumbnail: `https://picsum.photos/id/${i + 1}/200/300`,
                language: "en",
                listPrice: {
                    amount: getRandomIntInclusive(80, 500),
                    currencyCode: "EUR",
                    isOnSale: Math.random() > 0.7
                }
            }
            books.push(book)
        }
        localStorage.setItem(BOOK_KEY, JSON.stringify(books))
    }
    return books
}

function addGoogleBook(googleBook) {
  const id = googleBook.id
  return storageService.query(BOOK_KEY).then(books => {
    if (books.find(book => book.id === id)) {
      // Book already exists
      return Promise.reject('Book already exists')
    }

    const volumeInfo = googleBook.volumeInfo
    const newBook = {
      id,
      title: volumeInfo.title || 'No title',
      description: volumeInfo.description || '',
      thumbnail: (volumeInfo.imageLinks && volumeInfo.imageLinks.thumbnail) || '',
      listPrice: {
        amount: getRandomInt(20, 200),
        currencyCode: 'USD',
        isOnSale: Math.random() < 0.3,
      },
      pageCount: volumeInfo.pageCount || 0,
      publishedDate: (volumeInfo.publishedDate && volumeInfo.publishedDate.split('-')[0]) || 'Unknown',
      reviews: [],
    }

    return storageService.post(BOOK_KEY, newBook)
  })
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

