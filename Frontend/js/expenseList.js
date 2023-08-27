

let ids = [];
let amount = document.getElementById("ExpenseAmount");
let description = document.getElementById("Description");
let showLeaderBoard = document.getElementById("leaderBoard");
let paybutton = document.getElementById("getpremium");
let category = document.getElementById("Category");
let addExpense = document.getElementById("add-items");
let feature1 = document.getElementById("leaderborditem");
const isPremiumuser = document.getElementById('premiumUser');
let items = document.getElementById("items");
paybutton.addEventListener('click' , payment);
addExpense.addEventListener("submit", addData);
 showLeaderBoard.addEventListener('click' , leaderBoard)
items.addEventListener("click", modified);
console.log(feature1);
window.addEventListener("DOMContentLoaded", fetchData);
async function fetchData() {
  try{
   let token = localStorage.getItem('token')
   let ispremium= localStorage.getItem('ispremium')
   if(ispremium){
    isPremiumuser.style.display = "block" ;
    paybutton.style.display = "none";
   }else{
     showLeaderBoard.style.display = "none"
   }
    let response = await axios.get("http://localhost:9000/expenseDetails",{
      headers :
      { 'Authorization': token
    }})
      response.data.forEach((obj) => {
        console.log(obj.isPremiumuser)
        DisplayData(obj);
      });
  }
  catch( err){
   console.log(err)
  }
   

}

async function addData(e) {
  e.preventDefault();
  feature1.removeChild();
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

  items.innerHTML += `<li class="list-group-item mt-2">Amount :${obj.amount}, Description :${obj.description}, Category : ${obj.category}<button class="btn btn-success btn-sm mx-1 edit float-end">Edit</button><button class="btn btn-danger btn-sm float-end delete mx-1">Delete</button><input type="hidden" name="userid" id="userid" value="${obj.id}"></li>`
}

 async function  payment (e){
  try{

    let token = localStorage.getItem('token')
    let response = await axios.get("http://localhost:9000/getPremiumMemberShip",{
      headers :
      { 'Authorization': token
    }})
    console.log(response.data.order.orderId)
    let options = {
      "key" : response.data.key_id ,
      "order_id" : response.data.order.orderId,
      "handler" : async function(response){
        try{

          await axios.post(`http://localhost:9000/updatetransactionstatus`,{
            order_id : options.order_id,
            payment_id : response.razorpay_payment_id,
          },{headers : {'Authorization': token}})
          alert('you are premium user now')
          localStorage.setItem('ispremium' , true);
          isPremiumuser.style.display = "block" ;
          paybutton.style.display = "none";


        }catch(err){
          console.log(err.message , "thisss");
        }

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
    console.log(err.message);
  }
  }




  // show the leader board

  async function leaderBoard(){

    let response = await axios.get('http://localhost:9000/premiumUser/leaderBoard')

    console.log(response)
    feature1.style.display= "block"
   response.data.forEach(obj=>{
    feature1.innerHTML +=`<li class='list-group-item'>${obj.name} have TotalCost ${obj.total_cost ? obj.total_cost:0  } </li>` 
   })
   
  }




