<?php
require 'conexion.php';
$nom = "Mauricio";
session_start();
   //$_SESSION['nombre'] nombre es una variable global
   
   echo($_SESSION['nombre']);
?>