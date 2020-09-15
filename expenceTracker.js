
var total=0.0;
var labels=[];
var amountData=[];
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
function modifyCell(context){
    var newData=document.getElementById("newValue");
    // context.innerHTML=newData.value;
    context.innerHTML="#####";
    var model=document.getElementById("editCellModel");
    model.style.display="none";
}
function editCell(){
    var model=document.getElementById("editCellModel");
    model.style.display="block";
    var p=document.createElement("p");
    p.innerHTML=this.innerHTML;
    model.appendChild(p);
    var input=document.createElement("input");
    input.type=this.id;
    input.id="newValue";
    model.appendChild(input)
    var button=document.createElement("button");
    button.innerHTML="edit";
    button.onclick=function(){
        var newData=document.getElementById("newValue");
    // context.innerHTML=newData.value;
    this.innerHTML=newData.value;
    var model=document.getElementById("editCellModel");
    model.style.display="none";
    }
    model.appendChild(button);

}
function createCell(data,id){
    var cell=document.createElement("td");
    cell.innerHTML=data;
    cell.id=id;
    cell.addEventListener("click",editCell);
    return cell
}
function createRow(inputDescription,inputAmount,inputDate,inputSpendby){
    var row=document.createElement("tr");
    row.appendChild(createCell(inputDescription,"text"));
    row.appendChild(createCell(inputAmount,"number"));
    row.appendChild(createCell(inputDate,"date"));
    row.appendChild(createCell(inputSpendby,"text"));
    return row;
    

}
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

function addRow(e){
    
    console.log("add row functiona");
    var inputDescription = document.getElementById("Exp_Desp").value;
    
    var inputAmount = document.getElementById("Exp_Amount").value;
    amountData.push(inputAmount)
    var inputDate = document.getElementById("Exp_date").value;
    var inputSpendby = document.getElementById("Exp_spend").value;
    labels.push(inputSpendby);
    var table_body=document.getElementById("table_body");
    console.log(inputDescription,inputAmount,inputDate,inputSpendby);
    var row=createRow(inputDescription,inputAmount,inputDate,inputSpendby);
    table_body.appendChild(row);
    total=total+parseFloat(inputAmount);
    document.getElementById("total").placeholder=total;
    var data=JSON.parse(localStorage.getItem("data"));
    data.push([inputDescription,inputAmount,inputDate,inputSpendby]);
    localStorage.setItem("data",JSON.stringify(data));
    createChart();
   
}

 