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

- auth.ts
  - I've typed the parameters and returns of each auth function
- ducks.ts
- We have some redundant types here with `DBEntry`, but we'll look at organizing those soon

### Typing props in our DuckPond

- I've gone ahead and refactored our DuckPond using a Vite TS setup. I've renamed all js and jsx files to ts/tsx, but I haven't touched the code at all, so we have lots of errors. As we continue through the lecture, we'll work on fixing those errors

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
  - AuthProvider.tsx, DuckProvider.tsx, DuckForm.tsx

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
