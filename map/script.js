function GetMap() {
var map = new Microsoft.Maps.Map('#myMap', {
    credentials: 'YOUR_ACCESS_TOKEN',
    center: new Microsoft.Maps.Location(29.9792,31.1342),
    mapTypeId: Microsoft.Maps.MapTypeId.aerial,
    zoom: 20
}

);

function getPin(){
    var pushpin = new Microsoft.Maps.Pushpin(map.getCenter(), null);
    map.entities.push(pushpin);
}
getPin()
}