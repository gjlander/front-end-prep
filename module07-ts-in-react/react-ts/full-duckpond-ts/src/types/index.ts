type DBEntry = {
	_id: string;
	createdAt: string;
	__v: number;
};

export type DuckInput = {
	name: string;
	imgUrl: string;
	quote: string;
};

export type SignInInput = {
	email: string;
	password: string;
};

export type Duck = DBEntry & DuckInput;

export type User = DBEntry & {
	firstName: string;
	lastName: string;
	email: string;
};
