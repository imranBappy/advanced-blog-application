
// fun()
// console.log(num);
// var num = 10;

// function fun() {
//     console.log("hello");
// }

function f1() {
    var num1 = 10;
    function f2() {
        return num1 + 10;
    }
    console.dir(f2);
}

f1()