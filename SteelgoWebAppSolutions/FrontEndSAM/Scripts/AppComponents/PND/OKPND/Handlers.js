var proyectoInicial = 0;
var pruebaInicial = 0;
var requisicionOriginal = 0;

function SuscribirEventos() {
    suscribirEventoGuardar();
    suscribirEventoCancelar();
    suscribirEventoProyecto();
    SuscribirEventoBuscar();
    SuscribirEventoAplicar();
}

function suscribirEventoGuardar() {
    $('#BotonGuardar').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        if ($('#BotonGuardar').text() == "Guardar") {
            AjaxGuardarCaptura(ds._data, 0);
        }
        else if ($('#BotonGuardar').text() == "Editar")
            opcionHabilitarView(false, "FieldSetView");
    });

    $('#BotonGuardar1').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        if ($('#BotonGuardar').text() == "Guardar") {
            AjaxGuardarCaptura(ds._data, 0);
        }
        else if ($('#BotonGuardar').text() == "Editar")
            opcionHabilitarView(false, "FieldSetView");
    });

    $('#BotonGuardar3').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        if ($('#BotonGuardar').text() == "Guardar") {
            AjaxGuardarCaptura(ds._data, 0);
        }
        else if ($('#BotonGuardar').text() == "Editar") {
            opcionHabilitarView(false, "FieldSetView");
        }
    });

    $('#BotonGuardar4').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        if ($('#BotonGuardar').text() == "Guardar") {
            AjaxGuardarCaptura(ds._data, 0);
        }
        else if ($('#BotonGuardar').text() == "Editar")
            opcionHabilitarView(false, "FieldSetView")
    });

    $('#BotonGuardarYNuevo').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        if ($('#BotonGuardar').text() == "Guardar") {
            AjaxGuardarCaptura(ds._data, 1);
        }
        else if ($('#BotonGuardar').text() == "Editar")
            AjaxGuardarCaptura(ds._data, 1);
    });

    $('#BotonGuardarYNuevo1').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        if ($('#BotonGuardar').text() == "Guardar") {
            AjaxGuardarCaptura(ds._data, 1);
        }
        else if ($('#BotonGuardar').text() == "Editar")
            AjaxGuardarCaptura(ds._data, 1);
    });
}

function suscribirEventoCancelar() {
    $('#btnCancelar').click(function (e) {
        Limpiar();
    });
}

function suscribirEventoProyecto() {
    var dataItem;
    $("#Proyecto").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "ProyectoID",
        delay: 10,
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            Limpiar();
        }
    });
}

function SuscribirEventoBuscar() {
    $('#ButtonBuscar').click(function (e) {
        var proyectoID = $("#Proyecto").data("kendoComboBox").value();
        var NumControl = $("#InputNumeroControl").val();

        AjaxGetListaElementos(proyectoID, NumControl);
    });
};

function SuscribirEventoAplicar() {
    $('#ButtonPlanchar').click(function (e) {
        var Check = $("#InputSeleccionTodos")[0].checked;
        
        var ds = $("#grid").data("kendoGrid").dataSource;

        aplicarPlanchado(ds._data, Check);

        ds.sync();
    });
};

function Limpiar() {
    $("#InputNumeroControl").val("");

    $("#grid").data('kendoGrid').dataSource.data([]);
}

function opcionHabilitarView(valor, name) {
    if (valor) {
        $('#FieldSetView').find('*').attr('disabled', true);
        $("#Proyecto").data("kendoComboBox").enable(false);

        //$("#Fecha").data("kendoDatePicker").enable(false);
        $('#BotonGuardar').text("Editar");
        $("#DetalleAvisoLlegada0017").text("Editar");

        $("#BotonGuardar2").text("Editar");
        $('#BotonGuardar').text("Editar");
        $('#BotonGuardar4').text("Editar");
        $('#BotonGuardar3').text("Editar");
    }
    else {
        $('#FieldSetView').find('*').attr('disabled', false);
        $("#Proyecto").data("kendoComboBox").enable(true);
        $('#BotonGuardar').text("Guardar");
        $("#DetalleAvisoLlegada0017").text("Guardar");

        $("#BotonGuardar2").text("Guardar");
        $('#BotonGuardar').text("Guardar");
        $('#BotonGuardar4').text("Guardar");
        $('#BotonGuardar3').text("Guardar");
    }
}