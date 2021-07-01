/*Initialize Map */
mapboxgl.accessToken =
  "pk.eyJ1Ijoic2ViYXN0aWFuLWNoIiwiYSI6ImNpejkxdzZ5YzAxa2gyd21udGpmaGU0dTgifQ.IrEd_tvrl6MuypVNUGU5SQ";

  const map = new mapboxgl.Map({
    container: "map", // container ID
    //style: 'mapbox://styles/mapbox/light-v10', //?optimize=true
    style: 'mapbox://styles/mapbox/light-v10', 
    center: [-71.4, 19.1], // starting position [lng, lat]
    zoom: 7,
    //pitch: 55
  });


  map.on("load", function () {

    
    add1km();
    

  })







function add1km() {
  console.log('hi')

  map.addSource('hex', {
    'type': 'vector',
    'tiles': [
    //'http://localhost:8080/tesg/{z}/{x}/{y}.pbf'
    'https://github.com/SIDS-Dashboard/mvtTest/tree/main/tesg/{z}/{x}/{y}.pbf'
    ],
    'minzoom': 0,
    'maxzoom': 10
    });

    map.addLayer(
      {
      'id': 'hex',
      'type': 'line',
      'source': 'hex',
      'source-layer': 'drnew',
      'layout': {
      'line-cap': 'round',
      'line-join': 'round'
      },
      'paint': {
      'line-opacity': 0.6,
      'line-color': 'rgb(53, 175, 109)',
      'line-width': 2
      }
      },
      );


      console.log(map.getStyle().layers)

}




