//------------------------1----------------------------//

function calcSum(num1,num2){
    return num1+ num2;
}
console.log(calcSum(5,3));

//-------------------------2---------------------------//

function isPrime(num)
{
    for(let i = 2; i<=Math.sqrt(num); i++)
    {
        if(num % i === 0)
        {
            return false;
        }
    }
    return true;
}
console.log(isPrime(7));

//--------------------------3--------------------------//


function reverseString(originalStr)
{
    let reversedStr1="";
    reversedStr1 = originalStr.split('').reverse().join('');
    return reversedStr1;
}
console.log(reverseString("hello"));

//--------------------------4--------------------------//

function findMaxNum(arr)
{
    max_num=0;
    for(let i =0; i<arr.length-1; i++)
    {
        if(arr[i] > max_num)
        {
            max_num = arr[i]; 
        }
    }
    return max_num;
}
console.log(findMaxNum([1, 3, 7, 2, 4]));

//--------------------------5--------------------------//

function evenNum(arr)
{
    let arrEven = [];
    for(let i =0; i<arr.length; i++)
    {
        if(arr[i] % 2 === 0)
        {
            arrEven.push(arr[i]);
        }
    }
    return arrEven;
}
console.log(evenNum([1, 2, 3, 4, 5, 6]));

//--------------------------6--------------------------//

function reverseString(originalStr)
{
    let reversedStr="";
    for(let i = originalStr.length-1; i>=0; i--)
    {
        reversedStr += originalStr[i];
    }
    return reversedStr;
}
console.log(reverseString("route"));

//--------------------------7--------------------------//

function avgNum(arr)
{
    let sumNum = 0;
    for(let i =0; i<arr.length; i++)
    {
        sumNum += arr[i];
    }
    return (sumNum/arr.length);
}
console.log(avgNum([1, 2, 3, 4, 5]));

//--------------------------8--------------------------//

function determineDay(num)
{
    if(num === 6 || num === 7)
    {
        return "Weekend";
    }
    else
    {
        return "Weekday";
    }
}
console.log(determineDay(1));
console.log(determineDay(7));

//--------------------------9--------------------------//

function filterByTwoOrThree(arr)
{
    let filteredNums = [];
    for(let i =0; i<arr.length; i++)
    {
        if(arr[i] % 2 === 0 || arr[i] % 3 === 0)
        {
            filteredNums.push(arr[i]);
        }
    }
    return filteredNums;
}
console.log(filterByTwoOrThree([1, 2, 3, 4, 5, 6, 7, 8, 9]));

//--------------------------10--------------------------//

function findElement(arr, num)
{
    let indexNum = -1;
    for(let i =0; i<arr.length; i++)
    {
        if(num === arr[i])
        {
            indexNum = i;
        }
    }
    return indexNum;
}
console.log(findElement([1, 2, 3, 4, 5], 3));
console.log(findElement([1, 2, 3, 4, 5], 10));

//--------------------------11--------------------------//

function calcFatorial(num)
{
    let factorialOfNum =1;
    for(let i =1; i<=num; i++)
    {
        factorialOfNum *= i;
    }
    return factorialOfNum;
}
console.log(calcFatorial(5));

//--------------------------12--------------------------//

let getObjectKeys = function(obj)
{
    return Object.keys(obj);
}
console.log(getObjectKeys({name:"John", age:30}));

//--------------------------13--------------------------//

function getUniqueNum(arr)
{
    let uniqueNums = [];
    for(let i = 0; i<arr.length; i++)
    {
        if(arr[i] === arr[i+1])
        {
            i++;
        }
        else
        {
            uniqueNums.push(arr[i]);
        }
    }
    return uniqueNums;
}
console.log(getUniqueNum([1, 2, 2, 3, 4, 4, 5]));

//--------------------------14--------------------------//

function countCharacter(str)
{
    let charCount = {};
    for(let i = 0; i<str.length; i++)
    {
        let char = str[i]; 
        if(charCount[char])
        {
            charCount[char]++;
        }
        else
        {
            charCount[char] = 1;
        }
    }
    return charCount;
}
console.log(countCharacter("hello"));

//--------------------------15--------------------------//

function sortInAscOrder(arr)
{
    let sortedArr = arr.sort((a,b) => a-b);
    return sortedArr;
}
console.log(sortInAscOrder([5, 3, 8, 1, 2]));

//--------------------------16--------------------------//

function isAnagram(str1, str2)
{
    let sortedStr1 = str1.split('').sort().join('');
    let sortedStr2 = str2.split('').sort().join('');
    return sortedStr1 === sortedStr2;
}
console.log(isAnagram("listen", "silent"));

//--------------------------17--------------------------//

function removeFalsyValues(arr)
{
    return arr.filter(Boolean);
}
console.log(removeFalsyValues([0, false, "Hello", "", null, undefined, NaN, 42]));

//--------------------------18--------------------------//

function displayCarDetails(Model, Year)
{
    let car = {
        Model: Model,
        Year: Year,
        getDetails: function()
        {
            return `Model: ${this.Model}, Year: ${this.Year}`;
        }
    };
    return car.getDetails();
}
console.log(displayCarDetails("Toyota", 2020));

//--------------------------19--------------------------//

function isContainsProperty(obj, property)
{
    return property in obj;
}
console.log(isContainsProperty({name: "Alice", age: 25}, "name"));
console.log(isContainsProperty({name: "Alice", age: 25}, "address"));

//--------------------------20--------------------------//

function countNumOfVowels(str)
{
    let cnt = 0;
    for(let i =0; i<str.length; i++)
    {
        if(str[i] === "e" || str[i] === "a" || str[i] === "i" || str[i] === "u" || str[i] === "o" )
        {
            cnt++;
        }
    }
    return cnt;
}
console.log(countNumOfVowels("Hello World"));

//--------------------------21--------------------------//

function splitStrToArr(str)
{
    return str.split(' ');
}
console.log(splitStrToArr("The quick brown fox"));

//--------------------------22--------------------------//

function performMathOp(num1, num2, operator)
{
    switch(operator)
    {
      case "+": 
        return num1 + num2;
      case "-": 
         return num1 - num2;
      case "*": 
        return num1 * num2;
      case "/": 
        return  num2 == 0 ? "Can't do it" :  num1 / num2;
      default: 
        return "Invalid operator";
    }
}
console.log(performMathOp(5,3,"+"));
console.log(performMathOp(5,3,"%"));