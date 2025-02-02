# React Hooks: useEffect

## Topics for exercises

-   Basic usage
-   Dependency array
-   Cleanup functions

## Go through playground

## Let's look at a practical example in our Duck Pond

-   When `App` mounts (renders for the first time), we are setting our array of ducks in state, then rendering it.
-   Let's actually turn that into a network request
-   You can write the code inside the component, like the playground example, but we want to modularize (break up) our code

## Make a fetchAllDucks function and import it

-   Create a new `data` folder, and `ducks.js`
-   This will look just like other getting functions we've written

```js
const getAllDucks = async () => {
    const res = await fetch('https://duckpond-89zn.onrender.com/ducks/');
    if (!res.ok) throw new Error(`${res.status}. Something went wrong!`);
    const data = await res.json();
    // console.log(data);

    return data;
};

export { getAllDucks };
```

-   Then we import it into `App.jsx`

```js
import { getAllDucks } from './data/ducks';
```

### Import useEffect and call it

-   first argument is the callback, second is the dependency array
-   To start, you can always just type out the architecture of it

```js
useEffect(() => {}, []);
```

-   We'll use an empty dependency array so that the request is only made once when the page initially loads

-   Now to get our ducks we call it. The obvious answer would be to make the callback async

```js
useEffect(async () => {
    const ducks = await getAllDucks();
}, []);
```

-   If we try to do that, we get the error that the callback can't be async. This gives us a few options
-   1. We could use .then to handle the promise
-   2. We could write an async function, and then call it inside
-   We'll go with option 2

```js
const getAndSetDucks = async () => {
    const allDucks = await getAllDucks();
    setDucks(allDucks);
};
getAndSetDucks();
```

-   Because we want to define the function, and immediately call it, we can get fancy and make a self-invoking function
-   This is an anonymous function that immediately executes, you just wrap you function in (), then put empty () after it

```js
useEffect(() => {
    (async () => {
        const allDucks = await getAllDucks();
        setDucks(allDucks);
    })();
}, []);
```

-   Since this is async, and we don't have a try/catch block in our `getDucks` function, we can add one here
-   If an error gets thrown in getDucks, it will still land in the catch block of our parent function

```js
(async () => {
    try {
        const allDucks = await getAllDucks();

        if (!ignore) {
            setDucks(allDucks);
        }
    } catch (error) {
        console.error(error);
    }
})();
```

-   Because this only runs once (or twice in development), we don't have to worry about racing conditions, so a cleanup function isn't strictly necessary

## But, if we wanted to add a cleanup function, it could look like this

```js
useEffect(() => {
    let ignore = false;
    (async () => {
        const allDucks = await getAllDucks();
        if (!ignore) {
            setDucks(allDucks);
        }
    })();
    return () => {
        ignore = true;
    };
}, []);
```

## This will be your most common use case for useEffect. useEffect should be used sparingly. Before you use it ask yourself

1. Am I trying to sync/connect with something outside of React?
    - If the answer is no, use state to update the UI
2. Is this update based on user input or action?
    - If the answer is yes, make the fetch request, or whatever logic is needed, inside of an event handler.
