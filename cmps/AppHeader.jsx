export function AppHeader() {
  const { NavLink } = ReactRouterDOM

  return (
    <header className="app-header">
      <h1>Miss Books</h1>
      <nav>
        <NavLink to="/">Home</NavLink> | 
        <NavLink to="/about">About</NavLink> | 
        <NavLink to="/book">Books</NavLink> | 
        <NavLink to="/book/dashboard">Dashboard</NavLink>
      </nav>
    </header>
  )
}

