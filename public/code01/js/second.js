$(function () {
    // 1-请求后台数据,渲染到页面
    var currentPage = 1;
    var pageSize = 5;

    render();

    function render() {
        $.ajax({
            type: 'get',
            url: '/category/querySecondCategoryPaging',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: 'json',
            success: function (info) {
                console.log(info);
                $('tbody').html(template('secondTmp', info));

                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    totalPages: Math.ceil(info.total / info.size),
                    currentPage: info.page,
                    onPageClicked: function (a, b, c, page) {
                        currentPage = page;
                        render();
                    }
                })
            }
        })
    }

    // 2-点击添加按钮,显示模态框
    $("#addBtn").click(function () {
        $("#addModal").modal("show");

        $.ajax({
            type: 'get',
            url: '/category/queryTopCategoryPaging',
            data: {
                page: 1,
                pageSize: 100
            },
            dataType: "json",
            success: function (info) {
                console.log(info);
                $('.dropdown-menu').html( template('cateTmp',info) );
            }
        })
    })


    // 3-通过事件委托给下拉列表下的a注册事件
    $('.dropdown-menu').on('click',"a",function () {
        var txt = $(this).text();

        $("#dropdownText").text(txt);

        var id = $(this).data('id');


        $("[name='categoryId']").val(id);
        // $("[name='categoryId']").trigger('input');

        $('#form').data("bootstrapValidator").updateStatus("categoryId", "VALID");
    })

    // 4-进行文件上传初始化
    $("#fileupload").fileupload({
        dataType: 'json',
        done: function (e,data) {
            var result = data.result;
            var picUrl = result.picAddr;

            $('#imgBox img').attr('src',picUrl);

            $('[name="brandLogo"]').val(picUrl);

            $('#form').data("bootstrapValidator").updateStatus("brandLogo", "VALID");
        }
    })

    // 5-表单校验
    $("#form").bootstrapValidator({
        excluded: [],

        // 配置校验图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',    // 校验成功
            invalid: 'glyphicon glyphicon-remove',  // 校验失败
            validating: 'glyphicon glyphicon-refresh'  // 校验中
        },

        // 校验字段
        fields: {
            categoryId: {
                validators: {
                    notEmpty: {
                        message: '请输入一级分类'
                    }
                }
            },

            brandName: {
                validators: {
                    notEmpty: {
                        message: '请输入二级分类名称'
                    }
                }
            },

            brandLogo: {
                validators: {
                    notEmpty: {
                        message: '请选择图片'
                    }
                }
            }
        }
    })

    // 6-注册表单校验成功事件,阻止默认行为,通过ajax提交数据
    $('#form').on("success.form.bv",function ( e ) {
        e.preventDefault();

        $.ajax({
            type: 'post',
            url: '/category/addSecondCategory',
            data: $('#form').serialize(),
            dataType: 'json',
            success: function (info) {
                $('#addModal').modal('hide');
                currentPage = 1;
                render();
            }
        })
    })
})