//Variables globales
let count=0;
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
    addEvent(document.getElementById("btn_guardar"),"click",guardarEmpleado,false);
    
}
function datos(){
    nombre=document.getElementById("txt_nom").value;
    p_apellido=document.getElementById("txt_pape").value;
    s_apellido=document.getElementById("txt_sape").value;
    telefono=document.getElementById("txt_tel").value;
    email=document.getElementById("txt_email").value;
    direccion=document.getElementById("txt_direccion").value;
    puesto=document.getElementById("txt_puesto").value;
    rol=document.getElementById("combo").value;
    salario=document.getElementById("txt_sal").value;
    //alert(direccion)
}
//registrar nuevo usuario
function guardarEmpleado(){
    datos();
    conexion=xmlhttprequest();
    conexion.onreadystatechange=esperaResultado1;
    conexion.open("POST","guardar.php",true); 
    conexion.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    conexion.send("v1="+nombre+"&v2="+p_apellido+"&v3="+s_apellido+"&v4="+telefono+"&v5="+email
    +"&v6="+direccion+"&v7="+puesto+"&v8="+rol+"&v9="+salario);
}
function esperaResultado1(){
    count++;
    if(conexion.readyState==4){
        alert(conexion.responseText);  
        count=0;
    }
}


function xmlhttprequest(){
    return new XMLHttpRequest();
}
//MMG