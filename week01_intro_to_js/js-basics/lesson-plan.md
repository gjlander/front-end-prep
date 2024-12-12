# Intro to JavaScript

-   start with empty JS file

## Getting started

-   Write a comment, ask and discuss

```js
//What's happening here?
```

-   Write addition, ask and discuss

```js
20 + 5;
```

### How do I display the results?

-   Show console.log(), where did it go?

```js
console.log(20 + 5);
```

-   Can run in Node.js, but was built for the browser - so let's connect it
-   Make an HTML file and connect the JS with a script tag
-   Mention the playground has done some extra work to simply display it - we'll circle back to that at the end

## Variables

-   store addition in a variable, and log it

### JavaScript is weakly typed, and synchronous

-   This means don't have to declare a data type, and can reassign to a different one

### What are the other data types? Go to playground (slide 5)

-   Reassign number to a string, show logs before and after reassignment
-   What are the other methods of declaring a variable? Discuss differences
-   Show what happens if you try to reassign const

## Arithmetic - Go to playground (slide 6)

-   Make note of incrementors and += syntax

## Comparisons - Go to playground (slide 8)

-   Make note of difference between strict equality and simple equality

### Operators

-   Go to [docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_operators#assignment_operators)
-   Talk about logical &&, ||, !

## Conditionals

### If Statements

-   Write an if statement with true, reassign a variable - ask what will happen before running it
-   Do the same with false
-   Show other if conditions

#### Talk about scope here

-   Assign a variable inside the if statement and log it
-   try to log it outside the scope
-   Do the same for a variable with the same name as a global

### If/else Statements

-   And an else example

#### Ternary operator

-   Functions almost exactly the same as if/else, explain the syntax

### If/else if

-   For when there's several conditions to meet
-   Show examples

### Switch statements

-   Long chains of else if gets hard to read, then use switch
-   Show example with DnD classes logging a catch phrase

```js
let day = 3; // Change the value of day
switch (day) {
    case 1:
        console.log('Monday');
        break;
    case 2:
        console.log('Tuesday');
        break;
    case 3:
        console.log('Wednesday');
        break;
    case 6:
    case 7:
        console.log('Weekend');
    default:
        console.log('Another day');
}
```

-   Note breaks and fall through

## Functions

-   Functions are a set of instructions (do what's inside here)

### Function Declarations

-   Write a function

```js
function sayHelloWorld() {
    console.log('Hello World!');
}
```

-   Why did nothing happen?
-   Talk about return keyword, and how you can store it in a variable
-   Without return, returns undefined
-   Call the function before it's declared, ask and discuss

### Function Expressions

-   Write something fun, but here's the syntax

```js
const square = function (number) {
    return number * number;
};
```

-   Are not hoisted

### Arrow functions - Introduced in ES6 in 2015 (along with lots of stuff)

-   Look similar to function expressions, preferred syntax nowadays
-   Mention default parameters, let them know it's ok if rest parameters don't make sense yet

## Final Thoughts

-   This is everything you need to finish the exercsies (except #5 and #7.4)
-   Go to playground and demo downloading an exercise
-   Fix logo, mention errors don't show in the UI
