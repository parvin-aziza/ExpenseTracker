let inputDescription = document.getElementById("Exp_Desp");
let inputAmount = document.getElementById("Exp_Amount");
let inputDate = document.getElementById("Exp_date");
let inputSpendby = document.getElementById("Exp_spend");
let view = document.getElementById("tabel_body");
let submit = document.getElementById("Exp_submit");

var data = []
 function insert()
 {
     let description,amount,name;

     description = inputDescription.value;
     amount = inputAmount.value;
     name = inputSpendby.value;
 

 data.push(
     {
         description : description,
         amount : Number(amount),
         name:name,
     }
 )

 resetInput();

    }


    function resetInput()
    {
        inputDescription.value = "";
        inputAmount.value ="";
        inputSpendby.value ="";
        view.innerHTML = createTable();

    }

    function createTable()
    { 
     
     data.forEach(function (item){

     var table= '<tr><th scope="row">1</th><td>${item.description}</td>%description%<td>%amount%</td><td>Sep 2020</td><td>%name%</td>'
     console.log("clicked")
        
    });

    view.classList.add("fade-in-top");
    return table;

    }

 submit.addEventListener("click",insert);

