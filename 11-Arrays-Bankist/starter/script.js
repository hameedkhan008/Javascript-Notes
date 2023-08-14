'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
// const labelLogin = document.querySelector('.login')
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// BANKIST APP PROJECT
//////////////////////////////////////////////
// Displaying Movements
const displayMovements = function(movements, sort = false){
containerMovements.innerHTML = '';  // (the 'innerHTML' here is a little bit similar to 'textContent' , so remember that , now the difference is that  'textContent' simply returns the text itself while 'innerHTML' return everything including the HTML, so all the HTML tags will be included, ok? but here we are using 'innerHTML' as a Setter so just like we also used t'extContent' equal empty string or equal something else, remember? we used in our pig game like whatever.textContent = 0;), we can also use this to read data
//////////////////.textContent = 0;

const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;


// movements.forEach(function(mov, i)
   movs.forEach(function(mov, i){
   const type = mov > 0 ? 'deposit' : 'withdrawal'
   const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
          <div class="movements__value">${mov}Є</div>
        </div>
      `;

      containerMovements.insertAdjacentHTML('afterbegin', html)  // here if we use 'beforeend' the each new element would simply be added after the previous element, so at the end of the container and that's after all the child elements that are already in there, and if we use the 'afterbegin' then it will reverse the whole things.
      // here 'insertAdjacentHTML method' is used to insert any html elements or tags on a particular position in ( the 'web page' or in a particular conatainer etc. ) here we placed the html elements in 'containerMovements' conatiner.
    });
};
// displayMovements(account1.movements);
// console.log(containerMovements.innerHTML);



/////////////////////////////////////////////////
// Calculating Balance
const calcDisplayBalance = function(acc){
  acc.balance = acc.movements.reduce(function(acc, mov){
// acc.balance = balance; // lets remember why all of this works , so why we can set this ( acc.balance ) property here on ( acc ) account object that we receive and it will then set that to the objects [account1, account2, account3, account4] that we have here, well and the reason is that once again all of these different references do actually points to the exact same objects in the 'memory heap' OK?  So when we acces any of the 'accounts object' here so down in the 'login function' we created a 'currentAccount variable' and this ofcourse not really a copy of the object itself, it is simply another variable which points to the same so to the 'original object' in the 'memory heap' OK? So the 'currentAccount object' again is exactly one of these objects [account1, account2, account3, account4]; they are the exact same object they simply have different name. 
// suppose we pass 'account1 object' in the 'calcDisplayBalance function'  but then it will be called as 'currentAccount' in the 'login function' and it will be called as 'acc' in the 'Callbach function' of 'calcDisplayBalance function' but these all three actualy points to the same object which is 'object1'. we can simply say that 'object1' is known as different name on different places
return acc + mov;
  }, 0);

  labelBalance.textContent = `${ acc.balance}Є`;
};
// calcDisplayBalance(account1.movements);


/////////////////////////////////////////
// Creation Username
const creatUsernames = function(accts){
  accts.forEach(function(acc){
  acc.username = acc.owner.toLowerCase().split(' ').map(name => name[0] ).join('');
  })
};
creatUsernames(accounts);
// console.log(accounts);



////////////////////////////////////////
// Calculating Summery Balance
const calcDisplaySummary = function(acc){
  const incomes = acc.movements.filter(mov => mov > 0 )
  .reduce((acc, mov) => acc + mov, 0);

  labelSumIn.textContent = `${incomes}Є`;


  const out = acc.movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}Є`;


  const interest = acc.movements.filter(mov => mov > 0).map(deposit => (deposit * acc.interestRate) / 100)
  .filter((int, i , arr) => {
    // console.log(arr);
    return int >= 1;
  })
  .reduce((acc, int, i, arr) => acc + int, 0);
  labelSumInterest.textContent = `${interest}Є`;
};
// calcDisplaySummary(account1.movements);



//////////////////////////////////////////////////////
// Update UI
const updateUI = function(acc){
  
   // Display movements
   displayMovements(acc.movements);

   // Display balance
  calcDisplayBalance(acc);

   // Display summery
   calcDisplaySummary(acc);
    console.log('LOGIN');  
}



///////////////////////////////////////////////////
// Event handler
let currentAccount;
btnLogin.addEventListener('click', function(e){
// prevent form from submitting
e.preventDefault();


  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
  console.log(currentAccount);
  if(currentAccount?.pin === Number(inputLoginPin.value)){
   // Display UI and a welcome messege
   labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;
   containerApp.style.opacity = 100;

   // Clear input fields after login
  //  labelLogin.innerHTML = '';
  inputLoginUsername.value = inputLoginPin.value = '';

  // remove focus from loginPin field after login
  inputLoginPin.blur();

  // Update UI
  updateUI(currentAccount);
  }
});



/////////////////////////////////////////////
// Balance Transfer
btnTransfer.addEventListener('click', function(e){
  e.preventDefault();
  const amount =  Number(inputTransferAmount.value);
  const recieverAcc = accounts.find(acc => acc.username === inputTransferTo.value)

  inputTransferAmount.value = inputTransferTo.value = '';
  // console.log(amount, recieverAcc);

if(amount > 0 && 
  recieverAcc &&
  currentAccount.balance >= amount && 
  recieverAcc.username !== currentAccount.username){
    
  // Doing the transfer
  currentAccount.movements.push(-amount);
  recieverAcc.movements.push(amount);
 
  // Update UI
  updateUI(currentAccount);

  // console.log('transfer Valid');
}

});



/////////////////////////////////////////////////
// Request Bank Loan
btnLoan.addEventListener('click', function(e){
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if(amount > 0 && currentAccount.movements.some(mov => mov >= amount/10)){
   
  // Add movements
  currentAccount.movements.push(amount);
  updateUI(currentAccount);
  }
  
  inputLoanAmount.value = "";
})



//////////////////////////////////////////////////
// Closing Accounts
btnClose.addEventListener('click', function(e){
  e.preventDefault();

  console.log('delete');

  if(currentAccount.username === inputCloseUsername.value && currentAccount.pin === Number(inputClosePin.value)){
    const index = accounts.findIndex(acc =>acc.username === currentAccount.username); // you might notice that 'findIndex method' is actually similar to the 'indexOf() method' that we studied before, so indexOf(23) , Now the big difference is that with 'indexOf()' we can only search for value that is in the array, so if the array contains the '23' then its true and if not then it's false but on the other hand with 'findIndex() method' we can create a 'complex condition' like we did here and ofcourse it doesn't have to be the equality operator here it can be anything that returns true or false OK?  
    console.log(index);                                                              // both the 'find()' and the 'findIndex() methods' get access to also the 'current index' and the current 'entire array', so as always besides the 'current element' these other two values are also available but in practice i never found these useful and second both the 'find()' and the 'findIndex() methods' were added to javascript in ES6 and so they will not work in like super old browsers.
    // indexOf(23);

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;

  }

  inputCloseUsername.value  = inputClosePin.value = '';
})



////////////////////////////////////////////////
// Sorting The Movements
let sorted = false;
btnSort.addEventListener('click', function(e){
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted)
  sorted = !sorted;
  // console.log(sorted);
})


/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// ------------------------------ Lecture 18 -------------------------------------
/* 
/////////////////////////////////////////////////
// Simple Array Methods
let arr = ['a', 'b', 'c', 'd', 'e'];
// // SLICE Method
// Slice method does not change or mutate or affect the original array
// console.log(arr.slice(2));           // OUTPUT: ['c', 'd', 'e']
// console.log(arr.slice(2, 4));       // OUTPUT: ['c', 'd']    ( the length of the array will be the endIndex-startIndex )
// console.log(arr.slice(-2));        // OUTPUT: ['d', 'e']
// console.log(arr.slice(-1));       // OUTPUT: ['e']           ( nice trick to get the last element of an array ) 
// console.log(arr.slice(1, -2));   // OUTPUT: ['b', 'c']
// console.log(arr.slice());       // OUTPUT: ['a', 'b', 'c', 'd', 'e']  ( creates a shallow copy of an array )
// console.log([...arr]);         // OUTPUT: ['a', 'b', 'c', 'd', 'e']   ( also creates a shallow copy of an array but by using spread operator )
// should you use the spread operator or the slice method in order to create a shallow copy of an array, that's actually entirely up to you, so it's just a matter of personal preference, the only time you really need to use the slice method here is when you want to chain multiple method together so calling one after the other and we will do that ofcourse later in this section. 


// SPLICE Method
// Splice method does change or mutate or affect the original array
// console.log(arr.splice(2)); // OUTPUT: ['c', 'd', 'e']
// console.log(arr);  //  OUTPUT: ['a', 'b']
// arr.splice(-1);
// console.log(arr);   // OUTPUT: ['a', 'b', 'c', 'd']
// arr.splice(1, 2)    // here the first parameter ( 1 ) works the same as in the slice method but the second parameter ( 2 ) is really the number of elements that we wnat to delete.
// console.log(arr);  // OUTPUT: ['a', 'd']
// in practice most of the time the value that the splice method returns doesn't even interest us, all we are usually interested in is to just delete one or more elements from an array using 'splice method', and one pretty common use case is to simply remove the last element of an array.


// REVERSE Method
// Reverse method does change or mutate or affect the original array
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
// console.log(arr2.reverse()); // OUTPUT: ['f', 'g', 'h', 'i', 'j']
// console.log(arr2);          // OUTPUT: ['f', 'g', 'h', 'i', 'j']

// CONCAT Method
// Concat method does not change or mutate or affect the original array
const letters = arr.concat(arr2);  // so here the first array will be the one on which the method is called ( 'arr' in this case ) and the second one is the one that we pass into the 'concat method' ( 'arr2' in this case ).
console.log(letters);             // OUTPUT: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
// the above same thing by using 'spread operator' ( is also does not change or mutate the original array )
//console.log([...arr, ...arr2]);  // OUTPUT: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
// we can use any of the above its perfectly fine, it's just a matter of personal preference.

// JOIN Method
//Reverse method does change or mutate or affect the original array
console.log(letters.join(' - '));
console.log(letters);
 */



/* 
//////////////////////////////////////////////////////
// The New At Method ( introduced in ES2022 )
// older method 
const arr = [23, 11, 64];
console.log(arr[0]);   // OUTPUT: 23

// by using 'at method' ( introduced in ES2022 )
console.log(arr.at(0));   // OUTPUT: 23 ( so basically now we do what we say here, here we say array at position '0' and so that's why this new method is called array dot at position zero. )

// getting the last element
console.log(arr[arr.length-1]);  // OUTPUT: 64
console.log(arr.slice(-1)[0]);  // OUTPUT: 64

// by using 'at method'
console.log(arr.at(-1));      // OUTPUT: 64 ( most of the time the thing that we are most interested in here is (-1) to get the last element of the array, now the only question is should you use this new 'at method' or should you keep using the 'bracket notaion' , well as always it depends, so if you want to get the last element of an array or basically start counting from the end of an array then you should probably start using the 'at method' also if you want to do something called method chaining then the 'at method' is also perfect for that so basically combining multiple methods all at the same time and then its quite helpful to use the 'at method' instead of the 'bracket notation' )
console.log(arr.at(-2));     // OUTPUT: 11  ( on the other hand if you just want to quikly get a value from an array so just like the first element then ofcourse you can keep using the brackets notation )

// we can also use 'at method' on strings
console.log('jonas'.at(0));   // OUTPUT: j
console.log('jonas'.at(-1)); // OUTPUT: s
 */




/* 
///////////////////////////////////////////////////////////
// Looping Arrays: Foreach method

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// using for of loop
// console.log([...movements.entries()]);
// for ( const movement of movements){
  for ( const [index, movement] of movements.entries()){
  if(movement > 0){
   console.log(` Movement ${index+1}: You deposited ${movement}`);
  }
  else{
    console.log(` Movement ${index+1}: You withdraw ${Math.abs(movement)}`);  // 'Math.abs() method' removes minus or plus sign of any number.
  }
}

// using forEach method
console.log('------FOREACH------');
movements.forEach(function( movement, index, array){    // forEach method actually requires a 'Calback function' here, so 'forEach' is technically a 'higher Order Function' as we learned in the last section which requires a 'Callback function' in order to tell it what to do, so its the 'forEach method' here that will call the 'Calback method' we are not calling it ourselves as always.
//order of the above parametres:(curr ele)(curr index) (entire array)
// in 'for-of loop' the order is like (the first value is 'current array index' the second value is the 'current array element') so just don't forget that.
// here fortunatelty its a lot easier to get access to the 'current index', So to understnad how it works we need to remember once more that it is the 'forEach method' who calls the 'Callback function' in each iteration and as it calls the 'Callback function' it also passes in the 'current element' of the array but actually that's not all it passes in, infact forEach passes in the 'current element' the 'index' and the 'entire array' that we are looping, so therefore we can specify them in the parameter list as we did above, now ofcourse we can just use one like we have been doing or we can just use two or we can use all three together and as always the name in parameter list does not matter at all but what does matter is the OEDER And it is ( Current Element then Current Index and then Entire Array.) because that's the order in which the arguments so the actual values are passed into our 'Callback function'

// so again each time this Callback function here is called so in each iteration it will receive the current element of the array as an argument, and here ofcourse we can give any name that we want but here i am just calling it movement what we call it in 'for of loop'
// so in this case we tell forEach method that in each iteration it should logg one of the below two strings here to the console. So we give the forEach method instructions by giving it a 'Callback function' which contains these instructions.

// console.log(movement, index, array);
if(movement > 0){
  console.log(` Movement ${index+1}: You deposited ${movement}`);
 }
 else{
   console.log(` Movement ${index+1}: You withdraw ${Math.abs(movement)}`);  // 'Math.abs() method' removes minus or plus sign of any number.
 }                               
  })

   // So basically behind the scenes in iteration zero ( 0 ) it will call the 'Calback function' here, so an anonymous function in this case without a name. Eg: below
  // 0: function(200)
 // 1: function(450)
// 2: function(-400)   and so on and so forth until it reaches the end of the array and this part of the 'forEach function' passing in the current element of the array is especially important to understand.

// ( so basically this exactly the concept that i explained in last section when i said that we uesd a 'Callback function' to tell another 'higher order function' exactly what it should do.
// the 'forEach' method is considered as cleaner , easier to write and easier to read as compared to 'for of loop'.
  */



/* 
/////////////////////////////////////////////////////////
// forEach for Maps
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function(mapvalue, mapkey, entiremap){
      // Order: ( Curr Map value ) then ( Curr Map key ) then ( Entire Map )
      // here the Order of the parameters are similar to Array
      
      // console.log(mapvalue, mapkey, entiremap);
      console.log(`${mapkey}: ${mapvalue}`);
})


// forEach for Sets
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);
// currenciesUnique.forEach(function(value, key, map){  // in 'Sets' the 'key' is exactly the same as the 'value' , So why is that? well 'Sets' does not have 'keys' and it does not have 'Indexes' either and so there is no value that would make sense for the 'key', all right?
currenciesUnique.forEach(function(value, _, map){    // So essentially the 'key' here makes no snse at all it wouldn't even have to be there and so the people who designed this 'forEach method' for 'Sets' they could have simply omitted the second argument. right? well if they did that then this 'forEach' would have been different from the others and so that would then create confusion in developers and therefore it was decided to keep the same signature so basically to keep the same three parameters in the 'Callback function' and simply to set the second one to the first one , so we can just write ( value, _(throughaway variable), map ) just to avoid confusion. 
// '_' underscore in javascript means throughaway variable, so that means a variable that is completely unnecessary, so its just a convention which we will see again a little bit later.
//console.log(value, _, map); 
console.log(`${value}: ${_}`);
})
 */



/* 
// Coding Challnge #1
// Test Data
const dogsJulia1 = [3, 5, 2, 12, 7]
const dogsJulia2 = [9, 16, 6, 8, 3]
const dogsKate1 = [4, 1, 15, 8, 3]
const dogsKate2 = [10, 5, 6, 1, 4]

const checkDogs = function(dogsJulia, dogsKate){
  const dogsJuliaCorrected = dogsJulia.slice();
  dogsJuliaCorrected.splice(0, 1);
  dogsJuliaCorrected.splice(-2);
  // we can also do the above same thing as
 // dogsJulia.slice(1, 3) or dogsJulia.slice(1, -2);
 const dogs = dogsJuliaCorrected.concat(dogsKate)
dogs.forEach(function(dogAge, dogInd){
  const ageCheck = dogAge>=3 ? `Dog number ${dogInd +1} is an adult, and is ${dogAge} years old `: `Dog number ${dogInd+1} is still a puppy 🐶`;
  console.log(ageCheck);
});

};

// checkDogs(dogsJulia1, dogsKate1);
checkDogs( [9, 16, 6, 8, 3], [10, 5, 6, 1, 4] );
 */




////////////////////////////////////////////////
// Data Transformation: Map, Filter, Reduce methods

/* 
//////////////////////////////////////////////////////
// The Map Method
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const eurToUsd = 1.1;

// const movementsUSD = movements.map(function(mov){  // since we know that the 'Map method' will return a brand new array and hence we can store it into a 'variable' as we did here.    
//   return mov * eurToUsd;   
// })

// the above code using Arrow function
const movementsUSD = movements.map(mov => mov * eurToUsd);  // we could have written this using 'for-of loop' here and it doesn't look too bad either but its a completely different philosophy, So here in the 'Map method' we use a 'function' to solve a problem of creating a new array while in 'for-of loop' we simply loop over one array and then manually create a new one, so these are completely different philosophies or we can also say paradigms, so 'Map method' is more inline with functional programming. 
console.log(movements);   // The 'Map method' does not mutate or change the original array at all.
console.log(movementsUSD);


// the above code using for-of loop
const movementUSDFor = [];
for (const mov of movements){   
  movementUSDFor.push(  mov * eurToUsd);
}
console.log(movementUSDFor);

const movementsDescription = movements.map((mov, index) =>   // its a good idea to keep in mind why we actually get access to these two parameters here, So one more time all we do here to pass the 'Callback function' into the 'Map method'. right? but we do not call the 'Callback function' by ourselves it is the 'Map method' who will call this function for each of the array elements in the movements array. OK? now each time that the 'Map method' calls or Callback it it will simply pass in the 'current array element' as well as the 'current index' and the 'whole array' and of three here we are only using the first two, just the 'current element' and 'current index'. all right?
// now you could say that what we did here with this 'Map method' is essentially the same as what we did with the 'forEach method' but infact there is a big big difference between these two approaches so, before we printed each line individually to the console as we were looping over the array, so in each of the iterations we performed some action that was then visible in the console and we call this a 'SIDE EFFECT', 'forEach method' creates side effects, but Now here with this 'Map method' all we did was to return each of the strings from the 'Callback' and so basically they got added into a new array and then finally we logged that entire array to the console and not the elements one by one and so here in this 'Map method' we did not create a 'Side Effect' in each of the iteration, all we did was to build a brand new array, and this idea of 'Side Effects' will become important as we talk more about functional programming. Great and this how the 'Map method' work.
  `Movement ${index+1}: ${ mov > 0  ? 'deposited' : 'withdraw'} ${Math.abs(mov)}`

  // if(mov > 0){
  //   return (` Movement ${index+1}: You deposited ${mov}`);
  //  }
  //  else{
  //    return (` Movement ${index+1}: You withdraw ${Math.abs(mov)}`); 
  //  }
);
console.log(movementsDescription);
 */



/* 
//////////////////////////////////////////////////////////////
// The Filter Method
// filtering the positve element of an array and create a new array of positive element 
const deposits = movements.filter(function(mov, index, entireArray){   // just like other 'Callback function' like in 'Map' and 'forEach'  'filter method' also gets access to the 'current array elemen't as well as the 'current index' and the 'entire array'.
return mov > 0;                          // the 'index' and 'entireArray' parametrs in 'filter method' are hardly used we generally use the current element in practical.

})
console.log(movements);
console.log(deposits);


// he above code using for-of loop
const depositsFor = []
for(const mov of movements) if(mov > 0) depositsFor.push(mov);
console.log(depositsFor);

// filtering the negative element of an array and create a new array of negative element 
const withdrawls = movements.filter(function(mov){  // why not just we use the for-of loop for everything, now the reason for that is again the push that exists in javaScript for using more functional code like this , there's also a more practical implication here abd that's because we can actually chain all of these methods togather so basically use them all one after another to build a big final result and that is completly impossible with for-of loop.
return mov < 0;
});
console.log(withdrawls);

// he above code using for-of loop
const withdrawlsFor = []
for(const mov of movements) if(mov < 0) withdrawlsFor.push(mov);
console.log(withdrawlsFor);
 */




/* 
///////////////////////////////////////////////////////////
// The Reduce Method
// Calculating Sum
// const balance = movements.reduce(function(acc, mov, index, arr){  // here accumulator is like snowball
// console.log(`Iteration ${index}: ${acc}`);
// return acc + mov;
// }, 0);
// console.log(balance);

// the above code using arrow function
const balance = movements.reduce((acc, mov) => acc + mov , 0); // here accumulator is like snowball
  console.log(balance);

// The above code using for-of loop
let balance2 = 0;
for(const mov of movements) balance2 += mov;
console.log(balance2);   

// Calculating Maximum value
const max = movements.reduce(function(acc, mov){
if (acc > mov) return acc;
else return mov;
}, movements[0])
console.log(max); 
*/
 


/*
///////////////////////////////////////////////////////////////
// Coding Challnge #2
const calcAverageHuman = function(ages){
  const humanAges = ages.map(function(age){
   if (age <= 2){
    return age * 2;
   }
   else
   return 16 + age * 4;
  })
  console.log(humanAges);

  const adults= humanAges.filter(function(age){
   return age >= 18;
  });
  console.log(adults);

  const average = adults.reduce(function(acc, age){
    return acc + age;
  }, 0) / adults.length;
  
  return average
}
const avg1 = calcAverageHuman([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAverageHuman ([16, 6, 10, 5, 6, 1, 4]);
console.log(avg1, avg2); 


// The above Solution using Arraow function
const calcAverageHuman = function(ages){
  const humanAges = ages.map( age => age <= 2 ?age * 2 : 16 + age * 4);
  console.log(humanAges);

  const adults= humanAges.filter (age => age >= 18);
  console.log(adults);

  // const average = adults.reduce((acc, age) => acc + age , 0) / adults.length;
  const average = adults.reduce((acc, age, i, arr) => acc + age/arr.length , 0);
   // 2 3 (2+3)/2 = 2.5 === 2/2 + 3/2 = 2.5
  return average

};
const avg1 = calcAverageHuman([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAverageHuman ([16, 6, 10, 5, 6, 1, 4]);
console.log(avg1, avg2);

// TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
// TEST DATA 1: [16, 6, 10,  5, 6, 1, 4]
*/



/* 
//////////////////////////////////////////////////////////
//  The Magic Of Chaining Methods
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const eurToUsd = 1.1;
console.log(movements);
// const  totalDepositsUSD  = movements.filter(function(mov){   // 
//   return mov > 0;
// }).map(function(mov){
//   return mov * eurToUsd;
// }).reduce(function(acc, mov){
//   return acc + mov;
// }, 0);
// console.log( totalDepositsUSD );

 // we could ofcourse chained many other methods here as well as long as they return new arrays, so 'Filter' returns a new array so we could have added something else here or the same goes for the 'Map' but 'Reduce' for example will return a value so only the number in this case and so ofcourse here we could now not have chained a 'Map' or a 'Filter' after this , so we can only chain a method after another one if the first one returns an array.
// So you can imagine all of this as a sort of pipeline that processess our data so we put data in at the begining and then it goes through all these steps, in this case Filter, Map And Reduce  and then in the end our input data comes out processed on the other side of the pipeline.


// The above code using Arrow function
// PIPELINE
const totalDepositsUSD = movements
.filter(mov => mov > 0) 
//.map(mov => mov * eurToUsd)
.map((mov, i, arr) => {
  // console.log(arr);
  return mov * eurToUsd 
})
.reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositsUSD);
// .filter(mov => mov < 0)  // Now when we chain all these methods togather here it can be a little bit hard to debug if one of the results is not what we expect , and wouldn't really know from which step of this 'Pipeline' it would come from, ok ? and to solve this it would be good to check out the array in each of different steps, Lets say we did a mistake in 'Filter method' and we wrote ( mov < 0 ) instead of ( mov > 0 ) and so our result would come out negative and that would be strange so in this case probably be like to know the result of the 'Filter operation' and so we can do that by using the array parameter that we get access to in this Callback function.
// and so again if we  want to see that result of only the 'Filter operation' we can check out the 'current array' in the next array method that is chanied on that filetr which is 'Map' in this case and so this is one of the great use case of having access to this 'current array' because the array of the 'Map method' has to be the result of the previous operation which is 'Filter method' in this case and it is not the initial movements because that's not what we called the 'Map method' on. Right? the 'Map method' was called on the result of 'movements.filter' and therefore that is the value of the 'entire array' of the 'Map method' 
// REMARKS ABOUT CHAINING : (i) we should not overuse chaining so we should try to optimize it because chaining tons of methods one after the other can cause a real performance issues if we have really huge arrays, So if we have a huge chain of methods chained one after the other we should try to compress all the functionality that they do into as little methods as possible, for example sometime we create way more 'Map method' than we actually need where we could do it all in 'Map' call, So when you chain methods like this keep looking for opportunities of keeping up your code's performance.
                            (ii) it is a bad practice in javascript to chain methods that 'mutate' the underlying 'original array' and an example of that is the 'Splice method' so again you should not chain a method like the 'Splice' or the 'reverse method', i mean you can do that and for a small application like our Bankist Application its not a big deal and its not going to cause problems but in a large scale application its usually always a good practice to avoid mutating arrays
*/



/* 
// Coding Challnge #3
// The above dog age problem using Arrow function and Chaining
const calcAverageHuman = ages =>
ages
  .map( age => age <= 2 ?age * 2 : 16 + age * 4)
  .filter (age => age >= 18)
  .reduce((acc, age, i, arr) => acc + age/arr.length , 0);
                                      // adults.length is not possible here because the adults variable does not exist here therefore we should always use 'arr' parameters from the current method.
   // 2 3 (2+3)/2 = 2.5 === 2/2 + 3/2 = 2.5
  
const avg1 = calcAverageHuman([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAverageHuman ([16, 6, 10, 5, 6, 1, 4]);
console.log(avg1, avg2); 
*/



/* 
//////////////////////////////////////////////////////
// The Find Method 
const firstWithdrawl = movements.find(mov => mov < 0 );  // just like other methods that we have been talking about the 'find method' also accepts a 'condition' and just like the other 'array methods' we have been talking about the 'find method' also accepts a Calback function which will then be called as the method loops over the array. all Right? so 'find' is basically just another method that loops over the array but then it does something different and in this case what the 'find method' does is to retrieve an element of the array, so as always the current element of the iteration is the movement and then we specify a condition. So lets say ( mov < 0 ) so basically this is here a withdrawal  right? so a negative movement.
console.log(movements);                                // so you see that just like the 'filter method' the 'find method' also needs a 'Callback function' that returns a boolean so the result of this is ofcourse either true of false.
console.log(firstWithdrawl);                          // now unlike the 'filter method' the 'find method'  will actually not return a 'new array' but it will only return the 'first element' in the array that satisfies the given condition, So basically in other words the first element in the array for which this operation here ( movements.find(mov => mov <0 ); )becomes true and so basically this here will return the first withdrawal

// So as you see the 'find method' is a bit similar to the 'filter method' but there are two fundamental differences (i): 'filter method' returns all the elements that match the condition while the 'find method' only returns the first one (ii): the 'filter method' returns a new array while the 'find method' returns the elements itself and not an array, OK?   
// So usually the goal of the find method method is to just find exactly one element and therefore we usually setup a condition where only one element can satisfy that condition and so that's why we used the === equal operator here OK? so if the 'owner names' are unique then this equall operator here will only ever match one account with the name. 
// console.log(accounts);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);


// // the above code using for-of loop
// for(const account of accounts){
//   if(account.owner === 'Jessica Davis') {
//     console.log(account);
//   }
// } 

*/
 


/* 
/////////////////////////////////////////////////
//The Findindex Method 

//the 'findindex method' works almost the same way as the 'find method' but as the name says 'findindex' Returns the 'index' of the 'found element' and not the element itself.

const index = accounts.findIndex(acc =>acc.username === account1.username); // you might notice that 'findIndex method' is actually similar to the 'indexOf() method' that we studied before, so indexOf(23) , Now the big difference is that with 'indexOf()' we can only search for value that is in the array, so if the array contains the '23' then its true and if not then it's false but on the other hand with 'findIndex() method' we can create a 'complex condition' like we did here and ofcourse it doesn't have to be the equality operator here it can be anything that returns true or false OK?  
console.log(index); 

// IMPORTANT TO NOTE
// const account = accounts.findIndex(acc => acc.owner === 'Jessica Davis');
// console.log(account); // NOTE : This will not work like 'find method', because 'findindex method' Returns only  the 'index' of the 'found element' and not the element itself.
    
*/



/* 
//////////////////////////////////////////////////
// SOME METHOD
console.log(movements);

// this only test the equality ( or exact match )
console.log(movements.includes(-130)); // OUTPUT: true ( we can use the 'includes() methode' to test if an array includes a certain value, now however we can only really test for equality, so basically 'includes()' here returns 'true' if any value in the array is exactly equal to minus ( -130 ) and so again this is essentially testing for equality but what if we wanted to test for a 'condition' instead and that's where the 'some() method' comes into play. ) 

// here we can specify a condition
console.log(movements.some(mov => mov === -130));  // OUTPUT: true 

// const anyDeposits = movements.some(mov => mov > 0);  // if there is any value for which this condition is true then the 'some method'  will return 'true' all right?
// console.log(anyDeposits);  // OUTPUT: true ( )


const anyDeposits = movements.some(mov => mov > 5000);
console.log(anyDeposits);  // OUTPUT: false
*/



/* 
/////////////////////////////////////////////
// EVERY METHOD
console.log(movements.every(mov => mov > 0)); // OUTPUT: false  ( the 'every() method' is pretty similar to the 'some() method but you might guess the difference between them is that 'every method' only returns true if all of the elements in the array satisfy the condition that we passed in, So in other words if every element passes the test in our 'Callback function' only then the every method returns 'true' and that's why the method is called every in the first place. )
console.log(account4.movements.every(mov => mov > 0));  // OUTPUT: true


// Up untill this point we have always written the Callback function directly as an argument into our array methods, Right?  However we could also write this function separately and then pass the function as a Callback. 
// there is no reason for them to being directly written in all the array methods, we could simply write them like below and now we can reuse the same function for all kinds of different methods that require Callback with a true false condition, so that could be every() or filter() or some() or any other array methods  

// Separate Callback
const deposit = mov => mov >= 0;
console.log(movements.every(deposit));
console.log(movements.some(deposit));
console.log(movements.filter(deposit));
*/



/* 
/////////////////////////////////////////
// Flat And FlatMap Method ( introduced in ES 2019 )
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat());  // OUTPUT: [1, 2, 3, 4, 5, 6, 7, 8]

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat(2)); // here 2 in the arguments represent the two level of nesting and if we have to put 2 or 3 lavel of nested array into another array then we will have to pass the arguments accordingly. however if we only use 'flat() method' without passing any arguments then it will only be useful for single level of nested array.

const accountMovements = accounts.map(acc => acc.movements);
console.log(accountMovements);

const allMovements = accountMovements.flat();
console.log(allMovements);

const overallBalance = allMovements.reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance);


// The above code using chaining 
// flat method
const overallBalance1= accounts
.map(acc => acc.movements)
.flat()  // it turns out that using 'map' first and then flattening the result is a pretty common operation so that's exactly what we have here, so first we 'map' and then we 'flat' that result, so that's exactly what we have here, And so to solve this there another method that was also introduced at the same time which is 'flatMap method' and so 'flatMap' essentially combines a 'map' and a 'flat' method into just one method which is better for performance, all Right?
.reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance1); 


// flatMap method
const overallBalance2= accounts
.flatMap(acc => acc.movements) // so this is essentially a 'Map method' and all it does is in the end it then flattens the result, Now just notice that 'flatMap' here only goes 'one level deep' and we can not change it, So if you do need to go deeper than just one level you still need to use the 'flat method'. 

.reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance2); 
 */



/* 
/////////////////////////////////////////////////////////////
// SORTING  ( sorting is a much disscused topic in computer science and there are countless algorithms and methods of sorting values and we might actually talk about this a little bit later in the course for now though we are simply going to use javascript built-in sort method )

// For Strings
const owners = ['Jonas', 'Zac', 'Adam', 'Martha'];
console.log(owners.sort()); //OUTPUT: ['Adam', 'Jonas', 'Martha', 'Zac']  ( sort() method mutate the original array )
console.log(owners);       //OUTPUT: ['Adam', 'Jonas', 'Martha', 'Zac']


// For Numbers
console.log(movements);         // OUTPUT: [200, 450, -400, 3000, -650, -130, 70, 1300]
// console.log(movements.sort()); // OUTPUT: [-130, -400, -650, 1300, 200, 3000, 450, 70]  ( the 'sort() method' does the sorting based on strings, so basically what it does is to convert everything to strings and then it does the sorting itself, so again if they were strings then this result would make sense but they are not strings and so we have to fix this. and infact we can fix this by passing-in a compare 'Callback function' into the 'sort() method' )
                                       // the minus sign here always comes first


// if we return < 0 then 'a' will be before 'b' ( it keeps the order as it is )
// if we return > 0 then 'b' will be before 'a' ( it switch the order )
// Ascending Order
movements.sort((a, b) =>{    // the 'a' and 'b' parameters here are essentially the 'current value' and the 'next value' respectively if we imagine the 'sort() method' looping over the array.
if(a > b) return 1;
if(b > a) return -1;
}); 
console.log(movements);

// the simplified version of the above code 
movements.sort((a, b) => a - b ); // we already know that if ( a > b ) then this will be a positive number and so here then we return that positive number it doesn't have to be exactly 1 just something 'greater than zero' and if ( a < b ) then this operation will always be a negative number and so therefore then something negative is returned just as -1 but it can be any negative number, and by the if we return 'zero' here so in case 'a' and 'b' are same then there position simply remains unchanged.             
console.log(movements);



// Descending Order
movements.sort((a, b) =>{      // this will also work for the strings in the same way
  if(a > b) return -1;
  if(b > a) return 1;
  }); 
  console.log(movements);

// the simplified version of the above code 
 movements.sort((a, b) => b - a ); // we already know that if ( a > b ) then this will be a positive number and so here then we return that positive number it doesn't have to be exactly 1 just something 'greater than zero' and if ( a < b ) then this operation will always be a negative number and so therefore then something negative is returned just as -1 but it can be any negative number, and by the if we return 'zero' here so in case 'a' and 'b' are same then there position simply remains unchanged.             
console.log(movements);
// and this is basically most you need to know about 'SORTING ARRAYS' with 'numbers', Now if you have a mixed array like with strings and numbers togather then this is not going to work and i advise you to simply not use the 'sort() method' in these cases anyway and that's because there is not really a point in doing so. 
*/



<<<<<<< HEAD
/* 
=======
>>>>>>> ae95e15b2513a89f436cd55c3b88866c1bd6f75b
////////////////////////////////////////////////////
// More Ways Of Creating And Filling  Arrays
const arr = [1, 2, 3, 4, 5, 6, 7];
console.log(new Array(1, 2, 3, 4, 5, 6, 7));

// Empty Arrays + fill() Method
const x = new Array(7);
console.log(x); // OUTPUT: [empty × 7] 
console.log(x.map( ()=>5)); // OUTPUT: [empty × 7] 

// The 'fill() method' mutate the original array
 x.fill(1);      // OUTPUT:[1, 1, 1, 1, 1, 1, 1]
// x.fill(1, 3);   // OUTPUT:[empty × 3, 1, 1, 1, 1]
x.fill(1, 3, 5);  // OUTPUT:[empty × 3, 1, 1, empty × 2]
console.log(x);  

arr.fill(23, 4, 6); // OUTPUT:[1, 2, 3, 4, 23, 23, 7]
console.log(arr);

// Array.from 
const y = Array.from({length: 7}, () => 1);
console.log(y);

const z = Array.from({length:7}, (_, i) => i + 1 )
console.log(z);
<<<<<<< HEAD
 */
const movementsUI = Array.from(document.querySelectorAll('.movements__value'));
console.log(movementsUI);

// labelBalance.addEventListener('click', function(){
  
// const movementsUI = Array.from(document.querySelectorAll('.movements__value'));
// console.log(movementsUI);

// })
 
=======

// const movementsUI = Array.from(document.querySelectorAll('.movements__value'));
// console.log(movementsUI);

labelBalance.addEventListener('click', function(){
  
const movementsUI = Array.from(document.querySelectorAll('.movements__value'));
console.log(movementsUI);

})
>>>>>>> ae95e15b2513a89f436cd55c3b88866c1bd6f75b





<<<<<<< HEAD












// // Generating 100 Random Dice Roll Using Array.from()
// const randomDice = Array.from({length:100}, () =>  Math.floor((Math.random() * 6) + 1))
// console.log(randomDice);
// 
=======
>>>>>>> ae95e15b2513a89f436cd55c3b88866c1bd6f75b




















