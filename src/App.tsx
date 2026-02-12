import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Main from './pages/Main/Main';

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/about" element={<div>About Page</div>} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
