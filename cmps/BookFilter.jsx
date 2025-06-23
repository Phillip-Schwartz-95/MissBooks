const { useSearchParams } = ReactRouterDOM
const { useState, useEffect } = React

export function BookFilter({ onSetFilter }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const [filterBy, setFilterBy] = useState(() => ({
    title: searchParams.get('title') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    isOnSale: searchParams.get('isOnSale') === 'true'
  }))

  useEffect(() => {
    const params = {}
    if (filterBy.title) params.title = filterBy.title
    if (filterBy.maxPrice) params.maxPrice = filterBy.maxPrice
    if (filterBy.isOnSale) params.isOnSale = 'true'
    setSearchParams(params)
    onSetFilter({ ...filterBy, maxPrice: +filterBy.maxPrice || '' })
  }, [filterBy])

  function handleChange({ target }) {
    const { name, type, value, checked } = target
    setFilterBy(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  return (
    <section className="book-filter">
      <input name="title" placeholder="Filter by title" value={filterBy.title} onChange={handleChange} />
      <input name="maxPrice" type="number" placeholder="Max price" value={filterBy.maxPrice} onChange={handleChange} />
      <label>
        <input name="isOnSale" type="checkbox" checked={filterBy.isOnSale} onChange={handleChange} />
        On Sale Only
      </label>
    </section>
  )
}

