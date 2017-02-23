function SuscribirEventos() {
    //SuscribirEventoProyecto();
    //SuscribirEventoSistemaPintura();
    SuscribirEventoProceso();
    SuscribirEventoPrueba();
    SuscribirEventoSpoolID();
    SuscribirEventoSpoolIDAgregar();
    SuscribirEventoBuscar();
    SuscribirEventoGuardar();
    SuscribirEventoAgregarPrueba();
    
}


//function SuscribirEventoSistemaPintura() {
//    $("#inputSistemaPintura").kendoComboBox({
//        dataTextField: "Nombre",
//        dataValueField: "SistPintID",
//        suggest: true,
//        delay: 10,
//        filter: "contains",
//        index: 3

//    });
//}

//function SuscribirEventoProyecto() {
//    $("#inputProyecto").kendoComboBox({
//        dataTextField: "Nombre",
//        dataValueField: "Proyecto",
//        suggest: true,
//        delay: 10,
//        filter: "contains",
//        index: 3

//    });

//}

function SuscribirEventoProceso() {

    $('#inputProceso').kendoComboBox({
        dataTextField: "ProcesoPintura",
        dataValueField: "ProcesoPinturaID ",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {

            $("#inputPrueba").data("kendoComboBox").value(1);
            $("#inputPrueba").data("kendoComboBox").trigger("change");

        }
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
        dataTextField: "IDValido",
        dataValueField: "Valor ",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) { }
    });

    $("#InputOrdenTrabajo").blur(function (e) {
        if ($("#InputOrdenTrabajo").val() != "") {
            if ($("#InputOrdenTrabajo").val().match("^[a-zA-Z][0-9]*$")) {
                try {
                    AjaxObtenerSpoolID();
                } catch (e) {
                    displayNotify("", e.message, '2');
                }
            } else {
                $("#InputOrdenTrabajo").val("");
                displayNotify("PinturaCargaMensajeOrdenTrabajo", "", '1');
            }
        }
    });

}

function SuscribirEventoSpoolIDAgregar() {
    $('#InputID1').kendoComboBox({
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
        $("#detalleSpool").css("display", "block");
        llenarGrid();
    });
}

function SuscribirEventoAgregarPrueba() {
    $('#btnAgregar').click(function (e) {
       
            var ds = $("#grid").data("kendoGrid").dataSource;
            var array = [
                  {
                      Accion: 1,
                      FechaPrueba: new Date(),
                      ValorUnidadMedida: 0,
                      Aprobado: ""
                  }
            ];
            ds.insert(0, array[0]);
            ds.sync();

        
    });
};





function SuscribirEventoGuardar() {



    $('#btnGuardarYNuevo').click(function (e) {

        //ajaxGuardar($("#grid").data("kendoGrid").dataSource._data);

        Limpiar();

    });



    $('#Guardar').click(function (e) {



        if ($('#Guardar').text() == "Guardar") {

            convertirImagen();
            ajaxGuardar($("#grid").data("kendoGrid").dataSource._data);

        }

        else if ($('#Guardar').text() == "Editar")

            opcionHabilitarView(false, "FieldSetView")

    });

};



function opcionHabilitarView(valor, name) {
    if (valor) {
        $('#FieldSetView').find('*').attr('disabled', true);
        $('#Guardar').text("Editar");
        $('#GuardarPie').text("Editar");
        
        $("#DetalleAvisoLlegada0017").text("Editar");
    }
    else {
        $('#FieldSetView').find('*').attr('disabled', false);
        $('#Guardar').text("Guardar");
        $('#GuardarPie').text("Editar");
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