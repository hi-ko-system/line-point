const API_URL =
"https://script.google.com/macros/s/AKfycbwJv-uJZakDqh4ryX83qet2ye9-00QsAalBnIMJkCphhOjqEKWC2wggiwoL8rrys1bi/exec";





const params =
new URLSearchParams(
window.location.search
);



const lineId =
params.get("lineId");







async function loadStudent(){



if(!lineId){

document.getElementById("studentName")
.innerText="학생 정보 없음";

return;

}




const response =
await fetch(
API_URL
+
"?action=getStudentDetail&lineId="
+
encodeURIComponent(lineId)
);



const data =
await response.json();





document.getElementById("studentName")
.innerText=
data.name;



document.getElementById("point")
.innerText=
Number(data.point)
.toLocaleString();




document.getElementById("totalCharge")
.innerText=
Number(data.totalCharge)
.toLocaleString();




document.getElementById("totalUse")
.innerText=
Number(data.totalUse)
.toLocaleString();





const box =
document.getElementById("history");



box.innerHTML="";




data.histories.forEach(item=>{


const div =
document.createElement("div");



const sign =
item.type==="충전"
? "+"
: "-";



div.innerHTML=

`

<b>
${item.transactionNo}
</b>

<br>

${item.type}

${sign}
${Number(item.amount).toLocaleString()}P

<br>

${item.memo}

<br>

<small>
${item.date}
</small>


<hr>

`;



box.appendChild(div);



});



}



loadStudent();
