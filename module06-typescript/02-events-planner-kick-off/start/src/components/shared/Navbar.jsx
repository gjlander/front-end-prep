import { useState } from 'react';
import { Link, NavLink } from 'react-router';
import { useAuth } from '../../context';
const Navbar = () => {
	const { signedIn, setSignedIn, setUser } = useAuth();

	const handleSignOut = () => {
		localStorage.removeItem('token');
		setSignedIn(false);
		setUser(null);
	};
	const showActive = ({ isActive }) => (isActive ? 'menu-active' : '');
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
						<NavLink className={showActive} to='/'>
							Home
						</NavLink>
					</li>
					{signedIn ? (
						<>
							<li>
								<NavLink className={showActive} to='/mypond'>
									My Pond
								</NavLink>
							</li>
							<li>
								<button className='btn btn-primary' onClick={handleSignOut}>
									Sign Out
								</button>
							</li>
						</>
					) : (
						<li>
							<Link className='btn btn-primary' to='/signin'>
								Sign In
							</Link>
						</li>
					)}
				</ul>
			</div>
		</div>
	);
};

export default Navbar;
