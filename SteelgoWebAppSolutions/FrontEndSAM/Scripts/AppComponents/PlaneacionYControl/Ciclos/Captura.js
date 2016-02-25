
function changeLanguageCall() {
    SuscribirEventos();
    CargarGrid();
    setTimeout(AjaxObtenerProyectos(), 2000);


};

function CargarGrid() {
    var d = [{ Etapa: "Ingenieria", Clave: "ING" },
            { Etapa: "Materiales", Clave: "MTL" },
    { Etapa: "Fabricacion", Clave: "FAB" },
    { Etapa: "Servicios Técnicos", Clave: "SVT" },
    { Etapa: "Embarque", Clave: "EMB" }];

    $("#grid").kendoGrid({
        edit: function (e) {
        //    this.closeCell();
        },
        autoBind: true,
        dataSource: {
            data: d,
            schema: {
                model: {
                    fields: {
                        Etapa: { type: "string", editable: false },
                        CS: { type: "string", editable: true },
                        CSPWHT: { type: "string", editable: true },
                        CSLOTEMP: { type: "string", editable: true },
                        CSLOTEMPPWHT: { type: "string", editable: true },
                        CSA3336: { type: "string", editable: true },
                        CSA3336PWHT: { type: "string", editable: true },
                        CSA672: { type: "string", editable: true },
                        CSA672PWHT: { type: "string", editable: true },
                        Inoxs: { type: "string", editable: true },
                        InoxsPWHT: { type: "string", editable: true },
                        InoxsSS3xx: { type: "string", editable: true },
                        InoxsSS3xxPWHT: { type: "string", editable: true },
                        Alloy: { type: "string", editable: true },
                        AlloyPWHT: { type: "string", editable: true },
                        AlloyP9: { type: "string", editable: true },
                        AlloyP9PWHT: { type: "string", editable: true },
                        AlloyP11: { type: "string", editable: true },
                        AlloyP11PWHT: { type: "string", editable: true },
                        AlloyP22: { type: "string", editable: true },
                        AlloyP22PWHT: { type: "string", editable: true },

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
            {
                field: "Etapa", title: "Etapa", filterable: true, width: "120px", locked: true,

            },
            { field: "CS", title: "CS", filterable: true, width: "120px" },
            { field: "CSPWHT", title: "CS+PWHT", filterable: true, width: "120px"},
            { field: "CSLOTEMP", title: "CS-LOTEMP", filterable: true, width: "130px"},
            { field: "CSLOTEMPPWHT", title: "CS-LOTEMP+PWHT", filterable: true, width: "180px"},
            { field: "CSA3336", title: "CS-A333-6", filterable: true, width: "120px"},
            { field: "CSA3336PWHT", title: "CS-A333-6+PWHT", filterable: true, width: "170px"},
            { field: "CSA672", title: "CS-A672", filterable: true, width: "120px"},
            { field: "CSA672PWHT", title: "CS-A672+PWHT", filterable: true, width: "150px" },
            { field: "Inoxs", title: "Inox", filterable: true, width: "120px" },
            { field: "InoxsPWHT", title: "Inox+PWHT", filterable: true, width: "120px" },
            { field: "InoxsSS3xx", title: "Inox-SS-3xx", filterable: true, width: "120px" },
            { field: "InoxsSS3xxPWHT", title: "Inox-SS-3xx+PWHT", filterable: true, width: "150px" },
            { field: "Alloy", title: "Alloy", filterable: true, width: "120px" },
            { field: "AlloyPWHT", title: "Alloy+PWHT", filterable: true, width: "120px" },
            { field: "AlloyP9", title: "Alloy-P9", filterable: true, width: "120px" },
            { field: "AlloyP9PWHT", title: "Alloy-P9+PWHT", filterable: true, width: "150px" },
            { field: "AlloyP11", title: "Alloy-P11", filterable: true, width: "120px" },
            { field: "AlloyP11PWHT", title: "Alloy-P11+PWHT", filterable: true, width: "150px" },
            { field: "AlloyP22", title: "Alloy-P22", filterable: true, width: "120px" },
            { field: "AlloyP22PWHT", title: "Alloy-P22+PWHT", filterable: true, width: "150px" },

        ]
    });

    OcultarTodasColumnas();
    CustomisaGrid($("#grid"));
}

function OcultarColumnas(columnasVisibles) {
    var grid = $("#grid").data("kendoGrid");
    var columnas = grid.columns;

    for (var i = 1; i < columnas.length; i++) {
        for (var j = 0; j < columnasVisibles.length; j++) {
            if (i == columnasVisibles[j]) {
                grid.hideColumn(i);
                break;
            }
        }
    }
}

function OcultarTodasColumnas() {
    var grid = $("#grid").data("kendoGrid");
    var columnas = grid.columns;

    for (var i = 1; i < columnas.length; i++) {
        grid.hideColumn(i);
    }
}

function MostrarColumnas(columnasVisibles) {
    var grid = $("#grid").data("kendoGrid");
    var columnas = grid.columns;

    for (var i = 1; i < columnas.length; i++) {
        for (var j = 0; j < columnasVisibles.length; j++) {
            if (i == columnasVisibles[j]) {
                grid.showColumn(i);
                break;
            }
        }
    }

}

function MostrarColumnasPWHT(columnasVisibles) {
    var grid = $("#grid").data("kendoGrid");
    var columnas = grid.columns;

    for (var i = 1; i < columnas.length; i++) {
        for (var j = 0; j < columnasVisibles.length; j++) {
            var columna = columnasVisibles[j];

            if (i == columnasVisibles[j]) {
                columna++
                grid.showColumn(columna);
                break;
            }
        }
    }

}