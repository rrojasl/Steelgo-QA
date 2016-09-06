﻿var TipoMuestraPredeterminadoID = 3049;

function AjaxCargarCamposPredeterminados() {
    $CamposPredeterminados.CamposPredeterminados.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), id: TipoMuestraPredeterminadoID }).done(function (data) {
        if (data == "sin captura") {
            $('input:radio[name=Muestra]:nth(0)').trigger("click");
        }
        else if (data == "Todos") {
            $('input:radio[name=Muestra]:nth(1)').trigger("click");
        }
        loadingStop();
    });

    AjaxGetListaProyectos();
};

function AjaxGetListaProyectos() {
    $Proyectos.Proyectos.read({ token: Cookies.get("token") }).done(function (data) {
        $("#Proyecto").data("kendoComboBox").value("");
        $("#Proyecto").data("kendoComboBox").dataSource.data(data);

        if ($("#Proyecto").data("kendoComboBox").dataSource._data.length == 2) {
            $("#Proyecto").data("kendoComboBox").select(1);
            $("#Proyecto").data("kendoComboBox").trigger("change");
        }
        else
            $("#Proyecto").data("kendoComboBox").select(0);
    });
}

function AjaxGetListaTiposDePrueba() {
    $ServiciosTecnicosGeneral.ServiciosTecnicosGeneral.read({ token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
        $("#tipoPrueba").data("kendoComboBox").dataSource.data(data);
    });
}

function AjaxGetListaRequisiciones(proyectoID, tipoPruebaID) {
    $ServiciosTecnicosGeneral.ServiciosTecnicosGeneral.read({ token: Cookies.get("token"), ProyectoID: proyectoID, TipoPruebaID: tipoPruebaID }).done(function (data) {
        $("#listaRequisiciones").data("kendoComboBox").value("");
        $("#listaRequisiciones").data("kendoComboBox").dataSource.data(data);
    });
}

function AjaxGetListaElementos(requisicionID, tipoPruebaID, proyectoID, muestra) {
    loadingStart();
    $RequisicionPND.RequisicionPND.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), RequisicionID: requisicionID, TipoPruebaID: tipoPruebaID, ProyectoID: proyectoID, Muestra: muestra }).done(function (data) {
        $("#grid").data("kendoGrid").dataSource.data([]);

        var ds = $("#grid").data("kendoGrid").dataSource;

        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                ds.add(data[i]);
                tipoPrueba = data[i].TipoPruebaID;
            }
        }
        loadingStop();
    });
}

function AjaxGuardarCaptura(arregloCaptura) {
    Captura = [];
    Captura[0] = {
        RequisicionID: 0,
        Requisicion: "",
        ProyectoID: 0,
        TipoPruebaID: 0,
        FechaRequisicion: "",
        CodigoAsme: "",
        Observacion: "",
        
        ListaDetalle: ""
    };
    ListaCaptura = [];

    var cont = 0;
    for (index = 0; index < arregloCaptura.length; index++) {
        if (arregloCaptura[index].Agregar == true) {

            ListaCaptura[cont] = {
                RequisicionID: 0,
                ElementoPorClasificacionPNDID: 0
            };

            ListaCaptura[cont].RequisicionID = $("#listaRequisiciones").data("kendoComboBox").value() == "" ? 0 : $("#listaRequisiciones").data("kendoComboBox").value();
            ListaCaptura[cont].ElementoPorClasificacionPNDID = arregloCaptura[index].ElementoPorClasificacionPNDID;

            cont++;
        }

    }

    if (ListaCaptura.length != 0) {
        Captura[0].RequisicionID = $("#listaRequisiciones").data("kendoComboBox").value() == "" ? 0 : $("#listaRequisiciones").data("kendoComboBox").value();
        Captura[0].Requisicion = "";
        Captura[0].ProyectoID = $("#Proyecto").data("kendoComboBox").value();
        Captura[0].TipoPruebaID = $("#tipoPrueba").data("kendoComboBox").value() == "" ? 0 : $("#Proyecto").data("kendoComboBox").value();
        Captura[0].CodigoAsme = "";
        Captura[0].Observacion = "";
        Captura[0].FechaRequisicion = "";

        Captura[0].ListaDetalle = ListaCaptura;

        loadingStart();

        var tipoPruebaID = $("#Proyecto").data("kendoComboBox").value();

        loadingStop();

        var modalTitle = "";
        modalTitle = _dictionary.MensajeNuevaRequisicion[$("#language").data("kendoDropDownList").value()];
        var ventanaConfirm = $("#ventanaConfirm");
        var window = ventanaConfirm.kendoWindow({
            modal: true,
            title: modalTitle,
            resizable: false,
            visible: true,
            width: "50%",
            minWidth: 30,
            position: {
                top: "1%",
                left: "1%"
            }
        }).data("kendoWindow");

        window.content('<div id="ventanaConfirm" z-index: inherit">' +
                            '<div class="col-sm-11 col-md-11 col-lg-11">' +
                                '<div class="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12">' +
                                    '<label id=""><span>' + _dictionary.lblRequisicion1[$("#language").data("kendoDropDownList").value()] + '</span></label>' +
                                    '<input id="NombreRequisicion" class="form-control" />' +
                                '</div>' +
                                '<div class="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12">' +
                                    '<label id=""><span>' + _dictionary.lblFechaRequisicion[$("#language").data("kendoDropDownList").value()] + '</span></label>' +
                                    '<input id="FechaRequisicion" class="form-control" readonly/>' +
                                '</div>' +
                                '<div class="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12">' +
                                    '<label id=""><span>' + _dictionary.lblCodigoAsme[$("#language").data("kendoDropDownList").value()] + '</span></label>' +
                                    '<input id="CodigoAsme" class="form-control" readonly/>' +
                                '</div>' +
                                '<div class="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12">' +
                                    '<label id=""><span>' + _dictionary.lblObservacion[$("#language").data("kendoDropDownList").value()] + '</span></label>' +
                                    '<input id="Observacion" class="form-control" />' +
                                '</div>' +
                                '<div class="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12">' +
                                    '<center><button class="btn btn-blue" id="YesButton"> Guardar</button>&nbsp;<button class="btn btn-blue" id="NoButton"> Cancelar</button></center>' +
                                '</div>' +
                            '</div>' +
                        '</div>');
        ventanaConfirm.data("kendoWindow").title(modalTitle);

        var idFechaRequisicion = 2047;
        $CamposPredeterminados.CamposPredeterminados.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), id: idFechaRequisicion }).done(function (data) {
            $("#FechaRequisicion").val(data);
            $("#CodigoAsme").val("ASME VIII Div 1 App 8"); // Hardcode debido a que no hay codigos asme para el proyectoId 16
        });

        ventanaConfirm.data("kendoWindow").center().open();

        $("#YesButton").click(function (handler) {
            Captura[0].Requisicion = $("#NombreRequisicion").val();
            Captura[0].CodigoAsme = $("#CodigoAsme").val();
            Captura[0].Observacion = $("#Observacion").val();
            Captura[0].FechaRequisicion = $("#FechaRequisicion").val();

            $RequisicionPND.RequisicionPND.create(Captura[0], { token: Cookies.get("token") }).done(function (data) {
                if (data.ReturnMessage.length > 0 && data.ReturnMessage[0].split('|')[0] == "Ok") {
                    mensaje = "Se guardo correctamente la informacion" + "-0";
                    if (tipoGuardar == 1) {
                        Limpiar();
                        opcionHabilitarView(false, "FieldSetView");
                        requisicionID = 0;
                    }
                    else {
                        requisicionID = data.ReturnMessage[0].split('|')[1];
                        ajaxObtenerJuntasSoldadas($("#Proyecto").data("kendoComboBox").value());
                        opcionHabilitarView(true, "FieldSetView");
                    }
                    ajaxRequisicion();
                    displayNotify("CapturaSoldaduraMensajeGuardadoExitoso", "", "0");
                    loadingStop();
                }
                else  /*(data.ReturnMessage.length > 0 && data.ReturnMessage[0] != "Ok") */ {
                    mensaje = "No se guardo la informacion el error es: " + data.ReturnMessage[0] + "-2";
                    //displayNotify("CapturaMensajeGuardadoErroneo", "", '1');
                    loadingStop();
                }
            });

            window.close();
        });
        $("#NoButton").click(function (handler) {
            window.close();
        });
    }
    else {
        displayNotify("MensajeSeleccioneRequisiciones", "", "1");
    }
}