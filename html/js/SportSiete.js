var cliente_http = f_http_inicializar_cliente();
var el_timer = setInterval("f_timer()",300000);
//var el_timer = setInterval("f_timer()",60000);
// Sesion
var v_cwf_id = false;
// Que pagina se esta dibujando en el area de trabajo
//     Encuentros : Se dibujan los encuentros
//     Registro : Se dibuja el formulario de registro
var v_PaginaActual = "Encuentros";
// Contador de sincronizaciones
var nCargas = 0;
var v_js_deporte = 1;
var v_js_soloDeHoy = false;
var v_js_soloMarcadorDirecto = false;
var apostadoGlobal = new Array();
var apostadoMonto = 0;
var apostadoMaximo = 0;
var apostadoFactor = 1;
var infoUsuario = false;
var GlobalFaltanDirectos = true;
var FiltroPais = "";
var FiltroLiga = "";

var UltimoListadoEncuentros = false;
var UltimoListadoTipos = false;

var OpcionesAdmin="";

var TabSeleccionado = 0;

var EncuentroExpandido = false;

function el_id(id){
	if (document.getElementById)
		return document.getElementById(id);
	else if (window[id])
		return window[id];
	return null;
}

function f_timer()
{
console.log("f_timer()");
  if (nCargas < 0) // deshabilitado por un tiempo
  {
    nCargas++;
    return;
  }
  if ((nCargas % 10) == 0)
    f_js_CargarDatosUsuario();
  else
    f_js_Cargar();
  nCargas++;
}

function f_js_CargarDatosUsuario()
{
/*
  if (el_id("encuentros") == null)
    return;
*/
  if ( ! v_cwf_id )
  {
    f_js_Cargar();
    return;
  }
  f_http_post(cliente_http
             ,"SportSiete.php"
             ,"method=datosUsuario"
                + "&Sesion=" + v_cwf_id
             ,f_js_CargarDatosUsuario_Respuesta,5000);
}

function f_js_CargarDatosUsuario_Respuesta()
{
  var el_div = el_id("encuentros");
  var json_resp = f_js_procesar_respuesta_generica(cliente_http,true);
  if (json_resp)
  {
//console.log(json_resp);
    if (json_resp.ErrorDescripcion)
    {
      alert(json_resp.ErrorDescripcion);
    }
    else if (json_resp.Usuario)
    {
      el_id("BotonAbrirAutenticacion").style.display = "none";
      apostadoMaximo = parseFloat(json_resp.Usuario["disponible"]);
      if (parseFloat(apostadoMonto) > apostadoMaximo || apostadoMonto == 0)
      {
        apostadoMonto = 5000;
        f_js_dibujarApostado();
      }
      if ( (el_div = el_id("ZonaPerfil")) == null)
        alert("No se puede dibujar el Perfil");
      else
      {
        el_div.style.display = "block";
        if ( (el_div = el_id("PerfilNombre")) == null)
          alert("No se puede dibujar el nombre del usuario");
        else
          el_div.innerHTML=json_resp.Usuario["login"];
        if ( (el_div = el_id("PerfilNickName")) == null)
          alert("No se puede dibujar el codigo del usuario");
        else
          el_div.innerHTML="Cod.:" + json_resp.Usuario["codigo"];
        if ( (el_div = el_id("PerfilUsuario")) == null)
          alert("No se puede dibujar el saldo del usuario");
        else
        {
          el_div.innerHTML="$ " + json_resp.Usuario["disponible"];
        }
      }
      if ((el_div = el_id("SaldoDisponible")) != null)
      {
        if (json_resp.Usuario.disponible != null)
        {
          el_div.innerHTML = apostadoMaximo;
        }
        else
          el_div.innerHTML = "0";
      }
      if ((el_div = el_id("CodigoCliente")) != null)
      {
        if (json_resp.Usuario.codigo != null)
          el_div.innerHTML = json_resp.Usuario["codigo"] + "-" + json_resp.Usuario["login"];
        else
          el_div.innerHTML = "X";
      }
    }
    else
    {
      alert("La respuesta no contiene datos del usuario");
    }
    f_js_Cargar();
  }
}

function f_js_Cargar()
{
/*
  if (el_id("encuentros") == null)
    return;
*/
  f_http_post(cliente_http
             ,"SportSiete.php"
             ,"method=datos3"
                + "&Deporte=" + v_js_deporte
//              + "&Sesion=" + v_cwf_id
             ,f_js_Cargar_Respuesta,5000);
}

function f_js_Cargar_Respuesta()
{
  var json_resp = f_js_procesar_respuesta_generica(cliente_http,true);
  if (json_resp)
  {
    if (json_resp.ErrorDescripcion)
    {
      alert(json_resp.ErrorDescripcion);
    }
    else if (json_resp.Encuentros)
    {
      UltimoListadoEncuentros = json_resp.Encuentros;
      UltimoListadoTipos = json_resp.Tipos;
      f_js_Redibujar();
/*
      f_js_ListarEncuentros();
      for (j = 0; j < apostadoGlobal.length; j++)
        apostadoGlobal[j][3] = false;
      setTimeout("f_js_dibujarApostado()",300);
*/
      return;
    }
    else
    {
      console.log(json_resp);
      alert("No se pueden descargar los encuentros");
    }
  }
}

function f_js_procesar_respuesta_generica(pClienteHttp,pMostrarMensajes)
{
  if (pClienteHttp)
  {
    switch (pClienteHttp.readyState)
    {
      case 4 :
        var respuesta = pClienteHttp.responseText;
        if (respuesta != "")
        {
          var json_resp = JSON.parse(respuesta);
          if(! json_resp)
          {
            if (pMostrarMensajes)
              alert("Hubo un problema guardando su busqueda.\n" + respuesta);
            return false;
          }
          if(json_resp.ErrorDescripcion)
          {
            if (pMostrarMensajes)
              alert("Error : " + json_resp.ErrorDescripcion);
            return false;
          }
          return json_resp;
        }
        if (pMostrarMensajes)
        {
          console.log("Error : No se reconoce la respuesta '" + respuesta + "'");
//          f_js_CargarPagina("./");
//          alert("No se reconoce la respuesta '" + respuesta + "'");
        }
        break;

      case 1:
      case 2:
      case 3:
        return false;

      default:
        alert("estado : " + pClienteHttp.readyState);
        break;
    }
  }
  return false;
}

function f_js_ListarEncuentrosDeporte(pdeporte){
	var txtEncuentros = "";
	var tmpLiga = "";
	for (i = 0; i < UltimoListadoEncuentros.length; i++){
		if (pdeporte == UltimoListadoEncuentros[i].deporte_id){
			if (tmpLiga != UltimoListadoEncuentros[i].liga_id){
				tmpLiga = UltimoListadoEncuentros[i].liga_id;
				txtEncuentros += "<div class='AreaPaginaCompleta' style='font-size:1.7em;color:#fcc;background-color:rgba(23,115,58,0.7);'>"
				+			UltimoListadoEncuentros[i].liga
				+		"</div>"
				;
			}
			txtEncuentros += "<div class='AreaPaginaCompleta' style='background-color:rgba(84,164,65,0.3);'>"
			+			UltimoListadoEncuentros[i].local
			+			" vs "
			+			UltimoListadoEncuentros[i].visitante
			+			" "
			+			UltimoListadoEncuentros[i].instante
			+		"</div>"
			;
		}
	}
	return txtEncuentros;
}

function f_js_Redibujar(){
	el_id("AreaTrabajo").innerHTML="Recargando...";
	switch(v_PaginaActual){
		case "Encuentros":
			f_js_ListarEncuentros();
			break;
		case "Registro":
			f_js_DibujarRegistro();
			break;
		default:
			break;
	}
	setTimeout("f_js_dibujarApostado()",300);
}

function f_js_ListarEncuentros(){
	var divTrabajo = el_id("AreaTrabajo");
	var nombreDeporte = v_js_deporte;

	if (v_PaginaActual != "Encuentros"){
		alert("f_js_ListarEncuentros() : No deberia ejecutarse, pagina actual : " + v_PaginaActual);
		return;
	}

	switch(v_js_deporte){
		case 1 : nombreDeporte = "FUTBOL";break;
		default : nombreDeporte = "Deporte : " + v_js_deporte; break;
	}

	var txtEncuentros = "<div class='AreaPaginaCompleta'>"
	+			"<div class='AreaMediaPagina BackgroundBotonAmarilloDegrade'>algo</div>"
	+		"</div>"
	;
	txtEncuentros += "<div class='AreaPaginaCompleta BackgroundBotonAmarilloDegrade' style='letter-spacing:1em;font-style:normal;font-weight:700;vertical-align:middle;'>"
	+			nombreDeporte
	+		"</div>"
	;
	console.log(UltimoListadoEncuentros[0]);
	txtEncuentros += "<div class='AreaPaginaCompleta'>";
	txtEncuentros += f_js_ListarEncuentrosDeporte(v_js_deporte);
	txtEncuentros += "</div>";
	divTrabajo.innerHTML = txtEncuentros;
}

function f_js_dibujarApostado(){
	var tabApuesta = el_id("TableInfoPerfil");
	if ( ! v_cwf_id ){
		TableInfoPerfil.innerHTML =
							"<tr><td colspan=2>Iniciar Sesi&oacute;n</td></tr>"
		+					"<tr><td colspan=2><input name=SSUsuario type=text placeHolder='Usuario'></td></tr>"
		+					"<tr><td colspan=2><input name=SSClave type=password placeHolder='Clave'></td></tr>"
		+					"<tr><td colspan=2 style='font-size:0.7em;'>Olvid&oacute; su clave</td></tr>"
		+					"<tr>"
		+						"<td style='cursor:pointer;' onClick='f_login()' title='Ingresar a la plataforma'>Entrar</td>"
		+						"<td style='cursor:pointer;' onClick='f_js_CambiarPaginaActual(\"Registro\")' title='Registrar nuevo usuario'>Registro</td>"
		+					"</tr>"
		;
		document.frm_global.SSUsuario.focus();
		return;
	}
	TableInfoPerfil.innerHTML = "<tr><td align=center>Su Apuesta</td></tr>";
}

function f_js_CambiarPaginaActual(pNuevaPagina){
	v_PaginaActual = pNuevaPagina;
	f_js_Redibujar();
}

function f_js_DibujarRegistro(){
	var divTrabajo = el_id("AreaTrabajo");
	var txtEncuentros = "<div class='AreaPaginaCompleta BackgroundBotonAmarilloDegrade' style='letter-spacing:1em;font-style:normal;font-weight:700;vertical-align:middle;'>"
	+			"REGISTRO"
	+		"</div>"
	;
	divTrabajo.innerHTML = txtEncuentros;
}
