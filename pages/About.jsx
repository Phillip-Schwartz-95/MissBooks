const { Link, Outlet } = ReactRouterDOM

export function About() {
  return (
    <div>
      <h2>About Us</h2>
      <nav>
        <Link to="team">Our Team</Link> | <Link to="goal">Our Goal</Link>
      </nav>
      <Outlet />
    </div>
  )
}