function SuscribirEventos() {
    
    SuscribirEventoSpoolID();
    SuscribirEventoInspector();
    SuscribirEventoDefecto();
    SuscribirEventoResultadoDimensional();
    suscribirEventoAgregar();
    suscribirEventoGuardar();
    suscribirEventoCancelar();
    SuscribirEventoResultadoVisual();
    SuscribirEventoDefectoVisual();
    SuscribirEventoInspectorVisual();
    SuscribirEventoTaller();
    SuscribirEventoAgregarCapturaRapida();
   
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
                AjaxObtenerListaTaller();
            }
        }
        ,
        change: function (e) {
            dataItem = this.dataItem(e.sender.selectedIndex);
            if ($("#InputID").val().length == 1) {
                $("#InputID").data("kendoComboBox").value(("00" + $("#InputID").val()).slice(-3));
            }
            if ($("#InputID").val() != '' && $("#InputOrdenTrabajo").val() != '') {
                Cookies.set("Proyecto", dataItem.ProyectoID + '°' + dataItem.Proyecto);
            }
            AjaxObtenerListaTaller();

        }
    });

    $("#InputOrdenTrabajo").blur(function (e) {

        if ($("#InputOrdenTrabajo").val().match("^[a-zA-Z][0-9]*$")) {
            try {
                AjaxObtenerSpoolID();
                
            } catch (e) {
                displayMessage("Mensajes_error", e.message, '0');
            }
        } else {
            displayMessage("DimensionalVisualMensajeOrdenTrabajo", "", '1');
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
            deshabilitaSpool();
        }
    });
};
function SuscribirEventosJunta() {
    $('#Junta').kendoComboBox({
        dataTextField: "Etiqueta",
        dataValueField: "JuntaSpoolID",
        suggest: true,
        filter: "contains",
        index: 3
    });

    $('#Junta').closest('.k-widget').keydown(function (e) {

        if (e.keyCode == 37) {
            $("#InputID").data("kendoComboBox").input.focus();
            $("#Junta").val("");
        }
        else if (e.keyCode == 39) {
            $("#ButtonAgregar").focus();
        }
        else if (e.keyCode == 13) {

            AjaxobtenerDetalleDimensional($("#InputID").val());
            AjaxObtenerJSonGrid();
            deshabilitaSpool();
        }

        
    });

   
}
function SuscribirEventoTaller() {
    $('#inputTaller').kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "TallerID",
        suggest: true,
        filter: "contains",
        index: 3
    });
    $('#inputTaller').closest('.k-widget').keydown(function (e) {
        if (e.keyCode == 13) {
            PlanchaTaller();
        }
    });
   // AjaxObtenerListaTaller();
}
function SuscribirEventoInspector() {
    $('#inputInspector').kendoComboBox({
        dataTextField: "Codigo",
        dataValueField: "ObreroID",
        suggest: true,
        filter: "contains",
        index: 3
    });
    AjaxObtenerListaInspector();
}
function SuscribirEventoInspectorVisual() {
    $('#inputInspectorVisual').kendoComboBox({
        dataTextField: "Codigo",
        dataValueField: "ObreroID",
        suggest: true,
        filter: "contains",
        index: 3
    });
    AjaxObtenerListaInspectorVisual();

    $('#inputInspectorVisual').closest('.k-widget').keydown(function (e) {
        if (e.keyCode == 13) {
            PlanchaInspector();
        }
    });
}
function SuscribirEventoDefecto() {
    $('#inputDefecto').kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "DefectoID",
        suggest: true,
        filter: "contains",
        index: 3
    });
    AjaxObtenerListaDefectosDimensionales();
}
function SuscribirEventoDefectoVisual() {
    $('#inputDefectosVisual').kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "DefectoID",
        suggest: true,
        filter: "contains",
        index: 3
    });
    $('#inputDefectosVisual').closest('.k-widget').keydown(function (e) {
        if (e.keyCode == 13) {
            PlanchaDefecto();
        }
    });
    AjaxObtenerListaDefectosVisuales();
}
function SuscribirEventoResultadoDimensional() {

    $('input:radio[name=ResultadoDimensional]:nth(0)').change(function () {
        $("#inputDefecto").data("kendoComboBox").enable(false);
        $("#inputDefecto").data("kendoComboBox").value("");
        // 
      
    });
    $('input:radio[name=ResultadoDimensional]:nth(1)').change(function () {
        $("#inputDefecto").data("kendoComboBox").enable(true);
        $("#inputDefecto").data("kendoComboBox").value("");
       // 
    });

   
};
function SuscribirEventoResultadoVisual() {

    $('input:radio[name=ResultadoVisual]:nth(0)').change(function () {
        $("#inputDefectosVisual").data("kendoComboBox").enable(false);
        $("#inputDefectosVisual").data("kendoComboBox").value("");
        PlanchadoResultadoVisual();
    });
    $('input:radio[name=ResultadoVisual]:nth(1)').change(function () {
        $("#inputDefectosVisual").data("kendoComboBox").enable(true);
        $("#inputDefectosVisual").data("kendoComboBox").value("");
        PlanchadoResultadoVisual();
    });


};
function suscribirEventoAgregar() {
    $('#btnAgregar').click(function (e) {
        AjaxobtenerDetalleDimensional($("#InputID").val());
        AjaxObtenerJSonGrid();
        deshabilitaSpool();

    
    });
}
function SuscribirEventoEliminar(idtable) {
    $("#" + idtable + " .deleteRow").on("click", function () {
        var td = $(this).parent();
        var tr = td.parent();
        tr.css("background-color", "#FF3700");

        tr.fadeOut(400, function () {
            tr.remove();
        });
    });
};
function suscribirEventoGuardar() {

    $('#Guardar').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        AjaxGuardar(ds._data);
    });


    $('#btnGuardar').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        
        if ($('#botonGuardar2').text() == "Guardar") {
            AjaxGuardar(ds._data);
            opcionHabilitarView(true, "FieldSetView");
        }
        else if ($('#botonGuardar2').text() == "Editar")
            opcionHabilitarView(false, "FieldSetView")


    });


    $('#btnGuardarYNuevo').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        AjaxGuardar(ds._data);
        limpiar();
    });

    $('#btnGuardar1').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        AjaxGuardar(ds._data);
    });

    $('#btnGuardarYNuevo1').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        AjaxGuardar(ds._data);
        limpiar();
    });
}
function SuscribirEventoAgregarCapturaRapida()
{
    $('#btnAplicarCapturaRapida').click(function (e) {
        if ($("#inputTaller").val() !="")  PlanchaTaller();
        if ($("#inputInspectorVisual").val() != "") PlanchaInspector();
        if ($("#inputDefectosVisual").val() != "") PlanchaDefecto();
        if (String(endRangeDateV.val()).trim() != "") PlanchaFecha();

        PlanchadoResultadoVisual();
    });
}
function suscribirEventoCancelar() {
    $('#btnCancelar').click(function (e) {
        limpiar();
    });
}
function limpiar()
{
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
function deshabilitaSpool()
{
    $("#InputOrdenTrabajo").prop("disabled", true);
    $("#InputID").data("kendoComboBox").enable(false);

}
function opcionHabilitarView(valor, name) {
    
    if (valor) {
         $('#FieldSetView').find('*').attr('disabled', true);
        $("#InputID").data("kendoComboBox").enable(false);
        $("#inputInspectorVisual").data("kendoComboBox").enable(false);
        $("#inputFechaVisual").data("kendoDatePicker").enable(false);
        $("#FechaInspeccion").data("kendoDatePicker").enable(false);
        $("#inputInspector").data("kendoComboBox").enable(false);
        $("#inputTaller").data("kendoComboBox").enable(false);
        

       $('#botonGuardar2').text("Editar");
        $("#botonGuardar").text("Editar");
    }
    else {
        $('#FieldSetView').find('*').attr('disabled', false);
        $("#InputID").data("kendoComboBox").enable(true);
        $("#inputInspectorVisual").data("kendoComboBox").enable(true);
        $("#inputFechaVisual").data("kendoDatePicker").enable(true);
        $("#inputTaller").data("kendoComboBox").enable(true);
        

        $("#FechaInspeccion").data("kendoDatePicker").enable(true);
        $("#inputInspector").data("kendoComboBox").enable(true);
        
        $('#botonGuardar2').text("Guardar");
        $("#botonGuardar").text("Guardar");
    }
}
