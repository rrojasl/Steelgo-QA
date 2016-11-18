function changeLanguageCall() {
    CargarGrid();
    AjaxCargarCamposPredeterminados();
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
            data:'',
            schema: {
                model: {
                    fields: {
                        Proyecto: { type: "string", editable: false },
                        Accion: { type: "number", editable: false },
                        Spool: { type: "string", editable: false },
                        Cuadrante: { type: "string", editable: true },
                        OKPND: { type: "boolean", editable: true },
                        OKPintura: { type: "boolean", editable: true },
                        Etiquetado: { type: "boolean", editable: true }
                    }
                }
            },
            filter: {
                logic: "or",
                filters: [
                     { field: "Accion", operator: "eq", value: 1 },
                      { field: "Accion", operator: "eq", value: 2 },
                       { field: "Accion", operator: "eq", value: 4 }
                ]
            },
            pageSize: 10,
            serverPaging: false,
            serverFiltering: false,
            serverSorting: false
        },
        nnavigatable: true,
        autoHeight: true,
        sortable: true,
        scrollable: true,
        editable: true,
        selectable: true,
        pageable: {
            refresh: false,
            pageSizes: [10, 25, 50, 100],
            info: false,
            input: false,
            numeric: true,
        },
        filterable: getGridFilterableMaftec(),
        columns: [
            { field: "Proyecto", title: _dictionary.columnProyecto[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "180px" },
            { field: "Spool", title: _dictionary.columnSpoolIDEmbarque[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "160px" },
            { field: "Cuadrante", title: _dictionary.columnCuadranteEmbarque[$("#language").data("kendoDropDownList").value()], editor: RenderComboBoxCuadrante, filterable: getGridFilterableCellMaftec(), width: "170px" },
            {
                field: "OKPND", title: _dictionary.columnOkPND[$("#language").data("kendoDropDownList").value()], filterable: {
                    multi: true,
                    messages: {
                        isTrue: _dictionary.lblVerdadero[$("#language").data("kendoDropDownList").value()],
                        isFalse: _dictionary.lblFalso[$("#language").data("kendoDropDownList").value()],
                        style: "max-width:100px;"
                    },
                    dataSource: [{ Etiquetado: true }, { Etiquetado: false }]
                }, template: "<input name='fullyPaid' class='chk-agregar' type='checkbox' data-bind='checked: Etiquetado' #= Etiquetado ? checked='checked' : '' #/>", width: "120px", attributes: { style: "text-align:center;" }
            },
            {
                field: "OKPintura", title: _dictionary.columnOkPintura[$("#language").data("kendoDropDownList").value()], filterable: {
                    multi: true,
                    messages: {
                        isTrue: _dictionary.lblVerdadero[$("#language").data("kendoDropDownList").value()],
                        isFalse: _dictionary.lblFalso[$("#language").data("kendoDropDownList").value()],
                        style: "max-width:100px;"
                    },
                    dataSource: [{ Etiquetado: true }, { Etiquetado: false }]
                }, template: "<input name='fullyPaid' class='chk-agregar' type='checkbox' data-bind='checked: Etiquetado' #= Etiquetado ? checked='checked' : '' #/>", width: "120px", attributes: { style: "text-align:center;" }
            },
            {
                field: "Etiquetado", title: _dictionary.columnEtiquetadoEmbarque[$("#language").data("kendoDropDownList").value()], filterable: {
                    multi: true,
                    messages: {
                        isTrue: _dictionary.lblVerdadero[$("#language").data("kendoDropDownList").value()],
                        isFalse: _dictionary.lblFalso[$("#language").data("kendoDropDownList").value()],
                        style: "max-width:100px;"
                    },
                    dataSource: [{ Etiquetado: true }, { Etiquetado: false }]
                }, template: "<input name='fullyPaid' class='chk-agregar' type='checkbox' data-bind='checked: Etiquetado' #= Etiquetado ? checked='checked' : '' #/>", width: "120px", attributes: { style: "text-align:center;" }
            },
        ],
        //dataBound: function (e) {
        //    quickHeadFilter2($("#grid").data("kendoGrid"));
        //},
    });
    CustomisaGrid($("#grid"));
};

function existenCambios(arregloCaptura) {
    for (index = 0; index < arregloCaptura.length; index++) {
        if (arregloCaptura[index].Agregar == true && arregloCaptura[index].RequisicionID == 0)
            return true;
    }
    return false;
}

function PlanchaCuadrante() {
    var dataSource = $("#grid").data("kendoGrid").dataSource;
    var filters = dataSource.filter();
    var allData = dataSource.data();
    var query = new kendo.data.Query(allData);
    var data = query.filter(filters).data;

    if ($("#inputCuadrantePlanchado").data("kendoComboBox").text() != "") {
        for (var i = 0; i < data.length; i++) {
            if ($('input:radio[name=LLena]:checked').val() === "Todos") {
                data[i].CuadranteID = $("#inputCuadrantePlanchado").val();
                data[i].Cuadrante = $("#inputCuadrantePlanchado").data("kendoComboBox").text();
            }
            else {
                if (data[i].Cuadrante === "" || data[i].Cuadrante === null || data[i].Cuadrante === undefined) {
                    data[i].CuadranteID = $("#inputCuadrantePlanchado").val();
                    data[i].Cuadrante = $("#inputCuadrantePlanchado").data("kendoComboBox").text();
                }
            }
        }
    }
    $("#grid").data("kendoGrid").dataSource.sync();
}