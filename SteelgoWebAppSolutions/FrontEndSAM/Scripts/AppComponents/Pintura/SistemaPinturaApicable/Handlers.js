﻿function SuscribirEventos() {
    SuscribirEventoProyecto();
    SuscribirEventoSistemaPintura();
    SuscribirEventoColor();
    SuscribirEventoPlanchado();
    SuscribirEventoTipoBusqueda();
    SuscribirEventoCargarCsv();
    SuscribirEventoBusqueda();
    SuscribirEventoGuardar();
    SuscribirEventoDescargarCsv();
}

function SuscribirEventoProyecto() {
    $("#inputProyecto").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "ProyectoID",
        suggest: true,
        delay: 10,
        filter: "contains",
        index: 3,
        change: function (e) {
            var dataItem = this.dataItem(e.sender.selectedIndex);
            if (!ValidaInformacionCapturada()) {
                LimpiaCargaProyecto();
                if (dataItem != undefined) {
                    $("#inputProyecto").attr("proyectoAntrior", dataItem.ProyectoID);
                    if (dataItem.ProyectoID != 0) {
                        AjaxCargarSistemaPintura(dataItem.ProyectoID);
                    }
                } else {
                    $("#inputProyecto").data("kendoComboBox").value("");
                }
            } else {
                var ventanaConfirm = $("#ventanaConfirmCaptura").kendoWindow({
                    iframe: true,
                    title: _dictionary.EntregaPlacasGraficasTituloPopup[$("#language").data("kendoDropDownList").value()],
                    visible: false,
                    width: "40%",
                    height: "auto",
                    draggable: false,
                    modal: true,
                    actions: [],
                    animation: {
                        open: false,
                        close: false
                    },
                }).data("kendoWindow");

                ventanaConfirm.content('<center>' + _dictionary.EntregaPlacasGraficasMensajeDatosCapturadosNoGuardados[$("#language").data("kendoDropDownList").value()] + '</center>' +
                    "</br><center><button class='btn btn-blue' id='yesButtonProy'>"+_dictionary.lblSi[$("#language").data("kendoDropDownList").value()]+"</button> <button class='btn btn-blue' id='noButtonProy'>"+_dictionary.lblNo[$("#language").data("kendoDropDownList").value()]+"</button></center>");

                ventanaConfirm.open().center();
                $("#yesButtonProy").click(function () {
                    LimpiaCargaProyecto();
                    if (dataItem != undefined) {
                        $("#inputProyecto").attr("proyectoAntrior", dataItem.ProyectoID);
                        if (dataItem.ProyectoID != 0) {
                            AjaxCargarSistemaPintura(dataItem.ProyectoID);
                        }
                    } else {
                        $("#inputProyecto").data("kendoComboBox").value("");
                    }
                    ventanaConfirm.close();
                });
                $("#noButtonProy").click(function () {
                    $("#inputProyecto").data("kendoComboBox").value($("#inputProyecto").attr("proyectoAntrior"));
                    ventanaConfirm.close();
                });
            }
        }
    });
}

function SuscribirEventoSistemaPintura() {
    $("#inputSistemaPintura").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "SistemaPinturaID",
        suggest: true,
        delay: 10,
        filter: "contains",
        index: 3,
        change: function (e) {
            var dataItem = this.dataItem(e.sender.selectedIndex);
            LimpiaCargaSP();
            if (dataItem != undefined) {
                if (dataItem.SistemaPinturaID != 0 && !dataItem.NoPintable) {
                    AjaxCargarColorPintura(dataItem.SistemaPinturaID);
                }
            } else {
                $("#inputSistemaPintura").data("kendoComboBox").value("");
            }
        }
    });
}

function SuscribirEventoColor() {
    $("#inputColorPintura").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "ColorPinturaID",
        suggest: true,
        delay: 10,
        filter: "contains",
        index: 3,
        change: function (e) {
            var dataItem = this.dataItem(e.sender.selectedIndex);

            if (dataItem != undefined) {

            } else {
                $("#inputColorPintura").data("kendoComboBox").value("");
            }
        }
    });
}

function SuscribirEventoPlanchado() {
    $("#btnPlanchar").click(function () {

        if ($("#grid").data("kendoGrid").dataSource._data.length > 0) {
            var tipoLlenado = $('input:radio[name=Planchar]:checked').val()
            if (tipoLlenado === "Todos") {
                ventanaConfirm = $("#ventanaConfirm").kendoWindow({
                    iframe: true,
                    title: _dictionary.EntregaPlacasGraficasTituloPopup[$("#language").data("kendoDropDownList").value()],
                    visible: false,
                    width: "25%",
                    height: "auto",
                    actions: [],
                    draggable: false,
                    modal: true,
                    animation: {
                        open: false,
                        close: false
                    },
                }).data("kendoWindow");

                ventanaConfirm.content('<center>' + _dictionary.EntregaPlacasGraficasPlancharTodos[$("#language").data("kendoDropDownList").value()] + '</center>' +
                             "</br><center><button class='confirm_yes btn btn-blue' id='yesButton'>" + _dictionary.lblSi[$("#language").data("kendoDropDownList").value()] + "</button>  <button class='confirm_yes btn btn-blue' id='noButton'>" + _dictionary.lblNo[$("#language").data("kendoDropDownList").value()] + "</button></center>");

                ventanaConfirm.open().center();

                $("#yesButton").click(function (handler) {
                    plancharTodo(tipoLlenado);
                    ventanaConfirm.close();
                });
                $("#noButton").click(function (handler) {
                    ventanaConfirm.close();
                });
            } else {
                plancharTodo(tipoLlenado);
            }
        }
    });
}

function SuscribirEventoTipoBusqueda() {
    $('#styleSpool').click(function (e) {
        if (!ValidaInformacionCapturada()) {
            $("#divSpool").show();
            $("#divNc").hide();
            LimpiaTipoBusqueda();
        } else {
            var ventanaConfirm = $("#ventanaConfirmCaptura").kendoWindow({
                iframe: true,
                title: _dictionary.EntregaPlacasGraficasTituloPopup[$("#language").data("kendoDropDownList").value()],
                visible: false,
                width: "40%",
                height: "auto",
                draggable: false,
                modal: true,
                actions: [],
                animation: {
                    open: false,
                    close: false
                },
            }).data("kendoWindow");

            ventanaConfirm.content('<center>' + _dictionary.EntregaPlacasGraficasMensajeDatosCapturadosNoGuardados[$("#language").data("kendoDropDownList").value()] + '</center>' +
                "</br><center><button class='btn btn-blue' id='yesButtonProy'>" + _dictionary.lblSi[$("#language").data("kendoDropDownList").value()] + "</button> <button class='btn btn-blue' id='noButtonProy'>" + _dictionary.lblNo[$("#language").data("kendoDropDownList").value()] + "</button></center>");

            ventanaConfirm.open().center();
            $("#yesButtonProy").click(function () {
                $("#divSpool").show();
                $("#divNc").hide();
                LimpiaTipoBusqueda();
                ventanaConfirm.close();
            });
            $("#noButtonProy").click(function () {
                $('#styleSpool').removeClass("active");
                $('#styleNc').addClass("active");
                ventanaConfirm.close();
            });
        }
    });
    $('#styleNc').click(function (e) {
        if (!ValidaInformacionCapturada()) {
            $("#divSpool").hide();
            $("#divNc").show();
            LimpiaTipoBusqueda();
        } else {
            var ventanaConfirm = $("#ventanaConfirmCaptura").kendoWindow({
                iframe: true,
                title: _dictionary.EntregaPlacasGraficasTituloPopup[$("#language").data("kendoDropDownList").value()],
                visible: false,
                width: "40%",
                height: "auto",
                draggable: false,
                modal: true,
                actions: [],
                animation: {
                    open: false,
                    close: false
                },
            }).data("kendoWindow");

            ventanaConfirm.content('<center>' + _dictionary.EntregaPlacasGraficasMensajeDatosCapturadosNoGuardados[$("#language").data("kendoDropDownList").value()] + '</center>' +
                "</br><center><button class='btn btn-blue' id='yesButtonProy'>" + _dictionary.lblSi[$("#language").data("kendoDropDownList").value()] + "</button> <button class='btn btn-blue' id='noButtonProy'>" + _dictionary.lblNo[$("#language").data("kendoDropDownList").value()] + "</button></center>");

            ventanaConfirm.open().center();
            $("#yesButtonProy").click(function () {
                $("#divSpool").hide();
                $("#divNc").show();
                LimpiaTipoBusqueda();
                ventanaConfirm.close();
            });
            $("#noButtonProy").click(function () {
                $('#styleSpool').addClass("active");
                $('#styleNc').removeClass("active");
                ventanaConfirm.close();
            });
        }
    });
}

function SuscribirEventoCargarCsv() {
    $("#btnCargaCsv, #btnCargaCsv1").click(function (e) {
        windowLoadFile = $("#windowLoadFile").kendoWindow({
            iframe: true,
            title: _dictionary.SPATituloCargarCsv[$("#language").data("kendoDropDownList").value()],
            visible: false,
            width: "50%",
            height: "auto",
            draggable: false,
            modal: true,
            actions: [],
            animation: {
                open: false,
                close: false
            },
            close: function onClose(e) {
                $('input[value="spool"]').prop("checked", true);
                $("#inputFile").val("");
                $("#lblRutaArchivo").text("");
            }
        }).data("kendoWindow");

        windowLoadFile.open().center();
    });

    $("#btntFile").on('click', function () {
        $("#inputFile").val("");
        $("#inputFile").click();
    });

    $("#inputFile").on('change', function (e) {
        $("#lblRutaArchivo").text("");

        if ($(this).val() != "") {
            if (!(window.File && window.FileReader && window.FileList && window.Blob)) {
                displayNotify("ListadoCatalogos0007", "", '2');
            } else {
                if ($(this).val().substring($(this).val().lastIndexOf(".")) == ".csv") {
                    $("#lblRutaArchivo").text($(this)[0].files['0'].name);
                } else {
                    displayNotify("", "El formato del archivo debe ser .CSV", '1');
                }
            }
        }
    });

    $("#btnGuardarCarga").click(function (e) {
        var ProyectoID = $("#inputProyecto").data("kendoComboBox").text();
        var tipoCarga = $('input[name="TipoCarga"]:checked').val() == "spool" ? 1 : 2;

        if (ProyectoID != "") {
            if ($("#inputFile").val() != "") {
                var data = [];
                var dt = $("#inputFile");
                var reader = new FileReader();
                reader.readAsText(dt[0].files[0]);
                reader.onload = function (event) {
                    var csvData = event.target.result;
                    var csvJsonData = csvToJson(csvData, "NombreSpool", tipoCarga);
                    if (csvJsonData.length > 0) {
                        csvJsonData.forEach(function (c) {
                            data.push(c);
                        });
                        AjaxGuardaCargaMasiva(data, tipoCarga);
                    }
                };
                reader.onerror = function (event) {
                    displayNotify("SPAExcepcionArchivo1", "", '2');
                };

            } else {
                displayNotify("ListadoCatalogos0010", "", '2');
            }
            windowLoadFile.close();
        } else {
            windowLoadFile.close();
            displayNotify("SPAProyectoCargaMasiva", "", '1');
        }

    });

    $("#btnCerrarPopup").click(function (e) {
        $('input[value="spool"]').prop("checked", true);
        $("#inputFile").val("");
        $("#lblRutaArchivo").text("");
        windowLoadFile.close();
    });
}

function csvToJson(data, idField, tipoCarga) {
    data = data.split("\r\n");
    data.shift();

    var encabezados = [];
    encabezados[0] = "NombreSpool";
    encabezados[1] = "NumeroControl";
    encabezados[2] = "SistemaPintura";
    encabezados[3] = "Color";

    var csv = [];
    try {
        data.forEach(function (d, i) {
            if (d.substring(0, d.length).split(",").length === encabezados.length - 1) {
                var tmp = {};
                tmp[idField] = null;
                d.split(",").forEach(function (cell, z) {
                    if (tipoCarga == 1) {
                        if (z == 0) {
                            tmp[encabezados[z]] = cell;
                            tmp[encabezados[z + 1]] = "";
                        }
                        else {
                            tmp[encabezados[z + 1]] = cell;
                        }

                    }
                    else {
                        if (z == 0) {
                            tmp[encabezados[z]] = "";
                        }
                        tmp[encabezados[z + 1]] = cell;
                    }

                });
                csv.push(tmp);
            }
            else if (d.substring(0, d.length).split(";").length === encabezados.length - 1) {
                var tmp = {};
                tmp[idField] = null;
                d.split(";").forEach(function (cell, z) {
                    if (tipoCarga == 1) {
                        if (z == 0) {
                            tmp[encabezados[z]] = "";
                            tmp[encabezados[z + 1]] = cell;
                        }
                        else {
                            tmp[encabezados[z + 1]] = cell;
                        }

                    }
                    else {
                        if (z == 0) {
                            tmp[encabezados[z]] = "";
                        }
                        tmp[encabezados[z + 1]] = cell;
                    }
                });
                csv.push(tmp);
            }

            else {
                if (d.substring(0, d.length).split(",").length != 1) {
                    throw -1;
                    csv = [];
                }


            }
        });
    } catch (e) {
        if (e !== -1) {
            throw e;
        } else {
            displayNotify("SPAExcepcionArchivo", "", '2');
        }
        csv = [];
    }
    return csv;
}

function SuscribirEventoDescargarCsv() {
    $("#btnDescargaCsv, #btnDescargaCsv1").click(function (e) {
        window.location.href = "/PlantillaSistemaPinturaAplicable.csv";
    });
}

function SuscribirEventoBusqueda() {
    $("#btnBuscar").click(function (e) {
        var Proyecto = $("#inputProyecto").data("kendoComboBox").dataItem($("#inputProyecto").data("kendoComboBox").select());
        var tipoBusqueda = 0;
        var cadena = "";

        if (Proyecto != undefined && Proyecto.ProyectoID != "" && Proyecto.ProyectoID != 0) {
            if ($("#styleSpool").hasClass("active")) {
                if (!ValidaInformacionCapturada()) {
                    $("#inputSpool").attr("saAttr", $("#inputSpool").val());
                    if ($("#inputSpool").val() != null && $("#inputSpool").val() != "") {
                        tipoBusqueda = 1;
                        cadena = $("#inputSpool").val().trim();
                        AjaxCargarNumeroElementosPorBusqueda(Proyecto.ProyectoID, tipoBusqueda, cadena);
                    } else {
                        displayNotify("SPAMensajeIngresaSpool", "", '1');
                    }
                } else {
                    var ventanaConfirm = $("#ventanaConfirmCaptura").kendoWindow({
                        iframe: true,
                        title: _dictionary.EntregaPlacasGraficasTituloPopup[$("#language").data("kendoDropDownList").value()],
                        visible: false,
                        width: "40%",
                        height: "auto",
                        draggable: false,
                        modal: true,
                        actions: [],
                        animation: {
                            open: false,
                            close: false
                        },
                    }).data("kendoWindow");

                    ventanaConfirm.content('<center>' + _dictionary.EntregaPlacasGraficasMensajeDatosCapturadosNoGuardados[$("#language").data("kendoDropDownList").value()] + '</center>' +
                        "</br><center><button class='btn btn-blue' id='yesButtonProy'>" + _dictionary.lblSi[$("#language").data("kendoDropDownList").value()] + "</button> <button class='btn btn-blue' id='noButtonProy'>" + _dictionary.lblNo[$("#language").data("kendoDropDownList").value()] + "</button></center>");

                    ventanaConfirm.open().center();
                    $("#yesButtonProy").click(function () {
                        $("#inputSpool").attr("saAttr", $("#inputSpool").val());
                        if ($("#inputSpool").val() != null && $("#inputSpool").val() != "") {
                            tipoBusqueda = 1;
                            cadena = $("#inputSpool").val().trim();
                            AjaxCargarNumeroElementosPorBusqueda(Proyecto.ProyectoID, tipoBusqueda, cadena);
                        } else {
                            displayNotify("SPAMensajeIngresaSpool", "", '1');
                        }
                        ventanaConfirm.close();
                    });
                    $("#noButtonProy").click(function () {
                        $("#inputSpool").val($("#inputSpool").attr("saAttr"));
                        ventanaConfirm.close();
                    });
                }

            } else if ($("#styleNc").hasClass("active")) {
                if (!ValidaInformacionCapturada()) {
                    $("#inputNc").attr("ncaAttr", $("#inputNc").val());
                    if ($("#inputNc").val() != null && $("#inputNc").val() != "") {
                        tipoBusqueda = 2;
                        cadena = $("#inputNc").val().trim();
                        AjaxCargarNumeroElementosPorBusqueda(Proyecto.ProyectoID, tipoBusqueda, cadena);
                    } else {
                        displayNotify("SPAMensajeIngresaNc", "", '1');
                    }
                } else {
                    var ventanaConfirm = $("#ventanaConfirmCaptura").kendoWindow({
                        iframe: true,
                        title: _dictionary.EntregaPlacasGraficasTituloPopup[$("#language").data("kendoDropDownList").value()],
                        visible: false,
                        width: "40%",
                        height: "auto",
                        draggable: false,
                        modal: true,
                        actions: [],
                        animation: {
                            open: false,
                            close: false
                        },
                    }).data("kendoWindow");

                    ventanaConfirm.content('<center>' + _dictionary.EntregaPlacasGraficasMensajeDatosCapturadosNoGuardados[$("#language").data("kendoDropDownList").value()] + '</center>' +
                        "</br><center><button class='btn btn-blue' id='yesButtonNc'>" + _dictionary.lblSi[$("#language").data("kendoDropDownList").value()] + "</button> <button class='btn btn-blue' id='noButtonProy'>" + _dictionary.lblNo[$("#language").data("kendoDropDownList").value()] + "</button></center>");

                    ventanaConfirm.open().center();

                    $("#yesButtonNc").click(function () {
                        $("#inputNc").attr("ncaAttr", $("#inputNc").val());
                        if ($("#inputNc").val() != null && $("#inputNc").val() != "") {
                            tipoBusqueda = 2;
                            cadena = $("#inputNc").val().trim();
                            AjaxCargarNumeroElementosPorBusqueda(Proyecto.ProyectoID, tipoBusqueda, cadena);
                        } else {
                            displayNotify("SPAMensajeIngresaNc", "", '1');
                        }
                        ventanaConfirm.close();
                    });
                    $("#noButtonProy").click(function () {
                        $("#inputNc").val($("#inputNc").attr("ncaAttr"));
                        ventanaConfirm.close();
                    });
                }

            }

        } else {
            displayNotify("MensajeSeleccionaProyecto", "", '1');
        }
    });

    $("#inputSpool").keydown(function (e) {
        var Proyecto = $("#inputProyecto").data("kendoComboBox").dataItem($("#inputProyecto").data("kendoComboBox").select());
        if (e.keyCode == 13) {

            if (!ValidaInformacionCapturada()) {
                $("#inputSpool").attr("saAttr", $("#inputSpool").val());
                if ($('#inputSpool').val() != "") {

                    AjaxCargarNumeroElementosPorBusqueda(Proyecto.ProyectoID, 1, $('#inputSpool').val());
                } else {
                    $("#grid").data("kendoGrid").dataSource.data([]);
                }
            } else {
                var ventanaConfirm = $("#ventanaConfirmCaptura").kendoWindow({
                    iframe: true,
                    title: _dictionary.EntregaPlacasGraficasTituloPopup[$("#language").data("kendoDropDownList").value()],
                    visible: false,
                    width: "40%",
                    height: "auto",
                    draggable: false,
                    modal: true,
                    actions: [],
                    animation: {
                        open: false,
                        close: false
                    },
                }).data("kendoWindow");

                ventanaConfirm.content('<center>' + _dictionary.EntregaPlacasGraficasMensajeDatosCapturadosNoGuardados[$("#language").data("kendoDropDownList").value()] + '</center>' +
                    "</br><center><button class='btn btn-blue' id='yesButtonProy'>" + _dictionary.lblSi[$("#language").data("kendoDropDownList").value()] + "</button> <button class='btn btn-blue' id='noButtonProy'>" + _dictionary.lblNo[$("#language").data("kendoDropDownList").value()] + "</button></center>");

                ventanaConfirm.open().center();
                $("#yesButtonProy").click(function () {
                    $("#inputSpool").attr("saAttr", $("#inputSpool").val());
                    if ($('#inputSpool').val() != "") {

                        AjaxCargarNumeroElementosPorBusqueda(Proyecto.ProyectoID, 1, $('#inputSpool').val());
                    } else {
                        $("#grid").data("kendoGrid").dataSource.data([]);
                    }
                    ventanaConfirm.close();
                });
                $("#noButtonProy").click(function () {
                    $("#inputSpool").val($("#inputSpool").attr("saAttr"));
                    ventanaConfirm.close();
                });
            }
        }

    });
    $("#inputNc").keydown(function (e) {
        var Proyecto = $("#inputProyecto").data("kendoComboBox").dataItem($("#inputProyecto").data("kendoComboBox").select());
        if (e.keyCode == 13) {
            if (!ValidaInformacionCapturada()) {
                $("#inputNc").attr("ncaAttr", $("#inputNc").val());
                if ($('#inputNc').val() != "") {
                    AjaxCargarNumeroElementosPorBusqueda(Proyecto.ProyectoID, 2, $('#inputNc').val());
                } else {
                    $("#grid").data("kendoGrid").dataSource.data([]);
                }
            } else {
                var ventanaConfirm = $("#ventanaConfirmCaptura").kendoWindow({
                    iframe: true,
                    title: _dictionary.EntregaPlacasGraficasTituloPopup[$("#language").data("kendoDropDownList").value()],
                    visible: false,
                    width: "40%",
                    height: "auto",
                    draggable: false,
                    modal: true,
                    actions: [],
                    animation: {
                        open: false,
                        close: false
                    },
                }).data("kendoWindow");

                ventanaConfirm.content('<center>' + _dictionary.EntregaPlacasGraficasMensajeDatosCapturadosNoGuardados[$("#language").data("kendoDropDownList").value()] + '</center>' +
                    "</br><center><button class='btn btn-blue' id='yesButtonNc'>" + _dictionary.lblSi[$("#language").data("kendoDropDownList").value()] + "</button> <button class='btn btn-blue' id='noButtonProy'>" + _dictionary.lblNo[$("#language").data("kendoDropDownList").value()] + "</button></center>");

                ventanaConfirm.open().center();

                $("#yesButtonNc").click(function () {
                    $("#inputNc").attr("ncaAttr", $("#inputNc").val());
                    if ($('#inputNc').val() != "") {
                        AjaxCargarNumeroElementosPorBusqueda(Proyecto.ProyectoID, 2, $('#inputNc').val());
                    } else {
                        $("#grid").data("kendoGrid").dataSource.data([]);
                    }
                    ventanaConfirm.close();
                });
                $("#noButtonProy").click(function () {
                    $("#inputNc").val($("#inputNc").attr("ncaAttr"));
                    ventanaConfirm.close();
                });
            }
        }
    });
}
function SuscribirEventoGuardar() {
    $("#Guardar, #btnGuardar, #Guardar1, #btnGuardar1").click(function (e) {
        if ($('#Guardar').text() == _dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]) {
            var ds = $("#grid").data("kendoGrid").dataSource;
            if (ds._data.length) {
                AjaxGuardarCaptura(ds._data, false);
            } else {
                displayNotify("SistemaPinturaAplicableExcepcionGuardado", "", '1');
            }
        } else if ($('#Guardar').text() == _dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]) {
            opcionHabilitarView(false);
        }

    });
    $("#btnGuardarYNuevo, #btnGuardarYNuevo1").click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        if (ds._data.length) {
            AjaxGuardarCaptura(ds._data, true);
        } else {
            displayNotify("SistemaPinturaAplicableExcepcionGuardado", "", '1');
        }
    });
}

function opcionHabilitarView(disable) {
    if (disable) {
        $('#FieldSetView').find('*').attr('disabled', true);
        $(".addedSectionInLine").find('*').attr("disabled", true);
        $("#styleSpool").attr("disabled", true);
        $("#styleNc").attr("disabled", true);
        $("#inputProyecto").data("kendoComboBox").enable(false);
        $("#inputSpool").css('opacity', '0.6');
        $("#inputSpool").attr("disabled", true);
        $("#inputNc").css('opacity', '0.6');
        $("#inputNc").attr("disabled", true);
        $("#inputSistemaPintura").data("kendoComboBox").enable(false);
        $("#inputColorPintura").data("kendoComboBox").enable(false);

        $("#btnBuscar").attr("disabled", true);
        $("#Guardar").text(_dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]);
        $("#btnGuardar").text(_dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]);
        $("#Guardar1").text(_dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]);
        $('#btnGuardar1').text(_dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]);

    } else {
        $('#FieldSetView').find('*').attr('disabled', false);
        $(".addedSectionInLine").find('*').attr("disabled", false);
        $("#styleSpool").attr("disabled", false);
        $("#styleNc").attr("disabled", false);
        $("#inputProyecto").data("kendoComboBox").enable(true);
        $("#inputSpool").css('opacity', '1');
        $("#inputSpool").attr("disabled", false);
        $("#inputNc").css('opacity', '1');
        $("#inputNc").attr("disabled", false);
        $("#inputSistemaPintura").data("kendoComboBox").enable(true);
        $("#inputColorPintura").data("kendoComboBox").enable(true);

        $("#btnBuscar").attr("disabled", false);
        $("#Guardar").text(_dictionary.botonGuardar[$("#language").data("kendoDropDownList").value()]);
        $("#btnGuardar").text(_dictionary.botonGuardar[$("#language").data("kendoDropDownList").value()]);
        $("#Guardar1").text(_dictionary.botonGuardar[$("#language").data("kendoDropDownList").value()]);
        $('#btnGuardar1').text(_dictionary.botonGuardar[$("#language").data("kendoDropDownList").value()]);
    }
}

function LimpiaTipoBusqueda() {
    $("#inputSpool").val("");
    $("#inputNc").val("");
    $("#inputSistemaPintura").data("kendoComboBox").value("");
    $("#inputColorPintura").data("kendoComboBox").value("");
    $("#grid").data("kendoGrid").dataSource.data([]);
}


function LimpiaCargaProyecto() {
    $("#inputSpool").val("");
    $("#inputNc").val("");
    $("#inputSistemaPintura").data("kendoComboBox").dataSource.data([]);
    $("#inputSistemaPintura").data("kendoComboBox").value("");
    $("#inputColorPintura").data("kendoComboBox").dataSource.data([]);
    $("#inputColorPintura").data("kendoComboBox").value("");
    $("#grid").data("kendoGrid").dataSource.data([]);
}

function LimpiaCargaSP() {
    $("#inputColorPintura").data("kendoComboBox").dataSource.data([]);
    $("#inputColorPintura").data("kendoComboBox").value("");
}

function LimpiarPantalla() {
    $("#inputProyecto").data("kendoComboBox").dataSource.data([]);
    $("#inputProyecto").data("kendoComboBox").value("");
    $("#inputSistemaPintura").data("kendoComboBox").dataSource.data([]);
    $("#inputSistemaPintura").data("kendoComboBox").value("");
    $("#inputColorPintura").data("kendoComboBox").dataSource.data([]);
    $("#inputColorPintura").data("kendoComboBox").value("");
    $("#inputSpool").val("");
    $("#inputNc").val("");
    $("#grid").data("kendoGrid").dataSource.data([]);
    opcionHabilitarView(false);
    AjaxCargarCamposPredeterminados();
    AjaxCargaProyecto();
}


//Convert ced erasing "" to null
function validaVacios(c) {
    for (var key in c) {
        c[key] === "" ? c[key] = null : 0;
    }
    return c;
}