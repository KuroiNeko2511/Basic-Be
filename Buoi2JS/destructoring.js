const user = {
  name: "cu",
  age: 19,
  street: "362 nguyen luong bang, hoa khanh",
  mssv : 102240072
};

const {name, age, street, mssv} = user;

console.log(age);

// doi ten trong destructuring

const {name: hovaten, mssv: studentId}= user;

console.log(hovaten);

// gan them bien ben ngoai khi phan ra

const {name: hoten, phone = "0385394717", mssv: MS} = user;

console.log({hoten, phone, MS});


