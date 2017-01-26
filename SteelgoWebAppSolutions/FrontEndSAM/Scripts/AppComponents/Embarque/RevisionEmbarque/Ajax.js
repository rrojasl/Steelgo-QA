﻿var jsonSpoolAgregar;
var arrayPaqueteAgregar;

function AjaxCargarCamposPredeterminados() {
    var campoPredeterminado = 3071;
    var campoPredeterminado2 = 3072;

    $CamposPredeterminados.CamposPredeterminados.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), id: campoPredeterminado }).done(function (data) {
        if (data == "Todos") {
            $('input:radio[name=Muestra]:nth(1)').trigger("click");
        }
        else if (data == "Sin captura") {
            $('input:radio[name=Muestra]:nth(0)').trigger("click");
        }
        loadingStop();
    });

    $CamposPredeterminados.CamposPredeterminados.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), id: campoPredeterminado2 }).done(function (data) {
        if (data == "Spool") {
            $('input:radio[name=RevisionEmbarqueTipoSeleccion]:nth(0)').trigger("click");
        }
        else if (data == "Paquete") {
            $('input:radio[name=RevisionEmbarqueTipoSeleccion]:nth(1)').trigger("click");
        }
        else if (data == "Codigo") {
            $('input:radio[name=RevisionEmbarqueTipoSeleccion]:nth(2)').trigger("click");
        }
        loadingStop();
    });
}

function AjaxCargarProyecto() {
    loadingStart();
    $Proyectos.Proyectos.read({ token: Cookies.get("token") }).done(function (data) {
        if (Error(data)) {
            $("#Proyecto").data("kendoComboBox").dataSource.data([]);
            var proyectoId = 0;

            if (data.length > 0) {
                $("#Proyecto").data("kendoComboBox").dataSource.data(data);
                if (data.length < 3) {
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].ProyectoID != 0) {
                            proyectoId = data[i].ProyectoID;
                        }
                    }
                }

                $("#Proyecto").data("kendoComboBox").value(proyectoId);
                $("#Proyecto").data("kendoComboBox").trigger("change");
            }
        }
        loadingStop();
    });
}

function AjaxCargarEmbarques(proyectoID) {
    loadingStart();
    $RevisionEmbarque.RevisionEmbarque.read({ token: Cookies.get("token"), ProyectoID: proyectoID }).done(function (data) {
        $("#Embarque").data("kendoComboBox").dataSource.data([]);
            var EmbarqueID = 0;
            if (data.length > 0) {
                $("#Embarque").data("kendoComboBox").dataSource.data(data);

                if (data.length < 3) {
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].EmbarqueID != 0) {
                            EmbarqueID = data[i].EmbarqueID;
                        }
                    }
                }

                $("#Embarque").data("kendoComboBox").value(EmbarqueID);
                $("#Embarque").data("kendoComboBox").trigger("change");
            }
        loadingStop();
    });
}

function AjaxCargarPaquetes(proyectoID) {
    loadingStart();
    $RevisionEmbarque.RevisionEmbarque.read({ token: Cookies.get("token"), Proyecto: proyectoID }).done(function (data) {
        $("#inputPaquete").data("kendoComboBox").dataSource.data([]);

            var paqueteid = 0;
            if (data.length > 0) {
                $("#inputPaquete").data("kendoComboBox").dataSource.data(data);

                $("#inputPaquete").data("kendoComboBox").value(paqueteid);
                $("#inputPaquete").data("kendoComboBox").trigger("change");
            }
        loadingStop();
    });
}

function AjaxObtenerSpoolID() {
    try {
        loadingStart();
        $CapturasRapidas.CapturasRapidas.read({ ordenTrabajo: $("#InputOrdenTrabajo").val(), tipo: '1', token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
            if (Error(data)) {
                $("#InputOrdenTrabajo").val(data.OrdenTrabajo);
                $("#InputID").data("kendoComboBox").dataSource.data(data.idStatus)
                Cookies.set("LetraProyecto", data.OrdenTrabajo.substring(0, 1), { path: '/' });
                loadingStop();
            }
        });
    } catch (e) {
        displayNotify("Mensajes_error", e.message, '2');
    }
}

function AjaxObtieneDetalle(EmbarqueID) {
    loadingStart();
    $RevisionEmbarque.RevisionEmbarque.read({ token: Cookies.get("token"), EmbarqueID: EmbarqueID, }).done(function (data) {
            if (data.length > 0) {
                $("#grid").data("kendoGrid").dataSource.data([]);
                
                var ds = $("#grid").data("kendoGrid").dataSource;
                var array = data;
                for (var i = 0; i < array.length; i++) {
                    ds.add(array[i]);
                }
                ds.sync();
            }
        loadingStop();
    });
}

function AjaxAgregarDetalleSpool(tipoConsulta, ordenTrabajoSpoolID, codigo) {
    loadingStart();
    var proyectoID = parseInt($("#Proyecto").data("kendoComboBox").value());
    $RevisionEmbarque.RevisionEmbarque.read({ token: Cookies.get("token"), TipoConsulta: tipoConsulta, OrdenTrabajoSpoolID: ordenTrabajoSpoolID, Codigo: codigo}).done(function (data) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        var array = data;
        var cadena = "";
        if (array.length > 0) {
            if (!ExisteSpool(array)) {
                if (array[0].EmbarqueEstatusID < 4) {
                    if (array[0].ProyectoID == proyectoID) {
                        if (array[0].EmbarqueID == 0 && array[0].DetalleCargaID == 0 && array[0].EmpaquetadoID == 0) {
                            ds.insert(0, array[0]);
                            ds.sync();
                        } else {

                            arrayPaqueteAgregar = [];
                            jsonSpoolAgregar = { Accion : array[0].Accion,
                                SpoolID : array[0].SpoolID,
                                NumeroControl : array[0].NumeroControl,
                                EmbarqueID : array[0].EmbarqueID,
                                EmbarqueEstatusID: array[0].EmbarqueEstatusID,
                                DetalleCargaID: array[0].DetalleCargaID,
                                EmpaquetadoID: array[0].EmpaquetadoID,
                                CuadranteID: array[0].CuadranteID,
                                Paquete : array[0].Paquete,
                                DetalleRevisionID : array[0].DetalleRevisionID,
                                Llego : array[0].Llego,
                                NoLlego : array[0].NoLlego,
                                LlegoComentario: array[0].LlegoComentario,
                                Comentario: array[0].Comentario,
                                CapturaManual: true,
                                ModificadoPorUsuario: true

                            }

                            if (array[0].EmbarqueID != 0) {
                                cadena = _dictionary.EmbarqueRevisionMsjDescargaSpoolEmbarque[$("#language").data("kendoDropDownList").value()] +
                                data[0].Embarque + _dictionary.EmbarqueRevisionMsjDescargaSpoolConfirmacion[$("#language").data("kendoDropDownList").value()];
                            } else {
                                if (array[0].DetalleCargaID != 0) {
                                    cadena = _dictionary.EmbarqueRevisionMsjDescargaSpoolPlana[$("#language").data("kendoDropDownList").value()] +
                                        data[0].Plana + _dictionary.EmbarqueRevisionMsjDescargaSpoolConfirmacion[$("#language").data("kendoDropDownList").value()];
                                } else {
                                    cadena = _dictionary.EmbarqueRevisionMsjDescargaSpoolPaquete[$("#language").data("kendoDropDownList").value()] +
                                        data[0].Plana + _dictionary.EmbarqueRevisionMsjDescargaSpoolConfirmacion[$("#language").data("kendoDropDownList").value()];
                                }
                            }

                            $("#spanDescargaSpool").text(cadena);
                            $("#inputTipoDescarga").val(1);
                            windowDownloadSpool.title(_dictionary.TituloPopupCancelar[$("#language").data("kendoDropDownList").value()]);
                            windowDownloadSpool.open().center();
                        }
                    } else
                        displayNotify("EmbarqueRevisionMsjErrorProyectoIncorrecto", "", '1');
                } else
                    displayNotify("EmbarqueRevisionMsjErrorSpoolEmbarcado", "", '1');
            }else
                displayNotify("SpoolIDExistente", "", '1');

        }

        $("#InputID").data("kendoComboBox").value("");
        $("#inputCodigo").val("");
        loadingStop();
    });
}

function AjaxAgregarDetallePaquete(paqueteID) {
    loadingStart();
    var proyectoID = parseInt($("#Proyecto").data("kendoComboBox").value());
    var paquete = $("#inputPaquete").data("kendoComboBox").text()

    if (!ExistePaquete(paquete)) {
        $RevisionEmbarque.RevisionEmbarque.read({ token: Cookies.get("token"), PaqueteID: paqueteID }).done(function (data) {
            var ds = $("#grid").data("kendoGrid").dataSource;
            var array = data;
            var cadena = "";

            if (array.length > 0) {
                if (array[0].ProyectoID == proyectoID) {
                    if (array[0].EmbarqueID == 0 && array[0].CargaPlanaID == 0) {
                        for (var i = 0; i < array.length; i++) {
                            ds.insert(0, array[i]);   
                        }
                        ds.sync();

                    } else {
                        jsonSpoolAgregar = "";
                        arrayPaqueteAgregar = array;

                        if (array[0].EmbarqueID != 0) {
                            cadena = _dictionary.EmbarqueRevisionMsjDescargaSpoolEmbarque[$("#language").data("kendoDropDownList").value()] +
                            data[0].Embarque + _dictionary.EmbarqueRevisionMsjDescargaSpoolConfirmacion[$("#language").data("kendoDropDownList").value()];
                        } else {
                            if (array[0].CargaPlanaID != 0) {
                                cadena = _dictionary.EmbarqueRevisionMsjDescargaSpoolPlana[$("#language").data("kendoDropDownList").value()] +
                                    data[0].Plana + _dictionary.EmbarqueRevisionMsjDescargaSpoolConfirmacion[$("#language").data("kendoDropDownList").value()];
                            }
                        }
                        
                        $("#spanDescargaSpool").text(cadena);
                        $("#inputTipoDescarga").val(2);
                        windowDownloadSpool.title(_dictionary.TituloPopupCancelar[$("#language").data("kendoDropDownList").value()]);
                        windowDownloadSpool.open().center();
                    }
                } else
                    displayNotify("EmbarqueRevisionMsjErrorProyectoIncorrecto", "", '1');

            }

            $("#InputID").data("kendoComboBox").value("");
            $("#inputCodigo").val("");
            loadingStop();
        });
    } else {
        loadingStop();
        displayNotify("EmbarqueRevisionMsjErrorExistePaquete", "", '1');
    }
}


function AjaxDescargarSpool() {
    windowDownloadSpool.close();
    loadingStart();

    $RevisionEmbarque.RevisionEmbarque.read({
        token: Cookies.get("token"), SpoolID: jsonSpoolAgregar.SpoolID, DetalleCargaID: jsonSpoolAgregar.DetalleCargaID,
        EmpaquetadoID: jsonSpoolAgregar.EmpaquetadoID, CuadranteID: jsonSpoolAgregar.CuadranteID
    }).done(function (data) {
        var ds = $("#grid").data("kendoGrid").dataSource;

        if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "Ok") {
            ds.insert(0, jsonSpoolAgregar);
            ds.sync();
            displayNotify("EmbarqueRevisionMsjExitoSpoolCargado", "", "0");
        } else {
            displayNotify("EmbarqueRevisionMsjErrorSpoolCargado", "", "2");
        }
        loadingStop();
    });
}

function AjaxDescargarPaquete() {
    windowDownloadSpool.close();
    loadingStart();

    $RevisionEmbarque.RevisionEmbarque.read({
        token: Cookies.get("token"), Paquete: arrayPaqueteAgregar[0].PaqueteID
    }).done(function (data) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "Ok") {
            for (var i = 0; i < arrayPaqueteAgregar.length; i++) {
                ds.insert(0, arrayPaqueteAgregar[i]);
            }
            ds.sync();
            displayNotify("EmbarqueRevisionMsjExitoPaqueteCargado", "", "0");
        } else {
            displayNotify("EmbarqueRevisionMsjErrorPaqueteCargado", "", "2");
        }
        loadingStop();
    });
}

function AjaxGuardarCaptura(ds, embarqueID, proyectoID, tipoGuardar) {
    loadingStart();
    
    var Captura = { listaDetalle: "", RevisionEmbarqueID: "" };
    var ListaDetalleCaptura = [];

    for (var x = 0; x < ds.length; x++) {
        ListaDetalleCaptura[x] = {
            Accion: "", DetalleRevisionID: "", SpoolID: "", Llego: "", NoLlego: "", LlegoComentario: "",
            Comentario: "", CapturaManual: "", Estatus: 1, ModificadoPorUsuario: false
        }

        ListaDetalleCaptura[x].Accion = ds[x].Accion;
        ListaDetalleCaptura[x].DetalleRevisionID = ds[x].DetalleRevisionID;
        ListaDetalleCaptura[x].SpoolID = ds[x].SpoolID;
        ListaDetalleCaptura[x].Llego = ds[x].Llego;
        ListaDetalleCaptura[x].NoLlego = ds[x].NoLlego;
        ListaDetalleCaptura[x].LlegoComentario = ds[x].LlegoComentario;
        ListaDetalleCaptura[x].Comentario = ds[x].Comentario == "" ? null : ds[x].Comentario;
        ListaDetalleCaptura[x].CapturaManual = ds[x].CapturaManual;

        if (obtieneEstatusSpool(ds[x].Llego, ds[x].NoLlego, ds[x].LlegoComentario) != ds[x].EstatusSpool || 
            ds[x].Comentario != ds[x].ComentarioActual) {
            ListaDetalleCaptura[x].ModificadoPorUsuario = true
        }

        if (ds[x].Accion == 2) {
            if (ds[x].CapturaManual) {
                if ((!ds[x].Llego && !ds[x].NoLlego && !ds[x].LlegoComentario) ||
                (ds[x].LlegoComentario && ds[x].Comentario == null)) {
                    ListaDetalleCaptura[x].Estatus = 0;
                    $("#grid").data("kendoGrid").dataSource._data[x].RowOk = false;
                } else
                    $("#grid").data("kendoGrid").dataSource._data[x].RowOk = true;
            } else {
                if (!ds[x].Llego && !ds[x].NoLlego && !ds[x].LlegoComentario) {
                    ListaDetalleCaptura[x].Accion = 3;
                    $("#grid").data("kendoGrid").dataSource._data[x].RowOk = true;
                } else {
                    if ((ds[x].LlegoComentario && (ds[x].Comentario == null || ds[x].Comentario == ""))) {
                        ListaDetalleCaptura[x].Estatus = 0;
                        $("#grid").data("kendoGrid").dataSource._data[x].RowOk = false;
                    } else
                        $("#grid").data("kendoGrid").dataSource._data[x].RowOk = true;
                }
            }
        } else if (ds[x].Accion == 1) {
            if (ds[x].CapturaManual) {
                if ((!ds[x].Llego && !ds[x].NoLlego && !ds[x].LlegoComentario) ||
                (ds[x].LlegoComentario && ds[x].Comentario == null)) {
                    ListaDetalleCaptura[x].Estatus = 0;
                    $("#grid").data("kendoGrid").dataSource._data[x].RowOk = false;
                } else
                    $("#grid").data("kendoGrid").dataSource._data[x].RowOk = true;
            } else {
                if ((ds[x].LlegoComentario && ds[x].Comentario == null)) {
                    ListaDetalleCaptura[x].Estatus = 0;
                    $("#grid").data("kendoGrid").dataSource._data[x].RowOk = false;
                } else
                    $("#grid").data("kendoGrid").dataSource._data[x].RowOk = true;
            }
        }
    }

    $("#grid").data("kendoGrid").dataSource.sync();
    Captura.listaDetalle = ListaDetalleCaptura;
    Captura.EmbarqueID = embarqueID;
    Captura.Cerrado = $("#InputCerrar").is(":checked") ? 1 : 0;

    if (!ExistRowEmpty(ListaDetalleCaptura)) {
        $RevisionEmbarque.RevisionEmbarque.create(Captura, { token: Cookies.get("token") }).done(function (data) {
            if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "Ok") {
                if (tipoGuardar == 1) {
                    opcionHabilitarView(true, "FieldSetView");
                    AjaxObtieneDetalle(embarqueID);
                    AjaxCargarPaquetes(proyectoID);
                } else {
                    Limpiar();
                    loadingStop();
                }
                displayNotify("MensajeGuardadoExistoso", "", '0');
            } else {
                displayNotify("MensajeGuardadoErroneo", "", '2');
                loadingStop();
            }
        });
    } else {
        loadingStop();
        ventanaConfirm = $("#ventanaConfirm").kendoWindow({
            iframe: true,
            title: _dictionary.TituloPopupCancelar[$("#language").data("kendoDropDownList").value()],
            visible: false,
            width: "auto",
            height: "auto",
            draggable: false,
            resizable: false,
            modal: true,
            animation: {
                close: false,
                open: false
            },
            actions: []
        }).data("kendoWindow");

        ventanaConfirm.content('<center>' + _dictionary.MensajeConfirmacionGuardadoGeneral[$("#language").data("kendoDropDownList").value()] + '</center>' +
            "</br><center><button class='btn btn-blue' id='yesButton'>" + _dictionary.lblSi[$("#language").data("kendoDropDownList").value()]
            + "</button><button class='btn btn-blue' id='noButton'>" + _dictionary.lblNo[$("#language").data("kendoDropDownList").value()]
            + "</button></center>");

        ventanaConfirm.open().center();

        $("#yesButton").click(function (e) {
            ventanaConfirm.close();
            loadingStart();
            var j = 0;
            var listaDetalleGuardar = [];

            for (var i = 0; i < ListaDetalleCaptura.length; i++) {
                if (ListaDetalleCaptura[i].Estatus == 1) {

                    listaDetalleGuardar[j] = {
                        Accion: "", DetalleRevisionID: "", SpoolID: "", Llego: "", NoLlego: "", LlegoComentario: "",
                        Comentario: "", CapturaManual: "", ModificadoPorUsuario: false
                    };

                    listaDetalleGuardar[j].Accion = ListaDetalleCaptura[i].Accion;
                    listaDetalleGuardar[j].DetalleRevisionID = ListaDetalleCaptura[i].DetalleRevisionID;
                    listaDetalleGuardar[j].SpoolID = ListaDetalleCaptura[i].SpoolID;
                    listaDetalleGuardar[j].Llego = ListaDetalleCaptura[i].Llego;
                    listaDetalleGuardar[j].NoLlego = ListaDetalleCaptura[i].NoLlego;
                    listaDetalleGuardar[j].LlegoComentario = ListaDetalleCaptura[i].LlegoComentario;
                    listaDetalleGuardar[j].Comentario = ListaDetalleCaptura[i].Comentario;
                    listaDetalleGuardar[j].CapturaManual = ListaDetalleCaptura[i].CapturaManual;
                    listaDetalleGuardar[j].ModificadoPorUsuario = ListaDetalleCaptura[i].ModificadoPorUsuario;
                    j++;
                }
            }

            Captura.listaDetalle = listaDetalleGuardar;

            if (Captura.listaDetalle.length > 0) {
                $RevisionEmbarque.RevisionEmbarque.create(Captura, { token: Cookies.get("token") }).done(function (data) {
                    if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "Ok") {
                        if (tipoGuardar == 1) {
                            opcionHabilitarView(true, "FieldSetView");
                            AjaxObtieneDetalle(embarqueID);
                        } else {
                            Limpiar();
                            loadingStop();
                        }
                        displayNotify("MensajeGuardadoExistoso", "", '0');
                    } else {
                        displayNotify("MensajeGuardadoErroneo", "", '2');
                        loadingStop();
                    }
                });
            } else {
                ventanaConfirm.close();
                loadingStop();
                displayNotify("MensajeAdverteciaExcepcionGuardado", "", '2');
            }

        });
        $("#noButton").click(function (e) {
            ventanaConfirm.close();
        });
    }    
}

function obtieneEstatusSpool(llego, noLlego, llegoComentario){
    var estatus = "";
    if (llego)
        estatus = "Llego";
    else if (noLlego)
        estatus = "NoLlego";
    else if (llegoComentario)
        estatus = "LlegoComentario";

    return estatus;
}