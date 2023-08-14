'use strict';
/* 
///////////////////////////////////
// Default Parameters

const bookings = [];
const createBooking = function (
  flightNum,
  numPassenger = 1,
  // price = 199 * 1.2; // ( the default parameters can contain any expression. )
  price = 199 * numPassenger // ( we could not use 'numPassenger' here if it was declared below the 'price' variable )
) {
  // ES5 way of setting default parameters
  // numPassenger = numPassenger || 1;
  // price = price || 199;

  const booking = {
    flightNum,
    numPassenger,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

createBooking('LH123');
createBooking('LH123', 2, 800);
createBooking('LH123', 2);
createBooking('LH123', 5);

createBooking('LH123', undefined, 1000); // ( if we want to skip a parameter we can use this trick of using undefined on that place. )
 */





/* 
//////////////////////////////////////////////////
// How Passing Aurguments Works Values VS Refrence 

const flight = 'LH234';
const jonas = {
  name: 'Jonas Schmedtmann',
  passport:236478788,
};

const checkIn = function(flightNum, passenger){
 flightNum = 'Lh999';
 passenger.name = 'Mr. '+ passenger.name;

 if(passenger.passport === 236478788){
  alert('Checked in')
 }
 else{
  alert('Wrong passport!')
 }
};

// checkIn(flight, jonas);
// console.log(flight);
// console.log(jonas);

// is the same as doing.....
// const flightNum = flight;
// const passenger = jonas;

const newPassport = function (person){
person.passport = Math.trunc(Math.random() * 1000000000000);
}

newPassport(jonas);
checkIn(flight, jonas);
  */
 




/* 
/////////////////////////////////////////////////////
// Functions Accepting Callback Functions 

// Call Back Function
const oneWord = function(str){     // Lower Level function and Lower level of abstraction
  return str.replace(/ /g, '').toLowerCase();
}

// Call Back Function
const upperFirstWord = function (str){      // Lower level function and Lower level of abstraction
  const[first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
}


// Higher Order Function
const transformer = function(str, fn){       // Higher level function and Higher level of abstraction
console.log(`Original string: ${str}`);
console.log(`Transformed strings: ${fn(str)}`);

console.log(`Transformed by: ${fn.name}`);
}

transformer('Javascript is the best!', upperFirstWord); // here the 'transformer' is a  'Higher-Order Functions' and 'upperFirstWord and oneWord' are 'Callback Functions'.

transformer('Javascript is the best!', oneWord);

// JS uses callbacks all the time
const high5 = function(){
  console.log('👋');
}
document.body.addEventListener('click', high5); // here the 'addEventListener' is a  'Higher-Order Functions' and 'high5' is 'Callback Function' ( also known as EventListener or EventHandler)

['Jonas', 'Martha', 'Adam'].forEach(high5);
 */




/* 
////////////////////////////////////////////////
// Function Returning Functions
// Function Returning Functions works due to closures in javascript
const great = function(greeting){
  return function(name){
   console.log(`${greeting} ${name}`);
  }
}

const greeterHey = great('Hey')   // here the variable 'greeterHey' is also a function beacuase its actually storing a function, and we can call it just like any other function.
greeterHey('Jonas');
great('Hello')('Jonas');  // it is same as the above 2 line combined, since the value of the 'greet function' is a function as well, so we can call it immediately


// the above function in the arrow function form
const greetArr = greeting => name => console.log(`${greeting} ${name}`);

greetArr('Hi')('Jonas');
 */





////////////////////////////////////////////////////
// The Call And Apply Methods

const lufthansa = {
  airline:'Lufthansa',
  iataCode:'LH',
  bookings:[],
  // book:function(){}
  book(flightNum, name){
  console.log(`${name} booked a seat on ${this.airline} flight ${this.iataCode} ${flightNum}`);
  this.bookings.push({flight: `${this.iataCode} ${flightNum}`, name})
},

};

// lufthansa.book(239, 'Hameed Khan');
// lufthansa.book(635, 'Shahid Khan');
// console.log(lufthansa);


const eurowings = {
  airline:'Eurowings',
  iataCode:'EW',
  bookings:[],

}
// here the 'book' variable will behave as function because its storing a function value and not a normal value. and we can call it just like any other functions.
const books = lufthansa.book; // this is posible beacause javascript support 'first class function' means any function is just a value and we can store it in a normal variable.

// Does NOT work
// book(23, 'Sarah Williams'); // here the 'books function' is like a regular function and we know that the 'this keyword' in a regulagr function call is undefined at least in 'strict mode' so we will get an error here, so we have to tell the javasrcipt explicitly how exactly the 'this keyword' should work here, and we have three function to do that and they are Call(), Apply() and Bind().

// Call method 
books.call(eurowings, 23, 'Sarah Wiliams'); // so this time we did actually not call the 'book() function' ourselves instead we called the 'call() method' and then this call method will call the 'book function' with the 'this keyword' set to 'eurowings object', so whatever we pass as the first arguments in the 'call method' the this keyword starts pointing on that 'element or object or array' and then all the arguments after the first one are simply the arguments of the original function. and allows us to manually and expilcitly set the 'this keyword' of any function that we want to call.
console.log(eurowings); 

books.call(lufthansa, 239, 'Mary Copper');   // the first argument in the 'call function' is the one to which the this keyword will actually point and remaining all arguments are the arguments of the original function.
console.log(lufthansa);

lufthansa.book(33, ' Saqib Chawdhary');
console.log(lufthansa);

const swiss = {
  airline: 'Swiss Air Lines',
  iataCode: 'Lx',
  bookings: [],
}

lufthansa.book.call(swiss, 445, 'Asad Shikh');
console.log(swiss);

// // Apply method
// const flightData = [583, 'George Coper']; 
// books.apply(swiss, flightData);  // the apply method does basically exactly the same thing, the only difference is that the apply method does not receive a list of arguments after the first arguments(this keyword), but instead its going to take an array of the arguments, and then it will take the elements from the aaray and pass into the function as an arguments.
// console.log(swiss);

// books.call(swiss, ...flightData);  // the apply method is not that used anymore in modern javascript because know we actually have a better way of doing the exact same thing by using call method and pass the array in spread operator style.
 






/* 

////////////////////////////////////////////////
// Bind method
// book.call(eurowings, 23, 'Sarah Wiliams');

const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);
bookEW(23, 'Steven Wiliams');

// here we are specifying parts of the argument beforehand is actually a common pattern called partial application, so essentially partial application means that a part the arguments of the original function are already applied, so which mean already set and so that's exactly what the 'bookEW23 function' is, its essentially the book function but with 23 already predefined.
const bookEW23 = book.bind(eurowings, 23);  // we can even pass the remaining arguments after the first arguments in the 'bind function', but its optional
bookEW23('Hameed Khan');

const bookEW24 = book.bind(eurowings, 24, 'Saqib Chaudhary');  //we can even pass the remaining arguments after the first arguments in the 'bind function', but its optional
bookEW24();


// With Event Listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function(){
  console.log(this);
  
  this.planes++;
  console.log(this.planes);
}
// lufthansa.buyPlane();

// document.querySelector('.buy').addEventListener('click', lufthansa.buyPlansa) // in an event handler function the 'this keyword' always point to the element on which that handler is attached to, here in this case the 'handler function' is attached to the 'button element' and hence here the 'this keyword' will point the button element

document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane.bind(lufthansa))  // here, since we need to pass in a function and not to call it and so we already know that the 'call method' calls the function and so that's not what we need and so therefore we use 'bind method' because we already know that bind method is going to return a new function and so the 'this keyword' should be 'lufthansa' and so that's exactly what we define. 

// Partial application
// in this case, of a partial application many times we are not even intrested in the 'this keyword' but we still use 'bind method' for this, remember that partial application means that we can preset parameters. 

const addTax = (rate, value)=>value + value * rate;
console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.23); // it is same as writing the code like just below it.
// when you want to do this yourself just keep in mind that the order of the argument then is important, if you wanted to preset the 'rate' then it has to be the first argument in the above function otherwise this will not really work here.
// now you could argu that what we just did here could easily have been done with 'default parameters' but this is actually different because this here is creating a brand new simply more specific function based on more general function which is the 'addTax function' and ofcourse the example here could be a lot more complex too, so this really is different because using 'bind method' actually really gives us a new function, so it is as if we return a new specific function from the addTax function'.

// const addVAT = value=>value + value * 0.23;
console.log(addVAT(100));   
console.log(addVAT(23));


// the above code with function returning function concept
const addTaxRate = function(rate){
  return function(value){
    return value + value * rate;
  }
}

const addVAT2 = addTaxRate(0.23);

console.log(addVAT2(100));
console.log(addVAT2(23));

 */





///////////////////////////////////////
// Coding Challenge #1

/* 
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*/

/* 
const poll = {
    question: 'What is your favourite programming language?',
    options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
    // This generates [0, 0, 0, 0]. More in the next section 😃
    answers: new Array(4).fill(0),

    registerNewAnswer:function(){

      // Get answer
    // const answer = Number(prompt ('What is your favourite programming language? \n  0: JavaScript \n 1: Python \n 2: Rust \n 3: C++ \n(Write option number)'));
       const answer =  Number(prompt (`${this.question}\n${this.options.join('\n')}
       \n(Write option number)`));
        console.log(answer);

       //  Register answer      
       typeof answer === 'number' && answer < this.answers.length && this.answers[answer]++;
      // console.log(this.answers);
      this.displayResults();
      this.displayResults('string');
    },

    displayResults(type= 'array'){
      if(type === 'array')
      console.log(this.answers);
      else if(type === 'string')
      //  Poll results are 13, 2, 4, 1. 
      console.log(`Poll results are ${this.answers.join(', ')}`);
    }
};
// poll.registerNewAnswer();

document.querySelector('.poll').addEventListener('click', poll.registerNewAnswer.bind(poll));

 // BONUS TEST DATA 1: [5, 2, 3]
// BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]
poll.displayResults.call({answers:[5, 2, 3]});    // here we have created a new object and pass it to the 'call method', so now the 'this keyword' will point to the 'new object', here we have explicitly change the pointing of the 'this keyword' from 'poll object' to the 'newly created object'
poll.displayResults.call({answers:[1, 5, 3, 9, 6, 1]}, 'string');
poll.displayResults.call({answers:[1, 5, 3, 9, 6, 1]});

  */




/* 
//////////////////////////////////////////////////
// Immediately Invoked Function Expression (IIFE)
// There are two ways of writing Immediately Invoked Function expression (IIFE)
const runOnce = function(){
  console.log('This will never run again');
}
runOnce();

// ( i ) function expression as Immediately Invoked Function Expression (IIFE)
(function(){
  console.log('This will never run again'); 
  const isPrivate = 23;
  var isAlsoPrivate = 46;
})();  // here since the function expression does not have any name and if we call it we will get an error, hennce we wrapped the whole function in the parantheses to explicitly tell the javascript that is not a function but a its regular exprssion and just after that we called it by ();
// console.log(isPrivate);  // we will get an error since it is trying to access the 'function scope variable' which is not possible any way.
// console.log(isAlsoPrivate);  // here also we will get an error because we can not eccess a 'function scope variable' even if it is declared with 'VAR'. however it is possible in 'Block Scope'.


// ( ii ) Arrow function as Immediately Invoked Function Expression (IIFE)
(() => console.log('This will ALSO never run again'))();

// Block scope
{
  const isPrivate = 23; // variable declared with 'let' and 'const' creat their own scope, however 'var' does not creat theri own scope
 var notPrivate = 46;

}

// console.log(isPrivate); // we will get an error since it is trying to access the 'block scope variable' which is not possible any way.
console.log(notPrivate);  // we can access it because variable declared with 'var' does not creat their own scope.
// and this is the reason why now in modern javascript 'Immediately Invoked Function Expressions (IIFE)' are not that used anymore, beacause if all we want is to creat a new scope for data privacy all we need to do is to just create a 'block' like the above, there is no need to creat a function to creat a new scope unless ofcourse we want to use 'var' for our variables because we can not even access 'VAR' Variable from a 'function scope', but we already know we probably shouldn't do that.
// on the other hand if what you really need is to execute a function just once then the  Immediately Invoked Function Expression (IIFE) pattern is still the way to go even now with modern javascript.
 */





/* 
///////////////////////////////////////////////////////
// Clousers
const secureBooking = function(){
  let passengerCount = 0;

  return function(){  // it is simply the 'booker function' below , because the 'securebooking function' will return this function to the 'booker variable or booker function' at the time of calling. 
    passengerCount++;
    console.log(`${passengerCount} Passenger`);
  }
}

// a closure makes a function remember all the variables that existed at the function's birth Place essentially, so here we can imagin 'secureBooking function' as being the birthplace of the 'booker function' essentially , so the 'booker function' remembers everything at its birthplace by the time it was created.
// the secret of the closure is that, any function always has access to the variable environment of the execution context in which the function was created, now in the case of 'booker' this function was created or it was born in the execution context of 'securebooking function' which was popped off the stack previously, so therefore the 'booker function' will get access to the variable environment of the  'secureBooking function' which contains 'let passengerCount = 0;' in this case, and this is how the function will be able to read and manipulate the passenger count variable and so its this connection that we call closure. 
// what maters the most here is that the 'booker function' has access to the 'passengerCount variable' because its basically defined in the scope in which the 'booker function' was actually created, so in a sense the scope chain is actually preserved through the 'closure' even when a scope has already beed destroyed because its execution context is gone , this means that even though the execution context has actually been destroyed the variable environment somehow keeps living somewhere in the engine,
// now we can say that the 'booker function' closed over its parent scope or over its parent variable environment and this includes all function arguments even though in this example don't have any, and now this attached or closed over variable environment stays with the function forever ,it will carry it arround and be able to use it forever, to make it a bit more digestible we can also say that thanks to the 'Closure' a function does not loose connection to variables that existed at the function's birthplace that's a bit more intuitive ( simple ) right?
// Let's see what happens now with execution of the 'booker function' so the function attempts to increase the  passengerCount variable, however this variable is not in the current scope and so javascript will immediately look into the 'Closure' and see if it can find variable there and it does this even before looking at the scope chain, For example if there was a 'global passengerCount variable' set to 10 it would still first use the one in the closure, so the closure basically has priority over the scope chain and so after running this function the 'passengerCount' becomes 1 this message is logged and then the execution context is popped off the stack then ececution moves to the next line we get a new execution context and closure is still there still attached to the function and the value is still 1 and so now this function executes increasing the passengerCount to 2 and logging a message again and that what's Closure are.
const booker = secureBooking();

booker();
booker();
booker();

console.dir(booker);
 

// Closures Example
// Example 1
let f;

const g = function(){
  const a = 23;
  f = function(){
    console.log(a * 2);
  }
}

const h = function(){
  const b = 777;
  f = function(){  // here the function 'f' is reborn now it is attached to the variable environment of function 'h'.
    console.log(b * 2);
  }
}

// DOUBTS: IN CLOSURE SHOULD BOTHE THE FUNCTION BE CALLED AT THE SAME TIME ?
g();
f();
console.dir(f);

// Re-assigning f function
h();
f();
console.dir(f);

// Example 2
const boardPassengers = function(n, wait){
  const perGroup = n / 3;
  
  setTimeout(function(){
    console.log(`We are now boarding all ${n} passenger`);
    console.log(`There are 3 groups, each with ${perGroup} passenger`);
  }, wait + 1000);

  console.log(`Will start boarding in ${wait} seconds`);
} 

const perGroup = 1000;  // we can clearly see that the Closure hav priority over Scope chain because the perGroup variable of 'boardPassengers function' is executed inspite of having the same variable in the 'Global Scope Chain'
boardPassengers(180, 3);
*/


// Coding Challenge #2 its Based on Closure with Immediately Invoked Function Expression (IIFE)

(function(){
  const header = document.querySelector('h1');
  header.style.color = 'red';

  document.querySelector('body').addEventListener('click',function(){
    header.style.color = 'blue';
  });
})();
































