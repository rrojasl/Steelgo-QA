IniciarCapturaOkPintura();

function IniciarCapturaOkPintura() {
    SuscribirEventos();
}

function changeLanguageCall() {
    CargarGrid();
    CargarGridPopUp();
    document.title = "OK Pintura";
    AjaxCargarProyecto();
    $('input:radio[name=Muestra]:nth(1)').trigger("click");
}

function CargarGrid() {
    $("#grid").kendoGrid({
        autoBind: true,
        autoSync: true,
        edit: function (e) {

                var inputName = e.container.find('input');
                inputName.select();

            if ($('#BotonGuardar').text() != _dictionary.MensajeGuardar[$("#language").data("kendoDropDownList").value()])
                this.closeCell();
        },
        dataBound: function () {
            var myElem = document.getElementById('trParentHeader');
            if (myElem == null) {
                $("#grid").find("th.k-header").parent().before("<tr id='trParentHeader'> " +
                    "<th scope='col' colspan='3' class='k-header'></th><th width='auto'  colspan='2' class='k-header' style='text-align: center;'><span id=''>" + _dictionary.lblShotblast[$("#language").data("kendoDropDownList").value()] + "</span></th>" +
                    "<th width='auto'  colspan='2' class='k-header' style='text-align: center;'><span>" + _dictionary.lblPrimario[$("#language").data("kendoDropDownList").value()] + "</span></th>" +
                    "<th width='auto'  colspan='2' class='k-header' style='text-align: center;'><span id=''>" + _dictionary.lblIntermedio[$("#language").data("kendoDropDownList").value()] + "</span></th>" +
                    "<th width='auto'  colspan='2' class='k-header' style='text-align: center;'><span id=''>" + _dictionary.lblAcabado[$("#language").data("kendoDropDownList").value()] + "</span></th>" +
                    "<th width='auto'  colspan='1' class='k-header' style='text-align: center;'><span id=''></span></th>" +
                    "</tr>");
            }
        },
        dataSource: {
            schema: {
                model: {
                    fields: {
                        Accion: { type: "int", editable: false },
                        OKPinturaDID: { type: "int", editable: false },
                        NumeroControl: { type: "string", editable: false },
                        Cuadrante: { type: "string", editable: false },
                        Prioridad: { type: "number", editable: false },
                        SpoolID: { type: "int", editable: false },
                        OrdenTrabajoSpoolID: { type: "int", editable: false },
                        OkPintura: { type: "boolean", editable: false },
                        ShotBlastFecha: { type: "Date", editable: false },
                        ShotBlastPrueba: { type: "string", editable: false },
                        PrimarioFecha: { type: "Date", editable: false },
                        PrimarioPrueba: { type: "string", editable: false },
                        IntermedioFecha: { type: "Date", editable: false },
                        IntermedioPrueba: { type: "string", editable: false },
                        AcabadoFecha: { type: "Date", editable: false },
                        AcabadoPrueba: { type: "string", editable: false }
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
            { field: "Cuadrante", title: _dictionary.columnCuadrante[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "127px" },
            { field: "Prioridad", title: _dictionary.columnPrioridad[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellNumberMaftec(), width: "80px", attributes: { style: "text-align:right;" } },
            { field: "ShotBlastFecha", title: "Fecha Proceso", filterable: getKendoGridFilterableDateMaftec(), width: "150px", format: _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()] },
            { field: "ShotBlastPrueba", title: "Pruebas", template: "<div class='EnlaceDetalleJunta' style='text-align:center;'><a href='\\#'  > <span>#=Detalle#</span></a></div>", filterable: false, width: "110px" },
            { field: "PrimarioFecha", title: "Fecha Proceso", filterable: getKendoGridFilterableDateMaftec(), width: "150px", format: _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()] },
            { field: "PrimarioPrueba", title: "Pruebas", template: "<div class='EnlaceDetalleJunta' style='text-align:center;'><a href='\\#'  > <span>#=Detalle#</span></a></div>", filterable: false, width: "110px" },
            { field: "IntermedioFecha", title: "Fecha Proceso", filterable: getKendoGridFilterableDateMaftec(), width: "150px", format: _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()] },
            { field: "IntermedioPrueba", title: "Pruebas", template: "<div class='EnlaceDetalleJunta' style='text-align:center;'><a href='\\#'  > <span>#=Detalle#</span></a></div>", filterable: false, width: "110px" },
            { field: "AcabadoFecha", title: "Fecha Proceso", filterable: getKendoGridFilterableDateMaftec(), width: "150px", format: _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()] },
            { field: "AcabadoPrueba", title: "Pruebas", template: "<div class='EnlaceDetalleJunta' style='text-align:center;'><a href='\\#'  > <span>#=Detalle#</span></a></div>", filterable: false, width: "110px" },
            {
                field: "OkPintura", title: "OK Pintura", filterable: {
                    multi: true,
                    messages: {
                        isTrue: _dictionary.lblVerdadero[$("#language").data("kendoDropDownList").value()],
                        isFalse: _dictionary.lblFalso[$("#language").data("kendoDropDownList").value()],
                        style: "max-width:100px;"
                    },
                    dataSource: [{ Etiquetado: true }, { Etiquetado: false }]
                }, template: "<input name='fullyPaid' class='ob-paid' type='checkbox' #= OkPintura ? 'checked=checked':'' #/>", width: "100px", attributes: { style: "text-align:center;" }
            },
        ]
    });
    CustomisaGrid($("#grid"));
};

function CargarGridPopUp() {
    $("#gridPopUp").kendoGrid({
        autoBind: true,
        dataSource: {
            data: [],
            schema: {
                model: {
                    fields: {
                        Accion: { type: "number", editable: false },
                        Prueba: { type: "string", editable: false },
                        UnidadMedida: { type: "string", editable: false },
                        UnidadMin: { type: "double", editable: false },
                        UnidadMax: { type: "double", editable: false },
                    }
                }
            }, filter: {
                logic: "or",
                filters: [
                  { field: "Accion", operator: "eq", value: 1 }
                ]
            },
        },
        navigatable: true,
        filterable: {
            extra: false
        },
        click: function (e) {
        },
        editable: true,
        autoHeight: true,
        sortable: true,
        scrollable: true,
        columns: [
                { field: "Prueba", title: _dictionary.lblPrueba[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "20px" },
                { field: "UnidadMedida", title: "U. Medida", filterable: getGridFilterableCellMaftec(), width: "20px" },
                { field: "UnidadMin", title: _dictionary.columnUnidadMinima[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellNumberMaftec(), format: "{0:n2}", width: "20px", attributes: { style: "text-align:right;" } },
                { field: "UnidadMax", title: _dictionary.columnUnidadMaxima[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellNumberMaftec(), format: "{0:n2}", width: "20px", attributes: { style: "text-align:right;" } }
        ]

    });
    CustomisaGrid($("#gridPopUp"));
};

function LlenarGridPopUp() {
    $("#gridPopUp").data('kendoGrid').dataSource.data([]);
    var ds = $("#gridPopUp").data("kendoGrid").dataSource;
    //var array = data;
    //for (var i = 0; i < array.length; i++) {
    //    ds.add(array[i]);
    //}
    VentanaModal();
}

function VentanaModal() {
    var modalTitle = "Detalle";
    var window = $("#windowGrid");
    var win = window.kendoWindow({
        modal: true,
        title: modalTitle,
        resizable: false,
        visible: true,
        width: "50%",
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
    window.data("kendoWindow").center().open();

};
