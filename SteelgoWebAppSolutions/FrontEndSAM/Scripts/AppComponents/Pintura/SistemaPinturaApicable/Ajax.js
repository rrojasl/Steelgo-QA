﻿function AjaxCargarCamposPredeterminados() {
    var TipoMuestraPredeterminadoID = 3057;
    $CamposPredeterminados.CamposPredeterminados.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), id: TipoMuestraPredeterminadoID }).done(function (data) {
        if (data == "spool") {
            $('input:radio[name=TipoBusqueda]:nth(0)').trigger("click");
        }
        else if (data == "nc") {
            $('input:radio[name=TipoBusqueda]:nth(1)').trigger("click");
        }
    });
    AjaxCargarTipoLlenado();
}
function AjaxCargarTipoLlenado() {
    var TipoMuestraPredeterminadoID = 3058;
    $CamposPredeterminados.CamposPredeterminados.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), id: TipoMuestraPredeterminadoID }).done(function (data) {
        if (data == "Vacios") {
            $('input:radio[name=Planchar]:nth(0)').trigger("click");
        }
        else if (data == "Todos") {
            $('input:radio[name=Planchar]:nth(1)').trigger("click");
        }
    });
}
function AjaxCargaProyecto() {
    $Proyectos.Proyectos.read({ token: Cookies.get("token") }).done(function (data) {
        $("#inputProyecto").data("kendoComboBox").dataSource.data([]);
        $("#inputProyecto").data("kendoComboBox").dataSource.data(data);

        var proyectoId = 0;

        if (data.length < 3) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].ProyectoID != 0) {
                    proyectoId = data[i].ProyectoID;
                }
            }
        }

        $("#inputProyecto").data("kendoComboBox").value(proyectoId);
        $("#inputProyecto").data("kendoComboBox").trigger("change");
    });
}

function AjaxCargarSistemaPintura(proyectoID) {
    $SistemaPinturaAplicable.SistemaPinturaAplicable.read({ token: Cookies.get("token"), ProyectoID: proyectoID }).done(function (data) {
        
        $("#inputSistemaPintura").data("kendoComboBox").dataSource.data(data);

        var spid = 0;

        if (data.length < 3) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].SistemaPinturaID != 0) {
                    spid = data[i].SistemaPinturaID;
                }
            }
        }

        $("#inputSistemaPintura").data("kendoComboBox").value(spid);
        $("#inputSistemaPintura").data("kendoComboBox").trigger("change");
    });
}

function AjaxCargarColorPintura(sistemaPinturaID) {    
    $SistemaPinturaAplicable.SistemaPinturaAplicable.read({ token: Cookies.get("token"), SistemaPinturaID: sistemaPinturaID, Lenguaje: $("#language").val() }).done(function (data) {
        
        $("#inputColorPintura").data("kendoComboBox").dataSource.data(data);

        var cpid = 0;

        if (data.length < 3) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].ColorPinturaID != 0) {
                    cpid = data[i].ColorPinturaID;
                }
            }
        }

        $("#inputColorPintura").data("kendoComboBox").value(cpid);
        $("#inputColorPintura").data("kendoComboBox").trigger("change");
    });
}

function AjaxCargarDetalleSpool(proyectoID, tipoBusqueda, cadena) {
    $SistemaPinturaAplicable.SistemaPinturaAplicable.read({ token: Cookies.get("token"), ProyectoID: proyectoID, TipoBusqueda: tipoBusqueda, Cadena: cadena, Lenguaje: $("#language").val() }).done(function (data) {
        $("#grid").data("kendoGrid").dataSource.data([]);

        var ds = $("#grid").data("kendoGrid").dataSource;
        if(data.length>0){
            for (var i = 0; i < data.length; i++) {
                ds.add(data[i]);
            }
        }    
    });
}

function AjaxCargarColorPinturaRender(sistemaPinturaID, options) {
    $SistemaPinturaAplicable.SistemaPinturaAplicable.read({ token: Cookies.get("token"), SistemaPinturaID: sistemaPinturaID, Lenguaje: $("#language").val() }).done(function (data) {
        if(data.length>0){
            options.model.ListaColorPintura = data
            $("#grid").data("kendoGrid").dataSource.sync();
        }
        
   });
}

function AjaxGuardarCaptura(listaCaptura, GuardarYNuevo) {
    var Captura = { detalle: "" };
    var Proyecto = $("#inputProyecto").data("kendoComboBox").dataItem($("#inputProyecto").data("kendoComboBox").select());

    var listaDetalles = [];
    for (var i = 0; i < listaCaptura.length; i++) {

        listaDetalles[i] = {
            Accion: "",
            SpoolAplicableID: "",
            OrdenTrabajoID: "",
            SpoolID: "",
            SistemaPinturaID: "",
            SistemaPinturaColorID: "",
            Estatus: 1
        };
            
        listaDetalles[i].Accion = listaCaptura[i].Accion;
        listaDetalles[i].SpoolAplicableID = listaCaptura[i].SpoolAplicableID;
        listaDetalles[i].OrdenTrabajoID = listaCaptura[i].OrdenTrabajoID;
        listaDetalles[i].SpoolID = listaCaptura[i].SpoolID;
        listaDetalles[i].SistemaPinturaID = listaCaptura[i].SistemaPinturaID;
        listaDetalles[i].SistemaPinturaColorID = listaCaptura[i].SistemaPinturaColorID;

        if (listaDetalles[i].Accion === 1 || listaDetalles[i].Accion === 2) {
            if (listaDetalles[i].Accion === 2) {
                if (listaDetalles[i].SistemaPinturaID == 0 && listaDetalles[i].SistemaPinturaColorID == 0) {
                    listaDetalles[i].Accion = 4;
                } else {

                    if (listaDetalles[i].SistemaPinturaID == 0) {
                        listaDetalles[i].Estatus = 0;
                        $('tr[data-uid="' + listaCaptura[i].uid + '"] ').css("background-color", "#ffcccc");
                    }
                    if (listaDetalles[i].SistemaPinturaColorID == 0) {
                        listaDetalles[i].Estatus = 0;
                        $('tr[data-uid="' + listaCaptura[i].uid + '"] ').css("background-color", "#ffcccc");
                    }
                }
            }else{
                
                if (listaDetalles[i].SistemaPinturaID == 0) {
                    listaDetalles[i].Estatus = 0;
                    $('tr[data-uid="' + listaCaptura[i].uid + '"] ').css("background-color", "#ffcccc");
                }
                if (listaDetalles[i].SistemaPinturaColorID == 0) {
                    listaDetalles[i].Estatus = 0;
                    $('tr[data-uid="' + listaCaptura[i].uid + '"] ').css("background-color", "#ffcccc");
                }
            }
        }
    }
    if (!ExistRowEmpty(listaDetalles)) {
        Captura.detalle = listaDetalles;
        $SistemaPinturaAplicable.SistemaPinturaAplicable.create(Captura,{ token: Cookies.get("token")}).done(function (data) {
            if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "OK") {

                if (GuardarYNuevo) {
                    LimpiarPantalla();
                } else {
                    var tipoBusqueda = 0;
                    var cadena = "";

                    $("#grid").data("kendoGrid").dataSource.data([]);
                    if ($("#styleSpool").hasClass("active")) {
                        tipoBusqueda = 1;
                        cadena = $('#inputSpool').val();
                    } else if ($("#styleNc").hasClass("active")) {
                        tipoBusqueda = 2;
                        cadena = $('#inputNc').val();
                    }
                    AjaxCargarDetalleSpool(Proyecto.ProyectoID, tipoBusqueda, cadena);;
                    opcionHabilitarView(true);
                }

                displayNotify("SistemaPinturaAplicableMensajeGuardadoExistoso", "", '0');
            } else {
                displayNotify("SistemaPinturaAplicableMensajeGuardadoErroneo", "", '2');
            }
        });
    } else {
        var ventanaConfirm = $("#ventanaConfirm").kendoWindow({
            iframe: true,
            title: _dictionary.EntregaPlacasGraficasTituloPopup[$("#language").data("kendoDropDownList").value()],
            visible: false,
            width: "30%",
            height: "auto",
            draggable: false,
            modal: true,
            animation: {
                close: false,
                open: false
            }
        }).data("kendoWindow");

        ventanaConfirm.content('<center>'+_dictionary.EntregaPlacasGraficasMensajePreguntaGuardado[$("#language").data("kendoDropDownList").value()] + '</center>'+
            "</br><center><button class='btn btn-blue' id='yesButton'>Si</button><button class='btn btn-blue' id='noButton'>No</button></center>");

        ventanaConfirm.open().center();
        $("#yesButton").click(function () {
            var x = 0;
            var listaDetallesGuardar = [];
            for (var i = 0; i < listaDetalles.length; i++) {
                if (listaDetalles[i].Estatus == 1) {
                    listaDetallesGuardar[x] = {
                        Accion: "",
                        SpoolAplicableID: "",
                        OrdenTrabajoID: "",
                        SpoolID: "",
                        SistemaPinturaID: "",
                        SistemaPinturaColorID: "",
                        Estatus: 1
                    };
                    listaDetallesGuardar[x].Accion = listaDetalles[i].Accion;
                    listaDetallesGuardar[x].SpoolAplicableID = listaDetalles[i].SpoolAplicableID;
                    listaDetallesGuardar[x].OrdenTrabajoID = listaDetalles[i].OrdenTrabajoID;
                    listaDetallesGuardar[x].SpoolID = listaDetalles[i].SpoolID;
                    listaDetallesGuardar[x].SistemaPinturaID = listaDetalles[i].SistemaPinturaID;
                    listaDetallesGuardar[x].SistemaPinturaColorID = listaDetalles[i].SistemaPinturaColorID;
                    listaDetallesGuardar[x].Estatus = listaDetalles[i].Estatus;

                    x++;
                }
            }

            Captura.detalle = listaDetallesGuardar;
            if (Captura.detalle.length > 0) {
                $SistemaPinturaAplicable.SistemaPinturaAplicable.create(Captura, { token: Cookies.get("token") }).done(function (data) {
                    if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "OK") {

                        if (GuardarYNuevo) {
                            LimpiarPantalla();
                        } else {
                            var tipoBusqueda = 0;
                            var cadena = "";

                            $("#grid").data("kendoGrid").dataSource.data([]);
                            if ($("#styleSpool").hasClass("active")) {
                                tipoBusqueda = 1;
                                cadena = $('#inputSpool').val();
                            } else if ($("#styleNc").hasClass("active")) {
                                tipoBusqueda = 2;
                                cadena = $('#inputNc').val();
                            }
                            AjaxCargarDetalleSpool(Proyecto.ProyectoID, tipoBusqueda, cadena);;
                            opcionHabilitarView(true);
                        }

                        displayNotify("SistemaPinturaAplicableMensajeGuardadoExistoso", "", '0');
                    } else {
                        displayNotify("SistemaPinturaAplicableMensajeGuardadoErroneo", "", '2');
                    }
                });
                ventanaConfirm.close();
            } else {
                ventanaConfirm.close();
                displayNotify("SistemaPinturaAplicableExcepcionGuardado", "", '1');
            }

        });
        $("#noButton").click(function () {
            ventanaConfirm.close();
        });
    }
}

function AjaxGuardaCargaMasiva(data, tipoCarga) {
    var Captura = { detalle: data }
    loadingStart();
    $SistemaPinturaAplicable.SistemaPinturaAplicable.create(Captura, { token: Cookies.get("token"), TipoCarga: tipoCarga, Lenguaje: $("#language").val() }).done(function (data) {
            
            download(data, "export.csv", "text/csv");
            displayNotify("SistemaPinturaAplicableMensajeGuardadoExistoso", "", '0');
            loadingStop();
    });
}