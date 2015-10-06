var dengueThemeName = 'DENGUE_CLUSTER';
var layerInfo;

if (typeof ONE_MAP.TOKEN == 'undefined' || ONE_MAP.TOKEN == null) {
	getToken(function(data) {
		ONE_MAP.TOKEN = data.GetToken[0].NewToken;
		loadData();
		//loadTheme();
	}, function(error) {
		throw new Error('Unable to retrieve token!');
	})
} else {
	loadData();
	//loadTheme();
}

function getSeverityColor(count) {
	return (count >= 10) ? hexToRgb('#ff0000') : hexToRgb('#ffff00');
}

function loadData() {
	$.ajax({
		type:"GET",
		url: ONE_MAP.API_URL + '/layerinfodm',
		data: { layerName: dengueThemeName,
			  },
		dataType: 'jsonp',
		success: function(data) {
			layerInfo = data.LayerInfo[0];
			layerInfo.LINETHICKNESS = 1;
			layerInfo.OUTLINECOLOR = hexToRgb('#000000');
			loadTheme();
		},
		error: function(error) {
			console.log('Error');
		}
	});
}

function loadTheme () {
	$.ajax({
		type:"GET",
		url: ONE_MAP.API_URL + '/mashupData',
		data: { token: ONE_MAP.TOKEN,
				themeName: dengueThemeName,
				otptFlds: layerInfo.FIELD_NAM_T,
				extents: '-4423.6,15672.6,69773.4,52887.4'},
		dataType: 'jsonp',
		success: formatData,
		error: function(error) {
			console.log('Error');
		}
	});
}

function formatData(data) {
	var results = data.SrchResults;
	var count = 0;
	var graphicLayer = new esri.layers.GraphicsLayer();
	graphicLayer.id = dengueThemeName;
	for (var i = 0; i < results.length; i++) {
		if (results[i].XY) {			
			results[i].SYMBOLCOLOR = getSeverityColor(results[i]['Number of cases']);
			var graphic = generateGraphics(results[i], layerInfo);
			graphicLayer.add(graphic);
		}
	}
	OneMap.map.addLayer(graphicLayer);
}