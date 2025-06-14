console.log('app.js is running')

import { RootCmp } from './RootCmp.jsx'
import { bookService } from './services/book-service.js'

window.bookService = bookService
console.log('bookService:', bookService)

const elContainer = document.getElementById('root')
const root = ReactDOM.createRoot(elContainer)
root.render(<RootCmp />);
