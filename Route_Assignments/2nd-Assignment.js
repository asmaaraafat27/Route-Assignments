/*1. Write a function that uses a `for` loop to print numbers from 1 to 10. 
If the number is divisible by 3, skip printing the number.*/

function printNumbers()
{
    let arr =[];
    for(let x = 1; x<=10; x++)
    {
        if(x%3 != 0)
        {
            arr.push(x);
        }
    }
    return arr;
}
console.log(printNumbers());

//----------------------------------------------------------------------------------------------------
/*2. Write a function that uses a `while` loop to calculate the sum of numbers from 1 to 100.*/

function calcNumbers()
{
    let x =1, sum =0;
    while(x <= 100)
    {
        sum +=x;
        x++;
    }
    return sum;
}
console.log(calcNumbers());

//----------------------------------------------------------------------------------------------------
/*3. Implement a function using `forEach` to iterate over an array and print each element.*/

function printAllNumbers()
{
    let numbers = [1,2,3,4,5], printNumbers = [];
    numbers.forEach(i => {
        printNumbers.push(i);
    });
    return printNumbers;
}
console.log(printAllNumbers());

//----------------------------------------------------------------------------------------------------
/*4. Explain the difference between `forEach` and `for...of` loops in JavaScript.*/

1- a. [for...each Syntax] --> arrayName.foreach(element, index, array (optional) => {code statement});
b. [for...of Syntax] --> for(element of iterable){code statement};
2- The for...of loop is used to iterate over arrays, strings, and other iterable objects,
while forEach can only be used to iterate over arrays.
3- The for...of loop allows the use of break and continue statements to control the loop, 
whereas forEach does not support these statements and always returns undefined.
4- forEach passes three arguments to its callback (the current element, the index, and the array itself),
whereas for...of only provides the current element by default.

//----------------------------------------------------------------------------------------------------
/*5. Write a function that destructures an object to extract values and returns a formatted
string.*/

const person = {name :"John", age : 25};
function formatPerson({name, age})
{
    return `'${name} is ${age} years old'`;
}
console.log(formatPerson(person));

//----------------------------------------------------------------------------------------------------
/*6. Use the spread operator to merge two arrays, then return the merged array.*/

let arr1 =[1,2,3], arr2 =[4,5,6];
console.log([...arr1, ...arr2]);

//----------------------------------------------------------------------------------------------------
/*7. Write a function that accepts multiple parameters (two or more) and returns their sum.*/

function sumNumbers(...numbers)
{
    return(numbers.reduce((total, num)=>total+num, 0));
}
console.log(sumNumbers(3,4));
console.log(sumNumbers(4,4,4));
console.log(sumNumbers(5,10,15,20));
*
//----------------------------------------------------------------------------------------------------
/*8. Compare primitive and non-primitive data types in JavaScript with examples.*/

Primitive data types are basic data types that hold a single value, such as String, Number, Boolean, Null, Undefined, BigInt, and Symbol. 
They are immutable, meaning their values cannot be changed once created.When assigned or passed,
they are passed by value (a copy of the value is used).

Non-primitive data types, also known as reference types, can hold collections of values or represent complex entities. 
They are mutable, meaning their properties or elements can be changed without creating a new value. Examples include Arrays, Objects,
Functions, and other types derived from the Object type. Non-primitives are passed by reference, meaning they refer to the same memory location.

//----------------------------------------------------------------------------------------------------
/*9. Explain how hoisting works in JavaScript and describe the Temporal Dead Zone (TDZ).*/

Hoisting is a mechanism where variable and function declarations are moved to the top of their containing scope during the compilation phase.
Variable Declarations: Variables declared with var are hoisted and initialized with undefined. Variables declared with let and const are 
also hoisted but cannot be accessed until their declaration is reached.
Function Declarations: Fully hoisted, meaning both the function name and its body are accessible before their definition in the code.

The Temporal Dead Zone refers to the period from the start of the block until a let or const variable is declared.
Accessing a let or const variable before its declaration results in a ReferenceError for let and for const the code will not run (error).

//----------------------------------------------------------------------------------------------------
/*10. Write a function that demonstrates closure by creating a counter function that returns the number of times it has been called.*/

function parent() {
    let cnt = 0;
    function child() {
        cnt++;
        console.log(cnt);
    }
    return child; 
}
const counter = parent();
counter(); 
counter();
counter();

//----------------------------------------------------------------------------------------------------
/*11. Create a function that returns a promise which resolves after 3 seconds with a 'Success' message.*/

function getSuccess()
{
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Success");
        }, 3000); 
    });
}
getSuccess().then((message) => {
    console.log(message); 
});

//----------------------------------------------------------------------------------------------------
/*12. Convert the previous promise-based function to use `async` and `await`.*/

function getSuccess() 
{
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Success");
        }, 3000); 
    });
}
async function getSuccessMessage() {
    const message = await getSuccess();
    console.log(message); 
}
getSuccessMessage();

//----------------------------------------------------------------------------------------------------
/*13. Create a function that returns a promise, which resolves if a random number is greater than 5, otherwise it rejects.*/

function checkRandomNumber() 
{
    return new Promise((resolve, reject) => {
        const randomNumber = Math.floor(Math.random() * 10) + 1;
        console.log("Random Number:", randomNumber);
        if (randomNumber > 5)
        {
            resolve("Success: Number is greater than 5");
        } 
        else 
        {
            reject("Error: Number is 5 or less");
        }
    });
}
checkRandomNumber()
    .then((message) => {
        console.log(message); 
    })
    .catch((error) => {
        console.error(error);
    });

//----------------------------------------------------------------------------------------------------
/*14. Implement a function that chains multiple .then() handlers to a promise to demonstrate promise chaining.*/

function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(10); 
        }, 1000);
    });
}
fetchData()
    .then((result) => {
        console.log("First handler:", result);
        return result * 2; 
    })
    .then((result) => {
        console.log("Second handler:", result); 
        return result + 5; 
    })
    .then((result) => {
        console.log("Third handler:", result); 
        return result / 5;
    })
    .then((result) => {
        console.log("Final handler:", result);
    })
    .catch((error) => {
        console.error("Error encountered:", error);
    });

//----------------------------------------------------------------------------------------------------
/*15. Implement a function that handles errors using `try...catch` in an asynchronous operation.*/

async function fetchData() {
    try {
        const response = await Promise.reject("Error: Data fetch failed");
        console.log("Data received:", response);
    } catch (error) {
        console.error(error);
    }
}
fetchData();

//----------------------------------------------------------------------------------------------------