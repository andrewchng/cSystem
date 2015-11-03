if (typeof ONE_MAP.TOKEN == 'undefined' || ONE_MAP.TOKEN == null) {
	getToken(function(data) {
		ONE_MAP.TOKEN = data.GetToken[0].NewToken;
		loadTrafficFromServer();
		// loadData();
		//loadTheme();
	}, function(error) {
		throw new Error('Unable to retrieve token!');
	})
} else {
	loadTrafficFromServer();
	// loadData();
	//loadTheme();
}

function loadTrafficFromServer() {
	$.ajax({
		type:'GET',
		url: 'http://api.ssad.localhost/map/traffic',
		success: function(data) {
			console.log("Success traffic");
			var graphicLayer = new esri.layers.GraphicsLayer();
			graphicLayer.id = 'traffic';
			myData = data;
			for (var i = 0; i < data.length; i++) {
				var graphic = generateGraphics(data[i]);
				graphicLayer.add(graphic);
			}
			OneMap.map.addLayer(graphicLayer);
			try {
				dojo.connect(graphicLayer, 'onClick', function(evt) {
					OneMap.map.infoWindow.setTitle('Traffic Info');
					OneMap.map.infoWindow.setContent(
						((evt.graphic.attributes.location) ? 'Location      : ' + evt.graphic.attributes.location + '<br/>' : '') +
						'Incident Type : ' + evt.graphic.attributes.Type +
						'<br/>Description   : ' + evt.graphic.attributes.DESCRIPTION
					);
					OneMap.map.infoWindow.show(evt.screenPoint, OneMap.map.getInfoWindowAnchor(evt.screenPoint));
				});
			} catch (err) {

			}
		}
	});
}

/*var MYTRANSPORT = {
	ACCOUNT_KEY: 'FJtitxzoGkib9ljyfRHf7A==',
	UUID: 'd7530ac5-1393-4878-8034-4588db98baca',
	INCIDENT_URL: 'http://datamall.mytransport.sg/ltaodataservice.svc/IncidentSet'
}

function loadData () {
	$.ajax({
		type:'GET',
		beforeSend: function(request) {

			request.setRequestHeader('AccountKey', MYTRANSPORT.ACCOUNT_KEY);
			request.setRequestHeader('UniqueUserId', MYTRANSPORT.UUID);
			console.log(request);
		},
		headers: {
			AccountKey: MYTRANSPORT.ACCOUNT_KEY,
			UniqueUserId: MYTRANSPORT.UUID,
			accept: 'application/json'
		},
		accepts: 'application/json',
		url: MYTRANSPORT.INCIDENT_URL,
		dataType: 'jsonp',
		success: function(data) {
			console.log(data);
			var oneMapData = convertToOneMapFormat(data);
		},
		error: function(error) {
			console.log(error);
		},
		completed: function(data) {
			console.log(data);
		}
	});
}

function convertToOneMapFormat(data) {

}

loadData();*/