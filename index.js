//Variables globales
let count=0;
let correo,contrasena;

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
    crearLogIn();

}
//carga todo el login
function crearLogIn(){
    let div1 = document.getElementById("cuerpo")
    let fragment = document.createDocumentFragment();
    let div2 = document.createElement('div');
    let form = document.createElement('form');
    let h3 = document.createElement('h3');
    let inp1 = document.createElement('input');
    let inp2 = document.createElement('input');
    let btn1 = document.createElement('button');
    let btn2 = document.createElement('button');

    form.setAttribute('name',"sesion");
    form.setAttribute('method',"post");

    h3.textContent = "Inicio de sesion";

    div2.setAttribute('class',"insertar");

    inp1.setAttribute('type',"email");
    inp1.setAttribute('id',"txt_email");
    inp1.setAttribute('class',"form-control col-md-5");
    inp1.setAttribute('placeholder',"Correo");

    inp2.setAttribute('type',"password");
    inp2.setAttribute('id',"txt_contrasena");
    inp2.setAttribute('class',"form-control col-md-5");
    inp2.setAttribute('placeholder',"Contraseña");

    btn1.setAttribute('type',"button");
    btn1.setAttribute('id',"btn_registrar");
    btn1.textContent = "Registrar";

    btn2.setAttribute('type',"button");
    btn2.setAttribute('id',"btn_iniciar_sesion");
    btn2.textContent = "Iniciar Sesion";

    div2.appendChild(inp1);
    div2.appendChild(inp2);
    div2.appendChild(btn1);
    div2.appendChild(btn2);

    form.appendChild(h3);
    form.appendChild(div2);

    fragment.appendChild(form);

    div1.appendChild(fragment);

    cargarlogIn();

}
//funcion de log in
function cargarlogIn(){      
    addEvent(document.getElementById("btn_iniciar_sesion"),"click",verificaInicio,false);
    addEvent(document.getElementById("btn_registrar"),"click",verificaRegistro,false);
}
function verificaRegistro(){
    datosLogIn();
    if(correo=="" || contrasena==""){
        alert("Datos incompletos");
    }else{
        registrar();
    }
}
function verificaInicio(){
    datosLogIn();
    if(correo=="" || contrasena==""){
        alert("Datos incompletos");
    }else{
        iniciarSesion();
    }
}
function datosLogIn(){
    correo=document.getElementById("txt_email").value;
    contrasena=document.getElementById("txt_contrasena").value;
}
//registrar nuevo usuario
function registrar(){
    //datos();
    conexion=xmlhttprequest();
    conexion.onreadystatechange=esperaResultado1;
    conexion.open("POST","registrar.php",true); 
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
    conexion.open("POST","sesiones.php",true); 
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
            window.open("registro_em.html","_self");
        }
        count=0;
    }
}



function xmlhttprequest(){
    return new XMLHttpRequest();
}
//MMG
