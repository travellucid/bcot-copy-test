<?php

require('ET_Client.php');

$myclient = new ET_Client();
//print "aaaa1"; exit;
$list = new ET_List();
$list->authStub = $myclient;
$response = $list->get();
print_r($response);

?>