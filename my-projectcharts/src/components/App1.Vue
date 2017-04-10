<template>
<div>    
    <div class="text-center">
        <h3>Data from Appbot API</h3>
    </div>
    <div class="row">
        <div class="col-sm-6">
            <table class="table">
                <thead>
                    <tr>
                        <th>All Time Average</th><th>Total Count</th>
                        <th>Star 5</th>
                        <th>Star 4</th>
                        <th>Star 3</th>
                        <th>Star 2</th>
                        <th>Star 1</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>{{ rating_average }}</th>
                        <th>{{ total_count }}</th>
                        <th>{{ star_5_count }}</th>
                        <th>{{ star_4_count }}</th>
                        <th>{{ star_3_count }}</th>
                        <th>{{ star_2_count }}</th>
                        <th>{{ star_1_count }}</th>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="col-sm-6">
            <highcharts class="ratingsChart" :options="chartOptions" ref="highcharts"></highcharts>
        </div>
    </div>
    
</div>
</template>
<!-- //////////////////////// -->
<style scoped>
    .ratingsChart {
        height: 200px;
    }
</style>
<!-- //////////////////////// -->
<script>
    import Vue from 'vue'
    Vue.use(VueHighcharts);
    var chartColors = ['#9fc05a', '#add633', '#ffd834', '#ffb234', '#ff8b5a'];
    var chartOptions = {
        chart: {
            type: 'bar'
        },
        colors: chartColors,
        title: {
            text: ''
        },
        xAxis: {
            categories: ['Star 5', 'Star 4', 'Star 3', 'Star 2', 'Star 1'],
            title: {
                text: null
            }
        },
        yAxis: {
            visible: false
        },
        tooltip: {
            enabled: false
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                },
                groupPadding: 0.01,
                colorByPoint: true
            }
        },
        legend: {
            enabled: false
        },
        credits: {
            enabled: false
        },
        series: [{
            name: 'ratings',
            data: [50,50,50,50,50]
        }]
    };
    
    export default {
        name: '',
        data () {
            return {
                chartOptions: chartOptions,
                rating_average: 0, 
                total_count: 0, 
                star_5_count: 0, 
                star_4_count: 0, 
                star_3_count: 0, 
                star_2_count: 0, 
                star_1_count: 0
            }
        },
        mounted: function(){
            this.getData();
        },
        methods: {
            getData: function(){
                var thisView = this,
                    chart = this.$refs.highcharts.chart, 
                    i = 0, 
                    new_data = [];
                
                this.$http.get('https://api.appbot.co/api/v1/apps/888248/ratings?key=504802b7cce1c88957d96bd6b8fa0ceca645ec3d')
                    .then(function(res){
                        var ratingData = res.body.all_time;
                        console.log(ratingData);
                        updateTable(ratingData);
                        updateHighcharts(ratingData);
                    }, function(err){
                        console.log(err);
                    });
                function updateTable(ratingData){
                    thisView.rating_average = ratingData.average.toFixed(2);
                    thisView.total_count = convertNumberToHaveCommas(ratingData.count);
                    for(i = 1; i <= 5; i++){
                        thisView['star_' + i + '_count'] = convertNumberToHaveCommas(ratingData.breakdown[i]);
                    }
                }
                
                function updateHighcharts(ratingData){
                    for(i = 5; i >= 1; i--){
                        new_data.push(ratingData.breakdown[i]);
                    }
                    chart.series[0].setData(new_data);
                }
                
                function convertNumberToHaveCommas(num){
                    var new_num = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    return new_num;   
                }
            }
        }
    }
</script>