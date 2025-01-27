import { useState } from 'react';
const Navbar = () => {
    // const isSignedIn = false;
    const [isSignedIn, setIsSignedIn] = useState(false);
    const handleClick = () => setIsSignedIn((prev) => !prev);
    return (
        <div className='navbar bg-base-100'>
            <div className='flex-1'>
                <a className='btn btn-ghost text-xl'>The Duck Pond</a>
            </div>
            <div>
                <ul
                    tabIndex={0}
                    className='menu menu-horizontal items-center inline-flex gap-4 px-1 text-xl'
                >
                    <li>
                        <a href='index.html'>Home</a>
                    </li>
                    <li>
                        <a href='src/myPond.html'>My Pond</a>
                    </li>
                    <li>
                        {isSignedIn ? (
                            <button
                                className='btn btn-primary'
                                onClick={handleClick}
                            >
                                Sign Out
                            </button>
                        ) : (
                            <button
                                className='btn btn-primary'
                                onClick={handleClick}
                            >
                                Sign In
                            </button>
                        )}
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
