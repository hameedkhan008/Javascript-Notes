'use strict';


// Data needed for first part of the section
/////////////////////////////////////////////

// Enhanced object literal
const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const openingHours = {
  thu: {
    open: 12,
    close: 22,
  },

  // [weekdays[2]]: {
  //   open: 12,
  //   close: 22,
  // },

  fri: {
    open: 11,
    close: 23,
  },

  // [`day-${4+2}`]: {
  //   open: 11,
  //   close: 23,
  // },

  sat: {
    open: 0, // Open 24 hours
    close: 24,
  },
};


const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  // ES5 version
  // openingHours:openingHours,

  // ES6 enhanced object literal
  // openingHours,

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },

  //Destructuring array function
  // ES6 version of writing a function inside an object
  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  //Destructuring object passes as arguments
  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 0,
    time = '20:00',
    address,
  }) {
    console.log(`Order received! ${this.starterMenu[starterIndex]} and
     ${this.mainMenu[mainIndex]} will be deliverd to ${address} at ${time}`);
  },
  //Function for spread operator
  orderPasta: function (ing1, ing2, ing3) {
    console.log(`Here is your delicious pasta with
  ${ing1}, ${ing2} and ${ing3}`);
  },

  // Function for rest operator
  orderPizza: function (mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },
};


/* 
///////////////////////////////////////
// String Methods Practice

const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// 🔴 Delayed Departure from FAO to TXL (11h25)
//              Arrival from BRU to FAO (11h45)
//   🔴 Delayed Arrival from HEL to FAO (12h05)
//            Departure from FAO to LIS (12h30)


const getCode = str => str.slice(0,3).toUpperCase();
for(const flight of flights.split('+')){
 const[type, from, to, time] = flight.split(';');
 const output = `${type.startsWith('_Delayed') ? '🔴' : ''}${type.replaceAll('_', ' ')} from ${getCode(from)} to ${getCode(to)} (${time.replace(':', 'h')})`.padStart('45', ' ');
 console.log(output);
}
 */



///////////////////////////////////
// Coding Challenge #4
/* 
Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.

The input will come from a textarea inserted into the DOM (see code below), and conversion will happen when the button is pressed.

THIS TEST DATA (pasted to textarea)
underscore_case
 first_name
Some_Variable 
  calculate_AGE
delayed_departure

SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
underscoreCase      ✅
firstName           ✅✅
someVariable        ✅✅✅
calculateAge        ✅✅✅✅
delayedDeparture    ✅✅✅✅✅

HINT 1: Remember which character defines a new line in the textarea 😉
HINT 2: The solution only needs to work for a variable made out of 2 words, like a_b
HINT 3: Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 😉
HINT 4: This challenge is difficult on purpose, so start watching the solution in case you're stuck. Then pause and continue!

Afterwards, test with your own test data!

GOOD LUCK 😀

*/


/* 

// Coding Challenge #4 Solution
document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

document.querySelector('button').addEventListener('click', function(){
  const text = document.querySelector('textarea').value;
  const rows = text.split('\n');
  
  for(const [i, row] of rows.entries()){
   const[first, second ] =  row.toLowerCase().trim().split('_');
  const output = `${first}${second.replace(second[0],second[0].toUpperCase())}`;

  console.log(`${output.padEnd(20)}${'✅'.repeat(i+1)}`);
  }
})

 */
 



/* 
////////////////////////////////////////////
// Working With Srtings-Part 3

// Split and join of an strings
console.log('a+every+nice+string'.split('+'));  //OOTPUT: ['a', 'every', 'nice', 'string']
console.log('Jonas/Schmedtmann'.split('/'));  //OOTPUT: ['Jonas', 'Schmedtmann']

const [firstName, lastName] = 'Jonas Schmedtmann'.split(' ');

const newName = ['Mr.', firstName, lastName.toUpperCase()].join(' ');
console.log(newName);

const capitalizeName = function(name){
const names = name.split(' ')
const namesUpper = []
for (const n of names){
  // namesUpper.push(n[0].toUpperCase() + n.slice(1));
  namesUpper.push(n.replace(n[0], n[0].toUpperCase()));  // another approach of the above line
}

// console.log(namesUpper.join(''));   // will join the string without any space   Eg: jessicaandsmithdavis
console.log(namesUpper.join(' '));   // will join the string with space            Eg: jessica and smith davis
}

capitalizeName('jessica and smith davis');
capitalizeName('hameed and shahid khan');

// Padding in strings (padStart(),  padEnd())
const message = 'Go to gate 23!';
console.log(message.padStart(20, '+').padEnd(30, '+'));
console.log('Jonas'.padStart(20, '+').padEnd(30, '+'));

const maskCreditCard = function(number){
  const str = number + '';
  const last = str.slice(-4);
  return last.padStart(str.length, '*')
}

console.log(maskCreditCard(8765978789));
console.log(maskCreditCard(346488387678978789));
console.log(maskCreditCard('3327573532536577877'));



// Repeat a string
const message2 = 'Bad weather... All Departures Delayed... ';
console.log(message2.repeat(5));

const planesInLine = function(n){
  console.log(`There are ${n} planes in line ${'✈️'.repeat(n)}`);
}

planesInLine (5);
planesInLine (3);
planesInLine (12);
 */





/* 
////////////////////////////////////////////
// Working With Srtings-Part 2

const airLine = 'TAP Air Portugal';

console.log(airLine.toLowerCase());
console.log(airLine.toUpperCase());
console.log('jonas'.toUpperCase());

// fix Capitalization in name
const passenger = 'jOnAs'  // Expected Output: Jonas
const passengerLower = passenger.toLocaleLowerCase();
const passengerCorrect = passengerLower[0].toUpperCase() + passengerLower.slice(1);
console.log(passengerCorrect);

// Function to fix Capitalization in name
const passengerNameCheck = function(passengerName){
  const passengerLower = passengerName.toLocaleLowerCase();
  const passengerCorrect = passengerLower[0].toUpperCase() + passengerLower.slice(1);
  return passengerCorrect;
}
console.log(passengerNameCheck('haMEed'));

// Comparing emails
const email = 'hello@jonas.io';
const loginEmail = '  Hello@Jonas.Io \n';

// const lowerEmail = loginEmail.toLowerCase();
// const trimedEmail = lowerEmail.trim();

const normalizedEmail = loginEmail.toLowerCase().trim();
console.log(normalizedEmail);
console.log(email === normalizedEmail);


// Function for Comparing emails
const compareEmail = function(email, loginEmail){
const normalizedEmail = loginEmail.toLowerCase().trim();
return email === normalizedEmail ? 'Valid Email' : 'Invalid Email';
  
}
const correctEmail = compareEmail('hello@jonas.io', '  Hello@Jonas.Io \n');
console.log(correctEmail);

// replacing a string
const priceGB = '288,97£';
const priceUS = priceGB.replace('£', '$').replace(',', '.');
console.log(priceUS);

// replacing a entre word of a string
const announcment = 'All passenger come to boarding door 23. Boarding door 23';
console.log(announcment.replace('door', 'gate')); // replace only first 'door' with 'gate' but not the second 'door'
console.log(announcment.replaceAll('door', 'gate')); // introduced recently: replace all the elements at once.
console.log(announcment.replace(/door/g, 'gate')); // older version of js uesd this to replace all the elements at once, here 'g' stands for global and '/door/' known as regular expression.

// 3 string methods that returns boolean (include, startswith, endswith)
// whenever we need to take some decision based on the content of the string these 3 methods are very very helpful.
const plane = 'Airbus A320neo';
console.log(plane.includes('A320'));  // OOTPUT: true
console.log(plane.includes('Boeing')); // OOTPUT: false
console.log(plane.startsWith('Air'));  // OOTPUT: true

if(plane.startsWith('Airbus') && plane.endsWith('neo')){
  console.log('Part of the NEW Airbus family');
}

// Practice exercise for string
const  checkBaggage = function(items){
const baggage = items.toLowerCase();

if(baggage.includes('knif')||baggage.includes('gun')){
console.log('You are NOT allowed on board');
}
else{
  console.log('Welcome aboard');
}
}
checkBaggage('I have a laptop, some Food and a pocket Knife');
checkBaggage('Socks and camera');
checkBaggage('Got some snacks and a gun for protection');
 */




/* 
////////////////////////////////////////////
// Working With Srtings-Part 1
const airLine = 'TAP Air Portugal';
const plane = 'A230';
console.log(plane[0]);      // OOTPUT: A
console.log(plane[1]);     // OOTPUT: 2
console.log(plane[2]);    // OOTPUT: 3
console.log('B737'[0]);  // OOTPUT: B

console.log(airLine.length);  // OOTPUT: 16
console.log('B737'.length);  // OOTPUT: 4

console.log(airLine.indexOf('r'));  // OOTPUT: 6
console.log(airLine.lastIndexOf('r'));  // OOTPUT: 10
console.log(airLine.indexOf('Portugal'));  // OOTPUT: 8

console.log(airLine.slice(4));  // OOTPUT: Air Portuga
console.log(airLine.slice(4, 7));  // OOTPUT: Air

console.log(airLine.slice(0, airLine.indexOf(' ')));  // OOTPUT: TAP
console.log(airLine.slice(airLine.lastIndexOf(' ')+1));  // OOTPUT: Portugal

console.log(airLine.slice(-2));  // OOTPUT: al
console.log(airLine.slice(1, -1));  // OOTPUT: AP Air Portuga


const chechMiddleSeat = function(seat){
// B and E are middle seat
const s = seat.slice(-1);
console.log(s);
if ( s === 'B' || s === 'E' ) console.log('You Got The Middle Seat 😔');
else console.log('You Are Lucky 😍');
};

  chechMiddleSeat('11B');
  chechMiddleSeat('23C');
  chechMiddleSeat('3E');

console.log(new String('jonas'));
console.log(typeof new String('jonas'));  // OOTPUT: object

console.log(typeof new String('jonas').slice(1));  // OOTPUT: String
  
 */




/////////////////////////////////////////
// Coding Challenge #3

/* 
Let's continue with our football betting app! This time, we have a map with a log of the events that happened during the game. The values are the events themselves, and the keys are the minutes in which each event happened (a football game has 90 minutes plus some extra time).

1. Create an array 'events' of the different game events that happened (no duplicates)
2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
      [FIRST HALF] 17: ⚽️ GOAL

GOOD LUCK 😀
*/

const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);


/* 
//////////////////////////////////////
// Coding Challenge #3 Solution.
// 1.
// Solution 1.
const events= [...new Set(gameEvents.values())];
console.log(events);
// Solution 2.
const event2= [...gameEvents.values()];
const eventsUnique = [...new Set(event2)];
console.log(eventsUnique);

// 2.
 gameEvents.delete(64);

// 3.
console.log(`"An event happened, on average, every ${90/gameEvents.size} minutes"`);

const time = [...gameEvents.keys()].pop()    // pop() method delete and returns the last element of an array
console.log(time);
console.log(`"An event happened, on average, every ${time/gameEvents.size} minutes"`);


 // 4.
 // Solution 1.
 for(const [min, value] of gameEvents){        // whether we use only 'gameEvents' or gameEvents.enteries() after 'of' of the  for-of loop both are the same.
   const half = min<=45 ? 'FIRST' :'SECOND';
   console.log(`[${half} Half] ${min} :${value}`);
 }
 // Solution 4.
 for(const [key, value] of gameEvents.entries()){             // whether we use only 'gameEvents' or gameEvents.enteries() after 'of' of the  for-of loop both are the same.
    if(key<45) console.log(`[FIRST HALF] ${key} : ${value}`);
    else console.log(`[SECOND Half] ${key} : ${value}`);
 }
 */





/* 
//////////////////////////////////////////////
// Maps: Iterration
const question = new Map([
  ['question', 'What is the best programming language in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'Javascript'],
  ['correct', 3],
  [true, 'Correct 😍'],
  [false, 'Try Again!'],
]);
console.log(question);

// Convert Object to Map
console.log(Object.entries(openingHours));
const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap);


// Quiz app
console.log(question.get('question'));
for(const [key, value] of question){
  if(typeof key=== 'number') console.log(`Answer ${key} : ${value}`);
}

// const answer = Number(prompt('Your answer'));
const answer = 3;
console.log(answer);

 console.log(question.get(answer===question.get('correct') ) );
// for(const item of question){

// }

// Convert map back to an array
console.log([...question]);
// console.log([...question.entries()]);   // Output: same as just its above line
console.log([...question.keys()]);
console.log(question.values());
 */





/* 
///////////////////////////////////////////////
// Maps: Fundamentals
const rest = new Map();
rest.set('name', 'Classico Italiano');
rest.set(1, 'Firenze, Italy');
console.log(rest.set(2, 'Lisbon, Portugal'));

rest
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are open :D')
  .set(false, 'We are closed :(')

  console.log(rest.get('name')); // to read data from a Map.
  console.log(rest.get(true)); // console.log(rest.get('true'))  we can not write 'true' in string it will return undefined because its a bolean data type.
  console.log(rest.get(1));   // console.log(rest.get('1'))      we can not write '1' in string it will return undefined because its a number data type.
  // Note: the data type of the keys matter while reading the data from a Map.
  const time = 8;
  console.log(rest.get(time> rest.get('open') && time< rest.get('close')));

  console.log(rest.has('categories'));
  rest.delete(2);
  // rest.clear();

  const arr = [1, 2];
  rest.set(arr, 'Test')
  rest.set(document.querySelector('h1'), 'Heading');
  console.log(rest);
  console.log(rest.size);
  
  console.log(rest.get(arr)); 

  */

/* 
///////////////////////////////////////////////////
// Sets
const ordersSet = new Set([
  'Pasta', 
  'Pizza', 
  'Pizza',
  'Risotto', 
  'Pasta',
  'Pizza',
]);
console.log(ordersSet);

console.log(new Set('Jonas'));

console.log(ordersSet.size);
console.log(ordersSet.has('Pizza'));
console.log(ordersSet.has('Bread'));
ordersSet.add('Garlic Bread');
ordersSet.add('Garlic Bread');
ordersSet.delete('Risotto')
// ordersSet.clear();
console.log(ordersSet);

for(const order of ordersSet) console.log(order);


//Example
const staff = ['Waiter', 'Chef', 'Waiter', 'Maneger', 'Chef', 'Waiter'];
// const staffUnique = new Set(staff)
const staffUnique= [...new Set(staff)]; // we can use spread operator with sets like any other iterable
console.log(staffUnique);

console.log(new Set( ['Waiter', 'Chef', 'Waiter', 'Maneger', 'Chef', 'Waiter']).size);  // To find the different Position, or number of unique values present in an Array.

console.log(new Set('HameedKhan').size); // To see how many different letters are present in a string.

 */





/* 
//////////////////////////////////////
// Coading Chalenge #2 Data
const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};


/////////////////////////////////////////////
// Coading Chalenge #2 Solution
 // 1
 for(const [goal=1, playerName] of game.scored.entries()){
  console.log(`Goal ${goal+1} : ${playerName}`);
 }

 // 2
const odds = Object.values(game.odds);
let average = 0;
for(const odd of odds) {
average+=odd;
 }
average/= odds.length;
console.log(average);

 // 3
for( const [team, odd] of Object.entries(game.odds)){
  const teamStr = team === 'x' ? 'Draw' : `Victory ${game[team]}`;  // Having Doubts in this line 
  console.log(`Odd of ${teamStr} ${odd}`);
} 

*/






///////////////////////////////////////////////
// Looping Objects : Object Keys ( Object property Name ), Values ( Object property Value ), And Enteries ( Entire Object)

// Looping Object Property NAMES 
const properties = Object.keys(openingHours);
console.log(properties);
let openStr = `we are open on ${properties.length} days : `;

for (const day of properties) {
    openStr += `${day},`
}
console.log(openStr);

// for (const day of Object.keys(openingHours)) {
//   console.log(day);
// }

// Looping Object Property VALUES
const values = Object.values(openingHours);
console.log(values);


// looping Entire Object
const entries = Object.entries(openingHours);
console.log(entries);

for( const entry of entries){
  console.log(entry);
}

// [Key, value] destructuring   NOTE: we can do object destructuring inside an array destructuring like we did below
for( const [key, {open,close}] of entries){
  console.log(`on ${key} we open at ${open} and close at ${close}`);
}






/* 
////////////////////////////////////////////////
// Optional Chaining

// without optional chaining
if(restaurant.openingHours && restaurant.openingHours.mon)
console.log(restaurant.openingHours.mon.open);

// console.log(restaurant.openingHours.mon.open); // OUTPUT: Error 

// With optional chaining
console.log(restaurant.openingHours.mon?.open);
console.log(restaurant.openingHours?.mon?.open);

// Example
const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun' ]
for(const day of days){
 console.log(day);
restaurant.openingHours[day];

// NOTE:
// restaurant.openingHours.day (we can not write like this because 'day' is not the actual property name of the object, 
// if we wnat to use a varibale name as the property name we needs to use the square bracket notation, so restaurant.openingHourse[day] is the correct way )
 
//const open = (restaurant.openingHours[day]?.open || 'Closed');  // It will not work if the value of 'open' is ( 0 or '' ) therefore use nullish coalescing operator ( ?? )
const open = (restaurant.openingHours[day]?.open ?? 'Closed');
console.log(`on ${day}, we open at ${open}`); 
}

if(restaurant.openingHours.fri)
console.log(restaurant.openingHours.fri.open);


// // Optional chaining on methods
console.log(restaurant.order?.(0, 1) ?? 'Method does not exist');
console.log(restaurant.orderRisotto?.(0,1) ?? 'Method does not exist');

// // Optional Chaining on arrays
//const users = [{ name: 'Jonas', Email: 'hellojonas.io' }];
const users = [];
 console.log(users[0]?.name ?? 'User array empty');
 
// without optional chaining
if(users.length >0) console.log(users[0].name);
else console.log('User array empty');

 */





/* 
/////////////////////////////////////////////
// The for-of loop
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
for(let i=0; i<menu.length; i++)
console.log(menu[i]);

 for(const item of menu) console.log(item);

 for(const item of menu.entries()){
  console.log(`${item[0]+2}: ${item[1]}`);
 }

for(const [i, el] of menu.entries()){   // Didn't understood
console.log(`${i+1}: ${el}}`); // Didn't understood
}
//  // Hint
// const[item] = menu.entries();
// const[i, el] = item;
// console.log(`${i}: ${el}`);

console.log([...menu.entries()]);
 */



//------------------------------- Lecture 13 ---------------------------------------

/*
///////////////////////////////////////////
// Coading Chalenge #1 Data 
const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};



/////////////////////////////////////////////
// Coading Chalenge #1 Solution
// 1.
const[players1, players2] = game.players;
console.log(players1, players2);

// 2.
const [goalkeeper, ...fieldPlayers] = players1;
console.log(goalkeeper, fieldPlayers);

// 3.
const allPlayers = [...players1, ...players2];
console.log(allPlayers);

// 4.
const playersFinal = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
console.log(playersFinal);

// 5.
const { odds:{team1, x:draw, team2} } = game;
console.log(team1, draw, team2);

// 6.
const printGoals = function (...players){
   console.log(`${players.length} goals were scored by ${players}`);
   console.log(` ${players[0]} Scored ${players.length-3} goal`);
}

printGoals('dravis', 'miller', 'Lewandowski', 'Kimmich' );
printGoals('dravis', 'miller');
printGoals(...game.scored);  // spread operator

// 7.
team1<team2 && console.log(' Team 1 is more likely to win');
team1>team2 && console.log(' Team 2 is more likely to win');
 */





/* 
///////////////////////////////////////////
// Logical Assignment Operator ( || , && and ?? )
const rest1 = {
  name: 'Capri',
  // numGuests: 20,
  numGuests: 0,
};

const rest2 = {
  name: 'La Piazza',
  Owner: 'Giovanni Rossi',
};

// Logical Or assignment operator
rest1.numGuests = rest1.numGuests || 10;
rest2.numGuests = rest2.numGuests || 10;
rest1.numGuests ||= 10;  // Same as above 
rest2.numGuests ||= 10;

// Logical nullish assignment operator     Nullish: null and undefined (NOT 0 or '')
rest1.numGuests ??= 10;
rest2.numGuests ??= 10;

// // Logical && assignment operator
rest1.Owner = rest1.Owner && '<ANONYMOUS>';
rest2.Owner = rest2.Owner && '<ANONYMOUS>';
rest1.Owner &&='<ANONYMOUS>';
rest2.Owner &&= '<ANONYMOUS>';

console.log(rest1);
console.log(rest2);
*/




/* 
//////////////////////////////////////////
// The Nullish Coalescing Operator
restaurant.numGuests = 0;
const guests = restaurant.numGuests || 10;
console.log(guests);
 
// Nullish: null and undefined (NOT 0 or '')
const guestsCorrect = restaurant.numGuests ?? 10;
console.log(guestsCorrect);
 */




/* 
//////////////////////////////////////////
// Short Circuiting ( && and || )

console.log('------ OR ------');
// Use ANY data type, return any data type, do short-circuiting
console.log(3 || 'jonas'); // OUTPUT: 3
console.log('' || 'jonas'); // OUTPUT: jonas
console.log(true || 0); // OUTPUT: true
console.log(undefined || null); // OUTPUT: null

console.log(undefined || 0 || '' || "Hello" ||23 || null); // OUTPUT: Hello

restaurant.numGuests = 0;
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1);

const guests2 = restaurant.numGuests || 10;
console.log(guests2);

console.log('------ And -------');
console.log(0 && 'Jonas'); // OUTPUT: 0
console.log(7 && 'Jonas'); // OUTPUT: Jonas
console.log('Hello' && 23 && null && 'Jonas' ); // OUTPUT: null

 // Practical example
if(restaurant.orderPizza) {
  restaurant.orderPizza('mushrooms', 'spinach')
}

restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'spinach');
*/
 




/* 
////////////////////////////////////////////////
// Rest pattern and parameters
// 1) Destructuring

// SPREAD, because on RIGHT side of =
const arr = [1, 2, ...[3,4]];
console.log(arr);


// Rest operator in array
// REST, because on LEFT side of =
const [a, b, ...others] = [1, 2, 3, 4, 5 ];
console.log(a, b, others);

const[pizza, , risotto, ...otherFood] = [...restaurant.mainMenu, restaurant.starterMenu]
console.log(pizza, risotto, otherFood);

// Rest operator in Objects
const{sat, ...weekDays} = restaurant.openingHours;
console.log(weekDays);

// 2) Function
const add = function(...numbers){     // called as rest parameters 
  let sum = 0;
  for(let i=0; i<numbers.length; i++) // i should always be less than array size in condition.  Eg: i<numbers.length   But Not: i<=numbers.length  or i>=numbers.length
  sum+=numbers[i];
  console.log(sum);
}

add(2, 3);
add(5, 3, 7, 2);
add(8, 2, 5, 3, 2, 1, 4); 

// in javasrcipt number + undefined = NaN ( not a number )
const arr1 = [1,2,3];
console.log(arr1[3]);  // OUTPUT: undefined ( because we are logging the size of the array i.e 3, but the max index of the array is 2 )

const x = [23, 5, 7];
add(...x); // spread operator

// Reast Operator as functions Arguments
restaurant.orderPizza('mushrooms', 'onion', 'olives', 'spinach'); // called as rest arguments
restaurant.orderPizza('mushrooms');
 */




/* 
///////////////////////////////////////////////////
// The Spread Operator (...)
const arr = [7, 8, 9];
const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
console.log(badNewArr);

const newArr = [1, 2, ...arr];
console.log(newArr);

console.log(...newArr);
console.log(1, 2, 7, 8, 9);

const newMenu = [...restaurant.mainMenu, 'Gnocci'];
console.log(newMenu);

// Copy an array
const mainMenuCopy = [...restaurant.mainMenu];

// Join 2 arrays or more
const menu = [...restaurant.mainMenu, ...restaurant.starterMenu];
console.log(menu);

const str = 'jonas';
const letters = [...str, ' ', 'S.']
console.log(letters);
console.log(...str);
//console.log(`${...str} Schmedtmann`); //will through error


// Real world example of spread operator
const ingredients = [
// prompt('Let\'s make pasta! ingredient 1?'),
// prompt('ingredient 2?'),prompt('ingredient 3?')
];
console.log(ingredients);

restaurant.orderPasta(ingredients[0], ingredients[1], ingredients[2]);
restaurant.orderPasta(...ingredients);


// Object
const newRestaurant = {foundedIn: 1998, ...restaurant, founder:'Guiseppe'}
console.log(newRestaurant);

const restaurantCopy = {...restaurant};
restaurantCopy.name = 'Ristorante Roma';
console.log(restaurantCopy.name);
console.log(restaurant.name); 

 */




/* 
///////////////////////////////////////////////////
// Destructuring Object

const{name, openingHours, categories} = restaurant;
console.log(name, openingHours, categories);

// Renaming variable
const {
  name:restaurantName, 
  openingHours:hours, 
  categories:category
  } = restaurant;
console.log(restaurantName, hours, category);

// Default values
const {menu = [], starterMenu:starter = []} = restaurant;
console.log(menu, starter);

// Mutating(changing) variables value
let a = 111;
let b = 999;
const obj = {a:23, b:7, c:14};
({a, b} = obj);
console.log(a, b);

// Nested object
const{fri:{open:o, close:c}} = restaurant.openingHours;
console.log(o, c);


// Passing object as parameters
restaurant.orderDelivery({
  time: '22:30',
  address: 'Via del Sole 21',
  mainIndex:2,
  starterIndex:2,
});

restaurant.orderDelivery(
  {
    address: 'Via del Sole 21',
    starterIndex:1,
  }) 
*/
  





/* 
///////////////////////////////////////////////////
// Destructuring Arrays
const arr=[2,3,4];

// Old way
const a = arr[0];
const b = arr[1];
const c = arr[2];

// ES6 way
const[x,y,z]= arr;
console.log(x, y, z);
console.log(arr);

let [main, ,secondary]=restaurant.categories;
console.log(main,secondary);

// Switching variables
// old way
const temp=main;
main=secondary;
secondary=temp;
console.log(main,secondary);

// ES6 way
[main, secondary]=[secondary, main]
console.log(main,secondary);


// Recrive 2 return values from a function
const [starter, mainCourse]=restaurant.order(2,0);
console.log(starter,mainCourse);


// Nested destructuring
const nested = [2, 4, [5,6]];
// const [i, ,j] = nested;
const [i, ,[j, k]] = nested;
console.log(i,j,k);


// Default values
const[p=1, q=1, r=1]=[8, 9];
console.log(p, q, r);
 
 */