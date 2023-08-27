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

  let response = await axios.post('http://localhost:9000/user/login' , obj);
  const token = response.data.token;
  const user = response.data.user;
  email.value = "",
  password.value = "" 
  localStorage.setItem('token' ,token);
  window.location.href = '../html/expenseList.html'
 
}catch(err){
  console.log(err.response.data.message);
  email.value = "",
  password.value = "" 
  // Redirect to a new page

}
   
 } 


