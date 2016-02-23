function changeLanguageCall() {
    CargarGrid();
    $('#grid').data('kendoGrid').dataSource.read();
    AjaxObtenerStatus();
    document.title = _dictionary.ListadodeRequisicion[$("#language").data("kendoDropDownList").value()];
};

IniciarListaRequisicion();

function IniciarListaRequisicion() {
    SuscribirEventos();
};

function AgregarStatusDinamicos(listaStatus)
{
    document.getElementById('divStatusRequisiciones').innerHTML = '';
    for (var i = 0; i < listaStatus.length; i++) {
        $("#divStatusRequisiciones").append("<button onclick='ActivarRefrescarGrid(" + listaStatus[i].EstatusID + ")' id='" + listaStatus[i].EstatusID + "' class='btn btn-tabList'><span id='" + listaStatus[i].EstatusID + "'>" + listaStatus[i].Estatus + " </span><span id='" + listaStatus[i].CantidadRegistros + "'>" + listaStatus[i].CantidadRegistros + "</span></button>");
        if (i == 0)
        {
            AjaxAccionesListado(listaStatus[i].EstatusID);
            $("#" + listaStatus[i].EstatusID).addClass("active");
        }
    }
}


function CargarGrid() {


    $("#grid").kendoGrid({
        autoBind: true,
        dataSource: {
          data:null,
            schema: {
                model: {
                    fields: {
                        RequisicionID: { type: "int", editable: false },
                        Folio: { type: "string", editable: false },
                        PruebasID: { type: "int", editable: false },
                        Prueba: { type: "string", editable: false },
                        FechaRequisicion:  { type: "date", editable: false },
                        Observacion: { type: "string", editable: false },
                        EstatusID: { type: "int", editable: false },
                        Estatus: { type: "string", editable: false },
                        Orden: { type: "bool", editable: false }
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
            { field: "Folio", title: _dictionary.ListaRequisicionFolio[$("#language").data("kendoDropDownList").value()], filterable: true },
            { field: "Prueba", title: _dictionary.ListaRequisicionPrueba[$("#language").data("kendoDropDownList").value()], filterable: true },
            { field: "FechaRequisicion", title: _dictionary.ListaRequisicionFecha[$("#language").data("kendoDropDownList").value()], filterable: true, format: _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()]  },
            { field: "Observacion", title: _dictionary.ListaRequisicionObservacion[$("#language").data("kendoDropDownList").value()], filterable: true },
            { command: { text: _dictionary.botonDetalle[$("#language").data("kendoDropDownList").value()], click: VerDetalle }, title: _dictionary.ListaRequisicionVerDetalle[$("#language").data("kendoDropDownList").value()], width: "99px" }
        ]
    });
    CustomisaGrid($("#grid"));
};

function VerDetalle(e) {
    var dataItem = $("#grid").data("kendoGrid").dataItem($(e.currentTarget).closest("tr")); 
    document.location.target = "_blank";
    document.location.href = "/serviciostecnicos/generarrequisicion?id=" + dataItem.RequisicionID;
};

function tabActivo(idButton) {
    $(".btn-tabList").removeClass("active");
    var list = document.getElementById("divStatusRequisiciones").getElementsByTagName("button");

    for (var i = 0; i < list.length; i++) {
        if (list[i].id == idButton)
        {
            $("#" + idButton).addClass("active");
            break;
        }
    }
};


