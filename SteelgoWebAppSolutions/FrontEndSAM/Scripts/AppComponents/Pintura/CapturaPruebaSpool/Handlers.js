function SuscribirEventos() {
    SuscribirEventoProyecto();
    SuscribirEventoSistemaPintura();
    SuscribirEventoProceso();
    SuscribirEventoPrueba();
    SuscribirEventoSpoolID();
    SuscribirEventoBuscar();
    SuscribirEventoGuardar();
}

function SuscribirEventoSistemaPintura() {
    $("#inputSistemaPintura").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "SistPintID",
        suggest: true,
        delay: 10,
        filter: "contains",
        index: 3

    });
}

function SuscribirEventoProyecto() {
    $("#inputProyecto").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "Proyecto",
        suggest: true,
        delay: 10,
        filter: "contains",
        index: 3

    });

}

function SuscribirEventoProceso() {

    $('#inputProceso').kendoComboBox({
        dataTextField: "ProcesoPintura",
        dataValueField: "ProcesoPinturaID ",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) { }
    });
}

function SuscribirEventoPrueba() {

    $('#inputPrueba').kendoComboBox({
        dataTextField: "Prueba",
        dataValueField: "PruebaID ",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) { }
    });
}

function SuscribirEventoSpoolID() {
    $('#InputID').kendoComboBox({
        dataTextField: "Spool",
        dataValueField: "SpoolID ",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) { }
    });
}

function SuscribirEventoBuscar() {

    $('#btnBuscar').click(function (e) {

        llenarGrid();

    });



}





function SuscribirEventoGuardar() {



    $('#btnGuardarYNuevo').click(function (e) {

        //ajaxGuardar($("#grid").data("kendoGrid").dataSource._data);

        Limpiar();

    });



    $('#btnGuardar').click(function (e) {



        if ($('#botonGuardar').text() == "Guardar") {

            opcionHabilitarView(true, "FieldSetView");

            //ajaxGuardar($("#grid").data("kendoGrid").dataSource._data);

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

function suscribirEventoElementosAsignados() {

    $(document).on('click', '.EnlaceDetallePrueba', function (e) {
        e.preventDefault();

        //if ($('#BotonGuardar').text() == _dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]) {

        var grid = $("#grid").data("kendoGrid"),
        dataItem = grid.dataItem($(e.target).closest("tr"));
        LlenarGridPopUp();
        //}
    });
}