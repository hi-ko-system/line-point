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
encodeURIComponent(memo);





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



}else{


document.getElementById("result")
.innerHTML=
"❌ "
+
data.message;


}



}
