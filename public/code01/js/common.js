// 需求: 在第一个ajax请求时, 开启进度条
//       在所有的ajax请求都回来后, 关闭进度条

// ajax全局事件
// .ajaxComplete()  当每个ajax完成时调用,  (不管成功还是失败, 都调用)
// .ajaxSuccess()   当每个ajax成功响应时调用
// .ajaxError()     当每个ajax失败响应时调用
// .ajaxSend()      当每个ajax准备要发送前, 会调用ajaxSend

// .ajaxStart()     当第一个ajax请求发送时调用
// .ajaxStop()      当所有的ajax请求完成时调用
$(document).ajaxStart(function () {
    NProgress.start();
})

$(document).ajaxStop(function () {
    setTimeout(function () {
        NProgress.done();
    },500)
});


$(function () {
    // 公共功能
    // 1-导航点击切换功能
    $('#category').click(function () {
        // 让下一个兄弟元素切换显示隐藏
        $(this).next().stop().slideToggle();
    });

    // 2-左侧菜单列表切换
    $('.icon_left').click(function () {
        $('.lt_aside').toggleClass('hidemenu');

        $('.lt_main').toggleClass('hidemenu');

        $('.lt_topbar').toggleClass('hidemenu')
    })

    // 3-退出功能
    $('.icon_right').click(function () {
        $('#logoutModal').modal('show');
    });

    $('#logoutBtn').click(function () {
        $.ajax({
            type: 'get',
            url: '/employee/employeeLogout',
            dataType: 'json',
            success: function (info) {

                if (info.success) {
                    location.href = "login.html";
                }
            }
        })
    })
})
