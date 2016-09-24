function changeLanguageCall() {
    CargarGrid();
    //document.title = _dictionary.PinturaHeaderDescargaCarroPintura[$("#language").data("kendoDropDownList").value()];
}

IniciarCapturaPinturaDescarga();
function IniciarCapturaPinturaDescarga() {
    SuscribirEventos();
    //setTimeout(function () { AjaxCargarCuadrante(0); }, 2400);
    //setTimeout(function () { AjaxCargarCarrosCargados(); }, 1500);

}
function CargarGrid() {
    $("#grid").kendoGrid({
        edit: function (e) {
            if ($('#botonGuardar2').text() == _dictionary.MensajeGuardar[$("#language").data("kendoDropDownList").value()]) {
            }
            else {
                this.closeCell();
            }
        },
        autoBind: true,
        dataSource: {
            schema: {
                model: {
                    fields: {
                        SpoolJunta: { type: "string", editable: false },
                        SistemaPintura: { type: "string", editable: false },
                        Metros2: { type: "number", editable: false },
                        Cuadrante: { type: "string", editable: true }
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
            pageSizes: [10, 25, 50, 100],
            info: false,
            input: false,
            numeric: true,
        },
        columns: [
            { field: "Spool", title: _dictionary.columnNumeroControl[$("#language").data("kendoDropDownList").value()], width: "240px", filterable: true },
            { field: "Junta", title: _dictionary.columnJunta[$("#language").data("kendoDropDownList").value()], width: "240px", filterable: true },
            { field: "Metros2", title: _dictionary.columnMetros2[$("#language").data("kendoDropDownList").value()], width: "240px", filterable: true },
            { field: "Cuadrante", title: _dictionary.columnCuadrante[$("#language").data("kendoDropDownList").value()], width: "240px", editor: RenderComboBoxCuadrante, filterable: true },
            { command: { text: _dictionary.columnDescargar[$("#language").data("kendoDropDownList").value()], width: "99px", click: VentanaModalDescargarMedioTransporte }, title: _dictionary.columnDescargar[$("#language").data("kendoDropDownList").value()] }
        ]
    });
    CustomisaGrid($("#grid"));
}

function VentanaModalDescargarMedioTransporte(e) {
    e.preventDefault();
    if ($("#botonGuardar2").text() == _dictionary.MensajeGuardar[$("#language").data("kendoDropDownList").value()]) {
        currentDataItemGridDownload = this.dataItem($(e.currentTarget).closest("tr"));

        win = $("#windowDownload").kendoWindow({
            modal: true,
            title: "",
            resizable: false,
            visible: true,
            width: "20%",
            minWidth: 30,
            position: {
                top: "1%",
                left: "1%"
            },
            animation: {
                close: false,
                open: false
            },
            actions: [
                "Close"
            ],
        }).data("kendoWindow");

        $("#windowDownload").data("kendoWindow").center().open();

        $("#inputCuadrantePopup").data("kendoComboBox").value(currentDataItemGridDownload.CuadranteID);
    }

};

function PlanchaCuadrante() {
    if ($("#inputCuadrante").val() != "") {
        var dataSource = $("#grid").data("kendoGrid").dataSource;
        var filters = dataSource.filter();
        var allData = dataSource.data();
        var query = new kendo.data.Query(allData);
        var data = query.filter(filters).data;

        for (var i = 0; i < data.length; i++) {
            data[i].CuadranteID = $("#inputCuadrante").val();
            data[i].Cuadrante = $("#inputCuadrante").data("kendoComboBox").text();
        }
        $("#grid").data("kendoGrid").dataSource.sync();
    }
}