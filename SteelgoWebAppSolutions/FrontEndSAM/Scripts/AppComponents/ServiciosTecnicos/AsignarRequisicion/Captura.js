function changeLanguageCall() {
    AjaxCargarCamposPredeterminados();
    CargarGrid();
    document.title = _dictionary.AsignarRequisicion[$("#language").data("kendoDropDownList").value()];
};

IniciarAsignarRequisicion();

function IniciarAsignarRequisicion() {
    SuscribirEventos();
   
   
};

function CargarGrid() {
    $("#grid").kendoGrid({
        autoBind: true,
        dataSource: {
            schema: {
                model: {
                    fields: {
                        Clave: { type: "string", editable: false },
                        Observacion: { type: "string", editable: false },
                        Fecha: { type: "string", editable: false },
                        RequisicionID: { type: "int", editable: false },
                        CantidadJuntas: { type: "int", editable: false },
                        Proveedor: { type: "string", editable: true },
                        HerramientadePrueba: { type: "string", editable: true },
                        TurnoLaboral: { type: "string", editable: true }
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
            { field: "Clave", title: _dictionary.ServiciosTecnicosTipoPrueba[$("#language").data("kendoDropDownList").value()], filterable: true },
            { field: "Requisicion", title: _dictionary.ServiciosTecnicosRequisicion[$("#language").data("kendoDropDownList").value()], filterable: true },
            { field: "Observacion", title: _dictionary.ServiciosTecnicosObservacion[$("#language").data("kendoDropDownList").value()], filterable: true },
            { field: "Fecha", title: _dictionary.ListaRequisicionFecha[$("#language").data("kendoDropDownList").value()], filterable: true },
            { field: "CantidadJuntas", title: _dictionary.AsignarRequisicionHeaderCantidadJuntas[$("#language").data("kendoDropDownList").value()], filterable: true },
            { field: "Proveedor", title: _dictionary.AsignarRequisicionHeaderProveedor[$("#language").data("kendoDropDownList").value()], editor: RenderComboBoxProveedor, filterable: true },
            { field: "HerramientadePrueba", title: _dictionary.AsignarRequisicionHeaderHerramientaPruebas[$("#language").data("kendoDropDownList").value()], editor: RenderComboBoxHerramientaPrueba, filterable: true },
            { field: "TurnoLaboral", title: _dictionary.AsignarRequisicionHeaderTurnoLaboral[$("#language").data("kendoDropDownList").value()], editor: RenderComboBoxTurnoLaboral, filterable: true }
        ]
    });
};

function PlanchaProveedor() {
    var dataSource = $("#grid").data("kendoGrid").dataSource;
    var filters = dataSource.filter();
    var allData = dataSource.data();
    var query = new kendo.data.Query(allData);
    var data = query.filter(filters).data;

    for (var i = 0; i < data.length; i++) {
        if ($('input:radio[name=Muestra]:checked').val() === "Todos" && $("#inputPrueba").data("kendoDropDownList").text() == data[i].Clave) {
            data[i].ProveedorID = $("#inputProveedor").val();
            data[i].Proveedor = $("#inputProveedor").data("kendoDropDownList").text();
            var Proveedor = ObtenerProveedor($("#inputProveedor").val(), data[i].ListaProveedor);
            data[i].ListaHerramientaPrueba = Proveedor.ListaHerramientaPrueba;
            data[i].ListaTurnoLaboral = Proveedor.ListaTurnoLaboral;
        }
        else {
            if ((data[i].Proveedor == "" || data[i].Proveedor == null || data[i].Proveedor == undefined) && $("#inputPrueba").data("kendoDropDownList").text() == data[i].Clave) {
                data[i].ProveedorID = $("#inputProveedor").val();
                data[i].Proveedor = $("#inputProveedor").data("kendoDropDownList").text();
                var Proveedor = ObtenerProveedor($("#inputProveedor").val(), data[i].ListaProveedor);
                data[i].ListaHerramientaPrueba = Proveedor.ListaHerramientaPrueba;
                data[i].ListaTurnoLaboral = Proveedor.ListaTurnoLaboral;
            }
        }
    }
    $("#grid").data("kendoGrid").dataSource.sync();
};

function ObtenerProveedor(id, listaProveedores) {
    for (var i = 0; i < listaProveedores.length; i++) {
        if (id = listaProveedores[i].ProveedorID)
            return listaProveedores[i];
    }
    return null;
};
function replaceAll(str, find, replace) {
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}
function escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}