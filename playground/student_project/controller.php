<?php 

header('Content-Type: text/plain');

require 'functions.php';

$R =& $_REQUEST;

$json = array();

if (isset($R['xaction'])) {

	if ($R['xaction'] === 'getGroups') {
		$json = getGroups($R['id']);
	} else if ($R['xaction'] === 'getUsers') {
		$json = getUsers($R['id']);
	} else if ($R['xaction'] === 'updateUser') {
		$json['success'] = updateUser($R);
	// } else if ($R['xaction'] === 'createUser') {
	// 	$json['success'] = createUser($R);
	}

} else {
	$json['success'] = false;
}

print json_encode($json);

?>