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
async function loadStudentHistory(){


const startDate =
document.getElementById("historyStart").value;


const endDate =
document.getElementById("historyEnd").value;



if(!startDate || !endDate){

alert("조회 기간을 선택해주세요");

return;

}



const response =
await fetch(

API_URL
+
"?action=searchStudentHistory"
+
"&lineId="
+
encodeURIComponent(lineId)
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



const box =
document.getElementById(
"studentHistoryResult"
);


box.innerHTML="";



if(
!data.history ||
data.history.length===0
){

box.innerHTML=
"거래 내역이 없습니다.";

return;

}



data.history.forEach(item=>{


const sign =
item.type==="충전"
?
"+"
:
"-";



const div =
document.createElement("div");



div.innerHTML=

`

<b>
${item.transactionNo}
</b>

<br>

${item.date}

<br>

${item.type}

${sign}
${Number(item.amount).toLocaleString()}P

<br>

${item.memo}

<hr>

`;



box.appendChild(div);


});


}
