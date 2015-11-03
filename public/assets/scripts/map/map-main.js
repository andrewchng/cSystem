var ONE_MAP = {
	ACCESS_KEY: 'xkg8VRu6Ol+gMH+SUamkRIEB7fKzhwMvfMo/2U8UJcFhdvR4yN1GutmUIA3A6r3LDhot215OVVkZvNRzjl28TNUZgYFSswOi',
	API_URL: 'http://www.onemap.sg/API/services.svc',
	TOKEN: null
}


function hexToRgb(hex, toString) {
	toString = typeof toString !== 'undefined' ? toString : true;
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    var obj = result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
    if (toString && obj !== null) {
    	return obj.r + ',' + obj.g + ',' + obj.b;
    }
    return obj;
}

function getToken(success, failed) {
	$.ajax({
	    type:"GET",
	    async:false,
	    url: ONE_MAP.API_URL + '/getToken',
	    data: { accessKey: ONE_MAP.ACCESS_KEY },
	    dataType: "jsonp",                
	    success: success,
	    error: failed
	});
}

function updateLayerVisibility(control) {
	var layerId = control.id;

}

function addLayer(layerData) {
	if (layerData.length == 0) {
		return;
	}
}

function generateGraphics(data) {
	var graphic;
	var type = data.FEATTYPE.toUpperCase();
    if (type == "LINE") {
        graphic = generateLineGraphic(data.XY, data.COLOR, data.LINETHICKNESS);
    }
    else if (type == "POLYGON") {
        graphic = generatePolygonGraphic(data.XY, data.SYMBOLCOLOR, data.OUTLINECOLOR, data.LINETHICKNESS);
    }
    else if (type == "POINT") {
        graphic = generatePointGraphic(data.XY, data.ICONNAME, data.IconPath);
    }  
    graphic.attributes = data;
    return graphic;
}

var centerPoint = "28968.103,33560.969"
var levelNumber = 1;
var OneMap = new GetOneMap('map-container', 'SM', { level: levelNumber, center: centerPoint });