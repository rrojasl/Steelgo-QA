﻿IniciarCaptura();

function IniciarCaptura() {
    SuscribirEventos();
};

function changeLanguageCall() {
    //endRangeDate.data("kendoDatePicker").setOptions({
    //    format: _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()]
    //});

    CargarGrid();
    CargarGridPopUp();
    $("#Proyecto").data("kendoComboBox").value("");
    $("#Proyecto").data("kendoComboBox").enable(true);
    $('#grid').data('kendoGrid').dataSource.read();

    setTimeout(function () { AjaxGetListaProyectos() }, 1000);
    setTimeout(function () { AjaxCargarCamposPredeterminados() }, 1000);
    document.title = _dictionary.menuOKPND[$("#language").data("kendoDropDownList").value()];
};

function FiltroMostrar(mostrar) {
    var ds = $("#grid").data("kendoGrid").dataSource;

    if (mostrar == 1) {
        var curr_filters = ds.filter().filters;
        if (curr_filters.length != 0)
            ds.filter().filters = [];
        ds.sync();
    }
    else {
        var filters = ds.filter();
        filters.logic = "or"

        //filters.filters.push({ field: "OKPNDID", operator: "eq", value: 0 });
        filters.filters.push({ field: "OK", operator: "eq", value: 0 });
        ds.sync();
    }
}

function CargarGrid() {
    $("#grid").kendoGrid({
        autoBind: true,
        autoSync: true,
        edit: function (e) {
            setTimeout(function () {
                var inputName = e.container.find('input');
                inputName.select();
            });
            if ($('#BotonGuardar').text() != _dictionary.MensajeGuardar[$("#language").data("kendoDropDownList").value()])
                this.closeCell();
        },
        dataSource: {
            data: '',
            schema: {
                model: {
                    fields: {                        
                        //OKPNDID: { type: "int", editable: false },
                        SpoolWorkStatus: { type: "int", editable: false },
                        NumeroControl: { type: "string", editable: false },
                        Cuadrante: { type: "string", editable: false },
                        Prioridad: { type: "number", editable: false },
                        SpoolID: { type: "int", editable: false },
                        OrdenTrabajoSpoolID: { type: "int", editable: false },
                        //OkPND: { type: "boolean", editable: false },
                        OK: { type: "boolean", editable: false },
                        Detalle: { type: "string", editable: false }
                    }
                }
            },
            filter: {
                logic: "or",
                filters: []
            },
            pageSize: 10,
            serverPaging: false,
            serverFiltering: false,
            serverSorting: false
        },
        navigatable: true,
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
            numeric: true            
        },
        filterable: getGridFilterableMaftec(),
        columns: [
            { field: "NumeroControl", title: _dictionary.columnNumeroControl[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "130px" },
            { field: "Cuadrante", title: _dictionary.columnCuadrante[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "127px" },
            { field: "Prioridad", title: _dictionary.columnPrioridad[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellNumberMaftec(), width: "40px", attributes: { style: "text-align:right;" } },
            //{ field: "OrdenTrabajoSpoolID", title: "Orden", filterable: getGridFilterableCellNumberMaftec(), width: "127px" },
            { field: "Detalle", title: _dictionary.columnDetalleJunta[$("#language").data("kendoDropDownList").value()], template: "<div class='EnlaceDetalleJunta' style='text-align:center;'><a href='\\#'  > <span>#=Detalle#</span></a></div>", filterable: false, width: "90px" },
            {
                //field: "OkPND", title: _dictionary.columnOkPND[$("#language").data("kendoDropDownList").value()], filterable: {
                field: "OK", title: _dictionary.columnOkPND[$("#language").data("kendoDropDownList").value()], filterable: {
                    multi: true,
                    messages: {
                        isTrue: _dictionary.lblVerdadero[$("#language").data("kendoDropDownList").value()],
                        isFalse: _dictionary.lblFalso[$("#language").data("kendoDropDownList").value()],
                        style: "max-width:100px;"
                    },
                    dataSource: [{ Etiquetado: true }, { Etiquetado: false }]
                    //}, template: "<input name='fullyPaid' class='ob-paid' type='checkbox' #= OkPND ? 'checked=checked':'' #/>", width: "50px", attributes: { style: "text-align:center;" }
                }, template: "<input name='fullyPaid' class='ob-paid' type='checkbox' #= OK ? 'checked=checked':'' #/>", width: "50px", attributes: { style: "text-align:center;" }
            },
        ],
        dataBound: function (a) {
            $(".ob-paid").bind("change", function (e) {
                if ($('#BotonGuardar').text() == _dictionary.MensajeGuardar[$("#language").data("kendoDropDownList").value()]) {
                    var grid = $("#grid").data("kendoGrid");
                    dataItem = grid.dataItem($(e.target).closest("tr"));
                    if (dataItem != null) {
                        if (e.target.checked == true)
                            //dataItem.OkPND = true;
                            dataItem.OK = true;
                        else
                            //dataItem.OkPND = false;
                            dataItem.OK = false;
                    }                    
                }
                else
                    $("#grid").data("kendoGrid").closeCell();
                //$("#grid").data("kendoGrid").dataSource.sync();
            });
        }
    });

    $("#grid").on("change", ":checkbox", function (e) {
        if ($('#Guardar').text() == _dictionary.MensajeGuardar[$("#language").data("kendoDropDownList").value()]) {
            var grid = $("#grid").data("kendoGrid"),
            dataItem = grid.dataItem($(e.target).closest("tr"));
        }
    });

    CustomisaGrid($("#grid"));

    $("#gridMasivo").kendoGrid({
        autoBind: true,
        autoSync: true,
        edit: function (e) {
            if ($('#BotonGuardar').text() != _dictionary.MensajeGuardar[$("#language").data("kendoDropDownList").value()])
                this.closeCell();
        },
        dataSource: {
            data: '',
            schema: {
                model: {
                    fields: {
                        NumeroControl: { type: "string", editable: false },
                        OKPND: { type: "boolean", editable: false }
                    }
                }
            },
            pageSize: 10,
            serverPaging: false,
            serverFiltering: false,
            serverSorting: false
        },
        navigatable: true,
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
            { field: "NumeroControl", title: _dictionary.columnNumeroControl[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "130px" },
            {
                field: "OkPND", title: _dictionary.columnOkPND[$("#language").data("kendoDropDownList").value()], filterable: {
                    multi: true,
                    messages: {
                        isTrue: _dictionary.lblVerdadero[$("#language").data("kendoDropDownList").value()],
                        isFalse: _dictionary.lblFalso[$("#language").data("kendoDropDownList").value()],
                        style: "max-width:100px;"
                    },
                    dataSource: [{ Etiquetado: true }, { Etiquetado: false }]
                    //}, template: "<input name='fullyPaid' class='ob-paid' type='checkbox' #= OkPND ? 'checked=checked':'' #/>", width: "50px", attributes: { style: "text-align:center;" }
                }, template: "<input name='fullyPaid' class='ob-paid' type='checkbox' #= OK ? 'checked=checked':'' #/>", width: "50px", attributes: { style: "text-align:center;" }
            },
        ]
    });
    $("#gridMasivo").hide();
};

function existenCambios(arregloCaptura) {
    for (index = 0; index < arregloCaptura.length; index++) {
        if (arregloCaptura[index].Agregar == true)
            return true;
    }
    return false;
}

function aplicarPlanchado(arregloCaptura, value) {
    var dataSource = $("#grid").data("kendoGrid").dataSource;
    var filters = dataSource.filter();
    var allData = dataSource.data();
    var query = new kendo.data.Query(allData);
    var data = query.filter(filters).data;

    for (index = 0; index < data.length; index++) {
        data[index].OkPND = value;
    }
}

function NumControlValido(c) {
    c = convertNumControl(c);
    if (c.NumeroControl == "") return -1;
    if (c.OKPND == "") return -1;
    //if (NumIsDuplicated(c)) return -2;
    var datos = $("#gridMasivo").data("kendoGrid").dataSource.data().filter(function (m) { return m.dirty === false })
}

//Convert ced erasing "" to null
function convertNumControl(c) {
    for (var key in c) {
        c[key] === "" ? c[key] = null : 0;
    }
    return c;
}

function CargarGridPopUp() {

    $("#gridPopUp").kendoGrid({
        dataSource: {
            data: [],
            schema: {
                model: {
                    fields: {
                        JuntaSpoolID: { type: "int", editable: false },
                        Etiqueta: { type: "string", editable: false },
                        Cedula: { type: "string", editable: false },
                        Codigo: { type: "string", editable: false },
                        Diametro: { type: "number", editable: false },
                        Espesor: { type: "number", editable: false },
                        Nombre: { type: "string", editable: false },
                        TipoPrueba: { type: "string", editable: false },
                        NumeroRequisicion: { type: "string", editable: false }
                    }
                }
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
        selectable: true,
        filterable: getGridFilterableMaftec(),

        columns: [
            { field: "Etiqueta", title: _dictionary.columnJunta[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "80px", attributes: { style: "text-align:right;" } },
            { field: "Codigo", title: _dictionary.columnTipoJta[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "112px" },
            { field: "Cedula", title: _dictionary.columnCedula[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "105px" },
            { field: "Diametro", title: _dictionary.columnDiametro[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellNumberMaftec(), width: "94px", attributes: { style: "text-align:right;" } },
            { field: "Espesor", title: _dictionary.columnEspesor[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellNumberMaftec(), width: "112px", attributes: { style: "text-align:right;" } },
            { field: "Nombre", title: _dictionary.columnClasificacion[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "135px" },
            { field: "TipoPrueba", title: _dictionary.columnTipoPrueba[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "135px" },
            { field: "NumeroRequisicion", title: _dictionary.columnRequisicion[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "135px" },
        ],
        editable: false,
        navigatable: true
    });
    CustomisaGrid($("#gridPopUp"));
};

function LlenarGridPopUp(data) {
    $("#gridPopUp").data('kendoGrid').dataSource.data([]);
    var ds = $("#gridPopUp").data("kendoGrid").dataSource;
    var array = data;
    for (var i = 0; i < array.length; i++) {
        ds.add(array[i]);
    }
    VentanaModal();
}

function VentanaModal() {
    var modalTitle = "";
    modalTitle = _dictionary.lblDetalleJuntas[$("#language").data("kendoDropDownList").value()];
    var window = $("#windowGrid");
    var win = window.kendoWindow({
        modal: true,
        title: modalTitle,
        resizable: false,
        visible: true,
        width: "95%",
        minWidth: 30,
        position: {
            top: "10px",
            left: "10px"
        },
        actions: [
            "Close"
        ],
        close: function onClose(e) {
            var gridDataSource = $("#gridPopUp").data("kendoGrid").dataSource;
            gridDataSource.filter([]);
        }
    }).data("kendoWindow");
    window.data("kendoWindow").title(modalTitle);
    window.data("kendoWindow").center().open();

};

function existenCambios(arregloCaptura) {
    for (index = 0; index < arregloCaptura.length; index++) {
        if (arregloCaptura[index].OkPND == true && arregloCaptura[index].OKPNDID == 0)
            return true;
        else if (arregloCaptura[index].OkPND == false && arregloCaptura[index].OKPNDID != 0)
            return true;
    }
    return false;
}