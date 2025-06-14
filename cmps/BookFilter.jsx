const { useState, useEffect } = React

export function BookFilter({ defaultFilter, onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...defaultFilter })

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const { name, value } = target
        setFilterByToEdit(prev => ({ ...prev, [name]: value }))
    }

    const { txt } = filterByToEdit

    return (
        <section className="book-filter container">
            <h2>Filter Books</h2>
            <form>
                <label htmlFor="txt">Title</label>
                <input
                    onChange={handleChange}
                    value={txt}
                    name="txt"
                    id="txt"
                    type="text"
                />
            </form>
        </section>
    )
}
