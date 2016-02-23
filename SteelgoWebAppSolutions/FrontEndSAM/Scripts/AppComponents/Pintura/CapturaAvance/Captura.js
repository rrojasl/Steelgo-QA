var endRangeDateShotblast;
var endRangeDatePrimario;
var plantillaShotblastero = "";
var plantillaPintor = "";
var currentDataItemGridDownload;
var win;
IniciarCapturaArmado();
function IniciarCapturaArmado() {
    AltaFecha();
}

function changeLanguageCall() {
    CargarGrid();
    AjaxCargarCamposPredeterminados();
    AjaxCargarCarrosCargados();
    AjaxCargarPintor();
    AjaxCargarShotBlastero();
    AjaxCargarCuadrante(0);
    document.title = _dictionary.lblCapturaAvance[$("#language").data("kendoDropDownList").value()];
    $('#Guardar1').text(_dictionary.textoGuardar[$("#language").data("kendoDropDownList").value()]);
    $("#Guardar").text(_dictionary.textoGuardar[$("#language").data("kendoDropDownList").value()]);
};


function AltaFecha() {
    endRangeDateShotblast = $("#FechaShotBlast").kendoDatePicker({
        max: new Date()
    });

    endRangeDateShotblast.on("keydown", function (e) {
        if (e.keyCode == 13) {
            //PlanchaFechaShotblast();
        }
    });

    endRangeDatePrimario = $("#Fechaprimario").kendoDatePicker({
        max: new Date()
    });

    endRangeDatePrimario.on("keydown", function (e) {
        if (e.keyCode == 13) {
            //PlanchaFechaPrimario();
        }
    });
}

function CargarGrid() {
    $("#grid").kendoGrid({
        edit: function (e) {
            if ($('#Guardar').text() == _dictionary.MensajeGuardar[$("#language").data("kendoDropDownList").value()]) {

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
            pageSize: 20,
            serverPaging: false,
            serverFiltering: false,
            serverSorting: false
        },
        navigatable: true,
        filterable: {
            extra: false
        },
        editable: true,
        autoHeight: true,
        sortable: true,
        scrollable: true,
        pageable: {
            refresh: false,
            pageSizes: [10, 15, 20],
            info: false,
            input: false,
            numeric: true,
        },
        columns: [
            { field: "Spool", title: _dictionary.CapturaAvanceSpool[$("#language").data("kendoDropDownList").value()], filterable: true, width: "110px" },
            { field: "SistemaPintura", title: _dictionary.CapturaAvanceSistemaPintura[$("#language").data("kendoDropDownList").value()], filterable: true, width: "120px" },
            { field: "Color", title: _dictionary.CapturaAvanceColor[$("#language").data("kendoDropDownList").value()], filterable: true, width: "110px" },
            { field: "Metros2", title: _dictionary.CapturaAvanceM2[$("#language").data("kendoDropDownList").value()], filterable: true, width: "100px" },
            { field: "FechaShotblast", title: _dictionary.CapturaAvanceFechaShotblast[$("#language").data("kendoDropDownList").value()], type: "date", filterable: true, width: "130px", format: _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()]},
            { field: "FechaPrimario", title: _dictionary.CapturaAvanceFechaPrimario[$("#language").data("kendoDropDownList").value()], type: "date", filterable: true, width: "140px", format: _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()]},
            { field: "ListaShotblasteroGuargado", title: _dictionary.CapturaAvanceShotBlastero[$("#language").data("kendoDropDownList").value()], filterable: false, editor: RendercomboBoxShotBlastero, template: "#:plantillaShotblastero#", width: "130px" },
            { field: "ListaPintorGuargado", title: _dictionary.CapturaAvancePintor[$("#language").data("kendoDropDownList").value()], filterable: false, editor: RendercomboBoxPintor, template: "#:plantillaPintor#", width: "130px" },
            { command: { text: _dictionary.PinturaDescargaDescarga[$("#language").data("kendoDropDownList").value()], click: VentanaModalDescargarMedioTransporte }, title: _dictionary.CapturaAvanceDescargar[$("#language").data("kendoDropDownList").value()], width: "99px" }

        ]
    });
    CustomisaGrid($("#grid"));
};

function VentanaModalDescargarMedioTransporte(e) {
    e.preventDefault();
    if ($("#Guardar").text() == _dictionary.MensajeGuardar[$("#language").data("kendoDropDownList").value()]) {
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