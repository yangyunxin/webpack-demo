var a = [1,2]
var b = [...a, 3]
console.log(b)
;(async function () {
    let c = await 2
    console.log(c)
})()

class Foo {}
const str = [1, 2, 3]
str.includes(2)

const s = new Set();

[2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x));

for (let i of s) {
  console.log(i);
}

function timeout(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms, 'done');
  });
}

timeout(100).then((value) => {
  console.log(value);
});