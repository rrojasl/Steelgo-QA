var requisicionID;
var resultadoJson;


if ($("#idField").val() != null || $("#idField").val() != undefined)
    requisicionID = $("#idField").val();
else
    requisicionID = 0;


function changeLanguageCall() {
   ObtenerDatosReporte();
    ObtenerDatosGidAjax();
    CargarGrid();
};


function ObtenerDatosReporte() {
    if (requisicionID != 0) {
        ObtenerDatosReporteAjax();
    }
};

function LlenarDatosDeRequisicion(_TipoDePrueba, _Requisicion, _HerramientaPrueba, _TurnoLaboral) {
    $("#RequisicionTipoDePrueba").text(_TipoDePrueba);
    $("#RequisicionNoRequisicion").text(_Requisicion);
    $("#RequisicionHerramientaPrueba").text(_HerramientaPrueba);
    $("#RequisicionTurno").text(_TurnoLaboral);
};


function ObtenerDatosReporte() {

    if (requisicionID != 0) {
        ObtenerDatosReporteAjax();
    }
};




function CargarGrid() {



    $("#grid").kendoGrid({
        autoBind: true,
        dataSource: {
            data: resultadoJson,
            schema: {
                model: {
                    fields: {
                        RequisicionPruebaElementoID : { type:"string", editable:false},
                        SpoolJunta: { type: "string", editable: false },
                        NumeroPlacas: { type: "string", editable: true },
                        Tamaño :{type:"string", editable:true},
                        Densidad: { type: "string", editable: true }
                    }
                }
            },
            pageSize: 20,
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
            pageSizes: [10, 15, 20],
            info: false,
            input: false,
            numeric: true,
        },
        columns: [
         { field: "RequisicionPruebaElementoID", title: _dictionary.lblSooplJuntaCapturaDeReportePruebas[$("#language").data("kendoDropDownList").value()], filterable: true, hidden:true },
        { field: "SpoolJunta", title: _dictionary.lblSooplJuntaCapturaDeReportePruebas[$("#language").data("kendoDropDownList").value()], filterable: true, width: "100px" },
        { field: "NumeroPlacas", title: _dictionary.lblNumeroPlacasCapturaDeReportePruebas[$("#language").data("kendoDropDownList").value()], filterable: true, width: "90px" },
        { field: "Tamaño", title: _dictionary.lblTamañoCapturaDeReportePruebas[$("#language").data("kendoDropDownList").value()], filterable: true, width: "90px" },
        { field: "Densidad", title: _dictionary.lblDensidadCapturaDeReportePruebas[$("#language").data("kendoDropDownList").value()], filterable: true, width: "100px" },
        { field: "DetallePruebas", title: _dictionary.lblDetalleCapturaDeReportePruebas[$("#language").data("kendoDropDownList").value()], filterable: false, width: "500px", editor: RenderGridDetalle, template: "Ver detalle" },

        ],
        

        edit: function (e) { 
            console.log(e);
        
        }
          
    });
};

