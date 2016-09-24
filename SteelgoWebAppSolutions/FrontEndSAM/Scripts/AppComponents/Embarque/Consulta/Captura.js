function changeLanguageCall() {
    CargarGrid();
    $("#Area").data("kendoComboBox").value("");
    $("#Cuadrante").data("kendoComboBox").value("");
    //AjaxCargarArea();
    document.title = "Consulta";
};


function CargarGrid() {
    $("#grid").kendoGrid({
        autoBind: true,
        dataSource: {
            data: [],
            schema: {
                model: {
                    fields: {
                        SpoolID: { type: "string", editable: false },
                        Paso: { type: "string", editable: false },
                        Cuadrante: { type: "string", editable: false },
                        Traveler: { type: "String", editable: false },
                        Detalle: { type: "string", editable: false }
                    }
                }
            },
            pageSize: 20,
            serverPaging: false,
            serverFiltering: false,
            serverSorting: false
        },
        autoHeight: true,
        sortable: true,
        scrollable: false,
        filterable: getKendoGridFilterable($("#language").data("kendoDropDownList").value()),
        pageable: {
            refresh: false,
            pageSizes: [10, 15, 20],
            info: false,
            input: false,
            numeric: true,
            buttonCount: 2
        },
        columns: [
            { field: "SpoolID", title: "Spool", filterable: true, width: "150px" },
            { field: "Paso", title: "Paso", filterable: true, width: "150px" },
            { field: "Cuadrante",title: "Cuadrante", filterable: true, width: "150px" },
            { field: "Traveler", title: "Traveler", filterable: false, template: "<a>" + "Ver" + "</a>", width: "150px" },
            //{ command: { text: _dictionary.EmbarqueConsultaTraveler[$("#language").data("kendoDropDownList").value()]/*, click: eliminarCaptura*/ }, template: "<a>" + _dictionary.EmbarqueConsultaVer[$("#language").data("kendoDropDownList").value()] + "</a>", width: "150px" },
            { field: "Detalle", title: "Detalle",filterable: false, template: "<a>" + "link shop" + "</a>", width: "150px" }
        ],
        dataBound: function (e) {
            quickHeadFilter2($("#grid").data("kendoGrid"));
        },
    });
    CustomisaGrid($("#grid"));
};


function quickHeadFilter2(g) {
    var itera = 0;
    var id = "#" + g.wrapper[0].id;
    var gr = '$("' + id + '").data("kendoGrid")';
    if ($(id + " .filter-row").length === 0) {
        g.thead.append(function () {
            var init = "<tr class='filter-row' tabindex='0'>"
            $(id + " thead th:visible").each(function () {
                if (itera < 3) {
                    if (this.hasAttribute("data-field") && $(this).attr("data-field") !== "") {
                        if (modelType(g, $(this).attr("data-field")) === "number") {
                            init += "<th tabindex='0'><input class='k-textbox' data-filter='" + $(this).attr("data-field") + "' type='number' onkeyup='quickFilter(" + gr + ",this,event)'/></th>";
                        } else {
                            init += "<th tabindex='0'><input class='k-textbox' data-filter='" + $(this).attr("data-field") + "' type='text' onkeyup='quickFilter(" + gr + ",this,event)'/></th>";
                        }
                    } else {
                        init += "<th></th>";
                    }
                }
                else
                    init += "<th></th>";
                itera++;
            })
            return init += "</tr>"
        })
    }
}