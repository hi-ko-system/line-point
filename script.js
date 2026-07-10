const LIFF_ID = "2010635678-Z0aQDE5T";


const API_URL =
"https://script.google.com/macros/s/AKfycbwbnqJ73xuufJp4VWnzWEhTNctS6J4q_LfdgLFoMa53bytouokK_5X3HrWrho5D9x-R/exec";



async function main(){


const status =
document.getElementById("status");



try{


status.innerHTML =
"로그인 확인 중...";



await liff.init({

liffId:LIFF_ID

});



if(!liff.isLoggedIn()){

liff.login();

return;

}



const profile =
await liff.getProfile();



const userId =
profile.userId;


const name =
profile.displayName;



status.innerHTML =
"포인트 조회 중...";



const url =
API_URL
+
"?userId="
+
encodeURIComponent(userId)
+
"&name="
+
encodeURIComponent(name);



const response =
await fetch(url);



const data =
await response.json();




if(data.success){



status.innerHTML =

`
<div class="name">
${data.name}님
</div>


<div class="point-title">
현재 보유 포인트
</div>


<div class="point">
${Number(data.point).toLocaleString()} P
</div>


<div class="message">
포인트는 관리자 수정 후 자동 반영됩니다.
</div>

`;



}else{


status.innerHTML =
data.message;


}



}

catch(error){


console.error(error);


status.innerHTML =
"오류 발생<br>"
+
error;


}


}



main();
