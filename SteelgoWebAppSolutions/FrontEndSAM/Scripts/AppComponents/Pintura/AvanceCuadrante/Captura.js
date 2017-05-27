var procesoPinturaSeleccionadoAnterior = "";
var editado = false;
var ventanaConfirmEdicionCambioProcesoPintura;
var proyectoActualSeleccionado;
var esNormal;
var ComponentesDinamicos;
var ReductorDinamico;
var ComponentesDinamicosJSON = [];
var ReductoresDinamicosJSON = [];
var ventanaConfirmEdicionCaptura;
var elementoEjecutoChange;

var LineaCaptura = {proyectoIDSeleccionado:"",zonaIDSeleccionado:"",cuadranteIDSeleccionado:"",sistemaPinturaIDSeleccionado:"",ColorIDSeleccionado:""}

function limpiarFila(e) {
    e.preventDefault();
    var itemRow;
    itemRow = this.dataItem($(e.currentTarget).closest("tr"));
    alert("falta funcionalidad");
}

function Limpiar() {
    $("#InputCuadrante").val("");
    $("#InputColor").val("");
    $("#InputFechaCapturaAvanceIntAcabado").val("");
    $("#InputPintor").val("");
    $("#InputSistemaPintura").val("");
    $("#InputPinturaComponenteComposicion").val("");
    $("#grid").data('kendoGrid').dataSource.data([]);
}

function tieneClase(item) {

    var tieneClass = $(item).hasClass("k-state-border-up") || $(item).hasClass("k-state-border-down");
    return tieneClass;
}

function CrearControlesDinamicos() {
    if ($('#Guardar').text() == _dictionary.MensajeGuardar[$("#language").data("kendoDropDownList").value()]) {
        for (var i = 0; i < ComponentesDinamicosJSON.length; i++) {
            $("#divAgregarComponentesReductoresDinamicos").append('<div class="col-xs-3" style="display: inline-block;"><label>' + ComponentesDinamicosJSON[i].NombreColumna + '</label><input id="' + ComponentesDinamicosJSON[i].NombreColumna + '" /></div>');

            $('#' + ComponentesDinamicosJSON[i].NombreColumna).kendoComboBox({
                dataTextField: "NombreLote",
                dataValueField: "NombreLote",
                dataSource: ComponentesDinamicosJSON[i].ListadoLotes,
                suggest: true,
                delay: 10,
                filter: "contains",
                index: 3
            });
        }

        for (var i = 0; i < ReductoresDinamicosJSON.length; i++) {
            $("#divAgregarComponentesReductoresDinamicos").append('<div class="col-xs-3" style="display: inline-block;"><label>' + ReductoresDinamicosJSON[i].NombreColumna + '</label><input id="' + ReductoresDinamicosJSON[i].NombreColumna + '" /></div>');

            $('#' + ReductoresDinamicosJSON[i].NombreColumna).kendoComboBox({
                dataTextField: "NombreLote",
                dataValueField: "NombreLote",
                dataSource: ReductoresDinamicosJSON[i].ListadoLotes,
                suggest: true,
                delay: 10,
                filter: "contains",
                index: 3
            });
        }
    }

}

function changeLanguageCall() {
    SuscribirEventos();
    AjaxCargarCamposPredeterminados();
}

function ValidarFechaPrimario(valor) {
    var fecha = kendo.toString(valor, String(_dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()].replace('{', '').replace('}', '').replace("0:", "")));
    if (fecha == null) {
        $("#inputFechaProceso").data("kendoDatePicker").value('');
    }
}

function CambiarProcesoPintura() {
    if (procesoPinturaSeleccionadoAnterior == "")
        procesoPinturaSeleccionadoAnterior = $('input:radio[name=ProcesoPintura]:checked').val();

    if (!editado) {
        LimpiarDespuesCambioProcesoPintura();
        procesoPinturaSeleccionadoAnterior = $('input:radio[name=ProcesoPintura]:checked').val();
        AjaxCargarProyecto();
    }
    else {
        ventanaConfirmEdicionCambioProcesoPintura.open().center();
    }
}

function LimpiarDespuesCambioProcesoPintura() {
    $("#inputProyecto").data("kendoComboBox").dataSource.data([]);
    $("#inputZona").data("kendoComboBox").dataSource.data([]);
    $("#inputCuadrante").data("kendoComboBox").dataSource.data([]);
    $("#inputSistemaPintura").data("kendoComboBox").dataSource.data([]);
    $("#InputID").data("kendoComboBox").dataSource.data([]);
    $("#inputColor").data("kendoComboBox").dataSource.data([]);

    $("#inputProyecto").data("kendoComboBox").value("");
    $("#inputZona").data("kendoComboBox").value("");
    $("#inputCuadrante").data("kendoComboBox").value("");
    $("#inputSistemaPintura").data("kendoComboBox").value("");
    $("#InputID").data("kendoComboBox").value("");
    $("#inputColor").data("kendoComboBox").value("");
   

    
    $("#grid").empty();
    CrearGrid();
    CustomisaGrid($("#grid"));
    document.getElementById('divAgregarComponentesReductoresDinamicos').innerHTML = '';
    $("#inputPintor").data("kendoMultiSelect").value("");
}

function BuscarDetalle() {
       if (!editado) {
            LimpiarDespuesCambioCaptura();
            var dataItemCuadrante = $("#inputCuadrante").data("kendoComboBox").dataItem($("#inputCuadrante").data("kendoComboBox").select());
            var dataItemSP = $("#inputSistemaPintura").data("kendoComboBox").dataItem($("#inputSistemaPintura").data("kendoComboBox").select());
            var dataItemColor = $("#inputColor").data("kendoComboBox").dataItem($("#inputColor").data("kendoComboBox").select());
            if ($("#inputProyecto").data("kendoComboBox").select() > 0) {
                if ($("#inputZona").data("kendoComboBox").select() > 0) {
                    if ($("#inputCuadrante").data("kendoComboBox").select() > 0) {
                        if ($("#inputSistemaPintura").data("kendoComboBox").select() > 0) {
                                AjaxCargarLayoutGrid(dataItemCuadrante.CuadranteID, dataItemSP.SistemaPinturaProyectoID, dataItemColor.SistemaPinturaColorID, $("#language").val(), $('input:radio[name=ProcesoPintura]:checked').val(), $('input:radio[name=Muestra]:checked').val());
                        }
                        else {
                            displayNotify("CapturaAvanceCuadranteNoSistemaPintura", "", '1');
                        }
                    }
                    else {
                        displayNotify("CapturaAvanceCuadranteNoCuadrante", "", '1');
                    }
                }
                else {
                    displayNotify("CapturaAvanceCuadranteNoZona", "", '1');
                }
            }
            else {
                displayNotify("CapturaAvanceCuadranteNoProyecto", "", '1');
            }
        }
        else {
            ventanaConfirmEdicion.open().center();
        }
}

function LimpiarDespuesCambioCaptura() {
    $("#InputOrdenTrabajo").val("");
    $("#InputID").data("kendoComboBox").value("");
    $("#grid").empty();
    CrearGrid();
    CustomisaGrid($("#grid"));
    document.getElementById('divAgregarComponentesReductoresDinamicos').innerHTML = '';
    $("#inputPintor").data("kendoMultiSelect").value("");
}

function CrearGrid() {
    $("#grid").kendoGrid({
        edit: function (e) {
            var inputName = e.container.find('input');
            inputName.select();

            if ($('#Guardar').text() == _dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]) {

            }
            else {
                this.closeCell();
            }
        },
        dataBound: function (e) {
            var ds = $("#grid").data("kendoGrid");
            var gridData = ds.dataSource.view();

            //if (gridData.length > 0) {
            //    for (var i = 0; i < gridData.length; i++) {
            //        var currentUid = gridData[i].uid;
            //        var currenRow = ds.table.find("tr[data-uid='" + currentUid + "']");
            //        var editButton = $(currenRow).find(".k-button");
            //        if (gridData[i].CargaCarroID != 0) {
            //            var classDescarga = $("#language").val() == "es-MX" ? "k-grid-Descarga" : "k-grid-Discharging";
            //            editButton[0].outerHTML = '<a class="k-button k-button-icontext ' + classDescarga + '" href="#/"><span class=""></span>' +
            //                _dictionary.botonDescarga[$("#language").data("kendoDropDownList").value()] + '</a>';

            //        } else {
            //            editButton[0].outerHTML = '<a class="k-button k-button-icontext k-grid-Cancelar" href="#/"><span class=""></span>' +
            //                _dictionary.botonCancelar[$("#language").data("kendoDropDownList").value()] + '</a>';
            //        }
            //    }
            //}
            
            if (esNormal) {
                $(".k-grid-content td").css("white-space", "normal");
            }
            else {
                $(".k-grid-content td").css("white-space", "nowrap");
            }
        }
    });
}