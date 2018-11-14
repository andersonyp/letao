// 功能1-实现字段校验
$(function () {
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
                   }
               }
            }
        }
    })
})