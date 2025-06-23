const { HashRouter, Routes, Route, useParams } = ReactRouterDOM

import { AppHeader } from './cmps/AppHeader.jsx'
import { About } from './pages/About.jsx'
import { AboutTeam } from './cmps/AboutTeam.jsx'
import { AboutGoal } from './cmps/AboutGoal.jsx'
import { Home } from './pages/Home.jsx'
import { BookIndex } from './pages/BookIndex.jsx'
import { BookDetails } from './pages/BookDetails.jsx'
import { BookDashboard } from './pages/BookDashboard.jsx'
import { BookEdit } from './cmps/BookEdit.jsx'
import { BookAdd } from './cmps/BookAdd.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'

export function RootCmp() {
  return (
    <HashRouter>
      <section className="app">
        <AppHeader />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/about" element={<About />}>
              <Route path="team" element={<AboutTeam />} />
              <Route path="goal" element={<AboutGoal />} />
            </Route>

            <Route path="/book" element={<BookIndex />} />
            <Route path="/book/dashboard" element={<BookDashboard />} />
            <Route path="/book/:bookId" element={<BookDetailsWrapper />} />
            <Route path="/book/edit" element={<BookEditWrapper />} />
            <Route path="/book/edit/:bookId" element={<BookEditWrapper />} />
            <Route path="/book/add" element={<BookAdd useFake={true} />} />
          </Routes>
        </main>

        <UserMsg />
      </section>
    </HashRouter>
  )

  function BookDetailsWrapper() {
    const { bookId } = useParams()
    return <BookDetails bookId={bookId} />
  }

  function BookEditWrapper() {
    let { bookId } = useParams()
    if (bookId === 'edit' || !bookId) bookId = 'new'
    return <BookEdit bookId={bookId} />
  }
}

