window.onload = app;

// runs when the DOM is loaded
function app() {

    // load some scripts (uses promises :D)
    loader.load({
        url: "./bower_components/jquery/dist/jquery.min.js"
    }, {
        url: "./bower_components/lodash/dist/lodash.min.js"
    }, {
        url: "./bower_components/backbone/backbone.js"
    }, {
        url: "./bower_components/pathjs/path.min.js"
    }).then(function() {
            _.templateSettings.interpolate = /{([\s\S]+?)}/g;

            (function($) {
                var Tweet = Backbone.Model.extend({
                    defaults: function() {
                        return {
                            author: '',
                            status: ''
                        }
                    }
                });
                var TweetLists = Backbone.Collection.extend({
                    model: Tweet
                });
                var tweets = new TweetLists();

                var TweetView = Backbone.View.extend({
                    model: new Tweet(),
                    tagname: 'div',
                    initialize: function() {
                        this.template=_template($('#tweet-template').html());

                    },
                    render: function() {
                         this.$el.html(this.template(this.model.toJSON())); //bind model to tmeplate  
                        return this;
                    }
                });

                var TweetViews = Backbone.View.extend({
                    model: tweets,
                    el: $('#tweets-container'),
                    initialize: function () {
                     this.model.on('add', this.render, this);
                    },
                    render: function(){
                        var self = this;
                        self.$el.html(''); 
                        _.each(this.model.toArray(), function(tweet, i) {
                            self.$el.append((new TweetView({model: tweet})).render().$el);
                        });
                       
                        return this;
                    }
                });

                $(document).ready(function(){

                    $('#new-tweet').submit(function(ev){
                        var tweet = new Tweet({
                        author: $("#author-name").val(), status: $("#status-update").val()});
                        tweets.add(tweet);
                         console.log(tweets.toJSON()); 

                         return false;
                    });

                    var appView = new TweetsView();
                      
                         });

    })(JQuery);
