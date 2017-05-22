var endRangeDateShotblast;
var dataItemCuadranteNuevo;
var plantillaShotblastero = "";
var plantillaPintor = "";
var currentDataItemGridDownload;
var windowDownload = null;
var procesoPinturaSeleccionadoAnterior = "";
var editado = false;
var esNormal;
var ComponentesDinamicos;
var ReductorDinamico;
var ComponentesDinamicosJSON = [];
var ReductoresDinamicosJSON = [];
var paramProcesoPinturaID;
var paramCarroID;

IniciarCapturaArmado();

function IniciarCapturaArmado() {
    AltaFecha();
}

function getParameterByName(name, url) {

    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}


function SiguienteProceso(paramReq) {
    var url = "";
    if (paramReq == null) {
        url = "/Pintura/AvanceCuadrante?leng=" + $("#language").data("kendoDropDownList").value();
    } else {
        url = "/Pintura/AvanceCuadrante?leng=" + $("#language").data("kendoDropDownList").value()
            + "&carroID=" + paramReq;
    }

    $("#DescargaCarroSuperior").attr("href", url);
    $("#DescargaCarroInferior").attr("href", url);
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

function changeLanguageCall() {

     paramProcesoPinturaID = getParameterByName('ProcesoPinturaID') == undefined || getParameterByName('ProcesoPinturaID') == null ? "" : getParameterByName('ProcesoPinturaID').trim();
     paramCarroID = getParameterByName('CarroID') == undefined || getParameterByName('CarroID') == null ? "" : getParameterByName('CarroID').trim();

    

    endRangeDateShotblast.data("kendoDatePicker").setOptions({
        format: _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()]
    });
    SuscribirEventos();
    AjaxCargarCamposPredeterminados();
    document.title = _dictionary.lblCapturaAvance[$("#language").data("kendoDropDownList").value()];
    $('#Guardar1').text(_dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]);
    $("#Guardar").text(_dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]);

  

};

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

function AltaFecha() {
    endRangeDateShotblast = $("#FechaShotBlast").kendoDatePicker({
        max: new Date(),
        change: function (e) {
            ValidarFechaShot(e.sender._value);
        }
    });

    endRangeDateShotblast.on("keydown", function (e) {
        if (e.keyCode == 13) {
            PlanchaFechaShotblast();
        }
        if (e.keyCode == 9) {
            ValidarFechaShot($("#FechaShotBlast").data("kendoDatePicker").value());
        }
    });

    $("#FechaShotBlast").blur(function (e) {
        ValidarFechaShot($("#FechaShotBlast").data("kendoDatePicker").value());
    });

    endRangeDatePrimario = $("#Fechaprimario").kendoDatePicker({
        max: new Date(),
        change: function (e) {
            ValidarFechaPrimario(e.sender._value);
        }
    });

    endRangeDatePrimario.on("keydown", function (e) {
        if (e.keyCode == 13) {
            PlanchaFechaPrimario();
        }
        if (e.keyCode == 9) {
            ValidarFechaPrimario($("#Fechaprimario").data("kendoDatePicker").value());
        }

        $("#Fechaprimario").blur(function (e) {
            ValidarFechaPrimario($("#Fechaprimario").data("kendoDatePicker").value());
        });
    });
}

function ValidarFechaShot(valor) {
    var fecha = kendo.toString(valor, String(_dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()].replace('{', '').replace('}', '').replace("0:", "")));
    if (fecha == null) {
        $("#FechaShotBlast").data("kendoDatePicker").value('');
    }
}

function ValidarFechaPrimario(valor) {
    var fecha = kendo.toString(valor, String(_dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()].replace('{', '').replace('}', '').replace("0:", "")));
    if (fecha == null) {
        $("#Fechaprimario").data("kendoDatePicker").value('');
    }
}

function limpiarFila(e) {
    e.preventDefault();
    var itemRow;
    itemRow = this.dataItem($(e.currentTarget).closest("tr"));
    alert("falta funcionalidad");
}


function VentanaModalDescargarSpool(e) {
    e.preventDefault();

    if ($("#Guardar").text() == _dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]) {
        currentDataItemGridDownload = this.dataItem($(e.currentTarget).closest("tr"));
        AjaxCargarZona(currentDataItemGridDownload.PatioID);
        windowDownload.open().center();
    }

};



function PlancharPintor(arregloCaptura) {



    ListaPintorGuargado = [];

    var dataPintor = $("#inputPintor").data("kendoMultiSelect")._dataItems;
    var dataSource = $("#grid").data("kendoGrid").dataSource;
    var filters = dataSource.filter();
    var allData = dataSource.data();
    var query = new kendo.data.Query(allData);
    var data = query.filter(filters).data;

    for (var i = 0; i < data.length; i++) {

        if ($('input:radio[name=LLena]:checked').val() === _dictionary.CapturaTodos[$("#language").data("kendoDropDownList").value()]) {
            for (var j = 0; j < dataPintor.length; j++) {
                ListaPintorGuargado[j] = {
                    Accion: "",
                    PinturaSpoolObreroID: "",
                    ObreroID: "",
                    Codigo: ""
                };
                ListaPintorGuargado[j].Accion = 1;
                ListaPintorGuargado[j].PinturaSpoolObreroID = dataPintor[j].PinturaSpoolObreroID;
                ListaPintorGuargado[j].ObreroID = dataPintor[j].ObreroID;
                ListaPintorGuargado[j].Codigo = dataPintor[j].Codigo;
            }

            arregloCaptura[i].ListaPintorGuargado = dataPintor;

            arregloCaptura[i].plantillaPintor = _dictionary.CapturaAvancePintoresPrimariosExistentes[$("#language").data("kendoDropDownList").value()] + arregloCaptura[i].ListaPintorGuargado.length;

        }
        else {
            if (data[i].ListaPintorGuargado.length == 0) {
                for (var k = 0; k < dataPintor.length; k++) {
                    ListaPintorGuargado[k] = {
                        Accion: "",
                        PinturaSpoolObreroID: "",
                        ObreroID: "",
                        Codigo: ""
                    };
                    ListaPintorGuargado[k].Accion = 1;
                    ListaPintorGuargado[k].PinturaSpoolObreroID = dataPintor[k].PinturaSpoolObreroID;
                    ListaPintorGuargado[k].ObreroID = dataPintor[k].ObreroID;
                    ListaPintorGuargado[k].Codigo = dataPintor[k].Codigo;
                }

                arregloCaptura[i].ListaPintorGuargado = dataPintor;

                arregloCaptura[i].plantillaPintor = _dictionary.CapturaAvancePintoresPrimariosExistentes[$("#language").data("kendoDropDownList").value()] + arregloCaptura[i].ListaPintorGuargado.length;
            }
        }
    }
    $("#grid").data("kendoGrid").dataSource.sync();
}

function PlancharTrabajadores(arregloCaptura) {
    ListaShotblasteroGuargado = [];
    var dataShotBlast = $("#inputShotBlastero").data("kendoMultiSelect")._dataItems;
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

function PlanchaFechaProceso() {
    var dataSource = $("#grid").data("kendoGrid").dataSource;
    var filters = dataSource.filter();
    var allData = dataSource.data();
    var query = new kendo.data.Query(allData);
    var data = query.filter(filters).data;

    for (var i = 0; i < data.length; i++) {
        if ($('input:radio[name=LLena]:checked').val() === "Todos") {
            data[i].FechaProceso = String(endRangeDateShotblast.val()).trim();
        }
        else {
            if (data[i].FechaProceso === "" || data[i].FechaProceso === null || data[i].FechaProceso === undefined) {
                data[i].FechaProceso = String(endRangeDateShotblast.val()).trim();
            }
        }
    }
    $("#grid").data("kendoGrid").dataSource.sync();
}



function CambiarProcesoPintura() {
    if (procesoPinturaSeleccionadoAnterior == "")
        procesoPinturaSeleccionadoAnterior = $('input:radio[name=ProcesoPintura]:checked').val();

    if ($('input:radio[name=ProcesoPintura]:checked').val() == "1") {
        if (!editado) {
            procesoPinturaSeleccionadoAnterior = $('input:radio[name=ProcesoPintura]:checked').val();
            AjaxCargarCarrosCargadosPorProceso(1);
        }
        else {
            ventanaConfirmEdicionCambioProcesoPintura.open().center();
        }
    }
    else if ($('input:radio[name=ProcesoPintura]:checked').val() == "2") {
        if (!editado) {
            procesoPinturaSeleccionadoAnterior = $('input:radio[name=ProcesoPintura]:checked').val();
            AjaxCargarCarrosCargadosPorProceso(2);
        }
        else {
            ventanaConfirmEdicionCambioProcesoPintura.open().center();
        }
    }
    else if ($('input:radio[name=ProcesoPintura]:checked').val() == "3") {
        if (!editado) {
            procesoPinturaSeleccionadoAnterior = $('input:radio[name=ProcesoPintura]:checked').val();
            AjaxCargarCarrosCargadosPorProceso(3);
        }
        else {
            ventanaConfirmEdicionCambioProcesoPintura.open().center();
        }
    }
    else if ($('input:radio[name=ProcesoPintura]:checked').val() == "4") {
        if (!editado) {
            procesoPinturaSeleccionadoAnterior = $('input:radio[name=ProcesoPintura]:checked').val();
            AjaxCargarCarrosCargadosPorProceso(4);
        }
        else {
            ventanaConfirmEdicionCambioProcesoPintura.open().center();
        }
    }
}

function BuscarDetalleCarro() {
    if ($("#inputCarro").data("kendoComboBox").dataItem($("#inputCarro").data("kendoComboBox").select()) != undefined) {
        if (!editado) {
            LimpiarDespuesCambioCarro();
            var dataItem = $("#inputCarro").data("kendoComboBox").dataItem($("#inputCarro").data("kendoComboBox").select());
            AjaxCargarLayoutGrid(dataItem.SistemaPinturaProyectoID, $('input:radio[name=ProcesoPintura]:checked').val(), dataItem.MedioTransporteCargaID);
        }
        else {
            ventanaConfirmEdicion.open().center();
        }
    }
}

function LimpiarDespuesCambioProcesoPintura() {

    $("#inputCarro").data("kendoComboBox").dataSource.data([]);
    $("#inputCarro").data("kendoComboBox").value("");
    $("#inputCarro").val("");
    $("#InputOrdenTrabajo").val("");
    $("#InputID").data("kendoComboBox").value("");
    $("#grid").empty();
    CrearGrid();
    CustomisaGrid($("#grid"));
    document.getElementById('divAgregarComponentesReductoresDinamicos').innerHTML = '';
    $("#inputShotBlastero").data("kendoMultiSelect").value("");
}

function LimpiarDespuesCambioCarro() {
    $("#InputOrdenTrabajo").val("");
    $("#InputID").data("kendoComboBox").value("");
    $("#grid").empty();
    CrearGrid();
    CustomisaGrid($("#grid"));
    document.getElementById('divAgregarComponentesReductoresDinamicos').innerHTML = '';
    $("#inputShotBlastero").data("kendoMultiSelect").value("");
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

            if (gridData.length > 0) {
                for (var i = 0; i < gridData.length; i++) {
                    var currentUid = gridData[i].uid;
                    var currenRow = ds.table.find("tr[data-uid='" + currentUid + "']");
                    var editButton = $(currenRow).find(".k-button");
                    if (gridData[i].CargaCarroID != 0) {
                        var classDescarga = $("#language").val() == "es-MX" ? "k-grid-Descarga" : "k-grid-Discharging";
                        editButton[0].outerHTML = '<a class="k-button k-button-icontext ' + classDescarga + '" href="#/"><span class=""></span>' +
                            _dictionary.botonDescarga[$("#language").data("kendoDropDownList").value()] + '</a>';

                    } else {
                        editButton[0].outerHTML = '<a class="k-button k-button-icontext k-grid-Cancelar" href="#/"><span class=""></span>' +
                            _dictionary.botonCancelar[$("#language").data("kendoDropDownList").value()] + '</a>';
                    }
                }
            }
            //var grid = $("#grid").data("kendoGrid");
            //var gridData = grid.dataSource.view();

            //for (var i = 0; i < gridData.length; i++) {
            //    var currentUid = gridData[i].uid;
            //    if (gridData[i].RowOk == false) {
            //        grid.table.find("tr[data-uid='" + currentUid + "']").removeClass("k-alt");
            //        grid.table.find("tr[data-uid='" + currentUid + "']").addClass("kRowError");

            //    }
            //    else if (gridData[i].RowOk) {
            //        if (i % 2 == 0)
            //            grid.table.find("tr[data-uid='" + currentUid + "']").removeClass("k-alt");
            //        grid.table.find("tr[data-uid='" + currentUid + "']").removeClass("kRowError");
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

function FiltroMostrar(mostrar) {
    if ($("#grid").data("kendoGrid") != undefined) {
        var ds = $("#grid").data("kendoGrid").dataSource;

        if (mostrar == 0) {
            var curr_filters = ds.filter().filters;
            if (curr_filters[0].filters != undefined)
                ds.filter(curr_filters[0].filters[0])
            else
                ds.filter(curr_filters[0])
            ds.sync();
        }
        else {
            if (ds.filter() != undefined) {
                var curr_filters = ds.filter().filters;
                ds.filter(curr_filters[0])
                ds.sync();
                var filters = ds.filter();
                filters.logic = "or"

                filters.filters.push({ field: "Accion", operator: "eq", value: 2 });
                filters.filters.push({ field: "Accion", operator: "eq", value: 4 });
                ds.sync();
            }
        }
    }
}