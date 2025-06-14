import { bookService } from '../services/book-service.js'
const { useState } = React

export function BookEdit({ bookId, onSaveSuccess, onCancel }) {
  const [bookToEdit, setBookToEdit] = useState(null)

  if (!bookToEdit) {
    // Load book manually using Promises
    if (bookId) {
      bookService.get(bookId)
        .then(book => setBookToEdit(book))
        .catch(err => console.log('Error loading book:', err))
    } else {
      const emptyBook = bookService.getEmptyBook()
      setBookToEdit(emptyBook)
    }
    return <div>Loading...</div>
  }

  function handleChange({ target }) {
    const { name, value, type, checked } = target
    const newVal = type === 'checkbox' ? checked : value

    if (name.startsWith('listPrice.')) {
      const field = name.split('.')[1]
      setBookToEdit(prev => ({
        ...prev,
        listPrice: { ...prev.listPrice, [field]: newVal }
      }))
    } else {
      setBookToEdit(prev => ({ ...prev, [name]: newVal }))
    }
  }

  function onSave(ev) {
    ev.preventDefault()
    bookService.save(bookToEdit)
      .then(() => {
        if (onSaveSuccess) onSaveSuccess()
      })
      .catch(err => console.log('Error saving book:', err))
  }

  function onCancelClick(ev) {
    ev.preventDefault()
    if (onCancel) onCancel()
  }

  return (
    <form onSubmit={onSave} className="book-edit">
      <label>
        Title:
        <input name="title" value={bookToEdit.title} onChange={handleChange} />
      </label>

      <label>
        Description:
        <textarea name="description" value={bookToEdit.description} onChange={handleChange} />
      </label>

      <label>
        Price:
        <input name="listPrice.amount" type="number" value={bookToEdit.listPrice.amount} onChange={handleChange} />
      </label>

      <label>
        Currency:
        <input name="listPrice.currencyCode" value={bookToEdit.listPrice.currencyCode} onChange={handleChange} />
      </label>

      <label>
        On Sale:
        <input name="listPrice.isOnSale" type="checkbox" checked={bookToEdit.listPrice.isOnSale} onChange={handleChange} />
      </label>

      <label>
        Thumbnail URL:
        <input name="thumbnail" value={bookToEdit.thumbnail} onChange={handleChange} />
      </label>

      <button>Save</button>
      <button onClick={onCancelClick}>Cancel</button>
    </form>
  )
}
