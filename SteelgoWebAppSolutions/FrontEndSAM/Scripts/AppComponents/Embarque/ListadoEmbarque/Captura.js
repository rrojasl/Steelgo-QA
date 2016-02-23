var ObjetoRenglon, IndiceRenglon;
var endRangeDate;
var TemplateBtnEnviar = "<button  type='button' class='btn btn-blue botonEnviar'> <span>Enviar</span></button>";
var reportePath;
var reporteID;


function changeLanguageCall() {
    AltaFecha();
    endRangeDate.data("kendoDatePicker").setOptions({
        format: _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()]
    });
    CargarGrid();
    AjaxCargarListadoEmbarque('Enviados', $("#language").val());
    AjaxCargarPath();
    document.title = _dictionary.lblListadoEmbarque[$("#language").data("kendoDropDownList").value()];
};


function CargarGrid() {

    $("#grid").kendoGrid({
        autoBind: true,
        dataSource: {
            data: [],
            schema: {
                model: {
                    fields: {
                        Folio: { type: "string", editable: false },
                        Plana: { type: "string", editable: false },
                        NombreProyecto: { type: "string", editable: false },
                        PapelesCliente: {  editable: false },
                        paplelesAduana: { editable: false },
                        FolioSolicitarPermisos: { editable: false },
                        FolioAprobadoAduana: { editable: false },
                        FolioAprobadoCliente: { editable: false },
                        Enviar: {editable: false}
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
            { field: "Folio", title: _dictionary.ListadoEmbarqueHeaderEmbarque[$("#language").data("kendoDropDownList").value()], filterable: true, width: "140px" },
            { field: "Plana", title: _dictionary.ListadoEmbarqueHeaderPlana[$("#language").data("kendoDropDownList").value()], filterable: true, width: "140px" },
            { field: "NombreProyecto", title: _dictionary.ListadoEmbarqueHeaderProyecto[$("#language").data("kendoDropDownList").value()], filterable: true, width: "140px" },
            { field: "PapelesCliente", title: _dictionary.ListadoEmbarqueHeaderPapelesCliente[$("#language").data("kendoDropDownList").value()], filterable: true, template: "<button  type='button' class='btn btn-blue imprimirPapelesCliente'> <span>" + _dictionary.ListadoEmbarqueBotonImprimir[$("#language").data("kendoDropDownList").value()] + "</span></button>", width: "125px" },
            { field: "paplelesAduana", title: _dictionary.ListadoEmbarqueHeaderPapelesAduana[$("#language").data("kendoDropDownList").value()], filterable: true, template: "<button  type='button' class='btn btn-blue imprimirPapelesAduana' Style='display: #= RequierePermisoAduana == 0 ? 'none;' : 'block;' #' > <span>" + _dictionary.ListadoEmbarqueBotonImprimir[$("#language").data("kendoDropDownList").value()] + "</span></button>", width: "125px" },
            { field: "FolioSolicitarPermisos", title: _dictionary.ListadoEmbarqueHeaderSolicitarPermisos[$("#language").data("kendoDropDownList").value()], filterable: true, template: "<button  type='button' class='btn btn-blue botonFolio' Style='display: #= FolioSolicitarPermisos!='' || RequierePermisoAduana == 0 ? 'none;' : 'block;' #'> <span>" + _dictionary.ListadoEmbarqueBotonCapturar[$("#language").data("kendoDropDownList").value()] + "</span></button><span>#= FolioSolicitarPermisos #</span>", width: "125px" },
            { field: "FolioAprobadoAduana", title: _dictionary.ListadoEmbarqueHeaderAprobadoAduana[$("#language").data("kendoDropDownList").value()], filterable: true, template: "<button  type='button' class='btn btn-blue botonFolio' Style='display: #= FolioAprobadoAduana!='' || RequierePermisoAduana == 0 ? 'none;' : 'block;' #' > <span>" + _dictionary.ListadoEmbarqueBotonCapturar[$("#language").data("kendoDropDownList").value()] + "</span></button><span>#= FolioAprobadoAduana #</span>", width: "150px" },
            { field: "FolioAprobadoCliente", title: _dictionary.ListadoEmbarqueHeaderAprobadoCliente[$("#language").data("kendoDropDownList").value()], filterable: true, template: "<button  type='button' class='btn btn-blue botonFolio' Style='display: #= FolioAprobadoCliente!=''  ? 'none;' : 'block;' #'> <span>" + _dictionary.ListadoEmbarqueBotonCapturar[$("#language").data("kendoDropDownList").value()] + "</span></button><span>#= FolioAprobadoCliente #</span>", width: "140px" },
            { field: "Enviar", title: " ", filterable: true, template: "<button  type='button' class='btn btn-blue botonEnviar' Style='display: #= FechaEnvio!=''  ? 'none;' : 'block;' #' > <span>" + _dictionary.ListadoEmbarqueBotonEnviar[$("#language").data("kendoDropDownList").value()] + "</span></button>", width: "125px" },
        ]
    });
    CustomisaGridPestania($("#grid"));
};

function VentanaModalFecha(dataItem) {
    ObjetoRenglon = dataItem
    var modalTitle = "";
    modalTitle = _dictionary.ValidacionResultadosRequisicion[$("#language").data("kendoDropDownList").value()];
    var window = $("#windowFecha");
    var win = window.kendoWindow({
        modal: true,
        title: modalTitle,
        resizable: false,
        visible: true,
        width: "400px",
        minWidth: 30,
        position: {
            top: "1%",
            left: "1%"
        },
        actions: [
            "Pin",
            "Minimize",
            "Maximize",
            "Close"
        ],
    }).data("kendoWindow");
    window.data("kendoWindow").title(modalTitle);
    window.data("kendoWindow").center().open();

};


function VentanaModalFolio(dataItem,indexItem) {
    ObjetoRenglon = dataItem;
    IndiceRenglon = indexItem;
    var modalTitle = "";
    modalTitle = "";
    var window = $("#windowFolio");
    var win = window.kendoWindow({
        modal: true,
        title: modalTitle,
        resizable: false,
        visible: true,
        width: "300px",
        minWidth: 30,
        position: {
            top: "1%",
            left: "1%"
        },
        actions: [
            "Pin",
            "Minimize",
            "Maximize",
            "Close"
        ],
    }).data("kendoWindow");
    window.data("kendoWindow").title(modalTitle);
    window.data("kendoWindow").center().open();

};

function AltaFecha() {
    endRangeDate = $("#Fecha").kendoDatePicker({
        value: new Date()
    });
}