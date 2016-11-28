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
        filterable: getGridFilterableMaftec(),
        columns: [
            { field: "NumeroControl", title: _dictionary.columnSpool[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec() },
            { field: "Cuadrante", title: _dictionary.columnCuadrante[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec() },
            { field: "Area", title: _dictionary.columnM2[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec() },
            { field: "Peso", title: _dictionary.columnToneladas[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec() },
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
    if (!$("#inputCerrar").is(":checked")) {
        if ($('#Guardar').text() == _dictionary.MensajeGuardar[$("#language").data("kendoDropDownList").value()]) {
            AjaxCargarZona();
            var dataItem = $("#grid").data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));

            ventanaPopup = $("#ventanaPopup").kendoWindow({
                title: _dictionary.EmbarqueCargaTituloPopupCuadrante[$("#language").data("kendoDropDownList").value()],
                visible: false,
                width: "40%",
                height: "auto",
                modal: true,
                animation: false
            }).data("kendoWindow");

            $("#btnDescargar").click(function (e) {
                var zonaID = $("#inputZonaPopup").data("kendoComboBox").value();
                var cuadranteID = $("#inputCuadrantePopup").data("kendoComboBox").value();
                if (zonaID != "" && zonaID != "0") {
                    if (cuadranteID != "" && cuadranteID != "0") {
                        ventanaPopup.close();
                        AjaxDescargarSpool(dataItem);
                    } else {
                        displayNotify("EmbarqueCargaMsjErrorZona", "", "2");
                    }
                } else {
                    displayNotify("EmbarqueCargaMsjErrorCuadrante", "", "2");
                }
            });

            ventanaPopup.open().center();
        }
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