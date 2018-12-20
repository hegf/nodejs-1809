// 正则验证表单
// var reg = {
        // user: /^[a-zA-Z]\w{4,9}$/, //用来判断用户名，第一位不能为数字，也就是小写字母或者大写字母，后面的内容\w表示字符（数字字母下划线 
        //要求是5-10位字符，所以出去第一位，还需要4-9位的\w    pwd:/^[\da-zA-Z]{6,18}$/,    //用来判断密码，html结构中要求是数字字符6到18位，\d表示数字    tel:/^1[34578]\d{9}$/,    //用来判断电话号码，通常手机号第一位为1，第二位只可能出现3.4.5.7.8，后面剩下的9位数字随机    mail:/^[1-9a-zA-Z_]\w*@[a-zA-Z0-9]+(\.[a-zA-Z]{2,})+$/,    //用来判断邮箱，通常邮箱没有以0开头的，所以第一位为1-9数字或者小写字母或者大写字母，第二位开始任意字符    //也可以只有第一位没有第二位，*表示至少0个，@后面同理，小写字母或者大写字母或者数字，.需要转意符，所以写成\.    //点后面通常是com或者cn或者com.cn，所以是小写字母或者大写字母至少两位    IDCard:/^[1-9]\d{16}[\dxX]$/,    //用来判断身份证，通常第一位不为零，所以取1-9的数字，中间的16位数字随机，最后一位要么是数字要么是X  };
    
        let user = new RegExp(/^[a-zA-Z]\w{3,9}$/);
        let password = new RegExp(/^[\da-zA-Z]{6,18}$/);

        // 用户名判断
        $("#uname").blur(function(){
            if(!user.test($("#uname").val())){
                $('.outuser').addClass('show');
                $(this).addClass('border');
                return;
            };  
            $("#uname").on('change',(function(){
                $(this).removeClass('border');
                $('.outuser').removeClass('show');
            }))
        });

        // 密码判断
        $("#psd").blur(function(){
            if(!password.test($("#psd").val())){
                $('.outpsd').addClass('show');
                $(this).addClass('border');
                return;
            }
            $("#psd").on('change',(function(){
                $(this).removeClass('border');
                $('.outpsd').removeClass('show');
            }))
        });


        // 重复密码验
        $('#repsd').blur(function () {
            if ($('#psd').val() != $(this).val()) {
                
                $('.outrepsd').addClass('show');
                $('#repsd').addClass('border');
                $("#psd").addClass('border');
                // event.preventDefault();
                return;
            }else{
                $('.outrepsd').removeClass('show');
                $('#repsd').removeClass('border');
                $('#psd').removeClass('border');
            }
        });

        $('.loginWraper').on('click', '.loginbtn', function () { 
            if($.trim($("#uname").val()) == '' || $.trim($("#psd").val())== ''){
                $('.err').removeClass('hide');
                $('#repsd').addClass('border');
                $("#psd").addClass('border');
                $('#uname').addClass('border');
                return;
            }else{
                $('.err').remove();
            }       
            let name = $.trim($("#uname").val());
            let password = $.trim($("#psd").val());
            $.ajax({
                type: 'POST',
                url: './login',
                dataType: 'json',
                data: {
                    name,
                    password
                },
                success: function (res) {
                    console.log(res);
                    if (res.status == 1) {
                        window.location.href = './index.html';
                    } else if (res.status == -1) {
                        window.alert('你输入的用户名或密码有误');
                    }
                }
            })
        })
        
        $('.nobtn').on('click',function(){
            location.replace(location);
        });

    $('body').mousedown(function(){
        $('.outrepsd').removeClass('show');
        $('.outpsd').removeClass('show');
        $('.outuser').removeClass('show');
        $('#repsd').removeClass('border');
        $('#psd').removeClass('border');
        $('#uname').removeClass('border');
        $('.err').addClass('hide');
    })