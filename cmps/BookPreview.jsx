export function BookPreview({ book, onRemoveBook, onSelectBookId, onEditBook }) {
  return (
    <article className="book-preview">
      <h3>{book.title}</h3>
      <img src={book.thumbnail} />
      <h4>{book.listPrice.amount} {book.listPrice.currencyCode}</h4>
      <button onClick={() => onSelectBookId(book.id)}>Details</button>
      <button onClick={() => onRemoveBook(book.id)}>Remove</button>
      <button onClick={() => onEditBook(book.id)}>Edit</button>
    </article>
  )
}

