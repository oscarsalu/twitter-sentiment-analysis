Meteor.startup(function() {
    // AFINN-based sentiment: https://github.com/thisandagain/sentiment
    // Set up Twitter API
    Twit = new Twit({
        // Put your Twitter API access keys/tokens here
        consumer_key: "hNNEG2U4nHgTjCnhuRKeqqEyY",
        consumer_secret: "kfqTDYjbfGgiOBx2UPFybJf92Ze3qX5sLzp5FbxWkJi5rj8EHo",
        access_token: "186084029-avVUNVFXim4tTntEDIKySMYSRQNAECGqLS0p5nqF",
        access_token_secret: "QhCnLDA88o2LD8OAEF5fSz2gFstBwtCA5jTODHjQL9Z9k"
    });
    /*var stream = Twit.stream('statuses/filter', { track: 'IEBC' })
    stream.on('tweet', function (tweet) {
        console.log(tweet.text);
        console.log(tweet.user.location);
        console.log(tweet.user.screen_name);
        console.log('------------------------------------------------------------');
    });*/
    // Set up MongoDB collections
    Trends = new Meteor.Collection('trends');
    TrendTime = new Meteor.Collection('trendtime');
    StreamTw = new Meteor.Collection('streamTwit');
    // Publish all trend data for client availability
    Meteor.publish('current-trends', function() {
        return Trends.find();
    });
    Meteor.publish('trend-time', function() {
        return TrendTime.find();
    });
    Meteor.publish('stream-tweet', function(){
        return Stream.find();
    });
    getTrends();
    // Refresh trends every 5 mins as that's as often as they change
    Meteor.setInterval(getTrends, 300000);
});