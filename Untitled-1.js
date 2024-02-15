fetch("https://api.apispreadsheets.com/data/oVMs24DDA6KykfDC/", {
	method: "POST",
	body: JSON.stringify({"data": {"age":"value","last_name":"value","first_name":"value","contact_email":"value","emergency_contact_phone":"value","emergency_contact_last_name":"value","emergency_contact_first_name":"value"}}),
}).then(res =>{
	if (res.status === 201){
		// SUCCESS
	}
	else{
		// ERROR
	}
})