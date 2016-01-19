function SuscribirEventos()
{
    SuscribirEventoSistemaPintura();
    SuscribirEventoLote();
    SuscribirEventoBuscar();
    SuscribirEventoGuardar();
}
function SuscribirEventoSistemaPintura() {
    $('#inputSistemaPintura').kendoDropDownList({
        dataTextField: "NombreSistemaPintura",
        dataValueField: "SistemaPinturaID ",
        suggest: true,
        filter: "contains",
        index: 3
    });
}

function SuscribirEventoLote() {
    $('#inputLote').kendoDropDownList({
        dataTextField: "NumeroLote",
        dataValueField: "LotePinturaID ",
        suggest: true,
        filter: "contains",
        index: 3
    });
}

function SuscribirEventoBuscar()
{
    $('#btnBuscar').click(function (e) {
        AjaxBuscarSpool();
    });
    
}


function SuscribirEventoGuardar() {

    $('#btnGuardarYNuevo').click(function (e) {
        ajaxGuardar($("#grid").data("kendoGrid").dataSource._data);
        Limpiar();
    });

    $('#btnGuardar').click(function (e) {

        if ($('#botonGuardar').text() == "Guardar") {
            opcionHabilitarView(true, "FieldSetView");
            ajaxGuardar($("#grid").data("kendoGrid").dataSource._data);
        }
        else if ($('#botonGuardar').text() == "Editar")
            opcionHabilitarView(false, "FieldSetView")
    });
};

function opcionHabilitarView(valor, name) {

    if (valor) {
        $('#FieldSetView').find('*').attr('disabled', true);
        $("#inputSistemaPintura").data("kendoDropDownList").enable(false);
        $("#inputLote").data("kendoDropDownList").enable(false);
        $('#botonGuardar').text("Editar");
        $("#DetalleAvisoLlegada0017").text("Editar");
    }
    else {
        $('#FieldSetView').find('*').attr('disabled', false);
        $("#inputSistemaPintura").data("kendoDropDownList").enable(true);
        $("#inputLote").data("kendoDropDownList").enable(true);
        $('#botonGuardar').text("Guardar");
        $("#DetalleAvisoLlegada0017").text("Guardar");
    }
}
