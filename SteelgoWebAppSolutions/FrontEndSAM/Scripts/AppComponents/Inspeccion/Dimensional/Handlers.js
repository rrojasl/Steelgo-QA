function SuscribirEventos() {
    SuscribirEventoSpoolID();
    SuscribirEventoInspector();
    SuscribirEventoDefecto();
    SuscribirEventoResultadoDimensional();
    suscribirEventoAgregar();
    suscribirEventoGuardar();
    suscribirEventoCancelar();
};
function SuscribirEventoSpoolID() {

    $("#InputID").kendoComboBox({
        dataTextField: "IDValido",
        dataValueField: "Valor",
        suggest: true,
        filter: "contains",
        index: 3,
        select: function (e) {
            var dataItem = this.dataItem(e.item.index());

            if (dataItem.Status != "1") {
                e.preventDefault();
                $("#InputID").val("");
                console.log("borrar datos");
                displayMessage("Mensajes_error", dataItem.Status, '1');
            }
            else {
                $("#InputID").val(dataItem.IDValido);
                Cookies.set("Proyecto", dataItem.ProyectoID + '°' + dataItem.Proyecto);
                $("#LabelProyecto").text(dataItem.Proyecto);
            }
        }
        ,
        change: function (e) {
            if ($("#InputID").val().length == 1) {
                $("#InputID").data("kendoComboBox").value(("00" + $("#InputID").val()).slice(-3));
            }
        }
    });

    $("#InputOrdenTrabajo").blur(function (e) {

        if ($("#InputOrdenTrabajo").val().match("^[a-zA-Z][0-9]*$")) {
            try {
                AjaxObtenerSpoolID();
            } catch (e) {
                displayMessage("Mensajes_error", e.message, '2');
            }
        } else {
            displayMessage("OrdenTrabajoNoValida", "", '1');
            $("#InputOrdenTrabajo").focus();
        }
    });


    $("#InputOrdenTrabajo").focus(function (e) {
        $("#InputOrdenTrabajo").val("");
        $("#InputID").data("kendoComboBox").value("");
        $("#InputID").data("kendoComboBox").setDataSource();
    });

    $('#InputID').closest('.k-widget').keydown(function (e) {

        if (e.keyCode == 37) {
            $("#InputOrdenTrabajo").focus();

        }
        else if (e.keyCode == 39) {
            $("#Junta").data("kendoComboBox").input.focus();
        }
        else if (e.keyCode == 40)
            $("#InputID").data("kendoComboBox").select();
        else if (e.keyCode == 13) {

            AjaxobtenerDetalleDimensional($("#InputID").val());
            
            AjaxObtenerJSonGrid();
          
        }
    });
};
function SuscribirEventoInspector() {
    $('#inputInspector').kendoComboBox({
        dataTextField: "Codigo",
        dataValueField: "ObreroID",
        suggest: true,
        filter: "contains",
        index: 3
    });
    $('#inputInspector').closest('.k-widget').keydown(function (e) {
        if (e.keyCode == 13) {
            PlanchaInspector();
        }
    });

    AjaxObtenerListaInspector();
}
function SuscribirEventoDefecto() {
    $('#inputDefecto').kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "DefectoID",
        suggest: true,
        filter: "contains",
        index: 3
    });
    $('#inputDefecto').closest('.k-widget').keydown(function (e) {
        if (e.keyCode == 13) {
            PlanchaDefecto();
        }
    });
    AjaxObtenerListaDefectos();
}
function SuscribirEventoResultadoDimensional() {

    $('input:radio[name=ResultadoDimensional]:nth(0)').change(function () {
        $("#inputDefecto").data("kendoComboBox").enable(false);
        $("#inputDefecto").data("kendoComboBox").value("");
        PlanchadoResultadoDimensional();
    });
    $('input:radio[name=ResultadoDimensional]:nth(1)').change(function () {
        $("#inputDefecto").data("kendoComboBox").enable(true);
        $("#inputDefecto").data("kendoComboBox").value("");
        PlanchadoResultadoDimensional();
    });

    //$('#inputDefecto').closest('.k-widget').keydown(function (e) {
    //    if (e.keyCode == 13) {
    //        PlanchaDefecto();
    //    }
    //});

};
function suscribirEventoAgregar() {
    $('#btnAgregar').click(function (e) {
        AjaxobtenerDetalleDimensional($("#InputID").val());
        AjaxObtenerJSonGrid();
    });
}
function suscribirEventoGuardar() {
    $('#btnGuardar').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        AjaxGuardar(ds._data);
    });

    $('#btnGuardarYNuevo').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        AjaxGuardar(ds._data);
        limpiar();
    });
}
function suscribirEventoCancelar() {
    $('#btnCancelar').click(function (e) {
        limpiar();
    });
}
function limpiar() {
    $("#InputOrdenTrabajo").prop("disabled", false);
    $("#InputOrdenTrabajo").val("");
    // $("#InputOrdenTrabajo").focus();

    $("#InputID").data("kendoComboBox").value("");
    $("#InputID").data("kendoComboBox").enable(true);

    $("#inputDefecto").data("kendoComboBox").enable(true);
    $("#inputDefecto").data("kendoComboBox").value("");

    // $("#Junta").data("kendoComboBox").value("");

    $("#inputInspector").data("kendoComboBox").value("");

    var radioButtons = document.getElementsByName('ResultadoDimensional');
    for (var x = 0; x < radioButtons.length; x++) {
        if (radioButtons[x].checked) {
            radioButtons[x].checked = false;

        }
    }
    $("#grid").data('kendoGrid').dataSource.data([]);

}
function deshabilitaSpool() {
    $("#InputOrdenTrabajo").prop("disabled", true);
    $("#InputID").data("kendoComboBox").enable(false);
}
