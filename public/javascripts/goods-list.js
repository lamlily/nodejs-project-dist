$(() => {

    // 1.用户信息
    let admin1 = $.cookie("admin");

    $(".admin").html(admin1);

    $(".logout").on("click", function () {
        $.removeCookie("admin");
        $(".admin").html("请先登录");
    })

    let rootpath = 'http://39.105.14.239:3000'
    let pagesize = 6
    let total = 0
    let nowpage = 1

    // 2.获取商品列表并渲染
    let getShowList = () => {
        console.log(999);
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "GET",
                url: "http://39.105.14.239:3000/setting/showList",
                success(data) {
                    resolve(data)
                }
            })
        })
    };
    (async () => {
        let data = await getShowList();
        console.log(data);
        let html = data.map((item, index) => {
            return `
                <tr>
                    <td><input name="" type="checkbox" value="" data-num='${item['_id']}'></td>
                    <td>${item._id}</td>
                    <td>${item.name}</td>
                    <td><img src='${rootpath}${item['imgpath']}'></td> 
                    <td>${item.type}</td>
                    <td>${item.price}</td>
                    <td>${item.desc}</td>
                    <td>${item.stock}</td>
                    <td class="td-manage">
                        <a style="text-decoration:none" class="ml-5" onClick="picture_edit('图库编辑','goods-update.html','${item['_id']}')" href="javascript:;" title="编辑"><i class="Hui-iconfont">&#xe6df;</i></a>
                        <a style="text-decoration:none" class="ml-5" onClick="picture_del(this,'${item['_id']}')" href="javascript:;" title="删除"><i class="Hui-iconfont">&#xe6e2;</i></a>
                    </td>
                </tr>            
            `
        }).join("");

        $("#list").html(html);

    })();

    // td
    { /* <td>${index+1}</td> */ }

    { /* <td><img src='${rootpath}${data['goodslist'][i]['imgpath']}'></td> */ }

    { /* <td class="td-status"><span class="label label-success radius">已发布</span></td>              */ }



    // 3.搜索商品列表并渲染  （查）
    let sousuo = $(".input-text")[0];


    let getSearchData = (fn) => {
        console.log(55555)
        let type = $(sousuo).val().trim();
        if (type != "") {
            return new Promise((resolve, reject) => {
                $.ajax({
                    type: "POST",
                    data: {
                        type
                    },
                    url: "http://39.105.14.239:3000/setting/searchdata",
                    success(data) {
                        console.log(data);
                        resolve(data);
                        // fn(data);
                    }
                })
            })
        } else {
            // getShowList();
            // 若为空则自动刷新页面；== f5
            window.parent.location.reload(true);
        }

    };

    // async改成了命名函数点击后再执行，而非匿名函数（箭头函数）会自执行
    async function aaa() {
        let data = await getSearchData();
        if (!data || data.length == 0) {
            return false;
        }

        // function fn(data) {
        let html = data.map((item, index) => {
            return `
                <tr>
                    <td><input name="" type="checkbox" value="" data-num='${item['_id']}'></td>
                    <td>${item._id}</td>
                    <td>${item.name}</td>
                    <td><img src='${rootpath}${item['imgpath']}'></td> 
                    <td>${item.type}</td>
                    <td>${item.price}</td>
                    <td>${item.desc}</td>
                    <td>${item.stock}</td>
                    <td class="td-manage">
                        <a style="text-decoration:none" class="ml-5" onClick="picture_edit('图库编辑','goods-update.html','${item['_id']}')" href="javascript:;" title="编辑"><i class="Hui-iconfont">&#xe6df;</i></a>
                        <a style="text-decoration:none" class="ml-5" onClick="picture_del(this,'${item['_id']}')" href="javascript:;" title="删除"><i class="Hui-iconfont">&#xe6e2;</i></a>
                    </td>
                </tr>            
            `
        }).join("");
        // console.log(html);
        $("#list").html(html);
        // }
    };

    // sousuo.oninput = getSearchData;
    sousuo.onblur = aaa;
    // 变成了原生[0]
    // $(".searchBtn")[0].onclick = getSearchData;
    // $(".searchBtn")[0].onclick = aaa;


    // 4.自动校验token是否已过期（刷新操作才可校验） 
    (async () => {
        autoLogin=() =>{
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
        if(!isLogin.status){
            location.href="register.html";
        }
        // 异步 awiat和async
        // fn[isLogin.status]()
    
        // 链式调用
        
    
    })();



})


// 4.添加商品
function picture_add(title, url) {
    // 出现弹窗
    var index = layer.open({
        type: 2,
        title: title,
        content: url
    });
    layer.full(index);
};


// 5.删除商品
function picture_del(obj, id) {
    layer.confirm('确认要删除吗？', function (index) {
        //处理我们的删除方法
        $.post('http://39.105.14.239:3000/setting/delGood', {
            id: id
        }, function (res) {
            console.log(res);
            if (res.n == 1) {
                $(obj).parents("tr").remove();
                layer.msg('已删除!', {
                    icon: 1,
                    time: 1000
                });
                //假的刷新
                // getShowList(page);//真刷新
                //   getShowList(page);            
            } else {
                alert("fail");
            }
        })
    });
};


// 6.批量删除
// function datadel(){
//     let zhong = $(":checked").not("#aaaa");
//     let Id = [];
//     for(let i=0;i<zhong.length;i++){
//         if(i>0){
//             Id.push(zhong[i].dataset.id)
//         }
//     }
//     layer.confirm('确认要删除吗？',function(index){
//         //处理我们的删除方法
//         $.post('http://39.105.14.239:3000/setting/delAllGood/',{id:Id},function(res){
//             if (res.n==1) {
//                 layer.msg('已删除!',{icon:1,time:1000});
//                 //假的刷新
//                // getShowList(page);//真刷新
//             //   getShowList(page);             
//             }
//         })    
//     });
// }











// 分页数据
// getListData(1);

// function getListData(page) { 
//     let ii = $($(".select")[0]).val()-0;
//     pagesize=ii;
//     //每次点击下一页都要重新刷新一下数据，刷新的页码即为当前页
//     let url = rootpath + '/setting/showList';
//     let data = {
//         pagesize: pagesize, //条数pagesize一共7条
//         page: page //页码page
//     }
//     nowpage = page;
//     //请求刷新的页数  作为当前页
//     $('.nowpage').html(nowpage); //当前页


//     $.post(url, data, function (res) {
//         console.log(res)
//         if (res=="success") { //成功
//             load(res.data) //调用加载函数
//             $('#total').html(res.data.total)
//             total = res.data.total;
//             // 求总页数（取整可能有小数）
//             $('.total').html(Math.ceil(total / pagesize)); //共几页

//         }
//     })
// }


