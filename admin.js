const API_URL =
"https://script.google.com/macros/s/AKfycbwJv-uJZakDqh4ryX83qet2ye9-00QsAalBnIMJkCphhOjqEKWC2wggiwoL8rrys1bi/exec";


let students=[];

let selectedStudent=null;




async function login(){


const password =
document.getElementById("password").value;



const response =
await fetch(
API_URL
+
"?action=adminLogin&password="
+
encodeURIComponent(password)
);



const data =
await response.json();



if(data.success){


document.getElementById("loginBox")
.style.display="none";


document.getElementById("adminBox")
.style.display="block";


loadStudents(); 
loadHistory();



}else{


alert(data.message);


}


}








async function loadStudents(){


const response =
await fetch(
API_URL
+
"?action=getStudents"
);



const data =
await response.json();



students=data.students;



const select =
document.getElementById("studentSelect");



select.innerHTML =
"<option>학생을 선택하세요</option>";



students.forEach((student,index)=>{


const option =
document.createElement("option");


option.value=index;


option.text =
`${student.name} (${Number(student.point).toLocaleString()}P)`;


select.appendChild(option);


});



select.onchange=function(){


const index=this.value;


if(index==="") return;


selectStudent(
students[index]
);


};



}








function searchStudent(){


const keyword =
document.getElementById("search")
.value.trim();



const result =
document.getElementById("searchResult");



result.innerHTML="";



if(!keyword){

return;

}



students
.filter(s=>s.name.includes(keyword))
.forEach(student=>{


const div =
document.createElement("div");



div.style.padding="10px";

div.style.borderBottom=
"1px solid #ddd";

div.style.cursor="pointer";



div.innerHTML=

`
${student.name}
<br>
${Number(student.point).toLocaleString()}P
`;



div.onclick=function(){


selectStudent(student);


result.innerHTML="";


document.getElementById("search")
.value="";


};


result.appendChild(div);



});


}








function selectStudent(student){


selectedStudent=student;



document.getElementById("selectedName")
.innerText=
student.name;



document.getElementById("currentPoint")
.innerText=
Number(student.point)
.toLocaleString();


   
}








async function save(){



if(!selectedStudent){


alert("학생을 선택해주세요");

return;


}



const type =
document.getElementById("type").value;



const amount =
Number(
document.getElementById("amount").value
);



const memo =
document.getElementById("memo").value;

const expireDate =
document.getElementById("expireDate").value;



if(!amount || amount<=0){

alert("금액을 입력해주세요");

return;

}






if(
type==="사용"
&&
amount > Number(selectedStudent.point)
){


alert(
"잔액 부족입니다.\n현재 잔액: "
+
Number(selectedStudent.point)
.toLocaleString()
+
"P"
);


return;


}







if(
!confirm(
type
+
"\n"
+
Number(amount)
.toLocaleString()
+
"P\n저장할까요?"
)
){

return;

}






const url =
API_URL
+
"?action=savePoint"
+
"&lineId="
+
encodeURIComponent(selectedStudent.lineId)
+
"&type="
+
encodeURIComponent(type)
+
"&amount="
+
amount
+
"&memo="
+
encodeURIComponent(memo)
+
"&expireDate="
+
encodeURIComponent(expireDate);





const response =
await fetch(url);



const data =
await response.json();






if(data.success){


document.getElementById("result")
.innerHTML=
"✅ 저장 완료";



document.getElementById("currentPoint")
.innerText=
Number(data.point)
.toLocaleString();



selectedStudent.point=data.point;



document.getElementById("amount").value="";

document.getElementById("memo").value="";



loadStudents();
    
loadHistory();


}else{


document.getElementById("result")
.innerHTML=
"❌ "
+
data.message;


}



}

function selectType(value){

    document.getElementById("type").value=value;


    const expireBox =
document.getElementById("expireBox");


    if(value==="충전"){


        document.getElementById("chargeBtn")
        .style.opacity="1";


        document.getElementById("useBtn")
        .style.opacity="0.5";


        expireBox.style.display="block";


    }else{


        document.getElementById("chargeBtn")
        .style.opacity="0.5";


        document.getElementById("useBtn")
        .style.opacity="1";


        expireBox.style.display="none";


    }

}
async function loadHistory(){


const response =
await fetch(
API_URL
+
"?action=getRecentHistory"
);



const data =
await response.json();



const box =
document.getElementById("history");



box.innerHTML="";



data.history.forEach(item=>{


const div =
document.createElement("div");


const sign =
item.type==="충전"
? "+"
: "-";



div.innerHTML =

`
<div>
<b>${item.name}</b>

<br>

거래번호:
${item.transactionNo || ""}

<br>

${item.type}

<br>

${sign}${Number(item.amount).toLocaleString()}P

<br>

${item.memo}
<br>

${item.date}

<br>

<button onclick="
cancel(
'${item.type}',
'${item.transactionNo}'
)
">

취소

</button>

</div>

<hr>
`;



box.appendChild(div);



});


}

async function cancel(type,transactionNo){


if(!confirm("정말 취소할까요?")){

return;

}



const response = await fetch(
API_URL
+
"?action=cancelTransaction"
+
"&type="
+
encodeURIComponent(type)
+
"&transactionNo="
+
encodeURIComponent(transactionNo)
);


const data =
await response.json();



if(data.success){

alert("취소 완료");


loadHistory();


loadStudents();


}else{


alert("취소 실패");


}


}


function openStudentDetail(){


if(!selectedStudent){


alert("학생을 선택해주세요");


return;


}



window.open(

"student.html?lineId="
+
encodeURIComponent(
selectedStudent.lineId
),

"_blank"

);


}



function openStatistics(){


window.open(

"statistics.html",

"_blank"

);


}


function changeExpireType(){

    const type =
    document.getElementById("expireType").value;

    if(type==="custom"){
        return;
    }

    const days = Number(type);

    const date = new Date();

    date.setDate(date.getDate() + days);

    const yyyy = date.getFullYear();

    const mm = String(date.getMonth()+1).padStart(2,"0");

    const dd = String(date.getDate()).padStart(2,"0");

    document.getElementById("expireDate").value =
    `${yyyy}-${mm}-${dd}`;

}


window.onload = function(){

    changeExpireType();

}
