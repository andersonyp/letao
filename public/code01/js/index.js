$(function () {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.querySelector(".echarts_left"));

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
    myChart.setOption(option);
})