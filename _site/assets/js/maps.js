/*
|--------------------------------------------------------------------------
| GOOGLE MAP
|--------------------------------------------------------------------------
*/

if ($('#mapWrapper').length) {
	appendBootstrap();
}

function appendBootstrap() {
	"use strict";
	if ($('#mapWrapper').length) {
		var script = document.createElement("script");
		script.type = "text/javascript";
		script.src = "//maps.google.com/maps/api/js?key=AIzaSyAkWUrZWkfDkiqEol6LSQXdnS851tNQttg&callback=initialize";
		document.body.appendChild(script);
	}
}

function initialize(id) {
	"use strict";
	var image = '/assets/img/icon-map.png',
		overlayTitle = 'Stichting Fly Aware';
	var locations = [
		['<strong>Stichting Fly Aware</strong>', 'postadres: Blikkenburgerlaan 1 in Zeist<br><a href="https://goo.gl/maps/Q9jbDDab42P2" target="_blank" title="bereken routebeschrijving">routebeschrijving »<a>',52.0779114,5.24140280000006],
		['<strong>Stichting Fly Aware</strong>', 'bezoekadres: Apeldoornseweg 47 in Arnhem<br><a href="https://goo.gl/maps/VgMswBzM4CE2" target="_blank" title="bereken routebeschrijving">routebeschrijving »<a>',51.9909261,5.89637289999996]
	];
	/*** DON'T CHANGE ANYTHING PASSED THIS LINE ***/
	id = (id === undefined) ? 'mapWrapper' : id;

	var map = new google.maps.Map(document.getElementById(id), {
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		scrollwheel: false,
		zoomControl: true,
		zoomControlOptions: {
			style: google.maps.ZoomControlStyle.LARGE,
			position: google.maps.ControlPosition.LEFT_CENTER
		},
		streetViewControl: true,
		scaleControl: false,
		zoom: 14

	});

	var myLatlng,
		marker, i,
		bounds = new google.maps.LatLngBounds(),
		infowindow = new google.maps.InfoWindow({
			content: "loading..."
		});

	for (i = 0; i < locations.length; i++) {
		if (locations[i][2] !== undefined && locations[i][3] !== undefined) {
			var content = '<div class="infoWindow">' + locations[i][0] + '<br>' + locations[i][1] + '</div>';
			(function(content) {
				myLatlng = new google.maps.LatLng(locations[i][2], locations[i][3]);

				marker = new google.maps.Marker({
					position: myLatlng,
					icon: image,
					title: overlayTitle,
					map: map
				});

				google.maps.event.addListener(marker, 'click', (function() {
					return function() {
						infowindow.setContent(content);
						infowindow.open(map, this);
					};
				})(this, i));

				if (locations.length > 1) {
					bounds.extend(myLatlng);
					map.fitBounds(bounds);
				} else {
					infowindow.setContent(content);
					infowindow.open(map, marker);
					map.setCenter(myLatlng);
				}
			})(content);
		} else {

			var geocoder = new google.maps.Geocoder(),
				info = locations[i][0],
				addr = locations[i][1],
				latLng = locations[i][1];

			(function(info, addr) {

				geocoder.geocode({

					'address': latLng

				}, function(results) {

					myLatlng = results[0].geometry.location;

					marker = new google.maps.Marker({
						position: myLatlng,
						icon: image,
						title: overlayTitle,
						map: map
					});
					var $content = '<div class="infoWindow">' + info + '<br>' + addr + '</div>';
					google.maps.event.addListener(marker, 'click', (function() {
						return function() {
							infowindow.setContent($content);
							infowindow.open(map, this);
						};
					})(this, i));

					if (locations.length > 1) {
						bounds.extend(myLatlng);
						map.fitBounds(bounds);
					} else {
						map.setCenter(myLatlng);
					}
				});
			})(info, addr);

		}
	}
}
