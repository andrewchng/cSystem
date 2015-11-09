loadTrafficFromServer();

function loadTrafficFromServer() {
	console.log('called traffic');
	$.ajax({
		type:'GET',
		url: 'http://api.ssad.localhost/map/traffic',
		success: function(data) {
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
						((evt.graphic.attributes.LOCATION) ? 'Location      : ' + evt.graphic.attributes.LOCATION + '<br/>' : '') +
						'Incident Type : ' + evt.graphic.attributes.TYPE +
						'<br/>Description   : <br/>' + evt.graphic.attributes.DESCRIPTION
					);
					OneMap.map.infoWindow.show(evt.screenPoint, OneMap.map.getInfoWindowAnchor(evt.screenPoint));
				});
			} catch (err) {

			}
		}
	});
}