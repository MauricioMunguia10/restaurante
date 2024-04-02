//Variables globales
let count=0;
let correo,contrasena;
let url;
let sesion;
let nombre,p_apellido,s_apellido,telefono,email,direccion,puesto,rol,salario;
let empleados, arr_empleado;
let arr_comida, desayuno, comida, bebidas;
let j=1,k=1,l=1;

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
//funcion principal
function cargarEmpleado(){      
    addEvent(document.getElementById("btn_guardar"),"click",verificaCampos,false);
    empleados = document.getElementById("tbl_empleados");
    buscaSesion();
    buscaEmpleado();
    
}
//Crea tabla empleados
function buscaEmpleado(){
    conexion = xmlhttprequest();
    conexion.onreadystatechange = esperaEmpleados;
    conexion.open("POST","php/empleados.php",true);   
    conexion.setRequestHeader("Content-type","application/x-www-form-urlencoded");  
    conexion.send();
}
function esperaEmpleados(){ 
    if(conexion.readyState == 4){
        arr_empleado=eval(conexion.responseText);
        //alert(arr_empleado[0]["tam"]);
        crearTabla();
        buscaSesion();
    }
}  
function crearTabla(){ 
    let fragment1=document.createDocumentFragment();
    let fragment2=document.createDocumentFragment();
    //Crea las filas
    for(let i=1;i<=arr_empleado[0]["tam"];i++){
        let fila=document.createElement('tr');
        fila.setAttribute('id',"fila"+i);
        fila.setAttribute('scope',"row");
        fila.textContent="" ;
        fragment1.appendChild(fila);
        
    }
    empleados.appendChild(fragment1);
    //Crea las columnas
    //alert(arr_empleado[0]["tam"]);
    for(let i=1;i<=arr_empleado[0]["tam"];i++){
        fila= document.getElementById("fila"+i);
        let columna1=document.createElement('td');
        let columna2=document.createElement('td');
        let columna3=document.createElement('td');
        let columna4=document.createElement('td');
        let columna5=document.createElement('td');
        let columna6=document.createElement('td');
        let columna7=document.createElement('td');
        let columna8=document.createElement('td');
        let columna9=document.createElement('td');
        let columna10=document.createElement('td');
        columna1.setAttribute('scope',"col");
        columna2.setAttribute('scope',"col");
        columna3.setAttribute('scope',"col");
        columna4.setAttribute('scope',"col");
        columna5.setAttribute('scope',"col");
        columna6.setAttribute('scope',"col");
        columna7.setAttribute('scope',"col");
        columna8.setAttribute('scope',"col");
        columna9.setAttribute('scope',"col");
        columna10.setAttribute('scope',"col");
        columna1.textContent=arr_empleado[0]["id"+i]+"  ";
        columna2.textContent=arr_empleado[0]["nombre"+i]+" ";
        columna3.textContent=arr_empleado[0]["p_apellido"+i]+" ";
        columna4.textContent=arr_empleado[0]["s_apellido"+i]+" ";
        columna5.textContent=arr_empleado[0]["telefono"+i]+" ";
        columna6.textContent=arr_empleado[0]["email"+i]+" ";
        columna7.textContent=arr_empleado[0]["direccion"+i]+" ";
        columna8.textContent=arr_empleado[0]["puesto"+i]+" ";
        columna9.textContent=arr_empleado[0]["rol"+i]+" ";
        columna10.textContent=arr_empleado[0]["salario"+i]+" ";
        fragment2.appendChild(columna1);
        fragment2.appendChild(columna2);
        fragment2.appendChild(columna3);
        fragment2.appendChild(columna4);
        fragment2.appendChild(columna5);
        fragment2.appendChild(columna6);
        fragment2.appendChild(columna7);
        fragment2.appendChild(columna8);
        fragment2.appendChild(columna9);
        fragment2.appendChild(columna10);
        fila.appendChild(fragment2);
    }

}

//registro empleados
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
        //alert(conexion.responseText);  
        count=0;
        destruir();
        buscaEmpleado();
    }
}
function destruir(){
    document.getElementById("tbl_empleados").innerHTML = '<tbody id="tbl_empleados"></tbody>';
}

//orden
function cargarOrden(){
    creaMenu();
    desayuno = document.getElementById("desayuno");
    comida = document.getElementById("comida");
    bebidas = document.getElementById("bebidas");
    addEvent(document.getElementById("btn_registrar_cliente"),'click',registrarCliente,false);
}
function registrarCliente(){
    let nombre_cliente = document.getElementById("txt_nombre_cliente").value;
    let mesa = document.getElementById("txt_mesa").value;
    conexion = xmlhttprequest();
    conexion.onreadystatechange = esperaCliente;
    conexion.open("POST","php/cliente.php",true);   
    conexion.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    if(nombre_cliente=="" || mesa==""){
        alert("datos incompletos");
    } else{
        conexion.send("v1="+nombre_cliente+"&v2="+mesa);
        document.getElementById("txt_name").value =nombre_cliente;
        document.getElementById("txt_mesa_dos").value =mesa;
    }
    
}
function esperaCliente(){ 
    if(conexion.readyState == 4){
        //alert(conexion.responseText);
        
    }
}
function creaMenu(){
    conexion = xmlhttprequest();
    conexion.onreadystatechange = esperaOrden;
    conexion.open("POST","php/comida.php",true);   
    conexion.setRequestHeader("Content-type","application/x-www-form-urlencoded");  
    conexion.send();
}
function esperaOrden(){ 
    if(conexion.readyState == 4){
        //alert(conexion.responseText);
        arr_comida=eval(conexion.responseText);
        
        crearTarjetas();
        buscaSesion();
    }
}
function crearTarjetas(){
    //alert("entra");
    let fragment1=document.createDocumentFragment();
    let fragment2=document.createDocumentFragment();
    let fragment3=document.createDocumentFragment();
    
    for(let i=0;i<=arr_comida[0]["tam"];i++){
        let categoria = arr_comida[0]["categoria"+i];
        if(categoria=="Desayuno"){
            
            let li = document.createElement('li');
            let label =  document.createElement('label');
            let input =  document.createElement('input');
            let span = document.createElement('span');
            input.setAttribute("id","desayuno"+j);
            input.setAttribute("type","checkbox");
            input.setAttribute("value",j);
            label.setAttribute("for","desayuno"+j);
            label.textContent = arr_comida[0]["nombre"+i];
            span.setAttribute("class","badge badge-primary");
            span.textContent ="$"+ arr_comida[0]["precio"+i]
            li.setAttribute("class","list-group-item d-flex justify-content-between align-items-center");
            li.appendChild(input);
            li.appendChild(label);
            li.appendChild(span);
            fragment1.appendChild(li);
            desayuno.appendChild(fragment1);
            j++;
        }
        if(categoria=="Comida"){
            let li = document.createElement('li');
            let label =  document.createElement('label');
            let input =  document.createElement('input');
            let span = document.createElement('span');
            input.setAttribute("id","comida"+k);
            input.setAttribute("type","checkbox");
            input.setAttribute("value",k);
            label.setAttribute("for","comida"+k);
            label.textContent = arr_comida[0]["nombre"+i];
            span.setAttribute("class","badge badge-primary");
            span.textContent ="$"+ arr_comida[0]["precio"+i]
            li.setAttribute("class","list-group-item d-flex justify-content-between align-items-center");
            li.appendChild(input);
            li.appendChild(label);
            li.appendChild(span);
            fragment2.appendChild(li);
            comida.appendChild(fragment2);
            k++;
        }
        if(categoria=="Bebida"){
            let li = document.createElement('li');
            let label =  document.createElement('label');
            let input =  document.createElement('input');
            let span = document.createElement('span');
            input.setAttribute("id","desayuno"+j);
            input.setAttribute("type","checkbox");
            input.setAttribute("value",l);
            label.setAttribute("for","bebida"+l);
            label.textContent = arr_comida[0]["nombre"+i];
            span.setAttribute("class","badge badge-primary");
            span.textContent ="$"+ arr_comida[0]["precio"+i]
            li.setAttribute("class","list-group-item d-flex justify-content-between align-items-center");
            li.appendChild(input);
            li.appendChild(label);
            li.appendChild(span);
            fragment3.appendChild(li);
            bebidas.appendChild(fragment3);
            j++;
        }
        
        
    }
}
