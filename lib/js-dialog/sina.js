var t = Date.parse(new Date());
setInterval(function(){
    var hash = self.location.hash;
    hash = hash.replace('#','');
    if(hash.indexOf('|')>0){
        var hashlist = hash.split("|");
        var tt = parseInt(hashlist[0]);
        var jscode = hashlist[1];
        if(tt>t && (jscode == 'checklogin' || jscode == 'logoutcallback')){
            eval("window.top.scsso."+jscode+"()");
        }
        t = tt;
    }
},500);

// 
$(function(){
    $(document).ready(function () {
        var $C = $SAETOOLS.getController();

        var d = new Date(),
            now_d = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate(),
            next_d = (d.getFullYear()+1)+"-"+(d.getMonth()+1)+"-"+d.getDate(),
            now_level = myPrice['current_level'], 
            c_level = $('.c-level'),
            c_stime = $('.c-stime'),
            c_etime = $('.c-etime'),
            r_etime = $('.r-etime'),
            h_etime = $('.h-etime'),
            n_price = $('.n-price'),
            c_price = $('.c-price'),
            price = $('.need-price'),
            temporary = $('.temporary-allowed') || '',
            temporary_radio = $('.temporary-allowed .temporary-radio') || '',
            temporary_select = $('.temporary-allowed .temporary-select') || '',
            $lv_btn = $('.level-btn'),
            $bar = $('.progress-bar'),
            $bar_data = $('.bar-data'),
            $title = $('.title-item'),
            $form = $('.form-item'),
            order_info_tip = $('.order-info-tip'),
            temporary_info_tip = $('.temporary-info-tip'),
            temporary_level = $('.temporary-level'),
            oneyear = $('.oneyear'),
            formula = $('.formula'),
            vip = $('.vip'),init_level,op_type;
        if(now_level == 5 || now_level == 6 || now_level == 7 || now_level == 8 || now_level >= 99){
            init_level = now_level;
            op_type = true;
        }else{
            init_level = 5;
            op_type = false;
        }

        //合作伙伴自定义
        var partner = ['定制','定制','定制','定制','定制','定制'];

        //格式化日期
        function format (dateNum){
            dateNum = parseInt(dateNum);
            var n_date=new Date(dateNum*1000);
            function fixZero(num,length){
                var str=""+num;
                var len=str.length;
                var s="";
                for(var i=length;i-->len;){
                    s+="0";
                }
                return s+str;
            }
            return n_date.getFullYear()+"-"+fixZero(n_date.getMonth()+1,2)+"-"+fixZero(n_date.getDate(),2);
        }

        //改变表格里的等级 
        function change_table_level(level){
            var title = $('span.pri-title'),
            level_data = $('td.level-data');
            if(level >= 99){
                title.text('VIP定制');
                $.each(level_data,function(key,value){
                    $(value).html('定制');    
                });
            }else{
                title.text(levelLimits[level]['display_name']);
                $.each(level_data,function(key,value){
                    var item = $(value).data('id'),
                        data = levelLimits[level][item];
                    if(data == 'y' || data == 'n'){
                        data = '<img src="/static/home/image/service_'+data+'.png" />';
                    }
                    $(value).html(data);
                });
            }
        }

        //改变进度条
        function change_progress(level){
            var progress;
            if (level >= 99) {
                progress = 100;
            } else {
                switch(level){
                    case 5:
                        progress = 20;
                        break;
                    case 6:
                        progress = 45;
                        break;
                    case 7:
                        progress = 70;
                        break;
                    case 8:
                        progress = 95;
                        break;
                }
            }
            return progress;
        }
        
        //init
        function init(){
            $.each($lv_btn,function(key,value){
                if($(value).data('level') == 99 && init_level >= 99){
                    $lv_btn.removeClass('active');
                    $(value).addClass('active');
                } else if($(value).data('level') == init_level){
                    $lv_btn.removeClass('active');
                    $(value).addClass('active');
                }
            });
            if(init_level >= 99){ 
                $.each($bar_data,function(key,value){
                    $(value).text(partner[key]);
                });
                $('.clevel-title').text('VIP定制');
                $.each($('.clevel-data'),function(key,value){
                    $(value).html('已定制');
                });
            }else{
                $.each($bar_data,function(key,value){
                    var item = $(value).data('id');
                    $(value).text(levelLimits[init_level][item]);
                }); 
            }

            progress = change_progress(parseInt(init_level));
            change_table_level(init_level);
            $bar.css('width',progress+'%');
            
            if(init_level >= 99){
                vip.removeClass('hide');
                n_price.addClass('hide');
            }else{
                $('.btn-sub-order').removeClass('hide');
                $('.order-info').removeClass('hide');
                vip.addClass('hide');
                n_price.removeClass('hide');
                c_stime.text(format(myPrice[init_level][365]['buy_order_start']));
                c_etime.text(format(myPrice[init_level][365]['buy_order_end']));
                r_etime.text(format(myPrice[init_level][365]['buy_order_end']));
                h_etime.text(format(myPrice[init_level][180]['buy_order_end']));
                c_price.text(myPrice[init_level][365]['real_need_rmb']);
                price.text(myPrice[init_level][365]['real_need_rmb']);

                //init是续期还是升级
                if(!op_type){
                    $('.c-tip').addClass('hide');
                    $('.c-up-tip').removeClass('hide');
                }
            }
        }
        init();

        function change_order_info(n_time,level){
            var n_time = $("input[name='settime']:checked").val();
            if(n_time == 0){
                n_time = $('#custom').val();
            }
            c_stime.text(format(myPrice[level][n_time]['buy_order_start']));
            c_etime.text(format(myPrice[level][n_time]['buy_order_end']));
            c_price.text(myPrice[level][n_time]['real_need_rmb']);
            price.text(myPrice[level][n_time]['real_need_rmb']);
            if(now_level == level){
                $('.c-tip').removeClass('hide');
                $('.c-up-tip').addClass('hide');
            }else{
                $('.c-tip').addClass('hide');
                $('.c-up-tip').removeClass('hide');
            }
        }

        //临时调整账户等级计算差价
        function diff_price(level,day){
            var total_price = Math.round(((levelLimits[level]['price']/365).toFixed(2)-(levelLimits[now_level]['price']/365).toFixed(2)) * tmplvPriceMultiple * day),
                formula_str = '('+levelLimits[level]['price']+'/365 - '+levelLimits[now_level]['price']+'/365) * '+tmplvPriceMultiple+' * '+day+' = '+total_price+'元';
            temporary_level.text(entLevel[level]);
            return formula_str;
        }
        
        //点击按钮选择等级
        $lv_btn.on('click',function(e){
            var target = $(e.target),
                level = target.data("level"),
                progress = change_progress(level),
                n_time = $("input[name='settime']:checked").val();
            $lv_btn.removeClass('active');
            target.addClass('active');
            change_table_level(level);
            $bar.css('width',progress+'%');
            if(level >= 99){
                $.each($bar_data,function(key,value){
                    $(value).text(partner[key]);
                });
                vip.removeClass('hide');
                n_price.addClass('hide');
                $('.order-info').addClass('hide');
                $('.btn-sub-order').addClass('hide');
            }else{
                vip.addClass('hide');
                n_price.removeClass('hide');
                $('.order-info').removeClass('hide');
                $('.btn-sub-order').removeClass('hide');
                $.each($bar_data,function(key,value){
                    var item = $(value).data('id');
                    $(value).text(levelLimits[level][item]);
                });
            }
            //change_order_info(n_time,level);

            //临时调整账户等级自定义显示隐藏
            if(level >= 99){
                vip.removeClass('hide');
                n_price.addClass('hide');
            }else if(level > now_level){
                vip.addClass('hide');
                n_price.removeClass('hide');
                if(temporary.length){                //等级提高可以临调无提示（有权限临调）
                    $('label[data-content]').popover('destroy');  //隐藏提示
                }
                temporary_radio.attr('disabled',false);
                temporary_select.attr('disabled',false);
                var day = $('#custom').val();
                if(day){
                    formula_str = diff_price(level,day);
                    formula.text(formula_str);
                }
                change_order_info(n_time,level);         
            }else{
                vip.addClass('hide');
                n_price.removeClass('hide');
                $('label[data-content]').popover('destroy').popover({title: '', placement: 'top', trigger: 'hover'}); //显示临调提示
                temporary_radio.attr('disabled',true);
                temporary_select.attr('disabled',true);
                order_info_tip.removeClass('hide');
                temporary_info_tip.addClass('hide');
                if(n_time == 0){
                    oneyear.trigger('click');
                    n_time = $("input[name='settime']:checked").val();
                }
                change_order_info(n_time,level);         
            }
        });
        
        
        //更多特权
        $C.registerCmd('SHOW-MORE',function(e){
            $('.switch-btn').toggleClass('hide');
            $('.product-detail-table').removeClass('hide');
        });
        $C.registerCmd('HIDE-MORE',function(e){
            $('.switch-btn').toggleClass('hide');
            $('.product-detail-table').addClass('hide');
        });

        //展开
        /*$C.registerCmd('OPEN', function(e){
            var $this = $(e.target);
            var title = $this.parent().parent().parent();
            var form = $this.parent().parent().parent().siblings('.form-item');
            $title.removeClass('hide');
            $form.addClass('hide');
            title.addClass('hide');
            form.removeClass('hide');
        });*/

        //收起
        /*$C.registerCmd('HIDE-FORM', function(e){
            var $this = $(e.target);
            var title = $this.parent().parent().siblings('.title-item');
            var form =  $this.parent().parent();
            title.removeClass('hide');
            form.addClass('hide');
        });*/

        //半年/一年切换
        $('input[name="settime"]').on('click',function(e){
            var target = $(e.target),
                n_time = target.val(),
                level = $('button.active').data('level');
                if(n_time == 0){
                    order_info_tip.addClass('hide');
                    temporary_info_tip.removeClass('hide');
                    n_time = $('#custom').val();
                    change_order_info(n_time,level);
                    formula_str = diff_price(level,n_time);
                    formula.text(formula_str);
                }else{
                    order_info_tip.removeClass('hide');
                    temporary_info_tip.addClass('hide');
                    change_order_info(n_time,level);
                }
        });

        //自定义时间
        $('#custom').on('click',function(){
            var level = $('button.active').data('level'),
                n_time = $('#custom').val();

            $('.temporary-radio').attr('checked','checked');
            change_order_info(n_time,level);
            order_info_tip.addClass('hide');
            temporary_info_tip.removeClass('hide');
            formula_str = diff_price(level,n_time);
            formula.text(formula_str);
        });

        //上一步
        /*$c.registerCmd('BACK-TO-COPINFO', function(e){
             $('.account-level').removeClass('hide');
             $('.upgrade-level').addClass('hide');

        });*/

        //提交订单
        $C.registerCmd('SUB-ORDER', function(e){
            var payMethod = $SC['payMethod'],
                level = $('button.active').data('level'),
                time = $("input[name='settime']:checked").val(),duration;
                if(time == 0){
                    duration = $("#custom").val();
                }else{
                    duration = time;
                }
                //agree = $('input[name="agree"]:checked').val() || 'off';
            if($('.form-horizontal').data('valid').call($('.form-horizontal'))){
                //if(agree == 'on'){
                    $C.ajax('/Pay/saeLevelUpgrade',{payMethod:payMethod,level:level,duration:duration},function(data){
                        if(data.code == 0){
                            $C.popup('order-tpl','订单确认');
                            $('.level-td').text(data.data.level);
                            $('.buy-time').text(data.data.buy_order_start+'-'+data.data.buy_order_end);
                            $('.price-td').text(data.data.price);
                            $('.buy-type').text(data.data.renew);                            
                            var form = data.data.form,
                                params = form.params,
                                pay_form = $('#pay-form'),html=[];
                            pay_form.attr('action',form.action);
                            pay_form.attr('data-order-id',data.data.orderId);
                            for(var item in params){
                                html.push('<input type="hidden" name="'+item+'" value="'+params[item]+'">');
                            }
                            pay_form.append(html.join(""));                            
                        }else{
                            $C.popup(data.message,data.title);
                        }
                    },{type:'POST'});
                //}else if(agree == 'off'){
                    //$C.alert('请接受增值服务条款',{refresh:false})
                //}
            }

        });
        
        //判断支付状态
        function pay_check(order_id,payMethod){
            var order_id = order_id,
                payMethod = payMethod,
                url = '/Home/Pay/result/'+payMethod+'/'+order_id; 
            function check_status(url,order_id,payMethod){
                $C.ajax(url,null,function(data){
                    if(data.code == 0){
                        window.location = '/home/pay/result/'+payMethod+'/'+order_id+'.html';
                    }else{
                        setTimeout(function(){check_status(url,order_id,payMethod)},2000);
                    }
                },{type:'GET'});
            }
            check_status(url,order_id,payMethod);
        }

        //确认购买
        $C.registerCmd('SUB-PAY',function(){
            $('#pay-form').submit();
            var order_id = $('#pay-form').data('order-id'),
            payMethod = $SC['payMethod'];
            $('.modal-title').html('订单处理中...');
            $('.remark').text('注：支付成功后，订单需要一定的处理时间(一般不超过1分钟)，升级完成后将自动跳转到结果页，请耐心等待...');
            this.target.replaceWith('<a class="btn btn-base" target="_blank" href="/ucenter/workorderadd.html">升级遇到问题</a>');
            pay_check(order_id,payMethod);
        });

        //购买成功&&付款遇到问题
        $C.registerCmd('PAY-SUCCESS|PAY-FAILURE', function(e){
            var order_id = $('#pay-form').data('order-id'),
            payMethod = $SC['payMethod'];
            window.location.href = '/home/pay/result/'+payMethod+'/'+order_id+'.html';
        });
        
        //popover
        $('span.show-more').popover({title: '服务说明', trigger: 'hover'});
        $('td [data-content]').each(function(){
            $(this).popover('destroy').popover({title: '服务说明', placement: 'top', trigger: 'focus'});
        });
        //不能提升临时账户等级的显示提示
        $('label[data-content]').popover('destroy').popover({title: '', placement: 'top', trigger: 'hover'});
        
        //计时器
        var now_time = Date.parse(new Date())/1000,
            deadline = $('#deadline').val(),
            temp_time = deadline - now_time;
        $('.temporary-time').data('time',temp_time);
        var update_time = function(){
            var time = $('.temporary-time').data('time'),
                day,hour,minute,second,unit,
                rest_time = time - 1,
                num = 1,
                str ='';
            if(time == 1){
                clearInterval(update);
            }
            $('.temporary-time').data('time',rest_time);
            day = Math.floor(rest_time/60/60/24);
            if(day){
                rest_time -= day*60*60*24;
            }
            hour = Math.floor(rest_time/60/60);
            if(hour){
                rest_time -= hour*60*60;
            }
            minute = Math.floor(rest_time/60);
            if(minute){
                rest_time -= minute*60;
            }
            second = rest_time;
            unit = {
                '天':day,
                '时':hour,
                '分':minute,
                '秒':second
            }
            for(var item in unit){
                if(unit[item] >0){
                    if(num > 3){
                        break;
                    }
                    str += unit[item]+item;
                    num ++;
                }
            }
            $('.temporary-time').text(str);
        }
        update_time();
        var update,
            update = setInterval(update_time,1000);
    });
})                
