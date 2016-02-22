function SuscribirEventos() {
    suscribirEventoSubirCarro();
    suscribirEventoCarro();
    SuscribirEventoGuardarCrearMedioTransporte();
    SuscribirEventoPersistencia();
    SuscribirEventoClasificacion(); 
}

SuscribirEventos();

function suscribirEventoSubirCarro() {

    $('#Guardar, #btnGuardar, #GuardarPie, #Guardar1').click(function (e) {
        e.stopPropagation();
        if ($('#Guardar').text() == "Guardar") {
            var ds = $("#grid").data("kendoGrid").dataSource;
            var array = new Array();
      
            AjaxSubirSpool(ds._data, false);
        }
        else if ($('#Guardar').text() == "Editar") {
            SetDisabledBooleanEnGrid(false);
            opcionHabilitarView(false, "FieldSetView")
        }
        
    });

    $('#btnGuardarYNuevo, #btnGuardarYNuevo1').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        AjaxSubirSpool(ds._data, true);
        Limpiar();
    });
}

function suscribirEventoCarro() {
    
    $("#inputCarro").kendoComboBox({
        dataTextField: "NombreMedioTransporte",
        dataValueField: "MedioTransporteCargaID",
        suggest: true,
        filter: "contains",
        select: function (e) {
            var dataItem = this.dataItem(e.item.index());

            $('#inputCarro').attr("mediotransporteid", dataItem.MedioTransporteID);
            if (dataItem.MedioTransporteID == "-1") {
                LimpiarCarro();
                windowNewCarriage = $("#divNuevoMedioTransporte").kendoWindow({
                    modal: true,
                    // title:,
                    resizable: false,
                    visible: true,
                    width: "auto",
                    minWidth: "20%",

                    position: {
                        top: "1%",
                        left: "1%"
                    },
                    actions: [
                        "Close"
                    ],
                }).data("kendoWindow");
                $("#divNuevoMedioTransporte").data("kendoWindow").title(_dictionary.CrearNuevoCarro[$("#language").data("kendoDropDownList").value()]);
                $("#divNuevoMedioTransporte").data("kendoWindow").center().open();
            }
            else {
                AjaxCargarSpool(false, dataItem.MedioTransporteCargaID);
            }
        }
        //,
        //change: function (e) {
        //    var dataItem = this.dataItem(e.sender.selectedIndex);
        //    if (dataItem != undefined) {
        //        if (dataItem.MedioTransporteID == "-1") {
        //            LimpiarCarro();
        //            windowNewCarriage = $("#divNuevoMedioTransporte").kendoWindow({
        //                modal: true,
        //                // title:,
        //                resizable: false,
        //                visible: true,
        //                width: "auto",
        //                minWidth: "20%",

        //                position: {
        //                    top: "1%",
        //                    left: "1%"
        //                },
        //                actions: [
        //                    "Close"
        //                ],
        //            }).data("kendoWindow");
        //            $("#divNuevoMedioTransporte").data("kendoWindow").title(_dictionary.CrearNuevoCarro[$("#language").data("kendoDropDownList").value()]);
        //            $("#divNuevoMedioTransporte").data("kendoWindow").center().open();
        //        }
        //        else {
        //            $('#inputCarro').attr("mediotransporteid", dataItem.MedioTransporteID);
        //            AjaxCargarSpool();
        //        }
        //    }
        //    else if($("#Guardar").text() == _dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]) {
        //        displayMessage("NoExisteCarro", '', '2');
        //    } 
        //}
    });


}
  
function SuscribirEventoPersistencia() {
    $('#inputPersistencia').kendoComboBox({
        dataTextField: "Tipo",
        dataValueField: "TipoPersistenciaID ",
        suggest: true,
        filter: "contains",
        index: 3,
        select: function (e) {
            var dataItem = this.dataItem(e.item.index());

            if (dataItem.Tipo.toLowerCase() == "cantidad") {
                $("#divNumeroVeces").show();
            }
            else {
                $("#divNumeroVeces").hide();
            }
        },
        change: function (e) {
            var dataItem = this.dataItem(e.sender.selectedIndex);
            if (dataItem != undefined) {
                if (dataItem.Tipo.toLowerCase() == "cantidad") {
                    $("#divNumeroVeces").show();
                }
                else {
                    $("#divNumeroVeces").hide();
                }
            }
            else {
                displayMessage("NoExistePersistencia", '', '2');
            }
        }
    });

    $("#inputPersistencia").blur(function () {
        $("#inputPersistencia").data("kendoComboBox").trigger("change");
    });
}

function SuscribirEventoClasificacion() {

    $('#inputClasificacion').kendoComboBox({
        dataTextField: "NombreClasificacion",
        dataValueField: "ClasificacionPersistenciaID ",
        suggest: true,
        filter: "contains",
        index: 3
    });
}

function opcionHabilitarView(valor, name) {
    var $menu = $('.save-group');

    if (valor) {
        $('#FieldSetView').find('*').attr('disabled', true); 
        $(".botonDeplegaMenu").attr("disabled", true);
        $("#Guardar").text(_dictionary.PinturaCargaEditar[$("#language").data("kendoDropDownList").value()]);
        $('#botonGuardar').text(_dictionary.PinturaCargaEditar[$("#language").data("kendoDropDownList").value()]);
        $("#inputCarro").data("kendoComboBox").enable(false);
    }
    else {
        $('#FieldSetView').find('*').attr('disabled', false); 
        $(".botonDeplegaMenu").attr("disabled", false);
        $("#Guardar").text(_dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]);
        $('#botonGuardar').text(_dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]);
        $("#inputCarro").data("kendoComboBox").enable(true);
    }
}

function SuscribirEventoGuardarCrearMedioTransporte() {
    $('#btnGuardarCrearMedioTransporte').click(function (e) {
        AjaxGuardarNuevoCarro()
    });
}

 