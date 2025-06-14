const { useState, useEffect } = React

export function BookFilter({ filterBy, onSetFilter }) {
    // Local state to control inputs
    const [title, setTitle] = useState(filterBy.title || '')
    const [maxPrice, setMaxPrice] = useState(filterBy.maxPrice || '')

    useEffect(() => {
        // When filterBy changes, update local state
        setTitle(filterBy.title || '')
        setMaxPrice(filterBy.maxPrice || '')
    }, [filterBy])

    function onTitleChange(ev) {
        const value = ev.target.value
        setTitle(value)
        onSetFilter({ title: value })
    }

    function onPriceChange(ev) {
        const value = +ev.target.value
        setMaxPrice(ev.target.value)
        onSetFilter({ maxPrice: value })
    }

    return (
        <section className="book-filter">
            <input
                type="text"
                placeholder="Filter by title"
                value={title}
                onChange={onTitleChange}
            />
            <input
                type="number"
                placeholder="Max price"
                value={maxPrice}
                onChange={onPriceChange}
                min="0"
            />
        </section>
    )
}

