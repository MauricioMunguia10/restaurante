<?php
require 'conexion.php';

$consulta = $cn->query("SELECT * FROM empleado");

if($consulta==1){
    
    //La variable $cadena(acumulador) es el arreglo clave valor  
    $cadena="[{";//o  usar '[{' 
    $c=0;  
    while($datos = $consulta->fetch_array()){
        //echo "entra2";
        $c++; 
        $id= 'id'.$c;
        $nombre='nombre'.$c;
        $p_apellido='p_apellido'.$c;
        $s_apellido='s_apellido'.$c;
        $telefono='telefono'.$c;
        $email='email'.$c;
        $direccion='direccion'.$c;
        $puesto='puesto'.$c;
        $rol='rol'.$c;
        $salario='salario'.$c;
        //$cadena.='"clave":'.$datos[0].',"modelo":"'.$datos[1].'",';
        $cadena.='"'.$id.'":'.$datos[0].',"'.$nombre.'":"'.$datos[1].'","'.$p_apellido.'":"'.$datos[2].'","'.$s_apellido.'":"'.$datos[3].'","'.$telefono.'":"'.$datos[4].'","'.$email.'":"'.$datos[5].'","'.$direccion.'":"'.$datos[6].'","'.$puesto.'":"'.$datos[7].'","'.$rol.'":"'.$datos[8].'","'.$salario.'":"'.$datos[9].'",';
        
    }
    //echo $cadena;
    $cadena.='"tam":'.$c.',';
    $largo=strlen($cadena);
    $cadena2=substr($cadena,0,($largo-1));
    $cadena2.="}]";
    echo $cadena2;
    $conexion->close(); 
    
}

?>