jQuery(function ($) {
    // 商品列表
    let current = 5;
    let page = 1;
    $.ajax({
        type: "POST",
        dataType: 'json',
        async:false,
        url: '/goodslist', //"http:127.0.0.1:1122/goodslist"
        data: {
            current,
            page
        },
        success: function (res) {
            // console.log(res);
            let data = res.data.goodslist;
            let con = $.map(data, function (item) {
                return $(`<tr>
                    <td><input type="checkbox" class="check"/></td>  
                    <td class="idx">${item._id}</td>  
                    <td>${item.name}</td>  
                    <td>${item.type}</td>  
                    <td>${item.price}</td>  
                    <td>${item.desc}</td> 
                    <td>${item.kucun}</td> 
                    <td>${item.times}</td> 
                    <td><input type="button" value="修改" class="btn btn-primary btn-sm change" id="change"/><input type="button" value="删除" class="btn btn-secondary btn-sm" id="del"/></td>
                    </tr>`);
            });
            $('#form').html(con);
        }
    });

    // 分页
    $.ajax({
        type: "POST",
        dataType: 'json',
        async:false,
        url: '/goodslist', //"http:127.0.0.1:1122/goodslist"
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
        let current = 5;
        $.ajax({
            type: "POST",
            dataType: 'json',
            url: '/goodslist', //"http:127.0.0.1:1122/goodslist"
            data: {
                current,
                page
            },
            success: function (res) {
                // console.log(res);
                let data = res.data.goodslist;
                let con = $.map(data, function (item) {
                    return $(`<tr>
                    <td><input type="checkbox" class="check"/></td>  
                    <td class="idx">${item._id}</td>  
                    <td>${item.name}</td>  
                    <td>${item.type}</td>  
                    <td>${item.price}</td>  
                    <td>${item.desc}</td> 
                    <td>${item.kucun}</td> 
                    <td>${item.times}</td> 
                    <td><input type="button" value="修改" class="btn btn-primary btn-sm change" id="change"/><input type="button" value="删除" class="btn btn-secondary btn-sm" id="del"/></td>
                    </tr>`);
                });
                $('#form').html(con);
            }
        })

    })

    // 点击修改  
    $("#form").on('click', "#change", function () {
        let id = $(this).parent().parent().children('.idx').text();
        //   console.log(id)
        // 保存当前商品id
        localStorage.setItem("_id", id);
        let _id = localStorage.getItem("_id");
        $.ajax({
            type: "POST",
            dataType: "json",
            async:false,
            url: '/goodsxiugai',
            data: {
                _id
            },
            success: function (res) {
                // console.log(res.data[0])
                $('.mainshow,.pg').remove();
                let data = res.data[0];
                $('.changeafter').html(`
                <div class="bs-example bs-example-form newmain" role="form">
                    <div class="input-group">
                        <span class="input-group-addon">商品名称:</span>
                        <input type="text" class="form-control name" placeholder="商品名称" value="${data.name}">
                    </div><br>
                    <div class="input-group">
                        <span class="input-group-addon">商品类型:</span>
                        <input type="text" class="form-control type" placeholder="商品类型"value="${data.type}">
                    </div><br>
                    <div class="input-group">
                        <span class="input-group-addon">商品价格:</span>
                        <input type="text" class="form-control price" placeholder="商品价格"value="${data.price}">
                    </div><br>
                    <div class="input-group">
                        <span class="input-group-addon">商品说明:</span>
                        <input type="text" class="form-control desc" placeholder="商品说明"value="${data.desc}">
                    </div><br>
                    <div class="input-group">
                        <span class="input-group-addon">现库存量:</span>
                        <input type="text" class="form-control kucun" placeholder="库存量"value="${data.kucun}">
                    </div><br>
                    <div class="input-group">
                        <span class="input-group-addon">入库时间:</span>
                        <input type="text" class="form-control times" placeholder="入库时间"value="${data.times}">
                    </div>
                    <span class="btn btn-primary btn-lg" id="yes">确认</span>
                    <span class="btn btn-secondary btn-lg" id="non">取消</span>
                </div>
                `);
                $('.newmain').css({'margin':'20px'});
                $('.newmain span').css({'margin-right':'20px'});
                $('#yes,#non').css({'margin-top':'40px','margin-left':'60px'});
            }
        })
    
        // 保存修改后的信息发送给后端
        $('#yes').on('click',function(){ 
            $.ajax({
                type: "POST",
                dataType: "json",
                async:false,
                url: '/upgoods',
                data: {
                    _id:localStorage.getItem("_id"),
                    name:$('.name').val(),
                    type:$('.type').val(),
                    price:$('.price').val(),
                    desc:$('.desc').val(),
                    kucun:$('.kucun').val(),
                    times:$('.times').val()
                },
                success: function(res){
                    // console.log(res);
                    if(res.status == 1){
                        window.confirm('修改成功');
                        location.href = './goodslist.html';
                    };
                    if(res.status != 1){
                        window.confirm('修改失败:'+data.err);
                        return;
                    };
                }
            });
        });
        $('#non').on('click',function(){
            location.href = './goodslist.html';
        }) 
    });

    // 删除
    $('#form').on('click','#del',function(){
        let _id = $(this).parent().parent().children('.idx').text();
        if(window.confirm('确认删除')){
        $.ajax({
            type: "POST",
            dataType: "json",
            url: '/onedel',
            data:{_id},
            success: function(res){
                    if(res.status == 1){
                        location.replace(location);
                    }
                    if(res.status != 1){
                        alert('删除失败:'+data.err);
                        return;
                    };
                }
            });
        }
    });
    
    // 添加商品
    $('#addgoods').on('click','#add',function(){
        $('.addgoods,.pg').remove();
                $('.changeafter').html(`
                <div class="bs-example bs-example-form newmain" role="form">
                    <div class="input-group">
                        <span class="input-group-addon">商品名称:</span>
                        <input type="text" class="form-control name" placeholder="商品名称" value="">
                    </div><br>
                    <div class="input-group">
                        <span class="input-group-addon">商品类型:</span>
                        <input type="text" class="form-control type" placeholder="商品类型"value="">
                    </div><br>
                    <div class="input-group">
                        <span class="input-group-addon">商品价格:</span>
                        <input type="text" class="form-control price" placeholder="商品价格"value="">
                    </div><br>
                    <div class="input-group">
                        <span class="input-group-addon">商品说明:</span>
                        <input type="text" class="form-control desc" placeholder="商品说明"value="">
                    </div><br>
                    <div class="input-group">
                        <span class="input-group-addon">现库存量:</span>
                        <input type="text" class="form-control kucun" placeholder="库存量"value="">
                    </div><br>
                    <div class="input-group img">
                        <input name="url" type="file" class="picpath"/>
                        <div class="showpic"></div>
                    </div>
                    <div class="ynbtn">
                    <p class="ok">上传成功</p>
                    <span class="btn btn-dark" id="addpicbtn">上传</span>
                    <span class="btn btn-primary btn-lg" id="yes">确认</span>
                    <span class="btn btn-secondary btn-lg" id="non">取消</span>
                    </div>
                </div>
                `);
                $('.img').css({'padding-top':'8px','padding-left':'9%'})
                $('.newmain').css({'margin':'20px'});
                $('.newmain span').css({'margin-right':'20px'});
                $('.ynbtn').css({'position':'absolute','bottom':'0px','left':'50%'});
                $('.ok').css({'color':'red','font-size':'24px','display':'none'});
                // 图片上传,
                $('#addpicbtn').on('click',function(){
                    // console.log($("#addpic")[0].files)
                        let formData = new FormData();
                        let file = $(".picpath")[0].files[0];
                        formData.append('test',file)
                        $.ajax({
                            type: "POST",
                            cache:false,
                            contentType:false,
                            processData:false,
                            async:false,
                            url: '/addpics',
                            data: formData,
                            success: function(res){
                                console.log(res)
                                if(res.err == 0){
                                    $('#addpicbtn').css({'display':'none'});
                                    $('img').remove();
                                    $('.ok').show(1500).hide(1000);
                                    $('.picpath').val('');
                                }else{
                                    $('.ok').show(100).html('上传失败');
                                }
                            }
                    });                   
                });

                // 图片略缩展示
                   $('.picpath').on('change',function(){
                       console.log(666);
                       preview(this);
                    })
                    function preview(file) {
                        var prevDiv = $(file).parent().find('.preview');
                          var reader = new FileReader();
                          reader.onload = function(evt){
                                $('.showpic').html('<img src="' + evt.target.result + '" />');
                                $('img').css({'width':'150px','height':'150px','position':'absolute','left':'30%'});
                          }
                          reader.readAsDataURL(file.files[0]);
                            }
                        

                // 点击确定将商品信息传给后端
                $('.changeafter').on('click','#yes',function(){
                $.ajax({
                    type: "POST",
                    dataType: "json",
                    async:false,
                    url: '/addgoods',
                    data: {
                        name:$('.name').val(),
                        type:$('.type').val(),
                        price:$('.price').val(),
                        desc:$('.desc').val(),
                        kucun:$('.kucun').val(),
                        times:(new Date()).toLocaleDateString()
                    },
                    success: function(res){
                        if(res.status == 1){
                            window.confirm('添加成功');
                            location.reload();
                        };
                        if(res.status != 1){
                            window.confirm('添加失败:'+data.err);
                            return;
                        };
                    }
                });
            });
            $('.changeafter').on('click','#non',function(){
                window.history.go(0);
            })
    });


    // 批量删除
    $('.mainshow').on('click','#numdel',function(){
        $form = $(this).parent().parent().find('#form');
        $td = $form.find("input[type=checkbox]:checked");
        $tr = $td.parent().parent().find('.idx');
        // console.log($tr);
        let arr = [];
        $.each($tr,function(index,value){
            // console.log(value)
            arr.push(value);
        });
        if(arr!=''){
        if(window.confirm('确认删除')){
       let item = arr.map(function(item){
            $.ajax({
                type: "POST",
                dataType: "json",
                url: '/numdel',
                data: {id:item.innerText},
                success:function(res){
                    if(res.status == 1){
                        location.replace(location);
                    }else{
                        alert('删除失败:'+res.err);
                        return; 
                    }
                }   
            })
        })}};
    });

    // 模糊查询
    $('.search').on('click','.srh_btn',function(){
        if($('.srh').val() != ''){
        $.ajax({
            type: "POST",
            dataType: "json",
            async:false,
            url: '/search',
            data: {
                con:$('.srh').val()
            },
            success:function(res){
                if(res.status == 1){
                    $('#form').html('');
                    let data = res.data;
                    let con = $.map(data, function (item) {
                        return $(`<tr>
                            <td><input type="checkbox" class="check"/></td>  
                            <td class="idx">${item._id}</td>  
                            <td>${item.name}</td>  
                            <td>${item.type}</td>  
                            <td>${item.price}</td>  
                            <td>${item.desc}</td> 
                            <td>${item.kucun}</td> 
                            <td>${item.times}</td> 
                            <td><input type="button" value="修改" class="btn btn-primary btn-sm change" id="change"/><input type="button" value="删除" class="btn btn-secondary btn-sm" id="del"/></td>
                            </tr>`);
                    });
                    $('#form').html(con);
                    $("#pagelist").html('');
                }
            }
        });
    }});

    //点击全选
    $('#table').on('click','.all',function(){
        selectAll()
        function selectAll(){ 
            // console.log(1);
            // console.log($(".all").prop("checked"));
            if ($(".all").prop("checked")) { 
                // console.log(2);           
                $("input[type='checkbox']").prop("checked",true);//全选
            } else { 
                // console.log(3);               
                $("input[type='checkbox']").prop("checked",false);  //取消全选     
            }  
        };
    });
    $('#table').on('click','.check',function(){
        if($(this).attr('checked',false)){
            if($('.all').attr("checked",true)){
            $('#table').find('.all').attr("checked",false);} 
        }
    });

    // 价格排序
    // 降序
    $('#table').on('click','.down',function(){
        let current = 5;
        let page = 1;
        $.ajax({
            type: "get",
            dataType: "json",
            async:false,
            url: '/sort/down',
            data: { 
                current,page   
            },
            success:function(res){
                let data = res.data;
                let con = $.map(data, function (item) {
                    return $(`<tr>
                        <td><input type="checkbox" class="check"/></td>  
                        <td class="idx">${item._id}</td>  
                        <td>${item.name}</td>  
                        <td>${item.type}</td>  
                        <td>${item.price}</td>  
                        <td>${item.desc}</td> 
                        <td>${item.kucun}</td> 
                        <td>${item.times}</td> 
                        <td><input type="button" value="修改" class="btn btn-primary btn-sm change" id="change"/><input type="button" value="删除" class="btn btn-secondary btn-sm" id="del"/></td>
                        </tr>`);
                });
                $('#form').html(con);
            }
        })    

    });

    // 升序
    $('#table').on('click','.up',function(){
        let current = 5;
        let page = 1;
        $.ajax({
            type: "get",
            dataType: "json",
            async:false,
            url: '/sort/up',
            data: { 
                current,page   
            },
            success:function(res){
                let data = res.data;
                let con = $.map(data, function (item) {
                    return $(`<tr>
                        <td><input type="checkbox" class="check"/></td>  
                        <td class="idx">${item._id}</td>  
                        <td>${item.name}</td>  
                        <td>${item.type}</td>  
                        <td>${item.price}</td>  
                        <td>${item.desc}</td> 
                        <td>${item.kucun}</td> 
                        <td>${item.times}</td> 
                        <td><input type="button" value="修改" class="btn btn-primary btn-sm change" id="change"/><input type="button" value="删除" class="btn btn-secondary btn-sm" id="del"/></td>
                        </tr>`);
                });
                $('#form').html(con);
            }
        })    

    })

    
});