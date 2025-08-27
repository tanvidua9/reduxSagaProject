import { Route, Routes } from 'react-router-dom';
import ShowListPage from './Pages/ShowsList.Page';
import ShowDetailPage from './Pages/ShowDetail.Page';

function App() {
  return (
    <Routes>
        <Route path="/" element={<ShowListPage />} />
        <Route path="/show/:id" element={<ShowDetailPage />} />
    </Routes>
  )
}

export default App
