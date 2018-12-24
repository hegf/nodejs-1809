jQuery(function ($) {
    // 商品列表
    let current = 5;
    let page = 1;
    $.ajax({
        type: "POST",
        dataType: 'json',
        url: '/orderlist',//"http:127.0.0.1:1122/goodslist"
        data: {
            current,
            page
        },
        success: function (res){
            // console.log(res);
            let data = res.data.goodslist;
            let con =  $.map(data,function(item,index){
               return  $(`<tr>
                    <td><input type="checkbox"/></td> 
                    <td class="idx">${item._id}</td>  
                    <td>${item.name}</td>    
                    <td>${item.price}</td>  
                    <td>${Math.floor(Math.random()*10)}</td>
                    <td>${Math.floor(Math.random()*20)}</td>
                    <td>${item.price*Math.floor(Math.random()*10)}</td>
                    <td>${(item.price*Math.floor(Math.random()*10))+(Math.floor(Math.random()*20))}</td>
                    <td>${item.times}</td> 
                    <td><input type="button" value="删除" class="btn btn-secondary btn-sm del"/></td>
                    </tr>`);   
                });
            $('#form').html(con)
        }   
    });

    // 分页
    $.ajax({
        type: "POST",
        dataType: 'json',
        url: '/orderlist',//"http:127.0.0.1:1122/goodslist"
        data: {},
        success: function (res){
            // console.log(res)
            let current = 8;
            let num = Math.ceil(Number(res.data.total)/Number(current));
           for(let i=0;i<num;i++){
            $("#pagelist").append(`<li class="page-item pg">
                <span class="page-link">${i+1}</span></li>`);
            };     
        }
    });

    $("#form").on('click','.pg',function(e){
    let page = $(this).text();
    let current = 5;
        $.ajax({
            type: "POST",
            dataType: 'json',
            url: '/orderlist',//"http:127.0.0.1:1122/goodslist"
            data: {
                current,
                page
            },
            success: function (res){
                // console.log(res);
                let data = res.data.goodslist;
                let con =  $.map(data,function(item){
                   return  $(`<tr>
                   <td><input type="checkbox"/></td> 
                   <td class="idx">${item._id}</td>  
                   <td>${item.name}</td>    
                   <td>${item.price}</td>  
                   <td>${Math.floor(Math.random()*10)}</td>
                   <td>${Math.floor(Math.random()*20)}</td>
                   <td>${item.price*Math.floor(Math.random()*10)}</td>
                   <td>${(item.price*Math.floor(Math.random()*10))+(Math.floor(Math.random()*20))}</td>
                   <td>${item.times}</td> 
                   <td><input type="button" value="删除" class="btn btn-secondary btn-sm del"/></td>
                   </tr>`);   
                    });
                $('#form').html(con);
            }
        })

    });
    
    // 删除
    $('.mainshow').on('click','.del',function(){
        if (window.confirm('确认删除')) {
        let $tr = $(this).parent().parent();
        let idx = $tr.find('.idx').text();console.log(idx)
        $.ajax({
            type: "GET",
            dataType: 'json',
            url: '/orderlist/onedel',//"http:127.0.0.1:1122/goodslist"
            data: {
               idx
            },
            success: function (res){
                console.log(res)
                if (res.status == 1) {
                    location.replace(location);
                }
                if (res.status != 1) {
                    alert('删除失败:' + data.err);
                    return;
                };
            }
        })}
    });

    // 批量删除
    $('.mainshow').on('click','.all',function(){
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
                        type: "GET",
                        dataType: "json",
                        url: '/orderlist/numdel',
                        data: {
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

    // 全选与复选
    $('.mainshow').on('click', '.allcheck', function () {
        // console.log(666);
        selectAll()

        function selectAll() {
            // console.log(1);
            // console.log($(".all").prop("checked"));
            if ($(".allcheck").prop("checked")) {
                // console.log(2);           
                $("input[type='checkbox']").prop("checked", true); //全选
            } else {
                // console.log(3);               
                $("input[type='checkbox']").prop("checked", false); //取消全选     
            }
        };
    });

});