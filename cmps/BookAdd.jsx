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

export function BookAdd() {
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState([])
  const [useFake, setUseFake] = useState(true)

  function debounce(callback, delay) {
    let timeoutId
    return function (...args) {
      if (timeoutId) clearTimeout(timeoutId)
      timeoutId = setTimeout(() => callback(...args), delay)
    }
  }

  // Fetch real Google Books API
  function fetchBooks(term) {
    fetch(`https://www.googleapis.com/books/v1/volumes?printType=books&q=${encodeURIComponent(term)}`)
      .then(res => res.json())
      .then(data => setResults(data.items || []))
      .catch(err => console.log('Error fetching Google Books:', err))
  }

  // Fetch fake books data
  function fetchFakeBooks(term) {
  return new Promise(resolve => 
    setTimeout(() => {
      // Filter fake books
      const filteredItems = fakeGoogleBooksData.items.filter(book =>
        book.volumeInfo.title.toLowerCase().includes(term.toLowerCase())
      );
      resolve({ items: filteredItems })
    }, 300)
  )
  .then(data => setResults(data.items || []))
}

const fetchFunc = useFake ? fetchFakeBooks : fetchBooks

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

  function toggleUseFake() {
    setUseFake(prev => !prev)
    setResults([]) // Clear results on toggle
    setSearchTerm('') // Clear search input 
  }

  return (
    <section className="book-add container">
      <h2>Search Google Books</h2>

      <button onClick={toggleUseFake}>
        {useFake ? 'Switch to Real Google Books' : 'Switch to Fake Books'}
      </button>

      <input
        type="text"
        placeholder="Search books..."
        value={searchTerm}
        onChange={onSearchChange}
      />

      <ul className="google-results">
        {results.map(book => (
          <li key={book.id}>
            {(book.volumeInfo && book.volumeInfo.title) || 'No Title'}
            <button onClick={() => onAddBook(book)}>➕</button>
          </li>
        ))}
      </ul>
    </section>
  )
}
