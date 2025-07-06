const axios = require("axios")
const {v4: uuidv4} = require("uuid")

async function register(){
  const res = await axios.post("http://localhost:5001/api/v1/auth/register",{
    username: "nazril",
    email: "kokoptempek@gmail.com",
    password: "kikzngsarung",
    role: "admin"})
  console.log(res.data)
}

async function login(){
  const res = await axios.post("http://localhost:5001/api/v1/auth/login",{
    email: "mash@gmail.com",
    password: "mashsayang"
  })
  console.log(res.data)
}

async function addProduct(token){
  const res = await axios.post("http://localhost:5001/api/v1/product/add",{
    item_title: "Pgdgwbe",
    item_description: "lo kneaf ngabs",
    item_cover: "https://youtu.be/_bIz-NLajco?i=7JF3",
    item_category: "other",
    item_stock: 2,
    item_price: 50
  },{headers: {"Authorization": `Bearer ${token}`}})
  console.log(res.data)
}

async function getProduct(item_id,token){
  const res = await axios.post("http://localhost:5001/api/v1/product/get",{item_id},{headers:{"Authorization": `Bearer ${token}`}})
  console.log(res.data)
}

async function updateProductTitle(item_id,token){
  const res = await axios.patch("http://localhost:5001/api/v1/product/update/title",{
    item_id,
    item_title: "figure megumin"
  },{headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
     }
  })
  console.log(res)
}

async function updateProductPrice(item_id,token){
  const res = await axios.patch("http://localhost:5001/api/v1/product/update/price",{
    item_id,
    item_price: 20000
  },{headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
     }
  })
  console.log(res)
}

async function updateProductStock(item_id,token){
  const res = await axios.patch("http://localhost:5001/api/v1/product/update/stock",{
    item_id,
    item_stock: 3
  },{headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
     }
  })
  console.log(res.data)
}

async function updateProductDescription(item_id,token){
  const res = await axios.patch("http://localhost:5001/api/v1/product/update/description",{
    item_id,
    item_description: "kukung"
  },{headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
     }
  })
  console.log(res)
}

async function updateProductCategory(item_id,token){
  const res = await axios.patch("http://localhost:5001/api/v1/product/update/category",{
    item_id,
    item_category: "makanan"
  },{headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
     }
  })
  console.log(res)
}

async function updateProductCover(item_id,token){
  const res = await axios.patch("http://localhost:5001/api/v1/product/update/cover",{
    item_id,
    item_cover: "https://youtu.be/SOUpRhbcFyk?si=vjHZON8dYAJlKrwW"
  },{headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
     }
  })
  console.log(res)
}

async function deleteProduct(item_id,token){
  const res = await axios.post("http://localhost:5001/api/v1/product/delete",{
    item_id
  },{headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
     }
  })
  console.log(res)
}

async function getUser(user_id,token){
  const res = await axios.post("http://localhost:5001/api/v1/user/get",{
    user_id
  },{headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
     }
  })
  console.log(res)
}

async function updateUserUsername(user_id,token){
  const res = await axios.patch("http://localhost:5001/api/v1/user/update/username",{
    user_id,
    username: "megumin"
  },{headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
     }
  })
  console.log(res)
}

async function updateUserEmail(user_id,token){
  const res = await axios.patch("http://localhost:5001/api/v1/user/update/email",{
    user_id,
    email: "megumin@gmail.com"
  },{headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
     }
  })
  console.log(res)
}

async function updateUserPassword(user_id,token){
  const res = await axios.patch("http://localhost:5001/api/v1/user/update/password",{
    user_id,
    password: "meguminsayang"
  },{headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
     }
  })
  console.log(res)
}

async function updateUserRole(user_id,token){
  const res = await axios.patch("http://localhost:5001/api/v1/user/update/role",{
    user_id,
    role: "user"
  },{headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
     }
  })
  console.log(res)
}

async function updateUserProfilePicture(user_id,token){
  const res = await axios.patch("http://localhost:5001/api/v1/user/update/profile_picture",{
    user_id,
    profile_picture: "https://youtu.be/OWipWqFg5Yw?si=dwW-XNLqXAflQO9g"
  },{headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
     }
  })
  console.log(res)
}

async function deleteUser(user_id,token){
  const res = await axios.post("http://localhost:5001/api/v1/user/delete",{
    user_id
  },{headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
     }
  })
  console.log(res)
}

async function addCart(item_id,user_id,token){
  const res = await axios.post("http://localhost:5001/api/v1/cart/add",{
    user_id,
    item_id,
    item_quantity: 1
  },{headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
     }
  })
  console.log(res.data)
}

async function getCart(user_id, token){
  const res = await axios.post("http://localhost:5001/api/v1/cart/get",{
    user_id,
  },{headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
     }
  })
  console.log(res.data)
}

async function updateCartQuantity(user_id,item_id,token){
  const res = await axios.patch("http://localhost:5001/api/v1/cart/update/item_quantity",{
    user_id,
    item_id,
    item_quantity: 1
  },{headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
     }
  })
  console.log(res)
}

async function deleteCart(user_id, item_id, token){
  const res = await axios.post("http://localhost:5001/api/v1/cart/delete",{
    user_id,
    item_id
  },{headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
     }
  })
  console.log(res)
}

async function addOrder(user_id, item_id, item_id2, token){
  const res = await axios.post("http://localhost:5001/api/v1/order/add",{
    user_id,
    order_total_price: 100000,
    order_status: "pending",
    order_items: [
      {item_id: item_id,item_quantity: 1, item_price: 70000},
      {item_id: item_id2,item_quantity: 1, item_price: 30000}
    ]
  },{headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
     }
  })
  console.log(res)
}

async function getOrder(order_id, user_id,token){
  const res = await axios.post("http://localhost:5001/api/v1/order/get",{
    order_id,
    user_id
  },{headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
     }
  })
  console.log(res)
}

async function updateOrderStatus(order_id, user_id,token){
  const res = await axios.patch("http://localhost:5001/api/v1/order/update/status",{
    order_id,
    order_status: "completed"
  },{headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
     }
  })
  console.log(res.data)
}

async function updateOrderTotalPrice(order_id,token){
  const res = await axios.patch("http://localhost:5001/api/v1/order/update/total_price",{
    order_id,
    order_total_price: 1000
  },{headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
     }
  })
  console.log(res.data)
}

async function deleteOrder(order_id, user_id, token){
  const res = await axios.post("http://localhost:5001/api/v1/order/delete",{
    order_id,
    user_id
  },{headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
     }
  })
  console.log(res.data)
}

async function addPayment(user_id,order_id,token){
  const res = await axios.post("http://localhost:5001/api/v1/payment/add",{
    user_id,
    order_id,
    payment_method: "e-wallet",
    payment_amount: 70009,
    payment_status: "pending"
  },{headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
     }
  })
  console.log(res.data)
}

async function getPayment(payment_id, user_id, token){
  const res = await axios.post("http://localhost:5001/api/v1/payment/get",{
    payment_id,
    user_id
  },{headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
     }
  })
  console.log(res.data)
}

async function updatePaymentAmount(payment_id, token){
  const res = await axios.patch("http://localhost:5001/api/v1/payment/update/payment_amount",{
    payment_id,
    payment_amount: 10008
  },{headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
     }
  })
  console.log(res.data)
}

async function updatePaymentStatus(payment_id, token){
  const res = await axios.patch("http://localhost:5001/api/v1/payment/update/payment_status",{
    payment_id,
    payment_status: "pending"
  },{headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
     }
  })
  console.log(res.data)
}

async function updatePaymentMethod(payment_id, token){
  const res = await axios.patch("http://localhost:5001/api/v1/payment/update/payment_method",{
    payment_id,
    payment_method: "cod"
  },{headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
     }
  })
  console.log(res.data)
}

async function deletePayment(payment_id, user_id, token){
  const res = await axios.post("http://localhost:5001/api/v1/payment/delet",{
    payment_id,
    user_id
  },{headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
     }
  })
  console.log(res.data)
}

async function getAllStats(token){
  const res = await axios.get("http://localhost:5001/api/v1/admin/get/stats/all",{headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
     }
  })
  console.log(res.data)
}

async function getUserStats(token){
  const res = await axios.get("http://localhost:5001/api/v1/admin/get/stats/user",{headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
     }
  })
  console.log(res.data)
}

async function getOrderStats(token){
  const res = await axios.get("http://localhost:5001/api/v1/admin/get/stats/order",{headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
     }
  })
  console.log(res.data)
}

async function getProductStats(token){
  const res = await axios.get("http://localhost:5001/api/v1/admin/get/stats/product",{headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
     }
  })
  console.log(res.data)
}

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiVVNSLWFkMTQ2MTIxLTZkNzUtNGE3YS04MmM0LTlhZTEwZDA4NDEyOSIsImVtYWlsIjoibWFzaEBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NTAyMzM3OTIsImV4cCI6MTc1MjgyNTc5Mn0.QTX2FSsC3vjenGAp0gYJ-C3OOaQC8-PcFRllTO1AJ1M'
const product = "ITM-040440bd-0a9e-43ef-8af5-590efd0ef1c2"
const product2 = "ITM-6d36a7ab-912f-43e0-9b66-25f8a3e66621"
const user = "USR-b426b3e5-9e60-4ba6-9415-d06d7bb0b93a"
const user2 = "USR-ae54a1d9-2eee-480c-a6ff-75a04a4d8161"
const order = "ORD-947de76c-a020-4305-be0a-bb750fdb62ce"
const payment = "PAY-104805b1-cda6-494c-93bc-745d46101938"

//register()
//login()

//addProduct(token)
getProduct(product,token)
//updateProductTitle(product,token)
//updateProductPrice(product, token)
//updateProductDescription(product, token)
//updateProductStock(product, token)
//updateProductCategory(product, token)
//updateProductCover(product, token)
//deleteProduct(product, token)

//getUser(user, token)
//updateUserUsername(user, token)
//updateUserEmail(user, token)
//updateUserPassword(user, token)
//updateUserRole(user, token)
//updateUserProfilePicture(user, token)
//deleteUser(user2, token)

//addCart(product2,user,token)
//getCart(user, token)
//updateCartQuantity(user,product2,token)
//deleteCart(user,product2,token)

//addOrder(user, product, product2, token)
//getOrder(order,user,token)

//updateOrderStatus(order,user,token)
//updateOrderTotalPrice(order,token)
//deleteOrder(order, user, token)

//addPayment(user,order,token)
//getPayment(payment,user,token)
//updatePaymentAmount(payment,token)
//updatePaymentStatus(payment,token)
//updatePaymentMethod(payment,token)
//deletePayment(payment,user,token)

//getAllStats(token)
//getUserStats(token)
//getOrderStats(token)
//getProductStats(token)
