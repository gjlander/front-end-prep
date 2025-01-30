# React Router

## Topics to cover

-   Initial setup for static routes
-   Link and NavLink
-   Layout and Outlet (nested routes)
-   Dynamic Routes and useParams
-   404 Page
-   useNavigate

## Initial Setup

### Reorganize for routing

-   First, let's move everything inside of our App function into a new `Home.jsx` component, since this is what we want on the Home page
-   -   Make a new folder for pages, update import paths
-   Now `App.jsx` will be concerned with handling routing

```js
import Home from './pages/Home';

function App() {
    return (
        <>
            <Home />
        </>
    );
}

export default App;
```

### Setting up React Router

-   First we have to install, use `npm i react-router`
-   -   Old version used `react-router-dom`, missed updating in some places in the LMS
-   Import BrowserRouter, Routes, and Route

```js
import { BrowserRouter, Routes, Route } from 'react-router';
```

-   BrowserRouter has to wrap our whole app, then in side of that we nest Routes
-   Inside of routes, we can define each route.
-   -   The path tells us the URL path we want this to render on. For the root path, or home, we just use "/"
-   -   For element, we pass the JSX component we want to render here

```js
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
}
```

### Let's move our DuckForm back into a separate page, like we had it in Vanilla HTML/JS

-   Make a new MyPond.jsx page
-   Copy over much of the Home page
-   Create a state for my duck pond, based on local storage
-   import it, and render it in a new route

```js
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='mypond' element={<MyPond />} />
            </Routes>
        </BrowserRouter>
    );
}
```

-   Now I can manually type in the URL, and see the page!

## Link and NavLink

-   That's not, of course, how we'd like our users
-   In our `Navbar` component, we can update the hrefs to match our paths

```html
<li className="p-2 rounded-lg hover:bg-slate-600">
    <a href="/">Home</a>
</li>
<li className="p-2 rounded-lg hover:bg-slate-600">
    <a href="/mypond">My Pond</a>
</li>
```

-   This shows us the right content, but if you notice, it's refreshing the page every time - NOT what we want!
-   To use client-side navigation, React Router has a Link component we can use instead
-   Now instead of href, it has a to property

```js
<li className='p-2 rounded-lg hover:bg-slate-600'>
                    <Link to='/'>Home</Link>
                </li>
                <li className='p-2 rounded-lg hover:bg-slate-600'>
                    <Link to='/mypond'>My Pond</Link>
                </li>
```

-   You can use this anywhere you previous used `a` elements
-   There is also `NavLink`, this is functionally EXACTLY the same as `Link`, but it applies the `active` class so you can style to show the page you are currently on
-   Having the items inside of a DaisyUI menu adds that styling for us automatically, without it, we'd have to do some conditional rendering

```js
<li className='p-2 rounded-lg hover:bg-slate-600'>
                    <NavLink to='/'>Home</NavLink>
                </li>
                <li className='p-2 rounded-lg hover:bg-slate-600'>
                    <NavLink to='/mypond'>My Pond</NavLink>
                </li>
```

## Nested Routes, Layout, and Outlet

-   If we do a side-by-side comparison of `Home.jsx` and `MyPond.jsx` we can see there's a lot of repetition. Basically everything outside of `<main>` is the same
-   React Router let's us nest routes to apply a layout.
-   So far, we've used self-closing `Route` components, we can also nest other Route components inside

### Make a new MainLayout component

-   The things we want on all of our pages, like Navbar and Footer, will go in the MainLayout component

```js
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MainLayout = () => {
    return (
        <div className='bg-slate-600 text-gray-300 flex flex-col min-h-screen'>
            <Navbar />

            <main className='flex-grow flex flex-col justify-between py-4'></main>
            <Footer />
        </div>
    );
};

export default MainLayout;
```

-   And remove those pieces from the individual pages

```js
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import DuckPond from '../components/DuckPond';

import { getDucks } from '../data/ducks';

const Home = () => {
    const [ducks, setDucks] = useState([]);

    useEffect(() => {
        let ignore = false;
        (async () => {
            try {
                const allDucks = await getDucks();
                if (!ignore) {
                    setDucks(allDucks);
                }
            } catch (error) {
                console.error(error);
            }
        })();

        console.log('useEffect ran!');

        return () => {
            ignore = true;
        };
    }, []);

    return (
        <>
            <Header />
            <DuckPond ducks={ducks} />
        </>
    );
};

export default Home;
```

```js
import { useState } from 'react';

import DuckPond from '../components/DuckPond';
import DuckForm from '../components/DuckForm';

const MyPond = () => {
    const [myDucks, setMyDucks] = useState(
        JSON.parse(localStorage.getItem('myDucks')) || []
    );
    return (
        <>
            <DuckPond ducks={myDucks} />
            <DuckForm setDucks={setMyDucks} />
        </>
    );
};

export default MyPond;
```

-   Back in App.jsx we import our layout, and nest our Route elements inside a parent Route
-   The parent element now has the MainLayout, with path="/"
-   We update our home page path to index, to indicate we want to use the exact same path that the parent Route has

```js
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route path='mypond' element={<MyPond />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
```

-   Now we have our layout, but what about the pages?

### React Router has an Outlet component that acts kind of like a placeholder

-   We can import it, then render it in our layout

```js
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MainLayout = () => {
    return (
        <div className='bg-slate-600 text-gray-300 flex flex-col min-h-screen'>
            <Navbar />
            <main className='flex-grow flex flex-col justify-between py-4'>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;
```

-   This only works for routes nested inside our Layout Route, it we move it outside, no more layout (demo this)
-   This outlet works as a placeholder, so on /, it renders `<Home/>` where Outlet is, when the path is 'mypond' it renders `<MyPond/>`
