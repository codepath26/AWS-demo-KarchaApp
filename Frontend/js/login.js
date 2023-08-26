const email = document.getElementById('email')
const password = document.getElementById('password')
const form = document.getElementById('login-form')
const details = document.getElementById('details')
 form.addEventListener('submit' , addData)
 

async function addData (e){
  e.preventDefault();
let obj = {
  email : email.value,
  password : password.value
}
try{
  let data = await axios.post('http://localhost:3000/user/login' , obj);
  console.log(data.data)
  email.value = "",
  password.value = "" 
 
}catch(err){
  console.log(err.response.data.message);
  email.value = "",
  password.value = "" 
}
   
 } 


