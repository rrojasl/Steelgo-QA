var modeloRenglon;

function changeLanguageCall() {
    CargarGrid();
    CargarGridPopUpDetallePorPlaca();
    CargarGridPopUpDetallePorPlacaPorDefectos();

    var paramReq = getParameterByName('requisicion');
    var requisicionID = getParameterByName('requisicion');
    if (requisicionID != null) {
        inicio();
        AjaxObtenerElementoRequisicion(requisicionID)        
    } else {
        inicio();
    }
    document.title = _dictionary.menuServiciosTecnicosReporteRT[$("#language").data("kendoDropDownList").value()];    
};

function inicio() {
    SuscribirEventos();
    AjaxProyecto();
    AjaxFuente();
    AjaxTurno();
}


function getParameterByName(name, url) {

    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function validarReglasDeLlenado() {
    //return true;
    for (var i = 0; i < $("#grid").data("kendoGrid").dataSource._data.length; i++) {
        if ($("#grid").data("kendoGrid").dataSource._data[i].ListaDetallePorPlacas.length > 0) {
            for (var j = 0; j < $("#grid").data("kendoGrid").dataSource._data[i].ListaDetallePorPlacas.length; j++) {

                $('tr[data-uid="' + $("#grid").data("kendoGrid").dataSource._data[i].uid + '"] ').css("background-color", "#ffffff");

            }
        }
        else {
            $('tr[data-uid="' + $("#grid").data("kendoGrid").dataSource._data[i].uid + '"] ').css("background-color", "#ffcccc");
        }
    }
    return true;
}


function CargarGrid() {

    $("#grid").kendoGrid({
        dataSource: {
            data: [],
            schema: {
                model: {
                    fields: {
                        OrdenTrabajoID: { type: "number", editable: false },
                        NumeroControl: { type: "string", editable: false },
                        SpoolID: { type: "number", editable: false },
                        JuntaSpoolID: { type: "number", editable: false },
                        Junta: { type: "string", editable: false },
                        ClasificacionPND: { type: "string", editable: false },
                        TipoPrueba: { type: "string", editable: false },
                        Observaciones: { type: "string", editable: false },
                        CodigoAsme: { type: "string", editable: false },
                        NumeroPlacas: { type: "number", editable: true },
                        Resultado: { type: "string", editable: false },
                        ResultadoConciliacion: { type: "string", editable: false },
                        RazonNoConciliacion: { type: "string", editable: false },
                        TemplateDetalleElemento: { type: "string", editable: false },
                        EsSector: { type: "boolean", editable: false }
                    }
                }
            },
        },
        edit: function (e) {
            setTimeout(function () {
                var inputName = e.container.find('input');

                inputName.select();
            });
            if ($('#Guardar').text() == _dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]) {
                this.closeCell();

            };
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
            numeric: true,
        },
        filterable: getGridFilterableMaftec(),
        columns: [
            { field: "NumeroControl", title: _dictionary.CapturaReporteGridColumnSpoolJunta[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "100px" },
            { field: "Junta", title: _dictionary.CapturaReporteGridColumnJunta[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "70px" },
            { field: "ClasificacionPND", title: _dictionary.CapturaReporteGridColumnClasificacionPND[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "70px" },
            { field: "TipoPrueba", title: _dictionary.CapturaReporteGridColumnTipoPrueba[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "130px" },
            { field: "Observaciones", title: _dictionary.CapturaReporteGridColumnObservaciones[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "140px" },
            { field: "CodigoAsme", title: _dictionary.CapturaReporteGridColumnCodigoAsme[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "100px" },
            { field: "Equipo", title: "Equipo", filterable: getGridFilterableCellNumberMaftec(), width: "100px", editor: RenderEquipo, filterable: getGridFilterableCellMaftec() },
            { field: "Turno", title: "Turno", filterable: getGridFilterableCellNumberMaftec(), width: "100px", editor: RenderTurno, filterable: getGridFilterableCellMaftec() },

            {
                field: "EsSector", title: "Evaluación", width: "120px", filterable: {
                    multi: true,
                    messages: {
                        isTrue: _dictionary.lblVerdadero[$("#language").data("kendoDropDownList").value()],
                        isFalse: _dictionary.lblFalso[$("#language").data("kendoDropDownList").value()],
                        style: "max-width:140px;"
                    },
                    dataSource: [{ Etiquetado: true }, { Etiquetado: false }],
                },
                template:
                    "<input class='RadioSector' value='sector' style=' display:inline-block; width:33% !important;'  type='radio' name='tipoEvaluacion#= NumeroControl##=Junta#' #= EsSector ? checked='checked' : '' #>"
                        + "<label style='display:inline-block;   width:70% !important;'>Sector</label><br>"
                    + "<input class='RadioSector' value='cuadrante' style='display:inline-block; width:33% !important;' type='radio' name='tipoEvaluacion#= NumeroControl##=Junta#'  #= !EsSector ? checked='checked' : '' #> "
                        + "<label style='display:inline-block;  width:70% !important;'>Cte</label>"
            },
            { field: "NumeroPlacas", title: _dictionary.CapturaReporteGridColumnNumeroPlacas[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellNumberMaftec(), width: "70px", editor: RenderNumeroPlacas, attributes: { style: "text-align:right;" } },
            { field: "TemplateDetalleElemento", title: _dictionary.CapturaReporteGridColumnInformacionResultados[$("#language").data("kendoDropDownList").value()], filterable: false, width: "100px"/*, editor: RenderGridDetallePorPlaca*/, template: "<div class='EnlacePorPlaca' style='text-align:center;'><a href='\\#'  > <span>#=TemplateDetalleElemento#</span></a></div> " },
            { field: "Resultado", title: "Resultado", filterable: getGridFilterableCellMaftec(), width: "110px", editor: comboBoxResultadoDetallePlaca },
            //{ field: "Indicacion", title: "Indicacion", filterable: getGridFilterableCellNumberMaftec(), minWidth: "100px", editor: RenderTurno, filterable: getGridFilterableCellMaftec() },
            { field: "ResultadoConciliacion", title: _dictionary.CapturaReporteGridColumnRusult1[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "130px" },
            { field: "RazonNoConciliacion", title: _dictionary.CapturaReporteGridColumnRusult2[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "130px" },


        ],
        dataBound: function (a) {
            $(".RadioSector").bind("change", function (e) {
                if ($('#Guardar').text() == _dictionary.MensajeGuardar[$("#language").data("kendoDropDownList").value()]) {
                    var grid = $("#grid").data("kendoGrid");
                    dataItem = grid.dataItem($(e.target).closest("tr"));
                    if (dataItem != null) {
                        if (e.target.value == "sector" && e.target.checked == true) {

                            dataItem.EsSector = true;
                        }
                        else if (e.target.value == "cuadrante" && e.target.checked == true) {

                            dataItem.EsSector = false;
                        }
                        dataItem.NumeroPlacas = "";
                    }
                }
                else
                    $("#grid").data("kendoGrid").closeCell();
                $("#grid").data("kendoGrid").dataSource.sync();
            });
        },
        editable: true,
        navigatable: true
    });
    CustomisaGrid($("#grid")); 5
};

function CargarGridPopUpDetallePorPlaca() {

    $("#gridPopUp").kendoGrid({
        ////autoBind: true,
        dataSource: {
            data: [],//options.model.ListaDetallePorPlacas,
            schema: {
                model: {
                    fields: {
                        Ubicacion: { type: "string", editable: false },
                        Resultado: { type: "String", editable: true },
                        TemplateDetallePorPlaca: { type: "String", editable: false },
                    }
                }
            },
        },
        selectable: true,
        filterable: getGridFilterableMaftec(),
        columns: [
          { field: "Ubicacion", title: _dictionary.ValidacionResultadosCabeceraUbicacion[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "10px" },
          { field: "Resultado", title: _dictionary.CapturaReportePruebasHeaderResultado[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), editor: comboBoxResultadoDetallePlaca, width: "10px" },
          { field: "TemplateDetallePorPlaca", title: "Indicaciones", filterable: false, width: "10px", template: "<div class='EnlaceDefectoPorPlaca' style='text-align:center;'><a href='\\#'  > <span>#=TemplateDetallePorPlaca#</span></a></div> " }
        ],
        editable: true,

        navigatable: true,

    });
    CustomisaGrid($("#gridPopUp"));


};

function CargarGridPopUpDetallePorPlacaPorDefectos() {

    $("#gridPopUpDefectos").kendoGrid({
        autoBind: true,
        dataSource: {
            data: [],
            schema: {
                model: {
                    fields: {
                        Defecto: { type: "string", editable: true },
                        InicioMM: { type: "number", editable: true },
                        FinMM: { type: "number", editable: true },
                        InicioCuadrante: { type: "string", editable: true },
                        FinCuadrante: { type: "string", editable: true },
                        Resultado: { type: "string", editable: true },

                    }
                }
            }, filter: {
                logic: "or",
                filters: [
                  { field: "Accion", operator: "eq", value: 1 },
                  { field: "Accion", operator: "eq", value: 2 },
                    { field: "Accion", operator: "eq", value: 0 },
                    { field: "Accion", operator: "eq", value: undefined }
                ]
            },

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
            numeric: true,
        },
        filterable: getGridFilterableMaftec(),
        columns: [
                { field: "Defecto", title: "Hallazgo", filterable: getGridFilterableCellMaftec(), editor: comboBoxDefectos },
                { field: "Resultado", title: "Resultado", filterable: getGridFilterableCellMaftec(), editor: comboBoxResultadoDetalleDefecto },
                { field: "InicioMM", title: _dictionary.CapturaReportePruebasHeaderInicio[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellNumberMaftec(), editor: RenderInicioMM, attributes: { style: "text-align:right;" } },
                { field: "FinMM", title: _dictionary.CapturaReportePruebasHeaderFin[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellNumberMaftec(),  editor: RenderFinMM, attributes: { style: "text-align:right;" } },
                { field: "InicioCuadrante", title: "Cte Fin", filterable: getGridFilterableCellMaftec(), editor: RenderCuadrantes },
                { field: "FinCuadrante", title: "Cte Ini.", filterable: getGridFilterableCellMaftec(), editor: RenderCuadrantes },
                //{ field: "Soldador", title: "Soldador", filterable: getGridFilterableCellMaftec(),  },
                {
                    command: {
                        //name: "",
                        //title: "",
                        text: _dictionary.botonCancelar[$("#language").data("kendoDropDownList").value()],
                        click: function (e) {
                            e.preventDefault();
                            //var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                            var dataItem = $("#gridPopUpDefectos").data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));

                            if ((dataItem.Accion == 1) || (dataItem.Accion == 0)) {
                                $("#gridPopUpDefectos").data("kendoGrid").dataSource.remove(dataItem);
                            }
                            else {
                                dataItem.Accion = 3;
                            }

                            $("#gridPopUpDefectos").data("kendoGrid").dataSource.sync();
                        }
                    },
                    title: _dictionary.columnELM[$("#language").data("kendoDropDownList").value()],
                    width: "50px",
                    attributes: { style: "text-align:center;" }
                },
            {
                command: {
                    text: _dictionary.botonLimpiar[$("#language").data("kendoDropDownList").value()],
                    click: function (e) {
                        e.preventDefault();
                        if ($('#Guardar').text() == _dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]) {

                            var itemToClean = $("#gridPopUpDefectos").data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));

                            if (itemToClean.Accion == 2)
                                itemToClean.Accion = 4;


                            if (itemToClean.DefectoID != "") {
                                itemToClean.DefectoID = 0;
                            }

                            itemToClean.Defecto = "";
                            itemToClean.InicioMM = "";
                            itemToClean.FinMM = "";

                            var dataSource = $("#gridPopUpDefectos").data("kendoGrid").dataSource;
                            dataSource.sync();
                            //alert(itemToClean);
                        }
                    }
                },
                title: _dictionary.columnLimpiar[$("#language").data("kendoDropDownList").value()],
                width: "50px",
                attributes: { style: "text-align:center;" }
            }
        ],
        editable: "incell",
        toolbar: [{ name: "create" }]

    });
    CustomisaGrid($("#gridPopUpDefectos"));

};





var currentPlaca = null;
function LlenarGridPopUpDetallePlaca(data) {
    modeloRenglon = data;
    currentPlaca = data;
    $("#gridPopUp").data('kendoGrid').dataSource.data([]);
    var ds = $("#gridPopUp").data("kendoGrid").dataSource;
    var array = data.ListaDetallePorPlacas;
    for (var i = 0; i < array.length; i++) {
        ds.add(array[i]);
    }
    VentanaModalDetallePlaca();
}

var currentDefectosPorPlaca = null;
function LlenarGridPopUpDetalleDefectoPorPlaca(data) {
    //modeloRenglon = data;
    currentDefectosPorPlaca = data;
    $("#gridPopUpDefectos").data('kendoGrid').dataSource.data([]);

    if ($("#gridPopUpDefectos").data('kendoGrid').dataSource._filter == undefined) {
        //investigar porque al destruir una ventana se eliminan solo los filtros.
        $("#gridPopUpDefectos").data('kendoGrid').dataSource._filter = {
            logic: "or",
            filters: [
              { field: "Accion", operator: "eq", value: 1 },
              { field: "Accion", operator: "eq", value: 2 },
                { field: "Accion", operator: "eq", value: 0 },
                { field: "Accion", operator: "eq", value: undefined }
            ]
        };
    }


    var ds = $("#gridPopUpDefectos").data("kendoGrid").dataSource;
    var array = data.ListaDetalleDefectos;
    listaDefectosAuxiliar = data.ListaDefectos;
    for (var i = 0; i < array.length; i++) {
        ds.add(array[i]);
    }
    $("#gridPopUpDefectos").data('kendoGrid').dataSource.sync();
    VentanaModalDetalleDefectoPorPlaca();
}

function VentanaModalDetallePlaca() {

    var modalTitle = "";
    if (modeloRenglon.EsSector)
        modalTitle = "Sector";
    else
        modalTitle = "Cuadrante";

    var window = $("#windowGrid");
    var win = window.kendoWindow({
        modal: true,
        title: "DetallePlaca",
        resizable: false,
        visible: true,
        width: "60%",
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

function VentanaModalDetalleDefectoPorPlaca() {

    var modalTitle = "";
    modalTitle = "Detalle Indicaciones";

    if (modeloRenglon.EsSector) {
        $("#gridPopUpDefectos").data("kendoGrid").showColumn("InicioMM");
        $("#gridPopUpDefectos").data("kendoGrid").showColumn("FinMM");
        $("#gridPopUpDefectos").data("kendoGrid").hideColumn("InicioCuadrante");
        $("#gridPopUpDefectos").data("kendoGrid").hideColumn("FinCuadrante");
    }
    else {
        $("#gridPopUpDefectos").data("kendoGrid").hideColumn("InicioMM");
        $("#gridPopUpDefectos").data("kendoGrid").hideColumn("FinMM");
        $("#gridPopUpDefectos").data("kendoGrid").showColumn("InicioCuadrante");
        $("#gridPopUpDefectos").data("kendoGrid").showColumn("FinCuadrante");
    }


    var window = $("#windowGridDefectos");
    var win = window.kendoWindow({
        modal: true,
        title: "DetalleDefectos",
        resizable: false,
        visible: true,
        width: "60%",
        minWidth: 30,
        position: {
            top: "10px",
            left: "10px"
        },
        content: "texto texto texto y mas texto",
        actions: [],
    }).data("kendoWindow");
    window.data("kendoWindow").title(modalTitle);
    window.data("kendoWindow").center().open();

};

var listaDetallePorPlaca = [];
function actualizaGridGeneralPorPlaca() {
    //currentPlaca
    var itera = 0;
    var datosCompletos = true;
    try {
        for (var i = 0; i < $("#grid").data("kendoGrid").dataSource._data.length; i++) {
            if ((currentPlaca.SpoolID == $("#grid").data("kendoGrid").dataSource._data[i].SpoolID) && (currentPlaca.JuntaSpoolID == $("#grid").data("kendoGrid").dataSource._data[i].JuntaSpoolID) && (currentPlaca.OrdenTrabajoID == $("#grid").data("kendoGrid").dataSource._data[i].OrdenTrabajoID)) {
                for (var k = 0; k < $("#grid").data("kendoGrid").dataSource._data[i].NumeroPlacas; k++) {
                    if (($("#gridPopUp").data("kendoGrid").dataSource._data[k].ResultadoID != null) && ($("#gridPopUp").data("kendoGrid").dataSource._data[k].ResultadoID != 0)) {
                        $('tr[data-uid="' + $("#gridPopUp").data("kendoGrid").dataSource._data[k].uid + '"] ').css("background-color", "#ffffff");
                    }
                    else {
                        $('tr[data-uid="' + $("#gridPopUp").data("kendoGrid").dataSource._data[k].uid + '"] ').css("background-color", "#ffcccc");
                        datosCompletos = false;
                    }
                    //$("#grid").data("kendoGrid").dataSource._data[i].ListaDetallePorPlacas[k].TemplateDetallePorPlaca = $("#gridPopUp").data("kendoGrid").dataSource._data.length > 0 ? "Tienes " + $("#gridPopUp").data("kendoGrid").dataSource._data.length + "Defectos" : $("#grid").data("kendoGrid").dataSource._data[i].ListaDetallePorPlacas[j].TemplateDetallePorPlaca
                }

                if (!datosCompletos) {
                    ventanaConfirm = $("#ventanaConfirm").kendoWindow({
                        iframe: true,
                        title: _dictionary.WarningTitle[$("#language").data("kendoDropDownList").value()],
                        visible: false, //the window will not appear before its .open method is called
                        width: "auto",
                        height: "auto",
                        modal: true,
                        animation: []
                    }).data("kendoWindow");

                    ventanaConfirm.content(_dictionary.CapturaReporteGuardadoPlacasIncompleto[$("#language").data("kendoDropDownList").value()] +
                                "</br><center><button class='btn btn-blue' id='yesButton'>Si</button><button class='btn btn-blue' id='noButton'> No</button></center>");

                    ventanaConfirm.open().center();

                    $("#yesButton").click(function () {
                        for (var k = 0; k < $("#grid").data("kendoGrid").dataSource._data[i].NumeroPlacas; k++) {
                            $("#grid").data("kendoGrid").dataSource._data[i].ListaDetallePorPlacas[k].ResultadoID = $("#gridPopUp").data("kendoGrid").dataSource._data[k].ResultadoID;
                            $("#grid").data("kendoGrid").dataSource._data[i].ListaDetallePorPlacas[k].Resultado = $("#gridPopUp").data("kendoGrid").dataSource._data[k].Resultado;
                            $("#grid").data("kendoGrid").dataSource._data[i].ListaDetallePorPlacas[k].ListaDetalleDefectos = $("#gridPopUp").data("kendoGrid").dataSource._data[k].ListaDetalleDefectos;
                        }
                        hayDatosCapturados = true;
                        ventanaConfirm.close();
                        $("#windowGrid").data("kendoWindow").close();
                    });
                    $("#noButton").click(function () {
                        ventanaConfirm.close();
                        //return false;
                    });
                }
                else {
                    for (var k = 0; k < $("#grid").data("kendoGrid").dataSource._data[i].NumeroPlacas; k++) {
                        $("#grid").data("kendoGrid").dataSource._data[i].ListaDetallePorPlacas[k].ResultadoID = $("#gridPopUp").data("kendoGrid").dataSource._data[k].ResultadoID;
                        $("#grid").data("kendoGrid").dataSource._data[i].ListaDetallePorPlacas[k].Resultado = $("#gridPopUp").data("kendoGrid").dataSource._data[k].Resultado;
                        $("#grid").data("kendoGrid").dataSource._data[i].ListaDetallePorPlacas[k].ListaDetalleDefectos = $("#gridPopUp").data("kendoGrid").dataSource._data[k].ListaDetalleDefectos;
                    }
                    hayDatosCapturados = true;
                    $("#windowGrid").data("kendoWindow").close();
                }
                break;
            }
        }
        //return true;
    } catch (e) {
        //return false;
        return;
    }
}

var validacionCorrecta = false;
var listaDetalleDefectos = [];
function actualizaGridGeneralPorDefectos() {
    //currentDefectosPorPlaca
    listaDetalleDefectos = [];

    //filtra solo los registros diferentes a status 3 que es eliminar.
    var dataSourceDefectos = $("#gridPopUpDefectos").data("kendoGrid").dataSource;
    var filters = dataSourceDefectos.filter();
    var allData = dataSourceDefectos.data();
    var query = new kendo.data.Query(allData);
    var data = query.filter(filters).data;

    var itera = 0;
    try {
        validacionCorrecta = true;
        //buscar la manera de pasar un valor de una ventana modal a otra para saber de que placa se esta agregando el defecto.
        for (var i = 0; i < $("#gridPopUp").data("kendoGrid").dataSource._data.length; i++) {

            if ((currentDefectosPorPlaca.Ubicacion == $("#gridPopUp").data("kendoGrid").dataSource._data[i].Ubicacion) && (currentDefectosPorPlaca.SpoolID == $("#gridPopUp").data("kendoGrid").dataSource._data[i].SpoolID) && (currentDefectosPorPlaca.JuntaSpoolID == $("#gridPopUp").data("kendoGrid").dataSource._data[i].JuntaSpoolID) && (currentDefectosPorPlaca.OrdenTrabajoID == $("#gridPopUp").data("kendoGrid").dataSource._data[i].OrdenTrabajoID)) {

                //$("#gridPopUp").data("kendoGrid").dataSource._data[i].TemplateDetallePorPlaca = data.length == 0 ? _dictionary.ServiciosTecnicosCapturaReporteTemplatePlacasDefecto[$("#language").data("kendoDropDownList").value()] : _dictionary.ServiciosTecnicosCapturaReporteCantidadDefectos[$("#language").data("kendoDropDownList").value()].replace("?", data.length);


                ///////////////////////////////////////////////////////////////////////
                for (var j = 0; j < data.length; j++) {
                    if ((data[j].DefectoID != null) && (data[j].DefectoID != 0) && ($.isNumeric(data[j].InicioMM)) && ($.isNumeric(data[j].FinMM)) && (data[j].Accion != 3)) {
                        //if ($("#gridPopUp").data("kendoGrid").dataSource._data[i].OrdenTrabajoID == $("#gridPopUpDefectos").data("kendoGrid").dataSource._data[j].OrdenTrabajoID && $("#gridPopUp").data("kendoGrid").dataSource._data[i].SpoolID == $("#gridPopUpDefectos").data("kendoGrid").dataSource._data[j].SpoolID && $("#gridPopUp").data("kendoGrid").dataSource._data[i].JuntaSpoolID == $("#gridPopUpDefectos").data("kendoGrid").dataSource._data[j].JuntaSpoolID && $("#gridPopUp").data("kendoGrid").dataSource._data[i].Posicion == $("#gridPopUpDefectos").data("kendoGrid").dataSource._data[j].Posicion) {
                        listaDetalleDefectos[itera] = { OrdenTrabajoID: "", SpoolID: "", JuntaSpoolID: "", DefectoID: "", Defecto: "", InicioMM: "", FinMM: "", Accion: "", Posicion: "", InicioCuadrante: "", FinCuadrante: "", Resultado: "", ResultadoID: ""};
                        listaDetalleDefectos[itera].OrdenTrabajoID = data[j].OrdenTrabajoID;
                        listaDetalleDefectos[itera].SpoolID = data[j].SpoolID;
                        listaDetalleDefectos[itera].JuntaSpoolID = data[j].JuntaSpoolID;
                        listaDetalleDefectos[itera].DefectoID = data[j].DefectoID;
                        listaDetalleDefectos[itera].Defecto = data[j].Defecto;
                        listaDetalleDefectos[itera].InicioMM = data[j].InicioMM;
                        listaDetalleDefectos[itera].FinMM = data[j].FinMM;
                        listaDetalleDefectos[itera].FinCuadrante = data[j].FinCuadrante;
                        listaDetalleDefectos[itera].InicioCuadrante = data[j].InicioCuadrante;
                        listaDetalleDefectos[itera].Accion = data[j].Accion == 0 ? 1 : data[j].Accion;
                        listaDetalleDefectos[itera].Posicion = data[j].Posicion;
                        listaDetalleDefectos[itera].Resultado = data[j].Resultado;
                        listaDetalleDefectos[itera].ResultadoID = data[j].ResultadoID;

                        //}
                        itera++;
                        if(data[j].Resultado != ""){
                            if ((data[j].InicioMM > 0 && data[j].FinMM > 0) || (data[j].FinCuadrante != "" && data[j].InicioCuadrante != ""))  {
                                if (data[j].InicioMM < data[j].FinMM || !modeloRenglon.EsSector)
                                    $('tr[data-uid="' + data[j].uid + '"] ').css("background-color", "#ffffff");
                                else {
                                    $('tr[data-uid="' + data[j].uid + '"] ').css("background-color", "#ffcccc");
                                    //displayNotify("CapturaReporteValidacionErroneaDefecto", "", '2');
                                    validacionCorrecta = false;
                                    //return;
                                }
                            }
                            else {
                                $('tr[data-uid="' + data[j].uid + '"] ').css("background-color", "#ffcccc");
                                //displayNotify("CapturaReporteValidacionErroneaDefecto", "", '2');
                                validacionCorrecta = false;
                                //return;
                            }
                        }
                        else {
                            $('tr[data-uid="' + data[j].uid + '"] ').css("background-color", "#ffcccc");
                            //displayNotify("CapturaReporteValidacionErroneaDefecto", "", '2');
                            validacionCorrecta = false;
                            //return;
                        }
                    }
                    else {
                        $('tr[data-uid="' + data[i].uid + '"] ').css("background-color", "#ffcccc");
                    }
                }

                $("#gridPopUp").data("kendoGrid").dataSource.sync();

                if (validacionCorrecta) {
                    if (listaDetalleDefectos.length != data.length) {
                        ventanaConfirm = $("#ventanaConfirm").kendoWindow({
                            iframe: true,
                            title: _dictionary.WarningTitle[$("#language").data("kendoDropDownList").value()],
                            visible: false, //the window will not appear before its .open method is called
                            width: "auto",
                            height: "auto",
                            modal: true,
                            animation: []
                        }).data("kendoWindow");

                        ventanaConfirm.content(_dictionary.CapturaReporteGuardadoDefectosIncompleto[$("#language").data("kendoDropDownList").value()] +
                                    "</br><center><button class='btn btn-blue' id='yesButton'>Si</button><button class='btn btn-blue' id='noButton'> No</button></center>");

                        ventanaConfirm.open().center();

                        $("#yesButton").click(function () {
                            $("#gridPopUp").data("kendoGrid").dataSource._data[i].ListaDetalleDefectos = listaDetalleDefectos;
                            hayDatosCapturados = true;
                            ventanaConfirm.close();
                            $("#windowGridDefectos").data("kendoWindow").close();
                        });
                        $("#noButton").click(function () {
                            ventanaConfirm.close();
                            //return false;
                        });
                    }
                    else if (listaDetalleDefectos.length != 0) {
                        var Resultados = obtenerResultadoDefecto(listaDetalleDefectos);
                        $("#gridPopUp").data("kendoGrid").dataSource._data[i].ResultadoID = Resultados[0].ResultadoID;
                        $("#gridPopUp").data("kendoGrid").dataSource._data[i].Resultado = Resultados[0].Resultado;
                        $("#gridPopUp").data("kendoGrid").dataSource._data[i].ListaDetalleDefectos = listaDetalleDefectos;
                        hayDatosCapturados = true;
                        $("#windowGridDefectos").data("kendoWindow").close();
                        $("#gridPopUp").data("kendoGrid").dataSource.sync();
                    }
                    else {
                        $("#windowGridDefectos").data("kendoWindow").close();
                    }

                }
                else {
                    displayNotify("CapturaReporteValidacionErroneaDefecto", "", '2');
                }

                break;
            }
        }



        //return true;
    } catch (e) {
        return false;
    }

}


function actualizaDefectos() {
    try {
        //buscar la manera de pasar un valor de una ventana modal a otra para saber de que placa se esta agregando el defecto.
        for (var i = 0; i < $("#gridPopUp").data("kendoGrid").dataSource._data.length; i++) {
            for (var j = 0; j < $("#gridPopUpDefectos").data("kendoGrid").dataSource._data.length; j++) {

            }
        }
        return true;
    } catch (e) {
        return false;
    }
}


function obtenerResultadoDefecto(data) {
    var resultado = [];
    resultado[0] = {Resultado: "", ResultadoID: ""}
    for (var i = 0; i < data.length; i++) {
        if (data[i].Resultado == _dictionary.ValidacionResultadosComboRechazado[$("#language").data("kendoDropDownList").value()]) {
            resultado[0].Resultado = data[i].Resultado;
            resultado[0].ResultadoID = data[i].ResultadoID;
        }
        else {
            resultado[0].Resultado = data[i].Resultado;
            resultado[0].ResultadoID = data[i].ResultadoID;
        }
    }
    return resultado;
}


