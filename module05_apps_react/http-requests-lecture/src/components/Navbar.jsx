import { Link, NavLink, useNavigate } from 'react-router';
//nothing new here, just accessing the props
const Navbar = ({ signedIn, setSignedIn }) => {
    const navigate = useNavigate();
    const handleSignIn = () => {
        setSignedIn((prev) => !prev);
        setTimeout(() => {
            navigate('/mypond');
        }, 1000);
    };
    return (
        <div className='navbar bg-slate-800 '>
            <div className='navbar-start'>
                <Link className='font-bold' to='/'>
                    The Duck Pond
                </Link>
            </div>

            <div className='navbar-end'>
                <ul className='menu menu-horizontal items-baseline gap-2'>
                    <li>
                        <NavLink to='/'>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to='/mypond'>My Pond</NavLink>
                    </li>
                    <li>
                        {signedIn ? (
                            <button
                                className='btn btn-primary'
                                onClick={handleSignIn}
                            >
                                Sign Out
                            </button>
                        ) : (
                            <Link to='/sign-in'>
                                <button
                                    className='btn btn-primary'
                                    // onClick={handleSignIn}
                                >
                                    Sign In
                                </button>
                            </Link>
                        )}
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
