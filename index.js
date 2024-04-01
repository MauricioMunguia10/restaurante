//Variables globales
let count=0;
let correo,contrasena;
let url;
let sesion;
let nombre,p_apellido,s_apellido,telefono,email,direccion,puesto,rol,salario;

//identifica el navegador
addEvent(window,'load',cargar, false);
function addEvent(ele,eve,fun,cap){
    if(window.attachEvent)
        addAttachEvent('on'+eve,fun);
    else
        ele.addEventListener(eve,fun,cap);
}
//funcion principal
function cargar(){
    url=window.location;
    buscaUrl();
}
function buscaUrl(){
    //datos();
    conexion=xmlhttprequest();
    conexion.onreadystatechange=esperaUrl;
    conexion.open("POST","php/url.php",true); 
    conexion.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    conexion.send("v1="+url);
}
function esperaUrl(){
    count++;
    if(conexion.readyState==4){
        let opc = conexion.responseText;
        if(opc=="index.html")
            cargarLogIn();
        else if (opc=="inicio.html")  
            cargarInicio();
        else if (opc=="menu.html")  
            cargarMenu();
        else if (opc=="orden.html")  
            cargarOrden();
        else if (opc=="empleado.html")  
            cargarEmpleado();
        count=0;
    }
 
}
//orden de venta
function cargarOrden(){
    buscaSesion();
}
//Log In
function validarEmail(email) {
    // Expresión regular para validar un correo electrónico
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
}

function cargarLogIn(){   
    addEvent(document.getElementById("btn_iniciar_sesion"),"click",verificaInicio,false);
    addEvent(document.getElementById("btn_registrar"),"click",verificaRegistro,false);
}
function verificaRegistro(){
    datos();
    if(correo=="" || contrasena==""){
        alert("Datos incompletos");
    }else{
        if(validarEmail(correo))
            registrar();
        else
            alert("email invalido");
    }
}
function verificaInicio(){
    datos();
    if(correo=="" || contrasena==""){
        alert("Datos incompletos");
    }else{
        if(validarEmail(correo))
            iniciarSesion();
        else
            alert("email invalido");
    }
}
function datos(){
    correo=document.getElementById("txt_email").value;
    contrasena=document.getElementById("txt_contrasena").value;
}
//funcion de inicio
function cargarInicio(){     
    buscaSesion();
    
}

//registrar nuevo usuario
function buscaSesion(){
    
    conexion=xmlhttprequest();
    conexion.onreadystatechange=esperaSesion;
    conexion.open("POST","php/busca_sesion.php",true); 
    conexion.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    conexion.send();
}
function esperaSesion(){
    
    count++;
    if(conexion.readyState==4){
        //alert(conexion.responseText);  
        sesion=conexion.responseText;
        imprimirUsuario();
        count=0;
    }
}
function imprimirUsuario(){
    //alert("imprimir"+sesion);
    document.getElementById("txt_usuario").innerHTML = '<span class="navbar-text" id="txt_usuario">Usuario: '+sesion+' </span>';
}
//registrar nuevo usuario
function registrar(){
    //datos();
    conexion=xmlhttprequest();
    conexion.onreadystatechange=esperaResultado1;
    conexion.open("POST","php/registrar.php",true); 
    conexion.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    conexion.send("v1="+correo+"&v2="+contrasena);
}
function esperaResultado1(){
    count++;
    if(conexion.readyState==4){
        alert(conexion.responseText);  
        count=0;
    }
}
//iniciar sesion
function iniciarSesion(){
    //datos();
    conexion=xmlhttprequest();
    conexion.onreadystatechange=esperaResultado;
    conexion.open("POST","php/sesiones.php",true); 
    conexion.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    conexion.send("v1="+correo+"&v2="+contrasena);
}
function esperaResultado(){
    count++;
    if(conexion.readyState==4){
        //alert(conexion.responseText);  
        let estado = 0;
        estado = conexion.responseText;
        if(estado == 0){
            alert("No estas registrado");
        }else if(estado == 1){
            alert("Contraseña incorrecta");
        }else if(estado == 2){
            //alert("Inicio exitoso");
            window.open("inicio.html","_self");
        }
        count=0;
    }
}

function xmlhttprequest(){
    return new XMLHttpRequest();
}

//empleados
//registro empleados
//funcion principal
function cargarEmpleado(){      
    addEvent(document.getElementById("btn_guardar"),"click",verificaCampos,false);
    buscaSesion();
    
}
function datosEmpleado(){
    nombre=document.getElementById("txt_nom").value;
    p_apellido=document.getElementById("txt_pape").value;
    s_apellido=document.getElementById("txt_sape").value;
    telefono=document.getElementById("txt_tel").value;
    email=document.getElementById("txt_email").value;
    direccion=document.getElementById("txt_direccion").value;
    puesto=document.getElementById("txt_puesto").value;
    rol=document.getElementById("combo").value;
    salario=document.getElementById("txt_sal").value;
    //alert(puesto)
}
function verificaCampos(){
    datosEmpleado();
    if(nombre=="" || p_apellido=="" || s_apellido=="" || telefono=="" || email=="" || direccion=="" || puesto=="" || rol=="" || salario==""){
        alert("Datos incompletos")
    }else{
        guardarEmpleado();
    }
}
//registrar nuevo usuario
function guardarEmpleado(){

    conexion=xmlhttprequest();
    conexion.onreadystatechange=esperaGuardar;
    conexion.open("POST","php/guardar.php",true); 
    conexion.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    conexion.send("v1="+nombre+"&v2="+p_apellido+"&v3="+s_apellido+"&v4="+telefono+"&v5="+email
    +"&v6="+direccion+"&v7="+puesto+"&v8="+rol+"&v9="+salario);
    //alert(puesto)
}
function esperaGuardar(){
    count++;
    if(conexion.readyState==4){
        alert(conexion.responseText);  
        count=0;
    }
}

//MMG
