<?php
require 'conexion.php';
session_start();
echo $_SESSION['nombre'];
?>