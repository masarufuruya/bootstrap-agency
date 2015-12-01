'use strict';
// browserifyでライブラリをインポート
var angular = require('angular');

// angularモジュールを定義
angular.module('workshop', [])

// Instagramのフィード
.factory('FeedData', function() {
  // データを取得
  var data = [{
    created: '1日前',
    userName: 'starwars',
    text: 'It\'s the hottest ticket in the galaxy. Enter for a chance to win a trip to the #StarWars: #TheForceAwakens red carpet premiere! \nHead to omaze.com/starwars. #ForceForChange #movie #movies #charity',
    imageUrl: 'https://scontent.cdninstagram.com/hphotos-xfa1/t51.2885-15/s640x640/sh0.08/e35/12292884_1041753879223926_1254474150_n.jpg',
    profilePictureUrl: 'https://scontent.cdninstagram.com/hphotos-xtp1/t51.2885-19/11875549_1654276581455002_1035984128_a.jpg',
    likes: 54938,
    isLike: false
  }, {
    created: '2日前',
    userName: 'starwars',
    text: '#ThrowbackThursday - The origins of #squadgoals. #BehindTheScenes #tbt #movie #movies',
    imageUrl: 'https://scontent.cdninstagram.com/hphotos-xft1/t51.2885-15/s640x640/sh0.08/e35/12224308_895196387201331_1940550043_n.jpg',
    profilePictureUrl: 'https://scontent.cdninstagram.com/hphotos-xtp1/t51.2885-19/11875549_1654276581455002_1035984128_a.jpg',
    likes: 135885,
    isLike: false
  }, {
    created: '3日前',
    userName: 'starwars',
    text: 'We\'re launching a mission straight into an Imperial base. Tune in to #StarWarsRebels: Stealth Strike TONIGHT at 9:30p/8:30c on @DisneyXD! #StarWars #tv #Disney',
    imageUrl: 'https://scontent.cdninstagram.com/hphotos-xap1/t51.2885-15/s640x640/sh0.08/e35/12276734_507743302737236_2033399229_n.jpg',
    profilePictureUrl: 'https://scontent.cdninstagram.com/hphotos-xtp1/t51.2885-19/11875549_1654276581455002_1035984128_a.jpg',
    likes: 47221,
    isLike: false
  }];

  return data;
})

// コントローラー
.controller('mainController', function($scope, FeedData) {
  $scope.feedData = FeedData;
});