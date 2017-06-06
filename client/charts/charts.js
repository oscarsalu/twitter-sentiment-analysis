function builtArea() {
    var tren = Trends.find().fetch();
    for (var i = tren.length - 1; i >= 0; i--) {
        var name = new Array();
        name.push(tren[i].name);
        var str = Meteor.call('search', tren[i].name );
        var stre = str.count();
        var strema = StreamTw.find().count();
        var final = (stre/strema) ;
        var data = new Array();
           data.push({
               x: (new Date()).getTime(),
               y: final });
    }
  $('#container-area').highcharts({
        
        chart: {
            type: 'area',
            animation: Highcharts.svg, // don't animate in old IE
            marginRight: 10,
            events: {
                load: function () {

                    // set up the updating of the chart each second
                    var series = this.series[0];
                    setInterval(function () {
                        var x = (new Date()).getTime();
                        var y = new Array();
                        var tren = Trends.find().fetch();
                        for (var i = tren.length - 1; i >= 0; i--) {
                            // console.log(tren[i].name);
                            var str = Meteor.call('search', tren[i].name );
                            console.log(str);
                            //var stre = str.count();
                            //console.log(stre);
                            var strema = StreamTw.find().count();
                            console.log(strema);
                            var final = (str/strema) ;
                                  y.push(final);
                        } // current time
                        series.addPoint([x, y], true, true);
                    }, 1000);
                }
            }
        },
        title: {
            text: 'Live random data'
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 150
        },
        yAxis: {
            title: {
                text: 'Value'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            formatter: function () {
                return '<b>' + this.series.name + '</b><br/>' +
                    Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                    Highcharts.numberFormat(this.y, 2);
            }
        },
        legend: {
            enabled: false
        },
        exporting: {
            enabled: true
        },
        series: [{
            name: name,
            data: data
        }],
         
    });
}

/*
 * Call the function to built the chart when the template is rendered
 */
Template.charts.rendered = function() {
     
    builtArea();
};
Template.charts.helpers({
    streaming: function () {
        console.log('Streaming Tweets...');

        var stream_twi = StreamTw.findOne();
       if (typeof stream_twi === 'undefined') {
        // TODO consider other ways to show loading message
        return [{name: "Loading Streaming twits..."}];
       } else {
        return StreamTw.find();
       }
    }
});