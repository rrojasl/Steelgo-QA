IniciarSistemaPinturaAplicable();

function IniciarSistemaPinturaAplicable() {
    SuscribirEventos();
}

function changeLanguageCall() {
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
            if ($('#Guardar').text() == _dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]) {

            }
            else {
                this.closeCell();
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
                        Diametro: { type: "decimal", editable: false },
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
                  { field: "Accion", operator: "eq", value: 2 }
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
            { field: "Diametro", title: _dictionary.columnDiametro[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellNumberMaftec(), width: "100px", width: "95px", format: "{0:n4}", attributes: { style: "text-align:right;" } },
            { field: "SistemaPintura", title: _dictionary.columnSistemaPintura[$("#language").data("kendoDropDownList").value()], editor: comboBoxSistemaPintura, filterable: getGridFilterableCellMaftec(), width: "120px" },
            { field: "Color", title: _dictionary.columnColor[$("#language").data("kendoDropDownList").value()], editor: comboBoxColor, filterable: getGridFilterableCellMaftec(), width: "110px" },
            { command: { text: _dictionary.botonCancelar[$("#language").data("kendoDropDownList").value()], click: eliminaCaptura }, title: _dictionary.columnELM[$("#language").data("kendoDropDownList").value()], width: "99px", attributes: { style: "text-align:center;" } }

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
        if (sistemaPinturaID == 0) {
            return false;
        }
    }
    return true;
}
function eliminaCaptura(e) {
    if ($('#Guardar').text() == _dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]) {
        e.preventDefault();
        var dataItem = $("#grid").data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));

        ventanaConfirm = $("#ventanaConfirm").kendoWindow({
            iframe: true,
            title: _dictionary.PinturaCargaTitulo[$("#language").data("kendoDropDownList").value()],
            visible: false, 
            width: "auto",
            height: "auto",
            modal: true,
            animation: {
                close: false,
                open: false
            }
        }).data("kendoWindow");

        ventanaConfirm.content(_dictionary.SistemaPinturaAplicableMensajeConfirmaEliminar[$("#language").data("kendoDropDownList").value()] +
                     "</br><center><button class='confirm_yes btn btn-blue' id='yesButton'>Si</button><button class='confirm_yes btn btn-blue' id='noButton'> No</button></center>");

        ventanaConfirm.open().center();

        $("#yesButton").click(function () {
            var dataSource = $("#grid").data("kendoGrid").dataSource;
            if(dataItem.Accion === 2){
                dataItem.Accion = 3;
            }else {
                dataSource.remove(dataItem);
            }
            
            ventanaConfirm.close();
            dataSource.sync();
        });
        $("#noButton").click(function () {
            ventanaConfirm.close();
        });
    }
}

function plancharTodo(tipoLlenado) {

    var itemSistemaPintura = $("#inputSistemaPintura").data("kendoComboBox").dataItem($("#inputSistemaPintura").data("kendoComboBox").select());
    var itemColor = $("#inputColorPintura").data("kendoComboBox").dataItem($("#inputColorPintura").data("kendoComboBox").select());

    if (itemSistemaPintura != undefined && itemSistemaPintura.SistemaPinturaID!= 0) {
        PlanchadoSistemaPintura(tipoLlenado);
    }
    if (itemColor != undefined && itemColor.ColorID != 0) {
        PlanchadoColor(tipoLlenado);
    }
}

function PlanchadoSistemaPintura(tipoLlenado) {

    var ds = $("#grid").data("kendoGrid").dataSource;
    var filters = ds.filter();
    var allData = ds.data();
    var query = new kendo.data.Query(allData);
    var data = query.filter(filters).data;

    for (var i = 0; i < data.length; i++) {
        if (tipoLlenado === "Todos") {
            data[i].SistemaPintura = $("#inputSistemaPintura").data("kendoComboBox").text();
            data[i].SistemaPinturaID = $("#inputSistemaPintura").data("kendoComboBox").value();
            data[i].EstatusCaptura = 1;
        }
        else if (tipoLlenado === "Vacios") {
            if (data[i].SistemaPintura === "" || data[i].SistemaPintura === null || data[i].SistemaPintura === undefined) {
                data[i].SistemaPintura = $("#inputSistemaPintura").data("kendoComboBox").text();
                data[i].SistemaPinturaID = $("#inputSistemaPintura").data("kendoComboBox").value();
                data[i].EstatusCaptura = 1;
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

    for (var i = 0; i < data.length; i++) {
        if (tipoLlenado === "Todos") {
            data[i].Color = $("#inputColorPintura").data("kendoComboBox").text();
            data[i].ColorID = $("#inputColorPintura").data("kendoComboBox").value();
            data[i].EstatusCaptura = 1;
        }
        else if (tipoLlenado === "Vacios") {
            if (data[i].Color === "" || data[i].Color === null || data[i].Color === undefined) {
                data[i].Color = $("#inputColorPintura").data("kendoComboBox").text();
                data[i].ColorID = $("#inputColorPintura").data("kendoComboBox").value();
                data[i].EstatusCaptura = 1;
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