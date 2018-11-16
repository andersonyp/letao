$(function () {
// 1-请求后台数据,渲染页面
    var currentPage = 1;
    var pageSize = 5;

    render();

    function render() {
        $.ajax({
            type: 'get',
            url: '/category/queryTopCategoryPaging',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: 'json',
            success: function (info) {
                console.log(info);
                $('tbody').html(template("firstTmp", info));
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    totalPages: Math.ceil( info.total / info.size ),
                    currentPage: info.page,
                    onPageClicked: function (a, b, c, page) {
                        currentPage = page;
                        render();
                    }
                })
            }
        })
    }


    // 2-点击添加按钮显示模态框
        $('#addBtn').click(function () {
            $('#addModal').modal('show');
        })

    // 3-表单校验
    $("#form").bootstrapValidator({
        // 配置校验图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',    // 校验成功
            invalid: 'glyphicon glyphicon-remove',  // 校验失败
            validating: 'glyphicon glyphicon-refresh'  // 校验中
        },

        //校验字段
        fields: {
            categoryName: {
                validators: {
                    notEmpty: {
                        message: '请填写一级分类'
                    }
                }
            }
        }
    });

    // 4-注册表单校验成功,阻止默认提交,发送ajax
    $("#form").on('success.form.bv',function (e) {
        e.preventDefault();

        $.ajax({
            type: 'post',
            url: '/category/addTopCategory',
            data: $("#form").serialize(),
            dataType: 'json',
            success: function (info) {
                console.log(info);
                if (info.success) {
                    $('#addModal').modal('hide');

                    currentPage = 1;
                    render();
                }

            }
        })
    })

});

