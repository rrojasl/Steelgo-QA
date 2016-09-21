
function changeLanguageCall() {
    //CargarGrid();
    //ConsultarAlgo();
    inicio();
};

function inicio() {
    SuscribirEventos();
    AjaxProyecto();
    AjaxFuente();
    AjaxTurno();
    CargarGridPopUp();
}

//inicio();

function cargarGrid() {
    
    $("#grid").kendoGrid({
        dataSource: {
            data: [],
            schema: {
                model: {
                    fields: {
                        SpoolJunta: { type: "string", editable: false },
                        Junta: { type: "string", editable: false },
                        NumeroControl: { type: "string", editable: false },
                        EtiquetaJunta: { type: "string", editable: false },
                        ClasificacionPND: { type: "string", editable: false },
                        TipoPrueba: { type: "string", editable: false },
                        Observaciones: { type: "string", editable: false },
                        CodigoAsme: { type: "string", editable: false },
                        NumeroPlacas: { type: "number", editable: true },
                        Tamano: { type: "number", editable: true },
                        Densidad: { type: "number", editable: true },
                        ResultadoConciliacion: { type: "string", editable: true },
                        RazonNoConciliacion: { type: "string", editable: true },
                        InformacionResultados: { type: "string", editable: true }
                    }
                }
            },
        },
        edit: function (e) {
            
        },
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

            { field: "SpoolJunta", title: _dictionary.CapturaReporteGridColumnSpoolJunta[/*"es-MX"*/$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "80px" },
            { field: "Junta", title: _dictionary.CapturaReporteGridColumnJunta[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "50px" },
            { field: "NumeroControl", title: _dictionary.CapturaReporteGridColumnNumeroControl[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "70px" },
            { field: "EtiquetaJunta", title: _dictionary.CapturaReporteGridColumnEtiquetaJunta[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "80px" },
            { field: "ClasificacionPND", title: _dictionary.CapturaReporteGridColumnClasificacionPND[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "120px" },
            { field: "TipoPrueba", title: _dictionary.CapturaReporteGridColumnTipoPrueba[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "60px" },
            { field: "Observaciones", title: _dictionary.CapturaReporteGridColumnObservaciones[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "130px" },
            { field: "CodigoAsme", title: _dictionary.CapturaReporteGridColumnCodigoAsme[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "70px" },
            { field: "NumeroPlacas", title: _dictionary.CapturaReporteGridColumnNumeroPlacas[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellNumberMaftec(), width: "90px", editor: RenderNumeroPlacas, attributes: { style: "text-align:right;" } },
            { field: "Tamano", title: _dictionary.CapturaReporteGridColumnTamano[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellNumberMaftec(), width: "90px", editor: RenderTamano, format: "{0:n4}", attributes: { style: "text-align:right;" } },
            { field: "Densidad", title: _dictionary.CapturaReporteGridColumnDensidad[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellNumberMaftec(), width: "90px", editor: RenderDensidad, format: "{0:n4}", attributes: { style: "text-align:right;" } },
            { field: "ResultadoConciliacion", title: _dictionary.CapturaReporteGridColumnRusult1[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "170px" },
            { field: "RazonNoConciliacion", title: _dictionary.CapturaReporteGridColumnRusult2[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "170px" },
            { field: "InformacionResultados", title: _dictionary.CapturaReporteGridColumnInformacionResultados[$("#language").data("kendoDropDownList").value()], filterable: false, width: "500px", editor: RenderGridDetalle, template: "Tiene:  Numero de placas" },

        ],

        editable: true,
        navigatable: true,
        change: function (e) {
            var selectedRows = this.select();
            var selectedDataItems = [];
            //alert('Change');
            for (var i = 0; i < selectedRows.length; i++) {
                var dataItem = this.dataItem(selectedRows[i]);
                //dataItem.NumeroPlacas

                //selectedDataItems.push(dataItem);
            }
            // selectedDataItems contains all selected data items
        }

    });
    CustomisaGrid($("#grid"));
};



