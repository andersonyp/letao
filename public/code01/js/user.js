$(function () {
    var currentPage = 1;
    var pageSize = 5;

    var currentId;
    var isDelete;

    render();
    //  渲染页面数据
    function render() {
        $.ajax({
            type: 'get',
            url: '/user/queryUser',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: 'json',
            success: function (info) {
                console.log(info);

                // var htmlStr = template("tmp",info)
                $('tbody').html(template('tmp', info));

                // 实现分页
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    totalPages: Math.ceil(info.total / info.size),
                    currentPage: info.page,
                    onPageClicked: function (a,b,c,page) {

                        currentPage = page;
                        render();
                    }
                })
            }
        })
    }


    // 利用事件委托给按钮注册事件
    $('tbody').on('click','.btn',function () {
        currentId = $(this).parent().data('id');
        console.log(currentId);

        $('#userModal').modal('show');

        isDelete = $(this).hasClass('btn-danger') ? 0 : 1;
    })

    // 点击按钮发送ajax请求,修改用户状态
    $('#confirmBtn').click(function () {
        $.ajax({
            type: 'post',
            url: '/user/updateUser',
            data: {
                id: currentId,
                isDelete: isDelete
            },
            dataType: 'json',
            success: function (info) {
                console.log(info);

                if (info.success) {
                    // 关闭模态框,并重新渲染页面
                    $('#userModal').modal('hide');
                    render();
                }
            }
        })
    })
});


