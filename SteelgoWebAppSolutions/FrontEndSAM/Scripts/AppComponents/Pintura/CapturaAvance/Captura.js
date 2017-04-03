var endRangeDateShotblast;

var plantillaShotblastero = "";
var plantillaPintor = "";
var currentDataItemGridDownload;
var windowDownload = null;
var procesoPinturaSeleccionadoAnterior="";
var editado = false;


IniciarCapturaArmado();

function IniciarCapturaArmado() {
    AltaFecha();
}

function changeLanguageCall() {
    endRangeDateShotblast.data("kendoDatePicker").setOptions({
        format: _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()]
    });
    SuscribirEventos();

    AjaxCargarCamposPredeterminados();
   
 
    document.title = _dictionary.lblCapturaAvance[$("#language").data("kendoDropDownList").value()];
    $('#Guardar1').text(_dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]);
    $("#Guardar").text(_dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]);
};



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

function limpiarFila(e)
{
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

function PlancharShotBlastero(arregloCaptura) {
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

                    arregloCaptura[i].ListaShotblasteroGuargado = dataShotBlast;
                    arregloCaptura[i].plantillaShotblastero = _dictionary.CapturaAvancePintoresShotblastExistentes[$("#language").data("kendoDropDownList").value()] + arregloCaptura[i].ListaShotblasteroGuargado.length;
                }
                $("#grid").data("kendoGrid").dataSource.sync();
            }
        }
        else {
            if (data[j].ListaShotblasteroGuargado.length == 0) {
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

                        arregloCaptura[i].ListaShotblasteroGuargado = dataShotBlast;
                        arregloCaptura[i].plantillaShotblastero = _dictionary.CapturaAvancePintoresShotblastExistentes[$("#language").data("kendoDropDownList").value()] + arregloCaptura[i].ListaShotblasteroGuargado.length;
                    }
                    $("#grid").data("kendoGrid").dataSource.sync();
                }
            }
        }
    }
}

function PlanchaFechaShotblast() {
    var dataSource = $("#grid").data("kendoGrid").dataSource;
    var filters = dataSource.filter();
    var allData = dataSource.data();
    var query = new kendo.data.Query(allData);
    var data = query.filter(filters).data;

    for (var i = 0; i < data.length; i++) {
        if ($('input:radio[name=LLena]:checked').val() === "Todos") {
            data[i].FechaShotblast = String(endRangeDateShotblast.val()).trim();
        }
        else {
            if (data[i].FechaShotblast === "" || data[i].FechaShotblast === null || data[i].FechaShotblast === undefined) {
                data[i].FechaShotblast = String(endRangeDateShotblast.val()).trim();
            }
        }
    }
    $("#grid").data("kendoGrid").dataSource.sync();
}

function PlanchaFechaPrimario() {
    var dataSource = $("#grid").data("kendoGrid").dataSource;
    var filters = dataSource.filter();
    var allData = dataSource.data();
    var query = new kendo.data.Query(allData);
    var data = query.filter(filters).data;

    for (var i = 0; i < data.length; i++) {
        if ($('input:radio[name=LLena]:checked').val() === "Todos") {
            data[i].FechaPrimario = String(endRangeDatePrimario.val()).trim();
        }
        else {
            if (data[i].FechaPrimario === "" || data[i].FechaPrimario === null || data[i].FechaPrimario === undefined) {
                data[i].FechaPrimario = String(endRangeDatePrimario.val()).trim();
            }
        }
    }
    $("#grid").data("kendoGrid").dataSource.sync();
}



function PlanchaCuadranteDescarga() {
    var dataSource = $("#grid").data("kendoGrid").dataSource;
    var filters = dataSource.filter();
    var allData = dataSource.data();
    var query = new kendo.data.Query(allData);
    var data = query.filter(filters).data;

    for (var i = 0; i < data.length; i++) {
        if ($('input:radio[name=LLena]:checked').val() === "Todos") {
            data[i].Cuadrante = $("#inputCuadrante1").data("kendoComboBox").text();
            data[i].CuadranteID = $("#inputCuadrante1").data("kendoComboBox").value();
        }
        else {
            if (data[i].Cuadrante === "" || data[i].Cuadrante === null || data[i].Cuadrante === undefined) {
                data[i].Cuadrante = $("#inputCuadrante1").data("kendoComboBox").text();
                data[i].CuadranteID = $("#inputCuadrante1").data("kendoComboBox").value();
            }
        }
    }

    $("#grid").data("kendoGrid").dataSource.sync();
}

function LimpiarDespuesCambioProcesoPintura() {
    $("#InputOrdenTrabajo").val("");
    $("#InputID").data("kendoComboBox").value("");
    $("#grid").empty();
    CrearGrid();
    CustomisaGrid($("#grid"));
}

function CrearGrid()
{
    $("#grid").kendoGrid({
        //dataSource: {
        //    filter: {
        //        logic: "or",
        //        filters: [
        //          { field: "Accion", operator: "eq", value: 1 },
        //          { field: "Accion", operator: "eq", value: 2 },
        //          { field: "Accion", operator: "eq", value: 4 },
        //          { field: "Accion", operator: "eq", value: 0 },
        //          { field: "Accion", operator: "eq", value: undefined }
        //        ]
        //    },
        //    pageSize: 10,
        //    serverPaging: false,
        //    serverFiltering: false,
        //    serverSorting: false
        //},
        edit: function (e) {
            var inputName = e.container.find('input');
            inputName.select();

            if ($('#Guardar').text() == _dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]) {

            }
            else {
                this.closeCell();
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