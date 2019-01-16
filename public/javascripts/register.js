let rootpath = 'http://39.105.14.239:3000';

// 477800458@qq.com

//检查邮箱名是否被占用
let yanzheng = true;
$("#youxiang").on("change", function () {
    let name = $("#youxiang").val().trim();

    // 邮箱正则
    var reg = new RegExp("^[a-z0-9A-Z]+[- | a-z0-9A-Z . _]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-z]{2,}$");

    // 验证邮箱
    if (name == '') {
        alert("邮箱不能为空！");
        return false;
    } else if (!reg.test(name)) {
        alert("邮箱格式不正确，请重新输入！");
        return false;
    } else {
        let url = "http://39.105.14.239:3000/setting/findUser";
        let data = {
            name: name
        }
        $.post(url, data, function (res) {
            // console.log(res)
            if (res == "fail") {
                alert("邮箱名已占用！");
                yanzheng = false;

            } else {
                yanzheng = true;
            }
        })
    }
})

//注册
$("#zhuce").on("click", function () {

    let name = $("#youxiang").val().trim();
    let pass = $("#mima").val().trim();
    let code = $("#yanzhengma").val().trim();
    if (pass.length < 6) {
        alert("密码长度不小于6！");
    }
    let url = "http://39.105.14.239:3000/setting/addUser";
    let data = {
        name: name,
        pass: pass,
        code: code
    }
    if (yanzheng) {
        $.post(url, data, function (res) {
            console.log(res)
            if (res.status == 'success') {

                console.log("注册成功");
                // 将注册用户名字存入localStorage或者sessionStorage中
                localStorage.setItem("token", res.token)
                console.log(res.token);

                // 将注册用户名存入cookie,用来记录用户名在首页显示用户名
                // Cookie.setCookie("admin",name);
                document.cookie = "admin=" + name + ";path=/";

                location.href = "index.html";
                // alert("注册成功");
            } else {
                alert("注册失败！");
            }
        })
    } else {
        alert("请输入有效邮箱！");
    }
    return false;

})


// 随机验证码
// 默认打开页面即生成一个
$(".code").css({
    "background": randomColor(16),
    "width": "70px",
    "height": "30px",
    "display": "inline-block",
    "text-align": "center"
});
$(".code").html(randomCode(4));

// 点击验证码生成一个新的验证码
$("#kanbuq").click(function () {
    $(".code").css({
        "background": randomColor(16),
        "width": "70px",
        "height": "30px",
        "display": "inline-block",
        "text-align": "center"
    });
    $(".code").html(randomCode(4));
});


