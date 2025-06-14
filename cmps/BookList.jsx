import { BookPreview } from "../cmps/BookPreview.jsx"

export function BookList({ books, onRemoveBook, onSelectBookId, onEditBook }) {
  return (
    <section className="book-list">
      {books.map(book => (
        <BookPreview
          key={book.id}
          book={book}
          onRemoveBook={onRemoveBook}
          onSelectBookId={onSelectBookId}
          onEditBook={onEditBook}
        />
      ))}
    </section>
  )
}
