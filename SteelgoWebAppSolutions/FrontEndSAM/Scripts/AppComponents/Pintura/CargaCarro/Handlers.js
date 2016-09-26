﻿function SuscribirEventos() {
    SuscribirEventoProyecto();
    SuscribirEventoCarro();
    SuscribirEventoSpoolID();
    SuscribirEventoCuadrante();
    SuscribirEventoCambiarVista();
    SuscribirEventoTipoSeleccion();
    SuscribirEventoGuardarMedioTransporte();
    SuscribirEventoMostrarSpool();
    SuscribirEventoGuardar();
    SuscribirEventoCheckCerrarCarro();

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
            LimpiarCargaProyecto();

            if (dataItem != undefined) {
                if (dataItem.ProyectoID != 0) {
                    AjaxCargarMedioTransporte(dataItem.ProyectoID);
                    AjaxCargarCuadrante(dataItem.PatioID);
                }
            } else {
                $("#inputProyecto").data("kendoComboBox").value("");
            }
        }
    });
}

function SuscribirEventoCarro() {
    $("#inputCarroEscritorio").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "MedioTransporteID",
        suggest: true,
        delay: 10,
        filter: "contains",
        index: 3,
        change: function (e) {
            var dataItem = this.dataItem(e.sender.selectedIndex);
            $("#grid[name='grid-Escritorio']").data('kendoGrid').dataSource.data([]);
            if (dataItem != undefined) {
                if (dataItem.MedioTransporteID == -1) {
                    CargaPopupNuevoMedioTransporte();
                } else {
                    $("#inputCarroEscritorio").attr("mediotransporteid", dataItem.MedioTransporteCargaID);
                    $("#inputCarroEscritorio").attr("mediotransportecerrado", dataItem.CarroCerrado);
                    AjaxCargarSpoolBacklog(false, dataItem.MedioTransporteID);
                }
            } else {
                $("#inputCarroEscritorio").data("kendoComboBox").value("");
            }
        }
    });
    $("#inputCarroPatio").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "MedioTransporteID",
        suggest: true,
        delay: 10,
        filter: "contains",
        index: 3,
        change: function (e) {
            var dataItem = this.dataItem(e.sender.selectedIndex);
            $("#grid[name='grid-Patio']").data('kendoGrid').dataSource.data([]);
            if (dataItem != undefined) {
                
                if (dataItem.MedioTransporteID != 0) {
                    $("#inputCarroPatio").attr("mediotransporteid", dataItem.MedioTransporteCargaID);
                    $("#inputCarroPatio").attr("mediotransportecerrado", dataItem.CarroCerrado);
                    if(dataItem.MedioTransporteID == -1){
                        CargaPopupNuevoMedioTransporte();
                    } else {                        
                        AjaxObtenerDetalleCarroCargado(dataItem.MedioTransporteID);
                    }
                }

            } else {
                $("#inputCarroPatio").data("kendoComboBox").value("");
            }
        }
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
        delay: 10,
        change: function (e) {
            dataItem = this.dataItem(e.sender.selectedIndex);

            if (dataItem != undefined) {

            }
            else {
                $("#InputID").data("kendoComboBox").value("");
            }
            $("#chkCerrarEscritorio").attr("checked", false);
            $("#chkCerrarPatio").attr("checked", false);
        }
    });

    $("#InputOrdenTrabajo").blur(function (e) {

        if ($("#InputOrdenTrabajo").val() != "") {
            if ($("#InputOrdenTrabajo").val().match("^[a-zA-Z][0-9]*$")) {
                try {
                    AjaxObtenerSpoolID();
                } catch (e) {
                    displayNotify("Mensajes_error", e.message, '0');
                }
            } else {
                $("#InputOrdenTrabajo").val("");
                displayNotify("PinturaCargaMensajeOrdenTrabajo", "", '1');
            }
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
        else if (e.keyCode == 40) {
            $("#InputID").data("kendoComboBox").select();
        }
        else if (e.keyCode == 13) {
            if ($('#InputID').data("kendoComboBox").value() != undefined) {
                AjaxAgregarCarga();
            }
            else {
                $("#InputID").data("kendoComboBox").value("");
                displayNotify("PinturaCargaNoExisteSpoolID", '', '2');
            }
        }
    });

}

function SuscribirEventoCuadrante() {
    $('#inputCuadrantePopup').kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "CuadranteID",
        suggest: true,
        filter: "contains",
        change: function () {
            if ($("#inputCuadrantePopup").data("kendoComboBox").dataItem($("#inputCuadrantePopup").data("kendoComboBox").select()) != undefined) {

            }
            else {
                $("#inputCuadrantePopup").data("kendoComboBox").value("");
            }
        }
    });
}

function SuscribirEventoCambiarVista() {
    $('#styleEscritorio').click(function () {
        $("#styleEscritorio").addClass("active");
        $("#stylePatio").removeClass("active");

        $("#inputProyecto").data("kendoComboBox").value("");

        $("#inputCarroEscritorio").data("kendoComboBox").dataSource.data([]);
        $("#inputCarroEscritorio").data("kendoComboBox").value("");
        
        $("#grid[name='grid-Escritorio']").data('kendoGrid').dataSource.data([]);

        $("#chkCerrarEscritorio").attr("checked", false);
        $("#labelM2E").text("");
        $("#labelToneladasE").text("");

        $("#contenedorPrincipalEscritorio").show();
        $("#contenedorPrincipalPatio").hide();
    });
    $('#stylePatio').click(function () {
        $("#styleEscritorio").removeClass("active");
        $("#stylePatio").addClass("active");

        $("#inputProyecto").data("kendoComboBox").value("");
        $("#inputCarroPatio").data("kendoComboBox").dataSource.data([]);
        $("#inputCarroPatio").data("kendoComboBox").value("");

        $("#chkCerrarP").attr("checked", false);
        $("#labelM2P").text("");
        $("#labelToneladasP").text("");



        $("#InputOrdenTrabajo").val("");
        $("#InputID").data("kendoComboBox").dataSource.data([]);
        $("#InputID").data("kendoComboBox").value("");
        $("#grid[name='grid-Patio']").data('kendoGrid').dataSource.data([]);

        $("#contenedorPrincipalEscritorio").hide();
        $("#contenedorPrincipalPatio").show();

    });


}

function SuscribirEventoTipoSeleccion() {
    $('input:radio[name=TipoSeleccion]:nth(0)').change(function () {
        $("#InputIDDiv").show();
        $("#divCodigo").hide();
        $("#inputCodigo").val('');

    });

    $('input:radio[name=TipoSeleccion]:nth(1)').change(function () {
        $("#InputIDDiv").hide();
        $("#divCodigo").show();
        $("#InputOrdenTrabajo").val('');
        $("#InputID").data("kendoComboBox").value("");
    });
}

function SuscribirEventoGuardarMedioTransporte() {

    $('#btnGuardarCrearMedioTransporte').click(function (e) {
        AjaxGuardarNuevoCarro();
    });

    $('#InputNombre').keydown(function (e) {
        if ($('#InputNombre').val() != "") {
            if (e.keyCode == 13) {
                AjaxGuardarNuevoCarro();
            }
        }

    });

    $('#btnCerrarVentanaCrearMedioTransporte').click(function (e) {
        windowNewCarriage.close();
    });
}

function SuscribirEventoMostrarSpool() {
    $('input:radio[name=Muestra]:nth(0)').change(function () {
        if ($("#styleEscritorio").hasClass("active")) {
            FiltroMostrarBack(0);

        }
        else if ($("#stylePatio").hasClass("active")) {

            FiltroMostrar(0);
        }

    });

    $('input:radio[name=Muestra]:nth(1)').change(function () {
        if ($("#styleEscritorio").hasClass("active")) {

            FiltroMostrarBack(1);

        }
        else if ($("#stylePatio").hasClass("active")) {

            FiltroMostrar(1);

        }

    });
}

function LimpiarCargaProyecto() {
    $("#inputCarroEscritorio").data("kendoComboBox").dataSource.data([]);
    $("#inputCarroEscritorio").data("kendoComboBox").value("");

    $("#inputCarroPatio").data("kendoComboBox").dataSource.data([]);
    $("#inputCarroPatio").data("kendoComboBox").value("");

    $("#grid[name='grid-Escritorio']").data('kendoGrid').dataSource.data([]);
    $("#grid[name='grid-Patio']").data('kendoGrid').dataSource.data([]);
}

function CargaPopupNuevoMedioTransporte(e) {
    $("#InputNombre").val("");

    windowNewCarriage = $("#divNuevoMedioTransporte").kendoWindow({
        modal: true,
        resizable: false,
        visible: true,
        width: "500px",
        height: "auto",
        position: {
            top: "1%",
            left: "1%"
        },
        actions: [
            "Close"
        ],
        close: function () {
            //$("#inputCarro").data("kendoComboBox").value("");
        }
    }).data("kendoWindow");
    $("#divNuevoMedioTransporte").data("kendoWindow").title(_dictionary.PinturaCargaNuevoCarro[$("#language").data("kendoDropDownList").value()]);
    $("#divNuevoMedioTransporte").data("kendoWindow").center().open();
    $("#InputNombre").focus();
}

function SuscribirEventoGuardar() {
    $('#btnGuardarYNuevo,#btnGuardarYNuevo1').click(function (e) {
        if ($("#styleEscritorio").hasClass("active")) {
            var ds = $("#grid[name='grid-Escritorio']").data("kendoGrid").dataSource;
            AjaxSubirSpool(ds._data, true);
        }
        else if ($("#stylePatio").hasClass("active")) {
            ajaxGuardar($("#grid[name='grid-Patio']").data("kendoGrid").dataSource._data, true);

        }
    });

    $('#Guardar, #btnGuardar, #GuardarPie, #Guardar1').click(function (e) {
        e.stopPropagation();

        if ($("#styleEscritorio").hasClass("active")) {

            if ($('#Guardar').text() == _dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]) {
                var ds = $("#grid[name='grid-Escritorio']").data("kendoGrid").dataSource;
                AjaxSubirSpool(ds._data, false);
            }
            else if ($('#Guardar').text() == _dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]) {
                //SetDisabledBooleanEnGrid(false);
                opcionHabilitarViewBacklog(false, "FieldSetView");

            }
        }
        else if ($("#stylePatio").hasClass("active")) {

            if ($('#Guardar').text() == _dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]) {
                ajaxGuardar($("#grid[name='grid-Patio']").data("kendoGrid").dataSource._data, false);

            }
            else if ($('#Guardar').text() == _dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]) {
                opcionHabilitarView(false, "FieldSetView")
            }

        }
    });
};

function SuscribirEventoCheckCerrarCarro() {
    $('#chkCerrarEscritorio, #chkCerrarPatio').change(function () {
        var checked = $(this)[0].checked;
        if ($("#styleEscritorio").hasClass("active")) {
            if ($("#inputCarroEscritorio").data("kendoComboBox").value() != "" &&
                $("#inputCarroEscritorio").data("kendoComboBox").value() != "0") {

                var ds = $("#grid[name='grid-Escritorio']").data("kendoGrid").dataSource;

                if (ds._data.length > 0 && $("#inputCarroEscritorio").data("kendoComboBox").value() != "") {
                    if ($("#inputCarroEscritorio").attr("mediotransportecerrado")) {
                        $(this)[0].checked = true;
                    }
                }
            }
        }
        else if ($("#stylePatio").hasClass("active")) {
            var ds = $("#grid[name='grid-Patio']").data("kendoGrid").dataSource;
            
            if (ds._data.length > 0 && $("#inputCarroPatio").data("kendoComboBox").value() != "") {
                if ($("#inputCarroPatio").attr("mediotransportecerrado")) {
                    $(this)[0].checked = true;
                }
            }

        }
    });
}

function opcionHabilitarView(valor, name) {
    var $menu = $('.save-group');

    if (valor) {
        $('#FieldSetView').find('*').attr('disabled', true);
        $(".addedSectionInLine").find('*').attr("disabled", true);
        $("#inputProyecto").data("kendoComboBox").enable(false);
        $("#styleEscritorio").attr("disabled", true);
        $("#stylePatio").attr("disabled", true);
        $("input[name='Muestra']").attr("disabled", true);
        $("#inputCarroPatio").data("kendoComboBox").enable(false);
        $("#chkCerrarPatio").attr("disabled", true);

        $("#btnAgregar").attr("disabled", true);
        $("#Guardar").text(_dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]);
        $("#btnGuardar").text(_dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]);
        $("#Guardar1").text(_dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]);
        $('#GuardarPie').text(_dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]);
    }
    else {
        $('#FieldSetView').find('*').attr('disabled', false);
        $(".addedSectionInLine").find('*').attr("disabled", false);
        $("#inputProyecto").data("kendoComboBox").enable(true);
        $("#styleEscritorio").attr("disabled", false);
        $("#stylePatio").attr("disabled", false);
        $("input[name='Muestra']").attr("disabled", false);
        $("#inputCarroPatio").data("kendoComboBox").enable(true);
        $("#chkCerrarPatio").attr("disabled", false);

        $("#btnAgregar").attr("disabled", false);
        $("#Guardar").text(_dictionary.botonGuardar[$("#language").data("kendoDropDownList").value()]);
        $("#btnGuardar").text(_dictionary.botonGuardar[$("#language").data("kendoDropDownList").value()]);
        $("#Guardar1").text(_dictionary.botonGuardar[$("#language").data("kendoDropDownList").value()]);
        $('#GuardarPie').text(_dictionary.botonGuardar[$("#language").data("kendoDropDownList").value()]);
    }
}

function opcionHabilitarViewBacklog(valor, name) {
    var $menu = $('.save-group');

    if (valor) {
        $(".addedSectionInLine").find('*').attr("disabled", true);
        $("#inputProyecto").data("kendoComboBox").enable(false);
        $("#styleEscritorio").attr("disabled", true);
        $("#stylePatio").attr("disabled", true);
        $("input[name='Muestra']").attr("disabled", true);
        $("#inputCarroEscritorio").data("kendoComboBox").enable(false);
        $("#chkCerrarEscritorio").attr("disabled", true);
        $("#Guardar").text(_dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]);
        $("#btnGuardar").text(_dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]);
        $("#Guardar1").text(_dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]);
        $('#GuardarPie').text(_dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]);
    }
    else {
        $(".addedSectionInLine").find('*').attr("disabled", false);
        $("#inputProyecto").data("kendoComboBox").enable(true);
        $("#styleEscritorio").attr("disabled", false);
        $("#stylePatio").attr("disabled", false);
        $("input[name='Muestra']").attr("disabled", false);
        $("#inputCarroEscritorio").data("kendoComboBox").enable(true);
        $("#chkCerrarEscritorio").attr("disabled", false);
        $("#Guardar").text(_dictionary.botonGuardar[$("#language").data("kendoDropDownList").value()]);
        $("#btnGuardar").text(_dictionary.botonGuardar[$("#language").data("kendoDropDownList").value()]);
        $("#Guardar1").text(_dictionary.botonGuardar[$("#language").data("kendoDropDownList").value()]);
        $('#GuardarPie').text(_dictionary.botonGuardar[$("#language").data("kendoDropDownList").value()]);
    }
}

function Limpiar() {
    $("#inputProyecto").data("kendoComboBox").value("");
    $("#inputCarroPatio").data("kendoComboBox").dataSource.data([]);
    $("#inputCarroPatio").data("kendoComboBox").value("");
    $("#inputCarroEscritorio").data("kendoComboBox").dataSource.data([]);
    $("#inputCarroEscritorio").data("kendoComboBox").value("");
    $("#labelM2E").text("");
    $("#labelM2P").text("");
    $("#labelToneladasE").text("");
    $("#labelToneladasP").text("");
    $("#InputID").data("kendoComboBox").dataSource.data([]);
    $("#InputID").data("kendoComboBox").value("");
    $("#InputOrdenTrabajo").val("");
    $('input:radio[name=TipoVista]:nth(0)').attr('checked', true);
    $('input:radio[name=TipoVista]:nth(1)').attr('checked', false);
    $("#grid[name='grid-Escritorio']").data('kendoGrid').dataSource.data([]);
    $("#grid[name='grid-Patio']").data('kendoGrid').dataSource.data([]);
    $("#chkCerrarEscritorio").attr("checked", false);
    $("#chkCerrarPatio").attr("checked", false);
    AjaxCargarCamposPredeterminados();
    opcionHabilitarView(false, "")
    opcionHabilitarViewBacklog(false, "");
}