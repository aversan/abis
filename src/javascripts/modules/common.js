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
  var brMap = function(coords,id){
    var self = this;
    this.coords = coords;
    this.map = null;
    this.marker = null;
    this.id = id;

    this.renderMap = function(){
      if(typeof self.coords == "undefined"){
        self.coords = [55.754943, 37.557048];
        $('#map'+self.id).closest('.main-sect-stack').find('.print-hidden').hide();
      }
      var mapOptions = {
        zoom: 17,
        center: new google.maps.LatLng(self.coords[0] - 0.0005,self.coords[1]),
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
      var block = document.getElementById('map'+self.id);
      block.style.width = '620px';
      block.style.height = '410px';
      self.map = new google.maps.Map(document.getElementById('map'+self.id),mapOptions);
      self.renderMarker();
    },

      this.redrawMap = function()
      {
        document.getElementById('map'+self.id).innerHTML = '';
        self.renderMap();
      },



      this.renderMarker = function(){
        self.marker = new google.maps.Marker({
          position: new google.maps.LatLng(self.coords[0],self.coords[1]),
          map: self.map,
        });
      }

    this.renderMap();

    return this;
  };


  function renderMaps(mapPrints){
    for(var i in mapPrints){
      if(typeof window.mapDraw[i] === "undefined"){
        var mapObject = new brMap(window.APP[i],i);
        window.mapDraw[i] = {'object' : mapObject,'centers' : window.APP[i]};
      }
    }
  }

  var printMaps = function (map) {
    var body               = $('body'),
      mapContainer       = $(map),
      mapContainerParent = mapContainer.parent(),
      printContainer     = $('<div>');
    body.prepend(printContainer);
    printContainer
      .addClass('print-container')
      .css('position', 'relative')
      .height(mapContainer.height())
      .append(mapContainer);

    var content = body.children().not('script').not(printContainer).detach();
    window.print();
    body.prepend(content);
    mapContainerParent.prepend(mapContainer);
    printContainer.remove();
  };

  $(document).ready(function(){
    window.mapDraw = {};
    if(window.APP && typeof window.APP != "undefined"){
      var mapPrints = {};
      $('.tab-content .tab-pane.active .js-map-container').each(function(i,o){
        var id = $(o).attr('id').split('map').join('');
        mapPrints[id] = {};
      });

      google.maps.event.addDomListener(window, 'load', renderMaps(mapPrints));
      $('body').on('click','.nav_primary a',function(event){
        if(!$(this).hasClass('__ntriggerClick')){
          $(this).addClass('__ntriggerClick')
        }else{
          $(this).removeClass('__ntriggerClick')
        }
        var mapPrints = {};
        $('.tab-content .tab-pane.active .js-map-container').each(function(i,o){
          var id = $(o).attr('id').split('map').join('');
          mapPrints[id] = {};
        });
        renderMaps(mapPrints);
        if($(this).hasClass('__ntriggerClick')){
          var b = $(this);
          setTimeout(function(){$(b).trigger('click');},500);
        }

      });
    }
  });
})();
