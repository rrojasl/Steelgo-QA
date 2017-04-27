﻿function AjaxCargarCamposPredeterminados() {
    $CamposPredeterminados.CamposPredeterminados.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), id: 5075 }).done(function (data) {
        if (data == "Todos") {
            $('input:radio[name=LLena]:nth(1)').trigger("click");
        }
        else if (data == "vacios") {
            $('input:radio[name=LLena]:nth(0)').trigger("click");
        }
        loadingStop();
    });
    AjaxCargarCarrosCargadosPorProceso(0);//el cliente no especifico si es por proceso de pintura por eso se pone el cero.
    AjaxCargarZona();//se cargan las zonas por usuario
};

function AjaxCargarCarrosCargadosPorProceso(idProceso) {
    loadingStart();
    $CapturaAvance.CapturaAvance.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), procesoID: idProceso }).done(function (data) {
        if (Error(data)) {
            if (data.length > 0) {
                var medioTranporteId = 0;
                $("#inputCarro").data("kendoComboBox").value("");
                $("#inputCarro").data("kendoComboBox").dataSource.data([]);
                $("#inputCarro").data("kendoComboBox").dataSource.data(data);


                var carroID = getParameterByName('carroID');

                if (carroID == null) {
                    if (data.length < 3) {
                        for (var i = 0; i < data.length; i++) {
                            if (data[i].MedioTransporteID != 0) {
                                medioTranporteId = data[i].MedioTransporteID;
                            }
                        }
                        $("#inputCarro").data("kendoComboBox").value(medioTranporteId);
                        $("#inputCarro").data("kendoComboBox").trigger("change");
                      
                    }
                } else {
                    $("#inputCarro").data("kendoComboBox").value(carroID);
                    SiguienteProceso(carroID);
                    $("#inputCarro").data("kendoComboBox").trigger("change");
                }
             
            }
            loadingStop();
        }
    });
}

function ajaxGuardar(data,tipoGuardado,liberar) {

    Captura = [];
    Captura[0] = { Detalles: "" };
    ListaDetalles = [];
    var cerrarCarro = 1;//es uno porque por default son carros cerrados.
    var i = 0;

    for (var index = 0 ; index < data.length; index++) {
        if (data[index].Modificado)
        {
            ListaDetalles[i] = { SpoolID: "", CuadranteID: "", NombreCuadrante:"" };
            ListaDetalles[i].SpoolID = data[index].SpoolID;
            ListaDetalles[i].CuadranteID = data[index].CuadranteID;
            ListaDetalles[i].NombreCuadrante = data[index].NombreCuadrante;
            i++;
        }
    }
    var cuadranteIDCarro=  $("#inputCarro").data("kendoComboBox").dataItem($("#inputCarro").data("kendoComboBox").select()).CuadranteID;
    var estaCarroCompletamenteDescargado=true;

    for (var i = 0; i < data.length; i++) {
        if(data[i].CuadranteID==cuadranteIDCarro)
        { 
            estaCarroCompletamenteDescargado=false;
            break;
        }
    }
    //es para liberar el carro, si ya no tiene spools entonces se libera el carro.
    if (liberar) {
        if (estaCarroCompletamenteDescargado)
            cerrarCarro = 0
    }
    Captura[0].Detalles = ListaDetalles;
    if (ListaDetalles.length > 0) {
        $DescargarCarro.DescargarCarro.create(Captura[0], { token: Cookies.get("token"), lenguaje: $("#language").val(), cargaCarroID: $("#inputCarro").data("kendoComboBox").dataItem($("#inputCarro").data("kendoComboBox").select()).MedioTransporteCargaID, carroID: $("#inputCarro").data("kendoComboBox").dataItem($("#inputCarro").data("kendoComboBox").select()).MedioTransporteID, cerrarCarro: cerrarCarro }).done(function (data) {

            if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "Ok") {
                displayNotify("MensajeGuardadoExistoso", "", '0');

                if (tipoGuardado == 1) {
                    Limpiar();
                    editado = false;
                    AjaxCargarCamposPredeterminados();
                    $("#inputZona").data("kendoComboBox").select(0);
                    $("#inputZona").data("kendoComboBox").trigger("change");
                }
                else {
                    opcionHabilitarView(true, "FieldSetView");
                    
                    if (cerrarCarro == 0)//si ya no tiene spools el carro entonces ya no aparece en la pantalla.
                    {
                        Limpiar();// se limpia todo porque ya no existe la informacion del carro y el usuario tiene que volver a elegir todo para iniciar el proceso de descarga.
                        $("#inputZona").data("kendoComboBox").select(0);
                        $("#inputZona").data("kendoComboBox").trigger("change");

                        AjaxCargarCamposPredeterminados();
                    }
                    else
                        AjaxObtenerDetalleGrid(dataItem.MedioTransporteID);
                    
                    $("#inputZona").data("kendoComboBox").trigger("change");
                    editado = false;
                }
                loadingStop();
            }
            else {
                //mensaje = "No se guardo la informacion el error es: " + data.ReturnMessage[0] + "-2";
                displayNotify("MensajeGuardadoErroneo", "", '2');
                loadingStop();

            }
        });
    }
    else
        displayNotify("MensajeAdverteciaExcepcionGuardado", "", '1');

};

function AjaxCargarCuadrante(zonaID) {
    loadingStart();
    $Cuadrante.Cuadrante.read({ token: Cookies.get("token"), ZonaID: zonaID }).done(function (data) {
        var cuadranteid = 0;
        if (data.length > 0) {
            $("#inputCuadrante").data("kendoComboBox").dataSource.data([]);
            $("#inputCuadrante").data("kendoComboBox").value("");
            $("#inputCuadrante").data("kendoComboBox").dataSource.data(data);
           
        }
        loadingStop();
    });
}

function AjaxObtenerDetalleGrid(carroID)
{
    $DescargarCarro.DescargarCarro.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), carroID: carroID }).done(function (data) {
        if (Error(data)) {
            $("#grid").data("kendoGrid").dataSource.data([]);
            $("#grid").data("kendoGrid").dataSource.data(data);
            if (data.length > 0)
                editado = true;
            else
                editado = false;
            $("#grid").data("kendoGrid").dataSource.sync();
        }
    });
}

function AjaxCargarZona() {
    loadingStart();
    $Zona.Zona.read({ token: Cookies.get("token") }).done(function (data) {
        var ZonaId = 0;
        if (data.length > 0) {
            $("#inputZona").data("kendoComboBox").dataSource.data([]);
            $("#inputZona").data("kendoComboBox").dataSource.data(data);

            if (data.length < 3) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].ZonaID != 0) {
                        ZonaId = data[i].ZonaID;
                    }
                }
            }
            if (ZonaId != 0)
            {
                $("#inputZona").data("kendoComboBox").value(ZonaId);
                $("#inputZona").data("kendoComboBox").trigger("change");
            }
          
        }

        loadingStop();
    });
}