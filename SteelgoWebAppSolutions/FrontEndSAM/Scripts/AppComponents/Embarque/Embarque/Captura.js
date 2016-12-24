var transportistaEmb, choferEmb, tractoEmb;
var bandera = false;
var EmbarqueID = 0;
var DestinoGuardado = 0;
var FechaEmbarque;

function changeLanguageCall() {
    CargarGrid();
    AjaxCargarProyecto();
    document.title = _dictionary.EmbarquePreparacionTituloPagina[$("#language").data("kendoDropDownList").value()];
    FechaEmbarque.data("kendoDatePicker").setOptions({
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
                        Nombre: { type: "string", editable: false },
                        CantidadElementos: { type: "number", editable: false },
                        Peso: { type: "number", editable: false },
                        M2: { type: "number", editable: false },
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
                { field: "M2", aggregate: "sum" },
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
            { field: "Nombre", title: _dictionary.columnPlana[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec() },
            { field: "CantidadElementos", title: _dictionary.columnCantidadSpools[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellNumberMaftec(), attributes: { style: "text-align:right;" } },
            { field: "M2", title: _dictionary.columnM2[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellNumberMaftec(), aggregates: ["sum"], footerTemplate: "<div style='text-align:right;'>SUM: #= kendo.toString(sum, 'n') #</div>", attributes: { style: "text-align:right;" } },
            { field: "Peso", title: _dictionary.columnPeso[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellNumberMaftec(), aggregates: ["sum"], footerTemplate: "<div style='text-align:right;'>SUM: #= kendo.toString(sum, 'n') #</div>", attributes: { style: "text-align:right;" } },
             {
                 command: {
                     text: _dictionary.botonCancelar[$("#language").data("kendoDropDownList").value()],
                     click: function (e) {
                         e.preventDefault();
                         if ($('#Guardar').text() == _dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]) {
                            var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                            var dataSource = this.dataSource;
                            //windowTemplate = kendo.template($("#windowTemplate").html());

                            ventanaConfirm = $("#ventanaConfirm").kendoWindow({
                                iframe: true,
                                title: _dictionary.CapturaAvanceTitulo[$("#language").data("kendoDropDownList").value()],
                                visible: false,
                                width: "auto",
                                height: "auto",
                                modal: true,
                                draggable: false,
                                resizable: false,
                                animation: {
                                    close: false,
                                    open: false
                                },
                                actions:[]
                            }).data("kendoWindow");

                            $("#ventanaConfirm").parent().find(".k-window-action").css("visibility", "hidden");

                            ventanaConfirm.content(_dictionary.MensajeConfirmaEliminarRegistroGrid[$("#language").data("kendoDropDownList").value()] +
                                              "</br><center><button class='confirm_yes btn btn-blue' id='yesButton'>Si</button><button class='confirm_yes btn btn-blue' id='noButton'> No</button></center>");

                             ventanaConfirm.open().center();

                                 $("#yesButton").click(function (handler) {
                                     if (dataItem.Accion == 2) {
                                         dataItem.Accion = 3;
                                         dataItem.ModificadoPorUsuario = true;
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
                 },
                 title: _dictionary.columnELM[$("#language").data("kendoDropDownList").value()],
                 width: "99px",
                 attributes: { style: "text-align:center;" }
             }

        ]
    });
    CustomisaGrid($("#grid"));
};

function existePlana(contenidoGrid, plana) {
    var existe = false;
    for (var i = 0; i < contenidoGrid._data.length ; i++) {
        if (contenidoGrid._data[i].Plana == plana && contenidoGrid._data[i].Accion != 2) {
            existe = true;
        }
    }
    return existe;
}


function CargaPopupNuevoProveedor(e) {
    $("#inputNombreNuevoProveedor").val("");

    windowNewProvider = $("#divNuevoProveedor").kendoWindow({
        modal: true,
        resizable: false,
        visible: true,
        width: "500px",
        height: "auto",
        draggable: false,
        resizable: false,
        animation: {
            close: false,
            open: false
        },
        position: {
            top: "1%",
            left: "1%"
        },
        actions:[]
    }).data("kendoWindow");
    $("#divNuevoProveedor").data("kendoWindow").title(_dictionary.EmbarqueCargaNuevoProveedor[$("#language").data("kendoDropDownList").value()]);
    $("#divNuevoProveedor").data("kendoWindow").center().open();

    $("#inputNombreNuevoProveedor").focus();
}

function CargaPopupNuevoTracto(e) {
    $("#inputNombreNuevoTracto").val("");

    windowNewTracto = $("#divNuevoTracto").kendoWindow({
        modal: true,
        resizable: false,
        visible: true,
        width: "500px",
        height: "auto",
        draggable: false,
        resizable: false,
        animation: {
            close: false,
            open: false
        },
        position: {
            top: "1%",
            left: "1%"
        },
        actions: []
    }).data("kendoWindow");
    $("#divNuevoTracto").data("kendoWindow").title("Nuevo Tracto");
    $("#divNuevoTracto").data("kendoWindow").center().open();

    $("#inputNombreNuevoTracto").focus();
}

function CargaPopupNuevoChofer(e) {
    $("#inputNombreNuevoChofer").val("");

    windowNewChofer = $("#divNuevoChofer").kendoWindow({
        modal: true,
        resizable: false,
        visible: true,
        width: "500px",
        height: "auto",
        draggable: false,
        resizable: false,
        animation: {
            close: false,
            open: false
        },
        position: {
            top: "1%",
            left: "1%"
        },
        actions: []
    }).data("kendoWindow");
    $("#divNuevoChofer").data("kendoWindow").title("Nuevo chofer");
    $("#divNuevoChofer").data("kendoWindow").center().open();

    $("#inputNombreNuevoChofer").focus();
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

function ValidarFecha(valor) {
    var fecha = kendo.toString(valor, String(_dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()].replace('{', '').replace('}', '').replace("0:", "")));
    if (fecha == null) {
        $("#inputFechaEmbarque").data("kendoDatePicker").value("");
    }
}