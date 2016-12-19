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
                  { field: "Accion", operator: "eq", value: 2 }
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
        },
        dataBound: function (e) {
            var ds = $("#grid").data("kendoGrid");
            var gridData = ds.dataSource.view();

            if (gridData.length > 0) {
                
                for (var i = 0; i < gridData.length; i++) {
                    var aux;
                    var currentUid = gridData[i].uid;
                    if (gridData[i].RowOk == false) {
                        ds.table.find("tr[data-uid='" + currentUid + "']").css("background-color", "#ffcccc");
                    }
                    else if (gridData[i].RowOk) {
                        aux = i + 1;
                        if(aux%2 == 0)
                            ds.table.find("tr[data-uid='" + currentUid + "']").css("background-color", "#F5F5F5");
                        else
                            ds.table.find("tr[data-uid='" + currentUid + "']").css("background-color", "#FFFFFF");
                    }
                }
            }
        }
    });    

    $("#grid .k-grid-content").on("change", "input.chk-Encintado", function (e) {
        if ($('#Guardar').text() == _dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]) {
            
            var grid = $("#grid").data("kendoGrid");
            var dataItem = grid.dataItem($(e.target).closest("tr"));

            if ($(this)[0].checked) {
                dataItem.Encintado = true;                
                if (dataItem.Accion == 1 || (dataItem.Accion == 2 && (dataItem.CuadranteID != dataItem.CuadranteAnteriorSam3ID 
                    || dataItem.ColorID != dataItem.ColorAnteriorID)))
                    dataItem.ModificadoPorUsuario = true;
                else
                    dataItem.ModificadoPorUsuario = false;
            }
            else {
                dataItem.Encintado = false;
                dataItem.NombreColor = "";
                dataItem.ColorID = 0;

                if (dataItem.Accion == 2 || (dataItem.Accion == 1 && (dataItem.CuadranteID != dataItem.CuadranteAnteriorSam3ID
                    || dataItem.ColorID != dataItem.ColorAnteriorID)))
                    dataItem.ModificadoPorUsuario = true;
                else
                    dataItem.ModificadoPorUsuario = false;
            }
        }
        else {
            if (e.target.checked)
                $("#grid").data("kendoGrid").dataItem($(e.target).closest("tr")).Encintado = false;
            else
                $("#grid").data("kendoGrid").dataItem($(e.target).closest("tr")).Encintado = true;
        }

        $("#grid").data("kendoGrid").dataSource.sync();
    });

    CustomisaGrid($("#grid"));
};

function isEditable(fieldName, model) {
    if (fieldName === "NombreColor") {
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

function PlancharCuadrante(Cuadrante) {    
    var dataSource = $("#grid").data("kendoGrid").dataSource;
    var filters = dataSource.filter();
    var allData = dataSource.data();
    var query = new kendo.data.Query(allData);
    var data = query.filter(filters).data;

    
    for (var i = 0; i < data.length; i++) {
        if ($('input:radio[name=LLena]:checked').val() === "Todos") {
            data[i].CuadranteID = Cuadrante.CuadranteID;
            data[i].CuadranteSam2ID = Cuadrante.CuadranteSam2ID;
            data[i].Cuadrante = Cuadrante.Nombre;

            if (data[i].CuadranteAnteriorSam3ID === Cuadrante.CuadranteID) {
                if ((data[i].Accion == 1 && !data[i].Encintado && data[i].ColorID == data[i].ColorAnteriorID)
                    || (data[i].Accion == 2 && data[i].Encintado && data[i].ColorID == data[i].ColorAnteriorID))
                    data[i].ModificadoPorUsuario = false;
                else
                    data[i].ModificadoPorUsuario = true;
            } else {
                data[i].ModificadoPorUsuario = true;
            }
        }
        else if ($('input:radio[name=LLena]:checked').val() === "Vacios") {
            if (data[i].Cuadrante === "" || data[i].Cuadrante === null || data[i].Cuadrante === undefined) {
                data[i].CuadranteID = Cuadrante.CuadranteID;
                data[i].CuadranteSam2ID = Cuadrante.CuadranteSam2ID;
                data[i].Cuadrante = Cuadrante.Nombre;

                if (data[i].CuadranteAnteriorSam3ID === Cuadrante.CuadranteID) {
                    if ((data[i].Accion == 1 && !data[i].Encintado && data[i].ColorID == data[i].ColorAnteriorID)
                        || (data[i].Accion == 2 && data[i].Encintado && data[i].ColorID == data[i].ColorAnteriorID))
                        data[i].ModificadoPorUsuario = false;
                    else
                        data[i].ModificadoPorUsuario = true;
                } else {
                    data[i].ModificadoPorUsuario = true;
                }
            }
        }
    }

    $("#grid").data("kendoGrid").dataSource.sync();
}

function PlanchaEncintado(Encintado) {

    var dataSource = $("#grid").data("kendoGrid").dataSource;
    var filters = dataSource.filter();
    var allData = dataSource.data();
    var query = new kendo.data.Query(allData);
    var data = query.filter(filters).data;

    for (var i = 0; i < data.length; i++) {
        if ($('input:radio[name=LLena]:checked').val() === "Todos") {
            if (Encintado == "Si") {
                data[i].Encintado = true;

                if (data[i].Accion == 1 || (data[i].Accion == 2 && (data[i].CuadranteID != data[i].CuadranteAnteriorSam3ID
                    || data[i].ColorID != data[i].ColorAnteriorID)))
                    data[i].ModificadoPorUsuario = true;
                else
                    data[i].ModificadoPorUsuario = false;

            } else if (Encintado == "No") {
                data[i].Encintado = false;
                data[i].NombreColor = "";
                data[i].ColorID = 0;

                if (data[i].Accion == 2 || (data[i].Accion == 1 && (data[i].CuadranteID != data[i].CuadranteAnteriorSam3ID
                    || data[i].ColorID != data[i].ColorAnteriorID)))
                    data[i].ModificadoPorUsuario = true;
                else
                    data[i].ModificadoPorUsuario = false;

            }

        } else if ($('input:radio[name=LLena]:checked').val() === "Vacios") {
            if (!data[i].Encintado) {
                if (Encintado == "Si") {
                    data[i].Encintado = true;

                    if (data[i].Accion == 1 || (data[i].Accion == 2 && (data[i].CuadranteID != data[i].CuadranteAnteriorSam3ID
                                || data[i].ColorID != data[i].ColorAnteriorID)))
                        data[i].ModificadoPorUsuario = true;
                    else
                        data[i].ModificadoPorUsuario = false;
                }
            }
        }
    }
    $("#grid").data("kendoGrid").dataSource.sync();
}

function PlanchaColorCinta(ColorCinta) {
    var dataSource = $("#grid").data("kendoGrid").dataSource;
    var filters = dataSource.filter();
    var allData = dataSource.data();
    var query = new kendo.data.Query(allData);
    var data = query.filter(filters).data;
    
    for (var i = 0; i < data.length; i++) {
        if ($('input:radio[name=LLena]:checked').val() === "Todos") {
            if (data[i].Encintado) {
                data[i].NombreColor = ColorCinta.Nombre;
                data[i].ColorID = ColorCinta.ColorID;
            }

            if (data[i].ColorAnteriorID === ColorCinta.ColorID) {
                if ((data[i].Accion == 1 && !data[i].Encintado && data[i].CuadranteID == data[i].CuadranteAnteriorSam3ID)
                    || (data[i].Accion == 2 && data[i].Encintado && data[i].CuadranteID == data[i].CuadranteAnteriorSam3ID))
                    data[i].ModificadoPorUsuario = false;
                else
                    data[i].ModificadoPorUsuario = true;
            } else {
                data[i].ModificadoPorUsuario = true;
            }

        } else if ($('input:radio[name=LLena]:checked').val() === "Vacios") {
            if (data[i].NombreColor == "" || data[i].NombreColor == null || data[i].NombreColor == undefined) {
                if (data[i].Encintado) {
                    data[i].NombreColor = ColorCinta.Nombre;
                    data[i].ColorID = ColorCinta.ColorID;
                }

                if (data[i].ColorAnteriorID === ColorCinta.ColorID) {
                    if ((data[i].Accion == 1 && !data[i].Encintado && data[i].CuadranteID == data[i].CuadranteAnteriorSam3ID)
                        || (data[i].Accion == 2 && data[i].Encintado && data[i].CuadranteID == data[i].CuadranteAnteriorSam3ID))
                        data[i].ModificadoPorUsuario = false;
                    else
                        data[i].ModificadoPorUsuario = true;
                } else {
                    data[i].ModificadoPorUsuario = true;
                }
            }
        }
    }

    $("#grid").data("kendoGrid").dataSource.sync();
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
        //filters.filters.push({ field: "Accion", operator: "eq", value: 4 });
        ds.sync();
    }
}