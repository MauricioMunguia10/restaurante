<?php

session_start(); 

$comida=$_POST['v1'];  
$c=0; 


require('conexion.php');

$consulta_comida = $cn->query("SELECT * FROM comida");
$consulta_orden = $cn->query("SELECT * FROM comida");
while($datos = $consulta_comida->fetch_array()){
    
    $c++;
    if($comida==$datos[2]){
        $insertar=$cn->query("insert into orden values('0','1','".$datos[0]."','".$datos[4]."')"); 
    }
    
    
}

?>