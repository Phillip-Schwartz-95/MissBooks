
import { bookService } from "../services/book-service.js"
import { LongTxt } from '../cmps/LongText.jsx'
import { AddReview } from '../cmps/AddReview.jsx'
import { BookRating } from "../cmps/BookRating.jsx"

const { useState, useEffect } = React
const { useNavigate } = ReactRouterDOM

export function BookDetails({ bookId, onBack }) {
    const [book, setBook] = useState(null)
    const [books, setBooks] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        loadBook()
    }, [bookId])

     useEffect(() => {
        bookService.query()
            .then(setBooks)
            .catch(err => console.log('Error loading books:', err))
    }, [])

    function loadBook() {
        bookService.get(bookId)
            .then(setBook)
            .catch(err => console.log('Error loading book:', err))
    }

    function onAddReview(review) {
        bookService.addReview(bookId, review).then(() => {
            loadBook() // refresh book with new reviews
        })
    }

    function onDeleteReview(reviewId) {
        bookService.removeReview(bookId, reviewId).then(() => {
            loadBook() // refresh book reviews
        })
    }

    if (!book) return <div>Loading...</div>

    const { title, description, listPrice, thumbnail, pageCount, publishedDate } = book

    let readingLevel
    if (pageCount > 500) readingLevel = 'Serious Reading'
    else if (pageCount > 200) readingLevel = 'Decent Reading'
    else if (pageCount < 100) readingLevel = 'Light Reading'

    const currentYear = new Date().getFullYear()
    const yearsAgo = currentYear - publishedDate
    let publicationLabel = ''
    if (yearsAgo > 10) publicationLabel = 'Vintage'
    else if (yearsAgo < 1) publicationLabel = 'New'

    let priceClass = ''
    if (listPrice.amount > 150) priceClass = 'expensive'
    else if (listPrice.amount < 20) priceClass = 'cheap'

    //next/prev navigation
    const currIndex = books.findIndex(b => b.id === bookId)
    if (currIndex === -1) return <div>Book not found in the list</div>

    // indexes with rotation
    const prevIndex = currIndex === 0 ? books.length - 1 : currIndex - 1
    const nextIndex = currIndex === books.length - 1 ? 0 : currIndex + 1

    const goPrev = () => navigate(`/book/${books[prevIndex].id}`)
    const goNext = () => navigate(`/book/${books[nextIndex].id}`)


    return (
        <section className="book-details container">
            <h1>Book Title: {title}</h1>

            {listPrice.isOnSale && (
                <div className="on-sale-sign" style={{ color: 'red', fontWeight: 'bold', fontSize: '1.2em' }}>
                    🎉 On Sale!
                </div>
            )}

            <h4 className={`price ${priceClass}`}>
                Price: {listPrice.amount} {listPrice.currencyCode}
            </h4>

            {readingLevel && <p> {readingLevel}</p>}
            {publicationLabel && <p> {publicationLabel}</p>}
            <LongTxt txt={description} length={100} />
            <img src={thumbnail} alt="Book cover" />

            <AddReview bookId={bookId} onAddReview={onAddReview} />

            {book.reviews && book.reviews.length > 0 && (
                <section className="book-reviews">
                    <h3>Reviews</h3>
                    <ul>
                        {book.reviews.map(review => (
                            <li key={review.id}>
                                <p><strong>{review.fullname}</strong> rated it {review.rating} ★</p>
                                <p>Read on: {review.readAt}</p>
                                <button onClick={() => onDeleteReview(review.id)}>🗑 Delete</button>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            <BookRating />

            <div className="book-nav-buttons">
                <button onClick={goPrev}>Previous</button>
                <button onClick={goNext}>Next</button>
            </div>

        </section>
    )
}
