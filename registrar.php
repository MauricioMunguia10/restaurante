<?php  
$correo=$_POST['v1'];   
$contrasena=$_POST['v2']; 


require('conexion.php');

if(! $cn->connect_errno ) {
    $insertar=$cn->query("insert into sesiones values('','".$correo."','".$contrasena."','')"); 
    
    //Si la consulta se ejecuto correctamente $insertar vale 1     
    if($insertar==1){          
    //echo("El registro se guardo  correctamente=".!$cn->connect_errno. "Insertar =". $insertar); 
    }else{
    echo("No se guardo el registro".$cn->error."insertar=".$insertar); //$insertar no devuielve ningun valor cuando falla la consulta
    }
    $cn->close();
    
}else //2054 es el valor que devuelve $cn->connect_errno
        //Si la conexión falla 
    echo("Fallo la Conexión".$cn->connect_errno); 
    //Error(500) interno del servidor, checar sintaxis en php
?>