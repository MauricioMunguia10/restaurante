<?php  
$correo=$_POST['v1'];   
$contrasena=$_POST['v2']; 
$status=true;
$email=true;
$pswd=true;


require('conexion.php');

$consulta = $cn->query("SELECT * FROM sesiones");

if($consulta==1){
    
    while($datos = $consulta->fetch_array()){
        if($correo == $datos[1]){
            $email=false;
            if($contrasena == $datos[2]){
                $pswd=false;
            }
        }else if($contrasena == $datos[2]){
            $pswd=false;
        }
    }
    echo $sesion;
    
    
}
if($email && $pswd){
    if(! $cn->connect_errno ) {
        $insertar=$cn->query("insert into sesiones values('','".$correo."','".$contrasena."','')"); 
        
        //Si la consulta se ejecuto correctamente $insertar vale 1     
        if($insertar==1){          
        //echo("El registro se guardo  correctamente=".!$cn->connect_errno. "Insertar =". $insertar); 
        }else{
        //echo("No se guardo el registro".$cn->error."insertar=".$insertar); //$insertar no devuielve ningun valor cuando falla la consulta
        }
        $cn->close();
        
    }else //2054 es el valor que devuelve $cn->connect_errno
            //Si la conexión falla 
        echo("Fallo la Conexión".$cn->connect_errno); 
        //Error(500) interno del servidor, checar sintaxis en php
    $status=false;
}else{
    if(!$email){
        echo "correo en uso";
    }else if(!$pswd){
        echo "contraseña en uso";
    }
}

?>