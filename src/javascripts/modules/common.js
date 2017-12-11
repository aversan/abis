import 'bootstrap/js/dist/modal';
import 'bootstrap/js/dist/util';

$(() => {
  // 60fps scrolling using pointer-events: none
  // https://habrahabr.ru/post/204238/
  const { body } = document;
  let timer;
  window.addEventListener('scroll', () => {
    clearTimeout(timer);
    if (!body.classList.contains('disable-hover')) {
      body.classList.add('disable-hover');
    }
    timer = setTimeout(() => {
      body.classList.remove('disable-hover');
    }, 500);
  }, false);
});


(function(){
  const brMap = function(coords, id) {
    const self = this;
    this.coords = coords;
    this.map = null;
    this.marker = null;
    this.id = id;

    this.renderMap = () => {
      if(typeof self.coords === undefined){
        self.coords = [55.754943, 37.557048];
      }
      const mapOptions = {
        zoom: 17,
        center: new google.maps.LatLng(self.coords[0] - 0.0005, self.coords[1]),
        scrollwheel: false,
        navigationControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl : true,
        streetViewControlOptions : {
          position: google.maps.ControlPosition.LEFT_BOTTOM
        },
        zoomControl: true,
        zoomControlOptions: {
          position: google.maps.ControlPosition.LEFT_BOTTOM
        },
        draggable: true,
      };
      const block = document.getElementById('map' + self.id);
      block.style.width = '100%';
      block.style.height = '500px';
      self.map = new google.maps.Map(document.getElementById('map' + self.id), mapOptions);
      self.renderMarker();
    };

    this.redrawMap = () => {
      document.getElementById('map'+self.id).innerHTML = '';
      self.renderMap();
    };

    this.renderMarker = () => {
      self.marker = new google.maps.Marker({
        position: new google.maps.LatLng(self.coords[0],self.coords[1]),
        map: self.map,
        icon: 'http://e52ddfe8.ngrok.io/abis/images/abis-marker.png',
      });
    };

    this.renderMap();
    return this;
  };

  function renderMaps(mapPrints) {
    for(let i in mapPrints){
      if(typeof window.mapDraw[i] === 'undefined'){
        console.log(1);
        const mapObject = new brMap(window.APP[i], i);
        window.mapDraw[i] = { 'object': mapObject, 'centers': window.APP[i] };
      }
    }
  }

  $(() => {
    window.mapDraw = {};
    if(window.APP && typeof window.APP !== 'undefined'){
      let mapPrints = {};
      mapPrints[1] = {};
      google.maps.event.addDomListener(window, 'load', renderMaps(mapPrints));
    }
  });
})();
