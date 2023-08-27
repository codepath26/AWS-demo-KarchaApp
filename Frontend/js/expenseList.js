

let ids = [];
let amount = document.getElementById("ExpenseAmount");
let description = document.getElementById("Description");
let paybutton = document.getElementById("getpremium");
let category = document.getElementById("Category");
let addExpense = document.getElementById("add-items");
let items = document.getElementById("items");
paybutton.addEventListener('click' , payment);
addExpense.addEventListener("submit", addData);
items.addEventListener("click", modified);
window.addEventListener("DOMContentLoaded", getdataFromLocalStorage);
async function getdataFromLocalStorage() {
  try{
   let token = localStorage.getItem('token')
   console.log(token);
    let response = await axios.get("http://localhost:9000/expenseDetails",{
      headers :
      { 'Authorization': token
    }})
    console.log(response);
      response.data.forEach((obj) => {
        ids.push(obj.id)
        DisplayData(obj);
      });
  }
  catch( err){
   console.log(err)
  }
   

}

async function addData(e) {
  e.preventDefault();
  let item = document.createElement("li");
  item.classList.add("list-group-item");
  let obj = {
    amount: amount.value,
    description: description.value,
    category: category.value,
  };
 

  try{
    let token = localStorage.getItem('token')
   let response = await axios.post("http://localhost:9000/expenseDetails",obj,{
    headers :
    { 'Authorization': token
  }})
   console.log(response)
      DisplayData(obj)
      ids.push(response.data.id)
      amount.value = "";
      description.value = "";
      category.value = "Movies";
  }catch( err){
    console.log(err)
   }
   
  }
async function modified(e)
 {
  e.preventDefault();
  
  if (e.target.classList.contains("delete")) {
    let li = e.target.parentElement;
     const inp = li.querySelector('#userid')
     console.log(inp , "this is inpurt")
    let index = Array.from(li.parentNode.children).indexOf(li);
   
    if (index !== -1) {
       let id = ids[index];
       console.log(id);
      try{
        await axios.delete(`http://localhost:9000/expenseDetails/${id}`)
        ids.splice(index, 1);
        items.removeChild(li);
      }catch(err){console.log(err);}
   } 
  }
  if (e.target.classList.contains("edit")) {
    let li = e.target.parentElement;
    let index = Array.from(li.parentNode.children).indexOf(li)
    if (index !== -1) {
      let id = ids[index];
      try{
        let response = await axios.get(`http://localhost:9000/expenseDetails/${id}`)
        console.log(response)
          amount.value = response.data.amount;
          description.value = response.data.description;
          category.value = response.data.category;
         ids.splice(index, 1);
         console.log(ids)
         items.removeChild(li);
         await axios.delete(`http://localhost:9000/expenseDetails/${id}`)
      }catch(err){
        console.log(err);
      }
    }
   
  }
}

    function DisplayData(obj) 
{ 
  console.log(obj.id)
  items.innerHTML += `<li class="list-group-item mt-2">Amount :${obj.amount}, Description :${obj.description}, Category : ${obj.category}<button class="btn btn-success btn-sm mx-1 edit float-end">Edit</button><button class="btn btn-danger btn-sm float-end delete mx-1">Delete</button><input type="hidden" name="userid" id="userid" value="${obj.id}"></li>`
}

 async function  payment (e){
  try{

    let token = localStorage.getItem('token')
    let response = await axios.get("http://localhost:9000/getPremiumMemberShip",{
      headers :
      { 'Authorization': token
    }})
    let options = {
      "key" : response.data.key_id ,
      "order_id" : response.data.order_id,
      "handler" : async function(response){
        await axios.post(`http://localhost:9000/ipdatetransactionstatus`,{
          order_id : option.order_id,
          payment_id : response.razorpay_payment_id,
        },{headers : {'Authorization': token}})
        alert('you are premium user now')
      }
    }
    const rzp1 =new Razorpay(options);
    rzp1.open();
    e.preventDefault();
    rzp1.on('payment.failed' ,function (response){
      console.log(response)
      alert('something went wrong')
    })

  }catch(err){
    console.log(err.message , "thisss");
  }



  }
  




