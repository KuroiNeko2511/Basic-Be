//bai1

function xinChao(){
  return new Promise(function(resolve){
    setTimeout(function(){
      resolve("hello world");
    }, 1000)
  });
}


// goi ham va hứng thông điệp bên bằng hàm callback bên trong .then()
xinChao()
  .then(function(thongDiep){
    console.log(thongDiep);
  });


  // bai2

  function mayMan(){
    return new Promise(function(resolve, reject){
      setTimeout(function(){
        let num = Math.random();
        if (num > 0.5){
          resolve("Ban da thang");
        }
        else{
          reject("Ban da thua");
        }
      }, 2000);
    });
  };

mayMan()
  .then(function(ketqua){
    console.log(ketqua);
  })
  .catch(function(te){
    console.error(te);
  })



// bai 3, nhan data tho roi then nhieu lan de xuly

function xuly(){
  return new Promise(function(resolve){
    setTimeout(function(){
      resolve(10)
    },1000)
  })
}

xuly()
  .then(function(dulieunhanve){
    console.log(dulieunhanve);
    return new Promise(function(resolve){
      setTimeout(function(){
        resolve(dulieunhanve * 2);
      }, 1000);
    }) 
  })
  .then(function(dulieusau){
    console.log("du lieu sau khi nhan doi", dulieusau);
    return dulieusau + 5;
  })
  .then(function(dulieucuoi){
    console.log("du lieu sau cung", dulieucuoi);
  })


// 3 api

function api1(){
  return new Promise(function(resolve){
    setTimeout(function(){
      resolve("hoan thanh api1")
    }, 1000)
  })
}


function api2(){
  return new Promise(function(resolve){
    setTimeout(function(){
      resolve("hoan thanh api2")
    }, 2000)
  })
}

function api3(){
  return new Promise(function(resolve){
    setTimeout(function(){
      resolve("hoan thanh api3")
    }, 3000)
  })
}

Promise.all([api1(), api2(), api3()])
  .then(function(mangketqua){
    console.log(mangketqua);
  })

Promise.race([api1(), api2()])
  .then(function(cuocdua){
    console.log(cuocdua)
  })