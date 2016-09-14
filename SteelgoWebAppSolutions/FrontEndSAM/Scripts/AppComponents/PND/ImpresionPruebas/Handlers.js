

function SuscribirEventos() {
    suscribirEventoChangeRadio();
    suscribirEventoGenerarReporte();
    suscribirEventoImprimir();
    SuscribirEventoComboProyecto();
    SuscribirEventoComboPrueba();
    SuscribirEventoComboProveedor();
    SuscribirEventoComboRequisicion();
    SuscribirEventoPlanchado();
};

function SuscribirEventoPlanchado() {
    $("#ButtonPlanchar").click(function () {
        ventanaConfirm = $("#ventanaConfirm").kendoWindow({
            iframe: true,
            title: _dictionary.EntregaPlacasGraficasTituloPopup[$("#language").data("kendoDropDownList").value()],
            visible: false,
            width: "auto",
            height: "auto",
            modal: true,
            animation: false
        }).data("kendoWindow");

        ventanaConfirm.content(_dictionary.EntregaPlacasGraficasPlancharTodos[$("#language").data("kendoDropDownList").value()] +
                     "</br><center><button class='confirm_yes btn btn-blue' id='yesButton'>Si</button><button class='confirm_yes btn btn-blue' id='noButton'> No</button></center>");

        ventanaConfirm.open().center();

        $("#yesButton").click(function (handler) {
            var elementoPlanchado = $("#seleccionarTodos").is(':checked');
            seleccionarTodo(elementoPlanchado);
            ventanaConfirm.close();
        });
        $("#noButton").click(function (handler) {
            ventanaConfirm.close();
        });
    });
}


function suscribirEventoGenerarReporte() {
    $('#Guardar').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        if ($('#botonGuardar').text() == "Guardar") {
            // opcionHabilitarView(true, "FieldSetView");
            AjaxGenerarReporte(ds._data);
        }
        else if ($('#botonGuardar').text() == "Editar")
            opcionHabilitarView(false, "FieldSetView")
    });

    $('#btnGuardar').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        if ($('#botonGuardar').text() == "Guardar") {
            //opcionHabilitarView(true, "FieldSetView");
            AjaxGenerarReporte(ds._data);
        }
        else if ($('#botonGuardar').text() == "Editar")
            opcionHabilitarView(false, "FieldSetView")
    });

    $('#btnGuardarYNuevo').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        AjaxGenerarReporte(ds._data);
        //Limpiar();
    });


    $('#GuardarPie').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        if ($('#botonGuardar').text() == "Guardar") {
            // opcionHabilitarView(true, "FieldSetView");
            AjaxGenerarReporte(ds._data);
        }
        else if ($('#botonGuardar').text() == "Editar")
            opcionHabilitarView(false, "FieldSetView")
    });

    $('#btnGuardar1').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        if ($('#botonGuardar').text() == "Guardar") {
            //opcionHabilitarView(true, "FieldSetView");
            AjaxGenerarReporte(ds._data);
        }
        else if ($('#botonGuardar').text() == "Editar")
            opcionHabilitarView(false, "FieldSetView")
    });

    $('#btnGuardarYNuevo1').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        AjaxGenerarReporte(ds._data);
        //Limpiar();
    });

}

function suscribirEventoImprimir() {
    $('#Imprimir').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        AjaxImprimir(ds._data);
    });
}

function suscribirEventoChangeRadio() {
    $('input:radio[name=Muestra]:nth(0)').change(function () {
        AjaxCargarDatos();
    });
    $('input:radio[name=Muestra]:nth(1)').change(function () {
        AjaxCargarDatos();
    });
}

function SuscribirEventoComboPrueba() {
    $('#inputPrueba').kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "TipoPruebaID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            dataItem = this.dataItem(e.sender.selectedIndex);
            if (dataItem != undefined) {
                AjaxObtenerProveedor();
            }
            else {
                $("#inputPrueba").data("kendoComboBox").value("");
            }
        }
    });

};


function SuscribirEventoComboProveedor() {
    $('#inputProveedor').kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "ProveedorID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            dataItem = this.dataItem(e.sender.selectedIndex);
            if (dataItem != undefined) {
                AjaxRequisicion();
            }
            else {
                $("#inputProveedor").data("kendoComboBox").value("");
            }
        }
    });

};




function SuscribirEventoComboProyecto() {
    $('#inputProyecto').kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "ProyectoID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            dataItem = this.dataItem(e.sender.selectedIndex);
            if (dataItem != undefined || dataItem.Nombre != "") {
                AjaxPruebas();
            }
            else {
                $("#inputProyecto").data("kendoComboBox").value("");

            }
        }
    });

};


function SuscribirEventoComboRequisicion() {
    $('#inputRequisicion').kendoComboBox({
        suggest: true,
        delay: 10,
        filter: "contains",
        autoBind: false,
        dataTextField: "NombreRequisicion",
        dataValueField: "RequisicionID",
        change: function (e) {
            dataItem = this.dataItem(e.sender.selectedIndex);
            if (dataItem != undefined) {
                AjaxCargarDatos();
            }
            else {
                $("#inputRequisicion").data("kendoComboBox").value("");

            }
        }
    });

};
