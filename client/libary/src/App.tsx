import './App.css'
import Album from './pages/libary_page'
import CreateBook from './pages/createBook'
import CreateReader from './pages/createReader'
import ResponsiveAppBar from './componnents/AppBar'
import CreateBorrowings from './pages/createBorrowings'
import ReaderTable from './pages/readersTable'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ReaderBorrowingsTable from './pages/borrowings_reader_table'
import CpiesGalery from './pages/copies_galery'
import LatersTable from './pages/laters'
import TopBooks from './pages/top_boks'
import PublisherTable from './pages/publishers'
import CreatePublisher from './pages/createPublisher'
import ExcelDownloadButton from './componnents/ExcelDown'

function App() {

  return (
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
         <Route
      path="/laters"
      element={
      
          <LatersTable />
        
          
          }
          />
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
        <Route
      path="/excel"
      element={
        <>
          <ExcelDownloadButton />  
        </>
      }
    />
      </Routes>
    </Router>
  );
}

export default App
