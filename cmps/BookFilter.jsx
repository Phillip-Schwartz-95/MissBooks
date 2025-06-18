const { useSearchParams } = ReactRouterDOM
const { useState, useEffect } = React

export function BookFilter({ onSetFilter }) {
  const [searchParams, setSearchParams] = useSearchParams()

  const [title, setTitle] = useState(searchParams.get('title') || '')
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '')
  const [isOnSale, setIsOnSale] = useState(searchParams.get('isOnSale') === 'true')

  useEffect(() => {
    const filterBy = {
      title,
      maxPrice: maxPrice ? +maxPrice : '',
      isOnSale,
    }
    setSearchParams({
      ...(title && { title }),
      ...(maxPrice && { maxPrice }),
      ...(isOnSale && { isOnSale: 'true' }),
    })
    onSetFilter(filterBy)
  }, [title, maxPrice, isOnSale])

  return (
    <section className="book-filter">
      <input
        type="text"
        placeholder="Filter by title"
        value={title}
        onChange={ev => setTitle(ev.target.value)}
      />
      <input
        type="number"
        placeholder="Max price"
        value={maxPrice}
        onChange={ev => setMaxPrice(ev.target.value)}
      />
      <label>
        <input
          type="checkbox"
          checked={isOnSale}
          onChange={ev => setIsOnSale(ev.target.checked)}
        />
        On Sale Only
      </label>
    </section>
  )
}
