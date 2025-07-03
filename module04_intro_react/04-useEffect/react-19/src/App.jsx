import { useState, useEffect } from 'react';
import { getAllDucks } from './data/ducks';
import Navbar from './components/Navbar';
import Header from './components/Header';
import DuckPond from './components/DuckPond';
import DuckForm from './components/DuckForm';
import Footer from './components/Footer';

function App() {
  const [ducks, setDucks] = useState([]);
  useEffect(() => {
    const abortController = new AbortController();
    (async () => {
      try {
        const allDucks = await getAllDucks(abortController);

        setDucks(allDucks);
      } catch (error) {
        if (error.name === 'AbortError') {
          console.info('Fetch aborted');
        } else {
          console.error(error);
        }
      }
    })();

    return () => {
      abortController.abort();
    };
  }, []);
  return (
    <div className='bg-slate-600 text-gray-300 flex flex-col min-h-screen'>
      <Navbar />
      <Header />
      <main className='flex-grow flex flex-col justify-between py-4'>
        <DuckPond ducks={ducks} />
        <DuckForm setDucks={setDucks} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
