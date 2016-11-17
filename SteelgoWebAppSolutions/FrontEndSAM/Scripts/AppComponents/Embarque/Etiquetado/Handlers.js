function SuscribirEventos() {
    suscribirEventoZona();
    suscribirEventoCuadrante();
    suscribirEventoCuadrantePlanchado();
    suscribirEventoTipoBusqueda();
    suscribirEventoMostrar();
    SuscribirEventoPlanchar();
    suscribirEventoImprimirEtiqueta();
    suscribirEventoImprimirTravelerMasivo();
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
            dataItem = this.dataItem(e.sender.selectedIndex);
            var ds = $("#grid").data("kendoGrid").dataSource;
            if (!existenCambios(ds._data)) {
                ZonaInicial = $("#inputZona").data("kendoComboBox").value();

                $("#grid").data("kendoGrid").dataSource.data([]);

                var ZonaID = $("#inputZona").val();

                $("#inputCuadrante").data("kendoComboBox").dataSource.data([]);
                $("#inputCuadrante").val(0);
                $("#inputCuadrante").data("kendoComboBox").value("");

                $("#inputCuadrantePlanchado").data("kendoComboBox").dataSource.data([]);
                $("#inputCuadrantePlanchado").val(0);
                $("#inputCuadrantePlanchado").data("kendoComboBox").value("");

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
                        $("#Proyecto").data("kendoComboBox").value(proyectoInicial);
                    }
                }).data("kendoWindow");

                ventanaConfirm.content(_dictionary.EntregaPlacasGraficasMensajeDatosCapturadosNoGuardados[$("#language").data("kendoDropDownList").value()] +
                    "</br><center><button class='btn btn-blue' id='yesButtonProy'>Si</button><button class='btn btn-blue' id='noButtonProy'>No</button></center>");

                ventanaConfirm.open().center();
                $("#yesButtonProy").click(function () {
                    $("#grid").data("kendoGrid").dataSource.data([]);

                    var ZonaID = $("#inputZona").val();
                    if (ZonaID != null && ZonaID != undefined) {
                        $("#inputCuadrante").data("kendoComboBox").dataSource.data([]);
                        $("#inputCuadrante").val(0);
                        $("#inputCuadrante").data("kendoComboBox").value("");

                        AjaxGetListaCuadrantes(ZonaID);
                    }
                    ventanaConfirm.close();
                });
                $("#noButtonProy").click(function () {
                    $("#inputCuadrante").data("kendoComboBox").value(proyectoInicial);
                    ventanaConfirm.close();
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
            if ($('#Guardar').text() == "Guardar" || $('#Guardar').text() == "Save") {
                opcionHabilitarView(true, "FieldSetView");
                //AjaxGuardarCaptura(ds._data, "0");
            }
            else if ($('#Guardar').text() == "Editar" || $('#Guardar').text() == "Edit") {
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

                    ventanaConfirm.close();
                });
                $("#noButton").click(function (handler) {
                    ventanaConfirm.close();
                });
            }
            else {
                if ($("#inputCuadrantePlanchado").data("kendoComboBox").dataItem($("#inputCuadrantePlanchado").data("kendoComboBox").select()) != undefined) {
                    PlanchaCuadrante();
                }
            }
        }
    });
}

function suscribirEventoTipoBusqueda() {
    $('input:radio[name=TipoBusqueda]:nth(1)').change(function () {
        $('#ZonaDiv').hide();
        $('#CuadranteDiv').hide();
        $('#SpoolIDDiv').show();
    });

    $('input:radio[name=TipoBusqueda]:nth(0)').change(function () {
        $('#ZonaDiv').show();
        $('#CuadranteDiv').show();
        $('#SpoolIDDiv').hide();
    });
}

function suscribirEventoMostrar() {
    $('#btnMostrar').click(function (e) {
        var ZonaID = $("#inputZona").val();
        var CuadranteID = $("#inputCuadrante").val();
        var SpoolIDContiene = $("#SpoolIDCOntiene").val();
        var Muestra = $('input:radio[name=Muestra]:checked').val();
        var TipoBusqueda = $('input:radio[name=TipoBusqueda]:checked').val();

        AjaxGetDetalleEtiquetado(TipoBusqueda == 'Zona' ? 1 : 0, Muestra == 'Todos' ? 1 : 0, ZonaID, CuadranteID == "" ? 0 : CuadranteID, SpoolIDContiene);
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
        $("#Area").data("kendoComboBox").enable(false);
        $("#Cuadrante").data("kendoComboBox").enable(false);
        $("#btnAgregar").prop('disabled', true);
        $(".radioImpreso").prop('disabled', true);

        //$('#Guardar1').text(_dictionary.textoEditar[$("#language").data("kendoDropDownList").value()]);
        //$("#Guardar").text(_dictionary.textoEditar[$("#language").data("kendoDropDownList").value()]);

    }
    else {
        $('#FieldSetView').find('*').attr('disabled', false);
        $("#Area").data("kendoComboBox").enable(true);
        $("#Cuadrante").data("kendoComboBox").enable(true);
        $("#btnAgregar").prop('disabled', false);
        $(".radioImpreso").prop('disabled', false);
        //$('#Guardar1').text(_dictionary.textoGuardar[$("#language").data("kendoDropDownList").value()]);
        //$("#Guardar").text(_dictionary.textoGuardar[$("#language").data("kendoDropDownList").value()]);

    }
}