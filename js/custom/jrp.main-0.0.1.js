
var resumeSection = ["profile", "employment", "education", "experience", "strengths", "references"];

var profileData = "";
var employmentData = "";
var educationData = "";
var experienceData = "";
var strengthsData = "";
var referencesData = "";


$('input#upload_file').on('change', function() {
	fileUploader = new fileUploader();
	fileUploader.fileSelected();

	setTimeout(function() {

		for (var i in resumeSection) {
			var currentSectionName = resumeSection[i];
			var uploadedJsonFileSection = eval("fileUploader.oUploadedFile." + currentSectionName);

			for (var j in uploadedJsonFileSection) {
				window[currentSectionName + "Data"] += "{ ";
				$.each(uploadedJsonFileSection[j], function(key, value) {
					window[currentSectionName + "Data"] += key + ": " + "\"" + value + "\", ";
				});

				window[currentSectionName + "Data"] = window[currentSectionName + "Data"].slice(0,-2);
				window[currentSectionName + "Data"] += " },";
			};

			window[currentSectionName + "Data"] = window[currentSectionName + "Data"].slice(0,-1);
		};

		//dataObj processing
		var profileDataObj = eval("(" + profileData + ")");

		var employmentDataObj = [];
		var employmentDataSplitted = employmentData.split('},{');
		for (var i = 0; i < employmentDataSplitted.length; i++) {
			employmentDataObj[i] = eval("({" + employmentDataSplitted[i].replace('{', '').replace('}', '') + "})");
		};

		var educationDataObj = [];
		var educationDataSplitted = educationData.split('},{');
		for (var i = 0; i < educationDataSplitted.length; i++) {
			educationDataObj[i] = eval("({" + educationDataSplitted[i].replace('{', '').replace('}', '') + "})");
		};

		var experienceDataObj = eval("(" + experienceData + ")");
		var strengthsDataObj = eval("(" + strengthsData + ")");
		var referencesDataObj = eval("(" + referencesData + ")");


		// template parsing
		var profile_data = templateParse($("#resume_profile_template").html(), profileDataObj);

		var employment_data = [];
		for (var i = 0; i < employmentDataSplitted.length; i++) {
			employment_data[i] = templateParse($("#resume_employment_" + i + "_template").html(), employmentDataObj[i]);
		};

		var education_data = [];
		for (var i = 0; i < educationDataSplitted.length; i++) {
			education_data[i] = templateParse($("#resume_education_" + i + "_template").html(), educationDataObj[i]);
		};

		var experience_data = templateParse($("#resume_experience_template").html(), experienceDataObj);
		var strengths_data = templateParse($("#resume_strengths_template").html(), strengthsDataObj);
		var references_data = templateParse($("#resume_references_template").html(), referencesDataObj);

		// append to the page

		$(profile_data).appendTo("#resume_profile_container");

		for (var i = 0; i < employmentDataSplitted.length; i++) {
			$(employment_data[i]).appendTo("#resume_employment_" + i + "_container");
		};

		for (var i = 0; i < educationDataSplitted.length; i++) {
			$(education_data[i]).appendTo("#resume_education_" + i + "_container");
		};

		$(experience_data).appendTo("#resume_experience_container");
		$(strengths_data).appendTo("#resume_strengths_container");
		$(references_data).appendTo("#resume_references_container");

	}, 200);
	
});