function changeLanguageCall() {
    //AjaxCargarHeaderDashboard();
    CargarGrid();
    
    document.title = "Dashboard Embarque";
    AjaxCargarProyecto();
}





function tabActivo(idButton) {
    $(".btn-tabList").removeClass("active");
    var list = document.getElementById("divStatusRequisiciones").getElementsByTagName("button");

    for (var i = 0; i < list.length; i++) {
        if (list[i].id == idButton) {
            $("#" + idButton).addClass("active");
            break;
        }
    }
};


function CargarGrid() {
    $("#grid").kendoGrid({
        autoBind: true,
        dataSource: {
            schema: {
                model: {
                    fields: {
                        
                        Plana: { type: "string", editable: false },
                        M2: { type: "string", editable: false },
                        KG: { type: "string", editable: false },
                    }
                }
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
            { field: "Plana", title: "Plana", filterable: getGridFilterableCellMaftec() },
            { field: "M2", title: "M2", filterable: getGridFilterableCellMaftec(), template: " <div class='' style='text-align:center;'><a href='#=Url##=RequisicionID#'  > <span>#=Requisicion#</span></a></div> " },
            { field: "KG", title: "KG", filterable: getGridFilterableCellMaftec(), },
        ]
    });
    CustomisaGrid($("#grid"));
};
