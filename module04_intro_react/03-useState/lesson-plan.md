# React Hooks: useState

## Topics for exercise

-   General useState basics
-   State is local
-   Conditional rendering with state
-   Object as state (form)
-   Sharing state

# Slide show

## Slide 4 go to [playground](https://playground.wbscod.in/react/react-hooks-usestate/1)

-   Delete with state example
-   Open dev tools and show markup
-   Demonstrate nothing happens

### Back to slide 5

## Slide 7, back to playground

-   Open devtools again, show it updates
-   State lets React know to rerender
-   Still using DOM manipulation under the hood, just like Tailwind is using Vanilla CSS under the hood.

## Stay in playground for final slide - Anatomy of State

-   you can pass an initial state as an argument
-   useState returns an array with 2 items
-   The first item is always the state itself, the second is a function to update it
-   Common practice is to use destructuring to access them directly
