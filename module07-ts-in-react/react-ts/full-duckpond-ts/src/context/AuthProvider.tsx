import { type User } from '../types';
import { useState, useEffect, type ReactNode } from 'react';
import { AuthContext } from '.';
import { me } from '../data';

const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [signedIn, setSignedIn] = useState(false);
	const [user, setUser] = useState<User | null>(null);
	const [checkSession, setCheckSession] = useState(true);

	useEffect(() => {
		const getUser = async () => {
			try {
				const data = await me();

				setUser(data);
				setSignedIn(true);
			} catch (error) {
				console.error(error);
			} finally {
				setCheckSession(false);
			}
		};

		if (checkSession) getUser();
	}, [checkSession]);

	return (
		<AuthContext
			value={{
				signedIn,
				setSignedIn,
				user,
				setUser,
				setCheckSession
			}}
		>
			{children}
		</AuthContext>
	);
};

export default AuthProvider;
