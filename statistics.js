const API_URL =
"https://script.google.com/macros/s/AKfycbwJv-uJZakDqh4ryX83qet2ye9-00QsAalBnIMJkCphhOjqEKWC2wggiwoL8rrys1bi/exec";
let statisticsStudents = [];




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


async function loadExpirePoints(days){


const response =
await fetch(
API_URL
+
"?action=getExpiringPointsSummary"
+
"&days="
+
days
);



const data =
await response.json();



const box =
document.getElementById("expireResult");


box.innerHTML="";



if(
!data.points ||
data.points.length===0
){

box.innerHTML=
"만료 예정 포인트가 없습니다.";

return;

}



data.points.forEach(item=>{


const div =
document.createElement("div");


div.innerHTML=

`
<hr>

<b>${item.name}</b>

<br>

만료 예정 포인트 :
${Number(item.amount).toLocaleString()}P

`;



box.appendChild(div);



});


}




async function loadStudentHistory(){


const lineId =
document.getElementById("historyStudent").value;


const startDate =
document.getElementById("historyStart").value;


const endDate =
document.getElementById("historyEnd").value;



if(!lineId){

alert("학생을 선택해주세요");

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
document.getElementById("studentHistoryResult");


box.innerHTML="";



data.history.forEach(item=>{


const sign =
item.type==="충전"
?
"+"
:
"-";



box.innerHTML +=

`
<hr>

날짜 :
${item.date}

<br>

거래번호 :
${item.transactionNo}

<br>

${item.type}

<br>

${sign}${Number(item.amount).toLocaleString()}P

<br>

${item.memo}

`;



});


}

async function loadHistoryStudents(){


const response =
await fetch(
API_URL
+
"?action=getStudents"
);



const data =
await response.json();



statisticsStudents =
data.students;



const select =
document.getElementById(
"historyStudent"
);



statisticsStudents.forEach(student=>{


const option =
document.createElement("option");


option.value =
student.lineId;


option.text =
student.name;


select.appendChild(option);


});


}

window.onload=function(){

loadHistoryStudents();

};

async function loadUnusedPoints(days){


const response =
await fetch(
API_URL
+
"?action=getUnusedPoints"
+
"&days="
+
days
);



const data =
await response.json();



const box =
document.getElementById("unused");


box.innerHTML="";



if(
!data.points ||
data.points.length===0
){

box.innerHTML=
"해당 조건의 학생이 없습니다.";

return;

}



data.points.forEach(item=>{


box.innerHTML +=

`

<hr>

<b>
${item.name}
</b>

<br>

남은 포인트 :
${Number(item.amount).toLocaleString()}P

<br>

마지막 사용일 :
${item.lastUse}

`;

});


}
