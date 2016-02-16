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
        dataSource: {
            data: '',
            schema: {
                model: {
                    fields: {
                        SpoolID: { type: "number", editable: false },
                        Seleccionado: { type: "number", editable: false },
                        Proyectado: { type: "number", editable: false },
                        SpoolNombre: { type: "string", editable: false },
                        Dibujo: { type: "string", editable: false },
                        DiametroMaximo: { type: "number", editable: false },
                        DiametroPromedio: { type: "number", editable: false },
                        Peso: { type: "number", editable: false },
                        Area: { type: "number", editable: false }
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
        detailTemplate: kendo.template($("#templateGridNivelTres").html()),
        detailInit: RenderGridNivelTres,
        columns: [ 
            { field: "Seleccionado", title: " ", filterable: false, template: '<input type="checkbox" #= Proyectado ? "disabled=disabled" : "" # class="chkbx"  ></input>', width: "50px" },
            { command: { text: _dictionary.botonCancelar[$("#language").data("kendoDropDownList").value()], click: eliminarCaptura }, title: "", width: "99px" },
            { field: "Proyecccion", title: "Proyección", filterable: false },
            { field: "SpoolNombre", title: "Spool", filterable: true },
            { field: "Dibujo", title: "Dibujo", filterable: true },
            { field: "DiametroMaximo", title: "Diametro Máximo", filterable: true },
            { field: "DiametroPromedio", title: "Diametro Promedio", filterable: true },
            { field: "Peso", title: "Kgs", filterable: true, width: "100px" },
            { field: "Area", title: "M2", filterable: true, width: "100px" },
            { field: "Juntas", title: "Juntas", filterable: true, width: "110px" },
            { field: "Peqs", title: "Peqs", filterable: true, width:"100px" },
            
        ]
    });
    dataBound(e);
     
    //Nivel 2
    $(".nivel2").data('kendoGrid').dataSource.data([]);
    var dsNivel2 = $(".nivel2").data("kendoGrid").dataSource;
    for (var i = 0; i < model.ListaSpools.length; i++) {
        dsNivel2.add(model.ListaSpools[i]);
    }

    $("td[role='gridcell']").on("change", ":checkbox", function (e) {
        debugger;
        var grid = $(".nivel2").data("kendoGrid"),
        dataItem = grid.dataItem($(e.target).closest("tr"));
         
        //var item = search(dataItem.SpoolID, $("#grid").data("kendoGrid").dataSource._data);
         
        if ($(this)[0].checked) {
            dataItem.Seleccionado = true;
        }
        else { 
            dataItem.Seleccionado = false;
              
        }
         
    });
}

function search(nameKey, myArray) {
    for (var i = 0; i < myArray.length; i++) {
        if (myArray[i].name === nameKey) {
            return myArray[i];
        }
    }
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
        dataSource: {
            data: '',
            schema: {
                model: {
                    fields: {
                        TipoJuntaID: { type: "number", editable: false },
                        Fabclas: { type: "string", editable: false },
                        TipoJunta: { type: "string", editable: false },
                        Peqs: { type: "number", editable: false }
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
            { field: "TipoJuntaID", title: "Tipo", filterable: false },
            { field: "Fabclas", title: "Fabclas", filterable: false },
            { field: "TipoJunta", title: "Tipo Junta", filterable: false }, 
            { field: "Peqs", title: "Peqs", filterable: false, width: "100px" } 
        ]
    });

    //Nivel 3
    $(".nivel3").data('kendoGrid').dataSource.data([]);
    var dsNivel3 = $(".nivel3").data("kendoGrid").dataSource;
    for (var i = 0; i < model.ListaJuntas.length; i++) {
        dsNivel3.add(model.ListaJuntas[i]);
    }
}