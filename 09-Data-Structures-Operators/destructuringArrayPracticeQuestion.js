/**
Exercise 1

Rewrite the code below to use array destructuring instead of assigning each value to a variable.
*/
{
  console.log("EXERCISE 1");

  let item = ["Egg", 0.25, 12];

  let name = item[0];
  let price = item[1];
  let quantity = item[2];

  console.log(`Item: ${name}, Quantity: ${quantity}, Price: ${price}`);
  console.log();
}

//Solution
let item = ["Egg", 0.25, 12];
let[name, price, quantity]= item;
console.log(`name: ${name}, price: ${price}, quantity: ${quantity}`);


/////////////////////////////////////////////////////
/**
Exercise 2

Rewrite the code below to assign each number to the right variable.
*/
{
  console.log("EXERCISE 2");

  let numbers = [3, 5, 4, 2, 6, 1];

  let [one, two, three, four, five, six] = numbers;

  console.log(`One: ${one}, Two: ${two}, Three: ${three}, Four: ${four}, Five: ${five}, Six: ${six}`);
  console.log();
}

//Solution
let numbers = [3, 5, 4, 2, 6, 1];
const[three,five,four,two,six,one] = numbers;
console.log(`One: ${one}, Two: ${two}, Three: ${three}, Four: ${four}, Five: ${five}, Six: ${six}`);



///////////////////////////////////////////////////////
/**
Exercise 3

We have an object called 'user'.

Write the destructuring assignment that reads:

- 'name' property into the variable 'name'.
- 'years' property into the variable 'age'.
- 'isAdmin' property into the variable 'isAdmin' (false, if no such property)
*/
{
  console.log("EXERCISE 3");

  let user = { name: "John", years: 30 };

  // your code to the left side:
  let {} = user;

  console.log(name); // John
  console.log(age); // 30
  console.log(isAdmin); // false
  console.log();
}


///////////////////////////////////////////////////////
/**
Exercise 4

Rewrite the code below to use array destructuring instead of assigning each value to a variable.
*/
{
  console.log("EXERCISE 4");

  let person = [12, "Chris", "Owen"];

  let firstName = person[1];
  let lastName = person[2];
  let age = person[0];

  console.log(`Person - Age: ${age}, Name: ${firstName} ${lastName}`);
  console.log();
}


///////////////////////////////////////////////////////
/** 
Exercise 5

Rewrite the code below to use array destructuring instead of assigning each value to a variable.
Make sure not to have unused variables.

Hint: https://untangled.io/in-depth-es6-destructuring-with-assembled-avengers
*/
{
  console.log("EXERCISE 5");

  let person = ["Chris", 12, "Owen"];

  let firstName = person[0];
  let lastName = person[2];

  console.log(`Name: ${firstName} ${lastName}`);
  console.log();
}


///////////////////////////////////////////////////////
/** 
Exercise 6

Using Array Destructuring get the last name from the array. 

Hint: https://untangled.io/in-depth-es6-destructuring-with-assembled-avengers
*/
{
  console.log("EXERCISE 6");

  const students = ['Christina', 'Jon', 'Alexandare'];

  // Write your code here
  const [] = students;

  console.log(lastName);
  console.log();
}


///////////////////////////////////////////////////////
/**
Exercise 7

Using Array Destructuring get all of the names from this Nested Array

Hint: https://untangled.io/in-depth-es6-destructuring-with-assembled-avengers
*/
{
  console.log("EXERCISE 7");

  const moreStudents = [
    'Chris', 
    ['Ahmad', 'Antigoni'], 
    ['Toby', 'Sam']
  ];

  // Write your code here
  const [] = moreStudents;

  console.log(student1, student2, student3, student4, student5);
  console.log();
}




///////////////////////////////////
const avengers = {
  blackWidow: 'Natasha Romanoff',
  ironManCharacters: {
    couple: {
      ironMan: 'Tony Stark',
      hera: 'Pepper Potts'
    }
  }
};

const ironManProperties = {
  family: {}
};

({
  ironManCharacters: {
    couple: ironManProperties.family
  }
} = avengers);

// ironManProperties.family
// ironManProperties.family = {
//    ironMan: 'Tony Stark',
//    hera: 'Pepper Potts'
// }

// Output ironManProperties.family:
console.log(ironManProperties.family);



/* 
////////////////////////////////////////////////////
// Spread And Rest Operator Practice Question


Write a function that can take in any number of arguments, and returns the sum of all of the arguments.

Write a function called addOnlyNums that can take in any number of arguments (including numbers or strings), and returns the sum of only the numbers.

addOnlyNums(1, 'cat', 3, 4); //8

- Write a function called `countTheArgs` that can take any number of arguments, and returns the number of arguments that are passed in.

```js
countTheArgs('cat', 'dog'); //2
countTheArgs('cat', 'dog', 'frog', 'bear'); //4
Write a function called combineTwoArrays that takes in two arrays as arguments, and returns a single array that combines both (using the spread operator).

Write a function called sumEveryOther that takes in any amount of arguments, and returns the sum of every other argument.

sumEveryOther(5, 6, 3, 4, 1); //9
sumEveryOther(10, 2, 11); //21
Write a function called onlyUniques that can take in any number of arguments, and returns an array of only the unique arguments.
onlyUniques('cat', 'cat', 'dog', 'pig'); //['cat', 'dog', 'pig']
onlyUniques(1, 4, 7, 1, 2, 7, 4); //[1, 4, 7, 2]
Write a function called combineAllArrays that takes in any number of arrays as arguments and combines all of them into one array.

Write a function called squareAndSum that takes in any number of arguments, squares them, then sums all of the squares.

sumAndSquare(2, 4, 3); //29
sumAndSquare(1, 2); //5 */