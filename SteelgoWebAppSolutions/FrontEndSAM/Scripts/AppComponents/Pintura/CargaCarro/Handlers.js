function SuscribirEventos() {
    SuscribirEventoProyecto();
    SuscribirEventoCarro();
    SuscribirEventoSpoolID();
    SuscribirEventoZona();
    SuscribirEventoCuadrante();
    SuscribirEventoCambiarVista();
    SuscribirEventoTipoSeleccion();
    SuscribirEventoGuardarMedioTransporte();
    SuscribirEventoMostrarDetalle();
    SuscribirEventoGuardar();
    SuscribirEventoCheckCerrarCarro();
    SuscribirEventoAgregar();
}

function SuscribirEventoAgregar()
{
    $('#btnAgregar').click(function () {
        AjaxAgregarSpool();
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
            var dataItem = this.dataItem(e.sender.selectedIndex);
            LimpiarCargaProyecto();

            if (dataItem != undefined) {
                if (dataItem.ProyectoID != 0) {
                    AjaxCargarMedioTransporte(dataItem.ProyectoID, null);
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
            LimpiarCargaCarro();

            if (dataItem != undefined) {
                CheckCerrarCarro(1, dataItem);
                if (dataItem.MedioTransporteID == -1) {
                    CargaPopupNuevoMedioTransporte();
                } else {
                    AjaxObtenerDetalleCargaCarroBacklog(dataItem);
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
            LimpiarCargaCarro();

            if (dataItem != undefined) {
                CheckCerrarCarro(2, dataItem);
                if (dataItem.MedioTransporteID != 0) {
                    if(dataItem.MedioTransporteID == -1){
                        CargaPopupNuevoMedioTransporte();
                    } else {
                        AjaxObtenerDetalleCargaCarro(dataItem.MedioTransporteID)
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
        }
    });

    $("#InputOrdenTrabajo").blur(function (e) {

        if ($("#InputOrdenTrabajo").val().match("^[a-zA-Z][0-9]*$")) {
            try {
                $("#InputID").data("kendoComboBox").enable(false);
                AjaxObtenerSpoolID();
            } catch (e) {
                displayNotify("Mensajes_error", e.message, '2');

            }
        } else {
            displayNotify("CapturaArmadoMensajeOrdenTrabajo", "", '1');
            //$("#InputOrdenTrabajo").focus();
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
                
            }
            else {
                $("#InputID").data("kendoComboBox").value("");
                displayNotify("PinturaCargaNoExisteSpoolID", '', '2');
            }
        }
    });

}

function SuscribirEventoZona() {
    $('#inputZonaPopup').kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "ZonaID",
        suggest: true,
        filter: "contains",
        change: function (e) {
            var dataItem = this.dataItem(e.sender.selectedIndex);
            $("#inputCuadrantePopup").data("kendoComboBox").dataSource.data([]);
            $("#inputCuadrantePopup").data("kendoComboBox").value("");

            if (dataItem != undefined) {
                if(dataItem.ZonaID != 0){
                    AjaxCargarCuadrante(dataItem.ZonaID);
                }
            }
            else {
                $("#inputZonaPopup").data("kendoComboBox").value("");
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
        change: function (e) {
            var dataItem = this.dataItem(e.sender.selectedIndex);
            if (dataItem!=undefined) {

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

        $("#chkCerrarEscritorio")[0].checked = false;
        $("#labelM2E").text("");
        $("#labelToneladasE").text("");

        $("#contenedorPrincipalEscritorio").show();
        $("#contenedorSecundarioEscritorio").show();
        $("#contenedorPrincipalPatio").hide();
        $("#contenedorSecundarioPatio").hide();

        if ($("#inputProyecto").data("kendoComboBox").dataSource._data.length == 2) {
            $("#inputProyecto").data("kendoComboBox").select(1);
            $("#inputProyecto").data("kendoComboBox").trigger("change");
        }
    });
    $('#stylePatio').click(function () {
        $("#styleEscritorio").removeClass("active");
        $("#stylePatio").addClass("active");

        $("#inputProyecto").data("kendoComboBox").value("");
        $("#inputCarroPatio").data("kendoComboBox").dataSource.data([]);
        $("#inputCarroPatio").data("kendoComboBox").value("");

        $("#chkCerrarPatio")[0].checked = false;
        $("#labelM2P").text("");
        $("#labelToneladasP").text("");



        $("#InputOrdenTrabajo").val("");
        $("#InputID").data("kendoComboBox").dataSource.data([]);
        $("#InputID").data("kendoComboBox").value("");
        $("#grid[name='grid-Patio']").data('kendoGrid').dataSource.data([]);

        $("#contenedorPrincipalEscritorio").hide();
        $("#contenedorSecundarioEscritorio").hide();
        $("#contenedorPrincipalPatio").show();
        $("#contenedorSecundarioPatio").show();

        if ($("#inputProyecto").data("kendoComboBox").dataSource._data.length == 2) {
            $("#inputProyecto").data("kendoComboBox").select(1);
            $("#inputProyecto").data("kendoComboBox").trigger("change");
        }
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
        $("#InputNombre").blur();
    });
}

function SuscribirEventoMostrarDetalle() {
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
    $("#inputZonaPopup").data("kendoComboBox").dataSource.data([]);
    $("#inputZonaPopup").data("kendoComboBox").value("");

    $("#inputCarroEscritorio").data("kendoComboBox").dataSource.data([]);
    $("#inputCarroEscritorio").data("kendoComboBox").value("");

    $("#inputCarroPatio").data("kendoComboBox").dataSource.data([]);
    $("#inputCarroPatio").data("kendoComboBox").value("");

    $("#grid[name='grid-Escritorio']").data('kendoGrid').dataSource.data([]);
    $("#grid[name='grid-Patio']").data('kendoGrid').dataSource.data([]);

    $("#labelM2E").text("");
    $("#labelM2P").text("");
    $("#labelToneladasE").text("");
    $("#labelToneladasP").text("");
}

function LimpiarCargaCarro() {
    $("#grid[name='grid-Escritorio']").data('kendoGrid').dataSource.data([]);
    $("#grid[name='grid-Patio']").data('kendoGrid').dataSource.data([]);

    $("#labelM2E").text("");
    $("#labelM2P").text("");
    $("#labelToneladasE").text("");
    $("#labelToneladasP").text("");
}
function CargaPopupNuevoMedioTransporte(e) {
    $("#InputNombre").val("");

    windowNewCarriage = $("#divNuevoMedioTransporte").kendoWindow({
        iframe: true,
        title: _dictionary.EntregaPlacasGraficasTituloPopup[$("#language").data("kendoDropDownList").value()],
        visible: false,
        width: "502px",
        height: "auto",
        modal: true,
        draggable: false,
        resizable: false,
        animation: {
            close: false,
            open: false
        },
        actions: [],
        close: function () {
            $("#inputCarroEscritorio").data("kendoComboBox").value("");
            $("#inputCarroPatio").data("kendoComboBox").value("");
            $("#InputNombre").blur();
        }
    }).data("kendoWindow");
    $("#divNuevoMedioTransporte").data("kendoWindow").title(_dictionary.PinturaCargaNuevoCarro[$("#language").data("kendoDropDownList").value()]);
    $("#divNuevoMedioTransporte").data("kendoWindow").center().open();

    $("#InputNombre").focus();
}



function SuscribirEventoCheckCerrarCarro() {
    $('#chkCerrarEscritorio, #chkCerrarPatio').change(function () {

        if ($("#styleEscritorio").hasClass("active")) {

            if ($(this)[0].checked) {
                $('#FieldSetView1').find("*").attr('disabled', true);
                $("#grid[name='grid-Escritorio']").find("*").attr('disabled', true);
            } else {
                $('#FieldSetView1').find("*").attr('disabled', false);
                $("#grid[name='grid-Escritorio']").find("*").attr('disabled', false);
            }
            
        }
        else if ($("#stylePatio").hasClass("active")) {
            if ($(this)[0].checked) {
                $("#grid[name='grid-Patio']")[0].disabled = true;
            } else {
                $("#grid[name='grid-Patio']")[0].disabled = false;
            }
        }
    });
}

function CheckCerrarCarro(Escenario, MedioTransporte) {
    if (Escenario === 1) {
        if (MedioTransporte.CarroCerrado) {
            $("#chkCerrarEscritorio")[0].checked = true;
            $('#FieldSetView1').find("*").attr('disabled', true);
            $("#grid[name='grid-Escritorio']").find("*").attr('disabled', true);
        }
        else {
            $("#chkCerrarEscritorio")[0].checked = false;            
            $('#FieldSetView1').find("*").attr('disabled', false);
            $("#grid[name='grid-Escritorio']").find("*").attr('disabled', false);
        }
    } else {
        if (MedioTransporte.CarroCerrado) {
            $("#chkCerrarPatio")[0].checked = true;
            $("#grid[name='grid-Patio']")[0].disabled = true;
        }
        else {
            $("#chkCerrarPatio")[0].checked = false;
            $("#grid[name='grid-Patio']")[0].disabled = false;
        }
    }
}

function opcionHabilitarView(valor, name) {
    var $menu = $('.save-group');

    if (valor) {
        $('#FieldSetView').find('*').attr('disabled', true);
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
        $('#FieldSetView1').find("*").attr('disabled', true);
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
        $('#FieldSetView1').find('*').attr('disabled', false);
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
    $("#chkCerrarEscritorio")[0].checked = false;
    $("#chkCerrarPatio")[0].checked = false;
    AjaxCargarCamposPredeterminados();
    opcionHabilitarView(false, "")
    opcionHabilitarViewBacklog(false, "");
}

function SuscribirEventoGuardar() {
    $('#btnGuardarYNuevo').click(function (e) {
        if ($("#grid").data("kendoGrid").dataSource._data.length > 0) {
            $('#btnCancelar').trigger("click");
        }
    });

    $('#btnGuardar,#Guardar, #btnGuardar1, #Guardar1 ').click(function (e) {
        if ($("#grid[name='grid-Escritorio']").data("kendoGrid").dataSource._data.length > 0) {
            if ($('#btnGuardar').text() == _dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]) {
                ajaxGuardar($("#grid[name='grid-Escritorio']").data("kendoGrid").dataSource._data);
            }
            else if ($('#btnGuardar').text() == "Editar") {
                opcionHabilitarView(false, "FieldSetView")
            }
        }
        else if ($("#grid[name='grid-Patio']").data("kendoGrid").dataSource._data.length > 0) {
            if ($('#btnGuardar').text() == _dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]) {
                ajaxGuardar($("#grid[name='grid-Patio']").data("kendoGrid").dataSource._data);
            }
            else if ($('#btnGuardar').text() == "Editar") {
                opcionHabilitarView(false, "FieldSetView")
            }
        }
    });
};