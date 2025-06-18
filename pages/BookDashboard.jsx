import { bookService } from '../services/book-service.js'

export function BookDashboard() {
    const [categoryStats, setCategoryStats] = React.useState({})

    React.useEffect(() => {
        bookService.query().then(books => {
            const stats = books.reduce((acc, book) => {
                const categories = book.categories || ['Uncategorized']
                categories.forEach(cat => {
                    acc[cat] = (acc[cat] || 0) + 1
                })
                return acc
            }, {})
            setCategoryStats(stats)
        })
    }, [])

    return (
        <section className="book-dashboard">
            <h2 className="animate__animated animate__fadeInDown">
                <i className="fas fa-book-open" style={{ marginRight: 8 }}></i>
                Books by Category
            </h2>
            <ul>
                {Object.entries(categoryStats).map(([cat, count]) => (
                    <li key={cat} className="animate__animated animate__fadeInLeft">
                        {cat}: {count}
                    </li>
                ))}
            </ul>
        </section>
    )
}
