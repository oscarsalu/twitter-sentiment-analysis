// "Defines functions that can be invoked over the network by clients."
// http://docs.meteor.com/#methods_header

Meteor.methods({
  trends: function() {
    // Check how old the trends are to ensure we never pull too often
    var trend_time = TrendTime.findOne();
    var trend_age = 400000;  // if trends undefined will set older age
    if (typeof trend_time !== 'undefined') {
      trend_age = Date.now() - trend_time.last_insert_stamp;
    }
    //console.log('TREND AGE: ' + trend_age);
    if (trend_age >= 300000) {
      getTrends();  // see twitter.js
    }
  },
  search: function(searchvalue) {
        check(searchvalue, String);
        //console.log("------------------------------------");
        //console.log(searchvalue);
        var searchcount = StreamTw.find({ $text: {$search: searchvalue} }).count();
        //console.log(searchcount);
        // new SimpleSchema({
        //     searchvalue: {type: String}
        //   }).validate({ searchvalue })

        return searchcount;
     }
});