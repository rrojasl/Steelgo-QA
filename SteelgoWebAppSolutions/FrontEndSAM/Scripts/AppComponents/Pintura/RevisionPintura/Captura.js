var editado;
var esNormal;

function IniciarSistemaPinturaAplicable() {
    SuscribirEventos();
}

function changeLanguageCall() {
    IniciarSistemaPinturaAplicable();
    //$('input[value="spool"]').prop("checked", true);
    CargarGrid();
    AjaxCargarCamposPredeterminados();
    AjaxCargaProyecto();
    document.title = _dictionary.RevisionPinturaHeader[$("#language").data("kendoDropDownList").value()];
}


function ArregloListadoSpoolsCapturados() {

    var dataSource = $("#grid").data("kendoGrid").dataSource;
    var data = dataSource._data
    JsonCaptura = [];

    for (var i = 0; i < data.length ; i++) {
        JsonCaptura[i] = { SpoolID: "",SistemaPinturaColorID:"" };
        JsonCaptura[i].SpoolID = data[i].SpoolID;
        JsonCaptura[i].SistemaPinturaColorID = data[i].SistemaPinturaColorID;
    }
    return JsonCaptura;
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
            setTimeout(function () {
                var inputName = e.container.find('input');

                inputName.select();
            });
            if ($(".k-grid-content td").css("white-space") == "normal") {
                esNormal = true;
            }
            else {
                esNormal = false;
            }
        },
        autoBind: true,
        dataSource: {
            data: [],
            schema: {
                model: {
                    fields: {
                        Accion: { type: "number", editable: false },
                        SpoolID: { type: "int", editable: false },
                        NombreSpool: { type: "string", editable: false },
                        NumeroControl: { type: "string", editable: false },
                        SistemaPintura: { type: "string", editable: true },
                        Color: { type: "string", editable: true },
                        Area: { type: "number", editable: false },
                        GenerarRevision: { type: "boolean", editable: true },
                        Comentario: { type: "string", editable: true },
                        Version: { type: "number", editable: false }
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
           { field: "NombreSpool", title: _dictionary.columnSpool[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "140px" },
            { field: "NumeroControl", title: _dictionary.columnNumeroControl2[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "130px" },
            { field: "SistemaPintura", title: _dictionary.columnSistemaPintura[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellNumberMaftec(), width: "100px", width: "95px", editor: renderSistemaPintura, attributes: { style: "text-align:left;" } },
            { field: "Color", title: _dictionary.columnColor[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "120px", editor: renderColor },
            { field: "Area", title: _dictionary.columnArea[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellNumberMaftec(), width: "110px", attributes: { style: "text-align:right;" } },
            { field: "GenerarRevision", title: _dictionary.columnRevision[$("#language").data("kendoDropDownList").value()], filterable: {
                multi: true,
                messages: {
                    isTrue: _dictionary.lblVerdadero[$("#language").data("kendoDropDownList").value()],
                    isFalse: _dictionary.lblFalso[$("#language").data("kendoDropDownList").value()],
                    style: "max-width:100px;"
                },
                dataSource: [{ GenerarRevision: true }, { GenerarRevision: false }]
            }, width: "110px", template: "<input name='fullyPaid' class='ob-paid' type='checkbox' #= GenerarRevision ? 'checked=checked':'' #/>", width: "100px", attributes: { style: "text-align:center;" }
            },
            { field: "Comentario", title: _dictionary.HeaderComentario[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "110px", editor: renderComentario },
            { field: "Version", title: _dictionary.columnVersion[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "110px", attributes: { style: "text-align:center;" }  }

        ],
        beforeEdit: function (e) {
            //var columnIndex = this.cellIndex(e.container);
            //var fieldName = this.thead.find("th").eq(columnIndex).data("field");
            //if (!isEditable(fieldName, e.model)) {
            //    e.preventDefault();
            //}
        },
        dataBound: function () {
            var grid = $("#grid").data("kendoGrid");
            var gridData = grid.dataSource.view();

            for (var i = 0; i < gridData.length; i++) {
                var currentUid = gridData[i].uid;
                if (gridData[i].RowOk == false) {
                    grid.table.find("tr[data-uid='" + currentUid + "']").css("background-color", "#ffcccc");
                }
                else if (gridData[i].RowOk) {
                    grid.table.find("tr[data-uid='" + currentUid + "']").css("background-color", "#ffffff");
                }
            }

            if (esNormal) {
                $(".k-grid-content td").css("white-space", "normal");
            }
            else {
                $(".k-grid-content td").css("white-space", "nowrap");
            }

        }
    });
    $("#grid").on("change", ":checkbox", function (e) {
        var grid = $("#grid").data("kendoGrid"),
        dataItem = grid.dataItem($(e.target).closest("tr"));

        if ($('#Guardar').text() == _dictionary.MensajeGuardar[$("#language").data("kendoDropDownList").value()]) {

            dataItem.GenerarRevision = e.target.checked;
        }
        else {
            dataItem.GenerarRevision = !e.target.checked;
           // $("#grid").data("kendoGrid").dataSource.sync();
            grid.dataSource.sync();
        }
       
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

function opcionHabilitarView(valor, name) {
    if (valor) {
        $('#FieldSetView').find('*').attr('disabled', true);
        $("#inputProyecto").data("kendoComboBox").enable(false);
        $("input[name='TipoBusqueda']").attr("disabled", true);
        $("#btnBuscar").attr("disabled", true);
       

        $("#Guardar").text(_dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]);
        $("#btnGuardar").text(_dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]);
        $("#botonGuardar3").text(_dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]);
        $("#botonGuardar4").text(_dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]);
    }
    else {
        $('#FieldSetView').find('*').attr('disabled', false);
        $("#inputProyecto").data("kendoComboBox").enable(true);
        $("input[name='TipoBusqueda']").attr("disabled", false);
        $("#btnBuscar").attr("disabled", false);

        $("#Guardar").text(_dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]);
        $("#btnGuardar").text(_dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]);
        $("#botonGuardar3").text(_dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]);
        $("#botonGuardar4").text(_dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]);
    }
};

function tieneClase(item) {

    var tieneClass = $(item).hasClass("k-state-border-up") || $(item).hasClass("k-state-border-down");
    return tieneClass;
}

function PlanchaSistemaPintura() {
    var dataSource = $("#grid").data("kendoGrid").dataSource;
    var filters = dataSource.filter();
    var allData = dataSource.data();
    var query = new kendo.data.Query(allData);
    var data = query.filter(filters).data;
    if ($("#inputPlanchadoSP").data("kendoComboBox").text() != "") {
        for (var i = 0; i < data.length; i++) {
            if ($('input:radio[name=LLena]:checked').val() === "Todos") {
                data[i].SistemaPinturaID = $("#inputPlanchadoSP").val();
                data[i].SistemaPintura = $("#inputPlanchadoSP").data("kendoComboBox").text();
                data[i].ListaColorPintura = $("#inputPlanchadoColor").data("kendoComboBox").dataSource._data;
                data[i].NoPintable =$("#inputPlanchadoSP").data("kendoComboBox").dataItem($("#inputPlanchadoSP").data("kendoComboBox").select()).NoPintable;
            }
            else {
                if (data[i].SistemaPintura === "" || data[i].SistemaPintura === null || data[i].SistemaPintura === undefined) {
                    data[i].SistemaPinturaID = $("#inputPlanchadoSP").val();
                    data[i].SistemaPintura = $("#inputPlanchadoSP").data("kendoComboBox").text();
                    data[i].ListaColorPintura = $("#inputPlanchadoColor").data("kendoComboBox").dataSource._data;
                    data[i].NoPintable = $("#inputPlanchadoSP").data("kendoComboBox").dataItem($("#inputPlanchadoSP").data("kendoComboBox").select()).NoPintable;
                }
            }
        }
    }
    $("#grid").data("kendoGrid").dataSource.sync();
}

function PlanchaColor() {
    var dataSource = $("#grid").data("kendoGrid").dataSource;
    var filters = dataSource.filter();
    var allData = dataSource.data();
    var query = new kendo.data.Query(allData);
    var data = query.filter(filters).data;
    if ($("#inputPlanchadoColor").data("kendoComboBox").text() != "") {
        for (var i = 0; i < data.length; i++) {
            if ($('input:radio[name=LLena]:checked').val() === "Todos") {
                data[i].SistemaPinturaColorID = $("#inputPlanchadoColor").val();
                data[i].Color = $("#inputPlanchadoColor").data("kendoComboBox").text();
            }
            else {
                if (data[i].SistemaPinturaID == $("#inputPlanchadoSP").val() && (data[i].Color === "" || data[i].Color === null || data[i].Color === undefined)) {
                    data[i].SistemaPinturaColorID = $("#inputPlanchadoColor").val();
                    data[i].Color = $("#inputPlanchadoColor").data("kendoComboBox").text();
                }
            }
        }
    }
    $("#grid").data("kendoGrid").dataSource.sync();
}

function PlanchaMotivo() {
    var dataSource = $("#grid").data("kendoGrid").dataSource;
    var filters = dataSource.filter();
    var allData = dataSource.data();
    var query = new kendo.data.Query(allData);
    var data = query.filter(filters).data;
    if ($("#inputPlanchadoMotivo").data("kendoComboBox").text() != "") {
        for (var i = 0; i < data.length; i++) {
            if ($('input:radio[name=LLena]:checked').val() === "Todos") {
                data[i].ComentarioID = $("#inputPlanchadoMotivo").val();
                data[i].Comentario = $("#inputPlanchadoMotivo").data("kendoComboBox").text();
            }
            else {
                if (data[i].Comentario === "" || data[i].Comentario === null || data[i].Comentario === undefined) {
                    data[i].ComentarioID = $("#inputPlanchadoMotivo").val();
                    data[i].Comentario = $("#inputPlanchadoMotivo").data("kendoComboBox").text();
                }
            }
        }
    }
    $("#grid").data("kendoGrid").dataSource.sync();
}

function PlancharGenerarRevision() {
    var generar = $('input:radio[name=SelectTodos]:checked').val();

    var dataSource = $("#grid").data("kendoGrid").dataSource;
    var filters = dataSource.filter();
    var allData = dataSource.data();
    var query = new kendo.data.Query(allData);
    var data = query.filter(filters).data;
    if (generar != "" && generar != "Ninguno") {
        for (var i = 0; i < data.length; i++) {
            if ($('input:radio[name=LLena]:checked').val() === "Todos") {
                if (generar == "Si")
                    data[i].GenerarRevision = true;
                if (generar == "No")
                    data[i].GenerarRevision = false;
            }
            else {
                if (data[i].GenerarRevision === false || data[i].GenerarRevision === null || data[i].GenerarRevision === undefined) {
                    if (generar == "Si")
                        data[i].GenerarRevision = true;
                    if (generar == "No")
                        data[i].GenerarRevision = false;
                }
            }
        }
    }
    $("#grid").data("kendoGrid").dataSource.sync();
}
