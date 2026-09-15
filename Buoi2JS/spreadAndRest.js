
// spread la Gop
const mang1 = [1,2];
const mang2 = [3,4];

const mang12 = [...mang1, ...mang2];

console.log(mang12)

// gop obj

const userGoc = {name: "cu", age : "19"};

const userMoi = {...userGoc, class: "24T_DT2"};
console.log(userMoi); // {...,...,...}


// rest: dung de gom nhung thu muon lay

const user = {
  name: "cu",
  age: 19,
  street: "362 nguyen luong bang, hoa khanh",
  mssv : 102240072
};

const {street, ...gomthongtinconlai} = user;

console.log(gomthongtinconlai);

// Nhận nhiều số cùng lúc

const tinhTong = (...Cacso) =>{
  return Cacso.reduce((tong, sothuI) => tong + sothuI, 0); // 0 la gia tri khoi dau
}

console.log(tinhTong(1,2,3,4,5));


