import { bookService } from '../services/book-service.js'
import { eventBusService } from '../services/eventbus-service.js'

const { useState, useCallback } = React

const fakeGoogleBooksData = {
  items: [
    { id: 'fake1', volumeInfo: { title: 'The Three Yugoslavias' } },
    { id: 'fake2', volumeInfo: { title: 'The Three U.s.-Mexico Border Wars' } },
    { id: 'fake3', volumeInfo: { title: 'The Three Musketeers' } },
    { id: 'fake4', volumeInfo: { title: 'The Three Gifts' } },
    { id: 'fake5', volumeInfo: { title: 'The Three Bears' } },
    { id: 'fake6', volumeInfo: { title: 'Alexander Dumas the Three Musketeers' } },
  ]
}

export function BookAdd({ useFake = false }) { 
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState([])

  // Debounce helper
  function debounce(callback, delay) {
    let timeoutId
    return function (...args) {
      if (timeoutId) clearTimeout(timeoutId)
      timeoutId = setTimeout(() => callback(...args), delay)
    }
  }

  // Real API fetch function
  function fetchBooks(term) {
    if (term.length < 3) {
      setResults([])
      return
    }
    fetch(`https://www.googleapis.com/books/v1/volumes?printType=books&q=${encodeURIComponent(term)}`)
      .then(res => res.json())
      .then(data => setResults(data.items || []))
      .catch(err => console.log('Error fetching Google Books:', err))
  }

  // Fake API fetch
  function fetchFakeBooks(term) {
    if (term.length < 3) {
      setResults([])
      return
    }
    // Simulate
    return new Promise(resolve => setTimeout(() => resolve(fakeGoogleBooksData), 500))
      .then(data => setResults(data.items || []))
  }

  // Pick fetch function based on flag
  const fetchFunc = useFake ? fetchFakeBooks : fetchBooks

  // Debounced fetch wrapped with useCallback to prevent duplicate
  const debouncedFetchBooks = useCallback(debounce(fetchFunc, 300), [useFake])

  function onSearchChange(ev) {
    const term = ev.target.value
    setSearchTerm(term)
    debouncedFetchBooks(term)
  }

  function onAddBook(googleBook) {
    bookService.addGoogleBook(googleBook)
      .then(() => {
        eventBusService.showMsg('Book added from Google!')
      })
      .catch(err => {
        if (err === 'Book already exists') {
          eventBusService.showMsg('This book is already in your library.')
        } else {
          console.log('Error adding Google book:', err)
        }
      })
  }

  return (
    <section className="book-add container">
      <h2>Search Google Books</h2>
      <input
        type="text"
        placeholder="Search books..."
        value={searchTerm}
        onChange={onSearchChange}
      />

      <ul className="google-results">
        {results.map(book => (
          <li key={book.id}>
            {book.volumeInfo.title}
            <button onClick={() => onAddBook(book)}>➕</button>
          </li>
        ))}
      </ul>
    </section>
  )
}
