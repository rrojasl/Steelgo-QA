kendo.ui.Upload.fn._supportsDrop = function () { return false; };
Cookies.set("home", true, { path: '/' });
Cookies.set("navegacion", "10010", { path: '/' });
var resultadoJson;
var win;

function changeLanguageCall() {
    loadingStart();
    endRangeDateI0.data("kendoDatePicker").setOptions({
        format: _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()]
    });

    endRangeDateI1.data("kendoDatePicker").setOptions({
        format: _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()]
    });

    ObtenerJSONParaGrid();
    CargarGrid();

    loadingStop();
};
function CargarGrid() {
    $("#grid").kendoGrid({
        dataSource: {
            data: resultadoJson,
            schema: {
                model: {
                    fields: {
                        SoldadorCertificacionID: { type: "int" },
                        ObreroID: { type: "int" },
                        CodigoObrero: { type: "string" },
                        PQRID: { type: "int" },
                        NombrePQR: { type: "string" },
                        ProcesoSoldaduraID: { type: "int" },
                        ProcesoSoldadura: { type: "string" },
                        TipoDePruebaID: { type: "int" },
                        TipoDePrueba: { type: "string" },
                        PosicionID: { type: "int" },
                        Posicion: { type: "string" },
                        FechaInicioCertificado: { type: "string" },
                        FechaFinCertificado: { type: "string" },
                        CedulaTuboCalificado: { type: "string" },
                        DiametroCalificado: { type: "string" },
                        EspesorMinimo: { type: "string" },
                        EspesorMaximo: { type: "string" },
                        PorcentajeJuntasRequiere: { type: "string" },
                        CertificadoActivo: { type: "string" },
                        PasosSoldadura: {type: "string"},
                       
                    }
                }
            },
            pageSize: 20,
            serverPaging: false,
            serverFiltering: false,
            serverSorting: false
        },
        autoHeight: true,
        sortable: true,
        scrollable: true,
        editable: "inline",
        filterable: {
            extra: false,
           
        },
        pageable: {
            refresh: false,
            pageSizes: [10, 15, 20],
            info: false,
            input: false,
            numeric: true,
        },
        columns: [
                    
                    { field: "SoldadorCertificacionID", title: _dictionary.SoldadorCertificacionID[$("#language").data("kendoDropDownList").value()], filterable: true, hidden: true },
                    { field: "ObreroID", title: _dictionary.SoldadorCertificacionObreroID[$("#language").data("kendoDropDownList").value()], filterable: true, hidden: true },
                    { field: "PQRID", title: _dictionary.SoldadorCertificacionPQRID[$("#language").data("kendoDropDownList").value()], filterable: true, hidden: true, width: "90px" },
                    { field: "ProcesoSoldaduraID", title: _dictionary.SoldadorCertificacionPQRID[$("#language").data("kendoDropDownList").value()], filterable: true, hidden: true },
                    { field: "TipoDePruebaID", title: _dictionary.SoldadorCertificacionPQRID[$("#language").data("kendoDropDownList").value()], filterable: true, hidden: true },
                    
                    { field: "PosicionID", title: _dictionary.SoldadorCertificacionPQRID[$("#language").data("kendoDropDownList").value()], filterable: true, hidden: true },
                    { field: "PasosSoldadura", title: _dictionary.SoldadorCertificacionCertificadoActivo[$("#language").data("kendoDropDownList").value()], filterable: true, hidden: true },

                    { field: "CodigoObrero", title: _dictionary.SoldadorCertificacionCodigoObrero[$("#language").data("kendoDropDownList").value()], filterable: true, width: "110px" },
                    { field: "NombrePQR", title: _dictionary.SoldadorCertificacionNombrePQR[$("#language").data("kendoDropDownList").value()], filterable: true, width: "120px" },
                    { field: "TipoDePrueba", title: _dictionary.SoldadorCertificacionTipoDePruebaPQR[$("#language").data("kendoDropDownList").value()], filterable: true, width: "110px" },
                    { field: "Posicion", title: _dictionary.SoldadorCertificacionPosicionPQR[$("#language").data("kendoDropDownList").value()], filterable: true, width: "120px" },
                    { field: "FechaInicioCertificado", title: _dictionary.SoldadorCertificacionFechaInicioCertificado[$("#language").data("kendoDropDownList").value()], filterable: true, width: "155px" },
                    { field: "FechaFinCertificado", title: _dictionary.SoldadorCertificacionFechaFinCertificado[$("#language").data("kendoDropDownList").value()], filterable: true, width: "140px" },
                    { field: "CedulaTuboCalificado", title: _dictionary.SoldadorCertificacionCedulaTuboPQR[$("#language").data("kendoDropDownList").value()], filterable: true, width: "110px" },
                    { field: "DiametroCalificado", title: _dictionary.SoldadorCertificacionDiametroCalificadoPQR[$("#language").data("kendoDropDownList").value()], filterable: true, width: "130px" },
                    { field: "EspesorMinimo", title: _dictionary.SoldadorCertificacionEspesorMinimo[$("#language").data("kendoDropDownList").value()], filterable: true, width: "110px" },
                    { field: "EspesorMaximo", title: _dictionary.SoldadorCertificacionEspesorMaximo[$("#language").data("kendoDropDownList").value()], filterable: true, width: "110px" },
                    { field: "PorcentajeJuntasRequiere", title: _dictionary.SoldadorCertificacionPorcentajeJuntasRequiere[$("#language").data("kendoDropDownList").value()], filterable: true,  width: "150px" },
                    { field: "CertificadoActivo", title: _dictionary.SoldadorCertificacionCertificadoActivo[$("#language").data("kendoDropDownList").value()], filterable: true, width: "150px" },
                    { command: { text: _dictionary.botonCancelar[$("#language").data("kendoDropDownList").value()], click: EliminaSoldadorCertificacion }, title: "", width: "90px" },
                    { command: { text: _dictionary.botonDetalle[$("#language").data("kendoDropDownList").value()], click: editaSoldadorCertificacion }, title: "", width: "90px" },
                    { field: "ProcesoSoldadura", title: _dictionary.SoldadorCertificacionProcesoSoldaduraPQR[$("#language").data("kendoDropDownList").value()], filterable: true }
                    
                    
                    
                   
                    
        ],
        dataBound: function (e) {
            $(".k-grid input.k-textbox").prop('readonly', true);
            $(".k-grid td .k-button").text('');
            $(".k-grid td:first-child, .k-grid td:last-child").css('text-overflow', 'clip');
        }
    });
};
function VentanaModal() {
    var modalTitle = "";
    modalTitle = "Soldador Certificacion";
    var window = $("#windowSoldadorCertificacion");
    
    if (win == undefined) {
       
        win = window.kendoWindow({
            actions: "",
            modal: true,
            title: modalTitle,
            resizable: false,
            visible: false,
            width: "50%",
            minWidth: 660,
            position: {
                top: "10%",
                left: "20%"
            }
        }).data("kendoWindow");
      
    }

    window.data("kendoWindow").title(modalTitle);
    window.data("kendoWindow").center().open();

};
function AbrirVentanaModalVista() {
    VentanaModal();
    $("#windowSoldadorCertificacion").show();
};
function LimpiarControlesParaAgregar() {

    $("#SoldadorCertificacionID").val("0");
    $("#SoldadorCertificacionCargarObreroID").data("kendoComboBox").value("");
    $("#SoldadorCertificacionCargarPQRID").data("kendoComboBox").value("");

    $("#SoldadorCertificacionTipoDePruebaID").data("kendoComboBox").value("");
    $("#SoldadorCertificacionProcesoSoldaduraID").data("kendoComboBox").value("");
    $("#SoldadorCertificacionPosicionID").data("kendoComboBox").value("");

    $("#SoldadorCertificacionFechaInicio").data("kendoDatePicker").value("");
    $("#SoldadorCertificacionFechaFin").data("kendoDatePicker").value("");

    $("#SoldadorCertificacionCedulaTuboID").val("");
    $("#SoldadorCertificacionDiametroCalificadoID").val("");

    $("#SoldadorCertificacionEspesorMinimoID").val("");
    $("#SoldadorCertificacionEspesorMaximoID").val("");
    $("#SoldadorCertificacionPorcentajeJuntas").val("");
    $("#chkSoldadorCertificacionCertificacion").is(':checked');

    $("#SoldadorCertificacionPasosDeSoldadura").val("");



};




