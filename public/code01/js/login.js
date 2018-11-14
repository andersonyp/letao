
$(function () {
    // 功能1-实现字段校验
    /*
    *  校验规则
    *  1. 用户名不能为空
    *  2. 密码不能为空
    *  3. 用户密码长度为6-12位
    *  4. 用户min长度为2-6位
    * */
    $('#form').bootstrapValidator({
        // 1-设置校验规则
        fields: {
           username: {
               validators: {
                   // 验证不为空
                   notEmpty: {
                       message: '用户名不能为空'
                   },
                   // 验证长度
                   stringLength: {
                       min: 2,
                       max: 6,
                       message: '用户名长度必须是2-6位'
                   },
                   callback: {
                       message: '用户名不存在'
                   }
               }
           },
            password: {
               validators: {
                   notEmpty: {
                       message: '密码不能为空'
                   },
                   stringLength: {
                       min: 6,
                       max: 12,
                       message: '密码长度必须为6-12位'
                   },
                   callback: {
                       message: '密码错误'
                   }
               }
            }
        },

        // 2-校验时配置图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
    })

    // 功能2-注册表单校验成功事件
    $('#form').on("success.form.bv",function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/employee/employeeLogin',
            data: $('#form').serialize(),
            dataType: 'json',
            success: function (info) {
                if (info.success) {
                    location.href = 'index.html';
                }

                if (info.error === 1000) {
                    $('#form').data('bootstrapValidator').updateStatus('username','INVALID','callback');
                }
                
                if (info.error === 1001) {
                    $('#form').data('bootstrapValidator').updateStatus('password','INVALID','callback');
                }
            }
        })
    })

    // 功能3-实现重置表单
    $("[type='reset']").on("click",function () {
        $('#form').data('bootstrapValidator').resetForm();
    })
})