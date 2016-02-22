function AjaxGuardarCaptura(tipoGuardar) {
    try {
        var seGuardoCorrectamente = false;
        loadingStart();
        Captura = [];
        Captura[0] = { Detalles: "" };
        ListaDetalles = [];
        var estaIncompleto = false;
        ArregloListadoCaptura();

    } catch (e) {
        loadingStop();
        displayMessage("ErrorCapturaMediciones", "", '2');
    }

}

function ArregloListadoCaptura() {
    CondicionClimatologica = [];
    JsonCaptura = [];

    JsonCaptura[0] = {
        ZonaID: "",
        PatioID: "",
        ProyectoID: "",
        TemperaturaAmbiente: "",
        PorcentajeHumedad: "",
        PuntoRocio: "",
        CampoX: "",
        FechaToma: "",
        HoraToma: "",
        EquipoTomaID: "",
    };

    if (ValidacionControles())
    {
        displayMessage("ErrorCapturaMediciones", "", '2');
        loadingStop();
    }
    else
    {
        CondicionClimatologica[0] = { Detalle: "" };
        JsonCaptura[0].ZonaID = $("#Area").data("kendoComboBox").dataItem($("#Area").data("kendoComboBox").select()).AreaID;
        JsonCaptura[0].PatioID = $("#inputPatio").data("kendoComboBox").dataItem($("#inputPatio").data("kendoComboBox").select()).PatioID;
        JsonCaptura[0].ProyectoID = "1"; //$("#inputProyecto").data("kendoComboBox").dataItem($("#inputProyecto").data("kendoComboBox").select()).ProyectoID;
        JsonCaptura[0].TemperaturaAmbiente = $("#inputMedicionesTempAmbiente").val();
        JsonCaptura[0].PorcentajeHumedad = $("#inputMedicionesHumedad").val();
        JsonCaptura[0].PuntoRocio = $("#inputMedicionesPuntoRocio").val();
        JsonCaptura[0].CampoX = $("#inputMedicionesCampoX").val();
        JsonCaptura[0].FechaToma = $("#inputMedicionesfechaToma").val();
        JsonCaptura[0].HoraToma = $("#inputMedicionesHoraToma").val();
        JsonCaptura[0].EquipoTomaID = "0"; // $("#inputEquipoTomaID").val();
        //alert(JSON.stringify(JsonCaptura));
        CondicionClimatologica[0].Detalle = JsonCaptura[0];
        $MedicionesClimatologicas.MedicionesClimatologicas.create({ token: Cookies.get("token"), lenguaje: $("#language").val() }, CondicionClimatologica[0]);
        loadingStop();
    }
    //return JsonCaptura[0];
}

function ValidacionControles() {
    //if ($("#inputProyecto").data("kendoComboBox").dataItem($("#inputProyecto").data("kendoComboBox").select()).ProyectoID === 'undefined'
    //    || $("#inputProyecto").data("kendoComboBox").dataItem($("#inputProyecto").data("kendoComboBox").select()).ProyectoID === ''
    //    || $("#inputProyecto").data("kendoComboBox").dataItem($("#inputProyecto").data("kendoComboBox").select()).ProyectoID == null)
    //{ return true  };

    if ($("#inputPatio").data("kendoComboBox").dataItem($("#inputPatio").data("kendoComboBox").select()).PatioID === 'undefined'
        || $("#inputPatio").data("kendoComboBox").dataItem($("#inputPatio").data("kendoComboBox").select()).PatioID === ''
        || $("#inputPatio").data("kendoComboBox").dataItem($("#inputPatio").data("kendoComboBox").select()).PatioID == null)
    { return true };

    if ($("#Area").data("kendoComboBox").dataItem($("#Area").data("kendoComboBox").select()).AreaID === 'undefined' ||
       $("#Area").data("kendoComboBox").dataItem($("#Area").data("kendoComboBox").select()).AreaID === '' ||
        $("#Area").data("kendoComboBox").dataItem($("#Area").data("kendoComboBox").select()).AreaID == null)
    { return true };

    if ($("#inputMedicionesTempAmbiente").val() === 'undefined'
        || $.trim($("#inputMedicionesTempAmbiente").val()) === ''
        || $("#inputMedicionesTempAmbiente").val() == null)
    { return true };

    if ($("#inputMedicionesHumedad").val() === 'undefined'
        || $.trim($("#inputMedicionesHumedad").val()) === ''
        || $("#inputMedicionesHumedad").text() == null)
    { return true };

    if ($("#inputMedicionesPuntoRocio").val() === 'undefined'
        || $.trim($("#inputMedicionesPuntoRocio").val()) === ''
        || $("#inputMedicionesPuntoRocio").text() == null)
    { return true };

    if ($("#inputMedicionesCampoX").val() === 'undefined'
        || $.trim($("#inputMedicionesCampoX").val()) === ''
        || $("#inputMedicionesCampoX").val() == null)
    { return true };

    if ($("#inputMedicionesfechaToma").val() === 'undefined'
        || $.trim($("#inputMedicionesfechaToma").val()) === ''
        || $("#inputMedicionesfechaToma").val() == null)
    { return true };

    if ($("#inputMedicionesHoraToma").val() === 'undefined'
        || $.trim($("#inputMedicionesHoraToma").val()) === ''
        || $("#inputMedicionesHoraToma").val() == null)
    { return true };

    //if ($("#inputEquipoTomaID").val() === 'undefined'
    //    || $.trim($("#inputEquipoTomaID").val()) === ''
    //    || $("#inputEquipoTomaID").val() == null)
    //{ return true };


    return false;
}

function validaciones()
{



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

////get Proyectos
function AjaxObtenerPatios() {
    $EmisionOT.EmisionOT.read({ token: Cookies.get("token"), idCatalogo: 1 }).done(function (data) {
        alert(JSON.stringify(data));
        $("#inputPatio").data("kendoComboBox").value("");
        if (data.length > 0) {

            $("#inputPatio").data("kendoComboBox").dataSource.data(data);
        }
      
        loadingStop();
    });
}





