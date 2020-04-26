var map
var infoWindow

function initMap(){
    let styledMapType = new google.maps.StyledMapType(
        [
            {
            "elementType": "geometry",
            "stylers": [
                {
                "color": "#f5f5f5"
                }
            ]
            },
            {
            "elementType": "labels.icon",
            "stylers": [
                {
                "visibility": "off"
                }
            ]
            },
            {
            "elementType": "labels.text.fill",
            "stylers": [
                {
                "color": "#616161"
                }
            ]
            },
            {
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                "color": "#f5f5f5"
                }
            ]
            },
            {
            "featureType": "administrative.land_parcel",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                "color": "#bdbdbd"
                }
            ]
            },
            {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
                {
                "color": "#eeedbf"
                }
            ]
            },
            {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                "color": "#757575"
                }
            ]
            },
            {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [
                {
                "color": "#e5e5e5"
                }
            ]
            },
            {
            "featureType": "poi.park",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                "color": "#9e9e9e"
                }
            ]
            },
            {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
                {
                "color": "#ffc6c4"
                }
            ]
            },
            {
            "featureType": "road.arterial",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                "color": "#757575"
                }
            ]
            },
            {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [
                {
                "color": "#b8dad6"
                }
            ]
            },
            {
            "featureType": "road.highway",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                "color": "#616161"
                }
            ]
            },
            {
            "featureType": "road.local",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                "color": "#9e9e9e"
                }
            ]
            },
            {
            "featureType": "transit.line",
            "elementType": "geometry",
            "stylers": [
                {
                "color": "#c2bfee"
                }
            ]
            },
            {
            "featureType": "transit.station",
            "elementType": "geometry",
            "stylers": [
                {
                "color": "#c2bfee"
                }
            ]
            },
            {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
                {
                "color": "#c9c9c9"
                }
            ]
            },
            {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                "color": "#9e9e9e"
                }
            ]
            }
        ],
        {name: 'Styled Map'});

    let defaultCenter = {lat: 29.9792, lng: 31.1342}

    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(changeCenter)
    }

    function changeCenter(position){
        defaultCenter = {lat: position.coords.latitude, lng: position.coords.longitude + 0.01}
        map.panTo(defaultCenter)
    }


    infoWindow = new google.maps.InfoWindow();
    map = new google.maps.Map(document.getElementById('map'), {
        center: defaultCenter,
        zoom: 5,
        mapTypeId: 'roadmap',
        mapTypeControlOptions: {mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
        'styled_map']}
    });

    map.mapTypes.set('styled_map', styledMapType);
    map.setMapTypeId('styled_map');

}

function openSide(){
    document.getElementById("sidebar").style.transform = "translate(0,0)"
    document.getElementById("sidebar").style.webkitTransform = "translate(0,0)"
    document.getElementById("handle").style.transform = "translate(0,0)"
    document.getElementById("handle").style.webkitTransform = "translate(0,0)"
    document.getElementById("handle").innerHTML = "<i class='fa fa-chevron-left' onclick='closeSide()'></i>"
}

function closeSide(){
    document.getElementById("sidebar").style.transform = "translate(-100%, 0)"
    document.getElementById("sidebar").style.webkitTransform = "translate(-100%, 0)"
    document.getElementById("handle").style.transform = "translate(-935%, 0)"
    document.getElementById("handle").style.webkitTransform = "translate(-935%, 0)"
    document.getElementById("handle").innerHTML = "<i class='fa fa-chevron-right' onclick='openSide()'></i>"
}