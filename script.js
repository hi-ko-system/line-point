const LIFF_ID = "2010635678-Z0aQDE5T";

async function main(){

    try{

        await liff.init({
            liffId: LIFF_ID
        });

        if(!liff.isLoggedIn()){
            liff.login();
            return;
        }

        const profile = await liff.getProfile();

        document.getElementById("status").innerHTML =
        `
        <b>${profile.displayName}</b> 님 환영합니다.
        `;

        console.log(profile);

    }catch(err){

        console.error(err);

        document.getElementById("status").innerHTML =
        "오류 : " + err;

    }

}

main();
