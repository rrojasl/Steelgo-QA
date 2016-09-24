﻿var transportistaEmb, choferEmb, tractoEmb;
var bandera = false;
var EmbarqueID = 0;
var DestinoGuardado = 0;

function changeLanguageCall() {
    CargarGrid();
    //AjaxCargarProveedor();
    document.title = "Embarque carro";
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
            { field: "Plana", title:"Plana", filterable: true },
             {
                 command: {
                     text: _dictionary.botonCancelar[$("#language").data("kendoDropDownList").value()],
                     click: function (e) {
                         e.preventDefault();
                         if ($("#language").val() == "es-MX") {
                             if ($('#Guardar').text().trim() != "Editar") {
                                 var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                                 var dataSource = this.dataSource;
                                 windowTemplate = kendo.template($("#windowTemplate").html());

                                 ventanaConfirm = $("#ventanaConfirm").kendoWindow({
                                     iframe: true,
                                     title: _dictionary.CapturaAvanceTitulo[$("#language").data("kendoDropDownList").value()],
                                     visible: false, //the window will not appear before its .open method is called
                                     width: "auto",
                                     height: "auto",
                                     modal: true,
                                     animation: {
                                         close: false,
                                         open: false
                                     }
                                 }).data("kendoWindow");

                                 ventanaConfirm.content(_dictionary.CapturaMensajeArmadoPlancharTodos[$("#language").data("kendoDropDownList").value()] +
                                              "</br><center><button class='confirm_yes btn btn-blue' id='yesButton'>Si</button><button class='confirm_yes btn btn-blue' id='noButton'> No</button></center>");

                                 ventanaConfirm.open().center();

                                 $("#yesButton").click(function (handler) {
                                     if (dataItem.Accion == 0) {
                                         dataItem.Accion = 2;
                                     }
                                     else {
                                         dataSource.remove(dataItem);
                                     }
                                 });
                                 $("#noButton").click(function (handler) {
                                     ventanaConfirm.close();
                                 });
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
                 title: "ELM",
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
            displayNotify("EmbarqueMensajePlanaExistente", "", "1");
        }
    }
    else {
        displayNotify("EmbarqueMensajeMaximoDosPlanas", "", "1");
    }
}


function existePlana(contenidoGrid, plana) {
    var existe = false;
    for (var i = 0; i < contenidoGrid._data.length ; i++) {
        if (contenidoGrid._data[i].Plana == plana && contenidoGrid._data[i].Accion != 2) {
            existe = true;
        }
    }
    return existe;
}