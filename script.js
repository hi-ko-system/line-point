const LIFF_ID = "2010635678-Z0aQDE5T";


const API_URL =
"https://script.google.com/macros/s/AKfycbwbnqJ73xuufJp4VWnzWEhTNctS6J4q_LfdgLFoMa53bytouokK_5X3HrWrho5D9x-R/exec";



async function main(){


const status =
document.getElementById("status");



try{


await liff.init({

liffId:LIFF_ID

});



if(!liff.isLoggedIn()){

liff.login();
return;

}



const profile =
await liff.getProfile();



const url =
API_URL
+
"?userId="
+
encodeURIComponent(profile.userId)
+
"&name="
+
encodeURIComponent(profile.displayName);



const response =
await fetch(url);



const data =
await response.json();



if(data.success){


let chargeHTML = "";



data.charges.forEach(item=>{

chargeHTML +=
`
<div class="history-item">
<div>${item.date}</div>
<div class="plus">
+${Number(item.amount).toLocaleString()} P
</div>
<div>${item.memo}</div>
</div>
`;

});




let useHTML = "";



data.uses.forEach(item=>{

useHTML +=
`
<div class="history-item">
<div>${item.date}</div>
<div class="minus">
-${Number(item.amount).toLocaleString()} P
</div>
<div>${item.memo}</div>
</div>
`;

});




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


<h3>최근 충전 내역</h3>

${chargeHTML || "내역 없음"}


<h3>최근 사용 내역</h3>

${useHTML || "내역 없음"}

`;



}


}catch(error){

status.innerHTML =
"오류 발생<br>"+error;

}


}


main();
