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
            
        }
        else {
            $("#nEnviados").text(array.length);
            
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

        

                    CapturaListadoEmbarque[0].Lista = ListaDetalles;

                    loadingStart();
                    $ListadoEmbarque.ListadoEmbarque.create(CapturaListadoEmbarque[0], { token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
                        loadingStop();
                        displayMessage("EmbarqueMensajeGuardadoExitoso", "", "0");
                    });

                 
}


function AjaxImprimir(){
    SolicitarImpresion(reportePath.replace('?1', $("#language").val()).replace('?2', reporteID));
}

function SolicitarImpresion(url) {
    window.open(url, "_blank");
};