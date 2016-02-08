function SuscribirEventos() {
    SuscribirEventoCuadrante();
    SuscribirEventoPintor();
    SuscribirEventoLote();
    SuscribirEventoFecha();
    SuscribirEventoMostrar();
    SuscribirEventoGuardar();
    SuscribirEventoComponenteComposicion();
    SuscribirEventoColor();
    SuscribirEventoSistemaPintura();

};

function SuscribirEventoCuadrante() {
    $('#inputCuadrante').kendoDropDownList({
        dataTextField: "Nombre",
        dataValueField: "CuadranteID ",
        suggest: true,
        index: 3
    });
}


function SuscribirEventoPintor() {
    var detallePintoresSeleccionados;

    $('#inputPintor').kendoMultiSelect({
        dataTextField: "Pintor",
        dataValueField: "ObreroID",
        suggest: true,
        index: 3,
        autoBind: false,
        animation: {
            close: {
                effects: "fadeOut zoom:out",
                duration: 300
            },
            open: {
                effects: "fadeIn zoom:in",
                duration: 300
            }
        },
        change: function (e) {
            //------------------modelo del pintor---------------------

            detallePintoresSeleccionados = e.sender._dataItems;
            //--------------------------------------------------------


        },
    }).closest('.k-widget').keydown(function (e) {
        if (e.keyCode == 13) {
            PlanchaPintor(detallePintoresSeleccionados);
        }
    });
}

function SuscribirEventoLote() {
    $('#inputLote').kendoDropDownList({
        dataTextField: "NumeroLote",
        dataValueField: "LotePinturaID ",
        suggest: true,
        index: 3
    }).closest('.k-widget').keydown(function (e) {
        if (e.keyCode == 13) {
            PlanchaLote();
        }
    });
}

function SuscribirEventoComponenteComposicion() {
    $('#inputPinturaComponenteComposicion').kendoDropDownList({
        dataTextField: "Componente",
        dataValueField: "ComponenteID",
        suggest: true,
        index: 3
    }).closest('.k-widget').keydown(function (e) {
        if (e.keyCode == 13) {
            PlanchaComponenteComposicion();
        }
    });
}

function SuscribirEventoSistemaPintura() {
    $('#inputSistemaPintura').kendoDropDownList({
        dataTextField: "Nombre",
        dataValueField: "SistemaPinturaID",
        suggest: true,
        index: 3,
        change: function () {
            AjaxComponenteComposicion();
        }

    }).closest('.k-widget').keydown(function (e) {
        if (e.keyCode == 13) {
            PlanchaSistemaPintura();
        }
    });
}

function SuscribirEventoFecha() {
    $("#inputFechaCapturaAvanceIntAcabado").kendoDatePicker({
        max: new Date()
    }).closest('.k-widget').keydown(function (e) {
        if (e.keyCode == 13) {
            PlanchaFecha();
        }
    });
}

//function SuscribirEventoSpoolID() {
//    var dataItem;
//    $("#InputSpoolID").kendoComboBox({
//        dataTextField: "IDValido",
//        dataValueField: "Valor",
//        suggest: true,
//        filter: "contains",
//        index: 3,
//        select: function (e) { 
//            dataItem = this.dataItem(e.item.index());

//            if (dataItem.Status != "1") {
//                e.preventDefault();
//                $("#InputSpoolID").val("");
//                console.log("borrar datos");

//                displayMessage(_dictionary.AlertaError[$("#language").data("kendoDropDownList").value()], dataItem.Status, '1'); 

//            }
//            else {
//                $("#InputSpoolID").val(dataItem.IDValido);
//                Cookies.set("Proyecto", dataItem.ProyectoID + '°' + dataItem.Proyecto);
//                $("#LabelProyecto").text(dataItem.Proyecto); 
//            } 
//        }
//        ,
//        change: function (e) {
//            dataItem = this.dataItem(e.sender.selectedIndex);
//            if ($("#InputSpoolID").val().length == 1) {
//                $("#InputSpoolID").data("kendoComboBox").value(("00" + $("#InputSpoolID").val()).slice(-3));
//            }
//            if ($("#InputSpoolID").val() != '' && $("#InputPrefijoSpool").val() != '') {
//                Cookies.set("Proyecto", dataItem.ProyectoID + '°' + dataItem.Proyecto);
//                $("#LabelProyecto").text(dataItem.Proyecto); 
//            } 
//        }
//    });

//$("#InputPrefijoSpool").blur(function (e) {
//    if ($("#InputPrefijoSpool").val().match("^[a-zA-Z][0-9]*$")) {
//        try {
//            AjaxObtenerSpoolID();
//        } catch (e) {
//            displayMessage("Mensajes_error", e.message, '0');
//        }
//    } else {
//        displayMessage("CapturaArmadoMensajeOrdenTrabajo", "", '1');
//        $("#InputPrefijoSpool").focus();
//    }
//});

//$("#InputPrefijoSpool").focus(function (e) {
//    $("#InputPrefijoSpool").val("");
//    $("#InputSpoolID").data("kendoComboBox").value("");
//    $("#InputSpoolID").data("kendoComboBox").setDataSource();
//});

//$('#InputSpoolID').closest('.k-widget').keydown(function (e) {
//    if (e.keyCode == 37) {
//        $("#InputPrefijoSpool").focus();
//    } 
//    else if (e.keyCode == 40) {
//        $("#InputSpoolID").data("kendoComboBox").select();
//    }
//});

//}

function SuscribirEventoMostrar() {
    $("#btnMostrar").click(function () {
        var _cuadranteId = $("#inputCuadrante").val();

        var _paso;

        if ($("input:radio[name='PasoTipo']:checked").val() == "intermedio") {
            _paso = 3;
        }
        else if ($("input:radio[name='PasoTipo']:checked").val() == "acabado") {
            _paso = 4;
        }
        AjaxMostrarCapturaAvanceIntAcabado(_cuadranteId, _paso);
    });
}

function SuscribirEventoGuardar() {
    $("#Guardar, #GuardarPie, #Guardar1, #btnGuardar").click(function () {
        var ds = $("#grid").data("kendoGrid").dataSource;
        var _pasoId;
        if ($("input:radio[name='PasoTipo']:checked").val() == "intermedio") {
            _pasoId = 3;
        }
        else if ($("input:radio[name='PasoTipo']:checked").val() == "acabado") {
            _pasoId = 4;
        }

        AjaxGuardarCaptura(ds._data, _pasoId);
    });

    $("").click(function () {

    });
}

function SuscribirEventoColor() {
    $('#inputColor').kendoDropDownList({
        dataTextField: "Nombre",
        dataValueField: "ColorID",
        suggest: true,
        index: 3
    });
    $('#inputColor').closest('.k-widget').keydown(function (e) {
        if (e.keyCode == 13) {
            PlanchaColor();
        }
    });
}

function opcionHabilitarView(valor, name) {

    if (valor) {
        $('#FieldSetView').find('*').attr('disabled', true);
        $(".botonDeplegaMenu").attr("disabled", true);
     
        $("#InputCuadrante").data("kendoComboBox").enable(false);
        $("#InputColor").data("kendoComboBox").enable(false);
        $("#InputFechaCapturaAvanceIntAcabado").data("kendoComboBox").enable(false);
        $("#InputPintor").data("kendoComboBox").enable(false);
        $("#InputSistemaPintura").data("kendoComboBox").enable(false);
        $("#InputPinturaComponenteComposicion").data("kendoComboBox").enable(false);
        
    }
    else {
        $('#FieldSetView').find('*').attr('disabled', false);
        $(".botonDeplegaMenu").attr("disabled", true);
        $("#InputCuadrante").data("kendoComboBox").enable(true);
        $("#InputColor").data("kendoComboBox").enable(true);
        $("#InputFechaCapturaAvanceIntAcabado").data("kendoComboBox").enable(true);
        $("#InputPintor").data("kendoComboBox").enable(true);
        $("#InputSistemaPintura").data("kendoComboBox").enable(true);
        $("#InputPinturaComponenteComposicion").data("kendoComboBox").enable(true);
    }
}

function Limpiar() {
    $("#InputCuadrante").val("");
    $("#InputColor").val("");
    $("#InputFechaCapturaAvanceIntAcabado").val("");
    $("#InputPintor").val("");
    $("#InputSistemaPintura").val("");
    $("#InputPinturaComponenteComposicion").val("");
    $("#InputID").data("kendoComboBox").dataSource.data([]);
    //AjaxObtenerCuadrante(); 
    //setTimeout(function () { AjaxObtenerLote(); }, 2000);
    //setTimeout(function () { AjaxObtenerColor(); }, 2500);
    //setTimeout(function () { AjaxObtenerPintores(); }, 3000);
    //setTimeout(function () { AjaxSistemaPintura(); }, 3500);
    $("#grid").data('kendoGrid').dataSource.data([]);
}
