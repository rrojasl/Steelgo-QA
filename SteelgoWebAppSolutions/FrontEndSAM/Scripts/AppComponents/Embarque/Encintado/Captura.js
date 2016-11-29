IniciarEtiquetado();
function IniciarEtiquetado() {
    SuscribirEventos();
}

function changeLanguageCall() {
    CargarGrid();    
    AjaxCargarCamposPredeterminados();
    document.title = _dictionary.EmbarqueEncintadoTitle[$("#language").data("kendoDropDownList").value()];
};



function CargarGrid() {

    kendo.ui.Grid.fn.editCell = (function (editCell) {
        return function (cell) {
            cell = $(cell);

            var that = this,
                column = that.columns[that.cellIndex(cell)],
                model = that._modelForContainer(cell),
                event = {
                    container: cell,
                    model: model,
                    preventDefault: function () {
                        this.isDefaultPrevented = true;
                    }
                };

            if (model && typeof this.options.beforeEdit === "function") {
                this.options.beforeEdit.call(this, event);
                if (event.isDefaultPrevented) return;
            }

            editCell.call(this, cell);
        };
    })(kendo.ui.Grid.fn.editCell);


    $("#grid").kendoGrid({
        autoBind: true,
        autoSync: true,
        edit: function (e) {
            if ($('#Guardar').text() == _dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]) {
                this.closeCell();
            }

        },
        dataSource: {
            data: [
                 //{
                 //    Accion: 1,
                 //    Proyecto: "ETILENO XXI",
                 //    Spool: "X001-001",
                 //    Cuadrante: "ZZ0-001 PT",
                 //    ColorCinta: "",
                 //    OkPND: true,
                 //    OkPintura: true,
                 //    Encintado:false,
                 //    Etiquetado: true,
                 //    ModificadoPorUsuario: false,
                 //    ListaCuadrantes: [{ CuadranteID: 0, Nombre: "" }, { CuadranteID: 1, Nombre: "A1" }, { CuadranteID: 2, Nombre: "A2" }, { CuadranteID: 3, Nombre: "ZZ0-001 PT" }],
                 //    ListaColoresCinta: [{ ColorCintaID: 0, Nombre: "" }, { ColorCintaID: 1, Nombre: "Verde" }, { ColorCintaID: 2, Nombre: "Amarillo" }, { ColorCintaID: 3, Nombre: "Rojo" }]
                 //},
                 //{

                 //    Accion: 2,
                 //    Proyecto: "ETILENO XXI",
                 //    Spool: "X001-001",
                 //    Cuadrante: "A1",
                 //    ColorCinta: "Rojo",
                 //    OkPND: true,
                 //    OkPintura: true,
                 //    Encintado: true,
                 //    Etiquetado: true,
                 //    ModificadoPorUsuario: false,
                 //    ListaCuadrantes: [{ CuadranteID: 0, Nombre: "" }, { CuadranteID: 1, Nombre: "A1" }, { CuadranteID: 2, Nombre: "A2" }, { CuadranteID: 3, Nombre: "ZZ0-001 PT" }],
                 //    ListaColoresCinta: [{ ColorCintaID: 0, Nombre: "" }, { ColorCintaID: 1, Nombre: "Verde" }, { ColorCintaID: 2, Nombre: "Amarillo" }, { ColorCintaID: 3, Nombre: "Rojo" }]
                 //}
            ],
            schema: {
                model: {
                    fields: {
                        Accion: { type: "number", editable: false },
                        Proyecto: { type: "string", editable: false },
                        Spool: { type: "string", editable: false },
                        Cuadrante: { type: "string", editable: true },
                        OkPND: { type: "boolean", editable: false },
                        OkPintura: { type: "boolean", editable: false },
                        NombreColor: { type: "string", editable: true },
                        Encintado: { type: "boolean", editable: false },
                        Etiquetado: { type: "boolean", editable: false }
                    }
                }
            },
            filter: {
                logic: "or",
                filters: [
                  { field: "Accion", operator: "eq", value: 1 },
                  { field: "Accion", operator: "eq", value: 2 },
                  { field: "Accion", operator: "eq", value: 3 }
                ]
            },
            pageSize: 10,
            serverPaging: false,
            serverFiltering: false,
            serverSorting: false
        },
        pageable: {
            refresh: false,
            pageSizes: [10, 25, 50, 100],
            info: false,
            input: false,
            numeric: true,
        },
        navigatable: true,
        editable: true,
        autoHeight: true,
        sortable: true,
        scrollable: true,
        selectable: true,
        filterable: getGridFilterableMaftec(),
        columns: [
            { field: "Proyecto", title: _dictionary.columnProyecto[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "100px" },
            { field: "Spool", title: _dictionary.columnSpoolIDEmbarque[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "130px" },
            { field: "Cuadrante", title: _dictionary.columnCuadranteEmbarque[$("#language").data("kendoDropDownList").value()], editor: RenderComboBoxCuadrante, filterable: getGridFilterableCellMaftec(), width: "100px" },
            {
                field: "OkPND", title: _dictionary.columnOkPND[$("#language").data("kendoDropDownList").value()], filterable: {
                    multi: true,
                    messages: {
                        isTrue: _dictionary.lblVerdadero[$("#language").data("kendoDropDownList").value()],
                        isFalse: _dictionary.lblFalso[$("#language").data("kendoDropDownList").value()],
                        style: "max-width:100px;"
                    },
                    dataSource: [{ OkPND: true }, { OkPND: false }]
                }, template: "<input name='fullyPaid' class='chk-Lectura' type='checkbox' data-bind='checked: OkPND' #= OkPND ? checked='checked' : '' # disabled/>", width: "70px", attributes: { style: "text-align:center;" }
            },
            {
                field: "OkPintura", title: _dictionary.columnOkPintura[$("#language").data("kendoDropDownList").value()], filterable: {
                    multi: true,
                    messages: {
                        isTrue: _dictionary.lblVerdadero[$("#language").data("kendoDropDownList").value()],
                        isFalse: _dictionary.lblFalso[$("#language").data("kendoDropDownList").value()],
                        style: "max-width:100px;"
                    },
                    dataSource: [{ OkPintura: true }, { OkPintura: false }]
                }, template: "<input name='fullyPaid' class='chk-Lectura' type='checkbox' data-bind='checked: OkPintura' #= OkPintura ? checked='checked' : '' # disabled/>", width: "80px", attributes: { style: "text-align:center;" }
            },
            { field: "NombreColor", title: _dictionary.columnColorCintaEmbarque[$("#language").data("kendoDropDownList").value()], editor: RenderComboBoxColorCinta, filterable: getGridFilterableCellMaftec(), width: "100px" },

             {
                 field: "Etiquetado", title: _dictionary.columnEtiquetadoEmbarque[$("#language").data("kendoDropDownList").value()], filterable: {
                     multi: true,
                     messages: {
                         isTrue: _dictionary.lblVerdadero[$("#language").data("kendoDropDownList").value()],
                         isFalse: _dictionary.lblFalso[$("#language").data("kendoDropDownList").value()],
                         style: "max-width:100px;"
                     },
                     dataSource: [{ Etiquetado: true }, { Etiquetado: false }]
                 }, template: "<input name='fullyPaid' class='chk-Lectura' type='checkbox' data-bind='checked: Etiquetado' #= Etiquetado ? checked='checked' : '' # disabled/>", width: "80px", attributes: { style: "text-align:center;" }
             },
            {
                field: "Encintado", title: _dictionary.columnEncintadoEmbarque[$("#language").data("kendoDropDownList").value()], filterable: {
                    multi: true,
                    messages: {
                        isTrue: _dictionary.lblVerdadero[$("#language").data("kendoDropDownList").value()],
                        isFalse: _dictionary.lblFalso[$("#language").data("kendoDropDownList").value()],
                        style: "max-width:100px;"
                    },
                    dataSource: [{ Encintado: true }, { Encintado: false }]
                }, template: "<input name='fullyPaid' class='chk-Encintado' type='checkbox' data-bind='checked: Encintado' #= Encintado ? checked='checked' : '' #/>", width: "80px", attributes: { style: "text-align:center;" }
            }

        ],
        beforeEdit: function (e) {
            var columnIndex = this.cellIndex(e.container);
            var fieldName = this.thead.find("th").eq(columnIndex).data("field");
            if (!isEditable(fieldName, e.model)) {
                e.preventDefault();
            }
        }
        //dataBound: function (e) {
        //    $(".chk-Encintado").bind("change", function (e) {
        //        if ($('#botonGuardar').text() == _dictionary.MensajeGuardar[$("#language").data("kendoDropDownList").value()]) {
        //            if (e.target.checked) {
        //                $("#grid").data("kendoGrid").dataItem($(e.target).closest("tr")).Encintado = true;
        //                //$("#grid").data("kendoGrid").dataItem($(e.target).closest("tr")).Accion = 1;
        //                if ($("#grid").data("kendoGrid").dataItem($(e.target).closest("tr")).Accion == 3) {
        //                    $("#grid").data("kendoGrid").dataItem($(e.target).closest("tr")).Accion = 2;
        //                }

        //                $("#grid").data("kendoGrid").dataItem($(e.target).closest("tr")).ModificadoPorUsuario = true;
        //            }
        //            else {
        //                $("#grid").data("kendoGrid").dataItem($(e.target).closest("tr")).Encintado = false;
        //                $("#grid").data("kendoGrid").dataItem($(e.target).closest("tr")).Accion = $("#grid").data("kendoGrid").dataItem($(e.target).closest("tr")).Accion == 2 ? 3 : $("#grid").data("kendoGrid").dataItem($(e.target).closest("tr")).Accion;
        //                if ($("#grid").data("kendoGrid").dataItem($(e.target).closest("tr")).Accion == 1) {
        //                    $("#grid").data("kendoGrid").dataItem($(e.target).closest("tr")).ModificadoPorUsuario = false;
        //                }
        //                else
        //                    $("#grid").data("kendoGrid").dataItem($(e.target).closest("tr")).ModificadoPorUsuario = true;
        //                //else if ($("#grid").data("kendoGrid").dataItem($(e.target).closest("tr")).Accion == 2) {
        //                //    $("#grid").data("kendoGrid").dataItem($(e.target).closest("tr")).Accion = 3;
        //                //}
        //            }


        //        }
        //        else {
        //            if (e.target.checked)
        //                $("#grid").data("kendoGrid").dataItem($(e.target).closest("tr")).Etiquetado = false;
        //            else
        //                $("#grid").data("kendoGrid").dataItem($(e.target).closest("tr")).Etiquetado = true;
        //        }

        //        $("#grid").data("kendoGrid").dataSource.sync();
        //    });
        //}
    });    

    $("#grid .k-grid-content").on("change", "input.chk-Encintado", function (e) {
        if ($('#Guardar').text() == _dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]) {
            
            var grid = $("#grid").data("kendoGrid");
            var dataItem = grid.dataItem($(e.target).closest("tr"));

            if ($(this)[0].checked) {
                dataItem.Encintado = true;
                dataItem.ModificadoPorUsuario = true;
            }
            else {
                dataItem.Encintado = false;
                //dataItem.ColorCintaID = 0;
                //dataItem.ColorCinta = "";
                dataItem.ModificadoPorUsuario = true;
            }

            $("#grid").data("kendoGrid").dataSource.sync();
        }
    });

    CustomisaGrid($("#grid"));
};

function isEditable(fieldName, model) {
    if (fieldName === "ColorCinta") {
        if (!model.Encintado ) {
            return false;
        }
    }
    return true;
}

function existenCambios() {
    var ds = $("#grid").data("kendoGrid").dataSource._data;
    if (ds.length > 0) {
        for (var i = 0; i < ds.length; i++) {
            if (ds[i].ModificadoPorUsuario)
                return true;
        }
     
    }
    return false;
}

function PlanchaEncintado() {

    var dataSource = $("#grid").data("kendoGrid").dataSource;
    var filters = dataSource.filter();
    var allData = dataSource.data();
    var query = new kendo.data.Query(allData);
    var data = query.filter(filters).data;
    var SpoolsNoPlanchados = '';


    for (var i = 0; i < data.length; i++) {
        //Etiquetado check
        if ($('input:radio[name=SelectTodos]:checked').val() == "Si") {
            data[i].Encintado = true;
        }
        else if ($('input:radio[name=SelectTodos]:checked').val() == "No") {
            data[i].Encintado = false;
        }
        data[i].ModificadoPorUsuario = true;
    }
    $("#grid").data("kendoGrid").dataSource.sync();
}

function PlancharCuadrante(tipoPlanchado) {
    var seleccionartodos = $('#SelectTodosSi').is(':checked');
    var seleccionarNinguno = $('#SelectTodosNinguno').is(':checked');
    var dataSource = $("#grid").data("kendoGrid").dataSource;
    var filters = dataSource.filter();
    var allData = dataSource.data();
    var query = new kendo.data.Query(allData);
    var data = query.filter(filters).data;

    if ($("#InputCuadrantePlanchado").data("kendoComboBox").text() != "") {
        for (var i = 0; i < data.length; i++) {
            if (tipoPlanchado == "Todos") {
                data[i].CuadranteID = $("#InputCuadrantePlanchado").val();
                data[i].Cuadrante = $("#InputCuadrantePlanchado").data("kendoComboBox").text();
                data[i].ModificadoPorUsuario = true;
                //if (!seleccionarNinguno)
                //    data[i].Etiquetado = seleccionartodos;
            }
            else if (tipoPlanchado == "Vacios") {
                if (data[i].Cuadrante === "" || data[i].Cuadrante === null || data[i].Cuadrante === undefined) {
                    data[i].CuadranteID = $("#InputCuadrantePlanchado").val();
                    data[i].Cuadrante = $("#InputCuadrantePlanchado").data("kendoComboBox").text();
                    data[i].ModificadoPorUsuario = true;
                    //if (!seleccionarNinguno) data[i].Etiquetado = seleccionartodos;
                }
            }
        }
    }
    $("#grid").data("kendoGrid").dataSource.sync();
}

function PlancharColorCinta(tipoPlanchado) {
    if (tipoPlanchado == "Todos") {

    } else if (tipoPlanchado == "Vacios") {

    }
}

function FiltroMostrar(mostrar) {
    var ds = $("#grid").data("kendoGrid").dataSource;

    if (mostrar == 0) {
        var curr_filters = ds.filter().filters;
        if (curr_filters[0].filters != undefined)
            ds.filter(curr_filters[0].filters[0])
        else
            ds.filter(curr_filters[0])
        ds.sync();


    }
    else {
        var curr_filters = ds.filter().filters;
        ds.filter(curr_filters[0])
        ds.sync();
        var filters = ds.filter();
        filters.logic = "or"

        filters.filters.push({ field: "Accion", operator: "eq", value: 2 });
        filters.filters.push({ field: "Accion", operator: "eq", value: 4 });
        ds.sync();
    }
}