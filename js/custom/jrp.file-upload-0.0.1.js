
var fileUploader = function() {
    this.fileMaxSize = 1048576;
    this.oUploadedFil;

    this.fileSelected = function() {
        document.getElementById('upload_error').style.display = 'none';
        document.getElementById('abort').style.display = 'none';
        document.getElementById('warnsize').style.display = 'none';

        var oFile = document.getElementById('upload_file').files[0];

        if (oFile.size > fileUploader.fileMaxSize) {
            document.getElementById('warnsize').style.display = 'block';
            return;
        }

        var oReader = new FileReader();
        oReader.onload = function(e) {
            fileUploader.oUploadedFile = JSON.parse(e.target.result);
        };
        oReader.readAsText(oFile);
    }

    this.startUploading = function() {
        document.getElementById('upload_error').style.display = 'none';
        document.getElementById('abort').style.display = 'none';
        document.getElementById('warnsize').style.display = 'none';

        var vFD = new FormData(document.getElementById('upload_form')); 

        var oXHR = new XMLHttpRequest();        
        oXHR.addEventListener('abort', fileUploader.uploadAbort, false);
        oXHR.open('POST', 'upload.php');
        oXHR.send(vFD);
    }

    this.uploadError = function(e) {
        document.getElementById('upload_error').style.display = 'block';
    }

    this.uploadAbort = function(e) {
        document.getElementById('abort').style.display = 'block';
    }
}