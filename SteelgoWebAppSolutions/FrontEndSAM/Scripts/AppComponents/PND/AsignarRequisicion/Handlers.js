function SuscribirEventos() {
    SuscribirEventoComboPrueba();
    suscribirEventoGuardar();
    suscribirEventoChangeRadio();
    suscribirEventoJuntas();
    SuscribirEventoCerrarPopUpJuntas();
    SuscribirEventoComboProyecto();
    SuscribirEventoComboProveedor();
    SuscribirEventoComboEquipo();
    SuscribirEventoComboTurno();
    SuscribirEventoComboRequisicion();
    suscribirEventoElementosAsignados();
    suscribirEventoPlanchado();
};

function suscribirEventoPlanchado() {
    $('#ButtonPlanchar').click(function (e) {
        e.preventDefault();
        var ds = $("#grid").data("kendoGrid").dataSource;

        if (ds._data.length > 0) {
            if ($('input:radio[name=Planchar]:checked').val() === "Todos") {
                
                ventanaConfirm = $("#ventanaConfirm").kendoWindow({
                    iframe: true,
                    title: _dictionary.EntregaPlacasGraficasTituloPopup[$("#language").data("kendoDropDownList").value()],
                    visible: false, //the window will not appear before its .open method is called
                    width: "auto",
                    height: "auto",
                    modal: true,
                    animation: {
                        close: false,
                        open: false
                    }
                }).data("kendoWindow");

                ventanaConfirm.content(_dictionary.EntregaPlacasGraficasPlancharTodos[$("#language").data("kendoDropDownList").value()] +
                             "</br><center><button class='confirm_yes btn btn-blue' id='yesButton'>Si</button><button class='confirm_yes btn btn-blue' id='noButton'> No</button></center>");

                ventanaConfirm.open().center();

                $("#yesButton").click(function (handler) {
                    if ($("#inputProveedor").val() != "") PlanchaProveedor();
                    if ($("#inputEquipo").val() != "") PlanchaEquipo();
                    if ($("#inputTurno").val() != "") PlanchaTurno();
                    ventanaConfirm.close();
                });
                $("#noButton").click(function (handler) {
                    ventanaConfirm.close();
                });
            }
            else {
                if ($("#inputProveedor").val() != "") PlanchaProveedor();
                if ($("#inputEquipo").val() != "") PlanchaEquipo();
                if ($("#inputTurno").val() != "") PlanchaTurno();

            }
        }
    });

}

function suscribirEventoJuntas() {

    $(document).on('click', '.EnlaceDetalleJuntas', function (e) {
        e.preventDefault();

        if ($('#botonGuardar').text() == _dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]) {

            var grid = $("#grid").data("kendoGrid"),
            dataItem = grid.dataItem($(e.target).closest("tr"));
            LlenarGridPopUp(dataItem);
        }
    });
}

function suscribirEventoElementosAsignados() {

    $(document).on('click', '.EnlaceDetalleElementosAsignados', function (e) {
        e.preventDefault();

        if ($('#botonGuardar').text() == _dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]) {

            var grid = $("#grid").data("kendoGrid"),
            dataItem = grid.dataItem($(e.target).closest("tr"));
            LlenarGridPopUpElementosAsignados(dataItem);
        }
    });
}



function SuscribirEventoCerrarPopUpJuntas() {
    $("#CerrarDetalleJunta").click(function (e) {
        e.preventDefault();

        $("#windowGrid").data("kendoWindow").close();
    });
}


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
        dataTextField: "Nombre",
        dataValueField: "TipoPruebaID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            dataItem = this.dataItem(e.sender.selectedIndex);
            if (dataItem != undefined) {
                AjaxCargarRequisicionAsignacion();
                var RequiereEquipo = $('#inputPrueba').data("kendoComboBox").dataSource._data[$('#inputPrueba').data("kendoComboBox").selectedIndex].RequiereEquipo;
                if (!RequiereEquipo) {
                    $("#divEquipo").css('display', 'none');
                }
                else {
                    //$("#divEquipo").css('display', 'block');
                }

                $("#inputTurno").data("kendoComboBox").setDataSource();
                $("#inputTurno").data("kendoComboBox").text("");
                $("#inputEquipo").data("kendoComboBox").setDataSource();
                $("#inputEquipo").data("kendoComboBox").text("");
                $("#inputProveedor").data("kendoComboBox").setDataSource();
                $("#inputProveedor").data("kendoComboBox").text("");
            }
            else {
                $("#inputPrueba").data("kendoComboBox").text("");
                //$("#divEquipo").css('display', 'block');

                $("#inputTurno").data("kendoComboBox").setDataSource();
                $("#inputTurno").data("kendoComboBox").text("");

                $("#inputEquipo").data("kendoComboBox").setDataSource();
                $("#inputEquipo").data("kendoComboBox").text("");
                $("#inputProveedor").data("kendoComboBox").setDataSource();
                $("#inputEquipo").data("kendoComboBox").text("");
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
                var RequiereEquipo = $('#inputPrueba').data("kendoComboBox").dataSource._data[$('#inputPrueba').data("kendoComboBox").selectedIndex].RequiereEquipo;
                if (!RequiereEquipo) {
                    AjaxObtenerTurno();

                }
                else {
                    AjaxObtenerEquipo();

                }

                $("#inputTurno").data("kendoComboBox").setDataSource();
                $("#inputTurno").data("kendoComboBox").text("");
                $("#inputEquipo").data("kendoComboBox").setDataSource();
                $("#inputEquipo").data("kendoComboBox").text("");

            }
            else {
                $("#inputProveedor").data("kendoComboBox").value("");

                $("#inputTurno").data("kendoComboBox").setDataSource();
                $("#inputTurno").data("kendoComboBox").text("");
                $("#inputEquipo").data("kendoComboBox").setDataSource();
                $("#inputEquipo").data("kendoComboBox").text("");

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
        dataTextField: "Nombre",
        dataValueField: "RequisicionID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            dataItem = this.dataItem(e.sender.selectedIndex);
            if (dataItem != undefined || dataItem.Nombre != "") {
                
            }
            else {
                $("#inputRequisicion").data("kendoComboBox").value("");

            }
        }
    });

};



function SuscribirEventoComboEquipo() {
    $('#inputEquipo').kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "EquipoID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            dataItem = this.dataItem(e.sender.selectedIndex);
            if (dataItem != undefined) {
                AjaxObtenerTurno();
                $("#inputTurno").data("kendoComboBox").setDataSource();
                $("#inputTurno").data("kendoComboBox").value("");
            }
            else {
                $("#inputEquipo").data("kendoComboBox").value("");
                $("#inputTurno").data("kendoComboBox").setDataSource();
                $("#inputTurno").data("kendoComboBox").value("");

            }
        }
    });

};

function SuscribirEventoComboTurno() {
    $('#inputTurno').kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "TurnoLaboralID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            dataItem = this.dataItem(e.sender.selectedIndex);
            if (dataItem != undefined) {


            }
            else {
                $("#inputTurno").data("kendoComboBox").value("");

            }
        }
    });

};


function SuscribirEventoComboRequisicion() {
    $('#inputRequisicion').kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "RequisicionID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            dataItem = this.dataItem(e.sender.selectedIndex);
            if (dataItem != undefined) {
                AjaxCargarRequisicionAsignacion();

                $("#inputPrueba").data("kendoComboBox").setDataSource();
                $("#inputPrueba").data("kendoComboBox").text("");

                $("#inputTurno").data("kendoComboBox").setDataSource();
                $("#inputTurno").data("kendoComboBox").text("");

                $("#inputEquipo").data("kendoComboBox").setDataSource();
                $("#inputEquipo").data("kendoComboBox").text("");

                $("#inputProveedor").data("kendoComboBox").setDataSource();
                $("#inputProveedor").data("kendoComboBox").text("");
            }
            else {
                $("#inputRequisicion").data("kendoComboBox").value("");

                $("#inputPrueba").data("kendoComboBox").setDataSource();
                $("#inputPrueba").data("kendoComboBox").text("");

                $("#inputTurno").data("kendoComboBox").setDataSource();
                $("#inputTurno").data("kendoComboBox").text("");

                $("#inputEquipo").data("kendoComboBox").setDataSource();
                $("#inputEquipo").data("kendoComboBox").text("");

                $("#inputProveedor").data("kendoComboBox").setDataSource();
                $("#inputProveedor").data("kendoComboBox").text("");
            }
        }
    });

};


function Limpiar() {
    $("#inputProveedor").data("kendoComboBox").value("")
    AjaxCargarCamposPredeterminados();
    //AjaxPruebas();

    $("#grid").data('kendoGrid').dataSource.data([]);
}



function suscribirEventoGuardar() {
    $('#Guardar').click(function (e) {
        e.preventDefault();
        var ds = $("#grid").data("kendoGrid").dataSource;
        if ($('#botonGuardar').text() == "Guardar") {
            // opcionHabilitarView(true, "FieldSetView");
            AjaxGuardarCaptura(ds._data, 0);
        }
        else if ($('#botonGuardar').text() == "Editar")
            opcionHabilitarView(false, "FieldSetView")
    });

    $('#btnGuardar').click(function (e) {
        e.preventDefault();
        var ds = $("#grid").data("kendoGrid").dataSource;
        if ($('#botonGuardar').text() == "Guardar") {
            //opcionHabilitarView(true, "FieldSetView");
            AjaxGuardarCaptura(ds._data, 0);
        }
        else if ($('#botonGuardar').text() == "Editar")
            opcionHabilitarView(false, "FieldSetView")
    });

    $('#btnGuardarYNuevo').click(function (e) {
        e.preventDefault();
        var ds = $("#grid").data("kendoGrid").dataSource;
        AjaxGuardarCaptura(ds._data, 1);
        //Limpiar();
    });


    $('#GuardarPie').click(function (e) {
        e.preventDefault();
        var ds = $("#grid").data("kendoGrid").dataSource;
        if ($('#botonGuardar').text() == "Guardar") {
            // opcionHabilitarView(true, "FieldSetView");
            AjaxGuardarCaptura(ds._data, 0);
        }
        else if ($('#botonGuardar').text() == "Editar")
            opcionHabilitarView(false, "FieldSetView")
    });

    $('#btnGuardar1').click(function (e) {
        e.preventDefault();
        var ds = $("#grid").data("kendoGrid").dataSource;
        if ($('#botonGuardar').text() == "Guardar") {
            //opcionHabilitarView(true, "FieldSetView");
            AjaxGuardarCaptura(ds._data, 0);
        }
        else if ($('#botonGuardar').text() == "Editar")
            opcionHabilitarView(false, "FieldSetView")
    });

    $('#btnGuardarYNuevo1').click(function (e) {
        e.preventDefault();
        var ds = $("#grid").data("kendoGrid").dataSource;
        AjaxGuardarCaptura(ds._data, 1);
        //Limpiar();
    });
}

function opcionHabilitarView(valor, name) {

    if (valor) {
        $('#FieldSetView').find('*').attr('disabled', true);
        $("#inputPrueba").data("kendoComboBox").enable(false);


        $('#botonGuardar2').text(_dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]);
        $("#botonGuardar").text(_dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]);
        $("#botonGuardar3").text(_dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]);
        $('#botonGuardar4').text(_dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]);

    }
    else {
        $('#FieldSetView').find('*').attr('disabled', false);
        $("#inputPrueba").data("kendoComboBox").enable(true);

        $('#botonGuardar2').text(_dictionary.botonGuardar[$("#language").data("kendoDropDownList").value()]);
        $("#botonGuardar").text(_dictionary.botonGuardar[$("#language").data("kendoDropDownList").value()]);
        $("#botonGuardar3").text(_dictionary.botonGuardar[$("#language").data("kendoDropDownList").value()]);
        $('#botonGuardar4').text(_dictionary.botonGuardar[$("#language").data("kendoDropDownList").value()]);


    }
}