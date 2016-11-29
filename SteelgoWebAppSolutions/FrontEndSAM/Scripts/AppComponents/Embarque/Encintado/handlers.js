function SuscribirEventos() {
    SuscribirEventoZona();
    SuscribirEventoCuadrante();
    SuscribirEventoCuadrantePlanchado();
    SuscribirEventoCambiarVista();
    SuscribirEventoChangeRadio();
    SuscribirEventoMostrar();
    SuscribirEventoPlanchar();
    SuscribirEventoGuardar();
    SuscribirEventoImprimirTraveler();
    suscribirEventoCambioImpreso();
}

function suscribirEventoCambioImpreso() {
    $('.radioBtnImpreso').change(function () {
        if ($('.radioBtnImpreso')[0].checked) {
            if ($("#Area").val() != "") {
                if ($("#Cuadrante").val() != "") {
                    if ($("#Area").data("kendoComboBox").dataItem($("#Area").data("kendoComboBox").select()) != undefined) {
                        //AjaxCargarDatos($("#Area").data("kendoComboBox").value(), $("#Cuadrante").data("kendoComboBox").value(), $('input:radio[name=Impreso]:checked').val(), 2, $('input:radio[name=ConCinta]:checked').val());
                    }
                    else {
                        $("#Area").data("kendoComboBox").value("");
                    }

                }
            }
        }
        else if ($('.radioBtnImpreso')[1].checked) {
            if ($("#Area").val() != "") {
                if ($("#Cuadrante").val() != "") {
                    if ($("#Area").data("kendoComboBox").dataItem($("#Area").data("kendoComboBox").select()) != undefined) {
                        //AjaxCargarDatos($("#Area").data("kendoComboBox").value(), $("#Cuadrante").data("kendoComboBox").value(), $('input:radio[name=Impreso]:checked').val(), 2, $('input:radio[name=ConCinta]:checked').val());
                    }
                    else {
                        $("#Area").data("kendoComboBox").value("");
                    }
                }
            }
        }
    });

    $('.radioBtnCaptura').change(function () {
        if ($('.radioBtnCaptura')[0].checked) {
            if ($("#Area").val() != "") {
                if ($("#Cuadrante").val() != "") {
                    if ($("#Area").data("kendoComboBox").dataItem($("#Area").data("kendoComboBox").select()) != undefined) {
                        //AjaxCargarDatos($("#Area").data("kendoComboBox").value(), $("#Cuadrante").data("kendoComboBox").value(), $('input:radio[name=Impreso]:checked').val(), 2, $('input:radio[name=ConCinta]:checked').val());
                    }
                    else {
                        $("#Area").data("kendoComboBox").value("");
                    }

                }
            }
        }
        else if ($('.radioBtnCaptura')[1].checked) {
            if ($("#Area").val() != "") {
                if ($("#Cuadrante").val() != "") {
                    if ($("#Area").data("kendoComboBox").dataItem($("#Area").data("kendoComboBox").select()) != undefined) {
                        //AjaxCargarDatos($("#Area").data("kendoComboBox").value(), $("#Cuadrante").data("kendoComboBox").value(), $('input:radio[name=Impreso]:checked').val(), 2, $('input:radio[name=ConCinta]:checked').val());
                    }
                    else {
                        $("#Area").data("kendoComboBox").value("");
                    }
                }
            }
        }
    });

    $('.radioBtnConCinta').change(function () {
        if ($('.radioBtnConCinta')[0].checked) {
            if ($("#Area").val() != "") {
                if ($("#Cuadrante").val() != "") {
                    if ($("#Area").data("kendoComboBox").dataItem($("#Area").data("kendoComboBox").select()) != undefined) {
                        //AjaxCargarDatos($("#Area").data("kendoComboBox").value(), $("#Cuadrante").data("kendoComboBox").value(), $('input:radio[name=Impreso]:checked').val(), 2, $('input:radio[name=ConCinta]:checked').val());
                    }
                    else {
                        $("#Area").data("kendoComboBox").value("");
                    }

                }
            }
        }
        else if ($('.radioBtnConCinta')[1].checked) {
            if ($("#Area").val() != "") {
                if ($("#Cuadrante").val() != "") {
                    if ($("#Area").data("kendoComboBox").dataItem($("#Area").data("kendoComboBox").select()) != undefined) {
                        //AjaxCargarDatos($("#Area").data("kendoComboBox").value(), $("#Cuadrante").data("kendoComboBox").value(), $('input:radio[name=Impreso]:checked').val(), 2, $('input:radio[name=ConCinta]:checked').val());
                    }
                    else {
                        $("#Area").data("kendoComboBox").value("");
                    }
                }
            }
        }
    });

}

function SuscribirEventoZona() {
    $("#InputZona").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "ZonaID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            var dataItem = this.dataItem(e.sender.selectedIndex);

            LimpiarCargarZona();
            if (dataItem != undefined) {
                if (dataItem.ZonaID != 0) {                    
                    AjaxCargarCuadrante(dataItem.ZonaID);
                }
            }
            else {
                $("#InputZona").data("kendoComboBox").value("");
            }

        }
    });
}

function SuscribirEventoCuadrante() {
    $("#InputCuadrante").kendoComboBox({
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
                $("#InputCuadrante").data("kendoComboBox").value("");
            }

        }
    });

    $('#InputCuadrante').closest('.k-widget').keydown(function (e) {
        if (e.keyCode == 13) {
            tipoBusqueda = 1;
            zonaID = $("#InputZona").data("kendoComboBox").value();
            cuadranteID = $("#InputCuadrante").data("kendoComboBox").value();
            if (zonaID != 0) {
                AjaxCargarDetalleEncintado()
                //alert('xD');
            } else {
                displayNotify("MensajeSeleccionarZona", "", '2');
            }
        }
    });
}

function SuscribirEventoCuadrantePlanchado() {
    $("#InputCuadrantePlanchado").kendoComboBox({
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
                $("#InputCuadrantePlanchado").data("kendoComboBox").value("");
            }

        }
    });
}

function SuscribirEventoCambiarVista() {
    $('#styleZona').click(function () {

        if (!existenCambios()) {
            $("#InputZona").data("kendoComboBox").value("");

            $("#InputCuadrante").data("kendoComboBox").dataSource.data([]);
            $("#InputCuadrante").data("kendoComboBox").value("");

            $("#InputCuadrantePlanchado").data("kendoComboBox").dataSource.data([]);
            $("#InputCuadrantePlanchado").data("kendoComboBox").value("");

            $("#SpoolDiv").hide();
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
                $("#InputZona").data("kendoComboBox").value("");

                $("#InputCuadrante").data("kendoComboBox").dataSource.data([]);
                $("#InputCuadrante").data("kendoComboBox").value("");

                $("#InputCuadrantePlanchado").data("kendoComboBox").dataSource.data([]);
                $("#InputCuadrantePlanchado").data("kendoComboBox").value("");

                $("#SpoolDiv").hide();
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

        if(!existenCambios()){

            $("#InputSpoolIDCOntiene").val("");

            $("#InputCuadrantePlanchado").data("kendoComboBox").dataSource.data([]);
            $("#InputCuadrantePlanchado").data("kendoComboBox").value("");

            $("#ZonaDiv").hide();
            $("#CuadranteDiv").hide();
            $("#SpoolDiv").show();
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
                $("#InputSpoolIDCOntiene").val("");

                $("#InputCuadrantePlanchado").data("kendoComboBox").dataSource.data([]);
                $("#InputCuadrantePlanchado").data("kendoComboBox").value("");

                $("#ZonaDiv").hide();
                $("#CuadranteDiv").hide();
                $("#SpoolDiv").show();
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

function SuscribirEventoChangeRadio() {
    $('input:radio[name=Muestra]:nth(0)').change(function () {
        FiltroMostrar(0);
    });
    $('input:radio[name=Muestra]:nth(1)').change(function () {
        FiltroMostrar(1);
    });
}

var tipoBusqueda = 1;
var zonaID = 0;
var cuadranteID = 0;
var spool = 0;
function SuscribirEventoMostrar() {
    $("#btnMostrar").click(function (e) {
        if ($("#styleZona").hasClass("active")) {
            tipoBusqueda = 1;
            zonaID = $("#InputZona").data("kendoComboBox").value();
            cuadranteID = $("#InputCuadrante").data("kendoComboBox").value();
            if(zonaID != 0){               
                AjaxCargarDetalleEncintado();
                //alert('xD');
            } else {
                displayNotify("MensajeSeleccionarZona", "", '2');
            }
        } else if ($("#styleSpool").hasClass("active")) {
            tipoBusqueda = 2;
            spool = $("#InputSpoolIDCOntiene").val();

            AjaxCargarCuadranteSpool(spool);
            AjaxCargarDetalleEncintado();
        } else {
            displayNotify("EncintadoMensajeSeleccionarZona", "", '2');
        }
    });
}

function SuscribirEventoPlanchar() {
    $("#btnPlanchar").click(function (e) {
        e.preventDefault();
        if ($("#grid").data("kendoGrid").dataSource._data.length > 0) {
            if ($('input:radio[name=LLena]:checked').val() === "Todos") {

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

                ventanaConfirm.content(_dictionary.MensajeAdvertenciaPlancharTodos[$("#language").data("kendoDropDownList").value()] +
                             "</br><center><button class='confirm_yes btn btn-blue' id='yesButton'>Si</button><button class='confirm_yes btn btn-blue' id='noButton'> No</button></center>");

                ventanaConfirm.open().center();

                $("#yesButton").click(function (handler) {
                    if ($("#InputCuadrantePlanchado").data("kendoComboBox").dataItem($("#InputCuadrantePlanchado").data("kendoComboBox").select()) != undefined) {
                        PlancharCuadrante("Todos");
                    }
                    PlanchaEncintado();
                    ventanaConfirm.close();
                });
                $("#noButton").click(function (handler) {
                    ventanaConfirm.close();
                });
            }
            else if ($('input:radio[name=LLena]:checked').val() === "Vacios") {
                if ($("#InputCuadrantePlanchado").data("kendoComboBox").dataItem($("#InputCuadrantePlanchado").data("kendoComboBox").select()) != undefined) {
                    PlancharCuadrante("Vacios");
                    PlanchaEncintado();
                }
            } else {
                displayNotify("MensajeErrorTipoPlanchado", "", '2');
            }
        }
    });
}

function SuscribirEventoGuardar() {
    $("#Guardar, #btnGuardar, #Guardar1, #btnGuardar1").click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        if (ds._data.length > 0) {
            if ($('#Guardar').text() == _dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]) {
                //opcionHabilitarView(false, "FieldSetView");
                AjaxGuardarCaptura(ds._data, 1);
            }
            else if ($('#Guardar').text() == _dictionary.textoEditar[$("#language").data("kendoDropDownList").value()]) {
                opcionHabilitarView(true, "FieldSetView")
            }
        } else {
            displayNotify("MensajeAdverteciaExcepcionGuardado", "", '2');
        }
        
    });

    $("#btnGuardarYNuevo, #btnGuardarYNuevo1").click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        if (ds._data.length > 0) {
            AjaxGuardarCaptura(ds._data, 2);
            LimpiarPantalla();
        } else {
            displayNotify("MensajeAdverteciaExcepcionGuardado", "", '2');
        }

    });
}

//function SuscribirEventoGuardar() {
//    //$('.accionGuardar').click(function (e) {
//        var ds = $("#grid").data("kendoGrid").dataSource;
//        if (ds._data.length > 0) {
//            if (($('#Guardar').text() == "Guardar" || $('#Guardar').text() == "Save") || ($('#btnGuardar1').text() == "Guardar" || $('#btnGuardar1').text() == "Save")) {
//                AjaxGuardarCaptura(ds._data, 0);
//            }
//            else if (($('#Guardar').text() == "Editar" || $('#Guardar').text() == "Edit") || ($('#btnGuardar1').text() == "Editar" || $('#btnGuardar1').text() == "Edit")) {
//                opcionHabilitarView(false, "FieldSetView")
//            }
//        }
//    //});
//}


function SuscribirEventoImprimirTraveler() {

    $("#btnImprimirTravelSup, #btnImprimirTravelInf").click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;

    });
}

function opcionHabilitarView(valor, name) {

    if (valor) {
        $('#FieldSetView').find('*').attr('disabled', false);
        $('#FieldSetView2').find('*').attr('disabled', false);
        $('#FieldSetView3').find('*').attr('disabled', false);
        $(".chk-Encintado").attr('disabled', false);

        //$("#InputZona").data("kendoComboBox").enable(true);
        //$("#InputCuadrante").data("kendoComboBox").enable(true);
        ////$("#InputSpoolIDCOntiene").enable(true);
        //$("#btnPlanchar").prop('disabled', true);
        //$("#LlenaVacios").prop('disabled', true);
        //$("#SelectTodos").prop('disabled', true);

        //$("#LlenaTodos").prop('disabled', true);
        //$("#SelectTodosSi").prop('disabled', true);
        //$("#SelectTodosNo").prop('disabled', true);
        //$("#SelectTodosNinguno").prop('disabled', true);

        
        $("#Guardar").text(_dictionary.textoGuardar[$("#language").data("kendoDropDownList").value()]);
        $("#btnGuardar").text(_dictionary.textoGuardar[$("#language").data("kendoDropDownList").value()]);
        $("#Guardar1").text(_dictionary.textoGuardar[$("#language").data("kendoDropDownList").value()]);
        $('#btnGuardar1').text(_dictionary.textoGuardar[$("#language").data("kendoDropDownList").value()]);
    }
    else {
        $('#FieldSetView').find('*').attr('disabled', true);
        $('#FieldSetView2').find('*').attr('disabled', true);
        $('#FieldSetView3').find('*').attr('disabled', true);
        $(".chk-Encintado").attr('disabled', true);


        //$("#InputZona").data("kendoComboBox").enable(false);
        //$("#InputCuadrante").data("kendoComboBox").enable(false);
        ////$("#InputSpoolIDCOntiene").enable(false);
        //$("#btnPlanchar").prop('disabled', false);
        //$("#LlenaVacios").prop('disabled', false);
        //$("#SelectTodos").prop('disabled', false);

        //$("#LlenaTodos").prop('disabled', false);
        //$("#SelectTodosSi").prop('disabled', false);
        //$("#SelectTodosNo").prop('disabled', false);
        //$("#SelectTodosNinguno").prop('disabled', false);

        $("#Guardar").text(_dictionary.textoEditar[$("#language").data("kendoDropDownList").value()]);
        $("#btnGuardar").text(_dictionary.textoEditar[$("#language").data("kendoDropDownList").value()]);
        $("#Guardar1").text(_dictionary.textoEditar[$("#language").data("kendoDropDownList").value()]);
        $('#btnGuardar1').text(_dictionary.textoEditar[$("#language").data("kendoDropDownList").value()]);
    }
}

function LimpiarCargarZona() {
    $("#InputCuadrante").data("kendoComboBox").dataSource.data([]);
    $("#InputCuadrante").data("kendoComboBox").value("");

    $("#InputCuadrantePlanchado").data("kendoComboBox").dataSource.data([]);
    $("#InputCuadrantePlanchado").data("kendoComboBox").value("");
}

function LimpiarPantalla() {
    $("#InputSpoolIDCOntiene").val("");
    $("#grid").data("kendoGrid").dataSource.data([]);
    AjaxCargarCamposPredeterminados();
}