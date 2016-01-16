
$('input#upload_file').on('change', function() {
	fileUploader = new fileUploader();
	fileUploader.fileSelected();
});

$("#upload_btn").click(function() {
	fileUploader.startUploading();
});