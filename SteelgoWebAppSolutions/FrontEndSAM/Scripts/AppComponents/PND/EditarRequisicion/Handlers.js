function SuscribirEventos() {
    SuscribirEventoRequisicion();
    SuscribirEventoProyecto();
    SuscribirEventoTipoPrueba();
    SuscribirEventoSpool();
    SuscribirEventoJuntaSpool();
    suscribirEventoChangeRadio();
    SuscribirEventoGuardar();    
}

function SuscribirEventoProyecto() {
    $("#inputProyecto").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "ProyectoID",
        suggest: true,
        delay: 10,
        filter: "contains",
        index: 3,
        change: function (e) {
            var dataItem = this.dataItem(e.sender.selectedIndex);
            var paramReq = getParameterByName('requisicion');

            if (dataItem != undefined) {
                if (paramReq == null) {
                    $("#grid").data("kendoGrid").dataSource.data([]);
                    if (dataItem.ProyectoID != 0) {
                        AjaxCargaListaTipoPrueba();
                    } else {
                        $("#inputRequisicion").data("kendoComboBox").value("");
                        $("#inputTipoPrueba").data("kendoComboBox").value("");
                    }
                }
            } else {
                $("#inputProyecto").data("kendoComboBox").value("");
                if(paramReq==null){
                    $("#inputRequisicion").data("kendoComboBox").value("");
                    $("#inputTipoPrueba").data("kendoComboBox").value("");
                    $("#grid").data("kendoGrid").dataSource.data([]);
                }
            }
        }
    });
}

function SuscribirEventoTipoPrueba() {
    $("#inputTipoPrueba").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "TipoPruebaID",
        suggest: true,
        delay: 10,
        filter: "contains",
        index: 3,
        change: function (e) {
            var dataItem = this.dataItem(e.sender.selectedIndex);
            var paramReq = getParameterByName('requisicion');
            var proyectoID = $("#inputProyecto").data("kendoComboBox").value();

            if (dataItem!=undefined) {
                if (paramReq==null) {
                    AjaxCargaListaRequisicion(dataItem.TipoPruebaID, proyectoID);
                } 
            } else {

                $("#inputTipoPrueba").data("kendoComboBox").value("");
                $("#inputRequisicion").data("kendoComboBox").value("");
                if(paramReq!=null){
                    $("#inputProyecto").data("kendoComboBox").value("");
                    $("#grid").data("kendoGrid").dataSource.data([]);
                } 
            }
        }
    });
}

function SuscribirEventoRequisicion() {
    $("#inputRequisicion").kendoComboBox({
        dataTextField: "NombreRequisicion",
        dataValueField: "RequisicionID",
        suggest: true,
        delay: 10,
        filter: "contains",
        index: 3,
        change: function (e) {
            var dataItem = this.dataItem(e.sender.selectedIndex);
            var paramReq = getParameterByName('requisicion');

            if (dataItem != undefined) {
                if(paramReq==null){
                    if (dataItem.RequisicionID != 0) {
                        AjaxCargaDetalleRequisicion(dataItem.RequisicionID, dataItem.TipoPruebaID, dataItem.ProyectoID);
                        ocultaDivAgregaSpool(true);
                    } else {
                        ocultaDivAgregaSpool(false);
                        $("#grid").data("kendoGrid").dataSource.data([]);
                    }
                } else {
                    if (dataItem.RequisicionID != 0) {
                        
                        $("#inputProyecto").data("kendoComboBox").value(dataItem.ProyectoID);
                        $("#inputTipoPrueba").data("kendoComboBox").value(dataItem.TipoPruebaID);

                        AjaxCargaDetalleRequisicion(dataItem.RequisicionID, dataItem.TipoPruebaID, dataItem.ProyectoID);
                        ocultaDivAgregaSpool(true);
                    } else {
                        ocultaDivAgregaSpool(false);
                        $("#grid").data("kendoGrid").dataSource.data([]);
                        $("#inputProyecto").data("kendoComboBox").value("");
                        $("#inputTipoPrueba").data("kendoComboBox").value("");
                    }
                }
            } else {
                $("#inputRequisicion").data("kendoComboBox").value("");
                if (paramReq != null) {
                    $("#grid").data("kendoGrid").dataSource.data([]);
                    $("#inputProyecto").data("kendoComboBox").value("");
                    $("#inputTipoPrueba").data("kendoComboBox").value("");
                }
                ocultaDivAgregaSpool(true);
            }
        }
    });
}

function SuscribirEventoSpool() {
    $("#InputID").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "TipoPruebaID",
        suggest: true,
        delay: 10,
        filter: "contains",
        index: 3,
        change: function (e) {
            var dataItem = this.dataItem(e.sender.selectedIndex);
        }
    });
}

function SuscribirEventoJuntaSpool() {
    $("#Junta").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "TipoPruebaID",
        suggest: true,
        delay: 10,
        filter: "contains",
        index: 3,
        change: function (e) {
            var dataItem = this.dataItem(e.sender.selectedIndex);
        }
    });
}


function suscribirEventoChangeRadio() {
    $('input:radio[name=Muestra]:nth(0)').change(function () {
        FiltroMostrar(0);
    });
    $('input:radio[name=Muestra]:nth(1)').change(function () {
        FiltroMostrar(1);
    });
}

function SuscribirEventoGuardar() {
    $("#btnGuardarYNuevo, #btnGuardarYNuevo1").click(function (e) {
        var proyectoID = $("#inputProyecto").data("kendoComboBox").value();
        var tipoPruebaID = $("#inputTipoPrueba").data("kendoComboBox").value();
        var requisicionID = $("#inputRequisicion").data("kendoComboBox").value();

        var ds = $("#grid").data("kendoGrid").dataSource;
        if (proyectoID != 0 && proyectoID != "") {
            if (tipoPruebaID != 0 && tipoPruebaID != "") {
                if (requisicionID != 0 && requisicionID != "") {
                    AjaxGuardaCaptura(ds._data, true);                    
                } else {
                    displayNotify("MensajeSeleccionaRequisicion", "", "1");
                }
            } else {
                displayNotify("MensajeSeleccionaTipoPrueba", "", "1");
            }
        } else {
            displayNotify("MensajeSeleccionaProyecto", "", "1");
        }
    });

    //Guardar
    $("#Guardar, #btnGuardar, #Guardar1, #btnGuardar1").click(function (e) {
        var proyectoID = $("#inputProyecto").data("kendoComboBox").value();
        var tipoPruebaID = $("#inputTipoPrueba").data("kendoComboBox").value();
        var requisicionID = $("#inputRequisicion").data("kendoComboBox").value();

        if ($("#Guardar").text() == _dictionary.botonGuardar[$("#language").data("kendoDropDownList").value()]) {
            var ds = $("#grid").data("kendoGrid").dataSource;
            if (proyectoID != 0 && proyectoID != "") {
                if (tipoPruebaID != 0 && tipoPruebaID != "") {
                    if(requisicionID!=0 && requisicionID!=""){
                        AjaxGuardaCaptura(ds._data, false);
                    } else {
                        displayNotify("MensajeSeleccionaRequisicion", "", "1");
                    }
                } else {
                    displayNotify("MensajeSeleccionaTipoPrueba", "", "1");
                }
            } else {
                displayNotify("MensajeSeleccionaProyecto", "", "1");
            }
        } else if ($("#Guardar").text() == _dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]) {
            opcionHabilitarView(false, '');
        }
    });
}

function opcionHabilitarView(valor, name) {

    if (valor) {
        $('.addedSectionInLine').find('*').attr('disabled', true);
        $("#inputProyecto").data("kendoComboBox").enable(false);
        $("#inputTipoPrueba").data("kendoComboBox").enable(false);
        $("#inputRequisicion").data("kendoComboBox").enable(false);
        $("input[name='Muestra']").attr('disabled', true);


        $("#InputID").data("kendoComboBox").enable(false);
        $("#Junta").data("kendoComboBox").enable(false);

        $("#Guardar").text(_dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]);
        $("#btnGuardar").text(_dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]);
        $("#Guardar1").text(_dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]);
        $('#btnGuardar1').text(_dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]);
    }
    else {
        $('.addedSectionInLine').find('*').attr('disabled', false);

        $("#inputProyecto").data("kendoComboBox").enable(true);
        $("#inputTipoPrueba").data("kendoComboBox").enable(true);
        $("#inputRequisicion").data("kendoComboBox").enable(true);
        $("input[name='Muestra']").attr('disabled', false);

        $("#InputID").data("kendoComboBox").enable(true);
        $("#Junta").data("kendoComboBox").enable(true);
        $('#botonGuardar').text("Guardar");

        $("#Guardar").text(_dictionary.botonGuardar[$("#language").data("kendoDropDownList").value()]);
        $("#btnGuardar").text(_dictionary.botonGuardar[$("#language").data("kendoDropDownList").value()]);
        $("#Guardar1").text(_dictionary.botonGuardar[$("#language").data("kendoDropDownList").value()]);
        $('#btnGuardar1').text(_dictionary.botonGuardar[$("#language").data("kendoDropDownList").value()]);
    }
}

function Limpiar() {
    var paramReq = getParameterByName('requisicion');

    AjaxCargarCamposPredeterminados();
    if (paramReq != null) {
        AjaxObtenerElementoRequisicion(paramReq);
        ocultaDivAgregaSpool(true);
    } else {
        $("#inputProyecto").data("kendoComboBox").value("");
        $("#inputTipoPrueba").data("kendoComboBox").value("");
        $("#inputTipoPrueba").data("kendoComboBox").dataSource.data([]);
        $("#inputRequisicion").data("kendoComboBox").value("");
        $("#inputRequisicion").data("kendoComboBox").dataSource.data([]);

        AjaxCargaListaProyecto();
        ocultaDivAgregaSpool(false);
        $("#grid").data("kendoGrid").dataSource.data([]);
    }
    
    $("#InputID").data("kendoComboBox").value("");
    $("#Junta").data("kendoComboBox").value("");
}

function ocultaDivAgregaSpool(valor) {
    if (valor) {
        $("#containerDiv").show();
    } else {
        $("#containerDiv").hide();
    }
}