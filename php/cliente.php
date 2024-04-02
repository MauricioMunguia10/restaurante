<?php  
$nombre=$_POST['v1'];   
$mesa=$_POST['v2']; 


require('conexion.php');

$consulta = $cn->query("SELECT * FROM cliente");

    
    if(! $cn->connect_errno ) {
        $insertar=$cn->query("insert into cliente values('0','".$mesa."','".$nombre."')"); 
        while($datos = $consulta->fetch_array()){
            $id = $datos[0];
            
        }
        $id+=1;
        echo $id;
        //Si la consulta se ejecuto correctamente $insertar vale 1     
        if($insertar==1){          
        //echo("El registro se guardo  correctamente=".!$cn->connect_errno. "Insertar =". $insertar); 
        }else{
        //echo("No se guardo el registro".$cn->error."insertar=".$insertar); //$insertar no devuielve ningun valor cuando falla la consulta
        }
        $cn->close();
        
    }else //2054 es el valor que devuelve $cn->connect_errno
            //Si la conexión falla 
        //echo("Fallo la Conexión".$cn->connect_errno); 
        //Error(500) interno del servidor, checar sintaxis en php
 
    
    



?>