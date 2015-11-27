function changeLanguageCall() {
    CargarGrid();
    $('#grid').data('kendoGrid').dataSource.read();
};

IniciarEntregaResultados();

function IniciarEntregaResultados() {
    SuscribirEventos();
    setTimeout(function () { AjaxCargarEntregaResultados() }, 1000);
    
};

function CargarGrid() {


    $("#grid").kendoGrid({
        autoBind: true,
        dataSource: {
            schema: {
                model: {
                    fields: {
                        FOLIO: { type: "int", editable: false },
                        DESCRIPCION: { type: "string", editable: false },
                        RECIBIDO: { type: "boolean" },
                        CONDICIONESFISICAS: { type: "string", editable: true },
                        DEFECTOS: { type: "string", editable: true }
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
        editable:true,
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
            { field: "FOLIO", title:  _dictionary.ServiciosTecnicosFolio[$("#language").data("kendoDropDownList").value()], filterable: true },
            { field: "DESCRIPCION", title:  _dictionary.ServiciosTecnicosDescripcion[$("#language").data("kendoDropDownList").value()], filterable: true },
            { field: "RECIBIDO", title:  _dictionary.ServiciosTecnicosRECIBIDO[$("#language").data("kendoDropDownList").value()], filterable: true, template: '<input type="checkbox" #= RECIBIDO ? "checked=checked" : "" # class="chkbx"  ></input>' },
            { field: "CONDICIONESFISICAS", title: _dictionary.ServiciosTecnicosCondicionesFisicas[$("#language").data("kendoDropDownList").value()], editor: RenderComboBoxCondicionFisica, filterable: true },
            { field: "DEFECTOS", title:  _dictionary.ServiciosTecnicosDefectos[$("#language").data("kendoDropDownList").value()],editor: RenderComboBoxDefectos, filterable: true }
        ]
    });

    $("#grid .k-grid-content").on("change", "input.chkbx", function (e) {
        var grid = $("#grid").data("kendoGrid"),
            dataItem = grid.dataItem($(e.target).closest("tr"));
        dataItem.set("RECIBIDO", this.checked);
    });
};

