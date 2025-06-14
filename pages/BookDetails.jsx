import { bookService } from "../services/book-service.js"
const { useState, useEffect } = React

export function BookDetails({ bookId, onBack }) {
    const [book, setBook] = useState(null)

    useEffect(() => {
        loadBook()
    }, [])

    function loadBook() {
        bookService.get(bookId)
            .then(setBook)
            .catch(err => console.log('Error loading book:', err))
    }

    if (!book) return <div>Loading...</div>

    const { title, description, listPrice, thumbnail } = book

    return (
        <section className="book-details container">
            <h1>Book Title: {title}</h1>
            <h4>Price: {listPrice.amount} {listPrice.currencyCode}</h4>
            <p>{description}</p>
            <img src={thumbnail} alt="Book cover" />
            <button onClick={onBack}>Back</button>
        </section>
    )
}
