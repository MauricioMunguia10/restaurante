//Variables globales
let count=0;


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
    //addEvent(document.getElementById("btn_guardar"),"click",guardarEmpleado,false);
    buscaSesion();
    
}

//registrar nuevo usuario
function buscaSesion(){
    
    conexion=xmlhttprequest();
    conexion.onreadystatechange=esperaResultado1;
    conexion.open("POST","busca_sesion.php",true); 
    conexion.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    conexion.send();
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