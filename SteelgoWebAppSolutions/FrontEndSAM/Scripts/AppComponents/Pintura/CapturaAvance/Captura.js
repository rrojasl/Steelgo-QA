var endRangeDate;
var endRangeDate2;
var plantillaShotblastero = "";
var plantillaPintor = "";
var currentDataItemGridDownload;
var win;
IniciarCapturaArmado();
function IniciarCapturaArmado() {
    AltaFecha();
}

function changeLanguageCall() {
    CargarGrid();
    AjaxCargarCamposPredeterminados();
    AjaxCargarCarrosCargados();
    AjaxCargarPintor();
    AjaxCargarShotBlastero();
    AjaxCargarCuadrante(0);
};


function AltaFecha() {
    endRangeDate = $("#FechaShotBlast").kendoDatePicker({
        max: new Date()
    });
    endRangeDate2 = $("#Fechaprimario").kendoDatePicker({
        max: new Date()
    });
}

function CargarGrid() {
    $("#grid").kendoGrid({
        autoBind: true,
        dataSource: {
            data: [],
            schema: {
                model: {
                    fields: {
                        Spool: { type: "string", editable: false },
                        SistemaPintura: { type: "string", editable: false },
                        Metros2: { type: "string", editable: false },
                        Peso: { type: "string", editable: false },
                        Color: { type: "string", editable: false },
                        
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
            { field: "Spool", title: _dictionary.CapturaAvanceSpool[$("#language").data("kendoDropDownList").value()], filterable: true },
            { field: "SistemaPintura", title: _dictionary.CapturaAvanceSistemaPintura[$("#language").data("kendoDropDownList").value()], filterable: true },
            { field: "Color", title: _dictionary.CapturaAvanceColor[$("#language").data("kendoDropDownList").value()], filterable: true },
            { field: "Metros2", title: _dictionary.CapturaAvanceM2[$("#language").data("kendoDropDownList").value()], filterable: true },
            { field: "ListaShotblasteroGuargado", title: _dictionary.CapturaAvanceShotBlastero[$("#language").data("kendoDropDownList").value()], filterable: true, editor: RendercomboBoxShotBlastero, template: "#:plantillaShotblastero#" },
            { field: "ListaPintorGuargado", title: _dictionary.CapturaAvancePintor[$("#language").data("kendoDropDownList").value()], filterable: true, editor: RendercomboBoxPintor, template: "#:plantillaPintor#" },
             { command: { text: "Descarga", click: VentanaModalDescargarMedioTransporte }, title: _dictionary.CapturaAvanceDescargar[$("#language").data("kendoDropDownList").value()] }

        ]
    });
};





function VentanaModalDescargarMedioTransporte(e) {
    e.preventDefault();

     currentDataItemGridDownload = this.dataItem($(e.currentTarget).closest("tr"));

    var modalTitle = "";
    modalTitle = _dictionary.CapturaAvanceCuadrante[$("#language").data("kendoDropDownList").value()];
    
     win = $("#windowDownload").kendoWindow({
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
            "Close"
        ],
    }).data("kendoWindow");
    
     $("#windowDownload").data("kendoWindow").center().open();

};


function PlancharPintor(arregloCaptura) {
    ListaPintorGuargado = [];
    var dataPintor = $("#inputPintor").data("kendoMultiSelect")._dataItems;
    for (var i = 0; i < dataPintor.length; i++) {
        ListaPintorGuargado[i] = {
            Accion: "",
            PinturaSpoolObreroID: "",
            ObreroID: "",
            Codigo: ""
        };
        ListaPintorGuargado[i].Accion = 1;
        ListaPintorGuargado[i].PinturaSpoolObreroID = dataPintor[i].PinturaSpoolObreroID;
        ListaPintorGuargado[i].ObreroID = dataPintor[i].ObreroID;
        ListaPintorGuargado[i].Codigo = dataPintor[i].Codigo;
    }


    if (dataPintor.length > 0) {
        for (var i = 0; i < arregloCaptura.length; i++) {
            arregloCaptura[i].ListaPintorGuargado = dataPintor;
        }
        $("#grid").data("kendoGrid").dataSource.sync();
    }

}



function PlancharShotBlastero(arregloCaptura) {
    ListaShotblasteroGuargado = [];
    var dataShotBlast = $("#inputShotBlastero").data("kendoMultiSelect")._dataItems;
    for (var i = 0; i < dataShotBlast.length; i++) {
        ListaShotblasteroGuargado[i] = {
            Accion: "",
            PinturaSpoolObreroID: "",
            ObreroID: "",
            Codigo: ""
        };
        ListaShotblasteroGuargado[i].Accion = 1;
        ListaShotblasteroGuargado[i].PinturaSpoolObreroID = dataShotBlast[i].PinturaSpoolObreroID;
        ListaShotblasteroGuargado[i].ObreroID = dataShotBlast[i].ObreroID;
        ListaShotblasteroGuargado[i].Codigo = dataShotBlast[i].Codigo;
    }

    if (dataShotBlast.length > 0) {
        
        for (var i = 0; i < arregloCaptura.length; i++) {
            
            arregloCaptura[i].ListaShotblasteroGuargado = dataShotBlast;
        }
        $("#grid").data("kendoGrid").dataSource.sync();
    }

 
}