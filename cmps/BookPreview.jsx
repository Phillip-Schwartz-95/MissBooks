export function BookPreview({ book, onRemoveBook, onSelectBookId, onEditBook }) {
  return (
    <article className="book-preview">
      <img src={book.thumbnail} />
      <h3>{book.title}</h3>
      <p>{book.listPrice.amount} {book.listPrice.currencyCode}</p>
      <button onClick={() => onSelectBookId(book.id)}>Details</button>
      <button onClick={() => onRemoveBook(book.id)}>Remove</button>
      <button onClick={() => onEditBook(book.id)}>Edit</button>
    </article>
  )
}
