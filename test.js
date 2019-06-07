
// function promise1() {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve('11111');
//         }, 2000)

//     })
// }
// function promise2() {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve('22222');
//         }, 2000)
//     })
// }


// function test() {
//     promise1().then(data1 => console.log('test:', data1))


// }

// let result = test()



let arr = [ { "name": "long1", "age": "21" } , { "name2": "long", "age": "21" } ];
let arr1 = arr.map(elemnent => {
    console.log(elemnent)
    let parsed = JSON.parse(elemnent);
    cosnoel.log('parsed', parsed)
});
// console.log(arr1);