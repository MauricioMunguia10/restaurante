<?php
require 'conexion.php';

$consulta = $cn->query("SELECT * FROM comida");

if($consulta==1){
    
    //La variable $cadena(acumulador) es el arreglo clave valor  
    $cadena="[{";//o  usar '[{' 
    $c=0;  
    while($datos = $consulta->fetch_array()){
        //echo "entra2";
        $c++; 
        $id= 'id'.$c;
        $categoria='categoria'.$c;
        $nombre='nombre'.$c;
        $cantidad='cantidad'.$c;
        $precio='precio'.$c;
        //$cadena.='"clave":'.$datos[0].',"modelo":"'.$datos[1].'",';
        $cadena.='"'.$id.'":'.$datos[0].',"'.$categoria.'":"'.$datos[1].'","'.$nombre.'":"'.$datos[2].'","'.$cantidad.'":"'.$datos[3].'","'.$precio.'":"'.$datos[4].'",';
        
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