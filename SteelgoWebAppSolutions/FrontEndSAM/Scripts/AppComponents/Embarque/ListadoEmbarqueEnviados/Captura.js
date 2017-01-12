IniciarListadoEmbarqueEnviados();
var FechaInicio;
var FechaFin;

function IniciarListadoEmbarqueEnviados() {
    SuscribirEventos();
}

function changeLanguageCall() {
    //CargarGrid();
    //AjaxCargarCamposPredeterminados();
    //AjaxCargarProyectos();
    document.title = _dictionary.EmbarqueListadoEnviadosTituloPagina[$("#language").data("kendoDropDownList").value()];

    FechaInicio.data("kendoDatePicker").setOptions({
        format: _dictionary.FormatoFecha2[$("#language").data("kendoDropDownList").value()]
    });

    FechaFin.data("kendoDatePicker").setOptions({
        format: _dictionary.FormatoFecha2[$("#language").data("kendoDropDownList").value()]
    });

    //opcionHabilitarView(false, "FieldSetView");
};

function ValidarFecha(valor) {
    var fecha = kendo.toString(valor, String(_dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()].replace('{', '').replace('}', '').replace("0:", "")));
    if (fecha == null) {
        $("#InputFechaInicio").data("kendoDatePicker").value('');
    }
}