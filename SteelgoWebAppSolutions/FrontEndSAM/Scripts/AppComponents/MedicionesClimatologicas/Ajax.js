function AjaxGuardarCaptura(tipoGuardar) {
    try {
        var seGuardoCorrectamente = false;
        loadingStart();
        Captura = [];
        Captura[0] = { Detalles: "" };
        ListaDetalles = [];
        var estaIncompleto = false;
        validaciones();
        //opcionHabilitarView(true, "FieldSetView");
        //DeshablilitarInputs();
        loadingStop();
        

    } catch (e) {
        loadingStop();
        displayMessage("Mensajes_error", e.message, '0');
    }

}

function ArregloListadoCaptura() {
    CondicionClimatologica = [];
    
    CondicionClimatologica[0] = {
        CondicionClimatologicaID : "",
        Accion: "",
        PatioID : "",
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
    CondicionClimatologica[0].ZonaID = $("#Area").data("kendoComboBox").dataItem($("#Area").data("kendoComboBox").select()).AreaID;
    CondicionClimatologica[0].PatioID = $("#inputPatio").data("kendoComboBox").dataItem($("#inputPatio").data("kendoComboBox").select()).PatioID;
    CondicionClimatologica[0].TemperaturaAmbiente = $("#inputMedicionesTempAmbiente").val();
    CondicionClimatologica[0].HerramientaTempAmbienteID = $("#inputEquipoTomaTempAmbID").data("kendoComboBox").dataItem($("#inputEquipoTomaTempAmbID").data("kendoComboBox").select()).HerramientaDePruebaID;
    CondicionClimatologica[0].PorcentajeHumedad = $("#inputMedicionesHumedad").val();
    CondicionClimatologica[0].HerramientaHumedadID = $("#inputEquipoTomaHumedadID").data("kendoComboBox").dataItem($("#inputEquipoTomaHumedadID").data("kendoComboBox").select()).HerramientaDePruebaID;
    CondicionClimatologica[0].PuntoRocio = $("#inputMedicionesPuntoRocio").val();
    CondicionClimatologica[0].HerramientaPuntoRocioID = $("#inputEquipoTomaPtoRocioID").data("kendoComboBox").dataItem($("#inputEquipoTomaPtoRocioID").data("kendoComboBox").select()).HerramientaDePruebaID;
    CondicionClimatologica[0].CampoX = $("#inputMedicionesCampoX").val();
    CondicionClimatologica[0].HerramientaCampoXID = $("#inputEquipoTomaCampoXID").data("kendoComboBox").dataItem($("#inputEquipoTomaCampoXID").data("kendoComboBox").select()).HerramientaDePruebaID;
    CondicionClimatologica[0].FechaToma = $("#inputMedicionesfechaToma").val();
    CondicionClimatologica[0].HoraToma = $("#inputMedicionesHoraToma").val();
    CondicionClimatologica[0].CondicionClimatologicaID = $("#hddCambioClimaticoID").val();
    
    $MedicionesClimatologicas.MedicionesClimatologicas.create(CondicionClimatologica[0], {
        token: Cookies.get("token"), lenguaje: $("#language").val()
    }).done(function (data) {
        
        if (data != null) {

            if (data.CondicionClimatologicaID == 0)
            {
                displayMessage("ErrorExisteCapturaMediciones", "", '0');
            }
            if (data.CondicionClimatologicaID == -1)
            {
                displayMessage("ErrorExisteCapturaMediciones", "", '0');
            }

            if (data.CondicionClimatologicaID > 0)
            {
                $("#hddCambioClimaticoID").val(data.CondicionClimatologicaID);
                opcionHabilitarView(true, "FieldSetView");
                DeshablilitarInputs();
            }
        }
        else if (data == null) {
            opcionHabilitarView(false, "FieldSetView");
            mensaje = "No se guardo la informacion el error es: " + data.ReturnMessage[0] + "-2"
            displayMessage("CapturaMensajeGuardadoErroneo", "", '1');
        }

    });
    loadingStop();
}

function validaciones()
{
    var controles = $("#FieldSetView").kendoValidator({
        errorTemplate: ""
    }).data("kendoValidator");
    if (controles.validate()) {
        ArregloListadoCaptura();
    }
    else {
        //$('#FieldSetView').find(':input').css("box-shadow", "0px 0px 0px 1px red");
        //$('.k-widget k-datepicker k-header').css("border-color", "red");
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





