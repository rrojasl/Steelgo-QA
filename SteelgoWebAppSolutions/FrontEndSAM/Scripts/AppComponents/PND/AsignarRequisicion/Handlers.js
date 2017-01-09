var proyectoInicial = 0;
var pruebaOriginal = 0;
var requisicionOriginal = 0;

function SuscribirEventos() {
    SuscribirEventoComboPrueba();
    suscribirEventoGuardar();
    
    suscribirEventoJuntas();
    SuscribirEventoCerrarPopUpJuntas();
    SuscribirEventoComboProyecto();
    SuscribirEventoComboRequisicion();
    suscribirEventoElementosAsignados();
    suscribirEventoReady();
};

function suscribirEventoReady() {
    $(document).on('ready', function () {
        var requisicionID = getParameterByName('requisicion');
        if (requisicionID == null) {
            AjaxCargarCamposPredeterminados(true);
            
        } else {
            AjaxCargarCamposPredeterminados(false);
            AjaxObtenerElementoRequisicion(requisicionID)
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
            AjaxCargarElementosTurnoAsignados(dataItem.RequisicionID, dataItem.CapacidadTurnoEquipoID, dataItem.CapacidadTurnoProveedorID,dataItem);
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
            if (!editado) {
                if (dataItem != undefined) {
                    $("#inputRequisicion").data("kendoComboBox").setDataSource();
                    $("#inputRequisicion").data("kendoComboBox").value("");
                    $("#inputRequisicion").data("kendoComboBox").dataSource.data([]);
                    AjaxRequisicion();
                    pruebaOriginal = $("#inputPrueba").data("kendoComboBox").value();
                    if (dataItem.Nombre == "") {
                        $("#grid").data("kendoGrid").dataSource.data([]);
                    }
                }
                else {
                    $("#inputRequisicion").data("kendoComboBox").setDataSource();
                    $("#inputRequisicion").data("kendoComboBox").value("");
                    $("#inputRequisicion").data("kendoComboBox").dataSource.data([]);
                    $("#grid").data("kendoGrid").dataSource.data([]);
                }
            }
            else {
                var ventanaConfirm = $("#ventanaConfirmCaptura").kendoWindow({
                    iframe: true,
                    title: _dictionary.EntregaPlacasGraficasTituloPopup[$("#language").data("kendoDropDownList").value()],
                    visible: false,
                    width: "auto",
                    height: "auto",
                    modal: true,
                    animation: {
                        close: function () {
                            $("#inputPrueba").data("kendoComboBox").value(pruebaOriginal);
                        },
                        open: false
                    },
                    actions: [
                        "Close"
                    ]
                }).data("kendoWindow");

                ventanaConfirm.content(_dictionary.EntregaPlacasGraficasMensajeDatosCapturadosNoGuardados[$("#language").data("kendoDropDownList").value()] +
                    "</br><center><button class='btn btn-blue' id='yesButtonProy'>" + _dictionary.EntregaPlacasGraficasbotonSi + "</button><button class='btn btn-blue' id='noButtonProy'>" + _dictionary.EntregaPlacasGraficasbotonNo + "</button></center>");

                ventanaConfirm.open().center();
                $("#yesButtonProy").click(function () {
                    if (dataItem != undefined) {
                        $("#inputRequisicion").data("kendoComboBox").setDataSource();
                        $("#inputRequisicion").data("kendoComboBox").value("");
                        $("#inputRequisicion").data("kendoComboBox").dataSource.data([]);
                        AjaxRequisicion();
                        pruebaOriginal = $("#inputPrueba").data("kendoComboBox").value();
                        if (dataItem.Nombre == "") {
                            $("#grid").data("kendoGrid").dataSource.data([]);
                        }
                    }
                    else {
                        $("#inputPrueba").data("kendoComboBox").text("");
                        $("#inputRequisicion").data("kendoComboBox").setDataSource();
                        $("#inputRequisicion").data("kendoComboBox").value("");
                        $("#inputRequisicion").data("kendoComboBox").dataSource.data([]);
                        $("#grid").data("kendoGrid").dataSource.data([]);
                    }
                    ventanaConfirm.close();

                });
                $("#noButtonProy").click(function () {
                    $("#inputPrueba").data("kendoComboBox").value(pruebaOriginal);
                    ventanaConfirm.close();
                });
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
                if (!editado) {
                    AjaxPruebas();
                    $("#inputRequisicion").data("kendoComboBox").setDataSource();
                    $("#inputRequisicion").data("kendoComboBox").value("");
                    $("#inputRequisicion").data("kendoComboBox").dataSource.data([]);
                    $("#inputPrueba").data("kendoComboBox").setDataSource();
                    $("#inputPrueba").data("kendoComboBox").value("");
                    $("#inputPrueba").data("kendoComboBox").dataSource.data([]);
                    proyectoInicial = $("#inputProyecto").data("kendoComboBox").value();

                }
                else {
                    var ventanaConfirm = $("#ventanaConfirmCaptura").kendoWindow({
                        iframe: true,
                        title: _dictionary.EntregaPlacasGraficasTituloPopup[$("#language").data("kendoDropDownList").value()],
                        visible: false,
                        width: "auto",
                        height: "auto",
                        modal: true,
                        animation: {
                            close: function () {
                                $("#inputProyecto").data("kendoComboBox").value(proyectoInicial);
                            },
                            open: false
                        },
                        actions: [
                            "Close"
                        ]
                    }).data("kendoWindow");

                    ventanaConfirm.content(_dictionary.EntregaPlacasGraficasMensajeDatosCapturadosNoGuardados[$("#language").data("kendoDropDownList").value()] +
                        "</br><center><button class='btn btn-blue' id='yesButtonProy'>Si</button><button class='btn btn-blue' id='noButtonProy'>No</button></center>");

                    ventanaConfirm.open().center();
                    $("#yesButtonProy").click(function () {
                        AjaxPruebas();
                        $("#inputRequisicion").data("kendoComboBox").setDataSource();
                        $("#inputRequisicion").data("kendoComboBox").value("");
                        $("#inputRequisicion").data("kendoComboBox").dataSource.data([]);
                        $("#inputPrueba").data("kendoComboBox").setDataSource();
                        $("#inputPrueba").data("kendoComboBox").value("");
                        $("#inputPrueba").data("kendoComboBox").dataSource.data([]);
                        proyectoInicial = $("#inputProyecto").data("kendoComboBox").value();
                        ventanaConfirm.close();
                    });
                    $("#noButtonProy").click(function () {
                        $("#inputProyecto").data("kendoComboBox").value(proyectoInicial);
                        ventanaConfirm.close();
                    });
                }
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
            if (dataItem != undefined ) {
                if (!editado) {
                    
                    requisicionOriginal = $("#inputRequisicion").data("kendoComboBox").value();

                    AjaxCargarRequisicionAsignacion();
                }
                else {
                    var ventanaConfirm = $("#ventanaConfirmCaptura").kendoWindow({
                        iframe: true,
                        title: _dictionary.EntregaPlacasGraficasTituloPopup[$("#language").data("kendoDropDownList").value()],
                        visible: false,
                        width: "auto",
                        height: "auto",
                        modal: true,
                        animation: {
                            close: function () {
                                $("#inputProyecto").data("kendoComboBox").value($("#inputProyecto").attr("proyectoAntrior"));
                            },
                            open: false
                        },
                        actions: [
                            "Close"
                        ]
                    }).data("kendoWindow");

                    ventanaConfirm.content(_dictionary.EntregaPlacasGraficasMensajeDatosCapturadosNoGuardados[$("#language").data("kendoDropDownList").value()] +
                        "</br><center><button class='btn btn-blue' id='yesButtonProy'>Si</button><button class='btn btn-blue' id='noButtonProy'>No</button></center>");

                    ventanaConfirm.open().center();
                    $("#yesButtonProy").click(function () {
                        requisicionOriginal = $("#inputRequisicion").data("kendoComboBox").value();
                        AjaxCargarRequisicionAsignacion();
                        ventanaConfirm.close();
                    });
                    $("#noButtonProy").click(function () {
                        $("#inputRequisicion").data("kendoComboBox").value(requisicionOriginal);
                        ventanaConfirm.close();
                    });
                }
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
                $("#inputTurno").data("kendoComboBox").dataSource.data([]);
                $("#inputTurno").data("kendoComboBox").value("");
            }
            else {
                $("#inputEquipo").data("kendoComboBox").value("");
                $("#inputTurno").data("kendoComboBox").dataSource.data([]);
                $("#inputTurno").data("kendoComboBox").text("");

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
        $("#inputProyecto").data("kendoComboBox").enable(false);
        $("#inputRequisicion").data("kendoComboBox").enable(false);

        $('#botonGuardar2').text(_dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]);
        $("#botonGuardar").text(_dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]);
        $("#botonGuardar3").text(_dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]);
        $('#botonGuardar4').text(_dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]);

    }
    else {
        $('#FieldSetView').find('*').attr('disabled', false);
        $("#inputPrueba").data("kendoComboBox").enable(true);
        $("#inputProyecto").data("kendoComboBox").enable(true);
        $("#inputRequisicion").data("kendoComboBox").enable(true);

        $('#botonGuardar2').text(_dictionary.botonGuardar[$("#language").data("kendoDropDownList").value()]);
        $("#botonGuardar").text(_dictionary.botonGuardar[$("#language").data("kendoDropDownList").value()]);
        $("#botonGuardar3").text(_dictionary.botonGuardar[$("#language").data("kendoDropDownList").value()]);
        $('#botonGuardar4').text(_dictionary.botonGuardar[$("#language").data("kendoDropDownList").value()]);


    }
}