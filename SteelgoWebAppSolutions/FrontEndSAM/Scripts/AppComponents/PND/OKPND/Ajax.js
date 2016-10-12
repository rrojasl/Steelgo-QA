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
        $("#Proyecto").data("kendoComboBox").dataSource.data(data);

        if ($("#Proyecto").data("kendoComboBox").dataSource._data.length == 2) {
            $("#Proyecto").data("kendoComboBox").select(1);
            $("#Proyecto").data("kendoComboBox").trigger("change");
        }
    });
}

function AjaxGetListaElementos(proyectoID, numControl) {
    loadingStart();
    $OKPND.OKPND.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), ProyectoID: proyectoID, NumControl: numControl }).done(function (data) {
        $("#grid").data("kendoGrid").dataSource.data([]);

        var ds = $("#grid").data("kendoGrid").dataSource;

        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                ds.add(data[i]);
            }
            ds.page(1);
        } else {
            displayNotify("", "No se han encontrado elementos que coincidan con la busqueda", "1");
            ds.page(0);
        }
        ds.sync();
        loadingStop();
    });
}

function AjaxGuardarCaptura(arregloCaptura, tipoGuardado) {
    Captura = [];
    Captura[0] = {
        Detalle: ""
    };
    ListaCaptura = [];

    var cont = 0;
    for (index = 0; index < arregloCaptura.length; index++) {
        if (arregloCaptura[index].OkPND == true || arregloCaptura[index].OKPNDID != 0) {

            ListaCaptura[cont] = {
                OKPNDID: 0,
                SpoolID: 0,
                OrdenTrabajoSpoolID: 0,
                OkPND: false
            };

            ListaCaptura[cont].OKPNDID = arregloCaptura[index].OKPNDID;
            ListaCaptura[cont].OrdenTrabajoSpoolID = arregloCaptura[index].OrdenTrabajoSpoolID;
            ListaCaptura[cont].SpoolID = arregloCaptura[index].SpoolID;
            ListaCaptura[cont].OkPND = arregloCaptura[index].OkPND;

            cont++;
        }
    }

    Captura[0].Detalle = ListaCaptura;

    var ds = $("#grid").data("kendoGrid").dataSource;

    if (ds._data.length > 0) {

        loadingStop();

        var modalTitle = "";
        modalTitle = _dictionary.guardarCambiosOKPND[$("#language").data("kendoDropDownList").value()];

        var ventanaConfirm = $("#ventanaConfirm").kendoWindow({
            iframe: true,
            title: _dictionary.EntregaPlacasGraficasTituloPopup[$("#language").data("kendoDropDownList").value()],
            visible: false,
            width: 450,
            height: 70,
            draggable: false,
            modal: true,
            animation: {
                close: false,
                open: false
            }
        }).data("kendoWindow");

        ventanaConfirm.content(_dictionary.EntregaPlacasGraficasMensajePreguntaGuardado[$("#language").data("kendoDropDownList").value()] +
            "</br><center><button class='btn btn-blue' id='yesButton'>Si</button><button class='btn btn-blue' id='noButton'>No</button></center>");

        ventanaConfirm.open().center();

        $("#yesButton").click(function (handler) {
            window.close();
            $OKPND.OKPND.create(Captura[0], { lenguaje: $("#language").val(), token: Cookies.get("token") }).done(function (data) {
                if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "Ok") {
                    if (data.ReturnMessage[0] != undefined) {
                        if (tipoGuardado == 1) {
                            Limpiar();
                            opcionHabilitarView(false, "FieldSetView");
                        }
                        else {
                            AjaxGetListaElementos($("#Proyecto").data("kendoComboBox").value(), $("#InputNumeroControl").val())
                            opcionHabilitarView(true, "FieldSetView");
                        }

                        displayNotify("", "Datos guardados correctamente.", "0");
                    }
                }
                else {
                    opcionHabilitarView(false, "FieldSetView");
                }
            });
        });

        $("#noButton").click(function (handler) {
            window.close();
        });
    }
    else {
        displayNotify("EditarRequisicionExcepcionGuardado", "", "1");
    }
}

function AjaxGuardadoMasivo(data) {
    CapturaMasiva = [];
    CapturaMasiva[0] = { Detalle: "" };
    CapturaMasiva[0].Detalle = JSON.stringify(data);
    $OKPND.OKPND.create(CapturaMasiva[0], { lenguaje: $("#language").val(), token: Cookies.get("token"), isGuardadoMasivo: 1 }).done(function (data) {
        //if (data) {
        download(data, "export.csv", "text/csv");
        displayNotify("", "Datos guardados correctamente.", "0");
        //}
    });
};