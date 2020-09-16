//placeholder to store the total amount.
var total=0.0;
//placeholder to store the expense for a users used in pie chart.
var labels=[];
//placeholder to store the expense amount used in pie chart.
var amountData=[];



//function to restore data from loca storage and create pie chart if data exists.
function restoreFromLocalStorage(){
    console.log("restore function called");
    var data=JSON.parse(localStorage.getItem("data")); 
    if(data!=null){
    for(var i=0;i<data.length;i++){
        var row=createRow(data[i][0],data[i][1],data[i][2],data[i][3]);
        amountData.push(data[i][1]);
        labels.push(data[i][3]);
        var table_body=document.getElementById("table_body");
        table_body.appendChild(row);
        total=total+parseFloat(data[i][1]);
        }
        createChart();
    }
    else{
    console.log("local storage is empty");
    localStorage.setItem("data",JSON.stringify([]));
    }
    document.getElementById("total").placeholder=total;

}


//While Editing to clear the old data from loal strorage

function refreshData(newDesp,newAmt,newDate,newSpend){

    var data=JSON.parse(localStorage.getItem("data"));
    data.push([newDesp,newAmt,newDate,newSpend]);
    localStorage.setItem("data",JSON.stringify(data));
    total=0.0;
    labels=[];
    amountData=[];
    for(var i=0;i<data.length;i++){
        amountData.push(data[i][1]);
        labels.push(data[i][3]);
        total=total+parseFloat(data[i][1]);
        }
        createChart();

        document.getElementById("total").placeholder=total;
}

//Insert updated data into row
function deleteAndInsert(parent,index){
    console.log("delete and Insert");
    var table_body=document.getElementById("table_body");
    console.log(parent.parentNode);
    console.log(parent);
    table_body.removeChild(parent);
    
    newDesp=document.getElementById("Edit_Desp").value;
    newAmt=parseFloat(document.getElementById("Edit_Amount").value);
    newDate=document.getElementById("Edit_date").value;
    newSpend=document.getElementById("Edit_spend").value;
    console.log(newDesp,newAmt,newDate,newSpend);
    var data=JSON.parse(localStorage.getItem("data"));
    data.splice(index,1);
    localStorage.setItem("data",JSON.stringify(data));
    var row=createRow(newDesp,newAmt,newDate,newSpend);
    
    table_body.appendChild(row);
    
    refreshData(newDesp,newAmt,newDate,newSpend);

    //var editModel=document.getElementById("editModal");
    //editModel.style.display="none";
    var modal = document.getElementById("modalEdit");
    modal.style.display = "none";

}

//Search the data on local storage
function seaerchInLocalStorage(oldDesp,oldAmount,oldDate,oldSpend){
    console.log("search index");
    var data=JSON.parse(localStorage.getItem("data"));
    for(var i=0;i<data.length;i++){
        if(data[i][0]==oldDesp && data[i][1]==oldAmount && data[i][2]==oldDate && data[i][3]==oldSpend){
            return i;
        }
    }

}


function editRow(){
    var context=this;
    console.log("edit Row");
    
    
    
    var parent=this.parentNode;
    var oldDesp=parent.children[0].innerHTML;
    var oldAmount=parent.children[1].innerHTML
    var oldDate=parent.children[2].innerHTML;
    var oldSpend=parent.children[3].innerHTML;
    
    document.getElementById("Edit_Desp").value=oldDesp;
    document.getElementById("Edit_Amount").value=oldAmount;
    document.getElementById("Edit_date").value=oldDate;
    document.getElementById("Edit_spend").value=oldSpend;
    var index=seaerchInLocalStorage(oldDesp,oldAmount,oldDate,oldSpend);
    document.getElementById("Edit_submit").addEventListener("click",function(){
        deleteAndInsert(parent,index);
    })
    var editModel=document.getElementById("editModal");
    editModel.style.display="block";

}

//function to create cell of the table
function createCell(data,id){
    var cell=document.createElement("td");
    cell.innerHTML=data;
    cell.id=id;
    return cell
}


//function to create row 
function createRow(inputDescription,inputAmount,inputDate,inputSpendby){
    var row=document.createElement("tr");
    row.appendChild(createCell(inputDescription,"text"));
    row.appendChild(createCell(inputAmount,"number"));
    row.appendChild(createCell(inputDate,"date"));
    row.appendChild(createCell(inputSpendby,"text"));
    var a=document.createElement("a");
    a.setAttribute("href","");
    a.setAttribute("class","btn btn-info mb-4");
    a.setAttribute("data-toggle","modal");
    a.setAttribute("data-target","#modalEdit");
    a.addEventListener('click',editRow);
    a.innerHTML="Edit";
    row.appendChild(a);
    return row;
    
}

//function to generate colors randomly for pie chart
function random_bg_color(range) {
    var color=[]
    for(var i=0;i<range;i++){
    var x = Math.floor(Math.random() * 256);
    var y = Math.floor(Math.random() * 256);
    var z = Math.floor(Math.random() * 256);
    color.push("rgb(" + x + "," + y + "," + z + ")");
    }
    return color;
}

//function to create chart and update chart when new entried are added.
function createChart(){
    console.log("in create chart");
    var plot=new Chart(document.getElementById("pie-chart"),
    {
        type:'pie',
        data:{
            labels:labels,
            datasets:[{
                label:"Expenses",
                backgroundColor:random_bg_color(amountData.length),
                borderColor:'rgb(255,99,132)',
                data:amountData
            }]
        }

    })
}

//function to add row when user enters new expense
function addRow(e){
    
    console.log("add row functiona");
    var inputDescription = document.getElementById("Exp_Desp").value;
    
    var inputAmount = document.getElementById("Exp_Amount").value;
    amountData.push(inputAmount);

    var inputDate = document.getElementById("Exp_date").value;

    var inputSpendby = document.getElementById("Exp_spend").value;
    labels.push(inputSpendby);

    var table_body=document.getElementById("table_body");

    var row=createRow(inputDescription,inputAmount,inputDate,inputSpendby);
    table_body.appendChild(row);
    total=total+parseFloat(inputAmount);
    document.getElementById("total").placeholder=total;
    var data=JSON.parse(localStorage.getItem("data"));
    data.push([inputDescription,inputAmount,inputDate,inputSpendby]);
    localStorage.setItem("data",JSON.stringify(data));
    createChart();
   
}

 