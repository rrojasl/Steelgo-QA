function changeLanguageCall() {
    CargarGrid();
};


function CargarGrid() {
    $("#grid").kendoGrid({
        autoBind: true,
        dataSource: {
            data: [],
            schema: {
                model: {
                    fields: {
                        EmbarqueID: { type: "string", editable: false },
                        Plana: { type: "string", editable: false },
                        Proyecto: { type: "string", editable: false },
                        PapelesCliente: {  editable: false },
                        paplelesAduana: { editable: false },
                        FolioSolicitarPermisos: { editable: false },
                        FolioAprobadoAduana: { editable: false },
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
            { field: "EmbarqueID", title: "Embarque", filterable: true, width:"125px" },
            { field: "Plana", title: "Plana", filterable: true, width: "100px" },
            { field: "Proyecto", title: "Proyecto", filterable: true, width: "125px" },
            { field: "PapelesCliente", title: "Papeles cliente", filterable: true, template: "<button  type='button' class='btn btn-blue'> <span>Imprimir</span></button>", width: "125px" },
            { field: "paplelesAduana", title: "Papeles aduana", filterable: true, template: "<button  type='button' class='btn btn-blue'> <span>Imprimir</span></button>", width: "125px" },
            { field: "FolioSolicitarPermisos", title: "Solicitar permisos", filterable: true, template: "<button  type='button' class='btn btn-blue botonFolio'> <span>Capturar</span></button>", width: "125px" },
            { field: "FolioAprobadoAduana", title: "Aprobado cliente", filterable: true, template: "<button  type='button' class='btn btn-blue botonFolio'> <span>Capturar</span></button>", width: "125px" },
            { field: "", title: " ", filterable: true, template: "<button  type='button' class='btn btn-blue botonEnviar'> <span>Enviar</span></button>", width: "125px" },
        ]
    });
};

function VentanaModalFecha() {

    var modalTitle = "";
    modalTitle = _dictionary.ValidacionResultadosRequisicion[$("#language").data("kendoDropDownList").value()];
    var window = $("#windowFecha");
    var win = window.kendoWindow({
        modal: true,
        title: modalTitle,
        resizable: false,
        visible: true,
        width: "50%",
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


function VentanaModalFolio() {

    var modalTitle = "";
    modalTitle = "Ingresar Folio";
    var window = $("#windowFolio");
    var win = window.kendoWindow({
        modal: true,
        title: modalTitle,
        resizable: false,
        visible: true,
        width: "50%",
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