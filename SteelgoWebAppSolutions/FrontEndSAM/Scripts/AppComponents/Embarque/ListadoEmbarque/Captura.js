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
    //AjaxCargarListadoEmbarque('Enviados', $("#language").val());
    //AjaxCargarPath();
    document.title = "Listado Embarque";
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
                        PapelesCliente: { editable: false },
                        papelesAduana: { editable: false },
                        FolioSolicitarPermisos: { editable: false },
                        FolioAprobadoAduana: { editable: false },
                        FolioAprobadoCliente: { editable: false },
                        Enviar: { editable: false },
                        FolioPermisos: { type: "date", editable: true }}
                }
            },
            pageSize: 20,
            serverPaging: false,
            serverFiltering: false,
            serverSorting: false
        },
        navigatable: true,
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
            { field: "Folio", title: "Embarque", filterable: getGridFilterableCellMaftec(), width: "140px" },
            { field: "Proyecto", title: "Proyecto", filterable: getGridFilterableCellMaftec(), width: "140px" },
            { field: "Plana", title: "Plana", filterable: getGridFilterableCellMaftec(), width: "140px" },
            { field: "DestinoEmbarque", title: "Destino Emb.", filterable: getGridFilterableCellMaftec(), width: "140px" },
            { field: "PapelesCliente", title: "Pap cliente",filterable: false, template: "<button  type='button' class='btn btn-blue imprimirPapelesCliente'> <span>" + "Imprimir" + "</span></button>", width: "140px" },
            { field: "papelesAduana", title: "Pap aduana", filterable: false, template: "<button  type='button' class='btn btn-blue imprimirPapelesAduana' Style='display: #= RequierePermisoAduana == 0 ? 'none;' : 'block;' #' > <span>" + "Imprimir" + "</span></button>", width: "140px" },
            { field: "FolioSolicitarPermisos", title: "Sol. permiso", filterable: getGridFilterableCellMaftec(), template: "<button  type='button' class='btn btn-blue botonFolio' Style='display: #= FolioSolicitarPermisos!='' || RequierePermisoAduana == 0 ? 'none;' : 'block;' #'> <span>" + "Capturar" + "</span></button><span>#= FolioSolicitarPermisos #</span>", width: "140px" },
            { field: "FechaSolicitarPermisos", title: "Fecha permiso", filterable: { cell: { showOperators: false } }, width: "140px" },
            { field: "FolioAprobadoAduana", title: "Ap. cliente",filterable: false, template: "<button  type='button' class='btn btn-blue botonFolio' Style='display: #= FolioAprobadoAduana!='' || RequierePermisoAduana == 0 ? 'none;' : 'block;' #' > <span>" + "Capturar" + "</span></button><span>#= FolioAprobadoAduana #</span>", width: "130px" },
            { field: "FolioAprobadoCliente", title: "Ap. aduana", filterable: false, template: "<button  type='button' class='btn btn-blue botonFolio' Style='display: #= FolioAprobadoCliente!=''  ? 'none;' : 'block;' #'> <span>" + "Capturar" + "</span></button><span>#= FolioAprobadoCliente #</span>", width: "140px" },
            { field: "okEmbarque", title: "Ok embarque", filterable: false, width: "130px" },
            { field: "Enviar", title: "Enviar", filterable: false, template: "<button  type='button' class='btn btn-blue botonEnviar' Style='display: #= FechaEnvio!=''  ? 'none;' : 'block;' #' > <span>" + "Enviar" + "</span></button>", width: "125px" },
        ]
    });
    CustomisaGrid($("#grid"));
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


function VentanaModalFolio(dataItem, indexItem) {
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