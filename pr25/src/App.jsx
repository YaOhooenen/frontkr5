import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Suspense, lazy } from 'react';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));

function App() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <Link to="/">Главная</Link> | <Link to="/about">О нас</Link>
        </nav>
        <Suspense fallback={<div>Загрузка...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default App;