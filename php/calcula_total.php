<?php
require('conexion.php');

// Ejecutar la consulta SQL
$consulta_comida = $cn->query("SELECT c.id AS cliente_id, c.nombre AS nombre_cliente, SUM(o.total) AS total_cliente FROM cliente c JOIN orden o ON c.id = o.cliente_id GROUP BY c.id, c.nombre;");

// Verificar si la consulta fue exitosa
if ($consulta_comida) {
    //La variable $cadena(acumulador) es el arreglo clave valor  
    $cadena = "[{";
    $c = 0;  
    while($datos = $consulta_comida->fetch_array()){
        $c++; 
        $cliente_id = 'cliente_id'.$c;
        $nombre = 'nombre'.$c;
        $total = 'total'.$c;
        $cadena .= '"'.$cliente_id.'":'.$datos['cliente_id'].',"'.$nombre.'":"'.$datos['nombre_cliente'].'","'.$total.'":"'.$datos['total_cliente'].'",';
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
