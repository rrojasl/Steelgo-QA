IniciarCapturaOkPintura();

function IniciarCapturaOkPintura() {
    SuscribirEventos();
}

function changeLanguageCall() {
    CargarGrid();
    CargarGridPopUp();
    document.title = "OK Pintura";

}

function CargarGrid() {
    $("#grid").kendoGrid({
        autoBind: true,
        autoSync: true,
        edit: function (e) {
            if ($('#BotonGuardar').text() != _dictionary.MensajeGuardar[$("#language").data("kendoDropDownList").value()])
                this.closeCell();
        },
        dataSource: {
            data: [{
                Accion: 1,
                OKPinturaDID: 1,
                NumeroControl: 'X001-001',
                Cuadrante: "A1",
                Prioridad: 12,
                SpoolID: 41719,
                OrdenTrabajoSpoolID: 596,
                OkPintura: false,
                Detalle: "Ver Detalle"
            }
            ],
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
                        ShotBlats: { type: "string", editable: false },
                        Primario: { type: "string", editable: false },
                        Intermedio: { type: "string", editable: false },
                        Acabado: { type: "string", editable: false }
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
            { field: "ShotBlats", title: _dictionary.lblShotblast[$("#language").data("kendoDropDownList").value()], template: "<div class='EnlaceDetalleJunta' style='text-align:center;'><a href='\\#'  > <span>#=Detalle#</span></a></div>", filterable: false, width: "90px" },
            { field: "Primario", title: _dictionary.lblPrimario[$("#language").data("kendoDropDownList").value()], template: "<div class='EnlaceDetalleJunta' style='text-align:center;'><a href='\\#'  > <span>#=Detalle#</span></a></div>", filterable: false, width: "90px" },
            { field: "Intermedio", title: _dictionary.lblIntermedio[$("#language").data("kendoDropDownList").value()], template: "<div class='EnlaceDetalleJunta' style='text-align:center;'><a href='\\#'  > <span>#=Detalle#</span></a></div>", filterable: false, width: "90px" },
            { field: "Acabado", title: _dictionary.lblAcabado[$("#language").data("kendoDropDownList").value()], template: "<div class='EnlaceDetalleJunta' style='text-align:center;'><a href='\\#'  > <span>#=Detalle#</span></a></div>", filterable: false, width: "90px" },
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
        ],
        dataBound: function (a) {
            $(".ob-paid").bind("change", function (e) {
                if ($('#BotonGuardar').text() == _dictionary.MensajeGuardar[$("#language").data("kendoDropDownList").value()]) {
                    var grid = $("#grid").data("kendoGrid");
                    dataItem = grid.dataItem($(e.target).closest("tr"));
                    if (e.target.checked == true)
                        dataItem.OkPND = true;
                    else
                        dataItem.OkPND = false;
                }
                else
                    $("#grid").data("kendoGrid").closeCell();
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
