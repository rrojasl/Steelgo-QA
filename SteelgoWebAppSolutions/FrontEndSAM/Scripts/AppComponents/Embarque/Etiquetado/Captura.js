function changeLanguageCall() {
    CargarGrid();
    llenarCombo();
    //$("#Area").data("kendoComboBox").value("");
   // $("#Cuadrante").data("kendoComboBox").value("");
    //AjaxCargarArea();
    //document.title = "Consulta";
};


function CargarGrid() {
    $("#grid").kendoGrid({
        autoBind: true,
        autoSync: true,

        dataSource: {
            data: [
                {
                    Accion: 1,
                    SpoolID: "X001-001",
                    Cuadrante: "ZZ0-001 PT",
                    Etiquetado: true
                }
            ],
            schema: {
                model: {
                    fields: {
                        Accion: { type: "number", editable: false },
                        SpoolID: { type: "string", editable: false },
                        Cuadrante: { type: "string", editable: false },
                        Etiquetado: { type: "boolean", editable:false}
                    }
                }
            },
            filter: {
                logic: "or",
                filters: [
                     { field: "Accion", operator: "eq", value: 1 }
                ]
            },
            pageSize: 10,
            serverPaging: false,
            serverFiltering: false,
            serverSorting: false
        },
        navigatable: true,
        editable: true,
        autoHeight: true,
        sortable: true,
        scrollable: false,
        selectable: true,
        //filterable: getKendoGridFilterable($("#language").data("kendoDropDownList").value()),
        pageable: {
            refresh: false,
            pageSizes: [10, 25, 50, 20],
            info: false,
            input: false,
            numeric: true,
            // buttonCount: 2
        },
        filterable: getGridFilterableMaftec(),
        columns: [
            { field: "SpoolID", title: _dictionary.columnSpoolIDEmbarque[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "160px" },
            { field: "Cuadrante", title: _dictionary.columnCuadranteEmbarque[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "170px" },

            //{ command: { text: _dictionary.EmbarqueConsultaTraveler[$("#language").data("kendoDropDownList").value()]/*, click: eliminarCaptura*/ }, template: "<a>" + _dictionary.EmbarqueConsultaVer[$("#language").data("kendoDropDownList").value()] + "</a>", width: "150px" },
            {
                field: "Etiquetado", title: _dictionary.columnEtiquetadoEmbarque[$("#language").data("kendoDropDownList").value()], filterable: {
                    multi: true,
                    messages: {
                        isTrue: _dictionary.lblVerdadero[$("#language").data("kendoDropDownList").value()],
                        isFalse: _dictionary.lblFalso[$("#language").data("kendoDropDownList").value()],
                        style: "max-width:100px;"
                    },
                    dataSource: [{ Etiquetado: true }, { Etiquetado: false }]
                }, template: "<input name='fullyPaid' class='chk-agregar' type='checkbox' data-bind='checked: Etiquetado' #= Etiquetado ? checked='checked' : '' #/>", width: "50px", attributes: { style: "text-align:center;" }
            }
        ],
        //dataBound: function (e) {
        //    quickHeadFilter2($("#grid").data("kendoGrid"));
        //},
    });
    CustomisaGrid($("#grid"));
};

function llenarCombo() {
    var datasource = [
    { ProyectoID: 0, Nombre: ""},
    { ProyectoID: 1, Nombre: "Etileno"}
    ]

    $("#Proyecto").data("kendoComboBox").dataSource.data([]);
    $("#Proyecto").data("kendoComboBox").dataSource.data(datasource);
}
