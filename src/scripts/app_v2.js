//

var $ = require("../../node_modules/jquery");

(function () {
	var self = this;

	self.init = function () {
		self.generateBgMap();
		self.setSearchBox();
	};

	self.setSearchBox = function () {
		var input = document.getElementById('your_address__input');
		var searchBox = new google.maps.places.SearchBox(input);

		searchBox.addListener('places_changed', function () {
			var places = searchBox.getPlaces();

			if (places.length == 0) {
				return;
			}

			var coordsLat = places[0].geometry.location.lat(),
				coordsLng = places[0].geometry.location.lng(),
				coords = {lat: coordsLat, lng: coordsLng};

			// console.log(coords);

			self.generateBgMap(coords);
		});
	};

	self.generateBgMap = function (coordinates) {
		var map,
			coord = coordinates || {lat: -23.584293, lng: -46.676080};

			map = new google.maps.Map(document.getElementById('map'), {
				center: coord,
				zoom: 18
			});

			if (coordinates) {
				var service = new google.maps.places.PlacesService(map);
				service.radarSearch({
					location: coord,
					radius: 1000,
					types: ['restaurant']
				}, function(a, b) {
					console.log(a, b);
				});
			}
	}

	self.addMarker = function(place) {
		var marker = new google.maps.Marker({
		  map: map,
		  position: place.geometry.location,
		  icon: {
			url: 'https://developers.google.com/maps/documentation/javascript/images/circle.png',
			anchor: new google.maps.Point(10, 10),
			scaledSize: new google.maps.Size(10, 17)
		  }
		});
	}

	self.init();
})($);