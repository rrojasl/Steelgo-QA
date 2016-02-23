function changeLanguageCall() {
    AjaxCargarCamposPredeterminados();
    CargarGrid();
    document.title = _dictionary.AsignarRequisicion[$("#language").data("kendoDropDownList").value()];
};

IniciarAsignarRequisicion();

function IniciarAsignarRequisicion() {
    SuscribirEventos();
    setTimeout(function () { AjaxPruebas() }, 1000);
    
};

function CargarGrid() {
    $("#grid").kendoGrid({
        autoBind: true,
        edit: function (e) {

            if ($('#botonGuardar').text() != _dictionary.MensajeGuardar[$("#language").data("kendoDropDownList").value()]) {
                this.closeCell();
            }
        },
        dataSource: {
            schema: {
                model: {
                    fields: {
                        Clave: { type: "string", editable: false },
                        Nombre: { type: "string", editable: false },
                        Observacion: { type: "string", editable: false },
                        Fecha: { type: "date", editable: true },
                        RequisicionID: { type: "int", editable: false },
                        Requisicion: { type: "string", editable: false },
                        CantidadJuntas: { type: "number", editable: false },
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
            { field: "Nombre", title: _dictionary.ServiciosTecnicosTipoPrueba[$("#language").data("kendoDropDownList").value()], filterable: true, width: "130px" },
            { field: "Requisicion", title: _dictionary.ServiciosTecnicosRequisicion[$("#language").data("kendoDropDownList").value()], filterable: true, width: "140px" },
            { field: "Observacion", title: _dictionary.ServiciosTecnicosObservacion[$("#language").data("kendoDropDownList").value()], filterable: true, width: "150px" },
            { field: "Fecha", title: _dictionary.ListaRequisicionFecha[$("#language").data("kendoDropDownList").value()], filterable: true, format: _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()], width: "130px" },
            { field: "CantidadJuntas", title: _dictionary.AsignarRequisicionHeaderCantidadJuntas[$("#language").data("kendoDropDownList").value()], filterable: true, width: "130px" },
            { field: "Proveedor", title: _dictionary.AsignarRequisicionHeaderProveedor[$("#language").data("kendoDropDownList").value()], editor: RenderComboBoxProveedor, filterable: true, width: "140px" },
            { field: "HerramientadePrueba", title: _dictionary.AsignarRequisicionHeaderHerramientaPruebas[$("#language").data("kendoDropDownList").value()], editor: RenderComboBoxHerramientaPrueba, filterable: true, width: "150px" },
            { field: "TurnoLaboral", title: _dictionary.AsignarRequisicionHeaderTurnoLaboral[$("#language").data("kendoDropDownList").value()], editor: RenderComboBoxTurnoLaboral, filterable: true, width: "130px" }
        ]
    });
    CustomisaGrid($("#grid"));
};

function PlanchaProveedor() {
    var dataSource = $("#grid").data("kendoGrid").dataSource;
    var filters = dataSource.filter();
    var allData = dataSource.data();
    var query = new kendo.data.Query(allData);
    var data = query.filter(filters).data;

    for (var i = 0; i < data.length; i++) {
        if ($('input:radio[name=Muestra]:checked').val() === "Todos" && $("#inputProveedor").data("kendoComboBox").dataItem($("#inputProveedor").data("kendoComboBox").select()) != undefined && $("#inputPrueba").data("kendoComboBox").dataItem($("#inputPrueba").data("kendoComboBox").select()).Clave == data[i].Clave) {
            data[i].ProveedorID = $("#inputProveedor").val();
            data[i].Proveedor = $("#inputProveedor").data("kendoComboBox").text();
            var Proveedor = ObtenerProveedor($("#inputProveedor").val(), data[i].ListaProveedor);
            data[i].ListaHerramientaPrueba = Proveedor.ListaHerramientaPrueba;
            data[i].ListaTurnoLaboral = Proveedor.ListaTurnoLaboral;
        }
        else {
            if ((data[i].Proveedor == "" || data[i].Proveedor == null || data[i].Proveedor == undefined) && $("#inputProveedor").data("kendoComboBox").dataItem($("#inputProveedor").data("kendoComboBox").select()) != undefined && $("#inputPrueba").data("kendoComboBox").dataItem($("#inputPrueba").data("kendoComboBox").select()).Clave == data[i].Clave) {
                data[i].ProveedorID = $("#inputProveedor").val();
                data[i].Proveedor = $("#inputProveedor").data("kendoComboBox").text();
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