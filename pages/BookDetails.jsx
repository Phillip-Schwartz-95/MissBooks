import { bookService } from "../services/book-service.js"
const { useState, useEffect } = React

export function BookDetails({ bookId, onBack }) {
    const [book, setBook] = React.useState(null)

    React.useEffect(() => {
        bookService.get(bookId)
            .then(setBook)
            .catch(err => console.log('Error loading book:', err))
    }, [bookId])

    if (!book) return <div>Loading...</div>

    const { title, description, listPrice, thumbnail, pageCount, publishedDate } = book

    // Determine reading level
    let readingLevel
    if (pageCount > 500) readingLevel = 'Serious Reading'
    else if (pageCount > 200) readingLevel = 'Decent Reading'
    else if (pageCount < 100) readingLevel = 'Light Reading'

    // Determine publication age
    const currentYear = new Date().getFullYear()
    const yearsAgo = currentYear - publishedDate
    let publicationLabel = ''
    if (yearsAgo > 10) publicationLabel = 'Vintage'
    else if (yearsAgo < 1) publicationLabel = 'New'

    // Determine price color
    let priceClass = ''
    if (listPrice.amount > 150) priceClass = 'expensive'
    else if (listPrice.amount < 20) priceClass = 'cheap'

    console.log('Price:', listPrice.amount, 'Class:', priceClass)


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
            
            {readingLevel && <p>📖 {readingLevel}</p>}
            {publicationLabel && <p>📅 {publicationLabel}</p>}
            <p>{description}</p>
            <img src={thumbnail} alt="Book cover" />
            <button onClick={onBack}>Back</button>
        </section>
    )
}
