function AjaxCargarArea() {
    loadingStart();
    $Area.Area.read({ token: Cookies.get("token") }).done(function (data) {
        $("#Area").data("kendoComboBox").value("");
        $("#Area").data("kendoComboBox").dataSource.data(data);
        loadingStop();
    });

}

function AjaxCargarCuadrante(area) {
    loadingStart();
    $Cuadrante.Cuadrante.read({ token: Cookies.get("token"), AreaID: area }).done(function (data) {
        $("#Cuadrante").data("kendoComboBox").value("");
        $("#Cuadrante").data("kendoComboBox").dataSource.data(data);
        loadingStop();
    });
}


function AjaxCargarDatos(area, cuadrante, impreso, etiquetado, conCinta) {
    loadingStart();
    $Marcado.Marcado.read({ token: Cookies.get("token"), AreaID: area, CuadranteID: cuadrante, Impreso: impreso, Etiquetado: etiquetado, ConCinta: conCinta, lenguaje: $("#language").val() }).done(function (data) {
        $("#grid").data('kendoGrid').dataSource.data([]);
        var ds = $("#grid").data("kendoGrid").dataSource;
        var array = data;
        for (var i = 0; i < array.length; i++) {
            ds.add(array[i]);
        }
        loadingStop();
    });
}


function AjaxCampoPredeterminadoImpreso() {
    loadingStart();
    $Marcado.Marcado.read({ token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
        if (data.Impreso == "1") {
            $('.radioBtnImpreso')[0].checked = true;
            $('.radioBtnImpreso')[1].checked = false;
        }
        else if (data.Impreso == "0") {
            $('.radioBtnImpreso')[0].checked = false;
            $('.radioBtnImpreso')[1].checked = true;
        }
        if (data.ConCinta == "1") {
            $('.radioBtnImpreso')[0].checked = true;
            $('.radioBtnImpreso')[1].checked = false;
        }
        else if (data.ConCinta == "0") {
            $('.radioBtnConCinta')[0].checked = false;
            $('.radioBtnConCinta')[1].checked = true;
        }
        if (data.Etiquetado == "1") {
            $('.radioBtnCaptura')[0].checked = true;
            $('.radioBtnCaptura')[1].checked = false;
        }
        else if (data.Etiquetado == "0") {
            $('.radioBtnCaptura')[0].checked = false;
            $('.radioBtnCaptura')[1].checked = true;
        }

        loadingStop();
    });
}


function AjaxGuardarCaptura(arregloCaptura, impreso) {
    Captura = [];
    Captura[0] = { ListaDetalles: "" };
    ListaDetalles = [];
    var ColorCintaCorrecto = true;
    var contGuardar = 0;
    for (index = 0; index < arregloCaptura.length; index++) {
        if (arregloCaptura[index].Etiquetado || arregloCaptura[index].ColorCintaID != 0) {

            ListaDetalles[contGuardar] = {
                EmbarqueMarcadoID: "",
                SpoolID: "",
                Impreso: "",
                Etiquetado: "",
                ColorCintaID: ""
            };

            ListaDetalles[contGuardar].EmbarqueMarcadoID = arregloCaptura[index].EmbarqueMarcadoID;
            ListaDetalles[contGuardar].SpoolID = arregloCaptura[index].SpoolID;
            ListaDetalles[contGuardar].Etiquetado = arregloCaptura[index].Etiquetado;
            ListaDetalles[contGuardar].ColorCintaID = arregloCaptura[index].ColorCintaID;

            if (arregloCaptura[index].ConCinta) {
                if (arregloCaptura[index].ColorCintaID == 0) {
                    ColorCintaCorrecto = false;
                }
            }

            if (impreso == "0") {
                ListaDetalles[contGuardar].Impreso = 0;
            }
            else {
                if (arregloCaptura[index].Etiquetado) {
                    ListaDetalles[contGuardar].Impreso = 1;
                }
                else {
                    ListaDetalles[contGuardar].Impreso = 0;
                }
            }

            if (arregloCaptura[index].Etiquetado) {
                ListaDetalles[contGuardar].Etiquetado = 1;
            }
            else {
                ListaDetalles[contGuardar].Etiquetado = 0;
            }
            contGuardar++;

        }


    }

    Captura[0].ListaDetalles = ListaDetalles;
    if (Captura[0].ListaDetalles.length > 0) {
        if (ColorCintaCorrecto) {
            loadingStart();
            $Marcado.Marcado.create(Captura[0], { token: Cookies.get("token") }).done(function (data) {
                loadingStop();
                if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "Ok") {
                    displayMessage("EmbarqueMarcadoMensajeGuardadoExitoso", "", "0");
                    if (impreso == "0") {
                        AjaxCargarDatos($("#Area").data("kendoComboBox").value(), $("#Cuadrante").data("kendoComboBox").value(), $('input:radio[name=Impreso]:checked').val());
                    }
                    displayMessage("CapturaMensajeGuardadoExitoso", "", '1');
                }
                else if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] != "Ok") {
                    mensaje = "No se guardo la informacion el error es: " + data.ReturnMessage[0] + "-2"
                    displayMessage("CapturaMensajeGuardadoErroneo", "", '1');
                    opcionHabilitarView(false, "FieldSetView");
                }
            });
        }
        else {
            displayMessage("EmbarqueMarcadoMensajeCapturarCinta", "", "1");
            opcionHabilitarView(false, "FieldSetView");
        }
    }
    else {
        displayMessage("EmbarqueMarcadoMensajeNoHayRegistrosGuardar", "", "1");
        opcionHabilitarView(false, "FieldSetView");
    }
    
    
}