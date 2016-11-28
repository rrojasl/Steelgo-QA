function SuscribirEventos() {
    suscribirEventoZona();
    suscribirEventoCuadrante();
    suscribirEventoCuadrantePlanchado();
    suscribirEventoTipoBusqueda();
    suscribirEventoMostrar();
    SuscribirEventoPlanchar();
    suscribirEventoImprimirEtiqueta();
    suscribirEventoImprimirTravelerMasivo();
    suscribirEventoGuardar();
}

SuscribirEventos();


function suscribirEventoZona() {
    $("#inputZona").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "ZonaID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            $("#inputZona").data("kendoComboBox").dataSource._data[0].ZonaAnterior = $("#inputZona").val();

            dataItem = this.dataItem(e.sender.selectedIndex);
            var ds = $("#grid").data("kendoGrid").dataSource;
            if (ds._data.length == 0) {
                $("#grid").data("kendoGrid").dataSource.data([]);

                var ZonaID = $("#inputZona").val();

                LimpiarCuadrantes();

                if (ZonaID != null && ZonaID != undefined) {
                    AjaxGetListaCuadrantes(ZonaID);
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
                    close: function () {
                        $('input:radio[name=LLena]:nth(0)').select();
                    }
                }).data("kendoWindow");

                ventanaConfirm.content(_dictionary.EntregaPlacasGraficasMensajeDatosCapturadosNoGuardados[$("#language").data("kendoDropDownList").value()] +
                    "</br><center><button class='btn btn-blue' id='yesButtonProy'>Si</button><button class='btn btn-blue' id='noButtonProy'>No</button></center>");

                ventanaConfirm.open().center();
                $("#yesButtonProy").click(function () {
                    $("#grid").data("kendoGrid").dataSource.data([]);

                    var ZonaID = $("#inputZona").val();

                    LimpiarCuadrantes();

                    if (ZonaID != null && ZonaID != undefined) {
                        AjaxGetListaCuadrantes(ZonaID);
                    }
                    ventanaConfirm.close();
                });
                $("#noButtonProy").click(function () {
                    $("#inputZona").data("kendoComboBox").value($("#inputZona").data("kendoComboBox").dataSource._data[0].ZonaAnterior);
                    ventanaConfirm.close();
                    $('input:radio[name=LLena]:nth(0)').select();
                });
            }
        }
    });
}

function suscribirEventoCuadrante() {
    $("#inputCuadrante").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "CuadranteID",
        suggest: true,
        filter: "contains",
        index: 3,

    });

    $('#inputCuadrante').closest('.k-widget').keydown(function (e) {
        if (e.keyCode == 13) {
            var ZonaID = $("#inputZona").val();
            var CuadranteID = $("#inputCuadrante").val();
            var SpoolIDContiene = $("#SpoolIDCOntiene").val();
            var Muestra = $('input:radio[name=Muestra]:checked').val();
            var TipoBusqueda = $('input:radio[name=TipoBusqueda]:checked').val();

            AjaxGetDetalleEtiquetado(TipoBusqueda == 'Zona' ? 1 : 0, Muestra == 'Todos' ? 1 : 0, ZonaID == "" ? 0 : ZonaID, CuadranteID == "" ? 0 : CuadranteID, SpoolIDContiene);

            if (TipoBusqueda == 'Spool')
                AjaxGetCuadranteListadoPorSpool(SpoolIDContiene);
        }
    });
}

function suscribirEventoCuadrantePlanchado() {
    $("#inputCuadrantePlanchado").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "CuadranteID",
        suggest: true,
        filter: "contains",
        index: 3,
    });
}

function suscribirEventoGuardar() {
    $('.accionGuardar').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        if (ds._data.length > 0) {
            if (($('#Guardar').text() == "Guardar" || $('#Guardar').text() == "Save") || ($('#GuardarPie').text() == "Guardar" || $('#GuardarPie').text() == "Save")) {
                AjaxGuardarCaptura(ds._data, 0);
            }
            else if (($('#Guardar').text() == "Editar" || $('#Guardar').text() == "Edit") || ($('#GuardarPie').text() == "Editar" || $('#GuardarPie').text() == "Edit")) {
                opcionHabilitarView(false, "FieldSetView")
            }
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
                    animation: {
                        close: false,
                        open: false
                    }
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
                if ($("#inputCuadrantePlanchado").data("kendoComboBox").dataItem($("#inputCuadrantePlanchado").data("kendoComboBox").select()) != undefined) {
                    PlanchaCuadrante();
                    PlanchaEtiquedo();
                }
            }
        }
    });
}

function suscribirEventoTipoBusqueda() {
    $('input:radio[name=TipoBusqueda]:nth(1)').change(function () {
        var ds = $("#grid").data("kendoGrid").dataSource;
        if (ds._data.length == 0) {
            $('#ZonaDiv').hide();
            $('#CuadranteDiv').hide();
            $('#SpoolIDDiv').show();

            LimpiarBusquedaZona();

            $("#grid").data("kendoGrid").dataSource.data([]);
        }
        else {
            var ventanaConfirm = $("#ventanaConfirmCaptura").kendoWindow({
                iframe: true,
                title: _dictionary.EntregaPlacasGraficasTituloPopup[$("#language").data("kendoDropDownList").value()],
                visible: false,
                width: "auto",
                height: "auto",
                modal: true,
                close: function () {
                    $('input:radio[name=TipoBusqueda]:nth(0)').trigger("click");
                }
            }).data("kendoWindow");

            ventanaConfirm.content(_dictionary.EntregaPlacasGraficasMensajeDatosCapturadosNoGuardados[$("#language").data("kendoDropDownList").value()] +
                "</br><center><button class='btn btn-blue' id='yesButtonProy'>Si</button><button class='btn btn-blue' id='noButtonProy'>No</button></center>");

            ventanaConfirm.open().center();
            $("#yesButtonProy").click(function () {
                $('#ZonaDiv').hide();
                $('#CuadranteDiv').hide();
                $('#SpoolIDDiv').show();

                LimpiarBusquedaZona();

                $("#grid").data("kendoGrid").dataSource.data([]);

                gridInformation = false;
                ventanaConfirm.close();
                //$('input:radio[name=TipoBusqueda]:nth(1)').trigger("click");
            });

            $("#noButtonProy").click(function () {
                ventanaConfirm.close();
                //$('input:radio[name=TipoBusqueda]:nth(0)').trigger("click");
            });
        }
    });

    $('input:radio[name=TipoBusqueda]:nth(0)').change(function () {
        var ds = $("#grid").data("kendoGrid").dataSource;
        if (ds._data.length == 0) {
            $('#ZonaDiv').show();
            $('#CuadranteDiv').show();
            $('#SpoolIDDiv').hide();

            LimpiarBusquedaSpool();

            $("#grid").data("kendoGrid").dataSource.data([]);
        }
        else {
            var ventanaConfirm = $("#ventanaConfirmCaptura").kendoWindow({
                iframe: true,
                title: _dictionary.EntregaPlacasGraficasTituloPopup[$("#language").data("kendoDropDownList").value()],
                visible: false,
                width: "auto",
                height: "auto",
                modal: true,
                close: function () {
                    $('input:radio[name=TipoBusqueda]:nth(1)').trigger("click");
                }
            }).data("kendoWindow");

            ventanaConfirm.content(_dictionary.EntregaPlacasGraficasMensajeDatosCapturadosNoGuardados[$("#language").data("kendoDropDownList").value()] +
                "</br><center><button class='btn btn-blue' id='yesButtonProy'>Si</button><button class='btn btn-blue' id='noButtonProy'>No</button></center>");

            ventanaConfirm.open().center();
            $("#yesButtonProy").click(function () {
                $('#ZonaDiv').show();
                $('#CuadranteDiv').show();
                $('#SpoolIDDiv').hide();

                LimpiarBusquedaSpool();

                $("#grid").data("kendoGrid").dataSource.data([]);

                gridInformation = false;
                ventanaConfirm.close();
                $('input:radio[name=TipoBusqueda]:nth(0)').trigger("click");
            });
            $("#noButtonProy").click(function () {
                ventanaConfirm.close();
                $('input:radio[name=TipoBusqueda]:nth(1)').trigger("click");
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

        $('#botonGuardar3').text(_dictionary.textoEditar[$("#language").data("kendoDropDownList").value()]);
        $("#btnGuardar1").text(_dictionary.textoEditar[$("#language").data("kendoDropDownList").value()]);
        $('#botonGuardar').text(_dictionary.textoEditar[$("#language").data("kendoDropDownList").value()]);
        $("#botonGuardar2").text(_dictionary.textoEditar[$("#language").data("kendoDropDownList").value()]);
    }
    else {
        $('#FieldSetView').find('*').attr('disabled', false);
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

        $('#botonGuardar').text(_dictionary.textoGuardar[$("#language").data("kendoDropDownList").value()]);
        $("#botonGuardar2").text(_dictionary.textoGuardar[$("#language").data("kendoDropDownList").value()]);
        $('#botonGuardar3').text(_dictionary.textoGuardar[$("#language").data("kendoDropDownList").value()]);
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