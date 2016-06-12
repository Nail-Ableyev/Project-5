var initial_lat=51.513817;
var initial_lng=-0.126976;
var image="img/thai.png";

//initially empty list. it will be populated with the help
//of ajax request from FourSquare
var listofcafes = [];

//constructor for making observables from the list. Will be used later
var Cafe = function(data){
  this.address = ko.observable(data.location.address);
  this.lat = ko.observable(data.location.lat);
  this.lng = ko.observable(data.location.lng);
  this.name = ko.observable(data.name);
  this.phone = ko.observable(data.contact.formattedPhone);
  this.marker = data.marker;
};

var map; 
var infowindow;
var foursquareID="Q55FKP4Q4UOLIPVR0ITORHNILDCQDGWLCFM0MA1ZNVTCPAH4";
var foursquareKey="CDZRIXAWM1KR3GTHHEUL1REEL14FQOIIK4BENU13N0GOPVNK";


//function that gives animation to marker when clicked. Will be use later
function toggleBounce() {
 var self = this;
 if (this.getAnimation() !== null) {
  this.setAnimation(null);
 } else {
  this.setAnimation(google.maps.Animation.BOUNCE);
  setTimeout(function() {
   self.setAnimation(null);
  }, 2000);
}
}

//google maps error handling function 
//(borrowed from http://stackoverflow.com/questions/14687237/google-maps-api-async-loading)
setTimeout(function(){
  if(!window.google || !window.google.maps){
//using SweetAlert instead of default alert()
//(http://t4t5.github.io/sweetalert/)
    swal("OOPS!", "Seems like you have no internet connection. Check the connection please", "error");
  }
}, 5000);

//Google map
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 51.513817, lng: -0.126976},
      zoom: 13
    });

//instead of default infowindow Infobubble library is used in order to add some styling.
//(https://github.com/googlemaps/js-info-bubble.git). 
  infowindow = new InfoBubble({
    shadowStyle: 0,
    backgroundColor: 'rgba(240,240,240,0.7)'
  }); 


//apply ko bindings so that it works only after map is loaded
var myVM = new viewModel();
    ko.applyBindings(myVM);
}

var viewModel=function(){
  var self = this;
  self.observablecafelist = ko.observableArray([]);
  self.searcher = ko.observable('');

  $.ajax({
  url: 'https://api.foursquare.com/v2/venues/search?client_id='+
  foursquareID+'&client_secret='+foursquareKey+'&v=20130815&ll='
  +initial_lat+','+initial_lng+'&query=thai,&limit=20',
  datatype: 'json',
}).done (function(response){
    listofcafes=response.response.venues;
    listofcafes.forEach(function(item){
    var amarker = new google.maps.Marker({
          position: {lat:item.location.lat, lng:item.location.lng},
          map: map,
          icon: image,
          animation: google.maps.Animation.DROP
        });
    amarker.addListener('click', toggleBounce);
    amarker.addListener('click', function() {
      infowindow.setContent('<p>'+item.name+
      '</p><p class="winContact">'+item.contact.formattedPhone+'</p>');
      infowindow.open(map, this);
    });
  //created new property that wasn't provided in the initial response from 4square
  item.marker=amarker;
  //populate observable list passing info through the constructor
  self.observablecafelist.push(new Cafe(item));
  });
}).fail(function() {
//using SweetAlert instead of default alert()
//(http://t4t5.github.io/sweetalert/)
    swal("OOPS!", "We have troubles getting to FourSquare. Try to reload the page", "error");
  });

//variable and function used to handle click event on the list(using KO click binding)
    self.currentPlace;
    self.setCurrentPlace=function(place){
      self.currentPlace=place;
      infowindow.setContent('<p>'+self.currentPlace.name()+
        '</p><p class="winContact">'+self.currentPlace.phone()+'</p>');
      infowindow.open(map, self.currentPlace.marker);
      var centermap=new google.maps.LatLng(self.currentPlace.lat(), self.currentPlace.lng());
      map.panTo(new google.maps.LatLng(self.currentPlace.lat(), self.currentPlace.lng()))
    }


    self.search = ko.computed(function(){
    return ko.utils.arrayFilter(self.observablecafelist(), function(point){
      if(point.name().toLowerCase().indexOf(self.searcher().toLowerCase()) >= 0){
        point.marker.setVisible(true);
        point.marker.toggleBounce;
        return true;
      }
      else{
        point.marker.setVisible(false);
        return false;
      }
    });
  });
  

};


