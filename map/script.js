function GetMap() {
var map = new Microsoft.Maps.Map('#myMap', {
    credentials: 'AlqUbMVkRpMkWMcFs_18FoZGeNcg8RLToYX5OeOCHnexAuUZxqtesONoCbT1sTAd',
    center: new Microsoft.Maps.Location(25,70),
    mapTypeId: Microsoft.Maps.MapTypeId.aerial,
    zoom: 2
});
}
var xhttp = new XMLHttpRequest();
var block,bs;
var d={}
var co = 0;
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      block = this.responseText;
        var map = new Microsoft.Maps.Map('#myMap', {
            credentials: 'AlqUbMVkRpMkWMcFs_18FoZGeNcg8RLToYX5OeOCHnexAuUZxqtesONoCbT1sTAd',
            center: new Microsoft.Maps.Location(25,78),
            mapTypeId: Microsoft.Maps.MapTypeId.aerial,
            zoom: 5
        });
        infobox = new Microsoft.Maps.Infobox(map.getCenter(), {
            visible: false
        });
        infobox.setMap(map);
      renderBlocks(map);
    }
};
xhttp.open("GET", "/blocks", true);
xhttp.send();

const addPins = function(map,hospid,hospname,vacant,occupied,longi,lati,vbed,obed,k){
    if (longi!=null || lati!=null){
        co=co+1;
        var locs = new Microsoft.Maps.Location(longi,lati);
        var pin = new Microsoft.Maps.Pushpin(locs);
        pin.metadata ={
            title: hospname,
            description: '<table border="0px">\
            <tr> <th>Vacant</th> <th> Occupied</th></tr>\
            <tr><td>Ventilators</td></tr>\
            <tr><td>' +vacant.toString()+'</td><td>'+occupied.toString()+'</td>\
            <tr><td>Hospital Beds</td>\
            <tr><td>' +vbed.toString()+'</td><td>'+obed.toString() +'</td></tr>\
            </table><a href="https://www.google.com/maps/search/?api=1&query='+hospname+'">Get directions.'
        };
        Microsoft.Maps.Events.addHandler(pin, 'click', pushpinClicked);
        map.entities.push(pin);
    }
}
var vacants= occupieds = vbeds = obeds = 0;
const renderBlocks=function(map){
     bs = JSON.parse(block);
     for (var i in bs.chain){
        if (i!=0){
            d[bs.chain[i].ventilators[0].hospid]=[bs.chain[i].ventilators[0].hospitalname,parseInt(bs.chain[i].ventilators[0].vacant),parseInt(bs.chain[i].ventilators[0].occupied),bs.chain[i].ventilators[0].longi,bs.chain[i].ventilators[0].lati,parseInt(bs.chain[i].ventilators[0].vbed),parseInt(bs.chain[i].ventilators[0].obed)]
        }
     }
     console.log(d)
     pushAllPins(map)
}

const pushAllPins = function(map){
    var k = 1
    for (var j in d){
        vacants=vacants+d[j][1];
        occupieds=occupieds+d[j][2];
        vbeds = vbeds+d[j][5];
        obeds = obeds+d[j][6];
        addPins(map,j,d[j][0],d[j][1],d[j][2],d[j][3],d[j][4],d[j][5],d[j][6],k)
        k=k+1
     }
     document.querySelector(".vacant").innerHTML=vacants;
     document.querySelector(".occupied").innerHTML=occupieds;
     document.querySelector(".vbed").innerHTML=vbeds;
     document.querySelector(".obed").innerHTML=obeds;
     document.querySelector(".counts").innerHTML='<br><br>'+co.toString();
 };
 function pushpinClicked(e) {
        //Make sure the infobox has metadata to display.
        if (e.target.metadata) {
            //Set the infobox options with the metadata of the pushpin.
            infobox.setOptions({
                location: e.target.getLocation(),
                title: e.target.metadata.title,
                description: e.target.metadata.description,
                visible: true
            });
        }
    }
var ul = document.getElementById('dynamics');
function dynamicsearch(){
    var lo = document.getElementById('searchname').value;    
    ul.innerHTML=''
    for(var i in d) {
    if (d[i][0].search(lo)!=-1){
        ul.style.height='80px';
        let li = document.createElement('li');
        li.textContent=d[i][0]
        li.setAttribute('se-long',d[i][3])
        li.setAttribute('se-lat',d[i][4])
        li.setAttribute('se_id',i)
        ul.appendChild(li)
    }
    }
    document.querySelectorAll('li').forEach(function(elem) {
        elem.addEventListener('click',(e)=>{
        dynclick(e)
    })
})
}

function dynclick(e){
    ul.innerHTML=''
    ul.style.height='0px';
    var mnh = e.target.attributes[2].nodeValue
    document.querySelector('.searchres').innerHTML=e.target.textContent+"<br>\
    "+'<table border="0px">\
            <tr> <th>Vacant</th> <th> Occupied</th></tr>\
            <tr><td>Ventilators</td></tr>\
            <tr><td>' +d[mnh][2].toString()+'</td><td>'+d[mnh][1].toString()+'</td>\
            <tr><td>Hospital Beds</td>\
            <tr><td>' +d[mnh][6].toString()+'</td><td>'+d[mnh][5].toString() +'</td></tr>\
            </table><a href="https://www.google.com/maps/search/?api=1&query='+e.target.textContent+'">Get directions.'
            console.log(e)
}
function showson(){
    document.querySelector('.cvr').style.display='block';
    document.querySelector('.hdd').style.display='block';
    document.querySelector('#myMap').style.display='none';
    document.querySelector('#pseudo').style.display='block'; 
}
function cls(){
    document.querySelector('.cvr').style.display='none';
    document.querySelector('.hdd').style.display='none';
    document.querySelector('#myMap').style.display='block';
    document.querySelector('#pseudo').style.display='none'; 
}

/*
function GetMap() {



if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition((position)=> {
        console.log(`latitude:${position.coords.latitude}\nlongitude:${position.coords.longitude}`)
        let latitude = position.coords.latitude
        let longitude = position.coords.longitude
        
        getPin(latitude,longitude)
    })
}
function getPin(latitude,longitude){
    var map = new Microsoft.Maps.Map('#myMap', {
        credentials: 'AlqUbMVkRpMkWMcFs_18FoZGeNcg8RLToYX5OeOCHnexAuUZxqtesONoCbT1sTAd',
        center: new Microsoft.Maps.Location(latitude,longitude),
        mapTypeId: Microsoft.Maps.MapTypeId.aerial,
        zoom:2
    });
    var pushpin = new Microsoft.Maps.Pushpin(map.getCenter(), null);
    map.entities.push(pushpin);
    document.getElementById("LocateMeButton").click()

}

// Microsoft.Maps.loadModule('Microsoft.Maps.Directions', function () {
    
//     var directionsManager = new Microsoft.Maps.Directions.DirectionsManager(map);
//     // Set Route Mode to driving
//     directionsManager.setRequestOptions({ routeMode: Microsoft.Maps.Directions.RouteMode.driving });
//     var waypoint1 = new Microsoft.Maps.Directions.Waypoint({ address: 'Redmond', location: new Microsoft.Maps.Location(47.67683029174805, -122.1099624633789) });
//     var waypoint2 = new Microsoft.Maps.Directions.Waypoint({ address: 'Seattle', location: new Microsoft.Maps.Location(47.59977722167969, -122.33458709716797) });
//     directionsManager.addWaypoint(waypoint1);
//     directionsManager.addWaypoint(waypoint2);
//     // Set the element in which the itinerary will be rendered
//     directionsManager.setRenderOptions({ itineraryContainer: document.getElementById('printoutPanel') });
//     directionsManager.calculateDirections();
//     directionsManager.geolocation
// });
}

function StartTracking() {
    //Add a pushpin to show the user's location.
    userPin = new Microsoft.Maps.Pushpin(map.getCenter(), { visible: false });
    map.entities.push(gpsPin);

    //Watch the users location.
    watchId = navigator.geolocation.watchPosition(UsersLocationUpdated);
}

function UsersLocationUpdated(position) {
    var loc = new Microsoft.Maps.Location(
                position.coords.latitude,
                position.coords.longitude);

    //Update the user pushpin.
    userPin.setLocation(loc);
    userPin.setOptions({ visible: true });

    //Center the map on the user's location.
    map.setView({ center: loc });
}

function StopTracking() {
    // Cancel the geolocation updates.
    navigator.geolocation.clearWatch(watchId);

    //Remove the user pushpin.
    map.entities.clear();
}
var xhttp = new XMLHttpRequest();
var block,bs;
var d={}
var co = 0;

xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      block = this.responseText;
        var map = new Microsoft.Maps.Map('#myMap', {
            credentials: 'AlqUbMVkRpMkWMcFs_18FoZGeNcg8RLToYX5OeOCHnexAuUZxqtesONoCbT1sTAd',
            center: new Microsoft.Maps.Location(25,78),
            mapTypeId: Microsoft.Maps.MapTypeId.aerial,
            zoom: 5
        });
        infobox = new Microsoft.Maps.Infobox(map.getCenter(), {
            visible: false
        });
        infobox.setMap(map);
      renderBlocks(map);
    }
};
xhttp.open("GET", "/blocks", true);
xhttp.send();


function showson(){
    document.querySelector('.cvr').style.display='block';
    document.querySelector('.hdd').style.display='block';
    document.querySelector('#myMap').style.display='none';
    document.querySelector('#pseudo').style.display='block'; 
}
function cls(){
    document.querySelector('.cvr').style.display='none';
    document.querySelector('.hdd').style.display='none';
    document.querySelector('#myMap').style.display='block';
    document.querySelector('#pseudo').style.display='none'; 
}
* */