/*Initialize Map */
mapboxgl.accessToken =
  "pk.eyJ1Ijoic2ViYXN0aWFuLWNoIiwiYSI6ImNpejkxdzZ5YzAxa2gyd21udGpmaGU0dTgifQ.IrEd_tvrl6MuypVNUGU5SQ";

  const map = new mapboxgl.Map({
    container: "map", // container ID
    //style: 'mapbox://styles/mapbox/light-v10', //?optimize=true
    style: 'mapbox://styles/mapbox/light-v10', 
    center: [-77.4, 18.16], // starting position [lng, lat]
    zoom: 7,
    //pitch: 55
  });

  var firstSymbolId;


  map.on("load", function () {

    
   // add1km();

    addSub();
    

  })

map.on('move', function() {
  console.log(map.getZoom())
})

var breaks = []
var colors = ['#edf8fb', '#b2e2e2','#66c2a4','#2ca25f', '#006d2c' ]


function addSub() {

  var layers = map.getStyle().layers;
    //console.log(layers);
    // Find the index of the first symbol layer in the map style
    for (var i = 0; i < layers.length; i++) {
        if (layers[i].type === 'symbol') {
            firstSymbolId = layers[i].id;
            break;
        }
    }

  var randomColor = Math.floor(Math.random()*16777215).toString(16);
  
  d3.json('./jamaica.geojson').then(function(d) {

    console.log(d);
    
    map.addSource('cable', {
      type: 'geojson',
      data: d
    })

    

    var clipped = turf.mask(d)
    console.log(clipped)

    


  const hex5 = 'https://sebastian-ch.github.io/sidsDataTest/data/t5/{z}/{x}/{y}.pbf';


  map.addSource('hex5', {
    'type': 'vector',
    'promoteId': 'hexid',
    'tiles': [
      //otherhex
      hex5,
      
    ],
    //'minzoom': 3,
    'maxzoom': 12
  })

  var colorRamp1 = ['#edf8fb', '#b2e2e2', '#66c2a4', '#2ca25f', '#006d2c']

  map.addLayer({
    'id': 'hex5',
    'type': 'fill',
    'source': 'hex5',
    'source-layer': 'hex5_3857',
    'layout': {},
    'paint': {
        'fill-color':  [
          'interpolate',
          ['linear'],
          ['get', '1a2'],
          30000, '#edf8fb',
          36000, '#b2e2e2',
          900000, '#66c2a4',
          2500000, '#2ca25f',
          47000000, '#006d2c',
          ],
        'fill-opacity': 0.8
    }
},firstSymbolId);

map.addLayer({
  'id': 'mask',
  'type': 'fill',
  'source': {
      'type': 'geojson',
      'data': clipped
  },
  'layout': {},
  'paint': {
      'fill-color': '#a9a9a9',
      'fill-opacity': 1
  }
},firstSymbolId);


map.addLayer({
  'id': 'sub',
  'type': 'line',
  'source': 'cable',
  'paint': {
    
    'line-color': '#838383',
    'line-width': 3
  
  }
},firstSymbolId)





      







  })

 
}






/*function add1km() {
  console.log('hi')

  d3.buffer('hex10.pbf').then(function(data) {
    var gjn = geobuf.decode(new Pbf(data))

    map.addSource('hex10', {
      type: 'geojson',
      data: gjn
    })

    map.addLayer({
      'id': 'hex10',
      'type': 'fill',
      'source': 'hex10',
      'paint': {
        
        'fill-color': 'green',
        //'fill-color': match,
      'fill-opacity': 0.6,
      
      }

    })

  })
 */

  


  




  /*d3.csv('hex1.csv').then(function(data){

    data.forEach(function(row) {

      var green = row['1a2'] * 255;
      var color = 'rgb(0, ' + green + ', 0)';
      
      match.push(row['code'], color);



    }) */

  /*map.on('idle', function(e) {
    console.log(e);
    if(e.target._fullyLoaded) {
      console.log('hey')
    }
  }) */

  /*map.addSource('hex', {
    'type': 'vector',
    'tiles': [
      //'http://localhost:8080/t1/{z}/{x}/{y}.pbf'
      //'http://localhost:8080/t1/{z}/{x}/{y}.pbf'
    //'https://sebastian-ch.github.io/sidsDataTest/data/tile-hex-5km/{z}/{x}/{y}.pbf'
    
    'http://localhost:8080/localTiles/tiles1/{z}/{x}/{y}.pbf'
    ],

    //url: 'mapbox://sebastian-ch.bzzfyhz9'
    
    });

    map.addLayer(
      {
      'id': 'hex',
      'type': 'fill',
      'source': 'hex',
      'source-layer': 'hex10-3857-a46wc4',
      //'source-layer': 'drnew',
      //'source-layer': 'dropped4',
      //'source-layer': 'hex-1km',
     
      //'filter': ['>=', '1b2', 0],
      
      'paint': {
        
          'fill-color': 'purple',
          //'fill-color': match,
        'fill-opacity': 0.6,
        
        }
      },
      ); */

   // })
      //console.log(map.getStyle().layers)






