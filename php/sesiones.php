<?php

$correo=$_POST['v1'];   
$contrasena=$_POST['v2'];    
$sesion=0;

require 'conexion.php';
$consulta = $cn->query("SELECT * FROM sesiones");

if($consulta==1){
    
    while($datos = $consulta->fetch_array()){
        if($correo == $datos[1]){
            if($contrasena == $datos[2]){
                $usuario = substr($correo, 0, strpos($correo, "@"));
                session_start(); 
                $_SESSION['nombre']=$usuario;
                $sesion=2;
                //echo $sesion;
            }else{
                $sesion=1;
                //echo $sesion;
            }
        }
    }
    echo $sesion;
    
    
}
$sesion=0;
?>