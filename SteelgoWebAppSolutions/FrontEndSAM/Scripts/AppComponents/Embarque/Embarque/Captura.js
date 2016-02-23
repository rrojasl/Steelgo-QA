var transportistaEmb, choferEmb, tractoEmb;
var bandera = false;
var EmbarqueID = 0;
var DestinoGuardado = 0;

function changeLanguageCall() {
    CargarGrid();
    AjaxCargarProveedor();
    document.title = _dictionary.lblEmbarque2[$("#language").data("kendoDropDownList").value()];
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
            { field: "Plana", title: _dictionary.EmbarquePlana[$("#language").data("kendoDropDownList").value()], filterable: true },
             {
                 command: {
                     text: _dictionary.botonCancelar[$("#language").data("kendoDropDownList").value()],
                     click: function (e) {
                         e.preventDefault();
                         if ($("#language").val() == "es-MX") {
                             if ($('#Guardar').text().trim() != "Editar") {
                                 var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                                 var dataSource = this.dataSource;

                                 if (confirm(_dictionary.EmbarqueMensajeEliminarPlana[$("#language").data("kendoDropDownList").value()])) {

                                     if (dataItem.Accion == 0) {
                                         dataItem.Accion = 2;
                                     }
                                     else {
                                         dataSource.remove(dataItem);
                                     }
                                 }
                                 dataSource.sync();
                             }
                         }
                         else {
                             if ($('#Guardar').text().trim() != "Edit") {
                                 var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                                 var dataSource = this.dataSource;

                                 if (confirm(_dictionary.EmbarqueMensajeEliminarPlana[$("#language").data("kendoDropDownList").value()])) {

                                     if (dataItem.Accion == 0) {
                                         dataItem.Accion = 2;
                                     }
                                     else {
                                         dataSource.remove(dataItem);
                                     }
                                 }
                                 dataSource.sync();
                             }
                         }
                     }
                 },
                 title: "",
                 width: "99px",
                 
             }
            
        ]
    });
    CustomisaGrid($("#grid"));
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
    ArregloNuevoRenglon[0].EmbarqueID = 0;
    ArregloNuevoRenglon[0].PlanaID = planaID;
    ArregloNuevoRenglon[0].Plana = plana;

    var ds = $("#grid").data("kendoGrid").dataSource;
    var cont = 0;
    for (var i = 0 ; i < ds._data.length; i++) {
        if (ds._data[i].Accion != 2) {
            cont++;
        }
    }
    
    if (cont < 2) {
        if (!existePlana(ds, ArregloNuevoRenglon[0].Plana)) {
            ds.add(ArregloNuevoRenglon[0]);
        }
        else {
            displayMessage("EmbarqueMensajePlanaExistente", "", "1");
        }
    }
    else {
        displayMessage("EmbarqueMensajeMaximoDosPlanas", "", "1");
    }
}


function existePlana(contenidoGrid,plana) {
    var existe = false;
    for (var i = 0; i < contenidoGrid._data.length ; i++) {
        if (contenidoGrid._data[i].Plana == plana && contenidoGrid._data[i].Accion != 2) {
            existe = true;
        }
    }
    return existe;
}