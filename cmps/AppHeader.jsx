
export function AppHeader({ onSetPage }) {

    return (
        <header className="app-header container">
            <section>
                <h1>React Miss Book</h1>
                <nav className="app-nav">
                    <a onClick={() => onSetPage('home')}>Home</a>
                    <a onClick={() => onSetPage('about')}>About</a>
                    <a onClick={() => onSetPage('books')}>Book Index</a>
                </nav>
            </section>
        </header>
    )
}