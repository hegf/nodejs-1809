jQuery(function ($) {
    // 商品列表
    let current = 8;
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
            console.log(res);
            let data = res.data.goodslist;
            let con =  $.map(data,function(item,index){
               return  $(`<tr>
                    <td><input type="checkbox"/></td> 
                    <td>${index+1}</td>  
                    <td>${item.name}</td>    
                    <td>${item.price}</td>  
                    <td>${Math.floor(Math.random()*10)}</td>
                    <td>${Math.floor(Math.random()*20)}</td>
                    <td>${item.price*Math.floor(Math.random()*10)}</td>
                    <td>${(item.price*Math.floor(Math.random()*10))+(Math.floor(Math.random()*20))}</td>
                    <td>${item.times}</td> 
                    <td><input type="button" value="删除" class="btn btn-secondary btn-sm"/></td>
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
            console.log(res)
            let current = 8;
            let num = Math.ceil(Number(res.data.total)/Number(current));
           for(let i=0;i<num;i++){
            $("#pagelist").append(`<li class="page-item pg">
                <span class="page-link">${i+1}</span></li>`);
            };     
        }
    });

    $("#pagelist").on('click','.pg',function(e){
    let page = $(this).text();
    let current = 8;
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
                   <td>${index+1}</td>  
                   <td>${item.name}</td>    
                   <td>${item.price}</td>  
                   <td>${Math.floor(Math.random()*10)}</td>
                   <td>${Math.floor(Math.random()*20)}</td>
                   <td>${item.price*Math.floor(Math.random()*10)}</td>
                   <td>${(item.price*Math.floor(Math.random()*10))+(Math.floor(Math.random()*20))}</td>
                   <td>${item.times}</td> 
                   <td><input type="button" value="删除" class="btn btn-secondary btn-sm"/></td>
                   </tr>`);   
                    });
                $('#form').html(con);
            }
        })

    })
    
});