var endRangeDateShotblast;

var plantillaShotblastero = "";
var plantillaPintor = "";
var currentDataItemGridDownload;
var win;
IniciarCapturaArmado();
function IniciarCapturaArmado() {
    AltaFecha();
}

function changeLanguageCall() {
    endRangeDateShotblast.data("kendoDatePicker").setOptions({
        format: _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()]
    });

    AjaxCargarCamposPredeterminados();
    AjaxCargarShotBlastero();
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

function CargarGrid() {
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
        autoBind: true,
        dataSource: {
            data: [],
            schema: {
                model: {
                    fields: {
                        Spool: { type: "string", editable: false },
                        SistemaPintura: { type: "string", editable: false },
                        Metros2: { type: "number", editable: false },
                        Peso: { type: "string", editable: false },
                        Color: { type: "string", editable: false },
                        FechaShotblast: { type: "date", editable: true },
                        FechaPrimario: { type: "date", editable: true },
                        Lote: { type: "string", editable: false }
                    }
                }
            },
            filter: {
                logic: "or",
                filters: [
                  { field: "Accion", operator: "eq", value: 1 },
                  { field: "Accion", operator: "eq", value: 2 }
                ]
            },
            pageSize: 10,
            serverPaging: false,
            serverFiltering: false,
            serverSorting: false
        },
        navigatable: true,
        filterable: getGridFilterableMaftec(),
        editable: true,
        autoHeight: true,
        sortable: true,
        scrollable: true,
        pageable: {
            refresh: false,
            pageSizes: [10, 25, 50, 100],
            info: false,
            input: false,
            numeric: true,
        },
        columns: [
            { field: "Spool", title: _dictionary.columnNumeroControl[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec() },
            { field: "SistemaPintura", title: _dictionary.columnSistemaPintura[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec() },
            { field: "Color", title: _dictionary.columnColor[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec() },
            { field: "Metros2", title: _dictionary.columnM2[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellNumberMaftec(), attributes: { style: "text-align:right;" } },
            { field: "Lote", title: _dictionary.columnLote[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellNumberMaftec(), attributes: { style: "text-align:right;" } },
            { field: "FechaShotblast", title: _dictionary.columnFechaShotblast[$("#language").data("kendoDropDownList").value()], type: "date", filterable: getKendoGridFilterableDateMaftec(), format: _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()] },
            { field: "ListaShotblasteroGuargado", title: _dictionary.columnShotblastero[$("#language").data("kendoDropDownList").value()], filterable: false, editor: RendercomboBoxShotBlastero, template: "#:plantillaShotblastero#", width: "25%" },
            { command: { text: _dictionary.botonDescarga[$("#language").data("kendoDropDownList").value()] }, title: _dictionary.columnDescargar[$("#language").data("kendoDropDownList").value()], width: "60px", attributes: { style: "text-align:center;" } },
            { command: { text: _dictionary.botonLimpiar[$("#language").data("kendoDropDownList").value()], click: VentanaModalDescargarMedioTransporte }, title: _dictionary.columnLimpiar[$("#language").data("kendoDropDownList").value()], width: "50px" }

        ]
    });
    CustomisaGrid($("#grid"));
};

function VentanaModalDescargarMedioTransporte(e) {
    e.preventDefault();
    if ($("#Guardar").text() == _dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]) {
        currentDataItemGridDownload = this.dataItem($(e.currentTarget).closest("tr"));

        win = $("#windowDownload").kendoWindow({
            modal: true,
            title: "",
            resizable: false,
            visible: true,
            width: "50%",
            minWidth: 30,
            position: {
                top: "1%",
                left: "1%"
            },
            animation: false,
            actions: [
                "Close"
            ],
        }).data("kendoWindow");

        $("#windowDownload").data("kendoWindow").center().open();

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