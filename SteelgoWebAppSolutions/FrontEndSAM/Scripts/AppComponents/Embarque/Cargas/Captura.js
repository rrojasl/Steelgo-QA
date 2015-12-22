function changeLanguageCall() {
    CargarGrid();
};


IniciarCapturaEmbarqueCarga();
function IniciarCapturaEmbarqueCarga() {
    SuscribirEventos();
    setTimeout(function () { AjaxEmbarqueCargaProveedores(); }, 1000);
    setTimeout(function () { AjaxCargarCamposPredeterminados(); }, 2000);
    
}

function CargarGrid() {
    $("#grid").kendoGrid({
        autoBind: true,
        dataSource: {
            schema: {
                model: {
                    fields: {
                        OrdenTrabajoSpoolID: { type: "string", editable: false },
                        SpoolID: { type: "string", editable: false },
                        NumeroControl: { type: "string", editable: false },
                        Paquete: { type: "string", editable: false },
                        EmbarquePaqueteID: { type: "int", editable: false },
                        Peso: { type: "int", editable: false },
                        CuadranteID: { type: "int", editable: false },
                        Cuadrante: { type: "string", editable: false },
                        Mensaje: { type: "string", editable: false }
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
            { field: "Consecutivo", title: "Consecutivo", filterable: true },
            { field: "NumeroControl", title: "Spool ID", filterable: true },
            { field: "Paquete", title: "Paquete", filterable: true },
            { field: "Seleccionado", title: " ", filterable: true, template: '<input type="checkbox" #= Seleccionado ? "checked=checked" : "" # class="chkbx"  ></input>  ' },
            { command: { text: _dictionary.botonCancelar[$("#language").data("kendoDropDownList").value()], click: eliminarCaptura }, title: "", width: "99px" }
        ]
    });

    $("#grid .k-grid-content").on("change", "input.chkbx", function (e) {
        var grid = $("#grid").data("kendoGrid"),
            dataItem = grid.dataItem($(e.target).closest("tr"));
        dataItem.set("Seleccionado", this.checked);
    });
};

function eliminarCaptura(e) {
    e.preventDefault();
    var filterValue = $(e.currentTarget).val();
    var dataItem = $("#grid").data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));
    var spoolIDRegistro = dataItem.SpoolID;


    windowTemplate = kendo.template($("#windowTemplate").html());

    ventanaConfirm = $("#window").kendoWindow({
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
        dataItem.Accion = 3;

        if (dataItem.JuntaArmadoID === 0)
        { dataSource.remove(dataItem); }

        dataSource.sync();
        ventanaConfirm.close();
    });
    $("#noButton").click(function () {
        ventanaConfirm.close();
    });

}

function validarInformacion( array)
{
    var ds = $("#grid").data("kendoGrid").dataSource;
    var existe=false;
   
    for (var i = 0; i < ds._data.length; i++) {
        for (var j = 0; j < array.length; j++) {
            if (ds._data[i]["NumeroControl"] == array[j]["NumeroControl"]) {
                existe = true;
                break;
            }
        }

    }

           
    return existe;
}