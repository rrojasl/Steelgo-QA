
function SuscribirEventos() {
    suscribirEventoGuardar();
    suscribirEventoAgregar();
    suscribirEventoAplicar();
    suscribirEventoCancelar();
    SuscribirEventoTaller();
    SuscribirEventosJunta();
    SuscribirEventoSpoolID();
    suscribirEventoChangeRadio();
    suscribirEventoChangeRadioTipoListado();
    SuscribirEventoMuestraJunta();

};

function EventoGuardar() {
    var ds = $("#grid").data("kendoGrid").dataSource;
    if ($('#botonGuardar').text() == "Guardar") {
        opcionHabilitarView(true, "FieldSetView");
        AjaxGuardarCaptura(ds._data);
    }
    else if ($('#botonGuardar').text() == "Editar")
        opcionHabilitarView(false, "FieldSetView")
}

SuscribirEventoProcesosRaiz();
SuscribirEventoProcesosRelleno();

function SuscribirEventoProcesosRelleno() {
    $('#inputProcesoRelleno').kendoDropDownList({
        dataTextField: "Codigo",
        dataValueField: "ProcesoSoldaduraID",
        suggest: true,
        filter: "contains",

    });
    $('#inputProcesoRelleno').closest('.k-widget').keydown(function (e) {
        if (e.keyCode == 13) {
            PlanchaRelleno();
        }
    });
}

function SuscribirEventoProcesosRaiz() {
    $('#inputProcesoRaiz').kendoDropDownList({
        dataTextField: "Codigo",
        dataValueField: "ProcesoSoldaduraID",
        suggest: true,
        filter: "contains",

    });
    $('#inputProcesoRaiz').closest('.k-widget').keydown(function (e) {
        if (e.keyCode == 13) {
            PlanchaRaiz();
        }
    });
}

function suscribirEventoGuardar() {

    $('#btnGuardar').click(function (e) {
        //var ds = $("#grid").data("kendoGrid").dataSource;
        //console.log(JSON.stringify(ds._data));
        //AjaxGuardarCaptura(ds._data);
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


    //pie pagina
    $('#GuardarPie').click(function (e) {
        //var ds = $("#grid").data("kendoGrid").dataSource;
        //console.log(JSON.stringify(ds._data));
        //AjaxGuardarCaptura(ds._data);
        EventoGuardar();
    });

    $("#btnGuardarPie").click(function () {
        EventoGuardar();
    });


    $('#btnGuardarYNuevoPie').click(function (e) {

        var ds = $("#grid").data("kendoGrid").dataSource;
        AjaxGuardarCaptura(ds._data);
        Limpiar();
    });
}

function suscribirEventoCancelar() {
    $('#btnCancelar').click(function (e) {
        Limpiar();
    });
}

function suscribirEventoAgregar() {
    $('#ButtonAgregar').click(function (e) {
        loadingStart();
        if ($('input:radio[name=TipoAgregado]:checked').val() == "Reporte") {
            AjaxCargarReporteJuntas();
        }
        else {
            if ($('input:radio[name=TipoAgregado]:checked').val() == "Listado" && $("#Junta").val() != "") {
                ObtenerJSonGridSoldadura();
            }
            else
                displayMessage("JuntaSinSeleccionar", "", '2');

        }

        loadingStop();
    });
}

function suscribirEventoAplicar() {
    $('#ButtonAplicar').click(function (e) {
        loadingStart();
        if ($("#inputTaller").val() != "")
            PlanchaTaller();
        if (endRangeDate.val() != "")
            PlanchaFecha();
        loadingStop();
    });
}



function SuscribirEventoFecha() {
    $('#FechaSoldadura').closest('.k-widget').keydown(function (e) {
        if (e.keyCode == 13) {
            PlanchaFecha();
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
            $("#InputID").data("kendoComboBox").input.focus();
            $("#Junta").val("");
        }
        else if (e.keyCode == 39) {
            $("#ButtonAgregar").focus();
        }
        else if (e.keyCode == 13) {

            if ($('input:radio[name=TipoAgregado]:checked').val() == "Reporte") {
                deshabilitaSpool();
                ObtenerJSonGridSoldadura();
                opcionHabilitarRadioTipoCaptura(false);
            }
            else if ($('input:radio[name=TipoAgregado]:checked').val() == "Listado") {
                if ($("#Junta").val() != "") {
                    habilitaSpool();
                    opcionHabilitarRadioTipoCaptura(false);
                    ObtenerJSonGridSoldadura();
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


function SuscribirEventoMuestraJunta() {

    if ($('input:radio[name=TipoAgregado]').val() == "Reporte") {
        $("#JuntaDiv").css('display', 'none');
        $("#MuestraDiv").css('display', 'none');
    }
    else if ($('input:radio[name=TipoAgregado]').val() == "Listado") {
        $("#JuntaDiv").css('display', 'block');
        $("#MuestraDiv").css('display', 'block');
    }
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
}

function SuscribirEventoSpoolID() {
    var dataItem;
    $("#InputID").kendoComboBox({
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
                    alert(dataItem.Status);
                }
                else {
                    $("#InputID").val(dataItem.IDValido);
                    Cookies.set("Proyecto", dataItem.ProyectoID + '°' + dataItem.Proyecto);
                    $("#LabelProyecto").text(dataItem.Proyecto);
                    AjaxJunta($("#InputID").val());
                    AjaxObtenerListaTaller();
                }
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
                $("#LabelProyecto").text(dataItem.Proyecto);
                AjaxJunta($("#InputID").val());
                AjaxObtenerListaTaller();
            }
        }
    });


    $("#InputOrdenTrabajo").blur(function (e) {

        if ($("#InputOrdenTrabajo").val().match("^[a-zA-Z][0-9]*$")) {
            try {
                loadingStart();
                $CapturaSoldadura.Soldadura.read({ ordenTrabajo: $("#InputOrdenTrabajo").val(), tipo: '1', token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
                    $("#InputOrdenTrabajo").val(data.OrdenTrabajo);
                    $("#InputID").data("kendoComboBox").dataSource.data(data.idStatus);
                    Cookies.set("LetraProyecto", data.OrdenTrabajo.substring(0, 1), { path: '/' });
                    loadingStop();
                });
            } catch (e) {
                displayMessage("Mensajes_error", e.message, '0');
            }
        } else {
            displayMessage("CapturaSoldaduraMensajeOrdenTrabajo", "", '1');
            //$("#InputOrdenTrabajo").focus();
        }
    });



    $("#InputOrdenTrabajo").focus(function (e) {
        $("#InputOrdenTrabajo").val("");
        $("#InputID").data("kendoComboBox").value("");
        $("#InputID").data("kendoComboBox").setDataSource()
    });

    $('#InputID').closest('.k-widget').keydown(function (e) {

        if (e.keyCode == 37) {
            $("#InputOrdenTrabajo").focus();
        }
        else if (e.keyCode == 39) {
            $("#Junta").data("kendoDropDownList").input.focus();
        }
        else if (e.keyCode == 40)
            $("#InputID").data("kendoComboBox").select();
        else if (e.keyCode == 13) {
            if ($('input:radio[name=TipoAgregado]:checked').val() == "Reporte") {
                AjaxCargarReporteJuntas();

            }
        }

    });
};

$(document.body).keydown(function (e) {
    if (e.altKey && e.keyCode == 77) {
        if ($('input:radio[name=Muestra]:checked').val().trim() == "Todos") {
            $('input:radio[name=Muestra]').val(["Sin Capturar"]).attr('checked', 'checked');
        }
        else {
            $('input:radio[name=Muestra]').val(["Todos"]).attr('checked', 'checked');
        }
    }
});

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

function eventoCambioTipoListado() {

    if ($('input:radio[name=TipoAgregado]:checked').val() == "Reporte") {
        $("#JuntaDiv").css('display', 'none');
        $("#MuestraDiv").css('display', 'none');
        AjaxCargarCamposPredeterminadosOcultaJunta();
        AjaxObtenerListaTaller();
    }
    else if ($('input:radio[name=TipoAgregado]:checked').val() == "Listado") {
        $("#JuntaDiv").css('display', 'block');
        $("#MuestraDiv").css('display', 'block');
        AjaxObtenerListaTaller();
    }
}

function suscribirEventoChangeRadioTipoListado() {

    $('input:radio[name=TipoAgregado]:nth(0)').change(function () {
        eventoCambioTipoListado();
        $("#grid").data("kendoGrid").dataSource.data([]);
        Limpiar();
    });
    $('input:radio[name=TipoAgregado]:nth(1)').change(function () {
        eventoCambioTipoListado();
        $("#grid").data("kendoGrid").dataSource.data([]);
        Limpiar();
    });
}


function Limpiar() {

    $("#InputOrdenTrabajo").val("");
    $("#InputID").data("kendoComboBox").value("");

    $("#Junta").data("kendoDropDownList").dataSource.data([]);

    var radioButtons = document.getElementsByName('Muestra');
    for (var x = 0; x < radioButtons.length; x++) {
        if (radioButtons[x].checked) {
            radioButtons[x].checked = false;
        }
    }

    $("#FechaSoldadura").data("kendoDatePicker").value("");
    $("#inputTaller").data("kendoComboBox").value("");

    var radioButtonsLLena = document.getElementsByName('LLena');

    for (var x = 0; x < radioButtonsLLena.length; x++) {
        if (radioButtonsLLena[x].checked) {
            radioButtonsLLena[x].checked = false;
        }
    }



    $("#grid").data('kendoGrid').dataSource.data([]);
}


function opcionHabilitarRadioTipoCaptura(valor) {

}


function deshabilitaSpool() {
    $("#InputOrdenTrabajo").prop("disabled", true);
    $("#InputID").data("kendoComboBox").enable(false);

}

function habilitaSpool() {
    $("#InputOrdenTrabajo").prop("disabled", false);
    $("#InputID").data("kendoComboBox").enable(true);

}

function opcionHabilitarView(valor, name) {

    if (valor) {
        $('#FieldSetView').find('*').attr('disabled', true);
        $("#InputID").data("kendoComboBox").enable(false);
        $("#Junta").data("kendoDropDownList").enable(false);
        $("#inputTaller").data("kendoComboBox").enable(false);
        $("#FechaSoldadura").data("kendoDatePicker").enable(false);
        $('#botonGuardar').text("Editar");
        $("#DetalleAvisoLlegada0017").text("Editar");
        $('#ButtonAplicar').attr("disabled", true);

        $('#btnGuardarPiePagina').text("Editar");
        $("#botonGuardar3").text("Editar");

    }
    else {
        $('#FieldSetView').find('*').attr('disabled', false);
        $("#InputID").data("kendoComboBox").enable(true);
        $("#inputTaller").data("kendoComboBox").enable(true);
        $("#FechaSoldadura").data("kendoDatePicker").enable(true);
        $("#Junta").data("kendoDropDownList").enable(true);
        $('#botonGuardar').text("Guardar");
        $("#DetalleAvisoLlegada0017").text("Guardar");
        $('#ButtonAplicar').attr("disabled", false);
        $('#btnGuardarPiePagina').text("Guardar");
        $("#botonGuardar3").text("Guardar");
    }
}
