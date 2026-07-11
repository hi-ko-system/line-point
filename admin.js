const API_URL =
"https://script.google.com/macros/s/AKfycbwJv-uJZakDqh4ryX83qet2ye9-00QsAalBnIMJkCphhOjqEKWC2wggiwoL8rrys1bi/exec";


let students=[];



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


select.innerHTML="";



students.forEach((s,index)=>{


const option =
document.createElement("option");


option.value=index;


option.text =
`${s.name} (${Number(s.point).toLocaleString()}P)`;


select.appendChild(option);


});



select.onchange=updatePoint;


updatePoint();


}






function updatePoint(){


const index =
document.getElementById("studentSelect").value;


if(!students[index]) return;



document.getElementById("currentPoint")
.innerText =
Number(
students[index].point
)
.toLocaleString();


}







async function save(){


const index =
document.getElementById("studentSelect").value;



const student =
students[index];



const type =
document.getElementById("type").value;



const amount =
Number(
document.getElementById("amount").value
);



const memo =
document.getElementById("memo").value;




if(!amount || amount<=0){

alert("금액을 입력해주세요");
return;

}





// 사용 시 잔액 체크

if(
type==="사용"
&&
amount > Number(student.point)
){

alert(
"잔액 부족입니다.\n현재 잔액: "
+
Number(student.point).toLocaleString()
+
"P"
);

return;

}







const confirmText =

type
+
"\n\n"
+
Number(amount).toLocaleString()
+
"P\n\n"
+
memo
+
"\n\n저장할까요?";



if(!confirm(confirmText)){

return;

}







const url =
API_URL
+
"?action=savePoint"
+
"&lineId="
+
encodeURIComponent(student.lineId)
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
encodeURIComponent(memo);





const response =
await fetch(url);



const data =
await response.json();




const result =
document.getElementById("result");




if(data.success){


result.innerHTML =
"✅ 처리 완료";



document.getElementById("currentPoint")
.innerText =
Number(data.point)
.toLocaleString();




document.getElementById("amount").value="";

document.getElementById("memo").value="";



loadStudents();





}else{


result.innerHTML =
"❌ "
+
data.message;


}



}
