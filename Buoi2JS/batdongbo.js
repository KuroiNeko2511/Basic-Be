// // b1 cho promise => async/ await

// function fetchUserData() {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve({ id: 1, name: "Nguyen Van A" });
//         }, 1000);
//     });
// }

// async function displayUser() {
//   try{
//     const user = await fetchUserData();
//     console.log(`User: ${user.name}`);
//   } catch(error){
//     console.error("Da xay ra loi", error);
//   }
// }

// displayUser();

// // b2

// function downloadFile(url){
//   return new Promise(function(resolve, reject){
//     setTimeout(function(){
//       if (!url){
//         reject("URL khong hop le");
//       }
//       else{
//         resolve(`Tai thanh cong file tu ${url}`);
//       }
//     }, 1500)
//   })
// }

// async function handleDownload(){
//   try {
//     const res = await downloadFile("https://example.com");
//     console.log(res);
//   }
//   catch(error)
//   {
//     console.error("Loi:", error);
//   }

//   try {
//     const res = await downloadFile("");
//     console.log(res);
//   }
//   catch(error){
//     console.error("Loi:", error);
//   }
// }

// handleDownload();

// // bai3 

// const createOrder = () => new Promise(resolve => setTimeout(()=> resolve("Don hang #123"), 1000));
// const makePayment = (order) => new Promise(resolve => setTimeout(()=> resolve(`Thanh toán thành công cho ${order}`), 1000));
// const shipOrder = (payment) => new Promise(resolve => setTimeout(()=> resolve(`Đã giao ${payment} cho đơn vị vận chuyển`), 1000));


// async function checkourProcess(){
//   console.log("Bat dau xu ly...");
//   const order = await createOrder();
//   console.log(order);

//   const payment = await makePayment(order);
//   console.log(payment);

//   const shipping = await shipOrder(payment);
//   console.log(shipping);
//   console.log("Hoan thanh quy trinh");
// }

// checkourProcess();

// bai 4

const fetchNews = () => new Promise(res => setTimeout(() => res("Tin tức mới nhất"), 2000));
const fetchWeather = () => new Promise(res => setTimeout(() => res("Thời tiết: 28°C"), 1000));
const fetchStocks = () => new Promise(res => setTimeout(() => res("Chứng khoán: +1.5%"), 1500));

async function loadDashboard(){
  console.time("Thoi gian tai Dashboard");
  try{
    // chay song song 3 ham cung luc
    const [news, weather, stocks] = await Promise.all([
      fetchNews(),
      fetchWeather(),
      fetchStocks()
    ]);

    console.log("Du lieu nhan duoc:");
    console.log("-", news);
    console.log("-", weather);
    console.log("-", stocks);
  }
  catch(error){
    console.error("Một trong các tác vụ bị lỗi:", error);
  }
  console.timeEnd("Thoi gian tai Dashboard"); // Sẽ xấp xỉ ~2000ms (2 giây)
}

loadDashboard();