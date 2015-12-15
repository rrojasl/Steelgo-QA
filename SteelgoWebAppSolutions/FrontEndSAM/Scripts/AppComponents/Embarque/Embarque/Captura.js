function changeLanguageCall() {
    CargarGrid();
    AjaxCargarProveedor();
    if ($('#embarqueID').val() != 0) {
        AjaxCargarDatos($('#embarqueID').val());
    } 
};


function CargarGrid() {
    $("#grid").kendoGrid({
        autoBind: true,
        dataSource: {
            data: [],
            schema: {
                model: {
                    fields: {
                        Plana: { type: "string", editable: false },
                    }
                }
            },
            filter: {
                logic: "or",
                filters: [
                  { field: "Accion", operator: "eq", value: 1 },
                  { field: "Accion", operator: "eq", value: 2 },
                    { field: "Accion", operator: "eq", value: 0 },
                    { field: "Accion", operator: "eq", value: undefined }
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
            { field: "Plana", title: "Plana", filterable: true },
             {
                 command: {
                     text: _dictionary.botonCancelar[$("#language").data("kendoDropDownList").value()],
                     click: function (e) {
                         e.preventDefault();
                         var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                         var dataSource = this.dataSource;
                         if (confirm(_dictionary.ValidacionResultadosMensajeEliminarDefecto[$("#language").data("kendoDropDownList").value()])) {

                             if (dataItem.Accion == 2) {
                                 dataItem.Accion = 3;
                             }
                             else {
                                 dataSource.remove(dataItem);
                             }
                         }
                         dataSource.sync();
                     }
                 },
                 title: "",
                 width: "99px",
                 
             }
            
        ]
    });
};


function AgregaRenglon(planaID, plana) {
    ArregloNuevoRenglon = [];
    ArregloNuevoRenglon[0] = {
        Accion: "",
        EmbarqueID: "",
        PlanaID: "",
        TractoID: ""
    };

    ArregloNuevoRenglon[0].Accion = 1;
    ArregloNuevoRenglon[0].PlanaID = planaID;
    ArregloNuevoRenglon[0].Plana = plana;

    var ds = $("#grid").data("kendoGrid").dataSource;
    
    if (ds._data.length < 2) {
        if (!existePlana(ds, ArregloNuevoRenglon[0].Plana)) {
            ds.add(ArregloNuevoRenglon[0]);
        }
        else {
            displayMessage("", "La plana ya se agrego", "1");
        }
    }
    else {
        displayMessage("", "Solo se pueden agregar 2 planas", "1");
    }
}


function existePlana(contenidoGrid,plana) {
    var existe = false;
    for (var i = 0; i < contenidoGrid._data.length ; i++) {
        if (contenidoGrid._data[i].Plana == plana) {
            existe = true;
        }
    }
    return existe;
}