	// console.log(window.location.href)页面地址栏传参
    // 还可以用cookie；session ==localStorage;
    // 修改和添加一样，通过id发起ajax请求将数据渲染到页面上；
    // let storage=window.localStorage//1.获取实例化storage对象，比较大5兆，不主动右键删除会永久缓存；除非清除缓存或用代码删掉；
    // // 2.在goodslist.html的picture_edit设置localstorage；storage.setItem();
	// alert(storage.getItem("updateId"))//3.添加缓存；获取用getItem;哪里用哪里取；



/*图片-编辑*/
function picture_edit(title,url,id){
    let storage=window.localStorage;//1.获取实例化storage对象，比较大5兆，不主动右键删除会永久缓存；除非清除缓存或用代码删掉；
    // // 2.在goodslist.html的picture_edit设置localstorage；storage.setItem();
	// alert(storage.getItem("updateId"))//3.添加缓存；获取用getItem;哪里用哪里取；

    //  storage.setItem("updateId",id)//添加缓存
     storage.setItem("updateName",name);
     $("#name").val(storage.getItem("updateName"));
    //  alert(storage.getItem("updateName"));
	var index = layer.open({
		type: 2,
		title: title,
		content: url
	});
    layer.full(index);
    
};




let rootpath = 'http://39.105.14.239:3000';
// .获取商品列表并渲染
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


// 图片上传
let upload = false //当前图片上传状态
function ajaximg() {
    let data = new FormData();
    let file = $('#file')[0]['files'][0]
    data.append('test', file)
    $.ajax({
        url: rootpath + '/setting/img',
        type: 'POST',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        success: function (data) {
            console.log(data)
            if (data.err == 0) {
                //显示缩略图
                $('#uploadimg').attr('src', rootpath + data.data)
                //更改图片的上传状态
                upload = data.data; //改成相对路径的字符串即为true;
                console.log(upload);
            } else {
                alert(data.msg)
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            //    document.getElementById("status").innerHTML = "<span style='color:#EF0000'>连接不到服务器，请检查网络！</span>";
        }
    });
}


//form表单整体 上传 接口
function goodsadd() {
    // 先获取到图片地址，前提是先上传图片
    if (upload) {
        let url = rootpath + '/setting/addGood'
        let data = {
            //addGoods参数
            name: $('#name').val(),
            type: $('#type').val(),
            price: $('#price').val(),
            imgpath: upload
        }

        $.post(url, data, function (res) {
            if (res == "success") {               
                // 重新加载goodslist页面渲染新加入的商品信息
                getShowList();
                // 框架的跳回原页面方法
                //刷新页面goodslist页面
                window.parent.location.reload(true);
                // location.href="goods-list.html";

                //如果提交审核成功，跳回首页goodslist（因为该框架的方法不是Location.href无法使用该方法，goodsadd依然为goodslist页面，用的是父级子级页面层，js中引用的，直接引用）
                layer_close();

            } else {
                //如果提交审核失败提示重新填写
                alert("上传失败请重试")
            }
        })
    } else {
        alert('请先上传图片')
    }
}



 // 修改商品  
function updateGood(){
    let url=rootpath+'/setting/updateGood'
    console.log(url);
    // {name,desc,price}
    $name = $('#name').val();
    $price = $('#price').val();
    $desc = $('#desc').val();
    $type = $('#type').val();
    $stock = $('#stock').val();
    $imgpath = upload;
    console.log($imgpath);
    // $.post(rootpath+'/goods/updateGoods',{id:id,name:$name,price:$price,desc:$desc},function(res){
    $.post(url,{name:$name,price:$price,desc:$desc,type:$type,stock:$stock,imgpath:$imgpath},function(res){
        console.log(res);
        if(res=="success"){
            alert("修改成功");
            console.log(res.data);            
            // 框架的跳回原页面方法
            //刷新页面goodslist页面
            window.parent.location.reload(true);
            // 关闭修改弹窗
            layer_close();
        }
    });
} 



