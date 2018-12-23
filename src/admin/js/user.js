// 用户列表
jQuery(function ($) {
    let current = 5;
    let page = 1;
    $.ajax({
        type: "GET",
        dataType: 'json',
        url: '/userlist',
        data: {
            current,
            page
        },
        success: function (res) {
            // console.log(res);
            let data = res.data.userlist;
            let con = $.map(data, function (item) {
                return $(`<tr>
                        <td><input type="checkbox"/></td>  
                        <td class="idx">${item._id}</td>
                        <td class="name">${item.name}</td>  
                        <td class="psd">${item.password}</td>  
                        <td class="gender">${item.gender}</td>  
                        <td class="ege">${item.ege}</td>  
                        <td class="adress">${item.adress}</td> 
                        <td><input type="button" value="修改" class="btn btn-primary btn-sm" id="change"/><input type="button" value="删除" class="btn btn-secondary btn-sm" id="del"/></td>
                        </tr>`);
            });
            $('#form').html(con);
        }
    });

    // 分页
    $.ajax({
        type: "POST",
        dataType: 'json',
        url: '/userlist', //"http:127.0.0.1:1122/goodslist"
        data: {},
        success: function (res) {
            // console.log(res)
            let current = 5;
            let num = Math.ceil(Number(res.data.total) / Number(current));
            for (let i = 0; i < num; i++) {
                $("#pagelist").append(`<li class="page-item pg">
                    <span class="page-link">${i+1}</span></li>`);
            };
        }
    });
    $("#pagelist").on('click', '.pg', function (e) {
        let page = $(this).text();
        let current = 8;
        $.ajax({
            type: "POST",
            dataType: 'json',
            url: '/userlist', //"http:127.0.0.1:1122/goodslist"
            data: {
                current,
                page
            },
            success: function (res) {
                // console.log(res);
                let data = res.data.userlist;
                let con = $.map(data, function (item) {
                    return $(`<tr>
                       <td><input type="checkbox"/></td>  
                       <td class="idx">${item._id}</td>
                       <td>${item.name}</td>  
                       <td>${item.password}</td>  
                       <td>${item.gender}</td>  
                       <td>${item.ege}</td>  
                       <td>${item.adress}</td> 
                       <td><input type="button" value="修改" class="btn btn-primary btn-sm"/><input type="button" value="删除" class="btn btn-secondary btn-sm"/></td>
                       </tr>`);
                });
                $('#form').html(con);
            }
        })

    });

    // 全选和反选
    $('#table').on('click', '.all', function () {
        // console.log(666);
        selectAll()

        function selectAll() {
            // console.log(1);
            // console.log($(".all").prop("checked"));
            if ($(".all").prop("checked")) {
                // console.log(2);           
                $("input[type='checkbox']").prop("checked", true); //全选
            } else {
                // console.log(3);               
                $("input[type='checkbox']").prop("checked", false); //取消全选     
            }
        };
    });


    // 修改
    $("#form").on('click', "#change", function () {
        // 保存用户信息到sessionStoragr
        let obj = {
            _id: $(this).parent().parent().children('.idx').text(),
            name: $(this).parent().parent().children('.name').text(),
            psd: $(this).parent().parent().children('.psd').text(),
            gender: $(this).parent().parent().children('.gender').text(),
            ege: $(this).parent().parent().children('.ege').text(),
            adress: $(this).parent().parent().children('.adress').text()
        };
        let str = JSON.stringify(obj);
        sessionStorage.obj = str;
        let userStr = sessionStorage.obj;
        userStr = JSON.parse(userStr);
        // console.log(userStr)
        $('.mainshow').html(`
            <div id="main">
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="inputEmail4">用户名</label>
                <input type="text" class="form-control" id="inputEmail4" placeholder="${userStr.name}">
              </div>
              <div class="form-group col-md-6">
                <label for="inputPassword4">密码</label>
                <input type="password" class="form-control" id="inputPassword4" placeholder="${userStr.psd}">
              </div>
            </div>
            <div class="form-group">
              <label for="inputAddress">地址</label>
              <input type="text" class="form-control" id="inputAddress" placeholder="${userStr.adress}">
            </div>
              <div class="form-group col-md-4">
                <label for="inputState">性别</label>
                <select id="inputState" class="form-control">
                  <option selected>男</option>
                  <option>女</option>
                </select>
              </div>
              <div class="form-group col-md-2">
                <label for="inputZip">年龄</label>
                <input type="text" class="form-control" id="inputZip" placeholder="${userStr.ege}">
              </div>
            <button class="btn btn-primary userbtn">确认</button>
            <button class="btn" id="non">取消</button>
            </div>
            `);
        $('#main').css({
            'padding': '20px',
            'height': '500px'
        })

    })
    // 保存修改后的信息发送给后端
    $('#main').on('click', '.userbtn', function () {
        if ($('#inputEmail4').val() != '' || $('#inputPassword4').val() != '' || $('#inputZip').val() != '' || $('#inputAddress').val() != '') {
            $.ajax({
                type: "POST",
                dataType: "json",
                url: '/userlist',
                data: {
                    _id: localStorage.getItem("_id"),
                    name: $('#inputEmail4').val(),
                    password: $('#inputPassword4').val(),
                    gender: $('#inputState').val(),
                    ege: $('#inputZip').val(),
                    adress: $('#inputAddress').val()
                },
                success: function (res) {
                    console.log(res);
                    if (res.status == 1) {
                        window.confirm('修改成功');
                        location.href = './userlist.html';
                    };
                    if (res.status != 1) {
                        window.confirm('修改失败:' + data.err);
                        return;
                    }
                }
            })
        };
    });
    $('#main').on('click', '#non', function () {
        location.href = './userlist.html';
    });

    // 删除单个
    $('#form').on('click', '#del', function () {
        let id = $(this).parent().parent().children('.idx').text();
        console.log(id)
        // localStorage.setItem("_id", id);
        // let _id = localStorage.getItem("_id");
        if (window.confirm('确认删除')) {
            $.ajax({
                type: "delete",
                dataType: "json",
                url: '/userlist',
                data: {
                    _method: 'DELETE',
                    id: id
                },
                success: function (res) {
                    if (res.status == 1) {
                        location.replace(location);
                    }
                    if (res.status != 1) {
                        alert('删除失败:' + data.err);
                        return;
                    };
                }
            });
        }
    });

    // 批量删除
    $('.mainshow').on('click', '.deluser', function () {
        $total = $(this).parent().parent();
        $delAall = $total.find("input[type=checkbox]:checked").not('.all');
        $tr = $delAall.parent().parent().find('.idx');       
        let arr =[];
        $.each($tr,function(index,val){
            arr.push(val)
        });
        // console.log(arr)
        if(arr!=''){
            if(window.confirm('确认删除')){
                let item = arr.map(function(item){
                    $.ajax({
                        type: "delete",
                        dataType: "json",
                        url: '/userlist',
                        data: {
                            _method: 'DELETE',
                            id:item.innerText
                            },
                        success:function(res){
                            // console.log(res)
                            if(res.status == 1){
                                location.replace(location);
                            }else{
                                alert('删除失败:'+res.err);
                                return; 
                            }
                        }   
                    })
                })
            }};
        
    });

    // 用户添加
    $('.mainshow').on('click', '.adduser', function () {
        $('.mainshow').html(`
            <div id="adduser">
                <div style="height:60px">
                    <button style="margin-right:32px" type="button" class="btn btn-info">用户名</button>
                    <input type="text" placeholder="用户名" class="uname"/>
                </div>
                <div style="height:60px">
                    <button style="margin-right:50px" type="button" class="btn btn-info">密码</button>
                    <input type="text" placeholder="密码" class="psd"/>
                </div>
                <div style="height:60px">
                    <button style="margin-right:50px" type="button" class="btn btn-info">性别</button>
                    <select class="gender">
                        <option value ="男" selected>男</option>
                        <option value ="女">女</option>
                    </select>
                </div>     
                <div style="height:60px">
                    <button style="margin-right:50px" type="button" class="btn btn-info">年龄</button>
                    <input type="text" placeholder="年龄" class="ege"/>
                </div>
                <div style="height:60px">
                    <button style="margin-right:50px" type="button" class="btn btn-info">地址</button>
                    <input type="text" placeholder="地址" class="adress"/>
                </div>
                <div style="margin-top:30px;margin-left:200px;">
                    <button style="margin-right:50px"class="btn btn-info" id="yes">确认</button>
                    <button style="margin-right:50px" class="btn" id="non">取消</button>
                </div>
            </div>
         `);
        $('.uname,.psd,.ege,.adress').css({
            'width': '500px',
            'height': '40px'
        });
        $('.mainshow').on('click', '#yes', function () {
            if($('.uname').val()!=''&&$('.psd').val()!=''&&$('.gender').val()!=''&&$('.ege').val()!=''&&$('.adress').val()!=''){
            $.ajax({
                type: "PUT",
                dataType: "json",
                url: '/userlist',
                data: {
                    _method:'PUT',
                    name: $('.uname').val(),
                    password: $('.psd').val(),
                    gender: $('.gender').val(),
                    ege: $('.ege').val(),
                    adress: $('.adress').val()
                },
                success: function (res) {
                    if (res.status == 1) {
                        window.confirm('添加成功');
                        location.reload();
                    };
                    if (res.status != 1) {
                        window.confirm('添加失败:' + data.err);
                        return;
                    };
                }
            })};
        });
        $('.mainshow').on('click', '#non', function () {
            window.history.go(0);
        })

    })





});