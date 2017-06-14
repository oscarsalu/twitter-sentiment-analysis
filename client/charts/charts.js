function builtArea() {
  $('#container-area').highcharts({
        
        chart: {
            type: 'spline',
            animation: Highcharts.svg, // don't animate in old IE
            marginRight: 10,
            events: {
                load: function () {

                    // set up the updating of the chart each second
                    var series = this.series[0];
                    setInterval(function () {
                        //var y = new Array();
                        var tren = Trends.find().fetch();
                        for (var i = tren.length - 1; i >= 0; i--) {
                        Meteor.call('search', tren[i].name, function(error, result) {
                                if (error) {
                                    console.log(error.reason);
                                    return;
                                }
                                //console.log(result);
                                var strema = StreamTw.find().count();
                                var final = (result/strema) ;
                                var x = (new Date()).getTime();
                                var y = (final * 10);
                                  //console.log([x, y]);
                                  series.addPoint([x, y]);
                            } );
                           //console.log(y); 
                        } // current time
                         //series.addPoint([x, y], true, true);
                    }, 1000);
                }
            }
        },
        title: {
            text: 'Live random data'
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 150,
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
            enabled: false
        },
        series: [{
            name: (function (tren) {

                // generate an array of random data
                 
                var name = [];                   
                console.log(tren.length);
                for (var i = tren.length - 1; i >= 0; i--) {
                    name.push(tren[i].name);
                    }
                return name;
                //console.log('data');
            }(Trends.find().fetch())),
            data: (function (tren) {                 
                var data = [],
                    time = (new Date()).getTime();
                
                
                console.log(tren.length);

                    for (var i = tren.length - 1; i >= 0; i--) {
                        
                        Meteor.call('search', tren[i].name, function(err, resu) {
                            if (err) {
                                console.log(error.reason);
                                return;
                            } 
                            var strema = StreamTw.find().count();
                            var final = (resu/strema) ;  
                                    data.push({
                                        x: time,
                                        y: final
                                        //y: Math.random()
                                    });
                                    console.log([x, y]);
                        } );
                }
                return data;
                console.log('data');
            }(Trends.find().fetch()))
        }]
         
    });
}

// function builtArea() {
//    $('#container-area').highcharts({

//     xAxis: {
//         type: 'datetime'
//     },

//     plotOptions: {
//         series: {
//             pointStart: Date.UTC(2010, 0, 1),
//             pointInterval: 24 * 3600 * 1000 // one day
//         }
//     },

//     series: [{
//         data: []

//     }, {
//         data: [144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4, 29.9, 71.5, 106.4, 129.2]
//     }]
//    });

// }

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