# Runtime Checks & Classes

## Refactor exercises

- dom api
- js objects ii
- web storage api

## Topics to cover

- Type narrowing
  - truthiness check
  - `typeof`
  - comparison
  - `instanceof`
  - `in`
  - discriminated unions
- Return types `is`
- Type assertions
  - assert not null
- Enums
- Briefly go over classes

## Enums

- Walk through **Direction** example from LMS

### `erasableSyntaxOnly` error

- Using the Vite default settings, you'll see I get an error on direction, but syntactically everything looks good
- Thus far, all of the TS we've used is "erasable" - meaning when it gets transpiled to JS, all that happens is the type annotations get deleted in a process known as type stripping.
- Enums actually get transpiled into JS code, so to get rid of this error, we can comment out the `erasableSyntaxOnly` rule in our config file

### Enums in JS

- To see what we actually get back, let's compile it by running `tsc src/main.ts`
  - We're using `tsc` instead of the build command to just see the JS output, without all of the other bundling and things that Vite would do
- But inside our JS file we see the enum gets turned into a function, and that the default values are as listed in the LMS (0, 1, 2, 3, 4)

### Back to Enums in TS

- Enums solve a very similar problem to Literal Unions, and for that reason, unless you specifically have need for an enum, most developers (myself included) prefer to use Union Literals
  - Though this is the general consensus, you will meet developers who passionately disagree
- We could refactor our `turnWithEnum` function to use Literal Unions instead
  - We can get autocomplete suggestions before typing by using `Ctrl/Cmd + space`

## Type Narrowing

- TS helps us write cleaner code, but it does nothing for us during runtime. But TS can help us to write the proper runtimes checks based on the types we give it

### Truthiness narrowing

- Something we've already been doing in our JS is checking for truthiness
- We can do this with an `if` statement, logical AND, or ternary operator
- TS will complain if we don't pass an argument

```ts
const alertMe = (msg: string): void => {
  if (msg) {
    alert(msg);
  } else {
    alert('Did you forget why you wanted to be alerted?');
  }
};

alertMe();
```

- But an empty string is falsy, so TS won't complain, but there's still not really a message

```ts
alertMe('');
```

- Of course, making this optional highlights even more why this check can be useful

### Equality narrowing

- We can compare equality if there is crossover in our union types

```ts
function compare(x: string | number, y: string | boolean) {
  if (x === y) {
    // TypeScript knows both x and y must be strings
    console.log(x.toUpperCase());
  }
}

compare(4, '4');
compare(4, true);
compare('3', '3');
```

### Type guards with `typeof`

- Most of these runtime checks are done with JS features. An especially useful one for working with primitive types is `typeof`
- It will return a string value of the primitive type

```js
console.log(typeof false);
console.log(typeof 'I am a string!');
console.log(typeof 34);
```

- This is a JS feature that we can use to validate our input
- If we hover over our `value` parameter inside the `if` statement, we see TS recognizes the narrowed type

```ts
function printValue(value: string | number): void {
  if (typeof value === 'string') {
    console.log(value.toUpperCase());
  } else {
    console.log(value.toFixed(2));
  }
}

printValue(4);
printValue('test');
```

## Type guarding Objects

- You start to see the limitations of `typeof` when you introduce objects and arrays

```ts
console.log(typeof {});
console.log(typeof []);
```

- See? I told you arrays are objects ;P
- Luckily, JS has a method to help us check if an object is also an array

```ts
console.log(Array.isArray({}));
console.log(Array.isArray([]));
```

### Checking class with `instanceof`

- For any object you are making with a constructor (using the `new` keyword), you can use `instanceof`
- Such as `Date`

```ts
function logDateOrString(val: Date | string) {
  if (val instanceof Date) {
    console.log(
      val.toLocaleDateString('de-DE', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    );
  } else {
    console.log(val.trim());
  }
}

logDateOrString('1989-12-24');
logDateOrString(new Date('1989-12-24'));
```

- Or another very common case is with errors. Since you can technically throw anything, it's good to check if your error is an `instanceof` the Error class

```ts
const throwSomething = (throwError: boolean) => {
  try {
    if (throwError) {
      throw new Error('This will be the message property');
    } else {
      throw "This wouldn't have a message property, and would cause a runtime error";
    }
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log('Default error message');
    }
  }
};

throwSomething(true);
throwSomething(false);
```

### Checking for a property with `in`
