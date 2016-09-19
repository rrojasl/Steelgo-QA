SuscribirEventos();

function SuscribirEventos() {
    suscribirEventoCancelar();
    suscribirEventoProyecto();
    suscribirEventoProveedor();
    suscribirEventoTipoPrueba();
    suscribirEventoChangeRadio();
    suscribirEventoRequisicion();
}

function suscribirEventoCancelar() {
    $('#btnCancelar').click(function (e) {
        Limpiar();
    });
}

function Limpiar() {
    $("#Requisicion").val("");
    $("#grid").data('kendoGrid').dataSource.data([]);
}

function suscribirEventoChangeRadio() {
    $('input:radio[name=Revision]:nth(0)').change(function () {
        // Opción NO
        $('#proveedorContainerDiv').hide();
        $('#usuarioContainerDiv').hide();

        $('#lblUsuarioVRValue').text("");
        $('#lblProveedorVRValue').text("");
    });
    $('input:radio[name=Revision]:nth(1)').change(function () {
        // Opción SI
        LoginProveedor();
    });
}

function suscribirEventoProyecto() {
    $("#inputProyecto").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "ProyectoID",
        suggest: true,
        filter: "contains",
        change: function (e) {
            AjaxGetListaTiposDePrueba();
        }
    });
}

function suscribirEventoTipoPrueba() {
    $("#inputTipoPrueba").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "TipoPruebaID",
        suggest: true,
        filter: "contains",
        change: function (e) {
            var tipoPruebaID = $("#inputTipoPrueba").data("kendoComboBox").value();
            var proyectoID = $("#inputProyecto").data("kendoComboBox").value();

            if (proyectoID != "" && proyectoID != 0)
                AjaxGetListaProveedor();
        }
    });
}
function suscribirEventoProveedor() {
    $("#inputProveedor").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "ProveedorID",
        suggest: true,
        filter: "contains",
        change: function (e) {
            var proyectoID = $("#inputProyecto").data("kendoComboBox").value();
            var tipoPruebaID = $("#inputTipoPrueba").data("kendoComboBox").value();
            var proveedorID = $("#inputProveedor").data("kendoComboBox").value();

            //AjaxGetListaRequisiciones($("#inputProyecto").data("kendoComboBox").value() == "" ? 0 : $("#inputProyecto").data("kendoComboBox").value(),
            //                        $("#inputTipoPrueba").data("kendoComboBox").value() == "" ? 0 : $("#inputTipoPrueba").data("kendoComboBox").value(),
            //                        $("#inputProveedor").data("kendoComboBox").value() == "" ? 0 : $("#inputProveedor").data("kendoComboBox").value());

            if (proyectoID != "" && proyectoID != 0 && tipoPruebaID != "" && tipoPruebaID != 0 && proveedorID != "" && proveedorID != 0)
                AjaxGetListaRequisiciones(proyectoID, tipoPruebaID, proveedorID);
        }
    });
}


function suscribirEventoRequisicion() {
    $("#inputRequisicion").kendoComboBox({
        dataTextField: "NombreRequisicion",
        dataValueField: "RequisicionID",
        suggest: true,
        filter: "contains",
        change: function (e) {
        }
    });
}

function opcionHabilitarView(valor, name) {
    if (valor) {
        $('#FieldSetView').find('*').attr('disabled', true);
        $("#Requisicion").data("kendoComboBox").enable(false);

        $('#Guardar1').text(_dictionary.textoEditar[$("#language").data("kendoDropDownList").value()]);
        $("#Guardar").text(_dictionary.textoEditar[$("#language").data("kendoDropDownList").value()]);

    }
    else {
        $('#FieldSetView').find('*').attr('disabled', false);
        $("#Requisicion").data("kendoComboBox").enable(true);
        $('#Guardar1').text(_dictionary.textoGuardar[$("#language").data("kendoDropDownList").value()]);
        $("#Guardar").text(_dictionary.textoGuardar[$("#language").data("kendoDropDownList").value()]);

    }
}