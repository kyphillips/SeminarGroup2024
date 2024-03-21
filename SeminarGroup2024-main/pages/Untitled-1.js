fetch("https://api.apispreadsheets.com/data/0j15oTIGmbFdOs55/", {
	method: "POST",
	body: JSON.stringify({"data": {"age":"value","camp":"value","contact_email":"value","last_name":"value","overnight":"value","first_name":"value","special_accommodations":"value","emergency_contact_phone":"value","emergency_contact_relation":"value","emergency_contact_last_name":"value","emergency_contact_first_name":"value"}}),
}).then(res =>{
	if (res.status === 201){
		// SUCCESS
	}
	else{
		// ERROR
	}
})