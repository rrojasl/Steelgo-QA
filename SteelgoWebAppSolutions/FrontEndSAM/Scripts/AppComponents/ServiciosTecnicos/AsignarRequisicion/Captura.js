function changeLanguageCall() {
    CargarGrid();
};

IniciarAsignarRequisicion();

function IniciarAsignarRequisicion() {
    SuscribirEventos();
    
    //setTimeout(function () { alert("Hello"); }, 3000);
};

function CargarGrid() {


    $("#grid").kendoGrid({
        autoBind: true,
        dataSource: {
            //data: [
            //         { TipoPrueba: "RT", Prioridad: "1", Cuadrante: "Cuadrante 1", Proyecto: "ETILENO XXI", Requisicion: "Requisicion 1", SpoolID: "10/10/2015", Junta: "4", Agregar: true, CodigoAplicar: "10" },
            //         { TipoPrueba: "RT", Prioridad: "Prioridad 2", Cuadrante: "Cuadrante 2", Proyecto: "CROSSOVER PIPING", Requisicion: "Requisicion 2", SpoolID: "10/10/2015", Junta: "5", Agregar: false, CodigoAplicar: "15" },
            //         { TipoPrueba: "VI", Prioridad: "Prioridad 3", Cuadrante: "Cuadrante 3", Proyecto: "DUPONT ALTAMIRA2", Requisicion: "Requisicion 3", SpoolID: "10/10/2015", Junta: "6", Agregar: false, CodigoAplicar: "2" },
            //         { TipoPrueba: "Neumática", Prioridad: "Prioridad 4", Cuadrante: "Cuadrante 4", Proyecto: "CB LITORAL", Requisicion: "Requisicion 4", SpoolID: "10/10/2015", Junta: "7", Agregar: false, CodigoAplicar: "32" }
            //],
            schema: {
                model: {
                    fields: {
                        Clave: { type: "string", editable: false },
                        Observacion: { type: "string", editable: false },
                        Fecha: { type: "string", editable: false },
                        RequisicionID: { type: "int", editable: false },
                        CantidadJuntas: { type: "int", editable: false },
                        Proveedor: { type: "string", editable: true }
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
            { field: "Observacion", title: _dictionary.ServiciosTecnicosRequisicion[$("#language").data("kendoDropDownList").value()], filterable: true },
            { field: "Fecha", title: _dictionary.ListaRequisicionFecha[$("#language").data("kendoDropDownList").value()], filterable: true },
             { field: "CantidadJuntas", title: _dictionary.AsignarRequisicionHeaderCantidadJuntas[$("#language").data("kendoDropDownList").value()], filterable: true },
             { field: "Proveedor", title: _dictionary.AsignarRequisicionHeaderProveedor[$("#language").data("kendoDropDownList").value()], editor: RenderComboBoxProveedor, filterable: true }
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
        if ($('input:radio[name=Muestra]:checked').val() === "Todos") {
            data[i].ProveedorID = $("#inputProveedor").val();
            data[i].Proveedor = $("#inputProveedor").data("kendoDropDownList").text();
        }
        else {
            if (data[i].Proveedor == "" || data[i].Proveedor == null || data[i].Proveedor == undefined) {
                data[i].ProveedorID = $("#inputProveedor").val();
                data[i].Proveedor = $("#inputProveedor").data("kendoDropDownList").text();
            }
        }
    }
    $("#grid").data("kendoGrid").dataSource.sync();
};


