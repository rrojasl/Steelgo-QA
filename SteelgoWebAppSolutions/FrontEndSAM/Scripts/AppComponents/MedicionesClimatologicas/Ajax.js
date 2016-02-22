function AjaxGuardarCaptura(tipoGuardar) {
    try {
        var seGuardoCorrectamente = false;
        loadingStart();
        Captura = [];
        Captura[0] = { Detalles: "" };
        ListaDetalles = [];
        var estaIncompleto = false;
        validaciones();
        

    } catch (e) {
        loadingStop();
        displayMessage("Mensajes_error", e.message, '0');
    }

}

function ArregloListadoCaptura() {
    CondicionClimatologica = [];
    JsonCaptura = [];

    JsonCaptura[0] = {
        ZonaID: "",
        PatioID: "",
        FechaToma: "",
        HoraToma: "",

        TemperaturaAmbiente: "",
        HerramientaAmbienteID: "",

        PorcentajeHumedad: "",
        HerramientaHumedadID: "",

        PuntoRocio: "",
        HerramientPuntoRocioID: "",

        CampoX: "",
        HerramientaCampoXID: ""

    };

    CondicionClimatologica[0] = { Detalle: "" };
    JsonCaptura[0].PatioID = $("#inputPatio").data("kendoComboBox").dataItem($("#inputPatio").data("kendoComboBox").select()).PatioID;
    JsonCaptura[0].ZonaID = $("#Area").data("kendoComboBox").dataItem($("#Area").data("kendoComboBox").select()).AreaID;
    JsonCaptura[0].FechaToma = $("#inputMedicionesfechaToma").val();
    JsonCaptura[0].HoraToma = $("#inputMedicionesHoraToma").val();
    //JsonCaptura[0].ProyectoID = "1"; //$("#inputProyecto").data("kendoComboBox").dataItem($("#inputProyecto").data("kendoComboBox").select()).ProyectoID;
    JsonCaptura[0].TemperaturaAmbiente = $("#inputMedicionesTempAmbiente").val();
    JsonCaptura[0].HerramientaAmbienteID = $("#inputEquipoTomaTempAmbID").data("kendoComboBox").dataItem($("#inputEquipoTomaTempAmbID").data("kendoComboBox").select()).HerramientaDePruebaID;
    JsonCaptura[0].PorcentajeHumedad = $("#inputMedicionesHumedad").val();
    JsonCaptura[0].HerramientaHumedadID = $("#inputEquipoTomaHumedadID").data("kendoComboBox").dataItem($("#inputEquipoTomaHumedadID").data("kendoComboBox").select()).HerramientaDePruebaID;
    JsonCaptura[0].PuntoRocio = $("#inputMedicionesPuntoRocio").val();
    JsonCaptura[0].HerramientPuntoRocioID = $("#inputEquipoTomaPtoRocioID").data("kendoComboBox").dataItem($("#inputEquipoTomaPtoRocioID").data("kendoComboBox").select()).HerramientaDePruebaID;
    JsonCaptura[0].CampoX = $("#inputMedicionesCampoX").val();
    JsonCaptura[0].HerramientaCampoXID = $("#inputEquipoTomaCampoXID").data("kendoComboBox").dataItem($("#inputEquipoTomaCampoXID").data("kendoComboBox").select()).HerramientaDePruebaID;


    CondicionClimatologica[0] = {
        Accion: "",
        ZonaID: "",
        PatioID: "",
        FechaToma: "",
        HoraToma: "",
        TemperaturaAmbiente: "",
        HerramientaTempAmbienteID: "",
        PorcentajeHumedad: "",
        HerramientaHumedadID: "",
        PuntoRocio: "",
        HerramientaPuntoRocioID: "",
        CampoX: "",
        HerramientaCampoXID: ""
    };
    CondicionClimatologica[0].Accion = "";
    CondicionClimatologica[0].ZonaID = JsonCaptura[0].ZonaID;
    CondicionClimatologica[0].TemperaturaAmbiente = JsonCaptura[0].TemperaturaAmbiente;
    CondicionClimatologica[0].HerramientaTempAmbienteID = JsonCaptura[0].HerramientaAmbienteID;
    CondicionClimatologica[0].PorcentajeHumedad = JsonCaptura[0].PorcentajeHumedad;
    CondicionClimatologica[0].HerramientaHumedadID = JsonCaptura[0].HerramientaHumedadID;
    CondicionClimatologica[0].PuntoRocio = JsonCaptura[0].PuntoRocio;
    CondicionClimatologica[0].HerramientaPuntoRocioID = JsonCaptura[0].HerramientPuntoRocioID;
    CondicionClimatologica[0].CampoX = JsonCaptura[0].CampoX;
    CondicionClimatologica[0].HerramientaCampoXID = JsonCaptura[0].HerramientaCampoXID;
    CondicionClimatologica[0].FechaToma = JsonCaptura[0].FechaToma;
    CondicionClimatologica[0].HoraToma = JsonCaptura[0].HoraToma;

    $MedicionesClimatologicas.MedicionesClimatologicas.create(CondicionClimatologica[0], {
        token: Cookies.get("token"), lenguaje: $("#language").val()
      }).done(function (data) {

    });
    loadingStop();
    //return JsonCaptura[0];
}

//function ValidacionControles() {
//    //if ($("#inputProyecto").data("kendoComboBox").dataItem($("#inputProyecto").data("kendoComboBox").select()).ProyectoID === 'undefined'
//    //    || $("#inputProyecto").data("kendoComboBox").dataItem($("#inputProyecto").data("kendoComboBox").select()).ProyectoID === ''
//    //    || $("#inputProyecto").data("kendoComboBox").dataItem($("#inputProyecto").data("kendoComboBox").select()).ProyectoID == null)
//    //{ return true  };
//    //if ($("#inputPatio").data("kendoComboBox").dataItem($("#inputPatio").data("kendoComboBox").select()).PatioID === 'undefined'
//    //    || $("#inputPatio").data("kendoComboBox").dataItem($("#inputPatio").data("kendoComboBox").select()).PatioID === ''
//    //    || $("#inputPatio").data("kendoComboBox").dataItem($("#inputPatio").data("kendoComboBox").select()).PatioID == null)
//    //{ return true };
//    //if ($("#Area").data("kendoComboBox").dataItem($("#Area").data("kendoComboBox").select()).AreaID === 'undefined' ||
//    //   $("#Area").data("kendoComboBox").dataItem($("#Area").data("kendoComboBox").select()).AreaID === '' ||
//    //    $("#Area").data("kendoComboBox").dataItem($("#Area").data("kendoComboBox").select()).AreaID == null)
//    //{ return true };
//    //if ($("#inputMedicionesTempAmbiente").val() === 'undefined'
//    //    || $.trim($("#inputMedicionesTempAmbiente").val()) === ''
//    //    || $("#inputMedicionesTempAmbiente").val() == null)
//    //{ return true };
//    //if ($("#inputMedicionesHumedad").val() === 'undefined'
//    //    || $.trim($("#inputMedicionesHumedad").val()) === ''
//    //    || $("#inputMedicionesHumedad").text() == null)
//    //{ return true };
//    //if ($("#inputMedicionesPuntoRocio").val() === 'undefined'
//    //    || $.trim($("#inputMedicionesPuntoRocio").val()) === ''
//    //    || $("#inputMedicionesPuntoRocio").text() == null)
//    //{ return true };
//    //if ($("#inputMedicionesCampoX").val() === 'undefined'
//    //    || $.trim($("#inputMedicionesCampoX").val()) === ''
//    //    || $("#inputMedicionesCampoX").val() == null)
//    //{ return true };
//    //if ($("#inputMedicionesfechaToma").val() === 'undefined'
//    //    || $.trim($("#inputMedicionesfechaToma").val()) === ''
//    //    || $("#inputMedicionesfechaToma").val() == null)
//    //{ return true };
//    //if ($("#inputMedicionesHoraToma").val() === 'undefined'
//    //    || $.trim($("#inputMedicionesHoraToma").val()) === ''
//    //    || $("#inputMedicionesHoraToma").val() == null)
//    //{ return true };
//    ////if ($("#inputEquipoTomaID").val() === 'undefined'
//    ////    || $.trim($("#inputEquipoTomaID").val()) === ''
//    ////    || $("#inputEquipoTomaID").val() == null)
//    ////{ return true };
//    return false;
//}

function validaciones()
{
    var controles = $("#FieldSetView").kendoValidator().data("kendoValidator");
    if (controles.validate()) {
        ArregloListadoCaptura();
    }
    else {
        displayMessage("ErrorCapturaMediciones", "", '0');
        loadingStop();
    }

}

//Get Zonas-Areas
function AjaxCargarArea() {
    loadingStart();
    $Area.Area.read({ token: Cookies.get("token") }).done(function (data) {
        $("#Area").data("kendoComboBox").value("");
        $("#Area").data("kendoComboBox").dataSource.data(data);
        //alert(JSON.stringify(data));
        loadingStop();
    });
}

////get Patios
function AjaxObtenerPatios() {
    $Patios.Patios.read({ token: Cookies.get("token"), tipo: 2, proyectoID: 0 }).done(function (data) {
        $("#inputPatio").data("kendoComboBox").value("");
        $("#inputPatio").data("kendoComboBox").dataSource.data(data);
        alert(JSON.stringify(data));
        loadingStop();
    });

}

/// get herramientas de medicion 


function AjaxHerramientas()
{

    $HerramientasPruebas.HerramientasPruebas.read({ token: Cookies.get("token"), HerramientaID: 6, lenguaje: $("#language").val() }).done(function (data) {
        $("#inputEquipoTomaTempAmbID").data("kendoComboBox").value("");
        $("#inputEquipoTomaTempAmbID").data("kendoComboBox").dataSource.data(data);
        loadingStop();
    });

    $HerramientasPruebas.HerramientasPruebas.read({ token: Cookies.get("token"), HerramientaID: 6, lenguaje: $("#language").val() }).done(function (data) {
        $("#inputEquipoTomaHumedadID").data("kendoComboBox").value("");
        $("#inputEquipoTomaHumedadID").data("kendoComboBox").dataSource.data(data);
        loadingStop();
    });

    $HerramientasPruebas.HerramientasPruebas.read({ token: Cookies.get("token"), HerramientaID: 8, lenguaje: $("#language").val() }).done(function (data) {
        $("#inputEquipoTomaCampoXID").data("kendoComboBox").value("");
        $("#inputEquipoTomaCampoXID").data("kendoComboBox").dataSource.data(data);
        loadingStop();
    });

    $HerramientasPruebas.HerramientasPruebas.read({ token: Cookies.get("token"), HerramientaID: 7, lenguaje: $("#language").val() }).done(function (data) {
        $("#inputEquipoTomaPtoRocioID").data("kendoComboBox").value("");
        $("#inputEquipoTomaPtoRocioID").data("kendoComboBox").dataSource.data(data);
        loadingStop();
    });





}





