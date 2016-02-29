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
    SuscribirEventoListaJuntas();
   
};

function SuscribirEventoListaJuntas()
{
    $("#ListaJuntas").kendoMultiSelect({
        dataTextField: "Junta",
        dataValueField: "JuntaID",
        suggest: true,
        filter: "contains",
        autoBind: false,
        ignoreCase: true,
        change: function (e) {
            alert();
        }
    }).data("kendoMultiSelect");

    
}
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
                AjaxObtenerListaTaller();
               // AjaxObtenerListaJuntas();
            }
            
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
            if ($("#InputID").val() != "" && $("#InputOrdenTrabajo").val()) {
                AjaxobtenerDetalleDimensional($("#InputID").val());
                AjaxObtenerJSonGrid();
                deshabilitaSpool();
            }
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
            if ($("#inputTaller").data("kendoComboBox").dataItem($("#inputTaller").data("kendoComboBox").select()) != undefined) {
                //PlanchaTaller();
            }
            else {
                $("#inputTaller").data("kendoComboBox").value("");
            }
            
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
    $('#inputInspector').closest('.k-widget').keydown(function (e) {
        if (e.keyCode == 13) {
            if ($("#inputInspector").data("kendoComboBox").dataItem($("#inputInspector").data("kendoComboBox").select()) != undefined) {

            }
            else {
                $("#inputInspector").data("kendoComboBox").value("");
            }
        }
    });
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
            if ($("#inputInspectorVisual").data("kendoComboBox").dataItem($("#inputInspectorVisual").data("kendoComboBox").select()) != undefined) {
                //PlanchaInspector();
            }
            else {
                $("#inputInspectorVisual").data("kendoComboBox").value("");
            }
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
    $('#inputDefecto').closest('.k-widget').keydown(function (e) {
        if (e.keyCode == 13) {
            if ($("#inputDefecto").data("kendoComboBox").dataItem($("#inputDefecto").data("kendoComboBox").select()) != undefined) {
                
            }
            else {
                $("#inputDefecto").data("kendoComboBox").value("");
            }
        }
    });
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
            if ($("#inputDefectosVisual").data("kendoComboBox").dataItem($("#inputDefectosVisual").data("kendoComboBox").select()) != undefined) {
                //PlanchaDefecto();
            }
            else {
                $("#inputDefectosVisual").data("kendoComboBox").value("");
            }

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
        if ($("#InputID").val() != "" && $("#InputOrdenTrabajo").val()) {
            AjaxobtenerDetalleDimensional($("#InputID").val());
            AjaxObtenerJSonGrid();
            deshabilitaSpool();
        }
    
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

    $('.accionGuardar').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        if (ds._data.length > 0) {
            if ($('#Guardar').text() == "Guardar" || $('#Guardar').text() == "Save") {
                opcionHabilitarView(true, "FieldSetView");
                AjaxGuardar(ds._data);
            }
            else if ($('#Guardar').text() == "Editar" || $('#Guardar').text() == "Edit") {
                opcionHabilitarView(false, "FieldSetView")
            }
        }
    });

    


    $('#btnGuardarYNuevo').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        AjaxGuardar(ds._data);
        limpiar();
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
        if ($('input:radio[name=LLena]:checked').val() === "Todos") {
            windowTemplate = kendo.template($("#windowTemplate").html());

            ventanaConfirm = $("#ventanaConfirm").kendoWindow({
                iframe: true,
                title: _dictionary.CapturaAvanceTitulo[$("#language").data("kendoDropDownList").value()],
                visible: false, //the window will not appear before its .open method is called
                width: "auto",
                height: "auto",
                modal: true
            }).data("kendoWindow");

            ventanaConfirm.content(_dictionary.CapturaMensajeArmadoPlancharTodos[$("#language").data("kendoDropDownList").value()] +
                         "</br><center><button class='confirm_yes btn btn-blue' id='yesButton'>Si</button><button class='confirm_yes btn btn-blue' id='noButton'> No</button></center>");

            ventanaConfirm.open().center();

            $("#yesButton").click(function (handler) {
                if ($("#inputTaller").val() != "") PlanchaTaller();
                if ($("#inputInspectorVisual").val() != "") PlanchaInspector();
                if ($("#inputDefectosVisual").val() != "") PlanchaDefecto();
                if (String(endRangeDateV.val()).trim() != "") PlanchaFecha();

                PlanchadoResultadoVisual();
                ventanaConfirm.close();
            });
            $("#noButton").click(function (handler) {
                ventanaConfirm.close();
            });
        }
        else {
            if ($("#inputTaller").val() != "") PlanchaTaller();
            if ($("#inputInspectorVisual").val() != "") PlanchaInspector();
            if ($("#inputDefectosVisual").val() != "") PlanchaDefecto();
            if (String(endRangeDateV.val()).trim() != "") PlanchaFecha();

            PlanchadoResultadoVisual();
        }

        
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
        

        $('#Guardar1').text(_dictionary.textoEditar[$("#language").data("kendoDropDownList").value()]);
        $("#Guardar").text(_dictionary.textoEditar[$("#language").data("kendoDropDownList").value()]);
        $("#grid tbody tr").attr("disabled", true);
    }
    else {
        $('#FieldSetView').find('*').attr('disabled', false);
        $("#InputID").data("kendoComboBox").enable(true);
        $("#inputInspectorVisual").data("kendoComboBox").enable(true);
        $("#inputFechaVisual").data("kendoDatePicker").enable(true);
        $("#inputTaller").data("kendoComboBox").enable(true);
        
        $("#FechaInspeccion").data("kendoDatePicker").enable(true);
        $("#inputInspector").data("kendoComboBox").enable(true);
        
        $('#Guardar1').text(_dictionary.textoGuardar[$("#language").data("kendoDropDownList").value()]);
        $("#Guardar").text(_dictionary.textoGuardar[$("#language").data("kendoDropDownList").value()]);
        $("#grid tbody tr").attr("disabled", false);
    }
}
