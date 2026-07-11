
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


option.text=
s.name;


select.appendChild(option);


});



select.onchange=updatePoint;



updatePoint();


}







function updatePoint(){


const index =
document.getElementById("studentSelect")
.value;



document.getElementById("currentPoint")
.innerText =
Number(
students[index].point
).toLocaleString();


}








async function save(){


const index =
document.getElementById("studentSelect")
.value;



const student =
students[index];



const type =
document.getElementById("type")
.value;



const amount =
document.getElementById("amount")
.value;



const memo =
document.getElementById("memo")
.value;



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
encodeURIComponent(amount)
+
"&memo="
+
encodeURIComponent(memo);



const response =
await fetch(url);



const data =
await response.json();



if(data.success){


alert("저장 완료");


document.getElementById("currentPoint")
.innerText =
Number(data.point)
.toLocaleString();


loadStudents();



}else{


alert(data.message);


}


}
