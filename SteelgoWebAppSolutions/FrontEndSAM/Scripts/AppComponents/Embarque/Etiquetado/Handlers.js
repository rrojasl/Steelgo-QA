function SuscribirEventos() {
    SuscribirEventoZona();
    SuscribirEventoCuadrante();
    SuscribirEventoCuadrantePlanchado();
    //suscribirEventoTipoBusqueda();
    suscribirEventoMostrar();
    SuscribirEventoPlanchar();
    suscribirEventoImprimirEtiqueta();
    suscribirEventoImprimirTravelerMasivo();
    suscribirEventoGuardar();
    SuscribirEventoCambiarVista();
}

SuscribirEventos();


function SuscribirEventoZona() {
    $("#inputZona").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "ZonaID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            var dataItem = this.dataItem(e.sender.selectedIndex);
            var ds = $("#grid").data("kendoGrid").dataSource;
            if (ds._data.length > 0) {
                ventanaConfirm = $("#ventanaConfirm").kendoWindow({
                    iframe: true,
                    title: _dictionary.CapturaAvanceTitulo[$("#language").data("kendoDropDownList").value()],
                    visible: false,
                    width: "auto",
                    height: "auto",
                    modal: true,
                    animation: {
                        close: false,
                        open: false
                    }
                }).data("kendoWindow");

                ventanaConfirm.content(_dictionary.MensajeAdvertenciaDatosCapturadosNoGuardados[$("#language").data("kendoDropDownList").value()] +
                         "</br><center><button class='confirm_yes btn btn-blue' id='yesButton'>Si</button><button class='confirm_yes btn btn-blue' id='noButton'> No</button></center>");

                ventanaConfirm.open().center();

                $("#yesButton").click(function (handler) {
                    $("#grid").data("kendoGrid").dataSource.data([]);
                    LimpiarCargarZona();
                    if (dataItem != undefined) {
                        if (dataItem.ZonaID != 0) {
                            AjaxGetListaCuadrantes(dataItem.ZonaID);
                        }
                    }
                    else {
                        $("#inputZona").data("kendoComboBox").value("");
                    }
                    ventanaConfirm.close();
                });
                $("#noButton").click(function (handler) {
                    $('#inputZona').data("kendoComboBox").value(previousCurrentItem);
                    ventanaConfirm.close();
                });

            }
            else {
                LimpiarCargarZona();
                if (dataItem != undefined) {
                    if (dataItem.ZonaID != 0) {
                        AjaxGetListaCuadrantes(dataItem.ZonaID);
                    }
                }
                else {
                    $("#inputZona").data("kendoComboBox").value("");
                }
            }

        }
    });

    $("#inputZona").data("kendoComboBox").input.on("focus", function () {
        previousCurrentItem = this.value;
    });
}

function SuscribirEventoCuadrante() {
    $("#inputCuadrante").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "CuadranteID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            var dataItem = this.dataItem(e.sender.selectedIndex);

            var ds = $("#grid").data("kendoGrid").dataSource;
            if (ds._data.length > 0) {
                ventanaConfirm = $("#ventanaConfirm").kendoWindow({
                    iframe: true,
                    title: _dictionary.CapturaAvanceTitulo[$("#language").data("kendoDropDownList").value()],
                    visible: false,
                    width: "auto",
                    height: "auto",
                    modal: true,
                    animation: {
                        close: false,
                        open: false
                    }
                }).data("kendoWindow");

                ventanaConfirm.content(_dictionary.MensajeAdvertenciaDatosCapturadosNoGuardados[$("#language").data("kendoDropDownList").value()] +
                         "</br><center><button class='confirm_yes btn btn-blue' id='yesButton'>Si</button><button class='confirm_yes btn btn-blue' id='noButton'> No</button></center>");

                ventanaConfirm.open().center();

                $("#yesButton").click(function (handler) {
                    $("#grid").data("kendoGrid").dataSource.data([]);
                    if (dataItem != undefined) {
                    }
                    else {
                        $("#inputCuadrante").data("kendoComboBox").value("");
                    }
                    ventanaConfirm.close();
                });
                $("#noButton").click(function (handler) {
                    $('#inputCuadrante').data("kendoComboBox").value(previousCurrentItem);
                    ventanaConfirm.close();
                });
            }
            else {
                if (dataItem != undefined) {
                }
                else {
                    $("#inputCuadrante").data("kendoComboBox").value("");
                }
            }


        }
    });

    $('#inputCuadrante').closest('.k-widget').keydown(function (e) {
        if (e.keyCode == 13) {
            tipoBusqueda = 1;
            zonaID = $("#inputZona").data("kendoComboBox").value();
            cuadranteID = $("#inputCuadrante").data("kendoComboBox").value();
            if (zonaID != 0) {
                AjaxCargarDetalleEncintado()
                //alert('xD');
            } else {
                displayNotify("MensajeSeleccionarZona", "", '2');
            }
        }
    });

    $("#inputCuadrante").data("kendoComboBox").input.on("focus", function () {
        previousCurrentItem = this.value;
    });
}

function SuscribirEventoCuadrantePlanchado() {
    $("#inputCuadrantePlanchado").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "CuadranteID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            var dataItem = this.dataItem(e.sender.selectedIndex);
            if (dataItem != undefined) {
            }
            else {
                $("#inputCuadrantePlanchado").data("kendoComboBox").value("");
            }

        }
    });
}

function suscribirEventoGuardar() {
    //$('.accionGuardar').click(function (e) {
    //    var ds = $("#grid").data("kendoGrid").dataSource;
    //    if (ds._data.length > 0) {
    //        if (($('#Guardar').text() == "Guardar" || $('#Guardar').text() == "Save") || ($('#GuardarPie').text() == "Guardar" || $('#GuardarPie').text() == "Save")) {
    //            AjaxGuardarCaptura(ds._data, 0);
    //        }
    //        else if (($('#Guardar').text() == "Editar" || $('#Guardar').text() == "Edit") || ($('#GuardarPie').text() == "Editar" || $('#GuardarPie').text() == "Edit")) {
    //            opcionHabilitarView(false, "FieldSetView")
    //        }
    //    }
    //    else if (($('#Guardar').text() == "Editar" || $('#Guardar').text() == "Edit") || ($('#GuardarPie').text() == "Editar" || $('#GuardarPie').text() == "Edit")) {
    //        opcionHabilitarView(false, "FieldSetView")
    //    }
    //});

    $("#Guardar, #btnGuardar, #GuardarPie, #btnGuardar1").click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        if (ds._data.length > 0) {
            if (($('#Guardar').text() == "Guardar" || $('#Guardar').text() == "Save") || ($('#btnGuardar').text() == "Guardar" || $('#btnGuardar').text() == "Save") || ($('#GuardarPie').text() == "Guardar" || $('#GuardarPie').text() == "Save") || ($('#btnGuardar1').text() == "Guardar" || $('#btnGuardar1').text() == "Save")) {
                AjaxGuardarCaptura(ds._data, 0);
            }
            if (($('#Guardar').text() == "Editar" || $('#Guardar').text() == "Edit") || ($('#btnGuardar').text() == "Editar" || $('#btnGuardar').text() == "Edit") || ($('#GuardarPie').text() == "Editar" || $('#GuardarPie').text() == "Edit") || ($('#btnGuardar1').text() == "Editar" || $('#btnGuardar1').text() == "Edit")) {
                opcionHabilitarView(false, "FieldSetView");
            }
        } else {//Editar Edit
            displayNotify("MensajeAdverteciaExcepcionGuardado", "", '2');
        }

    });

    $("#btnGuardarYNuevo, #btnGuardarYNuevo1").click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        if (ds._data.length > 0) {
            AjaxGuardarCaptura(ds._data, 1);
        } else {
            $("#grid").data("kendoGrid").dataSource.data([]);
            LimpiarBusquedaZona();
            LimpiarCuadrantes();
            LimpiarBusquedaSpool();
            opcionHabilitarView(false, "FieldSetView");
            displayNotify("", "No hay informacion por guardar", '2');
        }

    });
}

function SuscribirEventoPlanchar() {
    $("#ButtonPlanchar").click(function (e) {
        e.preventDefault();
        if ($("#grid").data("kendoGrid").dataSource._data.length > 0) {
            if ($('input:radio[name=LLena]:checked').val() === "Todos") {
                //windowTemplate = kendo.template($("#windowTemplate").html());

                ventanaConfirm = $("#ventanaConfirm").kendoWindow({
                    iframe: true,
                    title: _dictionary.CapturaAvanceTitulo[$("#language").data("kendoDropDownList").value()],
                    visible: false, //the window will not appear before its .open method is called
                    width: "auto",
                    height: "auto",
                    modal: true,
                    animation: false,
                }).data("kendoWindow");

                ventanaConfirm.content(_dictionary.CapturaMensajeArmadoPlancharTodos[$("#language").data("kendoDropDownList").value()] +
                             "</br><center><button class='confirm_yes btn btn-blue' id='yesButton'>Si</button><button class='confirm_yes btn btn-blue' id='noButton'> No</button></center>");

                ventanaConfirm.open().center();

                $("#yesButton").click(function (handler) {
                    if ($("#inputCuadrantePlanchado").data("kendoComboBox").dataItem($("#inputCuadrantePlanchado").data("kendoComboBox").select()) != undefined) {
                        PlanchaCuadrante();
                    }
                    PlanchaEtiquedo();
                    ventanaConfirm.close();
                });
                $("#noButton").click(function (handler) {
                    ventanaConfirm.close();
                });
            }
            else {
                     PlanchaCuadrante();
                    PlanchaEtiquedo();
                
            }
        }
    });
}

function SuscribirEventoCambiarVista() {
    $('#styleZona').click(function () {

        if (!existenCambios()) {
            $("#inputZona").data("kendoComboBox").value("");

            $("#inputCuadrante").data("kendoComboBox").dataSource.data([]);
            $("#inputCuadrante").data("kendoComboBox").value("");

            $("#inputCuadrantePlanchado").data("kendoComboBox").dataSource.data([]);
            $("#inputCuadrantePlanchado").data("kendoComboBox").value("");

            $("#SpoolIDDiv").hide();
            $("#ZonaDiv").show();
            $("#CuadranteDiv").show();
        } else {
            ventanaConfirm = $("#ventanaConfirm").kendoWindow({
                iframe: true,
                title: _dictionary.CapturaAvanceTitulo[$("#language").data("kendoDropDownList").value()],
                visible: false,
                width: "auto",
                height: "auto",
                modal: true,
                animation: {
                    close: false,
                    open: false
                }
            }).data("kendoWindow");

            ventanaConfirm.content(_dictionary.MensajeAdvertenciaDatosCapturadosNoGuardados[$("#language").data("kendoDropDownList").value()] +
                         "</br><center><button class='confirm_yes btn btn-blue' id='yesButton'>Si</button><button class='confirm_yes btn btn-blue' id='noButton'> No</button></center>");

            ventanaConfirm.open().center();

            $("#yesButton").click(function (handler) {
                $("#inputZona").data("kendoComboBox").value("");
                cambioAlgoGrid = false;
                $("#inputCuadrante").data("kendoComboBox").dataSource.data([]);
                $("#inputCuadrante").data("kendoComboBox").value("");

                $("#inputCuadrantePlanchado").data("kendoComboBox").dataSource.data([]);
                $("#inputCuadrantePlanchado").data("kendoComboBox").value("");

                $("#SpoolIDDiv").hide();
                $("#ZonaDiv").show();
                $("#CuadranteDiv").show();
                $("#grid").data("kendoGrid").dataSource.data([]);
                ventanaConfirm.close();
            });
            $("#noButton").click(function (handler) {
                $("#styleZona").removeClass("active");
                $("#styleSpool").addClass("active");
                ventanaConfirm.close();
            });
        }
    });
    $('#styleSpool').click(function () {

        if (!existenCambios()) {

            $("#SpoolIDCOntiene").val("");

            $("#inputCuadrantePlanchado").data("kendoComboBox").dataSource.data([]);
            $("#inputCuadrantePlanchado").data("kendoComboBox").value("");

            $("#ZonaDiv").hide();
            $("#CuadranteDiv").hide();
            $("#SpoolIDDiv").show();
        } else {
            ventanaConfirm = $("#ventanaConfirm").kendoWindow({
                iframe: true,
                title: _dictionary.CapturaAvanceTitulo[$("#language").data("kendoDropDownList").value()],
                visible: false,
                width: "auto",
                height: "auto",
                modal: true,
                animation: {
                    close: false,
                    open: false
                }
            }).data("kendoWindow");

            ventanaConfirm.content(_dictionary.MensajeAdvertenciaDatosCapturadosNoGuardados[$("#language").data("kendoDropDownList").value()] +
                         "</br><center><button class='confirm_yes btn btn-blue' id='yesButton'>Si</button><button class='confirm_yes btn btn-blue' id='noButton'> No</button></center>");

            ventanaConfirm.open().center();

            $("#yesButton").click(function (handler) {
                $("#SpoolIDCOntiene").val("");
                cambioAlgoGrid = false;
                $("#inputCuadrantePlanchado").data("kendoComboBox").dataSource.data([]);
                $("#inputCuadrantePlanchado").data("kendoComboBox").value("");

                $("#ZonaDiv").hide();
                $("#CuadranteDiv").hide();
                $("#SpoolIDDiv").show();
                $("#grid").data("kendoGrid").dataSource.data([]);
                ventanaConfirm.close();
            });
            $("#noButton").click(function (handler) {
                $("#styleSpool").removeClass("active");
                $("#styleZona").addClass("active");
                ventanaConfirm.close();
            });
        }
    });
}

function suscribirEventoMostrar() {
    $('#btnMostrar').click(function (e) {
        var ZonaID = $("#inputZona").val();
        var CuadranteID = $("#inputCuadrante").val();
        var SpoolIDContiene = $("#SpoolIDCOntiene").val();
        var Muestra = $('input:radio[name=Muestra]:checked').val();
        var TipoBusqueda = $('input:radio[name=TipoBusqueda]:checked').val();
        cambioAlgoGrid = false;
        if(!modificadoPorUsuario)
            AjaxGetDetalleEtiquetado(TipoBusqueda == 'Zona' ? 1 : 0, Muestra == 'Todos' ? 1 : 0, ZonaID == "" ? 0 : ZonaID, CuadranteID == "" ? 0 : CuadranteID, SpoolIDContiene);
        else {
            var ventanaConfirm = $("#ventanaConfirmCaptura").kendoWindow({
                iframe: true,
                title: _dictionary.EntregaPlacasGraficasTituloPopup[$("#language").data("kendoDropDownList").value()],
                visible: false,
                width: "auto",
                height: "auto",
                modal: true,
                animation: false,
                close: function () {
                    $('input:radio[name=TipoBusqueda]:nth(1)').trigger("click");
                }
            }).data("kendoWindow");

            ventanaConfirm.content(_dictionary.EntregaPlacasGraficasMensajeDatosCapturadosNoGuardados[$("#language").data("kendoDropDownList").value()] +
                "</br><center><button class='btn btn-blue' id='yesButtonProy'>Si</button><button class='btn btn-blue' id='noButtonProy'>No</button></center>");

            ventanaConfirm.open().center();
            $("#yesButtonProy").click(function () {
                AjaxGetDetalleEtiquetado(TipoBusqueda == 'Zona' ? 1 : 0, Muestra == 'Todos' ? 1 : 0, ZonaID == "" ? 0 : ZonaID, CuadranteID == "" ? 0 : CuadranteID, SpoolIDContiene);
                ventanaConfirm.close();
                
            });
            $("#noButtonProy").click(function () {
                ventanaConfirm.close();
                
            });
        }

        if (TipoBusqueda == 'Spool')
            AjaxGetCuadranteListadoPorSpool(SpoolIDContiene);
    });
}

function suscribirEventoImprimirEtiqueta() {
    $('#ImprimirEtiqueta').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;

        AjaxImprimirEtiqueta(ds._data[0].SpoolID);
    });
}

function suscribirEventoImprimirTravelerMasivo() {
    $('#ImprimirTravel').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;

        AjaxImprimirTravelerMasivo(ds._data[0].SpoolID);
    });
}


function opcionHabilitarView(valor, name) {
    if (valor) {
        $('#FieldSetView').find('*').attr('disabled', true);
        $(".chkbx").attr('disabled', true);
        $("#inputZona").data("kendoComboBox").enable(false);
        $("#inputCuadrante").data("kendoComboBox").enable(false);
        $("#inputCuadrantePlanchado").data("kendoComboBox").enable(false);
        $("#ButtonPlanchar").prop('disabled', true);
        $("#LlenaVacios").prop('disabled', true);
        $("#SelectTodos").prop('disabled', true);

        $("#LlenaTodos").prop('disabled', true);
        $("#SelectTodosSi").prop('disabled', true);
        $("#SelectTodosNo").prop('disabled', true);
        $("#SelectTodosNinguno").prop('disabled', true);

        $('#Guardar').text(_dictionary.textoEditar[$("#language").data("kendoDropDownList").value()]);
        $("#btnGuardar").text(_dictionary.textoEditar[$("#language").data("kendoDropDownList").value()]);
        $('#GuardarPie').text(_dictionary.textoEditar[$("#language").data("kendoDropDownList").value()]);
        $("#btnGuardar1").text(_dictionary.textoEditar[$("#language").data("kendoDropDownList").value()]);
    }
    else {
        $('#FieldSetView').find('*').attr('disabled', false);
        $(".chkbx").attr('disabled', false);
        $("#inputZona").data("kendoComboBox").enable(true);
        $("#inputCuadrante").data("kendoComboBox").enable(true);
        $("#inputCuadrantePlanchado").data("kendoComboBox").enable(true);
        $("#ButtonPlanchar").prop('disabled', false);
        $("#LlenaVacios").prop('disabled', false);
        $("#SelectTodos").prop('disabled', false);

        $("#LlenaTodos").prop('disabled', false);
        $("#SelectTodosSi").prop('disabled', false);
        $("#SelectTodosNo").prop('disabled', false);
        $("#SelectTodosNinguno").prop('disabled', false);

        $('#Guardar').text(_dictionary.textoGuardar[$("#language").data("kendoDropDownList").value()]);
        $("#btnGuardar").text(_dictionary.textoGuardar[$("#language").data("kendoDropDownList").value()]);
        $('#GuardarPie').text(_dictionary.textoGuardar[$("#language").data("kendoDropDownList").value()]);
        $("#btnGuardar1").text(_dictionary.textoGuardar[$("#language").data("kendoDropDownList").value()]);
    }
}

function LimpiarBusquedaZona() {
    $("#inputCuadrante").data("kendoComboBox").dataSource.data([]);
    $("#inputCuadrante").val(0);
    $("#inputCuadrante").data("kendoComboBox").value("");
    $("#inputZona").val(0);
    $("#inputZona").data("kendoComboBox").value("");
    $("#inputCuadrantePlanchado").data("kendoComboBox").dataSource.data([]);
    $("#inputCuadrantePlanchado").val(0);
    $("#inputCuadrantePlanchado").data("kendoComboBox").value("");
}

function LimpiarCuadrantes() {
    $("#inputCuadrante").data("kendoComboBox").dataSource.data([]);
    $("#inputCuadrante").val(0);
    $("#inputCuadrante").data("kendoComboBox").value("");
    $("#inputCuadrantePlanchado").data("kendoComboBox").dataSource.data([]);
    $("#inputCuadrantePlanchado").val(0);
    $("#inputCuadrantePlanchado").data("kendoComboBox").value("");
}

function LimpiarBusquedaSpool() {
    $("#SpoolIDCOntiene").val("");
}

function LimpiarCargarZona() {
    $("#inputCuadrante").data("kendoComboBox").dataSource.data([]);
    $("#inputCuadrante").data("kendoComboBox").value("");

    $("#inputCuadrantePlanchado").data("kendoComboBox").dataSource.data([]);
    $("#inputCuadrantePlanchado").data("kendoComboBox").value("");
}