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
        latLng: new google.maps.LatLng(-23.559568,-46.668402),
      };
      streetViewPanoramaData["tiles"].centerHeading = 20;
      return streetViewPanoramaData;
    case "exterior-2":
      streetViewPanoramaData["location"] = {
        pano: "exterior-2",
        latLng: new google.maps.LatLng(-23.559568,-46.668402)
      };
      return streetViewPanoramaData;
    case "floor-0_room-1":
      streetViewPanoramaData["location"] = {
        pano: 'floor-0_room-1',
        latLng: new google.maps.LatLng(-23.559568,-46.668402)
      };
      streetViewPanoramaData["tiles"].centerHeading = 320;
      return streetViewPanoramaData;
    case "floor-0_room-2":
      streetViewPanoramaData["location"] = {
        pano: 'floor-0_room-2',
        latLng: new google.maps.LatLng(-23.559568,-46.668402)
      };
      streetViewPanoramaData["tiles"].centerHeading = 180;
      return streetViewPanoramaData;
    case "floor-0_room-3":
      streetViewPanoramaData["location"] = {
        pano: 'floor-0_room-3',
        latLng: new google.maps.LatLng(-23.559568,-46.668402),
        description: "Cozinha"
      };
      streetViewPanoramaData["tiles"].centerHeading = 180;
      return streetViewPanoramaData;
    case "floor-0_room-4":
      streetViewPanoramaData["location"] = {
        pano: 'floor-0_room-4',
        latLng: new google.maps.LatLng(-23.559568,-46.668402)
      };
      return streetViewPanoramaData;
    case "floor-1_room-1":
      streetViewPanoramaData["location"] = {
        pano: 'floor-1_room-1',
        description: "Segundo andar",
        latLng: new google.maps.LatLng(-23.559568,-46.668402)
      };
      streetViewPanoramaData["tiles"].centerHeading = 300
      return streetViewPanoramaData;
    case "floor-1_room-3":
      streetViewPanoramaData["location"] = {
        pano: 'floor-1_room-3',
        latLng: new google.maps.LatLng(-23.559568,-46.668402)
      };
      streetViewPanoramaData["tiles"].centerHeading = 20
      return streetViewPanoramaData;
    case "floor-1_room-4":
      streetViewPanoramaData["location"] = {
        pano: 'floor-1_room-4',
        description: "Lots & Lots of work",
        latLng: new google.maps.LatLng(-23.559568,-46.668402)
      };
      streetViewPanoramaData["tiles"].centerHeading = 105
      return streetViewPanoramaData;
    case "floor-1_room-5":
      streetViewPanoramaData["location"] = {
        pano: 'floor-1_room-5',
        description: "Terraço",
        latLng: new google.maps.LatLng(-23.559568,-46.668402)
      };
      streetViewPanoramaData["tiles"].centerHeading = 242
      return streetViewPanoramaData;
    case "floor-1_room-6":
      streetViewPanoramaData["location"] = {
        pano: 'floor-1_room-6',
        description: "Banheiro",
        latLng: new google.maps.LatLng(-23.559568,-46.668402)
      };
      streetViewPanoramaData["tiles"].centerHeading = 52
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

    //Inside the villa
    case "exterior-1":
      links.push({
        description : "Remix Social Ideas",
        pano : "exterior-2",
        heading : 350
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
        description : "Alameda Tietê",
        pano : "exterior-1",
        heading : 300
      });
      break;

      // Upstairs
    case "floor-1_room-1":
      links.push({
        description : "Sala de Reunião",
        pano : "floor-1_room-3",
        heading : 63
      },
      {
        description : "Sala",
        pano : "floor-1_room-4",
        heading : 345
      },
      {
        description : "Saída",
        pano : "floor-0_room-1",
        heading : 220
      });
      break;

      // Meeting room
    case "floor-1_room-3":
      links.push({
        description : "Segundo andar",
        pano : "floor-1_room-1",
        heading : 115
      });
      break;

      // bathroom
    case "floor-1_room-6":
      links.push({
        description : "Lots & Lots of work",
        pano : "floor-1_room-4",
        heading : 220
      });
      break;

      // Lots & Lots of work
    case "floor-1_room-4":
      links.push({
        description : "Segundo Andar",
        pano : "floor-1_room-1",
        heading : 150
      },
      {
        description : "Terraço",
        pano : "floor-1_room-5",
        heading : 305
      },
      {
        description : "Banheiro",
        pano : "floor-1_room-6",
        heading : 210
      });
      break;

      // Terrace
    case "floor-1_room-5":
      links.push({
        description : "Lots & Lots of work",
        pano : "floor-1_room-1",
        heading : 243
      });
      break;


    // First floor corridor
    case "floor-0_room-1":
      links.push({
        description: "Corredor",
        pano : "floor-0_room-2",
        heading : 10
      },
      {
        description : "Segundo andar",
        pano : "floor-1_room-1",
        heading : 280
      },
      {
        description : "Saída",
        pano : "exterior-2",
        heading : 200
      });
      break;

    // First floor corridor - 2nd stop
    case "floor-0_room-2":
      links.push({
        description: "Cozinha",
        pano : "floor-0_room-3",
        heading : 20
      },
      {
        description: "Sala",
        pano : "floor-0_room-4",
        heading : 120
      },
      {
        description: "Hall",
        pano : "floor-0_room-1",
        heading : 200
      });
      break;

    // Sala
    case "floor-0_room-4":
      links.push({
        description: "Corredor",
        pano : "floor-0_room-2",
        heading : 200
      });
      break;

    // Cozinha
    case "floor-0_room-3":
      links.push({
        description: "Corredor",
        pano : "floor-0_room-2",
        heading : 200
      });
      break;
  }

}

google.maps.event.addDomListener(window, 'load', initialize);
