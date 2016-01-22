function changeLanguageCall() {
    CargarGrid();
    AjaxObtenerCatalogoClasificacion();
    AjaxObtenerCatalogoPersistencia();
    setTimeout(function () { AjaxPinturaCargaMedioTransporte(); }, 1100);
    setTimeout(function () { AjaxCargarCamposPredeterminados(); }, 1000);
}

IniciarCapturaPinturaCarga();
function IniciarCapturaPinturaCarga() {
    SuscribirEventos();


}

function LimpiarCarro() {
    $("#inputMedioTransporte").val('');
    $("#inputNumeroVeces").val('');
    $("#inputPesoMaximo").val('');
    $("#inputArea").val('');
}

function CargarGrid() {
    $("#grid").kendoGrid({
        autoBind: true,
        dataSource: {

            schema: {
                model: {
                    fields: {
                        SpoolID: { type: "string", editable: false },
                        SistemaPintura: { type: "string", editable: false },
                        Area: { type: "string", editable: false },
                        Peso: { type: "string", editable: false }
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
            { field: "SpoolJunta", title: _dictionary.PinturaCargaSpool[$("#language").data("kendoDropDownList").value()], filterable: true },
            { field: "SistemaPintura", title: _dictionary.PinturaCargaSistemaPintura[$("#language").data("kendoDropDownList").value()], filterable: true },
            { field: "Area", title: _dictionary.PinturaCargaArea[$("#language").data("kendoDropDownList").value()], filterable: true },
            { field: "Peso", title: _dictionary.PinturaCargaPeso[$("#language").data("kendoDropDownList").value()], filterable: true },
            { command: { text: _dictionary.botonCancelar[$("#language").data("kendoDropDownList").value()], click: eliminarCaptura }, title: "", width: "99px" }
        ]
    });
}


function eliminarCaptura(e) {
    e.preventDefault();
    var filterValue = $(e.currentTarget).val();
    var dataItem = $("#grid").data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));



    windowTemplate = kendo.template($("#windowTemplate").html());

    ventanaConfirm = $("#ventanaConfirm").kendoWindow({
        iframe: true,
        title: _dictionary.CapturaArmadoPreguntaBorradoCaptura[$("#language").data("kendoDropDownList").value()],
        visible: false, //the window will not appear before its .open method is called
        width: "400px",
        height: "200px",
        modal: true
    }).data("kendoWindow");

    ventanaConfirm.content(windowTemplate(this.dataSource, dataItem));

    ventanaConfirm.open().center();

    $("#yesButton").click(function () {
        var dataSource = $("#grid").data("kendoGrid").dataSource;


        if (dataItem.Accion === 1)
        { dataSource.remove(dataItem); }
        else {
            dataItem.Accion = 3
        }
        
        dataSource.sync();
        ImprimirAreaTonelada();
        ventanaConfirm.close();
    });
    $("#noButton").click(function () {
        ventanaConfirm.close();
    });

}

function validarInformacion(row) {
    var ds = $("#grid").data("kendoGrid").dataSource;
    var existe = false;

    for (var i = 0; i < ds._data.length; i++) {
        if (ds._data[i]["SpoolID"] == row.SpoolID) {
            existe = true;
            break;
        }
    }
    return existe;
}