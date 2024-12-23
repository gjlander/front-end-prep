# Fetch API

## Tour!

-   Quick review - this is the exact same duck pond we ended with. Just cleaned out some of the stuff we won't use
-   No more array of objects in our JS

## Now let's fetch-GET

-   We give the URL we want to fetch from
-   The default method is GET, so only need the URL (we'll look at POST later)
-   Got to network tab and click on button
-   show the response, and preview

```js
summonBtn.addEventListener('click', () => {
    // console.log('You tried to summon the ducks!');
    fetch('https://duckpond-89zn.onrender.com/ducks');
});
```

-   returns a promise
-   go to [docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) to show diagram
-   store in variable, show console.log
-   show state is pending, and the methods

```js
summonBtn.addEventListener('click', () => {
    // console.log('You tried to summon the ducks!');
    const response = fetch('https://duckpond-89zn.onrender.com/ducks');
    console.log(response);
});
```

-   Use .then() to resolve the promise
-   show the response object

```js
summonBtn.addEventListener('click', () => {
    // console.log('You tried to summon the ducks!');
    fetch('https://duckpond-89zn.onrender.com/ducks').then((res) =>
        console.log(res)
    );
});
```

-   Can add in some error handling

```js
summonBtn.addEventListener('click', () => {
    // console.log('You tried to summon the ducks!');
    fetch('https://duckpond-89zn.onrender.com/ducks/1')
        .then((res) => {
            if (!res.ok)
                throw new Error(`Something went wrong! Error: ${res.status}`);
            console.log(res);
        })
        .catch((err) => console.error(err));
});
```

## In comes JSON

-   Go to docs: [JSON Docs](https://www.w3schools.com/js/js_json_intro.asp)
-   Formatted like Object, is all just a string
-   Response object has a method for converting JSON into JS objects .json method on response, and go to [docs](https://developer.mozilla.org/en-US/docs/Web/API/Response/json)
-   Instead of logging, let's return res.json to make it usable
-   Since res.json() also returns a promise, we must use a second .then
-   log the data-it's usable now!

```js
summonBtn.addEventListener('click', () => {
    // console.log('You tried to summon the ducks!');
    fetch('https://duckpond-89zn.onrender.com/ducks/')
        .then((res) => {
            if (!res.ok)
                throw new Error(`${res.status}. Something went wrong!`);
            // console.log(res);
            return res.json();
        })
        .then((data) => console.log(data))
        .catch((err) => console.error(err));
});
```

## Render the data we fetch

-   Now we can still use our old renderDucks function

```js
.then((data) => renderDucks(data, pond))
```

## Since we're rendering, let's give some user feedback when there's an error

```js
const errorHandler = (error, container) => {
    console.error(error);
    const h2 = document.createElement('h2');
    h2.className = 'inline-block m-auto text-6xl mb-6 text-red-600';
    h2.textContent = error;
    container.appendChild(h2);
};
```

-   Then add it to the catch blocks

## Now with async/await

-   syntactic sugar-what does that mean?
-   More readable, need to add try/catch block for error handling
-   Add async keyword, then can use await. Show without try/catch first

```js
summonBtn.addEventListener('click', async () => {
    try {
        const res = await fetch('https://duckpond-89zn.onrender.com/ducks/');
        if (!res.ok) throw new Error(`${res.status}. Something went wrong!`);
        const data = await res.json();
        renderDucks(data);
    } catch (error) {
        console.error(error);
    }
});
```

## POST method

### Won't go into too much detail, since it won't be immediately used, but want to have as a reference

-   We'll just add a couple things to our submit handler

-   fetch can take an optional second argument
-   Must declare method, and in the headers define what the content type is
-   In the body, we have to stringify the object we want to send- this will convert our JS object into JSON

```js
const res = await fetch('https://duckpond-89zn.onrender.com/ducks/', {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({
        name: name.value,
        imgUrl: imgUrl.value,
        quote: quote.value,
    }),
});
```

-   Just like with GET, we can take the response, use the .json() method
-   Log the data, we get an object back

```js
addForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = addForm.querySelector('#name');
    const imgUrl = addForm.querySelector('#img-url');
    const quote = addForm.querySelector('#quote');

    if (!name.value || !imgUrl.value || !quote.value) {
        alert('Please fill in required fields!');
        return;
    }

    const newDuck = {
        _id: ducksInThePond.length,
        name: name.value,
        imgUrl: imgUrl.value,
        quote: quote.value,
    };

    try {
        const res = await fetch('https://duckpond-89zn.onrender.com/ducks/', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(newDuck),
        });
        const data = await res.json();
        renderSingleDuck(data, pond);
        e.target.reset();
    } catch (error) {
        console.error(error);
    }
});
```

### PUT and DELETE look similar, and there are examples in the playground. Your main method for the next few weeks will be GET, but I wanted you to have to reference
