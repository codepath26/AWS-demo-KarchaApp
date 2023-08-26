
let ids = [];
let amount = document.getElementById("ExpenseAmount");
let description = document.getElementById("Description");
let category = document.getElementById("Category");
let addExpense = document.getElementById("add-items");
let items = document.getElementById("items");

addExpense.addEventListener("submit", addData);
items.addEventListener("click", modified);
window.addEventListener("DOMContentLoaded", getdataFromLocalStorage);
async function getdataFromLocalStorage() {
  try{
   let token = localStorage.getItem('token')
  //  console.log(token);
    let response = await axios.get("http://localhost:3000/expenseDetails" , {
      headers :{
        'Authorization': token ,
      }
    })
    // console.log(response);
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

   let response = await axios.post("http://localhost:3000/expenseDetails",obj)
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
    let index = Array.from(li.parentNode.children).indexOf(li);
   
    if (index !== -1) {
       let id = ids[index];
       console.log(id);
      try{
        await axios.delete(`http://localhost:3000/expenseDetails/${id}`)
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
        let response = await axios.get(`http://localhost:3000/expenseDetails/${id}`)
        console.log(response)
          amount.value = response.data.amount;
          description.value = response.data.description;
          category.value = response.data.category;
         ids.splice(index, 1);
         console.log(ids)
         items.removeChild(li);
         await axios.delete(`http://localhost:3000/expenseDetails/${id}`)
      }catch(err){
        console.log(err);
      }
    }
   
  }
}

    function DisplayData(obj) 
{ 
  console.log(obj)
  let item = document.createElement("li");
  item.classList =  "list-group-item mt-2";
  item.appendChild(
    document.createTextNode(

      `Amount :${obj.amount}, Description :${obj.description}, Category : ${obj.category}`
    )
  );
  let deletButton = document.createElement("button");
  deletButton.classList = "btn btn-danger btn-sm float-end delete mx-1";
  deletButton.appendChild(document.createTextNode("Delete"));

  let editButton = document.createElement("button");
  editButton.classList = "btn btn-success btn-sm mx-1 edit float-end";
  editButton.appendChild(document.createTextNode("Edit"));
  item.appendChild(editButton);
  item.appendChild(deletButton);
  items.appendChild(item);
}





