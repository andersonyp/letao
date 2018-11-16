$(function () {
    // 基于准备好的dom，初始化echarts实例
    var echarts_left = echarts.init(document.querySelector(".echarts_left"));

    // 指定图表的配置项和数据
    var option = {
        title: {
            text: '2018年注册人数'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            data: ['人数','销量']
        },
        xAxis: {
            data: ["1月", "2月", "3月", "4月", "5月", "6月"]
        },
        yAxis: {},
        series: [{
            name: '人数',
            // bar 表示柱状图,  line 表示折线图,  pie 表示饼图
            type: 'bar',
            data: [500, 1200, 390, 580, 800, 1000]
        }, {
            name: '销量',
            type: 'bar',
            data: [700, 1300, 490, 680, 700, 800]
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    echarts_left.setOption(option);




    // 右侧饼图
    var echarts_right = echarts.init(document.querySelector(".echarts_right"));

    // 指定图表的配置项和数据
    option1 = {
        // 大标题
        title: {
            text: '热门品牌销售', // 主标题文本
            subtext: '2018年11月', // 副标题文本
            x: 'center'
        },
        // 提示框组件
        tooltip: {
            trigger: 'item', // 触发类型
            /*
            * item 数据项图形触发,主要在散点图,饼图等图表中使用
            * axis 坐标轴触发,主要在柱状图,折线图等图表中使用
            * */
            formatter: "{a} <br/>{b} : {c} ({d}%)"
            /*
            * {a}: 系列名称
            * {b}: 数据项名称
            * {c}: 数值
            * {d}: 百分比
            * */
        },
        legend: {
            orient: 'vertical', // 图例列表的布局朝向 horizontal 水平  vertical 垂直
            left: 'left',
            data: ['阿迪', '耐克', '新百伦', '阿迪王', '李宁']
            // 数据数组:[图例名称]
        },
        series: [
            {
                name: '访问来源',
                type: 'pie',
                radius: '50%',
                center: ['50%', '60%'],
                data: [
                    {value: 335, name: '阿迪'},
                    {value: 310, name: '耐克'},
                    {value: 234, name: '新百伦'},
                    {value: 135, name: '阿迪王'},
                    {value: 1548, name: '李宁'}
                ],

                // 额外阴影效果
                itemStyle: {
                    emphasis: {
                        shadowBlur: 20,
                        shadowOffsetX: 0,
                        shadowColor: 'salmon'
                    }
                }
            }
        ]
    };

    // 使用刚指定的配置项和数据显示图表。
    echarts_right.setOption(option1);
})