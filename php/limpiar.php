<?php
require 'conexion.php';

$consulta1 = $cn->query("DELETE FROM cliente;");
$consulta2 = $cn->query("DELETE FROM orden;");

if($consulta1 && $consulta2){
    // Ambas consultas de eliminación se ejecutaron correctamente
    echo "Las tablas cliente y orden se limpiaron correctamente.";
} else {
    // Manejar el caso en que una o ambas consultas de eliminación fallen
    echo "Error al limpiar las tablas: " . $cn->error;
}
?>
