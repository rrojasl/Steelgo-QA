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
var endRangeDate;
var LineaCaptura = {proyectoIDSeleccionado:"",zonaIDSeleccionado:"",cuadranteIDSeleccionado:"",sistemaPinturaIDSeleccionado:"",ColorIDSeleccionado:""}

function BloquearElementosDinamicos(bloqueado) {
    for (var i = 0; i < ComponentesDinamicosJSON.length; i++) {
        $('#' + ComponentesDinamicosJSON[i].NombreColumna).data("kendoComboBox").enable(bloqueado);
    }

    for (var i = 0; i < ReductoresDinamicosJSON.length; i++) {
        $('#' + ReductoresDinamicosJSON[i].NombreColumna).data("kendoComboBox").enable(bloqueado);
    }
}

function plancharTodo() {
    if ($("#inputPintor").data("kendoMultiSelect")._dataItems.length > 0) {
        PlancharTrabajadores($("#grid").data("kendoGrid").dataSource._data);
    }
    if ($("#inputFechaProceso").val() != "") {
        PlanchaFechaProceso();
    }

    PlanchaElementosDinamicos();
}

function PlanchaElementosDinamicos() {
    var dataSource = $("#grid").data("kendoGrid").dataSource;
    var filters = dataSource.filter();
    var allData = dataSource.data();
    var query = new kendo.data.Query(allData);
    var data = query.filter(filters).data;

    for (var i = 0; i < data.length; i++) {
        if ($('input:radio[name=LLena]:checked').val() === "Todos") {
            for (var j = 0; j < ComponentesDinamicosJSON.length; j++) {
                if ($("#" + ComponentesDinamicosJSON[j].NombreColumna).val() != undefined && $("#" + ComponentesDinamicosJSON[j].NombreColumna).val() != "")
                    data[i][ComponentesDinamicosJSON[j].NombreColumna] = $("#" + ComponentesDinamicosJSON[j].NombreColumna).val();
            }

            for (var j = 0; j < ReductoresDinamicosJSON.length; j++) {
                if ($("#" + ReductoresDinamicosJSON[j].NombreColumna).val() != undefined && $("#" + ReductoresDinamicosJSON[j].NombreColumna).val() != "")
                    data[i][ReductoresDinamicosJSON[j].NombreColumna] = $("#" + ReductoresDinamicosJSON[j].NombreColumna).val();
            }
        }


        else {
            for (var j = 0; j < ComponentesDinamicosJSON.length; j++) {
                if ($("#" + ComponentesDinamicosJSON[j].NombreColumna).val() != undefined && $("#" + ComponentesDinamicosJSON[j].NombreColumna).val() != "") {
                    if (data[i][ComponentesDinamicosJSON[j].NombreColumna] == null || data[i][ComponentesDinamicosJSON[j].NombreColumna] == "" || data[i][ComponentesDinamicosJSON[j].NombreColumna] == undefined)
                        data[i][ComponentesDinamicosJSON[j].NombreColumna] = $("#" + ComponentesDinamicosJSON[j].NombreColumna).val();
                }
            }

            for (var j = 0; j < ReductoresDinamicosJSON.length; j++) {
                if ($("#" + ReductoresDinamicosJSON[j].NombreColumna).val() != undefined && $("#" + ReductoresDinamicosJSON[j].NombreColumna).val() != "") {
                    if (data[i][ReductoresDinamicosJSON[j].NombreColumna] == null || data[i][ReductoresDinamicosJSON[j].NombreColumna] == "" || data[i][ReductoresDinamicosJSON[j].NombreColumna] == undefined)
                        data[i][ReductoresDinamicosJSON[j].NombreColumna] = $("#" + ReductoresDinamicosJSON[j].NombreColumna).val();
                }
            }
        }
    }
    $("#grid").data("kendoGrid").dataSource.sync();
}

function PlanchaFechaProceso() {
    var dataSource = $("#grid").data("kendoGrid").dataSource;
    var filters = dataSource.filter();
    var allData = dataSource.data();
    var query = new kendo.data.Query(allData);
    var data = query.filter(filters).data;

    for (var i = 0; i < data.length; i++) {
        if ($('input:radio[name=LLena]:checked').val() === "Todos") {
            data[i].FechaProceso = String(endRangeDate.val()).trim();
        }
        else {
            if (data[i].FechaProceso === "" || data[i].FechaProceso === null || data[i].FechaProceso === undefined) {
                data[i].FechaProceso = String(endRangeDate.val()).trim();
            }
        }
    }
    $("#grid").data("kendoGrid").dataSource.sync();
}

function PlancharTrabajadores(arregloCaptura) {
    ListaShotblasteroGuargado = [];
    var dataShotBlast = $("#inputPintor").data("kendoMultiSelect")._dataItems;
    var dataSource = $("#grid").data("kendoGrid").dataSource;
    var filters = dataSource.filter();
    var allData = dataSource.data();
    var query = new kendo.data.Query(allData);
    var data = query.filter(filters).data;
    for (var j = 0; j < data.length; j++) {
        if ($('input:radio[name=LLena]:checked').val() === _dictionary.CapturaTodos[$("#language").data("kendoDropDownList").value()]) {
            for (var i = 0; i < dataShotBlast.length; i++) {
                ListaShotblasteroGuargado[i] = {
                    Accion: "",
                    PinturaSpoolObreroID: "",
                    ObreroID: "",
                    Codigo: ""
                };
                ListaShotblasteroGuargado[i].Accion = 1;
                ListaShotblasteroGuargado[i].PinturaSpoolObreroID = dataShotBlast[i].PinturaSpoolObreroID;
                ListaShotblasteroGuargado[i].ObreroID = dataShotBlast[i].ObreroID;
                ListaShotblasteroGuargado[i].Codigo = dataShotBlast[i].Codigo;
            }

            if (dataShotBlast.length > 0) {

                for (var i = 0; i < arregloCaptura.length; i++) {

                    arregloCaptura[i].ListaObrerosSeleccionados = dataShotBlast;
                    arregloCaptura[i].plantillaObrero = _dictionary.CapturaAvancePintoresShotblastExistentes[$("#language").data("kendoDropDownList").value()] + arregloCaptura[i].ListaObrerosSeleccionados.length;
                }
                $("#grid").data("kendoGrid").dataSource.sync();
            }
        }
        else {
            if (data[j].ListaObrerosSeleccionados.length == 0) {
                for (var i = 0; i < dataShotBlast.length; i++) {
                    ListaShotblasteroGuargado[i] = {
                        Accion: "",
                        PinturaSpoolObreroID: "",
                        ObreroID: "",
                        Codigo: ""
                    };
                    ListaShotblasteroGuargado[i].Accion = 1;
                    ListaShotblasteroGuargado[i].PinturaSpoolObreroID = dataShotBlast[i].PinturaSpoolObreroID;
                    ListaShotblasteroGuargado[i].ObreroID = dataShotBlast[i].ObreroID;
                    ListaShotblasteroGuargado[i].Codigo = dataShotBlast[i].Codigo;
                }

                if (dataShotBlast.length > 0) {

                    for (var i = 0; i < arregloCaptura.length; i++) {

                        arregloCaptura[i].ListaObrerosSeleccionados = dataShotBlast;
                        arregloCaptura[i].plantillaObrero = _dictionary.CapturaAvancePintoresShotblastExistentes[$("#language").data("kendoDropDownList").value()] + arregloCaptura[i].ListaObrerosSeleccionados.length;
                    }
                    $("#grid").data("kendoGrid").dataSource.sync();
                }
            }
        }
    }
}

function existeSpool(spool, array) {
    for (var index = 0; index < array._data.length; index++) {
        if (array._data[index].Spool == spool) {
            return true;
        }
    }
    return false;
}

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
                            if (!($('input:radio[name=ProcesoPintura]:checked').val()=="4" && $("#inputColor").data("kendoComboBox").select() <= 0)) {
                                AjaxCargarLayoutGrid(dataItemCuadrante.CuadranteID, dataItemSP.SistemaPinturaProyectoID, dataItemColor.SistemaPinturaColorID, $("#language").val(), $('input:radio[name=ProcesoPintura]:checked').val(), $('input:radio[name=Muestra]:checked').val());
                            }
                            else {
                                displayNotify("CapturaAvanceCuadranteNoColor", "", '1');
                            }
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
           ventanaConfirmEdicionCaptura.open().center();
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
           
            var grid = $("#grid").data("kendoGrid");
            var gridData = grid.dataSource.view();

            if (gridData.length > 0) {
                for (var i = 0; i < gridData.length; i++) {
                    var currentUid = gridData[i].uid;
                    var currenRow = grid.table.find("tr[data-uid='" + currentUid + "']");
                   
                    if (gridData[i].RowOk == false) {
                        grid.table.find("tr[data-uid='" + currentUid + "']").removeClass("k-alt");
                        grid.table.find("tr[data-uid='" + currentUid + "']").addClass("kRowError");
                    }
                    else if (gridData[i].RowOk) {
                        if (i % 2 == 0)
                            grid.table.find("tr[data-uid='" + currentUid + "']").removeClass("k-alt");
                        grid.table.find("tr[data-uid='" + currentUid + "']").removeClass("kRowError");
                    }
                }
            }
            
            if (esNormal) {
                $(".k-grid-content td").css("white-space", "normal");
            }
            else {
                $(".k-grid-content td").css("white-space", "nowrap");
            }
        }
    });
}

function ObtenerDato(fecha, tipoDatoObtener) {
    var cultura = $("#language").val();

    switch (tipoDatoObtener) {
        case 1://anho
            return fecha.split('/')[2]
            break;
        case 2://mes
            if (cultura == 'es-MX')
                return fecha.split('/')[1] - 1
            else
                return fecha.split('/')[0] - 1
            break;
        case 3://dia
            if (cultura == 'es-MX')
                return fecha.split('/')[0]
            else
                return fecha.split('/')[1]
            break;
    }
}