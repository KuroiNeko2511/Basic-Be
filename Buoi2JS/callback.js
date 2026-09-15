function hienThi(tong){
  console.log("tong la: " + tong);
}

function tinhTong(a, b, myCallback){
  let sum = a + b;
  myCallback(sum);
}

tinhTong(3,4, hienThi);

//b1

const numbers = [5, 12, 8, 130, 44];
const locso = numbers.filter(function(so){
  if(so > 10){
    return true;
  }
  return false;
})

console.log(locso);

const locso1 = numbers.filter(so => so > 10);

//b2
const names = ["alice", "BOB", "charlie"];

const viethoa = names.map(function(name){
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
})

const viethoa1 = names.map(name => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase());


//b3

const prices = [10, 20, 30, 40];

const tinhtong = prices.reduce(function(total, price){
  return total + price;
}, 0);

const tongsauthue = tinhtong * 1.1;
console.log(tongsauthue);

const tinhtong2 = prices.reduce((total, price) => total + price, 0) * 1.1;

console.log(tinhtong2);

// b4

const products = [
    { name: "Phone", price: 800 },
    { name: "Laptop", price: 1500 },
    { name: "Tablet", price: 600 }
]; 

const sapxep = products.sort(function(productA, productB){
  return productA.price - productB.price;
})

console.log(sapxep);

const sapxep1 = products.sort((proA, proB) => proA.price - proB.price);

console.log(sapxep1.reverse());

// b5

const users = [{id: 1, active: true}, {id: 2, active: false}, {id: 3, active: true}];

const findUser = users.find(function(user){
  return user.id === 2;
})

console.log(findUser);

const hoatdongall = users.every(function(user){
  return user.active === true;
})

console.log(hoatdongall);

const hoatdong = users.some(function(user){
  return user.active === true;
})

console.log(hoatdong);

//b7

function createCounter(){
  let count = 0;
  return function(){
    count ++;
    return count;
  }
}

const counter1 = createCounter();
const counter2 = createCounter();

console.log("Bộ đếm 1 - Lần 1:", counter1()); // Kết quả: 1
console.log("Bộ đếm 1 - Lần 2:", counter1()); // Kết quả: 2

console.log("Bộ đếm 2 - Lần 1:", counter2()); // Kết quả: 1 (Chạy lại từ 1, không bị ảnh hưởng bởi bộ đếm 1)

console.log("Bộ đếm 1 - Lần 3:", counter1()); // Kết quả: 3 (Vẫn nhớ giá trị cũ của chính nó)
console.log("Bộ đếm 2 - Lần 2:", counter2()); // Kết quả: 2

// Thử truy cập từ bên ngoài
console.log(typeof count); 

//b7

function fakeFetch(data){
  return new Promise(function(resolve, reject){
    setTimeout(function(){
      // neu k co du lieu vao
      if (data === undefined || data === null){
        reject("Loi: k co du lieu dau vao");
      }
      else{
        resolve(data);
      }
    }, 1000)
  })
}


fakeFetch(10)
  .then(function(rawResponse){
    console.log("Nhan du lieu tho: ", rawResponse);
    return rawResponse * 2;
  })
  .then(function(proccesData){
    console.log("ket qua sau khi bien doi", proccesData);
  })
  .catch(function(error){
    console.error("co loi xay ra: ", error);
  });


