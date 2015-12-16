function AjaxCargarProveedor() {
    loadingStart();
    $Embarque.Embarque.read({ token: Cookies.get("token") }).done(function (data) {
        $("#Proveedor").data("kendoComboBox").value("");
        $("#Proveedor").data("kendoComboBox").dataSource.data(data);
        loadingStop();
    });

}

function AjaxCargarTracto(transportistaID) {
    loadingStart();
    $Embarque.Embarque.read({ token: Cookies.get("token"), TransportistaID: transportistaID, Tracto: "Tracto" }).done(function (data) {
        $("#Tracto").data("kendoComboBox").value("");
        $("#Tracto").data("kendoComboBox").dataSource.data(data);
        loadingStop();
    });
}

function AjaxCargarChofer(vehiculoID) {
    loadingStart();
    $Embarque.Embarque.read({ token: Cookies.get("token"), VehiculoID: vehiculoID }).done(function (data) {
        $("#Chofer").data("kendoComboBox").value("");
        $("#Chofer").data("kendoComboBox").dataSource.data(data);
        loadingStop();
    });
}

function AjaxCargarPlana(transportistaID) {
    loadingStart();
    $Embarque.Embarque.read({ token: Cookies.get("token"), TransportistaID: transportistaID }).done(function (data) {
        $("#Plana").data("kendoComboBox").value("");
        $("#Plana").data("kendoComboBox").dataSource.data(data);
        loadingStop();
    });
}


function AjaxCargarDatos(embarqueID) {
    loadingStart();
    $Embarque.Embarque.read({ token: Cookies.get("token"), EmbarqueID: parseInt(embarqueID), lenguaje: $("#language").val() }).done(function (data) {
        $("#grid").data('kendoGrid').dataSource.data([]);
        var ds = $("#grid").data("kendoGrid").dataSource;
        var array = data;
        for (var i = 0; i < array.length; i++) {
            if (array[0].Estatus != "Cerrada") {
                $("#grid").find("table th").eq(1).hide();
            }
                ds.add(array[i]);
        }
        loadingStop();
    });
}

function AjaxGuardarPlanas(arregloCaptura) {
    if (arregloCaptura.length != 0) {

        CapturaEmbarque = [];
        CapturaEmbarque[0] = { Lista: "" };
        ListaDetalles = [];

        ListaDetalles[0] = {
            
            embarqueID: "",
            tractoID: "",
            choferID: "",
            accionPlanaID1: "",
            accionPlanaID2: "",
            planaID1: "",
            planaID2: "",
            planaID3: "",
            planaID4: ""
        };


        
        ListaDetalles[0].embarqueID = parseInt($('#embarqueID').val());
        ListaDetalles[0].tractoID = parseInt($("#Tracto").data("kendoComboBox").value());
        ListaDetalles[0].choferID = parseInt($("#Chofer").data("kendoComboBox").value());
        ListaDetalles[0].accionPlanaID1 = arregloCaptura[0].Accion;
        
         
        if (arregloCaptura[1].Accion) {
            ListaDetalles[0].accionPlanaID2 = arregloCaptura[1].Accion;
        }

        ListaDetalles[0].planaID1 = parseInt(arregloCaptura[0].PlanaID);
        ListaDetalles[0].planaID2 = parseInt(arregloCaptura[1].PlanaID);
        ListaDetalles[0].planaID3 = 0;
        ListaDetalles[0].planaID4 = 0;


        CapturaEmbarque[0].Lista = ListaDetalles;

        loadingStart();
        $Embarque.Embarque.create(CapturaEmbarque[0], { token: Cookies.get("token")}).done(function (data) {
            loadingStop();
            displayMessage("EmbarqueMarcadoMensajeGuardadoExitoso", "", "0");
        });

    }
    else {
        displayMessage("", "Debe tener al menos un renglon", "1");
    }
}