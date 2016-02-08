function SuscribirEventos() {
    SuscribirEventoComboPrueba();
    SuscribirEventoComboProveedor();
    suscribirEventoGuardar();
    suscribirEventoChangeRadio();
};
function suscribirEventoChangeRadio() {
    $('input:radio[name=Muestra]:nth(0)').change(function () {
       
            AjaxCargarRequisicionAsignacion();
        
    });
    $('input:radio[name=Muestra]:nth(1)').change(function () {
       
            AjaxCargarRequisicionAsignacion();
        
    });

}

function SuscribirEventoComboPrueba() {
    $('#inputPrueba').kendoComboBox({
        dataTextField: "Clave",
        dataValueField: "PruebasID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function () {
            AjaxProveedor(0);
        }
    });
    AjaxPruebas();
};

function SuscribirEventoComboProveedor() {
    $('#inputProveedor').kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "ProveedorID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function () {
           
            AjaxCargarRequisicionAsignacion();
        },
        dataBound: function () {
            $(this.items()).each(function (index, item) {
                var model = $("#inputProveedor").data("kendoComboBox").dataItem(index);


                $(item).attr("title",replaceAll( model.Capacidad,'°','\n'));
            });
        }
    });

    $('#inputProveedor').closest('.k-widget').keydown(function (e) {
        if (e.keyCode == 13) {
            PlanchaProveedor();
        }
    });
   
};

function suscribirEventoGuardar() {
    
    Guardar
    
    
    $('#Guardar').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        if ($('#botonGuardar').text() == "Guardar") {
            opcionHabilitarView(true, "FieldSetView");
        AjaxGuardarCaptura(ds._data);
        }
        else if ($('#botonGuardar').text() == "Editar")
            opcionHabilitarView(false, "FieldSetView")
    });

    $('#btnGuardar').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        if ($('#botonGuardar').text() == "Guardar") {
            opcionHabilitarView(true, "FieldSetView");
            AjaxGuardarCaptura(ds._data);
        }
        else if ($('#botonGuardar').text() == "Editar")
            opcionHabilitarView(false, "FieldSetView")
    });

    $('#btnGuardarYNuevo').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        AjaxGuardarCaptura(ds._data);
        Limpiar();
    });
    $('#Guardar4').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        if ($('#botonGuardar').text() == "Guardar") {
            opcionHabilitarView(true, "FieldSetView");
            AjaxGuardarCaptura(ds._data);
        }
        else if ($('#botonGuardar').text() == "Editar")
            opcionHabilitarView(false, "FieldSetView")
    });

    $('#btnGuardar1').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        if ($('#botonGuardar').text() == "Guardar") {
            opcionHabilitarView(true, "FieldSetView");
            AjaxGuardarCaptura(ds._data);
        }
        else if ($('#botonGuardar').text() == "Editar")
            opcionHabilitarView(false, "FieldSetView")
    });

    $('#btnGuardarYNuevo1').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        AjaxGuardarCaptura(ds._data);
        Limpiar();
    });
}

function opcionHabilitarView(valor, name) {

    if (valor) {
        $('#FieldSetView').find('*').attr('disabled', true);
        $("#inputPrueba").data("kendoComboBox").enable(false);
        $("#inputProveedor").data("kendoComboBox").enable(false);
        
        $('#botonGuardar2').text("Editar");
        $("#botonGuardar").text("Editar");

        $("#CapturaSoldaduraGuardar").text("Editar");
        $('#btnGuardarPiePagina').text("Editar");


    }
    else {
        $('#FieldSetView').find('*').attr('disabled', false);
        $("#inputPrueba").data("kendoComboBox").enable(true);
        $("#inputProveedor").data("kendoComboBox").enable(true);

        $('#botonGuardar2').text("Guardar");
        $("#botonGuardar").text("Guardar");

        $("#CapturaSoldaduraGuardar").text("Guardar");
        $('#btnGuardarPiePagina').text("Guardar");

    }
}