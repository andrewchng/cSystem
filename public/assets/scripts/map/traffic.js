var MYTRANSPORT = {
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

loadData();