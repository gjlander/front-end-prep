# Web Apis & DOM API

## Points for exercises

-   Select elements
-   Access element properties and update them
-   Create elements
-   Event listeners (form submission)

## First, let's make a simple webpage

-   We'll make a pond for our rubber duck debuggers to hang out in
-   Add our tailwind CDN and empty tailwind.config.js file
-   Git rid of the blinding white, make a header, and an empty section
-   Make a simple form for adding a new duck to the pond

## Access elements

-   document.querySelector(), use your CSS selectors to target the first element that matches that selector

```js
const header = document.querySelector('header');
console.log(header);
```

-   It has a lot of properties on it, highlight classList, className, id, textContent
-   This is an object, so we can use dot notation to update these properties

```js
header.classList.add('bg-slate-400', 'p-4', 'rounded-md');
header.textContent = "Hehe, I'm new now";
```

-   Can also use combinators

```js
const h1 = document.querySelector('header h1');
console.log(h1);
```

-   I'm not sure why, but sometimes with console.log() it shows the HTML element like HTML, to still see the properties, you can use `console.dir()`

```js
console.dir(h1);
```

#### NodeList

-   say you don't just want the first item, but several
-   document.querySelectorAll() returns a NodeList - this is like an Array, but doesn't have most of the methods

```js
const inputs = document.querySelectorAll('#add-form input');
console.log(inputs);
```

-   Can still iterate over using forEach, for of..., or for loop

### Other methods, but will default to querySelector, refer to [slide](https://playground.wbscod.in/static/web-apis-dom/3)

## Create elements

### Template Strings - Let's actually show some ducks!

-   Let's pretend we have our ducks saved somewhere in a database. When the page loads, we'll make a fetch request, and then for each duck we make a card
-   For now, we'll just use an array of objects

```js
const ducksInThePond = [
    {
        _id: 1,
        name: 'Sir Quacks-a-lot',
        imgUrl: 'https://cdn11.bigcommerce.com/s-nf2x4/images/stencil/1280x1280/products/430/7841/Knight-Rubber-Duck-Yarto-2__93062.1576270637.jpg?c=2',
        quote: 'I will slay your bugs!',
    },
    {
        _id: 2,
        name: 'Captain Quack Sparrow',
        imgUrl: 'https://www.veniceduckstore.it/cdn/shop/products/Captain-Quack-Rubber-Duck-slant.jpg',
        quote: "You'll always remember this as the day you almost squeezed Captain Quack Sparrow.",
    },
    {
        _id: 3,
        name: 'Ruder Duck',
        imgUrl: 'https://i.ebayimg.com/images/g/vToAAOSwr6hdW8L8/s-l1600.jpg',
        quote: '#@*% off! Debug your own code!',
    },
    {
        _id: 4,
        name: 'Darth Quacker',
        imgUrl: 'https://www.duckshop.de/media/image/3c/ce/25/Black_Star_Badeente_58495616_4_600x600.jpg',
        quote: 'No, I am your debugger!',
    },
    {
        _id: 5,
        name: 'Spider-Duck',
        imgUrl: 'https://i5.walmartimages.com/seo/Spidy-Super-Hero-Rubber-Duck_a42dbd68-e8cd-41f2-ac6d-c812a3a00339.bc3415f3b98088ac58eaeda1f06c10c9.png?odnHeight=640&odnWidth=640&odnBg=FFFFFF',
        quote: 'Does whatever a Spider-Duck can!',
    },
    {
        _id: 6,
        name: 'Sr Developer Duckbert',
        imgUrl: 'https://www.duckshop.de/media/image/91/86/a1/Nerd_Badeente_67685078_600x600.jpg',
        quote: 'Come to me with your BIG bugs!',
    },
    {
        _id: 7,
        name: 'Quacker',
        imgUrl: 'https://m.media-amazon.com/images/I/61iqP4VFsEL.__AC_SX300_SY300_QL70_ML2_.jpg',
        quote: 'Why so serious?',
    },
    {
        _id: 8,
        name: 'Mad Quacker',
        imgUrl: 'https://duckycity.com/cdn/shop/products/SG-REYTD-JCNYO_1024x1024_clipped_rev_1-min_540x.jpeg?v=1505504539',
        quote: 'Be careful, or I might just make your bugs into SUPER bugs!',
    },
    {
        _id: 9,
        name: 'Ducklock Holmes',
        imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbw5dFwbwPw_Uf_KTKU94mljxvtCcZzMCmKA&s',
        quote: '',
    },
];
```

-   Go over the properties
-   Here's why we have our empty section, we want our ducks to render in here
-   First we grab a reference to the section- how do I do that?

```js
const pond = document.querySelector('#pond');
```

-   For organization, I like to put global variables at the top
-   We can write a function that takes an array of objects and the container we want to render in as arguments

```js
const renderDucks = (ducksArray, container) => {
    container.innerHTML = '';
    ducksArray.forEach((duck) => {
        container.innerHTML += ` 
        <div class='shadow-xl hover:shadow-2xl hover:cursor-pointer w-96 rounded-md m-auto flex-flex-col'>
             <figure class='rounded-t-md overflow-hidden w-full h-96'>
                <img
                    class='w-full h-full'
                    src=${duck.imgUrl}
                    alt=${duck.name}
                />
            </figure>
            <div class='flex flex-col p-6 pt-2 rounded-b-md bg-slate-800 h-40'>
                <h2 class='text-3xl border-b-2 mb-4 border-b-gray-400'>
                    ${duck.name}
                </h2>
                <p>${duck.quote}</p>
            </div>
        </div>
        `;
    });
};
```

-   Then, since our JS script runs when the page loads, we can simply call the function

```js
renderDucks(ducksInThePond, pond);
```

-   This dot notation is kinda ugly how, how could we use object destructuring to make it look nicer?

```js
const renderDucks = (ducksArray, container) => {
    container.innerHTML = '';
    ducksArray.forEach(({ imgUrl, name, quote }) => {
        container.innerHTML += ` 
        <div class='shadow-xl hover:shadow-2xl hover:cursor-pointer w-96 rounded-md m-auto flex-flex-col'>
             <figure class='rounded-t-md overflow-hidden w-full h-96'>
                <img
                    class='w-full h-full'
                    src=${imgUrl}
                    alt=${name}
                />
            </figure>
            <div class='flex flex-col p-6 pt-2 rounded-b-md bg-slate-800 h-40'>
                <h2 class='text-3xl border-b-2 mb-4 border-b-gray-400'>
                    ${name}
                </h2>
                <p>${quote}</p>
            </div>
        </div>
        `;
    });
};
```

-   The end result is exactly the same, just looks a bit nicer (though I guess that's up for debate)

### document.createElement()

-   Template literals are convenient and readable, but they are a security risk. For the context of the bootcamp, they're still useful, so we'll use them. But for real-world application use with caution
-   Other option is with document.createElement(), we will cover that in more detail soon

## Events

-   Let's say we don't want our ducks to appear when the page loads. We want to have a button that the user will click to summon the ducks instead. For that, we'll need the button (obviously), and then what's called an event listener
-   First make the button, then make a reference to it in our JS

```html
<button id="summon-btn" class="bg-purple-600 p-4 rounded-lg text-2xl">
    Summon the ducks!
</button>
```

```js
const summonBtn = document.querySelector('#summon-btn');
```

-   There are several types of events, the most common we'll work with are submit, and click. We use the addEventListener() method
-   First arg is the event type, second is the callback
-   We can simply move our render ducks function inside of the callback

```js
summonBtn.addEventListener('click', () => renderDucks(ducksInThePond, pond));
```
