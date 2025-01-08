# React Fundamentals

## Topics to cover for exercises

-   Breaking UI into components
-   Styling, vanilla CSS, style attribute, Tailwind
-   Displaying Data
-   Conditional Rendering
-   Rendering Lists
-   Events

# React-ifying a Vanilla Project

-   This is a simplified version of the result from our Web Storage API lecture.
-   Routing works differently in React, so we'll eventually bring them back, but for now we'll focus on just having a single page
-   I also simplified the JS, using our ducksInThePond array again, instead of fetch

## Making a project with Vite

-   One of the most common tools for using React is Vite
-   Setup the project, and go through the options
    ` npm create vite@latest`
-   Note nested new folder, cd into it, then install dependencies `npm i`
-   We have our `node_modules` folder now, just like with Parcel
-   We know `package.json` from Parcel as well

### We'll only have one HTML file, and it will be mostly blank

-   We have an `index.html` that is mostly empty, just a `div` with id of `root`, and a script tag.
-   All of the content will be rendered with JS (like that exercise where you rendered everything with the DOM)
-   This will be our only HTML file, even when we start adding more pages, everything will be rendered with JavaScript, This is what we mean with SPA.
-   It has a couple of config files, and generates a README, but where things get interesting is inside of `src`

### main.jsx

-   Our `main.jsx` is mainly for wiring up React to work properly, we won't write much in this file
-   We use the jsx extension to let us write JavaScript XML, which allows us to write code that looks like HTML inside of our JS files. Go to [slide 4](https://playground.wbscod.in/react/react-basics/4)
-   This all gets compiled into Vanilla JS in the end, hence our need for a bundler. .
-   Possible to use React without JSX, but not recommended. It is also possible to use JSX outside of React, but it was developed for React
-   We use imports to use the files we need, we now import css instead of using the link tag - remember we're not in HTML anymore

### App.jsx

-   Here is where we start writing what will render on the page
-   Vite comes with a lot of boilerplate, let's look at it, then clear it out
-   If we use show preview, only get blank page (remember nothing is in the html). Now we have to use our `npm run dev` command
-   Demo the page
-   Clear out boilerplate

## From Vanilla HTML to JSX

-   Everything is a component in React, and every component (at least for us) is a function.
-   Older React used objects, known as class components, but for the last several years best practice is to use functional components.
-   We demo class components in the playground, but will only work with functional components.
-   Inside of the return is where our JSX goes

### Copy/paste the content of `<body>` inside the return (change body to div, and delete script tag)

-   You'll notice it looks almost exactly the same as our HTML, but a few key differences to note are:
-   -   `class` is a reserved keyword in JS, so HTML `class` is changed to `className`
-   -   Labels with `for` are also changed to `htmlFor`, since for is also reserved
-   -   With HTML, the forward slash on closing tags was optional, in JSX it is required
-   JSX allows us additional features, but everything you learned about writing HTML is still applicable here

## Styling with React

-   We have to content of our page, but it's back to our plain ugly HTML. Just like with Vanilla HTML, we can use a stylesheet, inline styles, or our favorite, Tailwind

### Vanilla CSS

-   Works basically the same as in Vanilla
-   We create a css file inside of `src`
-   Our new part here is we have to import the whole file into `main.jsx`
-   Now we use it exactly as in Vanilla (just classes are classNames)

```css
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    background-color: lightgray;
}

#summon-btn {
    background-color: aqua;
}

.text-center {
    text-align: center;
}
```

### Inline Styles

-   We can also use inline styles in JSX, just instead of a string, it takes an object
-   We have to use double brackets, I'll go into why later
-   Properties are with camelCase, and text has to go in quotes

```jsx
<h1
    style={{
        backgroundColor: 'red',
        padding: '1rem',
    }}
    className='text-6xl mb-6'
>
    The Duck Pond
</h1>
```

### Tailwind

-   Just like with Parcel, to use Tailwind, we have to install it
-   The configuration is a bit different for React, we'll go into more detail on the setup later, for today let your brain rest a minute while I set it up
-   Now our page isn't ugly anymore!

## Breaking our UI into Components

-   Let's start with what's in our html file, then circle back to duck cards
-   We could in theory work like this, but then we're not taking advantage of what React can do for us

### Each section gets a component

#### Make a `src` folder, and a new file for each component. It is possible to have several in the same file (and that's what you'll see in the playground, but best practice is one component per file)

-   By convention, our filename matches the name of the component, and component has to start uppercase

-   Navbar.jsx

```js
const Navbar = () => {
    return (
        <nav className='flex justify-end bg-slate-800 py-2 px-8 text-2xl mb-6'>
            <ul className='flex gap-6'>
                <li className='p-2 rounded-lg hover:bg-slate-600'>
                    <a href='index.html'>Home</a>
                </li>
                <li className='p-2 rounded-lg hover:bg-slate-600'>
                    <a href='src/myPond.html'>My Pond</a>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
```

-   Header.jsx

```js
const Header = () => {
    const handleClick = () => {
        console.log('You tried to summon the ducks!');
    };
    return (
        <header className='text-center'>
            <h1
                // style={{
                //     backgroundColor: 'red',
                //     padding: '1rem',
                // }}
                className='text-6xl mb-6'
            >
                The Duck Pond
            </h1>
            <button
                id='summon-btn'
                className='bg-purple-600 p-4 rounded-lg text-2xl'
                onClick={handleClick}
                // onClick={() => console.log('Another way to add an onClick!')}
            >
                Summon the ducks!
            </button>
        </header>
    );
};

export default Header;
```

-   DuckPond.jsx

```js
const Header = () => {
    const handleClick = () => {
        console.log('You tried to summon the ducks!');
    };
    return (
        <header className='text-center'>
            <h1
                // style={{
                //     backgroundColor: 'red',
                //     padding: '1rem',
                // }}
                className='text-6xl mb-6'
            >
                The Duck Pond
            </h1>
            <button
                id='summon-btn'
                className='bg-purple-600 p-4 rounded-lg text-2xl'
                onClick={handleClick}
                // onClick={() => console.log('Another way to add an onClick!')}
            >
                Summon the ducks!
            </button>
        </header>
    );
};

export default Header;
```

-   Footer.jsx

```
const Footer = () => {
    return (
        <footer className='flex justify-center bg-slate-800 py-4 text-2xl w-full'>
            © Copyright Ducks on Ducks on Ducks, all rights reserved
        </footer>
    );
};

export default Footer;
```

-   Again, each component is just a function, and in the return is where we write our JSX

### To use it, we have to import it

```js
import Navbar from './components/Navbar';
import Header from './components/Header';
import DuckPond from './components/DuckPond';
import Footer from './components/Footer';

function App() {
    return (
        <div className='bg-slate-600 text-gray-300 flex flex-col min-h-screen'>
            <Navbar />
            <Header />
            <main className='flex-grow flex flex-col justify-between py-4'>
                <DuckPond />
            </main>
            <Footer />
        </div>
    );
}

export default App;
```

-   Native HTML elements are in lowercase in JSX, to use our React components, it has to be uppercase. This is why component names need to be uppercase, because JS is case sensitive, components can even be named the same as HTML elements (as with our footer)
-   Nothing about our UI has changed, but now it's much easier to see the structure of our page at a glance
-   Components can be as small as a button, and as large as a whole page, and anything in between
-   You'll notice out `App.jsx` is one big functional component that wraps the entire UI of our application

### Now let's say we don't want this div wrapper

-   Show it makes an error
-   Must have one parent element, if it's not needed, can use an empty one

## Events in React

-   React uses synthetic events. All this does is standardize behavior across browsers. We still have events like submit, and click, but the syntax is a little different
-   Let's add a click event to our button here. First let's make a function for it inside the component

```js
const handleClick = () => {
    console.log('You tried to summon the ducks!');
};
```

-   Then we add an onClick (with camelCase) like an HTML attribute, and pass it our function (without curly brackets, since we want the function, not the return)

```jsx
<button
    id='summon-btn'
    className='bg-purple-600 p-4 rounded-lg text-2xl'
    onClick={handleClick}
>
    Summon the ducks!
</button>
```

-   Can also pass an anonymous function

```jsx
onClick={() => console.log('Another way to add an onClick!')}
```

-   This also works with our other events, like onSubmit. You can check the React docs for a full list of events.
-   We'll leave it at that for today, and in the next lecture we'll look at how to use events to update the page.

## Displaying Data and Props

-   Make DuckCard.jsx with placeholder info
-   Talk about using map method, and show just the items first
-   Don't forget the key
-   Copy the HTML from JS into JSX
