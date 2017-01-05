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
    AjaxCargarCamposPredeterminados();
    document.title = "Listado Embarque";
};


function CargarGrid() {

    $("#grid").kendoGrid({
        autoBind: true,
        dataSource: {
            schema: {
                model: {
                    fields: {
                        Embarque: { type: "string", editable: false },
                        Planas: { type: "string", editable: false },
                        Proyecto: { type: "string", editable: false },
                        Destino: { type: "string", editable: true },
                        PapelesCliente: { type: "boolean", editable: false },
                        PapelesAduana: { type: "boolean", editable: false },
                        FolioSolicitudPermiso: { type: "string", editable: true },
                        FechaSolicitudPermiso: { type: "date", editable: true },
                        AprobadoClienteDesc: { type: "string", editable: true },
                        AprobadoAduanaDesc: { type: "string", editable: true },
                        OkEmbarque: { type: "boolean", editable: false },
                        RequierePermisoAduana: { type: "boolean", editable: false },
                        RequierePapCliente: { type: "boolean", editable: false },
                        Enviar: { type: "boolean", editable: false }
                    }
                }
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
        pageable: {
            refresh: false,
            pageSizes: [10, 25, 50, 100],
            info: false,
            input: false,
            numeric: true,
        },
        filterable: getGridFilterableMaftec(),
        columns: [
            { field: "Embarque", title: _dictionary.columnEmbarque[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "130px" },
            { field: "Proyecto", title: _dictionary.columnProyecto[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "130px" },
            { field: "Planas", title: _dictionary.columnPlanasEmb[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "130px" },
            { field: "Destino", title: _dictionary.columnDestinoEmb[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), editor: RenderComboBoxDestino, width: "145px" },
            { field: "PapelesCliente", title: _dictionary.columnPapCliente[$("#language").data("kendoDropDownList").value()], filterable: false, template: "<button  type='button' class='btn btn-blue imprimirPapelesCliente' Style='display: #= RequierePermisoAduana ==true ? 'block;' : 'none;' #'> <span>" + "Imprimir" + "</span></button>", width: "140px" },
            { field: "PapelesAduana", title: _dictionary.columnPapAduana[$("#language").data("kendoDropDownList").value()], filterable: false, template: "<button  type='button' class='btn btn-blue imprimirPapelesAduana' Style='display: #= RequierePermisoAduana==true ?  'block;' : 'none;' #' > <span>" + "Imprimir" + "</span></button>", width: "140px" },
            { field: "FolioSolicitudPermiso", title: _dictionary.columnSolicitudPermiso[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "140px" },
            { field: "FechaSolicitudPermiso", title: _dictionary.columnFechaPermiso[$("#language").data("kendoDropDownList").value()], filterable: getKendoGridFilterableDateMaftec(), editor: RenderDatePicker, format: _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()], width: "150px" },
            { field: "AprobadoClienteDesc", title: _dictionary.columnAprobadoCliente[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), editor: RenderComboBoxAprobacionCliente, width: "130px" },
            { field: "AprobadoAduanaDesc", title: _dictionary.columnAprobadoAduana[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), editor: RenderComboBoxAprobacionAduana, width: "130px" },
            {
                field: "OkEmbarque", title: _dictionary.columnOkEmbarque[$("#language").data("kendoDropDownList").value()], filterable: {
                    multi: true,
                    messages: {
                        isTrue: _dictionary.lblVerdadero[$("#language").data("kendoDropDownList").value()],
                        isFalse: _dictionary.lblFalso[$("#language").data("kendoDropDownList").value()],
                        style: "max-width:100px;"
                    },
                    dataSource: [{ OkEmbarque: true }, { OkEmbarque: false }]
                }, template: '<input type="checkbox" #= OkEmbarque ? "checked=checked" : "" # class="chkbx" ></input>', width: "130px", attributes: { style: "text-align:center;" }
            },
            { field: "Enviar", title: " ", filterable: false, template: "<button  type='button' class='btn btn-blue botonEnviar' Style='display: #= Enviar == true ?'block;' : 'none;' #' ><span>Enviar</span></button>", width: "115px" },
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

function SetValueEnviar(obj) {
    var retorno = false;
    if (obj != undefined) {
        if (obj.AprobadoCliente == 1 && obj.AprobadoAduana == 1 && obj.OkEmbarque)
            retorno = true;
    }

    return retorno;
}