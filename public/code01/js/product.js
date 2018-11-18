$(function () {
    var currentPage = 1;
    var pageSize = 4;
    var picArr = [];

    // 1-请求后台数据,渲染到页面
    render();

    function render() {
        $.ajax({
            type: 'get',
            url: '/product/queryProductDetailList',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: 'json',
            success: function (info) {
                $('tbody').html(template("productTmp", info));

                // 实现分页初始化
                $('#paginator').bootstrapPaginator({
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

    // 2-点击添加按钮显示添加模态框
    $("#addBtn").click(function () {
        $("#addModal").modal('show');

        // 请求二级分类数据
        $.ajax({
            type: 'get',
            url: '/category/querySecondCategoryPaging',
            data: {
                page: 1,
                pageSize: 100
            },
            dataType: 'json',
            success: function (info) {
                console.log(info);
                $(".dropdown-menu").html( template( "dropdownTmp",info ) );
            }
        })
    })

    // 3-通过事件委托给每个a注册点击事件
    $(".dropdown-menu").on('click','a',function () {
        var txt = $(this).text();
        $("#dropdownText").text( txt );


        var id = $(this).data("id");

        $('[name="brandId"]').val(id);

        // 改变校验状态
        $("#form").data("bootstrapValidator").updateStatus('brandId','VALID');
    })

    // 4-进行文件上传配置
    $("#fileupload").fileupload({
        dataType: 'json',
        
        done: function (e, data) {

            // 获取后台返回的结果
            var picObj = data.result;
            // 获取图片地址
            var picUrl = picObj.picAddr;

            // 将图片地址存入数组中,向最前面添加
            picArr.unshift(picObj);

            // 在结构上向最后添加
            $("#imgBox").prepend('<img src="' + picUrl + '" style="height: 90px" alt="">');


            // 如果图片大于三张,显示最新添加的一张,删除最后一张
            if (picArr.length > 3 ) {
                picArr.pop();

                $("#imgBox img:last-of-type").remove();
            }


            // 如果图片等于3张,改变校验状态
            if (picArr.length === 3) {
                $("#form").data('bootstrapValidator').updateStatus('picStatus','VALID');
            }
        }
    })

    // 5-校验字段
    $("#form").bootstrapValidator({
        // 配置排序项, 默认会对隐藏域进行排除, 我们需要对隐藏域进行校验
        excluded: [],

        // 配置校验图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',    // 校验成功
            invalid: 'glyphicon glyphicon-remove',  // 校验失败
            validating: 'glyphicon glyphicon-refresh'  // 校验中
        },

        // 校验字段
        fields: {
            brandId: {
                validators: {
                    notEmpty: {
                        message: '请选择二级分类'
                    }
                }
            },
            brandId: {
                validators: {
                    notEmpty: {
                        message: '请选择二级分类'
                    }
                }
            },
            proName: {
                validators: {
                    notEmpty: {
                        message: '请输入商品名称'
                    }
                }
            },
            proDesc: {
                validators: {
                    notEmpty: {
                        message: '请输入商品描述'
                    }
                }
            },
            num: {
                validators: {
                    notEmpty: {
                        message: '请输入商品库存'
                    },
                    // 正则校验, 非零开头的数字
                    // \d =>  数字 0-9
                    // * 表示出现 0 个 或 多个
                    // ? 表示出现 0 个 或 1个
                    // + 表示出现 1 个 或 多个
                    // {m,n} 从 m 个 到 n 个
                    regexp: {
                        regexp: /^[1-9]\d*$/,
                        message: '请输入非零开头的数字'
                    }
                }
            },
            size: {
                validators: {
                    notEmpty: {
                        message: '请输入商品尺码'
                    },
                    /*
                    * 正则校验 必须是xx-xx格式,必须是数字
                    * */
                    regexp: {
                        regexp: /^\d{2}-\d{2}$/,
                        message: '必须是 xx-xx 的格式,  xx两位数字'
                    }
                }
            },
            oldPrice: {
                validators: {
                    notEmpty: {
                        message: '请输入商品原价'
                    }
                }
            },
            price: {
                validators: {
                    notEmpty: {
                        message: '请输入商品现价'
                    }
                }
            },
            picStatus: {
                validators: {
                    notEmpty: {
                        message: '请至少上传3张图片'
                    }
                }
            }
        }
    })

    // 6-注册校验成功事件,阻止默认提交,通过ajax提交数据
    $("#form").on('success.form.bv',function (e) {
        e.preventDefault();
        
        console.log(picArr);

        // 拼接数据
        var data = $("#form").serialize();


        // data += "&picName1="+ picArr[0].picName +"&picAddr1="+  picArr[0].picAddr;
        // data += "&picName2="+ picArr[1].picName +"&picAddr2="+  picArr[1].picAddr;
        // data += "&picName3="+ picArr[2].picName +"&picAddr3="+  picArr[2].picAddr;

        data += "&picName1=" + picArr[0].picName + "&picAddr1=" + picArr[0].picAddr;
        data += "&picName2=" + picArr[1].picName + "&picAddr2=" + picArr[1].picAddr;
        data += "&picName3=" + picArr[2].picName + "&picAddr3=" + picArr[2].picAddr;
        $.ajax({
            type: 'post',
            url: '/product/addProduct',
            data: data,
            dataType: 'json',
            success: function (info) {
                console.log(info);

                $("#addModal").modal('hide');

                currentPage = 1;
                render();
            }
        })

    })

})