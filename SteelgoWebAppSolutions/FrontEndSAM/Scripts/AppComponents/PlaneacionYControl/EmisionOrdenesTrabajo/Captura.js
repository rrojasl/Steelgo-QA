$(document).ready(function () {
    SuscribirEventos();
    CargarGridStack();

});

function CargarGridStack() {

    var options = {
        cell_height: 80,
        vertical_margin: 10
    };

    $('.grid-stack').gridstack(options);

    $("#grid").kendoGrid({
        edit: function (e) {
            this.closeCell();
        },
        autoBind: true, 
        dataSource: [
            { Spools: "Set", Familia: "CS", Acero: "A16", Fibelines: "Auto 6-24", CantidadSpools: "4", Kgs: "109.3", M2: "76", Juntas: "16", Peqs: "64" },
            { Spools: "Fabricable", Familia: "CS", Acero: "A16", Fibelines: "Auto 6-24", CantidadSpools: "4", Kgs: "109.3", M2: "76", Juntas: "16", Peqs: "64" },

        ],
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
        detailTemplate: kendo.template($("#templateGridNivelDos").html()),
        detailInit: RenderGridNivelDos,
        columns: [
            { field: "Spools", title: "Spools", filterable: true },
            { field: "Familia", title: "Familia", filterable: true },
            { field: "Acero", title: "Acero", filterable: true },
            { field: "Fibelines", title: "Fibeline", filterable: true },
            { field: "Spools", title: "Spools", filterable: false, width:"120px" },
            { field: "Kgs", title: "Kgs", filterable: false, width: "100px" },
            { field: "M2", title: "M2", filterable: false, width: "100px" },
            { field: "Juntas", title: "Juntas", filterable: false, width: "110px" },
            { field: "Peqs", title: "Peqs", filterable: false, width: "100px" }

        ]
    });
   
    CrearContenedorProyecciones();
    CrearContenedorCapacidad();
    CrearContenedorTalleres();
    CalcularValoresProyecciones();
}

function CrearContenedorProyecciones() {
     
}

function CrearContenedorCapacidad() {

}

function CrearContenedorTalleres() {

}

function CalcularValoresProyecciones() { 
  
  
}