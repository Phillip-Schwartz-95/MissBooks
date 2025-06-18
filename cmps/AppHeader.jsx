const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {
    return (
        <header className="app-header">
            <h1>Miss Books</h1>
            <nav>
                <Link to="/">Home</Link> |
                <Link to="/about">About</Link> |
                <Link to="/book">Books</Link>  |
                <NavLink to="/book/dashboard">Dashboard</NavLink>

            </nav>
        </header>
    )
}
