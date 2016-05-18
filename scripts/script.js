var suda ={
  category: "thai restaurant",
  address: "St Martin's Courtyard, 23 Slingsby Pl, London WC2E 9AB",
  lat: 51.512969,
  lng: -0.126213,
  title: "SUDA Thai Cafe Restaurant",
  phone: "waiting 4 4square"
};

var tho = {
category: "thai restaurant",
address: "42 Rupert St, Westminster, London W1D 6DP",
lat: 51.511376,  
lng: -0.132827,
title:"Thai Tho",
phone: "waiting 4 4square"
};

//List of hardcoded locations
var listofcafes = [suda, tho];

//constructor for making observables from the list. Will be used later
var Cafe = function(data){
  this.category = ko.observable(data.category);
  this.address = ko.observable(data.address);
  this.lat = ko.observable(data.lat);
  this.lng = ko.observable(data.lng);
  this.title = ko.observable(data.title);
  this.phone = ko.observable(data.phone)
  this.marker = data.marker;
  this.infowindow = data.infowindow
};
var map;
var infowindow;
var foursquareID='Q55FKP4Q4UOLIPVR0ITORHNILDCQDGWLCFM0MA1ZNVTCPAH4';
var foursquareKey='CDZRIXAWM1KR3GTHHEUL1REEL14FQOIIK4BENU13N0GOPVNK';


//function that gives animation to marker when clicked. Will be use later
function toggleBounce() {
 var self = this;
 if (this.getAnimation() !== null) {
  this.setAnimation(null);
 } else {
  this.setAnimation(google.maps.Animation.BOUNCE);
  setTimeout(function() {
   self.setAnimation(null)
  }, 2000);
}
};

//Google map
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 51.513817, lng: -0.126976},
      zoom: 16
    });


  infowindow = new google.maps.InfoWindow(); 

//loop through the list of cafes(not ko observable list) and create markers
  for(var i = 0; i<listofcafes.length; i++){
    listofcafes[i].marker = new google.maps.Marker({
          position: {lat:listofcafes[i].lat, lng:listofcafes[i].lng},
          map: map,
          animation: google.maps.Animation.DROP,
          title: listofcafes[i].title
        });
    listofcafes[i].marker.addListener('click', toggleBounce);

//create infowindow, emty for now
    listofcafes[i].marker.addListener('click', function() {
      infowindow.open(map, this);
    }) 

  }
//apply ko bindings so that it works only after map is loaded
var myVM = new viewModel();
    ko.applyBindings(myVM)
};

var viewModel=function(){
  var self = this;
  self.observablecafelist = ko.observableArray([]);


//uses constructor on each item of the list and populates observablecafelist
  listofcafes.forEach(function(item){
    self.observablecafelist.push(new Cafe(item))
  })
  

  self.searcher = ko.observable('');
  self.search = ko.computed(function(){
    return ko.utils.arrayFilter(self.observablecafelist(), function(point){
      if(point.title().toLowerCase().indexOf(self.searcher().toLowerCase()) >= 0){
        point.marker.setVisible(true);
        return true;
      }
      else{
        point.marker.setVisible(false);
        return false;
      }
    });
  });
}
;
console.log("Y"+suda.phone)

$( "#listofitems" ).click(function() {
  console.log("Y"+suda.phone);
});

//Ajax request for Foursquare api. 
// It doesn't do anythin - just logging info. working on adding telephone to the infowindow
//
  $.ajax({
  //url: 'https://api.foursquare.com/v2/venues/search?client_id=Q55FKP4Q4UOLIPVR0ITORHNILDCQDGWLCFM0MA1ZNVTCPAH4&client_secret=CDZRIXAWM1KR3GTHHEUL1REEL14FQOIIK4BENU13N0GOPVNK&v=20130815&ll=51.512969,-0.126213&query=thai',
  url: 'https://api.foursquare.com/v2/venues/search?client_id='+
  foursquareID+'&client_secret='+foursquareKey+'&v=20130815&ll='
  +curr.lat +',' +curr.lng + '&query=thai',
  datatype: 'json',
    success: function(response){
    console.log(response)
  }
  })
}

