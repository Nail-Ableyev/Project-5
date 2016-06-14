#Description: 
Application that shows the Thai food restaurants in the vicinity of an arbitrary chosen point in London,UK; Information is taken from FourSquare API response and placed on the google map. 

#How to use
Clone this repository or download files onto you computer. Open `index.html` file using any modern browser.

#How it works 
User can click on a marker or names of the restaurants on the left side. When clicked, phone number of the chosen place is displayed in an infowindow. If chosen from the list, the map will be centered to the current venue and an infowindow will be opened automatically. Search is implemented as well to help navigation.

#Dependencies: 
##APIs:

 - Google Maps Javascript API (https://developers.google.com/maps/documentation/javascript)
 - Foursquare API (https://developer.foursquare.com)

##Libraries and frameworks 

 - **JQUERY** (https://jquery.com)
 - **Knockout.js** (http://knockoutjs.com)
 - **SweetAlert**  (http://t4t5.github.io/sweetalert/) to handle errors.
 - **InfoBubble** (https://github.com/googlemaps/js-info-bubble.git) instead of infoWindow object because first one is easier to customize.

Thank you, developers! And also want to thank creator(s) of the amazing icons i used (https://mapicons.mapsmarker.comLogo)