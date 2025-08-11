# React w/ TypeScript

## Topics to Cover

- Typing Props
- Typing state
- Controlled components
- DOM Events
- Typing hooks
  - useActionState

## Typing Props

- Because Components are just functions, we type them just like any other function
- Props get passed as a single argument to the component (function), we use destructuring syntax to access the properties of that object, but we type them just like we would any other function

### Typing props article

#### Children and Style props

- In addition to props we can pass, components have some built-in props. To properly type these, we need to rely on type that come from React
- We can see them installed in our `package.json`
- We can access the `React` namespace, or just import the types we need

```ts
import { type ReactNode, type CSSProperties } from 'react';

type ContainerProps = {
	children: ReactNode;
	style?: CSSProperties;
};
```

## DuckPond in TS

- I've gone ahead and refactored our DuckPond using a Vite TS setup. I've renamed all js and jsx files to ts/tsx, and add types annotations to ts files. tsx files are untouched, so have lots of errors. As we continue through the lecture, we'll work on fixing those errors

- auth.ts and ducks.ts
  - I've typed the parameters and returns of each auth function
- ducks.ts
- We have some redundant types here with `DBEntry`, but we'll look at organizing those soon

- also typed our utils - again, note the redundant types

### Typing props in our DuckPond

- Since we've already refactored to use Context, we only have 3 components that still have props:

  - DuckProvider.tsx, AuthProvider.tsx, DuckCard.tsx

- Both providers just have the children prop, so we can type them the same way

```ts
import { useState, useEffect, type ReactNode } from 'react';
const AuthProvider = ({ children }: { children: ReactNode }) => {};
```

```ts
import { useState, useEffect, type ReactNode } from 'react';

import { getAllDucks } from '../data';
import { DuckContext } from '../context';

type DuckProviderProps = {
	children: ReactNode;
};

const DuckProvider = ({ children }: DuckProviderProps) => {};
```

- Typing our DuckCard is also straightforward

```ts
type DuckCardProps = {
	imgUrl: string;
	name: string;
	quote: string;
};
const DuckCard = ({ imgUrl, name, quote }: DuckCardProps) => {};
```

- We'll still need to type each `duck` in `DuckPond`, but we'll circle back to that after typing state

## Typing state

- Again, `useState` is a function, and since it is a generic function, we can type it with generics

### Typing state article

- Walk through examples locally

## Typing our Duckpond state

- We don't have a lot of props, but we do have a decent amount of state in
  - AuthProvider.tsx, DuckProvider.tsx, DuckForm.tsx, SignIn.tsx

### AuthProvider

- `signedIn` and `checkSession` are both simple boolean values, and React can infer that from their default values
- `user` has no default value, so we need to make a type that reflects what we get back from our API

```ts
type User = {
	_id: string;
	firstName: string;
	lastName: string;
	email: string;
	createdAt: string;
	__v: number;
};

const [user, setUser] = useState<User | null>(null);
```

#### Organizing shared types

- Now we'll look at organizing those redundant types. Since this is exactly the same as our `User` type used in `auth.ts`, to keep things DRY we can moved those shared types together and export them
- Types used in just 1 file can be co-located (declared in that file), but shared types will go in `src/types/index.ts`

```ts
type DBEntry = {
	_id: string;
	createdAt: string;
	__v: number;
};

export type User = DBEntry & {
	firstName: string;
	lastName: string;
	email: string;
};
```

- Then we can import it in `auth.ts`, and `AuthProvider.tsx`

```ts
import { type User } from '../types';
```

### DuckProvider

- Since our default state is an empty array, we need to tell TS what type of array this should be. It should be an array of `ducks`, so let's share this type and move it into our `types` folder
  - we'll also need to share our `DuckInput` type later, so let's already move that one as well

```ts
export type DuckInput = {
	name: string;
	imgUrl: string;
	quote: string;
};

export type Duck = DBEntry & DuckInput;
```

- Then import into `ducks.ts`

```ts
import type { DuckInput, Duck } from '../types';
```

- And `DuckProvider.tsx`

```ts
import type { Duck } from '../types';

const [ducks, setDucks] = useState<Duck[]>([]);
```

### DuckForm.tsx

- Since we have an initial state for our form, we don't strictly need to pass a type, but to explicitly state that this is our `DuckInput` type, we can add it here

```ts
import type { DuckInput } from '../../types';

const [form, setForm] = useState<DuckInput>({
	name: '',
	imgUrl: '',
	quote: ''
});
```

### SignIn.tsx

- Same principle for our sign in form
- We move `SignInInput` to `types`, and share it

```ts
import type { SignInInput } from '../types';
const [{ email, password }, setForm] = useState<SignInInput>({
	email: '',
	password: ''
});
```

## Controlled Components & DOM Events

- Walk through articles locally
- Highlight that you can either type the function, or the argument
- Uses React types, and DOM types for element
