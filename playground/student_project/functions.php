<?php

function dbConnect(){
	$server = 'localhost';
	$dbuser = 'root';
	$dbpass = 'root';
	$dbname = 'formation_extjs';
	
	$con = @mysql_connect($server,$dbuser,$dbpass) or $merr = 'MySQL error '. mysql_errno() .' - '. mysql_error();
	if (isset($merr)){
		return $merr;
	}else{
		return $con;
	}
}

function dbQuery($query){
	$dbname = 'formation_extjs';
	if (empty($query)) {
		return(false);
	}
	$con = dbConnect();
	mysql_select_db($dbname) or die(mysql_error());

	$res = mysql_query($query,$con) or $err = "db error ". mysql_errno() .': '. mysql_error();
	if (isset($err)) {
		return $err;
	}else {
		return $res;
	}
}

function getGroups($parent_id){
	if(is_numeric($parent_id)){ //liste des sous-groupes
		$req = "select * from groups where parent_id = ".$parent_id;
	}else{
		$req = "select * from groups where parent_id = 0";
	}
	$res = dbQuery($req);
	$data = array();

	$i = 0;
	while ($row=mysql_fetch_assoc($res)){
		$data [$i]['text'] = $row['group_name'];
		if(is_numeric($parent_id)){
			$data [$i]['leaf'] = true;
		}else{
			$data [$i]['leaf'] = false;
		}
		$data [$i]['groupId'] = $row['group_id'];
		$i++;
	}		
	
	return $data;
}

function getUsers($group_id){
	if (is_numeric($group_id)){
		$req = "select * from users where group_id=".$group_id;
		$res = dbQuery($req);
		$data = array();

		$i=0;
		while ($row=mysql_fetch_assoc($res))
		{
			$data [] = $row;
		}	
		return $data;
	}	
}

function updateUser($r) {
	if (is_numeric($r['id'])){
		$req = "update users set firstname='".$r['firstname']."', lastname='".$r['lastname']."', email='".$r['email']."', jobtitle='".$r['jobtitle']."', cellphone='".$r['cellphone']."', birthdate='".$r['birthdate']."'  where id=".$r['id'];
		$res = dbQuery($req);
		
		return true;
	}else{
		$req = "insert into users (group_id, firstname, lastname, email, jobtitle, cellphone, birthdate) values (".$r['group_id'].", '".$r['firstname']."', '".$r['lastname']."', '".$r['email']."', '".$r['jobtitle']."', '".$r['cellphone']."', '".$r['birthdate']."')";
		$res = dbQuery($req);
		return true;
	}
	
}

// function createUser($r){
// 	$req = "insert into users (group_id, firstname, lastname, email, birthdate, cellphone, jobtitle) values (".$r['group_id'].", '".$r['firstname']."', '".$r['lastname']."', '".$r['email']."', '".$r['birthdate']."', '".$r['cellphone']."', '".$r['jobtitle']."')";
// 	$res = dbQuery($req);
// 	
// 	if (is_numeric(mysql_insert_id())){
// 		return true;
// 	}else{
// 		return false;
// 	}
// }

?>