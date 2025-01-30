import { BrowserRouter, Routes, Route } from 'react-router';
import './styles.css';

import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import MyPond from './pages/MyPond';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route path='mypond' element={<MyPond />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
