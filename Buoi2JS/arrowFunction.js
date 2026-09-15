// arrow function

// ham thong thuong

function tong(a,b){
  return a + b;
}

// ham arrow function

const sum = (a, b) => a + b;

console.log(tong(2, 3)); // 5
console.log(sum(2, 3)); // 5

// vd1

const getUserById = (id) => users.find(user => user.id === id);

// vd2

const dientichHCN = (a, b) => a * b;
//vd3
const cToF = (c) => c * 1.8 + 32;
//vd4

const sayHello = name => `xin chao ${name}`;

//vd5
const findMax = (a, b) => a > b ? a : b;

// vd6
const isEven = n => n % 2 === 0 ? true : false;

// vd7
const checkNumber = n => n > 0 ? "so duong" : n < 0 ? "so am" : "so 0";

// vd8

const tinhTienTaxi = km => {
  if (km <= 1) {
    return 15000;
  }
  else{
    return 15000 + (km - 1) * 12000;
  }
}
// vd9

const xepLoai = diem =>{
  if (diem >= 8){
    return "Gioi";
  }
  else if (diem >= 5){
    return "Kha";
  }
  else{
    return "Trung binh";
  }
}

const xepLoai2 = diem => diem >= 8 ? "Gioi" : diem >= 5 ? "Kha" : "Trung binh";

// vd10

const tinhGiaithua = n => {
  if(n === 0 || n === 1){
    return 1;
  }
  return n* tinhGiaithua(n-1);
}

// vd11
//c1
const taoUser = (id, name) => {
  const user = {
    userId : id,
    userName: name
  };

  return user;
}

const user = taoUser(102240072, "Vo Ngoc Cu");
console.log(user.userId, user.userName);


//c2 vs c3

const taoUser1 = (id, name) =>{
  return {
    userId: id,
    userName: name
  };
}

const taoUser2 = (id , name) => ({userId : id, userName: name});
