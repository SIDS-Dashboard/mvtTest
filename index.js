/*Initialize Map */
mapboxgl.accessToken =
  "pk.eyJ1Ijoic2ViYXN0aWFuLWNoIiwiYSI6ImNpejkxdzZ5YzAxa2gyd21udGpmaGU0dTgifQ.IrEd_tvrl6MuypVNUGU5SQ";

  const map = new mapboxgl.Map({
    container: "map", // container ID
    //style: 'mapbox://styles/mapbox/light-v10', //?optimize=true
    style: 'mapbox://styles/mapbox/light-v10', 
    center: [-71.4, 19.1], // starting position [lng, lat]
    zoom: 4,
    //pitch: 55
  });


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

  var randomColor = Math.floor(Math.random()*16777215).toString(16);

  d3.json('./cable-geo.json').then(function(d) {


    console.log(d);

    map.addSource('cable', {
      type: 'geojson',
      data: d
    })

    map.addLayer({
      'id': 'sub',
      'type': 'line',
      'source': 'cable',
      'paint': {
        
        'line-color': ['get', 'color'],
        'line-width': 3
      
      }
    })
  })


  d3.json('./landing-point-geo.json').then(function(data) {
    map.addSource('dots', {
      type: 'geojson',
      data: data
    })

    map.addLayer({
      id: 'dots',
      source: 'dots',
      type: 'circle',
      paint: {
        'circle-color': 'red',
        'circle-radius': 8
      }
    })


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






