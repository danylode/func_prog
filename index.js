let map = func => array => array.map(func);
let reduce = (func, iniValue) => array => array.reduce(func, iniValue);
let filter = predicate => array => array.filter(predicate);


let and = (func1, func2) => value => func1(value) && func2(value);
let or = (func1, func2) => value => func1(value) || func2(value);


let hasColor = color => value => value.color == color;

let flow = (...funcs) => value => funcs.reduce((res, fn) => fn(res), value);
let combine = (...funcs) => value => funcs.reduceRight((res, fn) => fn(res), value);


let rectangles = [{ color: 'Red', height: 8, width: 5 },
{ color: 'Black', height: 5, width: 5 }, 
{ color: 'Yellow', height: 10, width: 5 }, 
{ color: 'Black', height: 10, width: 5 },
{ color: 'Red', height: 2, width: 2 }]

//Flow 1
let isBlack = hasColor('Black');

function calcArray(r) {
    return r.height * r.width;
}

let max = (a, b) => Math.max(a, b);

function maxBlackArray(rectangles) {
    return flow(
        filter(isBlack),
        map(calcArray),
        reduce(max, 0)
    )(rectangles);
}

//Flow 2
let isRed = hasColor('Red');

function calcPerimeter(r) {
    return (r.width + r.height) * 2;
}

let sum = (a,b) => a + b;

function sumRedPerimeter(rectangles){
    return flow(
        filter(isRed),
        map(calcPerimeter),
        reduce(sum, 0)
    )(rectangles);
}

console.log("Max array: " + maxBlackArray(rectangles) + "\nSum red perimeter: " + sumRedPerimeter(rectangles));