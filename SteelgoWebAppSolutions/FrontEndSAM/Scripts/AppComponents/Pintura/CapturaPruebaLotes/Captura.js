﻿IniciarCapturaLotesCapturaReporte();

function IniciarCapturaLotesCapturaReporte() {

    SuscribirEventos();
    //setTimeout(function () { AjaxCargarSistemaPintura(); }, 1000);
    //setTimeout(function () { AjaxCargarLotes(); }, 1100);
}


function changeLanguageCall() {
    CargarGrid();
    CargarGridPopUp();
    AjaxCargarProyecto();
    AjaxCargarProcesos();
    $('input:radio[name=Muestra]:nth(1)').trigger("click");
}

function CargarGrid() {
    $("#grid").kendoGrid({
        autoBind: true,
        dataSource: {
            schema: {
                model: {
                    fields: {
                        Accion: { type: "number", editable: false },
                        NombreSpool: { type: "string", editable: false },
                        SistemaPintura: { type: "string", editable: false },
                        Color: { type: "string", editable: false },
                        M2: { type: "String", editable: false },
                        PruebasReq: { type: "number", editable: false },
                        PruebasEjec: { type: "number", editable: false },
                        NombreCuadrante: { type: "string", editable: false },
                        CapturaPrueba: { type: "string", editable: false }
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
        filterable: {
            extra: false
        },
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
        filterable: getGridFilterableMaftec(),
        columns: [
            { field: "NombreSpool", title: _dictionary.columnNumeroControl[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec() },
            { field: "SistemaPintura", title: _dictionary.columnSistemaPintura[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec() },
            { field: "Color", title: _dictionary.columnColor[$("#language").data("kendoDropDownList").value()], width: "150px", filterable: getGridFilterableCellMaftec() },
            { field: "M2", title: _dictionary.columnM2[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellNumberMaftec(), format: "{0:n2}", width: "95px", attributes: { style: "text-align:right;" } },
            //{ field: "PruebasReq", title: "# Pruebas Req", filterable: getGridFilterableCellMaftec(), width: "150px"  },
            //{ field: "PruebasEjec", title: "# Pruebas Ejec", filterable: getGridFilterableCellMaftec(), width: "150px" },
            { field: "NombreCuadrante", title: _dictionary.columnCuadrante[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec() },
            { field: "CapturaPrueba", title: _dictionary.columnSeRealizoPrueba[$("#language").data("kendoDropDownList").value()], filterable: false, template: "<div class='EnlaceDetallePrueba' style='text-align:center;'><a href='\\#'  > <span>#=CapturaPrueba#</span></a></div>", filterable: false, width: "190px" }
        ]
    });
    CustomisaGrid($("#grid"));
}

function CargarGridPopUp() {
    $("#gridPopUp").kendoGrid({
        dataSource: {
            data: [],
            schema: {
                model: {
                    fields: {
                        Accion: { type: "number", editable: false },
                        Fecha: { type: "date", editable: true },
                        ValorUnidadMedida: { type: "number", editable: true },
                        Aprobado: { type: "string", editable: false }
                    }
                }
            }, filter: {
                logic: "or",
                filters: [
                  { field: "Accion", operator: "eq", value: 1 },
                  { field: "Accion", operator: "eq", value: 2 },
                  { field: "Accion", operator: "eq", value: 0 },
                  { field: "Accion", operator: "eq", value: 4 },
                  { field: "Accion", operator: "eq", value: undefined }
                ]
            }


        },
        selectable: true,
        filterable: getGridFilterableMaftec(),
        change: function (e) {
            grid = e.sender;
            var currentDataItem = grid.dataItem(this.select());
            var currentIndexRow = $("#gridPopUp").data("kendoGrid").items().index(this.select());
            // alert("evento change:" + currentIndexRow);
            console.log("evento change:" + currentIndexRow);
        },
        columns: [
                  { field: "Fecha", format: _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()], editor: RenderDatePicker, title: _dictionary.columnFechaPrueba[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "20px" },
                  { field: "ValorUnidadMedida", editor: RenderAprobado, title: "Valor U. Medida", filterable: getGridFilterableCellNumberMaftec(), width: "20px", attributes: { style: "text-align:right;" } },
                  { field: "Aprobado", title: "Aprobado", filterable: getGridFilterableCellNumberMaftec(), width: "20px" }
        ],
        editable: true,
        navigatable: true,
        toolbar: [{ name: "create" }]
    });
    CustomisaGrid($("#gridPopUp"));
};



function LlenarGridPopUp() {
    //$("#gridPopUp").data('kendoGrid').dataSource.data([]);
    //var ds = $("#gridPopUp").data("kendoGrid").dataSource;
    //var array = data;
    //for (var i = 0; i < array.length; i++) {
    //    ds.add(array[i]);
    //}
    VentanaModal();
}

function VentanaModal() {
    var modalTitle = "Prueba Adherencia(PLG)";
    var window = $("#windowGrid");
    var win = window.kendoWindow({
        modal: true,
        title: modalTitle,
        resizable: false,
        visible: true,
        width: "70%",
        position: {
            top: "10px",
            left: "10px"
        },
        actions: [
            "Close"
        ],
        close: function onClose(e) {
            //var gridDataSource = $("#gridPopUp").data("kendoGrid").dataSource;
            //  gridDataSource.filter([]);
        }
    }).data("kendoWindow");
    window.data("kendoWindow").center().open();

};