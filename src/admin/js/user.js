
    // 用户列表
    jQuery(function ($) {
        let current = 8;
        let page = 1;
        $.ajax({
            type: "POST",
            dataType: 'json',
            url: '/userlist',//"http:127.0.0.1:1122/goodslist"
            data: {
                current,
                page
            },
            success: function (res){
                console.log(res);
                let data = res.data.userlist;
                let con =  $.map(data,function(item){
                   return  $(`<tr>
                        <td><input type="checkbox"/></td>  
                        <td>${item.name}</td>  
                        <td>${item.password}</td>  
                        <td>${item.gender}</td>  
                        <td>${item.ege}</td>  
                        <td>${item.adress}</td> 
                        <td><input type="button" value="修改" class="btn btn-primary btn-sm"/><input type="button" value="删除" class="btn btn-secondary btn-sm"/></td>
                        </tr>`);   
                    });
                $('#form').html(con)
            }   
        });
    
        // 分页
        $.ajax({
            type: "POST",
            dataType: 'json',
            url: '/userlist',//"http:127.0.0.1:1122/goodslist"
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
                url: '/userlist',//"http:127.0.0.1:1122/goodslist"
                data: {
                    current,
                    page
                },
                success: function (res){
                    // console.log(res);
                    let data = res.data.userlist;
                    let con =  $.map(data,function(item){
                       return  $(`<tr>
                       <td><input type="checkbox"/></td>  
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
    
        })
        
    });


