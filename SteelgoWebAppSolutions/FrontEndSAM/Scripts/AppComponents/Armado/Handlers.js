function SuscribirEventos() {
    SuscribirEventoSpoolID();
    SuscribirEventosJunta();
    suscribirEventoAgregar();
    suscribirEventoGuardar();
    suscribirEventoCancelar();
    SuscribirEventoTubero();
    SuscribirEventoTaller();
    SuscribeEventosTipoCaptura();
    suscribirEventoChangeRadio();
    suscribirEventoChangeRadioTipoListado();
    SuscribirEventoMuestraJunta();
};




function SuscribeEventosTipoCaptura() {
    $("#presentationReporte").addClass("active");

    $('#aReporte').click(function () {
        $("#presentationReporte").addClass("active");
        $("#presentationReporteListado").removeClass("active");

    });
    $('#aListado').click(function () {
        $("#presentationReporteListado").addClass("active");
        $("#presentationReporte").removeClass("active");

    });
}
function suscribirEventoChangeRadio() {
    $('input:radio[name=Muestra]:nth(0)').change(function () {
        if ($("#InputID").val() != "" && $("#InputOrdenTrabajo").val()) {
            AjaxJunta($("#InputID").val());
            FiltroMostrar(0);
        }
    });
    $('input:radio[name=Muestra]:nth(1)').change(function () {
        if ($("#InputID").val() != "" && $("#InputOrdenTrabajo").val()) {
            AjaxJunta($("#InputID").val());
            FiltroMostrar(1);
        }
    });

}



function EventoGuardar() {
    var ds = $("#grid").data("kendoGrid").dataSource;
    if ($('#botonGuardar').text() == "Guardar") {
        opcionHabilitarView(true, "FieldSetView");
        AjaxGuardarCaptura(ds._data);
    }
    else if ($('#botonGuardar').text() == "Editar")
            opcionHabilitarView(false, "FieldSetView")
}

function suscribirEventoGuardar() {
    $('#btnGuardar').click(function (e) {
        EventoGuardar();
    });

    $("#Guardar").click(function () {
        EventoGuardar();
    });

    $('#btnGuardarYNuevo').click(function (e) {



        var ds = $("#grid").data("kendoGrid").dataSource;
        AjaxGuardarCaptura(ds._data);
        Limpiar();
    });

    
    $('#GuardarPie').click(function (e) {
        
        EventoGuardar();
    });
    $('#btnGuardar').click(function (e) {
        
        EventoGuardar();
    });
    $('#DetalleAvisoLlegada0062').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        AjaxGuardarCaptura(ds._data);
        Limpiar();
    });
    
    
}

function opcionHabilitarRadioTipoCaptura(valor) {
    var combobox = $("#InputID").data("kendoDropDownList");
    if (valor) {
    }
    else {
    }
}


function Limpiar() {

    $("#InputOrdenTrabajo").val("");

    
    $("#InputID").data("kendoDropDownList").dataSource.data([]);

    $("#Junta").data("kendoDropDownList").dataSource.data([]);

    //var radioButtons = document.getElementsByName('Muestra');

    //for (var x = 0; x < radioButtons.length; x++) {
    //    if (radioButtons[x].checked) {
    //        radioButtons[x].checked = false;

    //    }
    //}

    $("#FechaArmado").data("kendoDatePicker").value("");

    $("#inputTubero").data("kendoComboBox").value("");

    $("#inputTaller").data("kendoComboBox").value("");


    //var radioButtonsLLena = document.getElementsByName('LLena');

    //for (var x = 0; x < radioButtonsLLena.length; x++) {
    //    if (radioButtonsLLena[x].checked) {
    //        radioButtonsLLena[x].checked = false;

    //    }
    //}



    $("#grid").data('kendoGrid').dataSource.data([]);
}

function suscribirEventoCancelar() {
    $('#btnCancelar').click(function (e) {
    });
}

function suscribirEventoAgregar() {
    $('#ButtonAgregar').click(function (e) {

        if ($('input:radio[name=TipoAgregado]:checked').val() == "Reporte") {
            AjaxCargarReporteJuntas();
        }
        else {
            if ($('input:radio[name=TipoAgregado]:checked').val() == "Listado" && $("#Junta").val() != "") {
                ObtenerJSonGridArmado();
            }
            else
                displayMessage("JuntaSinSeleccionar", "", '2');
        }
    });
}

function SuscribirEventoTubero() {
    $('#inputTubero').kendoComboBox({
        dataTextField: "Codigo",
        dataValueField: "ObreroID",
        suggest: true,
        filter: "contains",
        index: 3
    });
    $('#inputTubero').closest('.k-widget').keydown(function (e) {
        if (e.keyCode == 13) {
            PlanchaTubero();
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
}

function SuscribirEventosJunta() {
    $('#Junta').kendoDropDownList({
        dataTextField: "Etiqueta",
        dataValueField: "JuntaSpoolID",
        suggest: true,
        filter: "contains",
        index: 3
    });

    $('#Junta').closest('.k-widget').keydown(function (e) {

        if (e.keyCode == 37) {
            $("#InputID").data("kendoDropDownList").input.focus();
            $("#Junta").val("");
        }
        else if (e.keyCode == 39) {
            $("#ButtonAgregar").focus();
        }
        else if (e.keyCode == 13) {


            if ($('input:radio[name=TipoAgregado]:checked').val() == "Reporte") {
                deshabilitaSpool();
                ObtenerJSonGridArmado();
                opcionHabilitarRadioTipoCaptura(false);
            }
            else if ($('input:radio[name=TipoAgregado]:checked').val() == "Listado") {


                if ($("#Junta").val() != "") {
                    habilitaSpool();
                    opcionHabilitarRadioTipoCaptura(false);
                    ObtenerJSonGridArmado();
                }
                else
                    displayMessage("JuntaSinSeleccionar", "", '2');
            }
            else {
                displayMessage("Mensajes_error", "Favor de seleccionar un Tipo de Captura", '2');
            }

        }
    });
}

function deshabilitaSpool() {
    $("#InputOrdenTrabajo").prop("disabled", true);
    $("#InputID").data("kendoDropDownList").enable(false);

}

function habilitaSpool() {
    $("#InputOrdenTrabajo").prop("disabled", false);
    $("#InputID").data("kendoDropDownList").enable(true);

}


function SuscribirEventoSpoolID() {
    var dataItem;
    $("#InputID").kendoDropDownList({
        dataTextField: "IDValido",
        dataValueField: "Valor",
        suggest: true,
        filter: "contains",
        index: 3,
        select: function (e) {
            dataItem = this.dataItem(e.item.index());
            if (dataItem != undefined) {
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
                    AjaxObtenerListaTubero();
                    AjaxObtenerListaTaller();
                }
            }
        }
        ,
        change: function (e) {
            dataItem = this.dataItem(e.sender.selectedIndex);
            if ($("#InputID").val().length == 1) {
                $("#InputID").data("kendoDropDownList").value(("00" + $("#InputID").val()).slice(-3));
            }
            if ($("#InputID").val() != '' && $("#InputOrdenTrabajo").val() != '') {
                Cookies.set("Proyecto", dataItem.ProyectoID + '°' + dataItem.Proyecto);
                $("#LabelProyecto").text(dataItem.Proyecto);
                AjaxJunta($("#InputID").data("kendoDropDownList").dataItem($("#InputID").data("kendoDropDownList").select()).Valor);
            }

            AjaxObtenerListaTubero();
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
            displayMessage("CapturaArmadoMensajeOrdenTrabajo", "", '1');
            $("#InputOrdenTrabajo").focus();
        }
    });

    $("#InputOrdenTrabajo").focus(function (e) {
        $("#InputOrdenTrabajo").val("");
        $("#InputID").data("kendoDropDownList").value("");
        $("#InputID").data("kendoDropDownList").setDataSource();
    });

    $('#InputID').closest('.k-widget').keydown(function (e) {

        if (e.keyCode == 37) {
            $("#InputOrdenTrabajo").focus();
        }
        else if (e.keyCode == 39) {
            $("#Junta").data("kendoDropDownList").input.focus();
        }
        else if (e.keyCode == 40) {
            $("#InputID").data("kendoDropDownList").select();
            AjaxJunta($("#InputID").data("kendoDropDownList").dataItem($("#InputID").data("kendoDropDownList").select()).Valor);
        }
        else if (e.keyCode == 13) {
            if ($('input:radio[name=TipoAgregado]:checked').val() == "Reporte") {
                AjaxCargarReporteJuntas();
            }
        }
    });

};

function SuscribirEventoEliminar(idtable) {
    $("#" + idtable + " .deleteRow").on("click", function () {
        var td = $(this).parent();
        var tr = td.parent();
        //change the background color to red before removing
        tr.css("background-color", "#FF3700");

        tr.fadeOut(400, function () {
            tr.remove();
        });
    });
};


function eventoCambioTipoListado() {

    if ($('input:radio[name=TipoAgregado]:checked').val() == "Reporte") {
        $("#JuntaDiv").css('display', 'none');
        $("#MuestraDiv").css('display', 'none');
        Limpiar();
        AjaxCargarCamposPredeterminadosOcultaJunta();
        
    }
    else if ($('input:radio[name=TipoAgregado]:checked').val() == "Listado") {
        $("#JuntaDiv").css('display', 'block');
        $("#MuestraDiv").css('display', 'block');
        
        Limpiar();
        AjaxCargarCamposPredeterminadosOcultaJunta();
    }
}

function suscribirEventoChangeRadioTipoListado() {

    $('input:radio[name=TipoAgregado]:nth(0)').change(function () {
        $("#grid").data("kendoGrid").dataSource.data([]);
        eventoCambioTipoListado();
    });
    $('input:radio[name=TipoAgregado]:nth(1)').change(function () {
        $("#grid").data("kendoGrid").dataSource.data([]);
        eventoCambioTipoListado();
    });
}


function SuscribirEventoMuestraJunta() {

    if ($('input:radio[name=TipoAgregado]').val() == "Reporte") {
        $("#JuntaDiv").hide();
        $("#MuestraDiv").hide();
    }
    else if ($('input:radio[name=TipoAgregado]').val() == "Listado") {
        $("#JuntaDiv").show();
        $("#MuestraDiv").show();
    }
}

function opcionHabilitarView(valor, name) {

    if (valor) {
        $('#FieldSetView').find('*').attr('disabled', true);
        $("#InputID").data("kendoDropDownList").enable(false);
        $("#inputTubero").data("kendoComboBox").enable(false);
        $("#inputTaller").data("kendoComboBox").enable(false);
        $("#FechaArmado").data("kendoDatePicker").enable(false);
        $('#botonGuardar').text("Editar");
        $("#DetalleAvisoLlegada0017").text("Editar");

        $("#GuardarPie").text("Editar");
        $('#btnGuardarPiePagina').text("Editar");
       

    }
    else {
        $('#FieldSetView').find('*').attr('disabled', false);
        $("#InputID").data("kendoDropDownList").enable(true);
        $("#inputTubero").data("kendoComboBox").enable(true);
        $("#inputTaller").data("kendoComboBox").enable(true);
        $("#FechaArmado").data("kendoDatePicker").enable(true);
        $('#botonGuardar').text("Guardar");
        $("#DetalleAvisoLlegada0017").text("Guardar");

        $("#GuardarPie").text("Guardar");
        $('#btnGuardarPiePagina').text("Guardar");
       
    }
}