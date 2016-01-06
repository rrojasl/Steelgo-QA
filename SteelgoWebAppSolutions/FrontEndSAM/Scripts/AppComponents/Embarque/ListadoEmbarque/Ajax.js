function AjaxCargarListadoEmbarque(Todos,Lenguaje) {
    loadingStart();
    $ListadoEmbarque.ListadoEmbarque.read({ token: Cookies.get("token"), todos: Todos, lenguaje: Lenguaje }).done(function (data) {
        $("#grid").data('kendoGrid').dataSource.data([]);
        var ds = $("#grid").data("kendoGrid").dataSource;
        var array = data;
        for (var i = 0; i < array.length; i++) {
            ds.add(array[i]);
        }
        if (Todos == "todos"){
            $("#nTodos").text(array.length);
            $("#nEnviados").text("0");
        }
        else {
            $("#nEnviados").text(array.length);
            $("#nTodos").text("0");
        }
        loadingStop();
    });
}


function AjaxCargarPath() {
    $ListadoEmbarque.ListadoEmbarque.read({ token: Cookies.get("token")}).done(function (data) {
        reportePath = data[0].ReportePath;
        reporteID = data[0].TipoReporteID;
        loadingStop();
    });
}

function AjaxGuardarPlanas(ObjetoRenglon) {
    
        CapturaListadoEmbarque = [];
        CapturaListadoEmbarque[0] = { Lista: "" };
        ListaDetalles = [];

        ListaDetalles[0] = {
            EmbarquePlanaID: "",
            FolioSolicitarPermisos: "",
            FolioAprobadoAduana: "",
            FolioAprobadoCliente: "",
            FechaEnvio: ""
        };

        ListaDetalles[0].EmbarquePlanaID = ObjetoRenglon.EmbarquePlanaID;
        ListaDetalles[0].FolioSolicitarPermisos = ObjetoRenglon.FolioSolicitarPermisos;
        ListaDetalles[0].FolioAprobadoAduana = ObjetoRenglon.FolioAprobadoAduana;
        ListaDetalles[0].FolioAprobadoCliente = ObjetoRenglon.FolioAprobadoCliente;
        ListaDetalles[0].FechaEnvio = ObjetoRenglon.FechaEnvio;

        if (ListaDetalles[0].FolioAprobadoCliente != ""){
            if (ListaDetalles[0].FolioSolicitarPermisos != "") {
                if (ListaDetalles[0].FolioSolicitarPermisos != "") {

                    CapturaListadoEmbarque[0].Lista = ListaDetalles;

                    loadingStart();
                    $ListadoEmbarque.ListadoEmbarque.create(CapturaListadoEmbarque[0], { token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
                        loadingStop();
                        displayMessage("EmbarqueMensajeGuardadoExitoso", "", "0");
                    });

                }
                else {
                    displayMessage("", "Falta el folio de aprobacion de aduana", "1");
                }
            }
            else {
                displayMessage("", "Falta el folio de solicitud de permisos", "1");
            }
        }
        else {
            displayMessage("", "Falta el folio de aprobacion por el cliente", "1");
        }        
}


function AjaxImprimir(){
    SolicitarImpresion(reportePath.replace('?1', $("#language").val()).replace('?2', reporteID));
}

function SolicitarImpresion(url) {
    window.open(url, "_blank");
};