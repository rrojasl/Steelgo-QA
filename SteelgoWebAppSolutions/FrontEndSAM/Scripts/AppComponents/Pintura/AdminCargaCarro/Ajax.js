﻿function AjaxCargarCamposPredeterminados() {
    loadingStart();
    var TipoMuestraPredeterminadoID = 46;
    $CamposPredeterminados.CamposPredeterminados.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), id: TipoMuestraPredeterminadoID }).done(function (data) {
        if (data == "Escritorio") {
            $("#styleEscritorio").addClass("active");
            $("#stylePatio").removeClass("active");

            $('input:radio[name=TipoVista]:nth(0)').attr('checked', true);
            $('input:radio[name=TipoVista]:nth(1)').attr('checked', false);
            $('input:radio[name=TipoVista]:nth(0)').trigger("change");
            $("#contenedorPrincipalEscritorio").show();
            $("#contenedorSecundarioEscritorio").show();
            $("#contenedorPrincipalPatio").hide();
            $("#contenedorSecundarioPatio").hide();
        }
        else if (data == "Patio") {
            $("#styleEscritorio").removeClass("active");
            $("#stylePatio").addClass("active");

            $('input:radio[name=TipoVista]:nth(0)').attr('checked', false);
            $('input:radio[name=TipoVista]:nth(1)').attr('checked', true);
            $('input:radio[name=TipoVista]:nth(1)').trigger("change");
            $("#contenedorPrincipalEscritorio").hide();
            $("#contenedorSecundarioEscritorio").hide();
            $("#contenedorPrincipalPatio").show();
            $("#contenedorSecundarioPatio").show();
        }
    });

    AjaxCargaMostrarPredeterminado();
    loadingStop();
};

function AjaxCargaMostrarPredeterminado() {
    var TipoMuestraPredeterminadoID = 2048;
    $CamposPredeterminados.CamposPredeterminados.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), id: TipoMuestraPredeterminadoID }).done(function (data) {
        if (data == "sin captura") {
            $('input:radio[name=Muestra]:nth(0)').trigger("click");
        }
        else if (data == "Todos") {
            $('input:radio[name=Muestra]:nth(1)').trigger("click");
        }
    });

    AjaxCargaTipoSpool();
}

function AjaxCargaTipoSpool() {
    var TipoMuestraPredeterminadoID = 34;
    $CamposPredeterminados.CamposPredeterminados.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), id: TipoMuestraPredeterminadoID }).done(function (data) {
        if (data == "Spool") {
            $('input:radio[name=TipoSeleccion]:nth(0)').attr('checked', true).trigger("change");
        }
        else if (data == "Codigo") {
            $('input:radio[name=TipoSeleccion]:nth(1)').attr('checked', true).trigger("change");
        }

    });
}

function AjaxCargarProyecto() {
    $Proyectos.Proyectos.read({ token: Cookies.get("token") }).done(function (data) {
        $("#inputProyecto").data("kendoComboBox").dataSource.data([]);
        var proyectoId = 0;

        if (data.length > 0) {
            $("#inputProyecto").data("kendoComboBox").dataSource.data(data);
            if (data.length == 2) {
                $("#inputProyecto").data("kendoComboBox").value(data[1].ProyectoID);
                $("#inputProyecto").data("kendoComboBox").trigger("change");
            }

        }
    });
}

function AjaxCargarMedioTransporte(ProyectoID, nuevoCarro) {
    $PinturaGeneral.PinturaGeneral.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), proyectoID: ProyectoID }).done(function (data) {
        var medioTranporteId = 0;

        //se agrega la opcion del carro nuevo
        data.splice(1, 0, {
            MedioTransporteID: -1,
            Nombre: _dictionary.PinturaCargaAgregarNuevoCarro[$("#language").data("kendoDropDownList").value()],
            MedioTransporteCargaID: 0,
            CarroCerrado: false
        });

        $("#inputCarro").data("kendoComboBox").dataSource.data(data);

        if (data.length == 3) {
            $("#inputCarro").data("kendoComboBox").value(data[2].MedioTransporteID);
            $("#inputCarro").data("kendoComboBox").trigger("change");
        }
        else {
            if (nuevoCarro != null) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].Nombre == nuevoCarro) {
                        $("#inputCarro").data("kendoComboBox").value(data[i].MedioTransporteID);
                        $("#inputCarro").data("kendoComboBox").trigger("change");
                        break;
                    }
                }
            }
            else
                $("#inputCarro").data("kendoComboBox").trigger("change");
        }
    });
}

function AjaxGuardarNuevoCarro() {

    try {


        loadingStart();

        var Proyecto = $("#inputProyecto").data("kendoComboBox").dataItem($("#inputProyecto").data("kendoComboBox").select());
        var Captura = { Nombre: $("#InputNombre").val(), UsuarioID: 0, PatioID: Proyecto.PatioID };

        if ($("#InputNombre").val() != "" && $("#InputNombre").val() != null) {
            $PinturaGeneral.PinturaGeneral.create(Captura, { token: Cookies.get("token") }).done(function (data) {
                if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "Ok") {
                    AjaxCargarMedioTransporte(Proyecto.ProyectoID, $("#InputNombre").val());
                    displayNotify("PinturaGuardarNuevoCarro", "", '0');
                    windowNewCarriage.close();
                }
                else if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] != "Ok") {
                    displayNotify("PinturaErrorGuardarNuevoCarro", "", '2');
                }
                loadingStop();
            });
        }
        else {
            displayNotify("PinturaGuardarNuevoCarroNombre", "", '2');
            loadingStop();
        }
    } catch (e) {
        loadingStop();
        displayNotify("Mensajes_error", e.message, '0');

    }
}




function AjaxObtenerDetalleCargaCarro(MedioTransporteID, tipoEscenario, valorBusqueda) {
    loadingStart();
    $CargaCarro.CargaCarro.read({ medioTransporteID: MedioTransporteID, token: Cookies.get("token"), proyectoID: $("#inputProyecto").data("kendoComboBox").value(), lenguaje: $("#language").val(), escenario: tipoEscenario, valorBusqueda: valorBusqueda }).done(function (data) {

        var ds = $("#grid").data("kendoGrid").dataSource;
        var array = data;
        var elementosNoModificados = "";
        var elementosModificados = "";

        if (data.length > 0) {
            editado = true;
            //for (var i = 0; i < array.length; i++) {
            //    if (tipoEscenario=="Patio" && !validarInformacion(array[i])) {
            //        ds.add(array[i]);
            //    }
            //    else
            //        ds.add(array[i]);
            //}
            if (valorBusqueda == "") {
                $("#grid").data("kendoGrid").dataSource.data([]);
                $("#grid").data("kendoGrid").dataSource.data(data);
                editado = true;
            }
            else {
                for (var i = 0; i < array.length; i++) {
                    if (!validarInformacion(array[i])) {
                        ds.add(array[i]);
                        if (elementosModificados != "")
                            elementosModificados += ", " + array[i].NumeroControl;
                        else
                            elementosModificados = array[i].NumeroControl;
                    }
                    else {
                        if (elementosModificados != "")
                            elementosNoModificados += ", " + array[i].NumeroControl;
                        else
                            elementosNoModificados = array[i].NumeroControl;
                    }
                }

                if (elementosModificados != "") {
                    displayNotify("", _dictionary.SpoolAgregado[$("#language").data("kendoDropDownList").value()] +
                       elementosModificados + _dictionary.CapturaArmadoMsgNuevoEnReporte[$("#language").data("kendoDropDownList").value()], '0');
                    editado = true;
                    if (valorBusqueda.split("~")[1] == "Spool") {
                        $("#InputID").data("kendoComboBox").value("");
                        $("#InputID").val("")
                    }
                    else {
                        $("#inputCodigo").val("")
                    }
                }

                if (elementosNoModificados != "") {
                    displayNotify("", _dictionary.SpoolAgregado[$("#language").data("kendoDropDownList").value()] +
                        elementosNoModificados + _dictionary.CapturaArmadoMsgExisteReporte[$("#language").data("kendoDropDownList").value()], '1');
                }


            }
            ds.sync();

            ImprimirAreaTonelada();
        }

        loadingStop();
    });
}

function AjaxObtenerSpoolID() {

    var OrdenTrabajoOrigianl = $("#InputOrdenTrabajo").val();
    $Armado.Armado.read({ ordenTrabajo: $("#InputOrdenTrabajo").val(), tipo: '1', token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
        dataSpoolArray = data;
        if (Error(data)) {
            if (data.OrdenTrabajo != "") {
                $("#InputOrdenTrabajo").val(data.OrdenTrabajo);
            }
            else {
                $("#InputOrdenTrabajo").val(OrdenTrabajoOrigianl);
                displayNotify("CapturaArmadoMensajeOrdenTrabajoNoEncontrada", "", '1');
            }

            $("#InputID").data("kendoComboBox").dataSource.data(data.idStatus);
            Cookies.set("LetraProyecto", data.OrdenTrabajo.substring(0, 1), { path: '/' });
            $("#InputID").data("kendoComboBox").enable(true);
            $("#InputID").data("kendoComboBox").input.focus();
        }
    });
}
