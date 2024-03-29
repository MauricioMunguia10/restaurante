<?php

$url = $_POST['v1'];   

// Parsea la URL y obtiene la ruta
$ruta = parse_url($url, PHP_URL_PATH);

// Obtiene el último segmento de la ruta (después de la última diagonal)
$segmento = strtolower(basename($ruta));

echo $segmento; // Esto imprimirá: archivo.php


?>