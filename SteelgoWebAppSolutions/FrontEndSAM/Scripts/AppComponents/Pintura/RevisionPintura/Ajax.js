function AjaxCargarCamposPredeterminados() {
    var TipoMuestraPredeterminadoID = 3071;
    $CamposPredeterminados.CamposPredeterminados.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), id: TipoMuestraPredeterminadoID }).done(function (data) {
        if (data == "Spool") {
            $('input:radio[name=TipoBusqueda]:nth(0)').trigger("click");
            
        }
        else if (data == "nc") {
            $('input:radio[name=TipoBusqueda]:nth(1)').trigger("click");
        }
    });
   // AjaxCargarTipoLlenado();
}


function AjaxCargaProyecto() {

    $Proyectos.Proyectos.read({ token: Cookies.get("token") }).done(function (data) {
        $("#inputProyecto").data("kendoComboBox").dataSource.data([]);
        $("#inputProyecto").data("kendoComboBox").dataSource.data(data);

        var proyectoId = 0;

        if (data.length < 3) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].ProyectoID != 0) {
                    proyectoId = data[i].ProyectoID;
                }
            }
        }

        $("#inputProyecto").data("kendoComboBox").value(proyectoId);
        $("#inputProyecto").data("kendoComboBox").trigger("change");
    });
}

function AjaxConsultarSpoolsConSP() {
    var tipoBusquedaSeleccionada= $('input:radio[name=TipoBusqueda]:checked').val() == "spool"?1:2;
    var datoSeleccionado = tipoBusquedaSeleccionada == 1 ? $("#inputSpool").val() : $("#inputNc").val();

    $RevisionPintura.RevisionPintura.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), proyectoid: $("#inputProyecto").data("kendoComboBox").value(), dato: datoSeleccionado, tipoBusqueda: tipoBusquedaSeleccionada }).done(function (data) {
        var array = data;

        var ds = $("#grid").data("kendoGrid").dataSource;
        for (var i = 0; i < array.length; i++) {
            ds.insert(0, array[i]);
        }
    });
};