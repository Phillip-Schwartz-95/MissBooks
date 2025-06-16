import { BookFilter } from "../cmps/BookFilter.jsx"
import { BookList } from "../cmps/BookList.jsx"
import { bookService } from "../services/book-service.js"
import { BookDetails } from "./BookDetails.jsx"
import { BookEdit } from "../cmps/BookEdit.jsx"
import { eventBusService } from '../services/eventbus-service.js'

const { useState, useEffect, Fragment } = React

export function BookIndex() {
  const [books, setBooks] = useState(null)
  const [selectedBookId, setSelectedBookId] = useState(null)
  const [editingBookId, setEditingBookId] = useState(null)
  const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

  useEffect(() => {
    loadBooks()
  }, [filterBy])

  function loadBooks() {
    bookService.query(filterBy)
      .then(setBooks)
      .catch(err => console.log('Error loading books:', err))
  }

  function onRemoveBook(bookId) {
    bookService.remove(bookId)
      .then(() => {
        eventBusService.showMsg('Book deleted!')
        setBooks(books => books.filter(book => book.id !== bookId))
      })
      .catch(err => console.log('Error removing book:', err))
  }

  function onSetFilter(filterBy) {
    setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
  }

  function onSelectBookId(bookId) {
    setSelectedBookId(bookId)
  }

  function onAddNewBook() {
    setEditingBookId('new') // means "new book"
  }

  function onEditBook(bookId) {
    setEditingBookId(bookId) // set ID for existing book
  }

  function onSaveSuccess() {
    setEditingBookId(null)
    setSelectedBookId(null)
    loadBooks()
  }

  function onCancelEdit() {
    setEditingBookId(null)
  }

  if (!books) return <div>Loading...</div>

  return (
    <section className="book-index">
      {(editingBookId) ? (
        <BookEdit
          bookId={editingBookId}
          onSaveSuccess={onSaveSuccess}
          onCancel={onCancelEdit}
        />
      ) : selectedBookId ? (
        <BookDetails
          bookId={selectedBookId}
          onBack={() => setSelectedBookId(null)}
          onEditBook={onEditBook}
        />
      ) : (
        <Fragment>
          <button onClick={onAddNewBook}>Add New Book</button>
          <BookFilter
            filterBy={filterBy}
            onSetFilter={onSetFilter}
          />
          <BookList
            books={books}
            onRemoveBook={onRemoveBook}
            onSelectBookId={onSelectBookId}
            onEditBook={onEditBook}
          />
        </Fragment>
      )}
    </section>
  )
}
