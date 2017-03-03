function SuscribirEventos() {
    SuscribirEventoProyecto();
    suscribirEventoChangeRadioTipoBusqueda();
    SuscribirEventoBusqueda();
    SuscribirEventoGuardar();
}

function SuscribirEventoGuardar()
{
    $('.accionGuardar').click(function (e) {
       
        //e.stopPropagation();
        if ($('#Guardar').text() == _dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]) {
            //opcionHabilitarView(true, "FieldSetView");
            var ds = $("#grid").data("kendoGrid").dataSource;
            AjaxGuardar(ds._data, false);
        }
        else if ($('#Guardar').text() == _dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]) {
            opcionHabilitarView(false, "FieldSetView")
        }
    });

    $('.accionGuardarYNuevo').click(function (e) {
       
        //e.stopPropagation();
        if ($('#Guardar').text() == _dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]) {
            //opcionHabilitarView(true, "FieldSetView");
            var ds = $("#grid").data("kendoGrid").dataSource;
            AjaxGuardar(ds._data, false);
        }
        else if ($('#Guardar').text() == _dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]) {
            opcionHabilitarView(false, "FieldSetView")
        }
    });
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
        //    var dataItem = this.dataItem(e.sender.selectedIndex);
        //    if (!ValidaInformacionCapturada()) {
        //        LimpiaCargaProyecto();
        //        if (dataItem != undefined) {
        //            $("#inputProyecto").attr("proyectoAntrior", dataItem.ProyectoID);
        //            if (dataItem.ProyectoID != 0) {
        //                AjaxCargarSistemaPintura(dataItem.ProyectoID);
        //            }
        //        } else {
        //            $("#inputProyecto").data("kendoComboBox").value("");
        //        }
        //    } else {
        //        var ventanaConfirm = $("#ventanaConfirmCaptura").kendoWindow({
        //            iframe: true,
        //            title: _dictionary.EntregaPlacasGraficasTituloPopup[$("#language").data("kendoDropDownList").value()],
        //            visible: false,
        //            width: "40%",
        //            height: "auto",
        //            draggable: false,
        //            modal: true,
        //            actions: [],
        //            animation: {
        //                open: false,
        //                close: false
        //            },
        //        }).data("kendoWindow");

        //        ventanaConfirm.content('<center>' + _dictionary.EntregaPlacasGraficasMensajeDatosCapturadosNoGuardados[$("#language").data("kendoDropDownList").value()] + '</center>' +
        //            "</br><center><button class='btn btn-blue' id='yesButtonProy'>" + _dictionary.lblSi[$("#language").data("kendoDropDownList").value()] + "</button> <button class='btn btn-blue' id='noButtonProy'>" + _dictionary.lblNo[$("#language").data("kendoDropDownList").value()] + "</button></center>");

        //        ventanaConfirm.open().center();
        //        $("#yesButtonProy").click(function () {
        //            LimpiaCargaProyecto();
        //            if (dataItem != undefined) {
        //                $("#inputProyecto").attr("proyectoAntrior", dataItem.ProyectoID);
        //                if (dataItem.ProyectoID != 0) {
        //                    AjaxCargarSistemaPintura(dataItem.ProyectoID);
        //                }
        //            } else {
        //                $("#inputProyecto").data("kendoComboBox").value("");
        //            }
        //            ventanaConfirm.close();
        //        });
        //        $("#noButtonProy").click(function () {
        //            $("#inputProyecto").data("kendoComboBox").value($("#inputProyecto").attr("proyectoAntrior"));
        //            ventanaConfirm.close();
        //        });
        //    }
        }
    });
}

function suscribirEventoChangeRadioTipoBusqueda() {

    $('input:radio[name=TipoBusqueda]').change(function () {
        if ($('input:radio[name=TipoBusqueda]:checked').val() == "spool") {
            if (!editado) {
                $("#grid").data("kendoGrid").dataSource.data([]);
                eventoCambioTipoListado();
            }
            else {
                ventanaConfirmEdicion.open().center();
            }
        }
        else if ($('input:radio[name=TipoBusqueda]:checked').val() == "nc") {
            if (!editado) {
                $("#grid").data("kendoGrid").dataSource.data([]);
                eventoCambioTipoListado();
            }
            else {
                ventanaConfirmEdicion.open().center();
            }
        }
    });
}

function eventoCambioTipoListado() {
    if ($('input:radio[name=TipoBusqueda]:checked').val() == "spool") {
        $("#divNc").css('display', 'none');
        $("#divSpool").css('display', 'block');
        $("#inputSpool").val("");
        $("#inputNc").val("");
        
        $("#inputProyecto").data("kendoComboBox").value("");
    }
    else if ($('input:radio[name=TipoBusqueda]:checked').val() == "nc") {
        $("#divNc").css('display', 'block');
        $("#divSpool").css('display', 'none');
        $("#inputSpool").val("");
        $("#inputNc").val("");
        $("#inputProyecto").data("kendoComboBox").value("");
    }
}

function SuscribirEventoBusqueda() {
    $("#btnBuscar").click(function (e) {
        var Proyecto = $("#inputProyecto").data("kendoComboBox").dataItem($("#inputProyecto").data("kendoComboBox").select());
        var tipoBusqueda = 0;
        var cadena = "";

        if (Proyecto != undefined && Proyecto.ProyectoID != "" && Proyecto.ProyectoID != 0) {
            if ($("#styleSpool").hasClass("active")) {
                $("#inputSpool").attr("saAttr", $("#inputSpool").val());
                if ($("#inputSpool").val() != null && $("#inputSpool").val() != "") {
                    tipoBusqueda = 1;
                    cadena = $("#inputSpool").val().trim();
                    //AjaxCargarNumeroElementosPorBusqueda(Proyecto.ProyectoID, tipoBusqueda, cadena);
                    AjaxConsultarSpoolsConSP();
                } else {
                    displayNotify("SPAMensajeIngresaSpool", "", '1');
                }
            } else if ($("#styleNc").hasClass("active")) {
                $("#inputNc").attr("ncaAttr", $("#inputNc").val());
                if ($("#inputNc").val() != null && $("#inputNc").val() != "") {
                    tipoBusqueda = 2;
                    cadena = $("#inputNc").val().trim();
                    //AjaxCargarNumeroElementosPorBusqueda(Proyecto.ProyectoID, tipoBusqueda, cadena);
                    AjaxConsultarSpoolsConSP();
                } else {
                    displayNotify("SPAMensajeIngresaNc", "", '1');
                }
            }

        } else {
            displayNotify("MensajeSeleccionaProyecto", "", '1');
        }
    });

    $("#inputSpool").keydown(function (e) {
        var Proyecto = $("#inputProyecto").data("kendoComboBox").dataItem($("#inputProyecto").data("kendoComboBox").select());
        if (e.keyCode == 13) {
            $("#inputSpool").attr("saAttr", $("#inputSpool").val());
            if ($('#inputSpool').val() != "") {
                // AjaxCargarNumeroElementosPorBusqueda(Proyecto.ProyectoID, 1, $('#inputSpool').val());
                AjaxConsultarSpoolsConSP();
            } else {
                $("#grid").data("kendoGrid").dataSource.data([]);
            }
        }
    });


    $("#inputNc").keydown(function (e) {
        var Proyecto = $("#inputProyecto").data("kendoComboBox").dataItem($("#inputProyecto").data("kendoComboBox").select());
        if (e.keyCode == 13) {
            $("#inputNc").attr("ncaAttr", $("#inputNc").val());
            if ($('#inputNc').val() != "") {
                //AjaxCargarNumeroElementosPorBusqueda(Proyecto.ProyectoID, 2, $('#inputNc').val());
                AjaxConsultarSpoolsConSP();
            } else {
                $("#grid").data("kendoGrid").dataSource.data([]);
            }
        }
    });
}