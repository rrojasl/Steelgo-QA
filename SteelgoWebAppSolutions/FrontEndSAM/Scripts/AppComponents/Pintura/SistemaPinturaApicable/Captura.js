﻿IniciarSistemaPinturaAplicable();

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
                        Spool: { type: "string", editable: false },
                        NumeroControl: { type: "string", editable: false },
                        Diametro: { type: "number", editable: false },
                        SistemaPinturaID: { type: "number", editable: true },
                        SistemaPintura: { type: "string", editable: true },
                        ColorID: { type: "number", editable: true },
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

        ]
    });
    CustomisaGrid($("#grid"));
}

function eliminaCaptura(e) {
    if ($('#Guardar').text() == _dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]) {
        e.preventDefault();
        var dataItem = $("#grid").data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));

        ventanaConfirm = $("#ventanaConfirm").kendoWindow({
            iframe: true,
            title: _dictionary.PinturaCargaTitulo[$("#language").data("kendoDropDownList").value()],
            visible: false, //the window will not appear before its .open method is called
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

            ventanaConfirm.close();
        });
        $("#noButton").click(function () {
            ventanaConfirm.close();
        });
    }
}

function insertRows() {
    var data = [{
        Accion: 1,
        Spool: "B6AE10-20VA29034-01-01-02",
        NumeroControl: "X160-001",
        Diametro: 4.0000,
        SistemaPinturaID: 0,
        SistemaPintura: "",
        ColorID: 0,
        Color: "",
        ListaSistema: [
            { SistemaPinturaID: 0, SistemaPintura: "" },
            { SistemaPinturaID: 1, SistemaPintura: "A1" },
            { SistemaPinturaID: 2, SistemaPintura: "A2" },
            { SistemaPinturaID: 3, SistemaPintura: "18.1" },
        ],
        ListaColor: [
            { ColorID: 0, Color: "" },
            { ColorID: 1, Color: "Aluminio" },
            { ColorID: 2, Color: "Amarillo" },
            { ColorID: 3, Color: "Azul" }
        ],
        EstatusCaptura: 1
    },
    {
        Accion: 2,
        Spool: "B6AE10-20VA29034-01-01-03",
        NumeroControl: "X160-002",
        Diametro: 4.0000,
        SistemaPinturaID: 1,
        SistemaPintura: "A1",
        ColorID: 1,
        Color: "Alumnio",
        ListaSistema: [
            { SistemaPinturaID: 0, SistemaPintura: "" },
            { SistemaPinturaID: 1, SistemaPintura: "A1" },
            { SistemaPinturaID: 2, SistemaPintura: "A2" },
            { SistemaPinturaID: 3, SistemaPintura: "18.1" },
        ],
        ListaColor: [
            { ColorID: 0, Color: "" },
            { ColorID: 1, Color: "Aluminio" },
            { ColorID: 2, Color: "Amarillo" },
            { ColorID: 3, Color: "Azul" }
        ],
        EstatusCaptura: 1
    }];
    var p = [
        { ProyectoID: 0, Nombre: "" },
        { ProyectoID: 16, Nombre: "ETILENO XXI" },
    ];

    var sp = [
        { SistemaPinturaID: 0, SistemaPintura: "" },
        { SistemaPinturaID: 1, SistemaPintura: "A1" },
        { SistemaPinturaID: 2, SistemaPintura: "A2" },
        { SistemaPinturaID: 3, SistemaPintura: "18.1" },
    ];

    var grid = $("#grid").data("kendoGrid");
    grid.dataSource.data(data);
    grid.dataSource.sync();

    $("#inputProyecto").data("kendoComboBox").dataSource.data([]);
    $("#inputProyecto").data("kendoComboBox").dataSource.data(p);
    $("#inputProyecto").data("kendoComboBox").value(16);
    $("#inputProyecto").data("kendoComboBox").trigger('changes');

    $("#inputSistemaPintura").data("kendoComboBox").dataSource.data([]);
    $("#inputSistemaPintura").data("kendoComboBox").dataSource.data(sp);

 }

function plancharTodo(tipoLlenado) {

    var itemSistemaPintura = $("#inputSistemaPintura").data("kendoComboBox").dataItem($("#inputSistemaPintura").data("kendoComboBox").select());
    var itemColor = $("#inputColor").data("kendoComboBox").dataItem($("#inputColor").data("kendoComboBox").select());

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
            data[i].Color = $("#inputColor").data("kendoComboBox").text();
            data[i].ColorID = $("#inputColor").data("kendoComboBox").value();
            data[i].EstatusCaptura = 1;
        }
        else if (tipoLlenado === "Vacios") {
            if (data[i].Color === "" || data[i].Color === null || data[i].Color === undefined) {
                data[i].Color = $("#inputColor").data("kendoComboBox").text();
                data[i].ColorID = $("#inputColor").data("kendoComboBox").value();
                data[i].EstatusCaptura = 1;
            }            
        }
    }

    $("#grid").data("kendoGrid").dataSource.sync();
}