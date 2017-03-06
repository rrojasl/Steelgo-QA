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
    suscribirEventoSepararRequisicion();
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
            AjaxCargarElementosTurnoAsignados(dataItem.RequisicionID, dataItem.CapacidadTurnoEquipoID, dataItem.CapacidadTurnoProveedorID, dataItem);
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
            if (dataItem != undefined) {
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


function suscribirEventoSepararRequisicion() {

    $("#SepararRequisicion").click(function () {



        var modalTitle = "";
        modalTitle = _dictionary.MensajeNuevaRequisicion[$("#language").data("kendoDropDownList").value()];
        var ventanaConfirm = $("#ventanaConfirm");
        var window = ventanaConfirm.kendoWindow({
            modal: true,
            title: modalTitle,
            resizable: false,
            visible: true,
            width: "40%",
            minWidth: 30,
            position: {
                top: "1%",
                left: "1%"
            },
            animation: false,
            actions: []

        }).data("kendoWindow");

        window.content('<div id="ventanaConfirm" z-index: inherit">' +
                            '<div class="col-sm-11 col-md-11 col-lg-11">' +
                                '<div class="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12">' +
                                    '<label id=""><span>' + _dictionary.lblRequisicion1[$("#language").data("kendoDropDownList").value()] + '</span></label>' +
                                    '<input id="NombreRequisicion" class="form-control" />' +
                                '</div>' +
                                '<div class="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12">' +
                                    '<label id=""><span>' + _dictionary.lblNumeroClienteRequisicion[$("#language").data("kendoDropDownList").value()] + '</span></label>' +
                                    '<input id="CodigoAsme" class="form-control"  />' +
                                '</div>' +
                                '<div class="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12">' +
                                    '<label id=""><span>' + _dictionary.lblFechaRequisicion[$("#language").data("kendoDropDownList").value()] + '</span></label>' +
                                    '<input id="FechaRequisicion" class="form-control"/>' +
                                '</div>' +

                                '<div class="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12">' +
                                    '<label id=""><span>' + _dictionary.lblObservacion[$("#language").data("kendoDropDownList").value()] + '</span></label>' +
                                    '<input id="Observacion" class="form-control" />' +
                                '</div>' +
                                '<div class="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12">' +
                                    '<center><button class="btn btn-blue" id="YesButton">' + _dictionary.botonGuardar[$("#language").data("kendoDropDownList").value()] + '</button>&nbsp;<button class="btn btn-blue" id="NoButton"> ' + _dictionary.botonCancelar[$("#language").data("kendoDropDownList").value()] + '</button></center>' +
                                '</div>' +
                            '</div>' +
                        '</div>');

        ventanaConfirm.data("kendoWindow").title(modalTitle);


        var idFechaRequisicion = 2047;
        $CamposPredeterminados.CamposPredeterminados.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), id: idFechaRequisicion }).done(function (data) {
            $("#FechaRequisicion").val(data);
        });


        ventanaConfirm.data("kendoWindow").center().open();

        $("#YesButton").click(function (handler) {
            Captura[0].Requisicion = $("#NombreRequisicion").val();
            //Captura[0].CodigoAsme = $("#CodigoAsme").val();
            Captura[0].Observacion = $("#Observacion").val();
            Captura[0].FechaRequisicion = $("#FechaRequisicion").val();

            $RequisicionPND.RequisicionPND.create(Captura[0], { token: Cookies.get("token") }).done(function (data) {
                if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "Ok") {
                    if (data.ReturnMessage[1] != undefined) {
                        if (tipoGuardar == 1) {
                            Limpiar();
                            opcionHabilitarView(false, "FieldSetView");
                        }
                        else {
                            $('input[name="Muestra"][value="SinCaptura"]').prop('checked', true);
                            AjaxGetGuardado(data.ReturnMessage[1]);
                            opcionHabilitarView(true, "FieldSetView");
                        }

                        displayNotify("EntregaPlacasGraficasMensajeGuardadoExistoso", "", "0");
                    }
                }
                else {
                    opcionHabilitarView(false, "FieldSetView");
                    mensaje = "La requisición: " + Captura[0].Requisicion + " ya existe, por favor asigne otro nombre";
                    displayNotify("", mensaje, '1');
                }
            });

            window.close();
        });
        $("#NoButton").click(function (handler) {
            window.close();
        });

    });
}