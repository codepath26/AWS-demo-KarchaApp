const username = document.getElementById('signupName')
const email = document.getElementById('signupEmail')
const password = document.getElementById('signupPassword')
const form = document.getElementById('form')
const details = document.getElementById('details')
form.addEventListener('submit' , addData);
const alert1 = document.getElementById('alert1');


async function addData (e){
  e.preventDefault();
  console.log(password.value)
  const obj = {
    name : username.value,
    email : email.value,
    password : password.value
  }
  try
  {
      let user = await axios.post(`http://localhost:3000/user/login` , obj)
      display(user.data);
      username.value  = "",
     email.value = "",
     password.value = "" 
    
    }catch(err){
   console.log(err.response.data.message);
   alert1.style.display = "block"
  }
}



function display (obj){
  console.log(obj)
  details.innerHTML = ` <li class='list-group-item'>your name : ${obj.name}</li>
  <li class='list-group-item'>your email : ${obj.email}</li>
  <li class='list-group-item'>your password : XXXXX </li>   `

}

function displayErrorModal(message) {
  const modal = new bootstrap.Modal(document.getElementById('errorModal'));
  const modalMessage = document.getElementById('errorModalMessage');
  modalMessage.textContent = message;
  modal.show();
}
