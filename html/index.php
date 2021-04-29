<html>
 <head>
  <link rel="stylesheet" type="text/css" href="css/general.css">
  <link href="https://fonts.googleapis.com/css?family=Roboto:normal,bold,italic&display=swap" rel="stylesheet">
  <script src="js/funciones_http.js"></script>
  <script src="js/SportSiete.js"></script>
  <meta name="viewport" content="width=device-width, user-scalable=no">
 </head>
 <body>
  <form name=frm_global onSubmit="return false;">
  <div id=AreaGeneral>
   <div id=AreaEncabezado>
    <table border=0 style='width:100%;height:100%;border-collapse:collapse;font-size:1em;'>
     <tr>
      <td class="BackgroundLogo" style="width:12em;"></td>
      <td class="BackgroundCoins"></td>
     </tr>
    </table>
   </div>
   <div id=AreaSelectores>
     <div id=AreaSelectorDeportes>
      <table border=0 style="width:100%;border-collapse:collapse;font-size:1em;color:white;">
       <tr style="height:2em;"><td align=center style="font-weight:700;">DEPORTES</td></tr>
       <tr style="height:3em;">
        <td class="TDDeporte">
         <div style="background-image:url('imagenes/Sports SportSiete-4-26.png');"></div>
         <div style="background-image:url('imagenes/Sports SportSiete-4-25.png');"></div>
         <div style="background-image:url('imagenes/Sports SportSiete-4-24.png');"></div>
         <div style="background-image:url('imagenes/Sports SportSiete-4-23.png');"></div>
         <div style="background-image:url('imagenes/Sports SportSiete-4-22.png');"></div>
        </td>
       </tr>
<!--
       <tr style="height:3em;"><td class="TDDeporte"><div style="background-image:url('imagenes/Sports SportSiete-4-26.png');"></div></td></tr>
       <tr style="height:3em;"><td class="TDDeporte"><div style="background-image:url('imagenes/Sports SportSiete-4-25.png');"></div></td></tr>
       <tr style="height:3em;"><td class="TDDeporte"><div style="background-image:url('imagenes/Sports SportSiete-4-24.png');"></div></td></tr>
       <tr style="height:3em;"><td class="TDDeporte"><div style="background-image:url('imagenes/Sports SportSiete-4-23.png');"></div></td></tr>
       <tr style="height:3em;"><td class="TDDeporte"><div style="background-image:url('imagenes/Sports SportSiete-4-22.png');"></div></td></tr>
-->
      </table>
     </div>
     <div id=AreaSelectorLigas>
      Ligas
     </div>
   </div>
   <div id=AreaTrabajoExterna>
    <div class="BackgroundSuavizador"></div>
    <div id=AreaTrabajo>
     <div class="AreaPaginaCompleta">
      <div class="AreaCuartoDePagina">
       Area equivalente a cuarto de pagina completa
      </div>
      <div class="AreaCuartoDePagina">
       segundo cuarto
      </div>
      <div class="AreaCuartoDePagina">
       tercer cuarto
      </div>
      <div class="AreaCuartoDePagina">
       cuarto cuarto
      </div>
     </div>
     <div class="AreaPaginaCompleta">
      <div class="AreaTercioDePagina">
       Area equivalente a un tercio de pagina completa
      </div>
      <div class="AreaTercioDePagina">
       segundo tercio
      </div>
      <div class="AreaTercioDePagina">
       tercer tercio
      </div>
     </div>
     <div class="AreaPaginaCompleta">
      <div class="AreaMitadDePagina">
       Area equivalente a la mitad de la pagina competa
      </div>
      <div class="AreaMitadDePagina">
       Segunda mitad
      </div>
     </div>
    </div>
   </div>
   <div id=AreaApuesta>
    <table id="TableInfoPerfil" border=0>
     <tr>
      <td>
      </td>
     </tr>
    </table>
    <table class="TableInput" border=0>
     <tr>
      <td valign=middle align=center style="position:relative;">
       <input type=text placeholder="Buscar">
       <div class="IconoLupa"></div>
      </td>
     </tr>
    </table>
   </div>
   <div id=AreaBanerVertical>
   <a href="recarga.php">Recargar</a>
    Baner
   </div>
  </div>

  <script language=javascript>
    var tmpImg = new Image();
    var LosFondos = Array("imagenes/MLS.png","imagenes/Baseball.png");
    var FondoActual = 0;
    function f_js_CambiarFondo(){
      el_id("AreaTrabajoExterna").style.backgroundSize="0.1% 0.1%";
      eval("setTimeout(function(){el_id('AreaTrabajoExterna').style.backgroundImage='url(\"" + this.src + "\")';},1000);");
      eval("setTimeout(function(){el_id('AreaTrabajoExterna').style.backgroundSize='100% 100%';},1100);");
//      el_id("AreaTrabajoExterna").style.backgroundImage="url('" + this.src + "')";
      console.log("Cambio " + this.src);
    }
    function f_js_PreCargarFondo(){
      tmpImg.onload = f_js_CambiarFondo;
      tmpImg.src = LosFondos[FondoActual];
      FondoActual++;
      if (FondoActual >= LosFondos.length)
        FondoActual = 0;
      console.log("preload");
    }
    setTimeout(f_timer,50);
    setTimeout(f_js_PreCargarFondo,100);
    setInterval(f_js_PreCargarFondo,10000);
  </script>
  </form>
 </body>
<html>
