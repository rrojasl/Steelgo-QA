IniciarCapturaEmpaquetado();
var FechaPaquete;

function IniciarCapturaEmpaquetado() {
    SuscribirEventos();
}
function changeLanguageCall() {
    CargarGrid();
    AjaxCargarCamposPredeterminados();
    AjaxCargarProyectos();
    document.title = "Empaquetado";
    FechaPaquete.data("kendoDatePicker").setOptions({
        format: _dictionary.FormatoFecha2[$("#language").data("kendoDropDownList").value()]
    });

    SuscribirEventoWindowsPopup();
    SuscribirEventoPopupDescaga();
    SuscribirEventoPopUpPaqueteVacio();
};


function CargarGrid() {
    $("#grid").kendoGrid({
        autoBind: true,
        dataSource: {
            data: [],
            schema: {
                model: {
                    fields: {
                        Accion: { type: "number", editable: false },
                        NumeroControl: { type: "string", editable: false },
                        Cuadrante: { type: "string", editable: false },
                        Area: { type: "number", editable: false },
                        Peso: { type: "number", editable: false }
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
            serverSorting: false,
            aggregate: [
                { field: "Area", aggregate: "sum" },
                { field: "Peso", aggregate: "sum" }
            ]
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
            pageSizes: [10, 25, 50, 100],
            info: false,
            input: false,
            numeric: true,
        },
        filterable: getGridFilterableMaftec(),
        columns: [
            { field: "NumeroControl", title: _dictionary.columnSpool[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec() },
            { field: "Cuadrante", title: _dictionary.columnCuadrante[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec() },
            { field: "Area", title: _dictionary.columnM2[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellNumberMaftec(), aggregates: ["sum"], footerTemplate: "<div style='text-align:right;'>SUM: #= kendo.toString(sum, 'n3') #</div>", attributes: { style: "text-align:right;" } },
            { field: "Peso", title: _dictionary.columnPeso[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellNumberMaftec(), aggregates: ["sum"], footerTemplate: "<div style='text-align:right;'>SUM: #= kendo.toString(sum, 'n3') #</div>", attributes: { style: "text-align:right;" } },
            { command: { text: _dictionary.botonDescarga[$("#language").data("kendoDropDownList").value()], click: descargaSpool }, title: _dictionary.columnDescargar[$("#language").data("kendoDropDownList").value()], width: "70px" }
        ],
        dataBound: function (e) {
            var ds = $("#grid").data("kendoGrid");
            var gridData = ds.dataSource.view();

            if (gridData.length > 0) {
                for (var i = 0; i < gridData.length; i++) {
                    var currentUid = gridData[i].uid;
                    if (gridData[i].Accion != 2) {
                        var currenRow = ds.table.find("tr[data-uid='" + currentUid + "']");
                        var downloadButton = $(currenRow).find(".k-button");
                        downloadButton.hide();
                    }
                }
            }
        }
    });
    CustomisaGrid($("#grid"));
};

function descargaSpool(e) {
    e.preventDefault();
    
        if ($('#Guardar').text() == _dictionary.MensajeGuardar[$("#language").data("kendoDropDownList").value()]) {
            var dataItem = $("#grid").data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));

            $("#InputZonaDescarga").data("kendoComboBox").value(dataItem.ZonaAnteriorID);
            $("#InputZonaDescarga").data("kendoComboBox").trigger("change");
            CuadranteAnterior = dataItem.CuadranteAnteriorSam3ID;
            $("#InputUidRow").val(dataItem.uid);

            windowDownload.open().center();
        }
}

function existenCambios() {
    var ds = $("#grid").data("kendoGrid").dataSource._data;
    if (ds.length > 0) {
        for (var i = 0; i < ds.length; i++) {
            if (ds[i].ModificadoPorUsuario)
                return true;
        }

    }
    return false;
}

function validarInformacion(row) {
    var ds = $("#grid").data("kendoGrid").dataSource;
    var existe = false;

    for (var i = 0; i < ds._data.length; i++) {

        if (ds._data[i]["NumeroControl"] == row.NumeroControl) {
            existe = true;
            break;
        }
    }
    return existe;
}

function ValidarFecha(valor) {
    var fecha = kendo.toString(valor, String(_dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()].replace('{', '').replace('}', '').replace("0:", "")));
    if (fecha == null) {
        $("#InputFechaPaquete").data("kendoDatePicker").value('');
    }
}

function ImprimirTotalToneladas(ds) {
    if (ds != null) {
        var totalToneladas = 0;
        for (var i = 0; i < ds.length; i++) {

            totalToneladas = totalToneladas + ds[i].Peso;
        }
        $("#TotalToneladas").css('text-align', 'center');
        $("#TotalToneladas").text(totalToneladas != 0 ? kendo.toString(totalToneladas, 'n3') : "");
    } else {
        $("#TotalToneladas").text("");
    }
}

function ImprimirTotalPiezas(ds) {
    if (ds != null) {
        $("#TotalPiezas").css('text-align', 'center');
        $("#TotalPiezas").text(ds.length != 0 ? ds.length : "");
    } else {
        $("#TotalPiezas").text("");
    }
}