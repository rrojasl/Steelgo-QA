IniciarSistemaPinturaAplicable();

function IniciarSistemaPinturaAplicable() {
    SuscribirEventos();
}

function changeLanguageCall() {
    $('input[value="spool"]').prop("checked", true);
    CargarGrid();
    AjaxCargarCamposPredeterminados();
    AjaxCargaProyecto();
    document.title = _dictionary.SistemaPinturaAplicableHeader[$("#language").data("kendoDropDownList").value()];
}

function CargarGrid() {
    //BeforeEdit
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
        edit: function (e) {
            if ($('#Guardar').text() != _dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]) {
                    this.closeCell();
            }
            else {
                var inputName = e.container.find('input');
                inputName.select();
            }

        },
        autoBind: true,
        dataSource: {
            data: [],
            schema: {
                model: {
                    fields: {
                        Accion: { type: "number", editable: false },
                        SpoolAplicableID: { type: "number", editable: false },
                        OrdenTrabajoID: { type: "number", editable: false },
                        SpoolID: { type: "number", editable: false },
                        Spool: { type: "string", editable: false },
                        NumeroControl: { type: "string", editable: false },
                        Diametro: { type: "number", editable: false },
                        SistemaPinturaColorID: { type: "number", editable: true },
                        SistemaPinturaID: { type: "number", editable: true },
                        SistemaPintura: { type: "string", editable: true },
                        ColorPinturaID: { type: "number", editable: true },
                        Color: { type: "string", editable: true },
                        EstatusCaptura: { type: "number", editable: true },
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
        navigatable: true,
        filterable: getGridFilterableMaftec(),
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
        columns: [
            { field: "Spool", title: _dictionary.columnSpool[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "140px" },
            { field: "NumeroControl", title: _dictionary.columnNumeroControl2[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "130px" },
            { field: "Diametro", title: _dictionary.columnDiametro[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellNumberMaftec(), width: "100px", width: "95px", attributes: { style: "text-align:right;" } },
            { field: "SistemaPintura", title: _dictionary.columnSistemaPintura[$("#language").data("kendoDropDownList").value()], editor: comboBoxSistemaPintura, filterable: getGridFilterableCellMaftec(), width: "120px" },
            { field: "Color", title: _dictionary.columnColor[$("#language").data("kendoDropDownList").value()], editor: comboBoxColor, filterable: getGridFilterableCellMaftec(), width: "110px" },
            { command: { text: _dictionary.botonLimpiar[$("#language").data("kendoDropDownList").value()], click: eliminaCaptura }, title: _dictionary.columnLimpiar[$("#language").data("kendoDropDownList").value()], width: "99px", attributes: { style: "text-align:center;" } }

        ],
        beforeEdit: function (e) {
        var columnIndex = this.cellIndex(e.container);
        var fieldName = this.thead.find("th").eq(columnIndex).data("field");
        if (!isEditable(fieldName, e.model)) {
            e.preventDefault();
        }
    },
    });
    CustomisaGrid($("#grid"));
}

function isEditable(fieldName, model) {
    if (fieldName === "Color") {
        var sistemaPinturaID = model.SistemaPinturaID
        if (model.ListaColorPintura.length < 1) {
            return false;
        }
    }
    return true;
}
function eliminaCaptura(e) {
    if ($('#Guardar').text() == _dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]) {
        e.preventDefault();
        var itemToClean = $("#grid").data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));
        itemToClean.SistemaPinturaColorID = 0;
        itemToClean.SistemaPinturaID = 0
        itemToClean.SistemaPintura = "";
        itemToClean.ColorPinturaID = 0;
        itemToClean.Color = "";

        var dataSource = $("#grid").data("kendoGrid").dataSource;
        dataSource.sync();
    }
}

function plancharTodo(tipoLlenado) {

    var itemSistemaPintura = $("#inputSistemaPintura").data("kendoComboBox").dataItem($("#inputSistemaPintura").data("kendoComboBox").select());
    var itemColor = $("#inputColorPintura").data("kendoComboBox").dataItem($("#inputColorPintura").data("kendoComboBox").select());

    if (itemSistemaPintura != undefined && itemSistemaPintura.SistemaPinturaID!= 0) {
        PlanchadoSistemaPintura(tipoLlenado);
    }
    
}

function PlanchadoSistemaPintura(tipoLlenado) {
    var itemSistemaPintura = $("#inputSistemaPintura").data("kendoComboBox").dataItem($("#inputSistemaPintura").data("kendoComboBox").select());
    var ds = $("#grid").data("kendoGrid").dataSource;
    var filters = ds.filter();
    var allData = ds.data();
    var query = new kendo.data.Query(allData);
    var data = query.filter(filters).data;
    var itemColor = $("#inputColorPintura").data("kendoComboBox").dataItem($("#inputColorPintura").data("kendoComboBox").select());

    for (var i = 0; i < data.length; i++) {
        if (tipoLlenado === "Todos") {
            data[i].SistemaPintura = itemSistemaPintura.Nombre;
            data[i].SistemaPinturaID = itemSistemaPintura.SistemaPinturaID;
            data[i].NoPintable = itemSistemaPintura.NoPintable;
            data[i].EstatusCaptura = 1;
            data[i].ListaColorPintura = $("#inputColorPintura").data("kendoComboBox").dataSource._data;

            if (data[i].ListaColorPintura.length < 1) {

                data[i].Color = "";
                data[i].ColorPinturaID = 0;
                data[i].SistemaPinturaColorID = 0;
            } else {
                data[i].Color = itemColor.Nombre;
                data[i].ColorPinturaID = itemColor.ColorPinturaID;
                data[i].SistemaPinturaColorID = itemColor.SistemaPinturaColorID;
            }
        }
        else if (tipoLlenado === "Vacios") {
            if (data[i].SistemaPintura === "" || data[i].SistemaPintura === null || data[i].SistemaPintura === undefined) {
                data[i].SistemaPintura = itemSistemaPintura.Nombre;
                data[i].SistemaPinturaID = itemSistemaPintura.SistemaPinturaID;
                data[i].NoPintable = itemSistemaPintura.NoPintable;
                data[i].EstatusCaptura = 1;
                data[i].ListaColorPintura = $("#inputColorPintura").data("kendoComboBox").dataSource._data;

                if (data[i].ListaColorPintura.length < 1) {
                    data[i].Color = "";
                    data[i].ColorPinturaID = 0;
                    data[i].SistemaPinturaColorID = 0;
                } else {
                    data[i].Color = itemColor.Nombre;
                    data[i].ColorPinturaID = itemColor.ColorPinturaID;
                    data[i].SistemaPinturaColorID = itemColor.SistemaPinturaColorID;
                }
            }           
        }
    }

    $("#grid").data("kendoGrid").dataSource.sync();
}

function PlanchadoColor(tipoLlenado) {
    var ds = $("#grid").data("kendoGrid").dataSource;
    var filters = ds.filter();
    var allData = ds.data();
    var query = new kendo.data.Query(allData);
    var data = query.filter(filters).data;
    var itemColor = $("#inputColorPintura").data("kendoComboBox").dataItem($("#inputColorPintura").data("kendoComboBox").select());
    var itemSistemaPintura = $("#inputSistemaPintura").data("kendoComboBox").dataItem($("#inputSistemaPintura").data("kendoComboBox").select());

    for (var i = 0; i < data.length; i++) {
        if (tipoLlenado === "Todos") {
            if (itemSistemaPintura.NoPintable) {
                data[i].Color = "";
                data[i].ColorPinturaID = 0;
                data[i].SistemaPinturaColorID = 0;
            } else {

                data[i].Color = itemColor.Nombre;
                data[i].ColorPinturaID = itemColor.ColorPinturaID;
                data[i].SistemaPinturaColorID = itemColor.SistemaPinturaColorID;
                data[i].EstatusCaptura = 1;
            }
        }
        else if (tipoLlenado === "Vacios") {
            if (data[i].Color === "" || data[i].Color === null || data[i].Color === undefined) {
                if (itemSistemaPintura.NoPintable) {
                    data[i].Color = "";
                    data[i].ColorPinturaID = 0;
                    data[i].SistemaPinturaColorID = 0;
                } else {

                    data[i].Color = itemColor.Nombre;
                    data[i].ColorPinturaID = itemColor.ColorPinturaID;
                    data[i].SistemaPinturaColorID = itemColor.SistemaPinturaColorID;
                    data[i].EstatusCaptura = 1;
                }
            }            
        }
    }

    $("#grid").data("kendoGrid").dataSource.sync();
}

function ValidaInformacionCapturada() {
    var ds = $("#grid").data("kendoGrid").dataSource;
    var filters = ds.filter();
    var allData = ds.data();
    var query = new kendo.data.Query(allData);
    var data = query.filter(filters).data;

    var contador = 0;
    if (data.length > 0) {
        for (var i = 0; i < data.length; i++) {
            if (data[i].EstatusCaptura == 1) {
                contador++;
            }
        }
        if (contador > 0) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}