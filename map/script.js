function GetMap() {
var map = new Microsoft.Maps.Map('#myMap', {
    credentials: 'YOUR_ACCESS_TOKEN',
    center: new Microsoft.Maps.Location(29.9792,31.1342),
    mapTypeId: Microsoft.Maps.MapTypeId.aerial,
    zoom: 20
});

Microsoft.Maps.loadModule('Microsoft.Maps.Directions', function () {
    var directionsManager = new Microsoft.Maps.Directions.DirectionsManager(map);
    // Set Route Mode to driving
    directionsManager.setRequestOptions({ routeMode: Microsoft.Maps.Directions.RouteMode.driving });
    var waypoint1 = new Microsoft.Maps.Directions.Waypoint({ address: 'Redmond', location: new Microsoft.Maps.Location(47.67683029174805, -122.1099624633789) });
    var waypoint2 = new Microsoft.Maps.Directions.Waypoint({ address: 'Seattle', location: new Microsoft.Maps.Location(47.59977722167969, -122.33458709716797) });
    directionsManager.addWaypoint(waypoint1);
    directionsManager.addWaypoint(waypoint2);
    // Set the element in which the itinerary will be rendered
    directionsManager.setRenderOptions({ itineraryContainer: document.getElementById('printoutPanel') });
    directionsManager.calculateDirections();
});

function getPin(){
    var pushpin = new Microsoft.Maps.Pushpin(map.getCenter(), null);
    map.entities.push(pushpin);
}
getPin()
}