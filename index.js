/*Initialize Map */
mapboxgl.accessToken =
  "pk.eyJ1Ijoic2ViYXN0aWFuLWNoIiwiYSI6ImNpejkxdzZ5YzAxa2gyd21udGpmaGU0dTgifQ.IrEd_tvrl6MuypVNUGU5SQ";

  const map = new mapboxgl.Map({
    container: "map", // container ID
    //style: 'mapbox://styles/mapbox/light-v10', //?optimize=true
    style: 'mapbox://styles/mapbox/light-v10', 
    center: [-77, 18], // starting position [lng, lat]
    zoom: 7,
    //pitch: 55
  });

  var firstSymbolId;


  map.on("load", function () {

    
   // add1km();

    addSub();
    

  })

map.on('move', function() {
  //console.log(map.getZoom())
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
  
  d3.json('./jclipped.geojson').then(function(d) {

    console.log(d);
    var data1 = []

    d.features.forEach(function(x) {
      data1.push(x.properties['1b1'])
    })

   /* var data1 = d.map(x => x['1b1'])
    console.log(data1) */
    
    map.addSource('cable', {
      type: 'geojson',
      data: d
    })

    map.addLayer({
      'id': 'jamaica',
      'source': 'cable',
      'type': 'fill',
      'paint': {
        'fill-color': 'orange'
      }
    })

    map.once('idle', function(){
      turnTo()
    })

  })


  

}


function turnTo() {


  //query rendered features
  var feats = map.queryRenderedFeatures({
        layers: ['jamaica']
      })

  console.log(feats)


    //convert rendered features to geojson format
  var fc = turf.featureCollection(feats);

  console.log(fc);


  //add new source 
  map.addSource('newone', {
    type: 'geojson',
    data: fc //data is the new geojson 
  })


  map.addLayer({
    'id': 'newone',
    'source': 'newone',
    'type': 'fill',
    'paint': {
      'fill-color': 'green'
    }
  })


}





  
