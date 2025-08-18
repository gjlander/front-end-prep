# Runtime Validation with Zod

## Topics to cover

- Type assertion doesn't check anything
- Assertion/runtime mismatch
- Validation with Zod
  - creating a schema
  - transforming with a schema
  - type inference from schema
- Zod in the duckpond
- Input validation with Zod?

## The Trust Gap: Limitations of Type Assertion

- When working with API calls, thus far we've been using type assertion to let TS know what type we're working with
- A basic app with JSON placeholder, we might fetch in `useEffect`, and see what our response looks like`

```ts
import { useEffect } from 'react';

const App = () => {
	useEffect(() => {
		const getTodo = async () => {
			try {
				const res = await fetch('https://jsonplaceholder.typicode.com/todos/1');
				if (!res.ok) throw new Error('Something went wrong!');
				const data = await res.json();

				console.log(data);
			} catch (error) {
				console.error(error);
			}
		};
		getTodo();
	}, []);
	return (
		<div>
			<h1>Runtime Validation with Zod</h1>
		</div>
	);
};

export default App;
```

- From here, we see we get an array of objects, and based on the shape of the objects, we can declare our type alias, and use type assertion

```ts
type Todo = {
	userId: number;
	id: number;
	title: string;
	completed: false;
};

const data = (await res.json()) as Todo[];
```

- We can use this to type our state, and get autocomplete, etc

```ts
const [todo, setTodo] = useState<Todo | null>(null);

<ul>{todo && <li className={todo.completed ? 'line-through' : ''}>{todo.title}</li>}</ul>;
```

- The problem with this, is that at runtime, when the code is actually executing, TS has now way of knowing if our code is valid. The API might update, or we might have a typo in our type that messes everything up
- If we change `title` to `name`, TS will complain, but the mistake is ours. There's a mismatch between the type, and the actual response, but TS can only access the type we tell it

```ts
type Todo = {
	userId: number;
	id: number;
	name: string;
	completed: boolean;
};
```

## Runtime validation with Zod

- A super TS friendly library to get that runtime validation is [Zod](https://zod.dev/)

### Zod docs - Basic Usage

- With Zod, you define a schema that describes the shape your data should have. Zod's types track 1:1 with TS

- So, we can make a `TodoSchema`

```ts
const TodoSchema = z.object({
	userId: z.number(),
	id: z.number(),
	title: z.string(),
	completed: z.boolean()
});
```

- Then we can call `safeParse` on it during the fetch call to validate that our incoming data matches the Schema
  - if all of the validation checks pass, `safeParse` will return a deep clone of our data, and we can be confidant that it matches our schema that's on the `data` property
  - there is also a `success` boolean we cna use to check
  - if validation failed, we get an `error` property

```ts
const getTodo = async () => {
	try {
		const res = await fetch('https://jsonplaceholder.typicode.com/todos/1');
		if (!res.ok) throw new Error('Something went wrong!');
		const data = (await res.json()) as Todo;
		console.log(data);
		const parsedData = TodoSchema.safeParse(data);
		console.log(parsedData);
		// setTodo(parsedData);
	} catch (error) {
		console.error(error);
	}
};
```

- If we change `id` to a `string`...
- We get a Zod error
- We can destructure those properties right away
- Zod has a helper to turn there error message into a readable string
- If `success` is false, we throw an error with that formatted error message
- If validation passes, we get update our state confidently

```ts
const getTodo = async () => {
	try {
		const res = await fetch('https://jsonplaceholder.typicode.com/todos/1');
		if (!res.ok) throw new Error('Something went wrong!');
		const dataRes = (await res.json()) as Todo;
		console.log(dataRes);
		const { success, data, error } = TodoSchema.safeParse(dataRes);
		if (!success) {
			throw new Error(z.prettifyError(error));
		}
		setTodo(data);
	} catch (error) {
		console.error(error);
	}
};
```

### Inferring Types with Zod

- Now we have our schema, and it should match our type exactly, but if we change our schema, we also then have to go and change our type, and TS will help us figure out our mistakes if we have them, but Zod makes it even easier for us
- We can get the type directly from our schema rather than creating a separate one

```ts
type Todo = z.infer<typeof TodoSchema>;
```

- This way we have a "single source of truth", and we can now have runtime validation, and our TS type coming from Zod

- Since Zod also supports arrays, we could use this for the `todos` endpoint

```ts
const TodoSchema = z.object({
	userId: z.number(),
	id: z.number(),
	title: z.string(),
	completed: z.boolean()
});

const TodoArraySchema = z.array(TodoSchema);
// type Todo = {
// 	userId: number;
// 	id: number;
// 	title: string;
// 	completed: boolean;
// };

// type Todo = z.infer<typeof TodoSchema>;
type TodoArray = z.infer<typeof TodoArraySchema>;

const App = () => {
	// const [todo, setTodo] = useState<Todo | null>(null);
	const [todo, setTodo] = useState<TodoArray>([]);
	useEffect(() => {
		const getTodo = async () => {
			try {
				const res = await fetch('https://jsonplaceholder.typicode.com/todos/');
				if (!res.ok) throw new Error('Something went wrong!');
				const dataRes = await res.json();
				console.log(dataRes);
				const { success, data, error } = TodoArraySchema.safeParse(dataRes);
				if (!success) {
					throw new Error(z.prettifyError(error));
				}
				setTodo(data);
			} catch (error) {
				console.error(error);
			}
		};
		getTodo();
	}, []);
	return (
		<div>
			<h1>Runtime Validation with Zod</h1>
			<ul>
				{todo.map(todo => (
					<li key={todo.id} className={todo.completed ? 'line-through' : ''}>
						{todo.title}
					</li>
				))}
			</ul>
		</div>
	);
```
