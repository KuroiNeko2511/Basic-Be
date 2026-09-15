const user = {
  name : "John",
  age : 30,
  hehe: function() {
    console.log(`Hi, my name is ${this.name}`);
  }
}

user.hehe();

// closure can be access outside of the function

//ex

function hambenngoai(){
  const a = 10;
  function hambentrong(){
    console.log(a);
  }
  return hambentrong;
}

const myFunc = hambenngoai();
myFunc(); // 10

// ex2

var users = [
  {
    name: "John",
    id: 1,
    age: 18
  },

  {
    name: "Jane",
    id: 2,
    age: 20
  },
  {
    name: "Jack",
    id: 3,
    age: 22
  }
]

function getUserById(id) {
  const user = users.find(function(user) {
    return user.id === id;
  });  
  return user;
}

var user1 = getUserById(2);
console.log(user1); // { name: 'Jane', id: 2, age: 20 }