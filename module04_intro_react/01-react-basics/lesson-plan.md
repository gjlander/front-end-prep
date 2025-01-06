# React Fundamentals

## Topics to cover for exercises

-   Breaking UI into components
-   Styling, vanilla CSS, style attribute, Tailwind
-   Displaying Data
-   Conditional Rendering
-   Rendering Lists
-   Events

# React-ifying a Vanilla Project

-   This is an adjusted version of the result from our Web Storage API lecture.
-   I moved the form back onto the home page, and deleted the HTML and JS files for the myPond page
-   Routing works differently in React, so we'll eventually bring them back, but for now we'll focus on just having a single page
-   I also simplified the JS, using our ducksInThePond array again, instead of fetch

## Our React Setup

-   We have our `node_modules` folder, just like with Parcel
-   We know `package.json` from Parcel already
-   We have an `index.html` that is mostly empty, just a `div` with id of `root`, and a script tag. All of the content will be rendered with JS (like that exercise where you rendered everything with the DOM)
-   It has a couple of config files, and generates a README, but where things get interesting is inside of `src`
-   Our `main.jsx` is mainly for wiring up React to work properly, we won't write much in this file
-   We use the jsx extension to let us write JavaScript XML, which allows us to write code that looks like HTML inside of our JS files. Go to [slide 4](https://playground.wbscod.in/react/react-basics/4)
-   This all gets compiled into Vanilla JS in the end, but it makes our lives much easier.
-   Possible to use React without JSX, but not recommended. It is also possible to use JSX outside of React, but it was developed for React
-   Finally, in our `App.jsx` file is where we would start writing the content of our page

## From Vanilla HTML to JSX

-   Everything is a component in React, and every component (at least for us) is a function.
-   Older React used objects, known as class components, but for the last several years best practice is to use functional components
-   Inside of the return is where our JSX goes

### Copy/paste the content of `<body>` inside the return (change body to div, and delete script tag)

-   You'll notice it looks almost exactly the same, but a few key differences to note are
-   -   `class` is a reserved keyword in JS, so HTML `class` is changed to `className`
-   -   Labels with `for` are also changed to `htmlFor`, since for is also reserved
-   -   With HTML, the forward slash on closing tags was optional, in JSX it is required
-   JSX allows us additional features, but everything you learned about writing HTML is still applicable here
-   Just as with parcel, we don't open with live server anymore, we use the terminal to run `npm run dev`, then we can open the link in the browser, and voila!

## Styling with React

-   We have to content of our page, but it's back to our plain ugly HTML. Just like with Vanilla HTMl, we can use a stylesheet, inline styles, or our favorite, Tailwind

### Vanilla CSS

-   Works basically the same as in Vanilla
-   We create a css file
-   Our new part here is we have to import the whole file
-   Now we use it exactly as in Vanilla (just classes are classNames)

```css
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

-   Navbar.jsx
-   Header.jsx
-   DuckPond.jsx
-   DuckForm.jsx
-   Footer.jsx
-   Again, each component is just a function, and in the return is where we write our JSX

### Nothing about our UI has changed, but our code is more organized.

### One benefit is the ability to recycle components

-   Make a Button.jsx component
-   Copy the JSX over, hard-coded, replace
-   Do the same for the second button

## This is where props come in

-   Go through adding props to the button

### Before we move away, let's talk about events

-   Our vanilla button had an onclick event, add it to the button
-   Walk through passing it as a prop

## Rendering Lists

-   Make DuckCard.jsx
-   Talk about using map method, and show just the items first
-   Don't forget the key
-   Copy the HTML from JS into JSX

## Set up with Vite

-   Setup the project, and go through the options
    ` npm create vite@latest`
-   Go through each of the files created
-   -   We know `package.json` from Parcel already
-   -   We have an `index.html` that is mostly empty, just a `div` with id of `root`, and a script tag. All of the content will be rendered with JS (like that exercise where you rendered everything with the DOM)
-   -   It has a couple of config files, and generates a README, but where things get interesting is inside of `src`
-   -   Vite creates a big boilerplate with a bunch of things, we'll clear out most of it
-   -   Key is our `main.jsx`
-   Clear out the boilerplate
-   Install Tailwind, refer to [docs](https://tailwindcss.com/)
-   Install DaisyUI, refer to [docs](https://daisyui.com/)
-   Import styles in main.jsx
-
