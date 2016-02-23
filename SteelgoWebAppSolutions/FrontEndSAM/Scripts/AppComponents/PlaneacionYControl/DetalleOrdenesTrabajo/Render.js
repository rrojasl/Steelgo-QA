function RenderGridDetalleOrdenTrabajo(e) {

    var detailRow = e.detailRow;

    var model = e.data;
    kendo.bind(detailRow, model);
    //model.bind('change', function (e) {
    //    var tr = $('tr[data-uid=' + model.uid + ']');
    //    $('#grid').data().kendoGrid.expandRow(tr);
    //})

    detailRow.find(".gridDetalleOrdenTrabajo").kendoGrid({
        edit: function (e) {
         //   this.closeCell();
        }, 
        autoBind: true,
        dataSource: {
            data: [
                {
                    SpoolNombre: "001",
                    Dibujo: "04-4'-BUT-3CB1S-1006-NI",
                    DiametroMaximo: "700",
                    DiametroPromedio: "350",
                    Peso: "350",
                    Area: "623",
                    Juntas: "4",
                    Peqs: "162"
                },
                {
                    SpoolNombre: "002",
                    Dibujo: "02-4'-BUT-3CB1S-1006-NI",
                    DiametroMaximo: "850",
                    DiametroPromedio: "400",
                    Peso: "560",
                    Area: "483",
                    Juntas: "3",
                    Peqs: "25"
                },
            ],
            schema: {
                model: {
                    fields: {
                        SpoolNombre: { type: "string", editable: true },
                        Dibujo: { type: "string", editable: false },
                        DiametroMaximo: { type: "string", editable: false },
                        DiametroPromedio: { type: "string", editable: false },
                        Peso: { type: "string", editable: false },
                        Area: { type: "string", editable: false },
                        Juntas: { type: "string", editable: false },
                        Peqs: { type: "string", editable: false }
                    }
                }
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
            { field: "SpoolNombre", title: "Identificador Spool", filterable: true },
            { field: "Dibujo", title: "Dibujo", filterable: true },
            { field: "DiametroMaximo", title: "Diametro Máximo", filterable: true },
            { field: "DiametroPromedio", title: "Diametro Promedio", filterable: true },
            { field: "Peso", title: "Kgs", filterable: true, width: "100px" },
            { field: "Area", title: "M2", filterable: true, width: "100px" },
            { field: "Juntas", title: "Juntas", filterable: true, width: "110px" },
            { field: "Peqs", title: "Peqs", filterable: true, width: "100px" },
            { command: { text: _dictionary.botonCancelar[$("#language").data("kendoDropDownList").value()], click: eliminarCapturaDetalleSpool }, title: "", width: "99px" }
        ]
    }); 
     
    dataBound(e);
}

function dataBound(e) { 
    var grid = $(".gridDetalleOrdenTrabajo").data("kendoGrid");
    var gridData = grid.dataSource.view();
    for (var i = 0; i < gridData.length; i++) {
        var currentUid = gridData[i].uid;

        if (gridData[i].Proyectado != 1) {
            var currenRow = grid.table.find("tr[data-uid='" + currentUid + "']");
            var editButton = $(currenRow).find(".k-grid-Cancelar");

            editButton.hide();
        }
    }
}
