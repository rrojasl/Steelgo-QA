function ajaxObtenerTipoPruebas() {
    loadingStart();
    var proyecto = parseInt($("#Proyecto").val());
    $Pruebas.Pruebas.read({ token: Cookies.get("token"), proyectoID: proyecto, lenguaje: $("#language").val() }).done(function (data) {
            $("#tipoPrueba").data("kendoComboBox").value("");
            $("#tipoPrueba").data("kendoComboBox").dataSource.data(data);
            loadingStop();
    });
}

function ajaxObtenerProyectos() {
    $GenerarRequisicion.GenerarRequisicion.read({ token: Cookies.get("token") }).done(function (data) {
        $("#Proyecto").data("kendoComboBox").value("");
        $("#Proyecto").data("kendoComboBox").dataSource.data(data);
    });
}


function ajaxObtenerJuntasSoldadas() {
    $GenerarRequisicion.GenerarRequisicion.read({ token: Cookies.get("token"), pruebaID: $("#tipoPrueba").data("kendoComboBox").value(), todos: 1 }).done(function (data) {
        $("#grid").data('kendoGrid').dataSource.data([]);
        var ds = $("#grid").data("kendoGrid").dataSource;
        var array = data;
        for (var i = 0; i < array.length; i++) {
            ds.add(array[i]);
        }
    });
}


function AjaxCargarCamposPredeterminados() {

    loadingStart();
    $CapturaSoldadura.Soldadura.read({ token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {

        var NewDate = kendo.toString(data.FechaSoldadura, _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()]);

        endRangeDate.val(NewDate);

        if (data.Muestra == "Sincaptura") {
            $('input:radio[name=Muestra]:nth(0)').attr('checked');
            $('input:radio[name=Muestra]:nth(1)').removeAttr('checked');

        }
        else if (data.Muestra == "Todos") {
            $('input:radio[name=Muestra]:nth(0)').removeAttr('checked');
            $('input:radio[name=Muestra]:nth(1)').attr('checked', true);

        }
        //eventoCambioTipoListado();
        loadingStop();
    });

};


function AjaxJunta(spoolID) {
    loadingStart();
    $CapturasRapidas.CapturasRapidas.read({ id: spoolID, sinCaptura: "todos", token: Cookies.get("token"), proceso: 3 }).done(function (data) {
        $("#Junta").data("kendoComboBox").value("");
        $("#Junta").data("kendoComboBox").dataSource.data(data)
        loadingStop();
    });
}