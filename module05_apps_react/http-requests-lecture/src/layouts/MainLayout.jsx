import { useState } from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MainLayout = () => {
    // signedIn state is used in the Navbar, and by the MyPond page, so we define it in the layout
    const [signedIn, setSignedIn] = useState(false);
    return (
        <div className='bg-slate-600 text-gray-300 flex flex-col min-h-screen'>
            {/* Navbar is outside of the layout, so we pass it as always, via props */}
            <Navbar signedIn={signedIn} setSignedIn={setSignedIn} />
            <main className='flex-grow flex flex-col justify-between py-4'>
                {/*Since we can't pass props directly to the outlet, we pass context as an object.
                 We can pass as many pieces of data as we want. 
                 Go to MyPond.jsx to see how we access the state.  */}
                <Outlet context={{ signedIn, setSignedIn }} />
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;
