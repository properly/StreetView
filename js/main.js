var initPosPanoID, streetView;

function initialize() {
  //In front of Ardenwood.
  var initPos = new google.maps.LatLng(-23.559568,-46.668402);

  // Set StreetView provider.
  var streetViewOptions = {
    zoom: 1,
    panoProvider:  getCustomPanorama,
    pov : {
      heading : 30,
      pitch : 0,
      zoom : 1
    }
  };

  // Create a StreetView object.
  var streetViewDiv = document.getElementById('streetview');
  streetViewDiv.style.fontSize = "15px";
  streetView = new google.maps.StreetViewPanorama(streetViewDiv, streetViewOptions);

  // Add links when it happens "links_change" event.
  google.maps.event.addListener(streetView, "links_changed", createCustomLink);

  // Create a StreetViewService object.
  var streetviewService = new google.maps.StreetViewService();

  // Get panorama ID of initPos
  var radius = 50;
  streetviewService.getPanoramaByLocation(initPos, radius, function(result, status) {
    if (status == google.maps.StreetViewStatus.OK) {
      initPosPanoID = result.location.pano;
      streetView.setPosition(result.location.latLng);
    }
  });

}

function getCustomPanoramaTileUrl(panoID, zoom, tileX, tileY) {
  // Return a pano image given the panoID.
  return "img/" + panoID + "/" + tileY + "_" + tileX + ".jpg"
}

function getCustomPanorama(panoID) {
  var streetViewPanoramaData = {
    links: [],
    tiles: {
        tileSize: new google.maps.Size(256, 256),
        worldSize: new google.maps.Size(4096, 2048),
        centerHeading: 0,
        getTileUrl: getCustomPanoramaTileUrl
     }
  };
  switch(panoID) {
    case "exterior-1":
      streetViewPanoramaData["location"] = {
        pano: "exterior-1",
        latLng: new google.maps.LatLng(-23.559568,-46.668402)
      };
      return streetViewPanoramaData;
    case "exterior-2":
      streetViewPanoramaData["location"] = {
        pano: "exterior-2",
        latLng: new google.maps.LatLng(-23.559568,-46.668402)
      };
      return streetViewPanoramaData;
    case "floor-1_room-3":
      streetViewPanoramaData["location"] = {
        pano: 'floor-1_room-3',
        description: "Primeiro andar",
        latLng: new google.maps.LatLng(-23.559568,-46.668402)
      };
      return streetViewPanoramaData;
    case "floor-1_room-4":
      streetViewPanoramaData["location"] = {
        pano: 'floor-1_room-4',
        description: "Terraço",
        latLng: new google.maps.LatLng(-23.559568,-46.668402)
      };
      return streetViewPanoramaData;
  }

}

function createCustomLink() {
  /*
   * add links
   */
  var links = streetView.getLinks();
  var panoID = streetView.getPano();

  switch(panoID) {
    // From the street
    case initPosPanoID:
      links.push({
        description : "Remix Social Ideas",
        pano : "exterior-1",
        heading : 55
      });
      break;

    //Inside
    case "exterior-1":
      links.push({
        description : "Remix Social Ideas",
        pano : "exterior-2",
        heading : 20
      },
      {
        description : "Alameda Tietê",
        pano : initPosPanoID,
        heading : 203
      });
      break;
    //In front of the house
    case "exterior-2":
      links.push({
        description : "Remix Social Ideas",
        pano : "floor-0_room-1",
        heading : 20
      },
      {
        description : "Saída",
        pano : "exterior-1",
        heading : 300
      });
      break;
    case "floor-1_room-3":
      links.push({
        description : "Cozinha",
        pano : "kitchen",
        heading : 20
      },
      {
        description : "Segundo Andar",
        pano : "floor-1_room-3",
        heading : 20
      },
      {
        description : "Saída",
        pano : "exterior-2",
        heading : 20
      });
      break;

    case "floor-1_room-4":
      links.push({
        description : "Primeiro Andar",
        pano : "floor-1_room-3",
        heading : 350
      });
      break;
  }

}

google.maps.event.addDomListener(window, 'load', initialize);
