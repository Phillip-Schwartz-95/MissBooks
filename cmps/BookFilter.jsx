const { useState, useEffect } = React

export function BookFilter({ filterBy, onSetFilter }) {
    const [title, setTitle] = useState(filterBy.title || '')
    const [maxPrice, setMaxPrice] = useState(filterBy.maxPrice || '')
    const [isOnSale, setIsOnSale] = useState(filterBy.isOnSale || false)

    useEffect(() => {
        setTitle(filterBy.title || '')
        setMaxPrice(filterBy.maxPrice || '')
        setIsOnSale(filterBy.isOnSale || false)
    }, [filterBy])

    function onChange() {
        onSetFilter({ title, maxPrice, isOnSale })
    }

    return (
        <section className="book-filter">
            <input
                type="text"
                placeholder="Filter by title"
                value={title}
                onChange={ev => {
                    setTitle(ev.target.value)
                    onSetFilter({ title: ev.target.value })
                }}
            />
            <input
                type="number"
                placeholder="Max price"
                value={maxPrice}
                onChange={ev => {
                    setMaxPrice(ev.target.value)
                    onSetFilter({ maxPrice: +ev.target.value })
                }}
            />
            <label>
                <input
                    type="checkbox"
                    checked={isOnSale}
                    onChange={ev => {
                        setIsOnSale(ev.target.checked)
                        onSetFilter({ isOnSale: ev.target.checked })
                    }}
                />
                On Sale Only
            </label>
        </section>
    )
}