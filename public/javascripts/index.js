// let admin0 = Cookie.getCookie("admin");
// if(admin==""){
//     alert("请先登录！");

// }
let admin0 = $.cookie("admin");

$(".admin").html(admin0);

$(".logout").on("click", function () {
    $.removeCookie("admin");
    $(".admin").html("请先登录");
})




$(() => {

    // 4.自动校验token是否已过期（刷新操作才可校验） 
    (async () => {
        autoLogin = () => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    type: "POST",
                    headers: {
                        token: localStorage.getItem("token")
                    },
                    url: "http://39.105.14.239:3000/setting/autoLogin",
                    success(data) {
                        resolve(data)
                    }
                })
            })
        }

        let isLogin = await autoLogin();
        console.log(777);
        console.log(isLogin);
        if (!isLogin.status) {
            location.href = "register.html";
        }
        // 异步 awiat和async
        // fn[isLogin.status]()

        // 链式调用


    })();

})