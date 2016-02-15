function RenderGridNivelDos(e) {
    var detailRow = e.detailRow;
 
    var model = e.data;
    kendo.bind(detailRow, model);
    model.bind('change', function (e) {
        var tr = $('tr[data-uid=' + model.uid + ']');
        $('#grid').data().kendoGrid.expandRow(tr);
    })
    detailRow.find(".tabstrip").kendoTabStrip({
        animation: {
            open: { effects: "fadeIn" }
        }
    });
    
    detailRow.find(".nivel2").kendoGrid({
        edit: function (e) {
            this.closeCell();
        },
        autoBind: true,
        dataSource: [
            { Seleccionado: 0, Proyectado: "1", NombreSpool: "Spool1", Dibujo: "A16", DiametroMaximo: "24", DiametroPromedio: "10", Kgs: "23.5", M2: "5", Juntas: "4", Peqs: "16" },
            { Seleccionado: 0, Proyectado: "", NombreSpool: "Spool2", Dibujo: "A16", DiametroMaximo: "64", DiametroPromedio: "30", Kgs: "23.5", M2: "4", Juntas: "4", Peqs: "16" },
            { Seleccionado: 0, Proyectado: "", NombreSpool: "Spool3", Dibujo: "A16", DiametroMaximo: "4", DiametroPromedio: "2", Kgs: "17", M2: "65", Juntas: "4", Peqs: "16" },
            { Seleccionado: 0, Proyectado: "", NombreSpool: "Spool4", Dibujo: "A16", DiametroMaximo: "5", DiametroPromedio: "3", Kgs: "45.3", M2: "2", Juntas: "4", Peqs: "16" },
        ],
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
        detailTemplate: kendo.template($("#templateGridNivelTres").html()),
        detailInit: RenderGridNivelTres,
        columns: [ 
            { field: "Seleccionado", title: " ", filterable: false, template: '<input type="checkbox" #= Proyectado ? "disabled=disabled" : "" # class="chkbx"  ></input>', width: "50px" },
            { command: { text: _dictionary.botonCancelar[$("#language").data("kendoDropDownList").value()], click: eliminarCaptura }, title: "", width: "99px" },
            { field: "Proyectado", title: "Proyección", filterable: false },
            { field: "NombreSpool", title: "Spool", filterable: true },
            { field: "Dibujo", title: "Dibujo", filterable: true },
            { field: "DiametroMaximo", title: "Diametro Máximo", filterable: true },
            { field: "DiametroPromedio", title: "Diametro Promedio", filterable: true },
            { field: "Kgs", title: "Kgs", filterable: true, width: "100px" },
            { field: "M2", title: "M2", filterable: true, width: "100px" },
            { field: "Juntas", title: "Juntas", filterable: true, width: "110px" },
            { field: "Peqs", title: "Peqs", filterable: true, width:"100px" },
            
        ]
    });
    dataBound(e);

}

function dataBound(e) {

    var grid = $(".nivel2").data("kendoGrid");
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

function eliminarCaptura() {

}

function RenderGridNivelTres(e) {
    var detailRow = e.detailRow;

    var model = e.data;
    kendo.bind(detailRow, model);
    model.bind('change', function (e) {
        var tr = $('tr[data-uid=' + model.uid + ']');
        $('#grid').data().kendoGrid.expandRow(tr);
    })
    detailRow.find(".tabstrip").kendoTabStrip({
        animation: {
            open: { effects: "fadeIn" }
        }
    });

    

    detailRow.find(".nivel3").kendoGrid({
        edit: function (e) {
            this.closeCell();
        },
        autoBind: true,
        dataSource: [
            { Tipo: "1", Junta: "Auto 6-24", Fabclas: "TW", Peqs: "1" },
            { Tipo: "2", Junta: "Auto 6-24", Fabclas: "BW", Peqs: "5" },
            { Tipo: "3", Junta: "Auto 6-24", Fabclas: "BW", Peqs: "5" },
            { Tipo: "4", Junta: "Auto 6-24", Fabclas: "BW", Peqs: "5" },
        ],
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
            { field: "Tipo", title: "Tipo", filterable: false },
            { field: "Junta", title: "Junta", filterable: false },
            { field: "Fabclas", title: "Fabclas", filterable: false },
            { field: "Peqs", title: "Peqs", filterable: false, width: "100px" }
             

            
        ]
    });
}