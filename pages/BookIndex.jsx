import { BookFilter } from "../cmps/BookFilter.jsx"
import { BookList } from "../cmps/BookList.jsx"
import { bookService } from "../services/book-service.js"
import { eventBusService } from '../services/eventbus-service.js'

const { useState, useEffect } = React
const { useNavigate } = ReactRouterDOM

export function BookIndex() {
  const [books, setBooks] = useState(null)
  const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
  const navigate = useNavigate()

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
        setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId))
      })
      .catch(err => console.log('Error removing book:', err))
  }

  function onSetFilter(filterBy) {
    setFilterBy(prev => ({ ...prev, ...filterBy }))
  }

  function onAddNewBook() {
    navigate('/book/edit')
  }

  function onEditBook(bookId) {
    navigate(`/book/edit/${bookId}`)
  }

  function onSelectBookId(bookId) {
    navigate(`/book/${bookId}`)
  }

  if (!books) return <div>Loading...</div>

  return (
    <section className="book-index">
      <button onClick={onAddNewBook}>Add New Book</button>
      <BookFilter filterBy={filterBy} onSetFilter={onSetFilter} />
      <BookList
        books={books}
        onRemoveBook={onRemoveBook}
        onSelectBookId={onSelectBookId}
        onEditBook={onEditBook}
      />
    </section>
  )
}
