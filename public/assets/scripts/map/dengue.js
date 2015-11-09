loadDengueFromServer();
function loadDengueFromServer() {
	console.log('called dengue');
	$.ajax({
		type:'GET',
		url: 'http://api.ssad.localhost/map/dengue',
		success: function(data) {
			console.log("Success dengue");
			var graphicLayer = new esri.layers.GraphicsLayer();
			graphicLayer.id = 'dengue';
			myData = data;
			for (var i = 0; i < data.length; i++) {
				var graphic = generateGraphics(data[i]);
				graphicLayer.add(graphic);
			}
			OneMap.map.addLayer(graphicLayer);
			try {
				dojo.connect(graphicLayer, 'onClick', function(evt) {
					OneMap.map.infoWindow.setTitle(evt.graphic.attributes.TITLE);
					OneMap.map.infoWindow.setContent(
						((evt.graphic.attributes.LOCATION) ? 'Location   : ' + evt.graphic.attributes.LOCATION + '<br/>' : '') +
						'Case       : ' + evt.graphic.attributes.CASECOUNT +
						'<br/>Description: <br/>' + evt.graphic.attributes.DESCRIPTION
					);
					OneMap.map.infoWindow.show(evt.screenPoint, OneMap.map.getInfoWindowAnchor(evt.screenPoint));
				});
			} catch (err) {

			}
		}, 
		complete: function(t, msg) {
			console.log(msg);
		}
	});
}