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
    $Embarque.Embarque.read({ token: Cookies.get("token"), TransportistaID: transportistaID, Plana: "Plana" }).done(function (data) {
        $("#Plana").data("kendoComboBox").value("");
        $("#Plana").data("kendoComboBox").dataSource.data(data);
        loadingStop();
    });
}


function AjaxCargarDatos(embarqueID) {
    loadingStart();
    $Embarque.Embarque.read({ token: Cookies.get("token"), EmbarqueID: embarqueID, lenguaje: $("#language").val() }).done(function (data) {
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
        var accionPlanaID2, planaID3, planaID4, planaID1, planaID2;
        var embarqueID = $('#embarqueID').val();
        var TractoID = $("#Tracto").data("kendoComboBox").value();
        var ChoferID = $("#Chofer").data("kendoComboBox").value();
        var accionPlanaID1 = arregloCaptura[0].Accion;
        
         planaID1 = arregloCaptura[0].PlanaID;
         planaID2 = arregloCaptura[1].PlanaID;
        if (arregloCaptura[1].Accion) {
            accionPlanaID2 = arregloCaptura[1].Accion;
        }

        planaID3 = "0";
        planaID4 = "0";

        loadingStart();
        alert("moco");
        $Embarque.Embarque.create({
            EmbarqueID: embarqueID, TractoID: TractoID, ChoferID: ChoferID, AccionPlanaID1AccionPlanaID1: accionPlanaID1,
            AccionPlanaID2: accionPlanaID2, PlanaID1: planaID1, PlanaID2: planaID2, PlanaID3: planaID3, PlanaID4: planaID4, token: Cookies.get("token")
        }).done(function (data) {
            loadingStop();
            displayMessage("EmbarqueMarcadoMensajeGuardadoExitoso", "", "0");
        });

    }
    else {
        displayMessage("", "Debe tener al menos un renglon", "1");
    }
}