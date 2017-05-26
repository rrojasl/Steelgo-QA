var procesoPinturaSeleccionadoAnterior = "";
var editado = false;
var ventanaConfirmEdicionCambioProcesoPintura;
var proyectoActualSeleccionado;
var esNormal;


function Limpiar() {
    $("#InputCuadrante").val("");
    $("#InputColor").val("");
    $("#InputFechaCapturaAvanceIntAcabado").val("");
    $("#InputPintor").val("");
    $("#InputSistemaPintura").val("");
    $("#InputPinturaComponenteComposicion").val("");
    $("#grid").data('kendoGrid').dataSource.data([]);
}

function changeLanguageCall() {
    SuscribirEventos();
    AjaxCargaMostrarPredeterminadoseleciconProcesosPintura();
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
    $("#inputZona").data("kendoComboBox").dataSource.data([]);
    $("#inputCuadrante").data("kendoComboBox").dataSource.data([]);
    $("#inputSistemaPintura").data("kendoComboBox").dataSource.data([]);
    $("#InputID").data("kendoComboBox").dataSource.data([]);
    $("#inputColor").data("kendoComboBox").dataSource.data([]);

    $("#inputZona").data("kendoComboBox").value("");
    $("#inputCuadrante").data("kendoComboBox").value("");
    $("#inputSistemaPintura").data("kendoComboBox").value("");
    $("#InputID").data("kendoComboBox").value("");
    $("#inputColor").data("kendoComboBox").value("");
   

    
    //$("#grid").empty();
    //CrearGrid();
    //CustomisaGrid($("#grid"));
    //document.getElementById('divAgregarComponentesReductoresDinamicos').innerHTML = '';
    //$("#inputShotBlastero").data("kendoMultiSelect").value("");
}

function BuscarDetalle() {
       if (!editado) {
            LimpiarDespuesCambioCaptura();
            var dataItemCuadrante = $("#inputCuadrante").data("kendoComboBox").dataItem($("#inputCarro").data("kendoComboBox").select());
            var dataItemSP = $("#inputSistemaPintura").data("kendoComboBox").dataItem($("#inputCarro").data("kendoComboBox").select());
            var dataItemColor = $("#inputColor").data("kendoComboBox").dataItem($("#inputCarro").data("kendoComboBox").select());
            AjaxCargarLayoutGrid(dataItemCuadrante.CuadranteID, dataItemSP.SistemaPinturaProyectoID, dataItemColor.SistemaPinturaColorID, $("#language").val(), $('input:radio[name=ProcesoPintura]:checked').val(), $('input:radio[name=Mostrar]:checked').val());
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