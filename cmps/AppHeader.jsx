const { Link } = ReactRouterDOM

export function AppHeader() {
    return (
        <header className="app-header">
            <h1>Miss Books</h1>
            <nav>
                <Link to="/">Home</Link> |
                <Link to="/about">About</Link> |
                <Link to="/book">Books</Link>
            </nav>
        </header>
    )
}
