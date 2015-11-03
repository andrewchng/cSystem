var dengueThemeName = 'DENGUE_CLUSTER';
var layerInfo;
var myData;

if (typeof ONE_MAP.TOKEN == 'undefined' || ONE_MAP.TOKEN == null) {
	getToken(function(data) {
		ONE_MAP.TOKEN = data.GetToken[0].NewToken;
		loadDengueFromServer();
		// loadData();
		//loadTheme();
	}, function(error) {
		throw new Error('Unable to retrieve token!');
	})
} else {
	loadDengueFromServer();
	// loadData();
	//loadTheme();
}

// function getSeverityColor(count) {
// 	return (count >= 10) ? hexToRgb('#ff0000') : hexToRgb('#ffff00');
// }

function loadDengueFromServer() {
	$.ajax({
		type:'GET',
		url: 'http://api.ssad.localhost/map/dengue',
		success: function(data) {
			console.log("Success dengue");
			var graphicLayer = new esri.layers.GraphicsLayer();
			graphicLayer.id = dengueThemeName;
			myData = data;
			for (var i = 0; i < data.length; i++) {
				var graphic = generateGraphics(data[i]);
				graphicLayer.add(graphic);
			}
			OneMap.map.addLayer(graphicLayer);
			try {
				dojo.connect(graphicLayer, 'onClick', function(evt) {
					OneMap.map.infoWindow.setTitle('Dengue Info');
					OneMap.map.infoWindow.setContent(
						((evt.graphic.attributes.location) ? 'Location   : ' + evt.graphic.attributes.location + '<br/>' : '') +
						'Case       : ' + evt.graphic.attributes['Number of cases'] +
						'<br/>Description: ' + evt.graphic.attributes.DESCRIPTION
					);
					OneMap.map.infoWindow.show(evt.screenPoint, OneMap.map.getInfoWindowAnchor(evt.screenPoint));
				});
			} catch (err) {

			}
		}
	});
}

// function loadData() {
// 	$.ajax({
// 		type:"GET",
// 		url: ONE_MAP.API_URL + '/layerinfodm',
// 		data: { layerName: dengueThemeName,
// 			  },
// 		dataType: 'jsonp',
// 		success: function(data) {
// 			layerInfo = data.LayerInfo[0];
// 			layerInfo.LINETHICKNESS = 1;
// 			layerInfo.OUTLINECOLOR = hexToRgb('#000000');
// 			loadTheme();
// 			console.log(data);
// 		},
// 		error: function(error) {
// 			console.log('Error');
// 		}
// 	});
// }

// function loadTheme () {
// 	$.ajax({
// 		type:"GET",
// 		url: ONE_MAP.API_URL + '/mashupData',
// 		data: { token: ONE_MAP.TOKEN,
// 				themeName: dengueThemeName,
// 				otptFlds: layerInfo.FIELD_NAM_T,
// 				extents: '-4423.6,15672.6,69773.4,52887.4'},
// 		dataType: 'jsonp',
// 		success: formatData,
// 		error: function(error) {
// 			console.log('Error');
// 		}
// 	});
// }

// function formatData(data) {
// 	console.log(data);
// 	var results = data.SrchResults;
// 	var count = 0;
// 	var graphicLayer = new esri.layers.GraphicsLayer();
// 	graphicLayer.id = dengueThemeName;
// 	for (var i = 0; i < results.length; i++) {
// 		if (results[i].XY) {			
// 			results[i].SYMBOLCOLOR = getSeverityColor(results[i]['Number of cases']);
// 			var graphic = generateGraphics(results[i], layerInfo);
// 			graphicLayer.add(graphic);
// 		}
// 	}
// 	OneMap.map.addLayer(graphicLayer);
// }