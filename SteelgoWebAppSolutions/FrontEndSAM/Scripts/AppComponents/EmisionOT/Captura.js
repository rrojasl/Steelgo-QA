$(document).ready(function () {
//    CargarSplitterKendo();
    CargarGridStack();

});

function CargarSplitterKendo() {
    $("#gridStack").append('<div id="vertical">' +
                            '<div id="top-pane">' +
                                '<div id="horizontal" style="height: 100%; width: 100%;">' +
                                    '<div id="left-pane">' +
                                        '<div class="pane-content">' +
                                            '<div style="color:#ffffff" class="header-grid text-center">Proyecciones</div>' +
                                        '</div>' +
                                    '</div>' +
                                    '<div id="rigth-pane">' +
                                        '<div class="pane-content">' +
                                            '<div style="color:#ffffff" class="header-grid text-center">Capacidad</div>' +
                                        '</div>' +
                                    '</div>' + 
                                '</div>' +
                            '</div>' +
                            '<div id="middle-pane">' +
                                '<div class="pane-content">' +
                                    '<div style="color:#ffffff" class="header-grid text-center">Taller</div>' +
                                '</div>' +
                            '</div>');

    $("#vertical").kendoSplitter({
        orientation: "vertical",
        panes: [
            { collapsible: false },
            { collapsible: false }
        ]
    });

    $("#horizontal").kendoSplitter({
        panes: [
            { collapsible: true },
            { collapsible: false },
            { collapsible: true }
        ]
    });
}

function CargarGridStack() { 
     
    $("#gridStack").append('<div class="grid-stack">' +
                                '<div class="grid-stack-item" data-gs-x="0" data-gs-y="0" data-gs-width="6" data-gs-height="4">' +
                                    '<div class="grid-stack-item-content border-shadow" id="gridProyecciones">' +
                                        '<div style="color:#ffffff" class="header-grid text-center">Proyecciones</div>' + 
                                        '<table class="table table-condensed" style="border-collapse:collapse;">' + 
                                            '<thead>' +
                                                '<tr><th>&nbsp;</th>' +
                                                    '<th>Familia</th>' +
                                                    '<th>Acero</th>' +
                                                    '<th>Fablines</th>' +
                                                    '<th>Spools</th>' +
                                                    '<th>Kgs</th>' +
                                                    '<th>M2</th>' +
                                                    '<th>Juntas</th>' +
                                                    '<th>Peqs</th>' +
                                                '</tr>' +
                                            '</thead>' +

                                            '<tbody>' +
                                              '<tr data-toggle="collapse" data-target="#Familia001" class="accordion-toggle">' +
                                                '<td>' +
                                                  '<button class="btn btn-default btn-xs">' +
                                                    '<span class="glyphicon glyphicon-eye-open"></span>' +
                                                  '</button>' +
                                                '</td>' +
                                                '<td>CS</td>' +
                                                '<td>a16</td>' +
                                                '<td>Auto 6-24</td>' +
                                                '<td>5</td>' +
                                                '<td>550</td>' +
                                                '<td>2</td>' +
                                                '<td>20</td> ' +
                                                '<td>0.1</td> ' +
                                              '</tr>' +
                                              '<tr data-toggle="collapse" data-target="#Familia001-Detalles" class="accordion-toggle">' +
                                                '<td colspan="12" class="hiddenRow"><div class="accordian-body collapse" id="Familia001"> ' +
                                                  '<table class="table table-striped">' +
                                                    '<thead>' + 
                                                      '<tr>' +
                                                        '<th>Acciones</th>' +
                                                        '<th>Nombre Spool</th>' +
                                                        '<th>Dibujo</th>' +
                                                        '<th>Diametro</th>' +
                                                        '<th>Kgs</th>' +
                                                        '<th>M2</th>' +
                                                        '<th>Juntas</th>' +
                                                        '<th>Peqs</th>' +
                                                      '</tr>' +
                                                    '</thead>' +
                                                    '<tbody>' +
                                                      '<tr>' +
                                                        '<td>' +
                                                          '<a href="#" class="btn btn-default btn-sm">' +
                                                            '<i class="glyphicon glyphicon-remove"></i>' +
                                                          '</a>' +
                                                        '</td>' +
                                                        '<td>_nombre</td>' +
                                                        '<td>A</td>' +
                                                        '<td> </td>' +
                                                        '<td>1 </td>' +
                                                        '<td>0.5</td>' +
                                                        '<td> </td>' +
                                                        '<td> </td>' +
                                                      '</tr> ' +
                                                    '</tbody>' +
     	                                            '</table>' +
                                                '</td>' +
                                              '</tr> ' +

                                              '<tr>' +
                                                '<td colspan="12" class="hiddenRow"><div class="accordian-body collapse" id="Familia001-Detalles"> ' +
                                                  '<table class="table table-striped">' +
                                                    '<thead>' +
                                                      '<tr>' +
                                                        '<th></th>' +
                                                        '<th>Fablines</th>' +
                                                        '<th>Spools</th>' + 
                                                        '<th>Kgs</th>' +
                                                        '<th>M2</th>' +
                                                        '<th>Juntas</th>' +
                                                        '<th>Peqs</th>' +
                                                      '</tr>' +
                                                    '</thead>' +
                                                    '<tbody>' +
                                                      '<tr>' + 
                                                        '<td>1</td>' +
                                                        '<td>Auto 6-24</td>' +
                                                        '<td>TW</td>' +
                                                        '<td> </td>' +
                                                        '<td> </td>' +
                                                        '<td> </td>' +
                                                        '<td>5</td>' +
                                                      '</tr>' +
                                                      '<tr>' +
                                                        '<td>2</td>' +
                                                        '<td>Auto 6-24</td>' +
                                                        '<td>BW</td>' +
                                                        '<td> </td>' +
                                                        '<td> </td>' +
                                                        '<td> </td>' +
                                                        '<td>1</td>' +
                                                      '</tr>' +
                                                      '<tr>' +
                                                        '<td>3</td>' +
                                                        '<td>Auto 6-24</td>' +
                                                        '<td>TW</td>' +
                                                        '<td> </td>' +
                                                        '<td> </td>' +
                                                        '<td> </td>' +
                                                        '<td>5</td>' +
                                                      '</tr>' +
                                                      '<tr>' +
                                                        '<td>4</td>' +
                                                        '<td>Auto 6-24</td>' +
                                                        '<td>TW</td>' +
                                                        '<td> </td>' +
                                                        '<td> </td>' +
                                                        '<td> </td>' +
                                                        '<td>5</td>' +
                                                      '</tr>' +
                                                      '<tr>' +
                                                        '<td>5</td>' +
                                                        '<td>Auto 6-24</td>' +
                                                        '<td>SW</td>' +
                                                        '<td> </td>' +
                                                        '<td> </td>' +
                                                        '<td> </td>' +
                                                        '<td>10</td>' +
                                                      '</tr>' +
                                                    '</tbody>' +
     	                                            '</table>' +
                                                '</td>' +
                                              '</tr> ' +

                                              '<tr data-toggle="collapse" data-target="#Familia002" class="accordion-toggle">' +
                                                '<td>' +
                                                  '<button class="btn btn-default btn-xs">' +
                                                    '<span class="glyphicon glyphicon-eye-open"></span>' +
                                                  '</button>' +
                                                '</td>' +
                                                '<td>CS</td>' +
                                                '<td>a16</td>' +
                                                '<td>Auto 6-24</td>' +
                                                '<td>5</td>' +
                                                '<td>550</td>' +
                                                '<td>2</td>' +
                                                '<td>20</td> ' +
                                                '<td>0.1</td> ' +
                                              '</tr>' +
                                              '<tr>' +
                                                '<td colspan="12" class="hiddenRow"><div class="accordian-body collapse" id="Familia002"> ' +
                                                  '<table class="table table-striped">' +
                                                    '<thead>' +
                                                      '<tr>' +
                                                        '<td>' +
                                                          '<a href="WorkloadURL">Workload link</a></td><td>Bandwidth: Dandwidth Details</td><td>OBS Endpoint: end point' +
                                                        '</td>' +
                                                      '</tr>' +
                                                      '<tr>' +
                                                        '<th>Access Key</th>' +
                                                        '<th>Secret Key</th>' +
                                                        '<th>Status </th>' +
                                                        '<th> Created</th>' +
                                                        '<th> Expires</th>' +
                                                        '<th>Actions</th>' +
                                                      '</tr>' +
                                                    '</thead>' +
                                                    '<tbody>' +
                                                      '<tr><td>access-key-1</td><td>secretKey-1</td>' +
                                                        '<td>Status</td>' +
                                                        '<td>some date</td>' +
                                                        '<td>some date</td>' +
                                                        '<td>' +
                                                          '<a href="#" class="btn btn-default btn-sm">' +
                                                            '<i class="glyphicon glyphicon-cog"></i>' +
                                                          '</a>' +
                                                        '</td>' +
                                                      '</tr> ' +
                                                    '</tbody>' +
     	                                            '</table>' +
                                                '</td>' +
                                              '</tr> ' +
                                            '</tbody>' +
                                        '</table>' +
                                    '</div>' + 
                                '</div>' +

                                '<div class="grid-stack-item" data-gs-x="6" data-gs-y="0" data-gs-width="6" data-gs-height="4">' +
                                        '<div class="grid-stack-item-content border-shadow" style="" id="gridCapacidad">' +
                                            '<div style="color:#ffffff" class="header-grid text-center">Capacidad</div>' +
                                            '<div id="grid"  data-role="grid" class="k-grid k-widget"></div>' +
                                        '</div>' +
                                '</div>' +

                                '<div class="grid-stack-item" data-gs-x="0" data-gs-y="7" data-gs-width="12" data-gs-height="2">' +
                                        '<div class="grid-stack-item-content border-shadow" id="gridTalleres">' +
                                            '<div style="color:#ffffff" class="header-grid text-center">Taller</div>' +
                                        '</div>' +
                                '</div>' +
                            '</div>' +
                            '<span style="color:"#ffffff">.</span>');

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
        //dataSource: {
        //    schema: {
        //        model: {
        //            fields: {
        //                Familia: { type: "string", editable: false },
        //                Acero: { type: "string", editable: false },
        //                Fibelines: { type: "string", editable: false },
        //                Spools: { type: "string", editable: false },
        //                Kgs: { type: "string", editable: false },
        //                M2: { type: "string", editable: false },
        //                Juntas: { type: "string", editable: false },
        //                Peqs: { type: "string", editable: false }
        //            }
        //        }
        //    },
        //    filter: {
        //        logic: "or",
        //        filters: [
        //          { field: "Accion", operator: "eq", value: 1 },
        //          { field: "Accion", operator: "eq", value: 2 }
        //        ]
        //    },
        //    pageSize: 20,
        //    serverPaging: false,
        //    serverFiltering: false,
        //    serverSorting: false
        //},
        dataSource: [
            { Familia: "Tea", Acero: "Beverages", Fibelines: "aa", Spools: "as", Kgs: "as", M2: "asd", Juntas: "as", Peqs: "as" },
            { Familia: "Tea", Acero: "Beverages", Fibelines: "aa", Spools: "as", Kgs: "as", M2: "asd", Juntas: "as", Peqs: "as" },

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
        columns: [
            { field: "Familia", title: "aa", filterable: true },
            { field: "Acero", title: "sd", filterable: true },
            { field: "Fibelines", title: "aa", filterable: true },
            { field: "Spools", title: "sd", filterable: true },
            { field: "Kgs", title: "aa", filterable: true },
            { field: "M2", title: "sd", filterable: true },
            { field: "Juntas", title: "aa", filterable: true },
            { field: "Peqs", title: "sd", filterable: true }
             
        ]
    });

    CrearContenedorProyecciones();
    CrearContenedorCapacidad();
    CrearContenedorTalleres();
}

function CrearContenedorProyecciones() {
     
}

function CrearContenedorCapacidad() {

}

function CrearContenedorTalleres() {

}
