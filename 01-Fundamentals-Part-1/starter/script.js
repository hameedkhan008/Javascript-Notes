'use strict';
/*
let massMark=78;
let heightMark=1.69;
const massJhon=91;
const heightJhon=1.90;
const BMIMark = massMark / heightMark ** 2;
const BMIJhon = massJhon / (heightJhon * heightJhon);
const markHigherBMI = BMIMark > BMIJhon;
//console.log(BMIMark, BMIJhon, markHigherBMI);
console.log(BMIMark, BMIJhon);
if (BMIMark>BMIJhon)
{
    console.log(`Mark's BMI (${BMIMark}) is geater than Jhon's BMI (${BMIJhon})`);
}
else
{
    console.log(`Jhon's BMI (${BMIJhon}) is geater than Mark's BMI (${BMIMark})`);
}

const inputYear = 1991;
console.log(inputYear.toString(), inputYear);
const private=40;
console.log(private);


//Function-------
function logger(){
    console.log('My name is hameed');
}
logger();
logger();
function fruitProcessor(apples, oranges){
    console.log(apples, oranges);
    const juice=`Juice with ${apples} apples and ${oranges} oranges.`;
    return juice;
}
const appleJuice=fruitProcessor(5, 0);
console.log(appleJuice);
console.log(fruitProcessor(5, 0));


const add = (a, b) => a+b;
const sum = add(20, 50);
console.log(sum);


const calcAverage=(a, b, c) => (a + b + c) / 3;

const avgDolphins=calcAverage(10,10,10);
const avgKoalas=calcAverage(20,20,20);
const checkWinner=(avgDolphins, avgKoalas)=>{
    if(avgDolphins>=2*avgKoalas) console.log("The Dolpins Team Won The Game");
    else if(avgKoalas>=2*avgDolphins) console.log("The Koalas Team Won The Game");
    else console.log("No one Won The Game");
}
checkWinner(avgDolphins, avgKoalas);
*/

////Arrays//
//const friends= ['Asad','Saqib', 'Shahid', 'Arif'];
//console.log(friends);
//const friend = new Array(Asad, Saqib, Shahid, Arif);
//console.log(friends[0]);
//console.log(friends.length);
//console.log(friends[friends.length-1]);
//friends[0]='hameed';
//console.log(friends);
//const popped=friends.shift()
//console.log(friends);
//console.log(popped);
// const mark = {
//     fullName: 'Mark Miller',
//     mass: 78,
//     height: 1.69,
//     calcBMI: function () {
//       this.bmi = this.mass / this.height ** 2;
//       return this.bmi;
//     }
//   };

//   const john = {
//     fullName: 'John Smith',
//     mass: 92,
//     height: 1.95,
//     calcBMI: function () {
//       this.bmi = this.mass / this.height ** 2;
//       return this.bmi;
//     }
//   };

// //   mark.calcBMI();
// //   john.calcBMI();

//   console.log(mark.bmi, john.bmi);
const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
const tips = [];
const total = [];
function calcTips(bills) {
  if (bills >= 50 && bills <= 300) return bills * 0.15;
  else return bills * 0.2;
}
for (let i = 0; i < bills.length; i++) {
  tips.push(calcTips(bills[i]));
}
console.log(tips);

for (let j = 0; j < bills.length; j++) {
  total.push(calcTips(bills[j]) + bills[j]);
}
console.log(total);

function calcAverage(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum / arr.length;
}

console.log(calcAverage([10, 10, 10]));
console.log(calcAverage(total));
