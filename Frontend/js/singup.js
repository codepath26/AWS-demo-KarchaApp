const username = document.getElementById('username')
const email = document.getElementById('email')
const password = document.getElementById('password')
const form = document.getElementById('signup-form')
const details = document.getElementById('details')
form.addEventListener('submit' , addData)

async function addData (e){


  const obj = {
    name : username.value,
    email : email.value,
    password : password.value
  }
  try
  {
    let user = await axios.post(`http://localhost:3000/user/signup` , obj)
      username.value  = "",
     email.value = "",
     password.value = "" 
    
    }catch(err){
    console.log(err);
   
  }
}



