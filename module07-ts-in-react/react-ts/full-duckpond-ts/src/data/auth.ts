const BASE_URL = 'https://duckpond-89zn.onrender.com/auth';

type DBEntry = {
	_id: string;
	createdAt: string;
	__v: number;
};

type SignInInput = {
	email: string;
	password: string;
};

type SignInRes = {
	token: string;
	user: {
		userId: string;
	};
};

type User = DBEntry & {
	firstName: string;
	lastName: string;
	email: string;
};

const signIn = async (formData: SignInInput): Promise<SignInRes> => {
	const res = await fetch(`${BASE_URL}/signin`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(formData)
	});
	if (!res.ok) throw new Error(`${res.status}. Something went wrong!`);

	const data = await res.json();
	// console.log(data);

	return data;
};

const me = async (): Promise<User> => {
	const token = localStorage.getItem('token');

	const res = await fetch(`${BASE_URL}/me`, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	});
	if (!res.ok) throw new Error(`${res.status}. Something went wrong!`);

	const data = await res.json();
	// console.log(data);

	return data;
};

export { signIn, me };
