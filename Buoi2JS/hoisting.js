// hoisting là viết trước khi khai báo biến, hàm

console.log(a); // undefined và ko bị lỗi làm sập code, chỉ dùng cho var
var a = 10;
console.log(a); // 10

// hoisting với function

console.log(sum(2, 3)); // 5

function sum(a,b) {
    return a + b;
};
