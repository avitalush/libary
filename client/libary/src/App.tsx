import './App.css'
import Album from './Pages/libary_page'
import CreateBook from './Pages/createBook'
import CreateReader from './Pages/createReader'
import ResponsiveAppBar from './componnents/AppBar'
import CreateBorrowings from './Pages/createBorrowings'
import ReaderTable from './Pages/readersTable'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import ReaderBorrowingsTable from './Pages/borrowings_reader_table'
import CpiesGalery from './Pages/copies_galery'
import LatersTable from './Pages/laters'
import TopBooks from './Pages/top_boks'
import PublisherTable from './Pages/publishers'
import CreatePublisher from './Pages/createPublisher'
import { ThemeProvider } from '@emotion/react'
import { theme } from './style/Theme'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <ResponsiveAppBar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Album />
              </>
            }
          />
          <Route
            path="/readers"
            element={
              <>
                <ReaderTable />
              </>
            }
          />
          <Route
            path="/borrowings/:readerId?"
            element={
              <>
                <ReaderBorrowingsTable />
              </>
            }
          />
          <Route
            path="copies/:infoId"
            element={
              <>
                <CpiesGalery />
              </>
            }
          />
          <Route path="/laters" element={<LatersTable />} />
          <Route
            path="/createborrowings/:bookId"
            element={
              <>
                <CreateBorrowings />
              </>
            }
          />
          <Route
            path="/createbook"
            element={
              <>
                <CreateBook />
              </>
            }
          />
          <Route
            path="/createreader"
            element={
              <>
                <CreateReader />
              </>
            }
          />
          <Route
            path="/top"
            element={
              <>
                <TopBooks />
              </>
            }
          />
          <Route
            path="/publishers"
            element={
              <>
                <PublisherTable />
              </>
            }
          />
          <Route
            path="/createpublisher"
            element={
              <>
                <CreatePublisher />
              </>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
