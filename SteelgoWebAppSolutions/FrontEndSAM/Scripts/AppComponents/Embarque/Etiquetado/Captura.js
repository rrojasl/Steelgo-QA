function changeLanguageCall() {
    CargarGrid();
    AjaxCargarCamposPredeterminados();
    //$("#Area").data("kendoComboBox").value("");
    // $("#Cuadrante").data("kendoComboBox").value("");
    //AjaxCargarArea();
    //document.title = "Consulta";
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
                        OkPnd: { type: "boolean", editable: false },
                        OkPintura: { type: "boolean", editable: false },
                        NombreColor: { type: "string", editable: true },
                        Etiquetado: { type: "boolean", editable: true }
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
                field: "OkPnd", title: _dictionary.columnOkPND[$("#language").data("kendoDropDownList").value()], filterable: {
                    multi: true,
                    messages: {
                        isTrue: _dictionary.lblVerdadero[$("#language").data("kendoDropDownList").value()],
                        isFalse: _dictionary.lblFalso[$("#language").data("kendoDropDownList").value()],
                        style: "max-width:100px;"
                    },
                    dataSource: [{ OkPND: true }, { OkPND: false }]
                }, template: "<input name='fullyPaid' class='chk-Lectura' type='checkbox' data-bind='checked: OkPnd' #= OkPnd ? checked='checked' : '' # disabled/>", width: "70px", attributes: { style: "text-align:center;" }
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
            {
                field: "Etiquetado", title: _dictionary.columnEtiquetadoEmbarque[$("#language").data("kendoDropDownList").value()], filterable: {
                    multi: true,
                    messages: {
                        isTrue: _dictionary.lblVerdadero[$("#language").data("kendoDropDownList").value()],
                        isFalse: _dictionary.lblFalso[$("#language").data("kendoDropDownList").value()],
                        style: "max-width:100px;"
                    },
                    dataSource: [{ Etiquetado: true }, { Etiquetado: false }]
                }, template: "<input name='fullyPaid' class='chk-Encintado' type='checkbox' data-bind='checked: Etiquetado' #= Etiquetado ? checked='checked' : '' #/>", width: "80px", attributes: { style: "text-align:center;" }
            },
        ],
        beforeEdit: function (e) {
            var columnIndex = this.cellIndex(e.container);
            var fieldName = this.thead.find("th").eq(columnIndex).data("field");
            if (!isEditable(fieldName, e.model)) {
                e.preventDefault();
            }
        }
    });

    $("#grid .k-grid-content").on("change", "input.chk-Encintado", function (e) {
        if ($('#Guardar').text() == _dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]) {

            var grid = $("#grid").data("kendoGrid");
            var dataItem = grid.dataItem($(e.target).closest("tr"));

            if ($(this)[0].checked) {
                dataItem.Etiquetado = true;
                dataItem.ModificadoPorUsuario = true;
            }
            else {
                dataItem.Etiquetado = false;
                //dataItem.ColorCintaID = 0;
                //dataItem.ColorCinta = "";
                dataItem.ModificadoPorUsuario = true;
            }

            $("#grid").data("kendoGrid").dataSource.sync();
        }
        else {
            if (e.target.checked)
                $("#grid").data("kendoGrid").dataItem($(e.target).closest("tr")).Etiquetado = false;
            else
                $("#grid").data("kendoGrid").dataItem($(e.target).closest("tr")).Etiquetado = true;
        }

        $("#grid").data("kendoGrid").dataSource.sync();
    });

    CustomisaGrid($("#grid"));
};

function isEditable(fieldName, model) {
    if (fieldName === "ColorCinta") {
        if (!model.Encintado) {
            return false;
        }
    }
    return true;
}

function existenCambios(arregloCaptura) {
    for (index = 0; index < arregloCaptura.length; index++) {
        if (arregloCaptura[index].Agregar == true && arregloCaptura[index].RequisicionID == 0)
            return true;
    }
    return false;
}

function PlanchaEtiquedo() {

    var dataSource = $("#grid").data("kendoGrid").dataSource;
    var filters = dataSource.filter();
    var allData = dataSource.data();
    var query = new kendo.data.Query(allData);
    var data = query.filter(filters).data;
    var SpoolsNoPlanchados = '';


    for (var i = 0; i < data.length; i++) {
        //Etiquetado check
        if ($('input:radio[name=SelectTodos]:checked').val() == "Si") {
            data[i].Etiquetado = true;

            if (data[i].Accion == 3)
                data[i].Accion = 2;
            data[i].ModificadoPorUsuario = true;
        }
        else if ($('input:radio[name=SelectTodos]:checked').val() == "No") {
            data[i].Etiquetado = false;

            data[i].Accion = data[i].Accion == 2 ? 3 : data[i].Accion;
            if (data[i].Accion == 1) {
                data[i].ModificadoPorUsuario = false;
            }
            else
                data[i].ModificadoPorUsuario = true;
        }



    }
    $("#grid").data("kendoGrid").dataSource.sync();
}

function PlanchaCuadrante() {

    var seleccionartodos = $('#SelectTodosSi').is(':checked');
    var seleccionarNinguno = $('#SelectTodosNinguno').is(':checked');
    var dataSource = $("#grid").data("kendoGrid").dataSource;
    var filters = dataSource.filter();
    var allData = dataSource.data();
    var query = new kendo.data.Query(allData);
    var data = query.filter(filters).data;
    var SpoolsNoPlanchados = '';

    if ($("#inputCuadrantePlanchado").data("kendoComboBox").text() != "") {
        for (var i = 0; i < data.length; i++) {
            if ($('input:radio[name=LLena]:checked').val() == "Todos") {
                var existe = false;
                for (var x = 0; x < data[i].ListaCuadrantes.length; x++) {
                    if ($("#inputCuadrantePlanchado").data("kendoComboBox").dataSource._data[$("#inputCuadrantePlanchado").val()].CuadranteID == data[i].ListaCuadrantes[x].CuadranteID)
                        existe = true;
                }
                if (existe) {
                    data[i].CuadranteID = $("#inputCuadrantePlanchado").val();
                    data[i].Cuadrante = $("#inputCuadrantePlanchado").data("kendoComboBox").text();
                }
                else {
                    SpoolsNoPlanchados += data[i].Spool + " ";
                }
                if (!seleccionarNinguno)
                    data[i].Etiquetado = seleccionartodos;

                data[i].ModificadoPorUsuario = true;
            }
            else if ($('input:radio[name=LLena]:checked').val() == "Vacios") {
                if (data[i].Cuadrante == "") {
                    var existe = false;
                    for (var x = 0; x < data[i].ListaCuadrantes.length; x++) {
                        if ($("#inputCuadrantePlanchado").data("kendoComboBox").dataSource._data[$("#inputCuadrantePlanchado").val()].CuadranteID == data[i].ListaCuadrantes[x].CuadranteID)
                            existe = true;
                    }
                    if (existe) {
                        data[i].CuadranteID = $("#inputCuadrantePlanchado").val();
                        data[i].Cuadrante = $("#inputCuadrantePlanchado").data("kendoComboBox").text();
                    }
                    else {
                        SpoolsNoPlanchados += data[i].Spool + " ";
                    }
                    data[i].ModificadoPorUsuario = true;
                }
            }


        }
        //displayNotify("", "Los spools: " + SpoolsNoPlanchados + "No han sido planchados", 1);
    }
    //else {
    //    //if (data[i].Cuadrante === "" || data[i].Cuadrante === null || data[i].Cuadrante === undefined) {
    //    //    data[i].CuadranteID = $("#inputCuadrantePlanchado").val();
    //    //    data[i].Cuadrante = $("#inputCuadrantePlanchado").data("kendoComboBox").text();
    //    //    if (!seleccionarNinguno) data[i].Etiquetado = seleccionartodos;
    //    //}
    //    for (var i = 0; i < data.length; i++) {
    //        data[i].CuadranteID = $("#inputCuadrantePlanchado").val();
    //        data[i].Cuadrante = $("#inputCuadrantePlanchado").data("kendoComboBox").text();
    //    }
    //}
    $("#grid").data("kendoGrid").dataSource.sync();
}