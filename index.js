//Variables globales
let count=0;
let correo,contrasena;
let url;
let sesion;
let nombre,p_apellido,s_apellido,telefono,email,direccion,puesto,rol,salario;
let empleados, arr_empleado;
let arr_comida, desayuno, comida, bebidas;
let j=1,k=1,l=1,total;
let m,n=5;
let id_cliente=0;
let arr_orden, ordenes;
let arr_total, clientes;
let arr_sucursal, sucursal;

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
        Swal.fire({
            title: "Error",
            text: "Datos incompletos",
            icon: "error"
        });
    }else{
        if(validarEmail(correo))
            registrar();
        else{
            Swal.fire({
                title: "Error",
                text: "Correo invalido",
                icon: "error"
            });
        }
    }
}
function verificaInicio(){
    datos();
    if(correo=="" || contrasena==""){
        Swal.fire({
            title: "Error",
            text: "Datos incompletos",
            icon: "error"
        });
    }else{
        if(validarEmail(correo)){
            iniciarSesion();
        }else{
                Swal.fire({
                    title: "Error",
                    text: "Correo invalido",
                    icon: "error"
                });
            }
    }
}
function datos(){
    correo=document.getElementById("txt_email").value;
    contrasena=document.getElementById("txt_contrasena").value;
}
//funcion de inicio
function cargarInicio(){     
    buscaSesion();
    addEvent(document.getElementById("btn_cerrar_sesion"),"click",cerrarSesion,false);
    
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
        let msg = conexion.responseText;
        if(msg==""){
            Swal.fire({
                title: "Exito",
                text: "Guardado con exito",
                icon: "success"
            }); 
        }else{
            Swal.fire({
                title: "Error",
                text: msg,
                icon: "warning"
            }); 
        }
         
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
            Swal.fire({
                title: "Error",
                text: "No estas registrado",
                icon: "warning"
            }); 
        }else if(estado == 1){
            Swal.fire({
                title: "Error",
                text: "Contraseña incorrecta",
                icon: "warning"
            }); 
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
    addEvent(document.getElementById("btn_cerrar_sesion"),"click",cerrarSesion,false);
    
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
        
        let columna10=document.createElement('td');
        columna1.setAttribute('scope',"col");
        columna2.setAttribute('scope',"col");
        columna3.setAttribute('scope',"col");
        columna4.setAttribute('scope',"col");
        columna5.setAttribute('scope',"col");
        columna6.setAttribute('scope',"col");
        columna7.setAttribute('scope',"col");
        columna8.setAttribute('scope',"col");
       
        columna10.setAttribute('scope',"col");
        columna1.textContent=arr_empleado[0]["id"+i]+"  ";
        columna2.textContent=arr_empleado[0]["nombre"+i]+" ";
        columna3.textContent=arr_empleado[0]["p_apellido"+i]+" ";
        columna4.textContent=arr_empleado[0]["s_apellido"+i]+" ";
        columna5.textContent=arr_empleado[0]["telefono"+i]+" ";
        columna6.textContent=arr_empleado[0]["email"+i]+" ";
        columna7.textContent=arr_empleado[0]["direccion"+i]+" ";
        columna8.textContent=arr_empleado[0]["puesto"+i]+" ";
        
        columna10.textContent=arr_empleado[0]["salario"+i]+" ";
        fragment2.appendChild(columna1);
        fragment2.appendChild(columna2);
        fragment2.appendChild(columna3);
        fragment2.appendChild(columna4);
        fragment2.appendChild(columna5);
        fragment2.appendChild(columna6);
        fragment2.appendChild(columna7);
        fragment2.appendChild(columna8);
       
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
        Swal.fire({
            title: "Error",
            text: "Datos incompletos",
            icon: "warning"
        }); 
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
    buscaSesion();
    addEvent(document.getElementById("btn_cerrar_sesion"),"click",cerrarSesion,false);
    desayuno = document.getElementById("desayuno");
    comida = document.getElementById("comida");
    bebidas = document.getElementById("bebidas");
    addEvent(document.getElementById("btn_registrar_cliente"),'click',verificaDatosCliente,false);
    addEvent(document.getElementById("btn_generar_orden"),'click',verificaDatosOrden,false);
    addEvent(document.getElementById("btn_limpiar"),'click',limpiarTablas,false);
    ordenes = document.getElementById("tbl_ordenes");
    clientes = document.getElementById("tbl_clientes");
    sucursal = document.getElementById("sucursalSelect");
    //creaTablas();
    destruirTablas();
    buscaOrden();
    
    creaMenu();
   
   
    
}
function limpiarTablas(){

    conexion=xmlhttprequest();
    conexion.onreadystatechange=esperaLimpia;
    conexion.open("POST","php/limpiar.php",true); 
    conexion.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    conexion.send();
    //alert(puesto)
}
function esperaLimpia(){
    count++;
    if(conexion.readyState==4){
        //alert("limpio");
        
        
        destruirTablas();
        id_cliente=0;
    }
}
function verificaDatosCliente(){
    let nombre_cliente = document.getElementById("txt_nombre_cliente").value;
    let mesa = document.getElementById("txt_mesa").value;
    if(nombre_cliente=="" || mesa==""){
        Swal.fire({
            title: "Error",
            text: "Faltan datos",
            icon: "warning"
        }); 
    }else{
        registrarCliente();
    }
}
function verificaDatosOrden(){
    let sucursal_tipo = document.getElementById("sucursalSelect").value;
    let arr_comida_pedir=document.getElementsByTagName("input");
    let id_cliente_p = document.getElementById("txt_id").value;
    let m = j + k + l + 5;
    let nom_cliente_p = document.getElementById("txt_name").value;
    let mesa_cliente_p = document.getElementById("txt_mesa_dos").value;


    let i = 0;
    let estado=false;
    while (i <= m && i < arr_comida_pedir.length) {
        if (arr_comida_pedir[i].checked) {
            n = arr_comida_pedir[i].value;
            estado=true;
        }
        i++;
    }
    if(sucursal_tipo==0 || estado==false || id_cliente_p=="" || nom_cliente_p=="" || mesa_cliente_p==""){
        Swal.fire({
            title: "Error",
            text: "Faltan datos",
            icon: "warning"
        }); 
    }else{
        
        generaOrden();
    }
}
function buscaSucursal(){
    conexion = xmlhttprequest();
    conexion.onreadystatechange = esperaSucursal;
    conexion.open("POST","php/busca_sucursal.php",true);   
    conexion.setRequestHeader("Content-type","application/x-www-form-urlencoded");  
    conexion.send();
    
    
}
function esperaSucursal(){ 
    if(conexion.readyState == 4){
        arr_sucursal=eval(conexion.responseText);
        //alert(arr_sucursal[0]["id1"]);
        agregaSucursales();
        buscaOrden();
        //creaMenu();
        
    }
}  
function agregaSucursales(){
    let fragment1=document.createDocumentFragment();
    
    //Crea las filas
    for(let i=1;i<=arr_sucursal[0]["tam"];i++){
        let option=document.createElement('option');
        option.setAttribute('value',i);
        option.textContent=arr_sucursal[0]["nombre"+i] ;
        fragment1.appendChild(option);
        
    }
    sucursal.appendChild(fragment1);
}
function creaTablas(){
    buscaOrden();
    buscaTotal();
}
function generaOrden() {
    let arr_comida_pedir=document.getElementsByTagName("input");
    let m = j + k + l + 5;
    let i = 0;
    while (i <= m && i < arr_comida_pedir.length) {
        if (arr_comida_pedir[i].checked) {
            n = arr_comida_pedir[i].value;
            enviaOrden();
        }
        i++;
    }
}
function enviaOrden(){
    conexion = xmlhttprequest();
    conexion.onreadystatechange = guardaOrden;
    conexion.open("POST","php/orden.php",true);   
    conexion.setRequestHeader("Content-type","application/x-www-form-urlencoded");  
    conexion.send("v1=" + n+"&v2=" + id_cliente);
}

function guardaOrden() {
    if (conexion.readyState == 4) {
        //alert(conexion.responseText);
        
        //alert("orden generada");
        destruirTablas();
        buscaOrden();
        buscaTotal();buscaOrden();
    }
}
function registrarCliente(){
    let nombre_cliente = document.getElementById("txt_nombre_cliente").value;
    let mesa = document.getElementById("txt_mesa").value;
    conexion = xmlhttprequest();
    conexion.onreadystatechange = esperaCliente;
    conexion.open("POST","php/cliente.php",true);   
    conexion.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    if(nombre_cliente=="" || mesa==""){
        Swal.fire({
            title: "Error",
            text: "Faltan datos",
            icon: "warning"
        }); 
    } else{
        //alert(nombre_cliente+""+mesa);
        conexion.send("v1="+nombre_cliente+"&v2="+mesa);
        document.getElementById("txt_name").value =nombre_cliente;
        document.getElementById("txt_mesa_dos").value =mesa;
        
    }
    
}
function esperaCliente(){ 
    if(conexion.readyState == 4){
        //alert(conexion.responseText);
        id_cliente=conexion.responseText;
        document.getElementById("txt_id").value =id_cliente;
        buscaSucursal();
        //alert(id_cliente);
        
    }
}
function creaMenu(){
    
    //buscaTotal();
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
        //alert("entra");
        buscaSesion();
        crearTarjetas();
        buscaSesion();
        
        
    }
}
function destruirTablas(){
    //alert("entra");
    document.getElementById("tbl_ordenes").innerHTML = '<tbody id="tbl_ordenes"></tbody>';
    document.getElementById("tbl_clientes").innerHTML = '<tbody id="tbl_clientes"></tbody>';
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
            input.setAttribute("value",arr_comida[0]["nombre"+i]);
            label.setAttribute("for","desayuno"+j);
            label.setAttribute("id","desayuno_l"+j);
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
            input.setAttribute("value",arr_comida[0]["nombre"+i]);
            label.setAttribute("for","comida"+k);
            label.setAttribute("id","comida_l"+k);
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
            input.setAttribute("value",arr_comida[0]["nombre"+i]);
            label.setAttribute("for","bebida"+l);
            label.setAttribute("id","bebida_l"+l);
            label.textContent = arr_comida[0]["nombre"+i];
            span.setAttribute("class","badge badge-primary");
            span.textContent ="$"+ arr_comida[0]["precio"+i]
            li.setAttribute("class","list-group-item d-flex justify-content-between align-items-center");
            li.appendChild(input);
            li.appendChild(label);
            li.appendChild(span);
            fragment3.appendChild(li);
            bebidas.appendChild(fragment3);
            l++;
        }
        
        
    }
}

//Crea tabla ordenes
function buscaOrden(){
    conexion = xmlhttprequest();
    conexion.onreadystatechange = esperaOrdenes;
    conexion.open("POST","php/mostrar_orden.php",true);   
    conexion.setRequestHeader("Content-type","application/x-www-form-urlencoded");  
    conexion.send();
    //destruirTablas();
}
function esperaOrdenes(){ 
    if(conexion.readyState == 4){
        arr_orden=eval(conexion.responseText);
        //alert(arr_orden[0]["tam"]);
        //destruirTablas();
        crearTablaOrden();
        buscaTotal();
        
    }
}  
function crearTablaOrden(){ 
    let fragment1=document.createDocumentFragment();
    let fragment2=document.createDocumentFragment();
    //Crea las filas
    for(let i=1;i<=arr_orden[0]["tam"];i++){
        let fila=document.createElement('tr');
        fila.setAttribute('id',"fila"+i);
        fila.setAttribute('scope',"row");
        fila.textContent="" ;
        fragment1.appendChild(fila);
        
    }
    ordenes.appendChild(fragment1);
    //Crea las columnas
    //alert(arr_empleado[0]["tam"]);
    for(let i=1;i<=arr_orden[0]["tam"];i++){
        fila= document.getElementById("fila"+i);
        let columna1=document.createElement('td');
        let columna2=document.createElement('td');
        let columna3=document.createElement('td');
        let columna4=document.createElement('td');
        let columna5=document.createElement('td');
        let columna6=document.createElement('td');
      
        
        let columna10=document.createElement('td');
        columna1.setAttribute('scope',"col");
        columna2.setAttribute('scope',"col");
        columna3.setAttribute('scope',"col");
        columna4.setAttribute('scope',"col");
        columna5.setAttribute('scope',"col");
        columna6.setAttribute('scope',"col");
        
        columna1.textContent=arr_orden[0]["orden_id"+i]+"  ";
        columna2.textContent=arr_orden[0]["cliente_id"+i]+" ";
        columna3.textContent=arr_orden[0]["mesa"+i]+" ";
        columna4.textContent=arr_orden[0]["nombre"+i]+" ";
        columna5.textContent=arr_orden[0]["comida_id"+i]+" ";
        columna6.textContent=arr_orden[0]["total"+i]+" ";
       
        fragment2.appendChild(columna1);
        fragment2.appendChild(columna2);
        fragment2.appendChild(columna3);
        fragment2.appendChild(columna4);
        fragment2.appendChild(columna5);
        fragment2.appendChild(columna6);
 
        fila.appendChild(fragment2);
    }

}

//Crea tabla clientes
function buscaTotal(){
    //7alert("entra")
    conexion = xmlhttprequest();
    conexion.onreadystatechange = esperaTotales;
    conexion.open("POST","php/calcula_total.php",true);   
    conexion.setRequestHeader("Content-type","application/x-www-form-urlencoded");  
    conexion.send();
}
function esperaTotales(){ 
    if(conexion.readyState == 4){
        arr_total=eval(conexion.responseText);
        //alert(arr_total[0]["tam"]);
        crearTotales();
        
        
    }
}  
function crearTotales(){ 
    let fragment1=document.createDocumentFragment();
    let fragment2=document.createDocumentFragment();
    //Crea las filas
    for(let i=1;i<=arr_total[0]["tam"];i++){
        let fila=document.createElement('tr');
        fila.setAttribute('id',"fila"+i);
        fila.setAttribute('scope',"row");
        fila.textContent="" ;
        fragment1.appendChild(fila);
        
    }
    clientes.appendChild(fragment1);
    //Crea las columnas
    //alert(arr_empleado[0]["tam"]);
    for(let i=1;i<=arr_total[0]["tam"];i++){
        fila= document.getElementById("fila"+i);
        let columna1=document.createElement('td');
        let columna2=document.createElement('td');
        let columna3=document.createElement('td');
      
        let columna10=document.createElement('td');
        columna1.setAttribute('scope',"col");
        columna2.setAttribute('scope',"col");
        columna3.setAttribute('scope',"col");
        
        columna1.textContent=arr_total[0]["cliente_id"+i]+"  ";
        columna2.textContent=arr_total[0]["nombre"+i]+" ";
        columna3.textContent=arr_total[0]["total"+i]+" ";

        fragment2.appendChild(columna1);
        fragment2.appendChild(columna2);
        fragment2.appendChild(columna3);

        fila.appendChild(fragment2);
    }

}
function cargarMenu(){
    desayuno = document.getElementById("desayuno");
    comida = document.getElementById("comida");
    bebidas = document.getElementById("bebidas");
    addEvent(document.getElementById("btn_cerrar_sesion"),"click",cerrarSesion,false);
    //buscaTotal();
    conexion = xmlhttprequest();
    conexion.onreadystatechange = esperaMenu;
    conexion.open("POST","php/comida.php",true);   
    conexion.setRequestHeader("Content-type","application/x-www-form-urlencoded");  
    conexion.send();
   
}
function esperaMenu(){ 
    if(conexion.readyState == 4){
        //alert(conexion.responseText);
        arr_comida=eval(conexion.responseText);
        //alert("entra");
        crearMenu();
        
    }
}

function crearMenu(){
    //alert("entra");
    let fragment1=document.createDocumentFragment();
    let fragment2=document.createDocumentFragment();
    let fragment3=document.createDocumentFragment();
    buscaSesion();
    
    for(let i=0;i<=arr_comida[0]["tam"];i++){
        let categoria = arr_comida[0]["categoria"+i];
        if(categoria=="Desayuno"){
            
            let li = document.createElement('li');
            let label =  document.createElement('label');
            let input =  document.createElement('p');
            let span = document.createElement('span');
            let span2 = document.createElement('span');
            input.setAttribute("id","desayuno"+j);
            input.setAttribute("value",arr_comida[0]["nombre"+i]);
            label.setAttribute("for","desayuno"+j);
            label.setAttribute("id","desayuno_l"+j);
            label.textContent = arr_comida[0]["nombre"+i];
            span.setAttribute("class","badge badge-dark");
            span.textContent =arr_comida[0]["cantidad"+i]
            span2.setAttribute("class","badge badge-primary");
            span2.textContent ="$"+ arr_comida[0]["precio"+i];
            li.setAttribute("class","list-group-item d-flex justify-content-between align-items-center");
            li.appendChild(input);
            li.appendChild(label);
            li.appendChild(span);
            li.appendChild(span2);
            fragment1.appendChild(li);
            desayuno.appendChild(fragment1);
            j++;
        }
        if(categoria=="Comida"){
            let li = document.createElement('li');
            let label =  document.createElement('label');
            let input =  document.createElement('p');
            let span = document.createElement('span');
            let span2 = document.createElement('span');
            input.setAttribute("id","comida"+k);
            input.setAttribute("value",arr_comida[0]["nombre"+i]);
            label.setAttribute("for","comida"+k);
            label.setAttribute("id","comida_l"+k);
            label.textContent = arr_comida[0]["nombre"+i];
            span.setAttribute("class","badge badge-dark");
            span.textContent =arr_comida[0]["cantidad"+i]
            span2.setAttribute("class","badge badge-primary");
            span2.textContent ="$"+ arr_comida[0]["precio"+i];
            li.setAttribute("class","list-group-item d-flex justify-content-between align-items-center");
            li.appendChild(input);
            li.appendChild(label);
            li.appendChild(span);
            li.appendChild(span2);
            fragment2.appendChild(li);
            comida.appendChild(fragment2);
            k++;
        }
        if(categoria=="Bebida"){
            let li = document.createElement('li');
            let label =  document.createElement('label');
            let input =  document.createElement('p');
            let span = document.createElement('span');
            let span2 = document.createElement('span');
            input.setAttribute("id","desayuno"+j);
            input.setAttribute("value",arr_comida[0]["nombre"+i]);
            label.setAttribute("for","bebida"+l);
            label.setAttribute("id","bebida_l"+l);
            label.textContent = arr_comida[0]["nombre"+i];
            span.setAttribute("class","badge badge-primary");
            span2.setAttribute("class","badge badge-dark");
            span2.textContent =arr_comida[0]["cantidad"+i]
            span.textContent ="$"+ arr_comida[0]["precio"+i]
            li.setAttribute("class","list-group-item d-flex justify-content-between align-items-center");
            li.appendChild(input);
            li.appendChild(label);
            li.appendChild(span2);
            li.appendChild(span);
            fragment3.appendChild(li);
            bebidas.appendChild(fragment3);
            l++;
        }
        
        
    }
}


function cerrarSesion(){
    conexion = xmlhttprequest();
    conexion.onreadystatechange = esperaCierre;
    conexion.open("POST","php/cerrar_sesion.php",true);   
    conexion.setRequestHeader("Content-type","application/x-www-form-urlencoded");  
    conexion.send();
   
}
function esperaCierre(){ 
    if(conexion.readyState == 4){
        Swal.fire({
            title: "Adios",
            text: "Se cerro la sesion",
            icon: "info"
        }); 
        window.open("index.html","_self");
        
    }
}