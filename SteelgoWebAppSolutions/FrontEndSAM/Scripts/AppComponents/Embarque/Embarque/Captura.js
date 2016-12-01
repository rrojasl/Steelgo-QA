var transportistaEmb, choferEmb, tractoEmb;
var bandera = false;
var EmbarqueID = 0;
var DestinoGuardado = 0;
var FechaEmbarque;

function changeLanguageCall() {
    CargarGrid();
    AjaxCargarProyecto();
    document.title = "Embarque carro";
    FechaEmbarque.data("kendoDatePicker").setOptions({
        format: _dictionary.FormatoFecha2[$("#language").data("kendoDropDownList").value()]
    });
    LlenarPantalla();
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
                        CantidadElementos: { type: "string", editable: false },
                        Peso: { type: "string", editable: false },
                        M2: { type: "string", editable: false },
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
        filterable: getGridFilterableMaftec(),
        columns: [
            { field: "Nombre", title: "Plana", filterable: getGridFilterableCellMaftec() },
            { field: "CantidadElementos", title: "Cantidad Spools", filterable: getGridFilterableCellMaftec() },
            { field: "Peso", title: "Toneladas", filterable: getGridFilterableCellMaftec() },
            { field: "M2", title: "M2", filterable: getGridFilterableCellMaftec() },
             {
                 command: {
                     text: _dictionary.botonCancelar[$("#language").data("kendoDropDownList").value()],
                     click: function (e) {
                         e.preventDefault();
                         if ($('#Guardar').text() == _dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]) {
                            var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                            var dataSource = this.dataSource;
                            windowTemplate = kendo.template($("#windowTemplate").html());

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
                                }
                           }).data("kendoWindow");

                                 ventanaConfirm.content(_dictionary.CapturaMensajeArmadoPlancharTodos[$("#language").data("kendoDropDownList").value()] +
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
                 title: "ELM",
                 width: "99px",

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
        }

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
        }

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
        }

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

function LlenarPantalla() {
    var proveedor = [{ ProveedorID: 0, Nombre: "" }, { ProveedorID: 1, Nombre: "PROV-01" }];
    var tracto = [{ TractoID: 0, Nombre: "" }, { TractoID: 1, Nombre: "Tracto89" }];
    var chofer = [{ ChoferID: 0, Nombre: "" }, { ChoferID: 1, Nombre: "José Rios" }];
    var emb = [{ EmbarqueID: 0, Nombre: "" }, { EmbarqueID: 1, Nombre: "Emb-2" }]

    $("#Proveedor").data("kendoComboBox").dataSource.data(proveedor);
    $("#Proveedor").data("kendoComboBox").value(1);

    $("#Tracto").data("kendoComboBox").dataSource.data(tracto);
    $("#Tracto").data("kendoComboBox").value(1);

    $("#Chofer").data("kendoComboBox").dataSource.data(chofer);
    $("#Chofer").data("kendoComboBox").value(1);

    $("#Embarque").data("kendoComboBox").dataSource.data(emb);
    $("#Embarque").data("kendoComboBox").value(1);

    var data = [{
        Accion:2,
        Nombre: "PlanaEmbarque",
        CantidadElementos: 2,
        Peso: 2.73,
        M2: 135
    }];

    $("#grid").data("kendoGrid").dataSource.data(data);
    $("#grid").data("kendoGrid").dataSource.sync();
}