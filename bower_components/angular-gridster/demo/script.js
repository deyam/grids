var app = angular.module('plunker', ['nvd3', 'gridster', 'plunker.services']);

app
.controller('MainCtrl', function($scope, $timeout, DataService) {
//var socket = new SockJS('/gs-guide-websocket');
var socket = new SockJS('http://localhost:8080/gs-guide-websocket');
var chart1;
var chart2;
var chart3;
// var port = 8080;
//  var socket = new SockJS
//                     ( '//' + document.domain + '' + port + '/gs-guide-websocket'
//                     , ''
//                     , { 'debug':true
//                         , 'devel' : true
//                         , 'protocols_whitelist':
//                             [ 'xdr-streaming'
//                             , 'xdr-polling'
//                             , 'xhr-streaming'
//                             , 'iframe-eventsource'
//                             , 'iframe-htmlfile'
//                             , 'xhr-polling'
//                             , 'websocket'
//                             ]
//                       }
//                     );

    console.log('Socket ok..');

    stompClient = Stomp.over(socket);
    console.log('Socket/Stomp ok..');
    stompClient.connect({}, function (frame) {
//        setConnected(true);
        console.log('Connected: ' + frame);
        // stompClient.subscribe('/topic/greetings', function (greeting) {
        //     showGreeting(JSON.parse(greeting.body).content);
        // });
        stompClient.subscribe('/topic/mon', function (stats) {
            showGreeting(JSON.parse(stats.body).content);
        });
        console.log('About to connect to chart3: ' + frame);
        stompClient.subscribe('/topic/chart3', function (stats) {
            showChart3(JSON.parse(stats.body).content);
        });
        console.log('Connected to chart3: ' + frame);

    });

  $scope.gridsterOptions = {
    margins: [20, 20],
    columns: 4,
    mobileModeEnabled: false,
    draggable: {
      handle: 'h3'
    },
    resizable: {
     enabled: true,
     handles: ['n', 'e', 's', 'w', 'ne', 'se', 'sw', 'nw'],
     
     // optional callback fired when resize is started
     start: function(event, $element, widget) {},
     
     // optional callback fired when item is resized,
     resize: function(event, $element, widget) {
       if (widget.chart.api) widget.chart.api.update();
     }, 
    
      // optional callback fired when item is finished resizing 
     stop: function(event, $element, widget) {
       $timeout(function(){
         if (widget.chart.api) widget.chart.api.update();
       },400)
     } 
    },
  };
  


  $scope.dashboard = {
    widgets: [{
      col: 0,
      row: 0,
      sizeY: 2,
      sizeX: 2,
      name: "Discrete Bar Chart",
      chart: {
        options: DataService.discreteBarChart.options(),
        data: DataService.discreteBarChart.data(),
        api: {} 
      }
    }, {
      col: 2,
      row: 0,
      sizeY: 2,
      sizeX: 2,
      name: "Candlestick Bar Chart",
      chart: {
        options: DataService.candlestickBarChart.options(),
        data: DataService.candlestickBarChart.data(),
        api: {} 
      }
    }, {
      col: 0,
      row: 2,
      sizeY: 2,
      sizeX: 3,
      name: "Line Chart",
      chart: {
        options: DataService.lineChart.options(),
        data: DataService.lineChart.data(),
        api: {} 
      }
    }, {
      col: 4,
      row: 2,
      sizeY: 1,
      sizeX: 1,
      name: "Pie Chart",
      chart: {
        options: DataService.pieChart.options(),
        data: DataService.pieChart.data(),
        api: {} 
      }
    }]
  };
  
  // We want to manually handle `window.resize` event in each directive.
  // So that we emulate `resize` event using $broadcast method and internally subscribe to this event in each directive
  // Define event handler
  $scope.events = {
    resize: function(e, scope){
      $timeout(function(){
        scope.api.update()
      },200)
    }
  };
  angular.element(window).on('resize', function(e){
    $scope.$broadcast('resize');
  });
  
  // We want to hide the charts until the grid will be created and all widths and heights will be defined.
  // So that use `visible` property in config attribute
  $scope.config = {
    visible: false
  };
  $timeout(function(){
    $scope.config.visible = true;
  }, 200);


//$("#stats").append("<tr><td>" + message + "</td></tr>");

function showGreeting(message) {
  //  $("#greetings").append("<tr><td>" + message + "</td></tr>");
   //$("#stats").append("<tr><td>" + message + "</td></tr>");
   var a = [],b = [], c = [], aa = [], bb=[], cc=[];
   var myEL = angular.element(document.querySelector('#stats'));
   myEL.append("<tr><td>" + message + "</td></tr>");
   $scope.mystats = message;
   var obj = JSON.parse(message);
   chart1 = obj;
   a = [ { "series": 0 , "x":0 , "y":0 }, { "series": 0 , "x":1 , "y":0.5 } , {"series": 0 , "x":2 , "y":0.7} , {"series": 0 , "x":3 , "y":0.9} ,
   {"series": 0 , "x":4 , "y":0.99},{"series": 0 , "x":5 , "y":1.1},{"series": 0 , "x":6 , "y":1.2},{"series": 0 , "x":7 , "y":1.4},{"series": 0 , "x":8, "y":1.5},{"series": 0 , "x":9 , "y":1.4},{"series": 0 , "x":10 , "y":1.2},{"series": 0 , "x":11 , "y":1.1},{"series": 0 , "x":12 , "y":1.0},{"series": 0 , "x":13 , "y":1.3},{"series": 0 , "x":14 , "y":1.6},{"series": 0 , "x":15 , "y":1.9},{"series": 0 , "x":16 , "y":2.2},{"series": 0 , "x":17 , "y":2.4},{"series": 0 , "x":18 , "y":2.9},{"series": 0 , "x":19 , "y":2.5},{"series": 0 , "x":20 , "y":3.9},{"series": 0 , "x":21 , "y":4.9},{"series": 0 , "x":22 , "y":2.9} ]
   for (var i in a) {
    console.log("loop:", i, " x:", a[i].x, "y:", a[i].y);
    //sin.push({x: i, y: Math.sin(i/10)});
    aa.push({x: a[i].x, y:a[i].y});
    bb.push({x: a[i].x, y:a[i].y});
    cc.push({x: a[i].x, y:a[i].y});
   }
$scope.dashboard = {
    widgets: [{
      col: 0,
      row: 0,
      sizeY: 1,
      sizeX: 1,
      name: "Discrete Bar Chart",
      chart: {
        options: DataService.discreteBarChart.options(),
        data: obj,
//        data: function(message){return messsage},
//        data: [{'key': 'Cumulative Return','values': [{'label' : 'A' ,'value' : 229.765957771107} ,{'label' : 'B' ,'value' : 1110} ,{'label' : 'C' ,'value' : 32.807804682612} ,{'label' : 'D' ,'value' : 196.45946739256},{'label' : 'E' ,'value' : 0.19434030906893} ,{'label' : 'F' ,'value' : 98.079782601442} ,{'label' : 'G' ,'value' : 13.925743130903} ,{'label' : 'H' ,'value' : 5.1387322875705}]}],

        api: {} 
      }
    },  {
      col: 1,
      row: 0,
      sizeY: 1,
      sizeX: 1,
      name: "Line Chart",
      chart: {
        options: DataService.lineChart.options(),
        data:[ {values:a, key: 'AA', color: '#ff7f0e' } ] ,
        api: {} 
      }
    }


    ]}



window.dispatchEvent(new Event('resize'));

// return [
//         {
//             values: sin,      //values - represents the array of {x,y} data points
//             key: 'Sine Wave', //key  - the name of the series.
//             color: '#ff7f0e'  //color - optional: choose your own line color.
//         },
//         {
//             values: cos,
//             key: 'Cosine Wave',
//             color: '#2ca02c'
//         },
//         {
//             values: sin2,
//             key: 'Another sine wave',
//             color: '#7777ff',
//             area: true      //area - set to true if you want this line to turn into a filled area chart.
//         }
//     ];


}

function showChart3(message) {
var a = [],b = [], c = [], aa = [], bb=[], cc=[];
var obj = JSON.parse(message);
chart3 = obj;
var myEL3 = angular.element(document.querySelector('#stats3'));
   myEL3.append("<tr><td>" + message + "</td></tr>");
   $scope.mystats3 = message;

$scope.dashboard = {
    widgets: [
{
      col: 0,
      row: 0,
      sizeY: 1,
      sizeX: 1,
      name: "Discrete Bar Chart",
      chart: {
        options: DataService.discreteBarChart.options(),
        data: chart1,
//        data: function(message){return messsage},
//        data: [{'key': 'Cumulative Return','values': [{'label' : 'A' ,'value' : 229.765957771107} ,{'label' : 'B' ,'value' : 1110} ,{'label' : 'C' ,'value' : 32.807804682612} ,{'label' : 'D' ,'value' : 196.45946739256},{'label' : 'E' ,'value' : 0.19434030906893} ,{'label' : 'F' ,'value' : 98.079782601442} ,{'label' : 'G' ,'value' : 13.925743130903} ,{'label' : 'H' ,'value' : 5.1387322875705}]}],

        api: {} 
      }
    },

    {
      col: 1,
      row: 0,
      sizeY: 1,
      sizeX: 1,
      name: "Line Chart",
      chart: {
        options: DataService.lineChart.options(),
        data:[ {values:obj, key: 'AAXX', color: '#ff7f0e' } ] ,
        api: {} 
      }

}]

}

window.dispatchEvent(new Event('resize'));

}

});
