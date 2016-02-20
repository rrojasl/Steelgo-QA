function AjaxCargarProveedor() {
    loadingStart();
    $Embarque.Embarque.read({ token: Cookies.get("token"), embarquePlanaID: 0 }).done(function (data) {
        $("#Proveedor").data("kendoComboBox").value("");
        $("#Proveedor").data("kendoComboBox").dataSource.data(data);
        if ($('#embarqueID').val() != 0 ) {
            AjaxCargarDatos($('#embarqueID').val());
        }
        loadingStop();
    });

}

function AjaxCargarDestino(proyectoID) {
    loadingStart();
    $Embarque.Embarque.read({ token: Cookies.get("token"), ProyectoID: proyectoID }).done(function (data) {
        $("#Destino").data("kendoComboBox").value("");
        $("#Destino").data("kendoComboBox").dataSource.data(data);
        loadingStop();
        if (DestinoGuardado != 0) {
            $("#Destino").data("kendoComboBox").value(DestinoGuardado);
        }
    });
}

function AjaxCargarTracto(transportistaID) {
    loadingStart();
    $Embarque.Embarque.read({ token: Cookies.get("token"), TransportistaID: transportistaID, Tracto: "Tracto" }).done(function (data) {
        $("#Tracto").data("kendoComboBox").value("");
        $("#Tracto").data("kendoComboBox").dataSource.data(data);
        if ($('#embarqueID').val() != 0 && bandera == true) {
            $("#Tracto").data("kendoComboBox").value(tractoEmb);
            $("#Tracto").data("kendoComboBox").trigger("change");
        }
        loadingStop();
    });
}

function AjaxCargarChofer(vehiculoID) {
    loadingStart();
    $Embarque.Embarque.read({ token: Cookies.get("token"), VehiculoID: vehiculoID }).done(function (data) {
        $("#Chofer").data("kendoComboBox").value("");
        $("#Chofer").data("kendoComboBox").dataSource.data(data);
        if ($('#embarqueID').val() != 0 && bandera == true) {
            $("#Chofer").data("kendoComboBox").value(choferEmb);
            $("#Chofer").data("kendoComboBox").trigger("change");
            bandera = false;
        }
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
    $Embarque.Embarque.read({ token: Cookies.get("token"), EmbarqueID: embarqueID, lenguaje: $("#language").val() }).done(function (data) {
        $("#grid").data('kendoGrid').dataSource.data([]);
        var ds = $("#grid").data("kendoGrid").dataSource;
        var array = data;
        
        if (array.length != 0) {
            EmbarqueID = data[0].EmbarqueID;
            transportistaEmb = data[0].TransportistaID;
            choferEmb = data[0].ChoferID;
            tractoEmb = data[0].TractoID;
            bandera = true;
            $("#Proveedor").data("kendoComboBox").value(transportistaEmb);
            $("#Proveedor").data("kendoComboBox").trigger("change");
        }
        
            for (var i = 0; i < array.length; i++) {
                ds.add(array[i]);
            }
        loadingStop();
    });
}

function AjaxCargarDatosChofer(vehiculoID, choferID) {
    loadingStart();
    $Embarque.Embarque.read({ token: Cookies.get("token"), vehiculoID: vehiculoID,choferID: choferID, lenguaje: $("#language").val() }).done(function (data) {
        $("#grid").data('kendoGrid').dataSource.data([]);
        var ds = $("#grid").data("kendoGrid").dataSource;
        var array = data;
        if (data.length > 0) {
            EmbarqueID = data[0].EmbarqueID;
            AjaxCargarDestino(data[0].ProyectoID);
            for (var i = 0; i < array.length; i++) {
                ds.add(array[i]);
            }
            DestinoGuardado =  data[0].DestinoID;
        }
        else {
            EmbarqueID = 0;
            DestinoGuardado = 0;
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
            destinoID: "",
            accionPlanaID1: "",
            accionPlanaID2: "",
            planaID1: "",
            planaID2: "",
            planaID3: "",
            planaID4: ""
        };
        
        ListaDetalles[0].embarqueID = 0;
        ListaDetalles[0].tractoID = parseInt($("#Tracto").data("kendoComboBox").value());
        ListaDetalles[0].choferID = parseInt($("#Chofer").data("kendoComboBox").value());
        ListaDetalles[0].destinoID = parseInt($("#Destino").data("kendoComboBox").value());
        ListaDetalles[0].accionPlanaID1 = 0;
        ListaDetalles[0].accionPlanaID2 = 0;
        ListaDetalles[0].planaID1 = 0;
        ListaDetalles[0].planaID2 = 0;
        ListaDetalles[0].planaID3 = 0;
        ListaDetalles[0].planaID4 = 0;
        
        var cont = 0, contEliminar = 0;
        for (var i = 0 ; i < arregloCaptura.length; i++) {
            ListaDetalles[0].embarqueID = EmbarqueID;
            if (arregloCaptura[i].Accion != 2 && cont == 0) {
                ListaDetalles[0].accionPlanaID1 = arregloCaptura[i].Accion;
                ListaDetalles[0].planaID1 = parseInt(arregloCaptura[i].PlanaID);
                
                cont++;
            }
            else if (arregloCaptura[i].Accion != 2 && cont == 1) {
                ListaDetalles[0].accionPlanaID2 = arregloCaptura[i].Accion;
                ListaDetalles[0].planaID2 = parseInt(arregloCaptura[i].PlanaID);
                cont++;
            }
            else if (arregloCaptura[i].Accion == 2 && contEliminar == 0) {
                ListaDetalles[0].planaID3 = parseInt(arregloCaptura[i].PlanaID);
                contEliminar++;
            }
            else if (arregloCaptura[i].Accion == 2 && contEliminar == 1) {
                ListaDetalles[0].planaID4 = parseInt(arregloCaptura[i].PlanaID);
                contEliminar++;
            }
        }

        CapturaEmbarque[0].Lista = ListaDetalles;

        loadingStart();
        $Embarque.Embarque.create(CapturaEmbarque[0], { token: Cookies.get("token")}).done(function (data) {
            if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "Ok") {
                displayMessage("EmbarqueMensajeGuardadoExitoso", "", "0");
                AjaxCargarDatosChofer($("#Tracto").data("kendoComboBox").value(), $("#Chofer").data("kendoComboBox").value());
                $("#Plana").data("kendoComboBox").value("");
            }
            else if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] != "Ok") {
                mensaje = "No se guardo la informacion el error es: " + data.ReturnMessage[0] + "-2"
                displayMessage("CapturaMensajeGuardadoErroneo", "", '1');
                opcionHabilitarView(false, "FieldSetView");
                
                $("#Plana").data("kendoComboBox").setDataSource([]);
            }
            loadingStop();
        });

    }
    else {
        displayMessage("EmbarqueMensajeAgregaPlanas", "", "1");
        opcionHabilitarView(false, "FieldSetView");
    }
}