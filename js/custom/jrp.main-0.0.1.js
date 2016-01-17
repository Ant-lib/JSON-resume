
$('input#upload_file').on('change', function() {
	fileUploader = new fileUploader();
	fileUploader.fileSelected();
});

$("#upload_btn").click(function() {
	fileUploader.startUploading();

	var json_data = templateParse($("#resume_template").html(),
        { name: "aaaaaa", phone: "bbbb bbb bbb", email: "cccc@cccc.cc"});
    
    $(json_data).appendTo("#resume_container");
});