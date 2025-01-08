const Navbar = () => {
    const isSignedIn = false;
    return (
        <nav className='flex justify-end bg-slate-800 py-2 px-8 text-2xl mb-6'>
            <ul className='flex gap-6'>
                <li className='p-2 rounded-lg hover:bg-slate-600'>
                    <a href='index.html'>Home</a>
                </li>
                <li className='p-2 rounded-lg hover:bg-slate-600'>
                    <a href='src/myPond.html'>My Pond</a>
                </li>
                <li className='p-2 rounded-lg hover:bg-slate-600'>
                    {isSignedIn ? <a href='#'>Sign Out</a> : <a>Sign In</a>}
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
