<?php

session_start(); 

$nombre=$_POST['v1'];   
$p_apellido=$_POST['v2'];    
$s_apellido=$_POST['v3'];    
$telefono=$_POST['v4'];    
$email=$_POST['v5'];
$direccion=$_POST['v6'];    
$puesto=$_POST['v7'];
$rol=$_POST['v8'];
$salario=$_POST['v9'];

require('conexion.php');

if(! $cn->connect_errno ) {
   // echo $direccion;  
    $insertar=$cn->query("insert into empleado values('','".$nombre."','".$p_apellido."','".$s_apellido."','".$telefono."','".$email."','".$direccion."','".$puesto."','".$rol."','".$salario."')"); 


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