const API_URL =
"https://script.google.com/macros/s/AKfycbwJv-uJZakDqh4ryX83qet2ye9-00QsAalBnIMJkCphhOjqEKWC2wggiwoL8rrys1bi/exec";





async function search(){


const startDate =
document.getElementById("startDate").value;


const endDate =
document.getElementById("endDate").value;



if(!startDate || !endDate){

alert("날짜를 선택해주세요");

return;

}



const response =
await fetch(
API_URL
+
"?action=searchHistory"
+
"&startDate="
+
startDate
+
"&endDate="
+
endDate
);



const data =
await response.json();
  
console.log(data);


let charge=0;

let use=0;



const box =
document.getElementById("history");


box.innerHTML="";



data.history.forEach(item=>{


if(item.type==="충전"){

charge += Number(item.amount);

}else{

use += Number(item.amount);

}



box.innerHTML +=

`

<div>

<b>
${item.name}
</b>

<br>

${item.type}

${item.type==="충전"?"+":"-"}

${Number(item.amount).toLocaleString()}P

<br>

${item.memo}

<br>

${item.date}

</div>

<hr>

`;



});




document.getElementById("totalCharge")
.innerText =
charge.toLocaleString()+"P";



document.getElementById("totalUse")
.innerText =
use.toLocaleString()+"P";



}
