<?php

$sFileName = $_FILES['upload_file']['name'];
$sFileType = $_FILES['upload_file']['type'];

echo <<<EOF
<p>Your file: {$sFileName} has been successfully uploaded.</p>
<p>Type: {$sFileType}</p>
EOF;
