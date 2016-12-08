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
            data: [{
                Accion:2,
                Embarque: "Emb-3",
                Plana: "PLN12",
                Proyecto: "ETILENO XXI",
                DestinoEmbarque: "Patio Veracruz",
                PapelesCliente: "Imprimir",
                PapelesAduana: "Imprimir",
                RequierePermisoAduana: 1,
                FolioSolicitarPermisos:"F3456-35",
                FechaSolicitarPermisos: "01/11/2016",
                AprobadoCliente: false,
                AprobadoAduana: false,
                OkEmbarque: false,
                Enviar: false,
                FechaEnvio: ""
            }],
            schema: {
                model: {
                    fields: {
                        Embarque: { type: "string", editable: false },
                        Plana: { type: "string", editable: false },
                        Proyecto: { type: "string", editable: false },
                        DestinoEmbarque: { type: "string", editable: false },
                        PapelesCliente: { editable: false },
                        PapelesAduana: { editable: false },
                        FolioSolicitarPermisos: { type: "string", editable: false },
                        FechaSolicitarPermisos: { type: "date", editable: false },
                        AprobadoCliente: { type: "boolean", editable: false },
                        AprobadoAduana: { type: "boolean", editable: false },
                        OkEmbarque: { type: "boolean", editable: false },
                        Enviar: { editable: false }
                    }
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
            { field: "Embarque", title: "Embarque", filterable: getGridFilterableCellMaftec(), width: "130px" },
            { field: "Proyecto", title: "Proyecto", filterable: getGridFilterableCellMaftec(), width: "130px" },
            { field: "Plana", title: "Plana", filterable: getGridFilterableCellMaftec(), width: "130px" },
            { field: "DestinoEmbarque", title: "Destino Emb", filterable: getGridFilterableCellMaftec(), width: "145px" },
            { field: "PapelesCliente", title: "Pap cliente",filterable: false, template: "<button  type='button' class='btn btn-blue imprimirPapelesCliente'> <span>" + "Imprimir" + "</span></button>", width: "140px" },
            { field: "PapelesAduana", title: "Pap aduana", filterable: false, template: "<button  type='button' class='btn btn-blue imprimirPapelesAduana' Style='display: #= RequierePermisoAduana == 0 ? 'none;' : 'block;' #' > <span>" + "Imprimir" + "</span></button>", width: "140px" },
            { field: "FolioSolicitarPermisos", title: "Sol. permiso", filterable: getGridFilterableCellMaftec(), template: "<button  type='button' class='btn btn-blue botonFolio' Style='display: #= FolioSolicitarPermisos!='' || RequierePermisoAduana == 0 ? 'none;' : 'block;' #'> <span>" + "Capturar" + "</span></button><span>#= FolioSolicitarPermisos #</span>", width: "140px" },
            { field: "FechaSolicitarPermisos", title: "Fecha permiso", filterable: getKendoGridFilterableDateMaftec(), format: _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()], width: "150px" },
            {
                field: "AprobadoCliente", title: "Ap. cliente", filterable: {
                    multi: true,
                    messages: {
                        isTrue: _dictionary.lblVerdadero[$("#language").data("kendoDropDownList").value()],
                        isFalse: _dictionary.lblFalso[$("#language").data("kendoDropDownList").value()],
                        style: "max-width:100px;"
                    },
                    dataSource: [{ AprobadoCliente: true }, { AprobadoCliente: false }]
                }, template: '<input type="checkbox" #= AprobadoCliente ? "checked=checked" : "" # class="chkbx" ></input>', width: "130px", attributes: { style: "text-align:center;" }
            },
            {
                field: "AprobadoAduana", title: "Ap. aduana", filterable: {
                    multi: true,
                    messages: {
                        isTrue: _dictionary.lblVerdadero[$("#language").data("kendoDropDownList").value()],
                        isFalse: _dictionary.lblFalso[$("#language").data("kendoDropDownList").value()],
                        style: "max-width:100px;"
                    },
                    dataSource: [{ AprobadoAduana: true }, { AprobadoAduana: false }]
                }, template: '<input type="checkbox" #= AprobadoAduana ? "checked=checked" : "" # class="chkbx" ></input>', width: "130px", attributes: { style: "text-align:center;" }
            },
            {
                field: "OkEmbarque", title: "Ok Emb", filterable: {
                    multi: true,
                    messages: {
                        isTrue: _dictionary.lblVerdadero[$("#language").data("kendoDropDownList").value()],
                        isFalse: _dictionary.lblFalso[$("#language").data("kendoDropDownList").value()],
                        style: "max-width:100px;"
                    },
                    dataSource: [{ OkEmbarque: true }, { OkEmbarque: false }]
                }, template: '<input type="checkbox" #= OkEmbarque ? "checked=checked" : "" # class="chkbx" ></input>', width: "130px", attributes: { style: "text-align:center;" }
            },
            { field: "Enviar", title: "Enviar", filterable: false, template: "<button  type='button' class='btn btn-blue botonEnviar' Style='display: #= FechaEnvio!=''  ? 'none;' : 'block;' #' > <span>" + "Enviar" + "</span></button>", width: "115px" },
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