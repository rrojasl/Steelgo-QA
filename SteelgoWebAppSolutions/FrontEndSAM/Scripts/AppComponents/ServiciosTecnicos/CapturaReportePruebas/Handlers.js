function SuscribirEventos() {
    suscribirEventoGuardar();
    suscribirEventoCancelar();
}

SuscribirEventos();

function suscribirEventoGuardar() {





    $('#Guardar').click(function (e) {
        if ($('#botonGuardar').text() == _dictionary.DetalleAvisoLlegada0017[$("#language").data("kendoDropDownList").value()]) {
            var ds = $("#grid").data("kendoGrid").dataSource;
            AjaxGuardarCaptura(ds._data, 0);
        }
        else if ($('#botonGuardar').text() == _dictionary.DetalleAvisoLlegada0082[$("#language").data("kendoDropDownList").value()])
            opcionHabilitarView(false, "FieldSetView")
    });

    $('#btnGuardar2').click(function (e) {
        if ($('#botonGuardar').text() == _dictionary.DetalleAvisoLlegada0017[$("#language").data("kendoDropDownList").value()]) {

            var ds = $("#gridPopUp").data("kendoGrid").dataSource;
            modeloRenglon.ListaDetalleDefectos = ds._data;
            $("#windowGrid").data("kendoWindow").close();
        }
        else if ($('#botonGuardar').text() == _dictionary.DetalleAvisoLlegada0082[$("#language").data("kendoDropDownList").value()])
            opcionHabilitarView(false, "FieldSetView")
    });

    $('#btnGuardarYNuevo').click(function (e) {
        if ($('#botonGuardar').text() == _dictionary.DetalleAvisoLlegada0017[$("#language").data("kendoDropDownList").value()]) {

            var ds = $("#grid").data("kendoGrid").dataSource;
            AjaxGuardarCaptura(ds._data, 1);
        }
        else if ($('#botonGuardar').text() == _dictionary.DetalleAvisoLlegada0082[$("#language").data("kendoDropDownList").value()])
            opcionHabilitarView(false, "FieldSetView")
    });

    $('#GuardarPie').click(function (e) {

        if ($('#botonGuardar').text() == _dictionary.DetalleAvisoLlegada0017[$("#language").data("kendoDropDownList").value()]) {
            var ds = $("#grid").data("kendoGrid").dataSource;
            AjaxGuardarCaptura(ds._data, 0);
        }
        else if ($('#botonGuardar').text() == _dictionary.DetalleAvisoLlegada0082[$("#language").data("kendoDropDownList").value()])
            opcionHabilitarView(false, "FieldSetView")
    });

    $('#btnGuardar1').click(function (e) {

        if ($('#botonGuardar').text() == _dictionary.DetalleAvisoLlegada0017[$("#language").data("kendoDropDownList").value()]) {

            var ds = $("#gridPopUp").data("kendoGrid").dataSource;
            modeloRenglon.ListaDetalleDefectos = ds._data;
            $("#windowGrid").data("kendoWindow").close();
        }
        else if ($('#botonGuardar').text() == _dictionary.DetalleAvisoLlegada0082[$("#language").data("kendoDropDownList").value()])
            opcionHabilitarView(false, "FieldSetView")
    });

    $('#btnGuardarYNuevo1').click(function (e) {
        if ($('#botonGuardar').text() == _dictionary.DetalleAvisoLlegada0017[$("#language").data("kendoDropDownList").value()]) {

            var ds = $("#grid").data("kendoGrid").dataSource;
            AjaxGuardarCaptura(ds._data, 1);
        }
        else if ($('#botonGuardar').text() == _dictionary.DetalleAvisoLlegada0082[$("#language").data("kendoDropDownList").value()])
            opcionHabilitarView(false, "FieldSetView")
    });

    $('#GuardarDefectos').click(function (e) {
        if ($('#botonGuardar').text() == _dictionary.DetalleAvisoLlegada0017[$("#language").data("kendoDropDownList").value()]) {

            var ds = $("#gridPopUp").data("kendoGrid").dataSource;
            modeloRenglon.ListaDetalleDefectos = ds._data;
            $("#windowGrid").data("kendoWindow").close();
        }
        else if ($('#botonGuardar').text() == _dictionary.DetalleAvisoLlegada0082[$("#language").data("kendoDropDownList").value()])
            opcionHabilitarView(false, "FieldSetView")
    });

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

function opcionHabilitarView(valor, name) {

    if (valor) {
        $('#FieldSetView').find('*').attr('disabled', true);


        $('#botonGuardar').text("Editar");
        $("#botonGuardar2").text("Editar");


        $("#botonGuardar3").text("Editar");
        $('#botonGuardar4').text("Editar");

    }
    else {
        $('#FieldSetView').find('*').attr('disabled', false);


        $('#botonGuardar2').text("Guardar");
        $("#botonGuardar").text("Guardar");

        $("#botonGuardar3").text("Guardar");
        $('#botonGuardar4').text("Guardar");


    }
}