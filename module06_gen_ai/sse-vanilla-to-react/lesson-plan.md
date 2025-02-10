# From Vanilla to React - AI Chatbot

-   Go over [project requirements](https://learn.wbscodingschool.com/courses/full-stack-web-app/lessons/%f0%9f%a7%a9-chatbot-with-react-and-openai/)
-   Show local demo of potential end result

## Refactoring our SSE app into React

-   This is a big task, so to help get you started, together let's refactor our project from yesterday into React

### Setting up our Vite project with Tailwind and DaisyUI

-   Walk me through, what's the first thing I need to do? Where can I look if I forget the syntax?
-   Create Vite scaffold

```
npm create vite@latest sse-react-refactor -- --template react
```

-   Clear out boilerplate

-   Install Tailwind

```
npm install -D tailwindcss@3.4.17 postcss autoprefixer
```

-   Create config and postcss files

```
npx tailwindcss init -p
```

-   Update config file

```js
/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {},
    },
    plugins: [],
};
```

-   Import CSS @ rules

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

-   Install DaisyUI

```
npm i -D daisyui
```

-   Update tailwind config

```js
/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';

export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {},
    },
    plugins: [daisyui],
};
```

### Copy over the UI

-   Copy/paste the contents of the body into `App.jsx`
-   Change `<body>` to `<div>`, an remove `<script>` tags

```html
<div class="h-screen container mx-auto p-5 flex flex-col justify-between gap-5">
    <div class="h-1/3 w-full p-8 bg-slate-100 rounded-lg shadow-md">
        <form>
            <input id="stream" type="checkbox" />
            <label for="stream">Stream response?</label>
            <textarea
                id="prompt"
                rows="5"
                placeholder="Ask me anything..."
                class="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
            <button
                id="submit"
                type="submit"
                class="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                Submit✨
            </button>
        </form>
    </div>
    <div
        id="results"
        class="h-2/3 w-full p-8 bg-slate-100 rounded-lg shadow-md"
    ></div>
</div>
```

-   On save, with automatically update for to htmlFor and class to className
    -   If it didn't I could search and replace
-   Darken up the bg color a bit

### Break it into components

-   One for the Form, one for the Results (I'll call it chat)
-   Make the components copy/paste, do the imports, etc.

### Control our components

-   Need state for checkbox, and one for textarea
    -   Could use a single state, but let's keep things simple
-   Boolean for checkbox, string for prompt

```js
const [isStream, setIsStream] = useState(false);
const [prompt, setPrompt] = useState('');
```
