import Navbar from './components/Navbar';
import Header from './components/Header';
import DuckPond from './components/DuckPond';
import Footer from './components/Footer';

function App() {
    return (
        <div className='bg-slate-600 text-gray-300 flex flex-col min-h-screen'>
            <Navbar />
            <Header />
            <main className='flex-grow flex flex-col justify-between py-4'>
                <DuckPond />
            </main>
            <Footer />
        </div>
    );
}

export default App;
