IniciarCapturaPlacasGraficas();
function IniciarCapturaPlacasGraficas() {
    SuscribirEventos();
}

function changeLanguageCall() {
    cargarGrid();
    AjaxCargaListaDocumentoRecibido();
    document.title = _dictionary.ServiciosTecnicosEntregaPGBreadcrumb[$("#language").data("kendoDropDownList").value()];
    loadingStop();
}

function cargarGrid() {
    $("#grid").kendoGrid({
        dataSource: {
            schema: {
                model: {
                    fields: {
                        Accion: { type: "number", editable: false },
                        RequisicionID: { type: "number", editable: false },
                        NumeroControl: { type: "string", editable: false },
                        JuntaID:{ type: "number", editable: false },
                        Junta: { type: "number", editable: false },
                        ClasificacionPndID: { type: "number", editable: false },
                        ClasificacionPnd: { type: "string", editable: false },
                        TipoPruebaID: { type: "number", editable: false },
                        TipoPrueba: { type: "string", editable: false },
                        Observaciones: { type: "string", editable: false },
                        CodigoAsmeID: { type: "number", editable: false },
                        CodigoAsme: { type: "string", editable: false },
                        DocumentoRecibidoID: { type: "number", editable: true },
                        DocumentoRecibido: { type: "string", editable: true },
                        DocumentoEstatusID: { type: "number", editable: true },
                        DocumentoEstatus: { type: "string", editable: true },
                        DefectoDocumentoID: { type: "number", editable: true},
                        DefectoDocumento: { type: "string", editable: true }
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
        editable: true,
        autoHeight: true,
        sortable: true,
        scrollable: true,
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
            { field: "Junta", title: _dictionary.columnJunta[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellNumberMaftec(), width: "100px" },
            { field: "ClasificacionPnd", title: _dictionary.columnClasificacion[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "100px" },
            { field: "TipoPrueba", title: _dictionary.columnTipoPrueba[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "150px" },
            { field: "Observaciones", title: _dictionary.columnObservacion[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "150px" },
            { field: "CodigoAsme", title: _dictionary.columnCodigoAsme[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "150px" },
            { field: "DocumentoRecibido", title: _dictionary.columnRecibido[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), editor: RenderComboBoxDocumentoRecibido, width: "120px" },
            { field: "DocumentoEstatus", title: _dictionary.columnCondicionesFisicas[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), editor: RenderComboBoxDocumentoEstatus, width: "160px" },
            { field: "DefectoDocumento", title: _dictionary.columnDefectosRechazos[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), editor: RenderComboBoxDefectoDocumento, width: "160px" }
        ],
    });

    CustomisaGrid($("#grid"));
}