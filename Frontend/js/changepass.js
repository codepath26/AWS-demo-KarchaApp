const form = document.getElementById('forget-pasword')
const email = document.getElementById('email')


//addevent listener

form.addEventListener('submit' , forgotPass);


//callback function

async function forgotPass(e){
  e.preventDefault();
  const obj = { 
    email : email.value ,
  }
 let data = await  axios.post('http://localhost:9000/user/called/password/forgotpassword' , obj)
 console.log(data)
}