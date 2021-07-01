/*Initialize Map */
mapboxgl.accessToken =
  "pk.eyJ1Ijoic2ViYXN0aWFuLWNoIiwiYSI6ImNpejkxdzZ5YzAxa2gyd21udGpmaGU0dTgifQ.IrEd_tvrl6MuypVNUGU5SQ";

  const map = new mapboxgl.Map({
    container: "map", // container ID
    //style: 'mapbox://styles/mapbox/light-v10', //?optimize=true
    style: 'mapbox://styles/mapbox/light-v10', 
    center: [-71.4, 19.1], // starting position [lng, lat]
    zoom: 9,
    //pitch: 55
  });


  map.on("load", function () {

    
    add1km();
    

  })

map.on('move', function() {
  console.log(map.getZoom())
})

var breaks = []
var colors = ['#edf8fb', '#b2e2e2','#66c2a4','#2ca25f', '#006d2c' ]



function add1km() {
  console.log('hi')

  map.addSource('hex', {
    'type': 'vector',
    'tiles': [
      //'http://localhost:8080/tesg/{z}/{x}/{y}.pbf'
    'https://sebastian-ch.github.io/sidsDataTest/data/tesg/{z}/{x}/{y}.pbf'
    ],
    'minzoom': 0,
    'maxzoom': 10
    });

    map.addLayer(
      {
      'id': 'hex',
      'type': 'fill',
      'source': 'hex',
      'source-layer': 'drnew',
      'filter': ['>=', '1b2', 0],
      
      'paint': {
        'fill-color': [
          'interpolate',
          ['linear'],
          ['get', '1b2'],
          .011, colors[0],
          .028, colors[1],
          .049, colors[2],
          .079, colors[3],
          .199, colors[4],
          
          ],
        'fill-opacity': 0.8,
        
        }
      },
      );


      console.log(map.getStyle().layers)

}




