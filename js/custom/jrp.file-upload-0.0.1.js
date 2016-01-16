
var fileUploader = function() {
    this.fileMaxSize = 1048576;

    this.fileSelected = function() {
        document.getElementById('upload_response').style.display = 'none';
        document.getElementById('upload_error').style.display = 'none';
        document.getElementById('abort').style.display = 'none';
        document.getElementById('warnsize').style.display = 'none';

        var oFile = document.getElementById('upload_file').files[0];

        if (oFile.size > fileUploader.fileMaxSize) {
            document.getElementById('warnsize').style.display = 'block';
            return;
        }

        var oReader = new FileReader();
            oReader.onload = function(e){
            oUploadedFile.src = e.target.result;
        };
    }

    this.startUploading = function() {
        document.getElementById('upload_error').style.display = 'none';
        document.getElementById('abort').style.display = 'none';
        document.getElementById('warnsize').style.display = 'none';

        var vFD = new FormData(document.getElementById('upload_form')); 

        var oXHR = new XMLHttpRequest();        
        oXHR.addEventListener('load', fileUploader.uploadFinish, false);
        oXHR.addEventListener('abort', fileUploader.uploadAbort, false);
        oXHR.open('POST', 'upload.php');
        oXHR.send(vFD);
    }

    this.uploadFinish =  function(e) {
        var oUploadResponse = document.getElementById('upload_response');
        oUploadResponse.innerHTML = e.target.responseText;
        oUploadResponse.style.display = 'block';

        document.getElementById('filesize').innerHTML = fileUploader.sResultFileSize;
    }

    this.uploadError = function(e) {
        document.getElementById('upload_error').style.display = 'block';
    }

    this.uploadAbort = function(e) {
        document.getElementById('abort').style.display = 'block';
    }
}