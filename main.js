//localStorage.clear();
document.getElementById("complaintInputForm").addEventListener("submit", saveComplaint);

function saveComplaint(e){
	var complaintDesc = document.getElementById('complaintDescInput').value;
	var complaintSeverity = document.getElementById('complaintSeverityInput').value;
	var complaintAssignedTo = document.getElementById('complaintAssignToInput').value;
	var complaintID = chance.guid(); //global unique identifier
	var complaintStatus = "Open";

	var complaint = {
		id: complaintID,
		description: complaintDesc,
		severity: complaintSeverity,
		assignedTo: complaintAssignedTo,
		status: complaintStatus
	}

	if(localStorage.getItem('complaints') == null){
		var complaints = [];
		complaints.push(complaint);
		localStorage.setItem('complaints', JSON.stringify(complaints));
	} else{
		var complaints = JSON.parse(localStorage.getItem('complaints'));
		complaints.push(complaint);
		localStorage.setItem('complaints', JSON.stringify(complaints));	
	}

	document.getElementById("complaintInputForm").reset();
	
	fetchComplaints();

	e.preventDefault();
}



function setStatusClosed (id) {
	var complaints = JSON.parse(localStorage.getItem('complaints'));
	for (var i = 0; i < complaints.length; i++) {
		if(complaints[i].id==id){
			complaints[i].status = 'Closed';
		}
	}

	localStorage.setItem('complaints', JSON.stringify(complaints));	
	fetchComplaints();
}

function deleteComplaint (id) {
	var complaints = JSON.parse(localStorage.getItem('complaints'));
	for (var i = 0; i < complaints.length; i++) {
		if(complaints[i].id==id){
			complaints.splice(i,1);
		}
	}

	localStorage.setItem('complaints', JSON.stringify(complaints));	
	fetchComplaints();
}

//local storage
function fetchComplaints () { 
	var complaints = JSON.parse(localStorage.getItem('complaints'));
	var complaintsList = document.getElementById('complaintsList');
	complaintsList.innerHTML = '';
	for (var i = 0; i < complaints.length; i++) {
		var id = complaints[i].id;
		var desc = complaints[i].description;
		var severity = complaints[i].severity;
		var assignedTo = complaints[i].assignedTo;
		var status = complaints[i].status;

		complaintsList.innerHTML += '<div class="well">'+
								    '<h6> Complaint ID: '+id+'</h6>'+
								    '<p><span class="label label-info">'+ status +'</span></p>'+
								    '<h3>'+ desc +'</h3>'+
								    '<p><span class="glyphicon glyphicon-time"></span>'+ severity +'</p>' +
								    '<p><span class="glyphicon glyphicon-user"></span>'+ assignedTo +'</p>' +
								    '<a href="#" class="btn btn-warning" onclick="setStatusClosed(\''+ id +'\')">Close</a>'+
								    ' <a href="#" class="btn btn-danger" onclick="deleteComplaint(\''+ id +'\')">Delete</a>'+
								    '</div>';
		}
}

