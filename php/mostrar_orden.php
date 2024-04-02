<?php
require('conexion.php');

// Ejecutar la consulta SQL
$consulta_comida = $cn->query("SELECT c.id AS cliente_id, c.mesa, c.nombre, o.id AS orden_id, o.comida_id, o.total FROM cliente c INNER JOIN orden o ON c.id = o.cliente_id;");

// Verificar si la consulta fue exitosa
if ($consulta_comida) {
    //La variable $cadena(acumulador) es el arreglo clave valor  
    $cadena = "[{";
    $c = 0;  
    while($datos = $consulta_comida->fetch_array()){
        $c++; 
        $cliente_id = 'cliente_id'.$c;
        $mesa = 'mesa'.$c;
        $nombre = 'nombre'.$c;
        $orden_id = 'orden_id'.$c;
        $comida_id = 'comida_id'.$c;
        $total = 'total'.$c;
        $cadena .= '"'.$cliente_id.'":'.$datos['cliente_id'].',"'.$mesa.'":"'.$datos['mesa'].'","'.$nombre.'":"'.$datos['nombre'].'","'.$orden_id.'":"'.$datos['orden_id'].'","'.$comida_id.'":"'.$datos['comida_id'].'","'.$total.'":"'.$datos['total'].'",';
    }
    $cadena .= '"tam":'.$c.',';
    $largo = strlen($cadena);
    $cadena2 = substr($cadena, 0, ($largo-1));
    $cadena2 .= "}]";
    echo $cadena2;
    
    $cn->close(); 
} else {
    // Manejar el caso en que la consulta falle
    echo "Error al ejecutar la consulta: " . $cn->error;
}
?>
