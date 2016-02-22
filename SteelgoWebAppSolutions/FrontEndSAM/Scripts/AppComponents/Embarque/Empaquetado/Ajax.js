

//function AjaxEmbarqueCargaProveedores() {
    
//    loadingStart();

//    $Embarque.Embarque.read({ token: Cookies.get("token"), embarquePlanaID: EmbarquePlanaID }).done(function (data) {
//        if (data.length > 0) {
//            $("#inputProveedor").data("kendoComboBox").value("");
//            $("#inputProveedor").data("kendoComboBox").dataSource.data(data);
//            $("#inputProveedor").data("kendoComboBox").trigger("change");
//            AjaxCargarPaquetes();
//        } else {
//            $("#inputProveedor").data("kendoComboBox").value("");
//        };
//        loadingStop();
//    });
//}

//function AjaxCargarPlanasPlacas() {
//    loadingStart();
//    EmbarquePlanaID = 0;
//    $CargaEmbarque.CargaEmbarque.read({ token: Cookies.get("token"), transportistaID: $("#inputProveedor").val(), embarquePlanaID: EmbarquePlanaID, lenguaje: $("#language").val() }).done(function (data) {
//        if (data.length > 0) {
//            $("#inputEmbarqueEmpaquetadoPLacaPlana").data("kendoComboBox").value("");
//            $("#inputEmbarqueEmpaquetadoPLacaPlana").data("kendoComboBox").dataSource.data(data);

//        } else {

//            $("#inputEmbarqueEmpaquetadoPLacaPlana").data("kendoComboBox").value("");
//        };
//        loadingStop();
//    });
//}


function AjaxCargarPaquetes() {
    loadingStart();

    $CargaEmbarque.CargaEmbarque.read({ token: Cookies.get("token"), tipo: '1' }).done(function (data) {
        if (data.length > 0) {
            $("#inputPaquete").data("kendoComboBox").value("");
            $("#inputPaquete").data("kendoComboBox").dataSource.data(data);

            $("#inputPopupPaquete").data("kendoComboBox").value("");
            $("#inputPopupPaquete").data("kendoComboBox").dataSource.data(data);

        } else {
            $("#inputEmbarqueEmpaquetadoPLacaPlana").data("kendoComboBox").value("");
        };
        loadingStop();
    });
}

function AjaxAgregarCarga() {
    loadingStart();

    Captura = [];
    Captura[0] = { Detalles: "" };
    ListaDetalles = [];

    var index = 0;

    ListaDetalles[index] = { TipoConsulta: "", OrdenTrabajoSpoolID: "", Paquete: "", Codigo: "" };
    ListaDetalles[index].TipoConsulta = ObtenerTipoConsulta();
    switch (ListaDetalles[index].TipoConsulta) {
        case 1: //spool
            ListaDetalles[index].OrdenTrabajoSpoolID = $("#InputID").val();
            ListaDetalles[index].Paquete = 0;
            ListaDetalles[index].Codigo = 0;
            break;//paquete
        case 2:
            ListaDetalles[index].OrdenTrabajoSpoolID = 0;
            ListaDetalles[index].Paquete = $("#inputPaquete").val();
            ListaDetalles[index].Codigo = 0;
            break;
        case 3://codigo
            ListaDetalles[index].OrdenTrabajoSpoolID = 0;
            ListaDetalles[index].Paquete = 0;
            ListaDetalles[index].Codigo = $("#inputCodigo").val();
            break;
        case -1:
            ListaDetalles[index].OrdenTrabajoSpoolID = 0;
            ListaDetalles[index].Paquete = 0;
            ListaDetalles[index].Codigo = 0;
            break;

    }

    $CargaEmbarque.CargaEmbarque.read({ token: Cookies.get("token"), TipoConsulta: ListaDetalles[index].TipoConsulta, OrdenTrabajoSpoolID: ListaDetalles[index].OrdenTrabajoSpoolID, Paquete: ListaDetalles[index].Paquete, Codigo: ListaDetalles[index].Codigo, lenguaje: $("#language").val(), embarquePlanaID: EmbarquePlanaID }).done(function (data) {
        var bandera = true;
        if (ObtenerTipoConsulta() == 1) {
            if (data.length > 0) {
                if (data[0].EmbarquePaqueteID != 0) {
                    bandera = false;
                }
            }
        }
        if (bandera) {
            if (data.length > 0) {

                if (data[0].Mensaje == null) {
                    var ds = $("#grid").data("kendoGrid").dataSource;
                    var CantidadRegistrosOriginales = ds._data.length;
                    var array = data;
                    var totalToneladasCargadas = 0;
                    var totalToneladasCargadasGeneral = 0;


                    for (var i = 0; i < array.length; i++) {
                        if (!validarInformacion(array[i])) {
                            totalToneladasCargadas += array[i]["Peso"];
                            array[i]["Consecutivo"] += CantidadRegistrosOriginales;
                            ds.add(array[i]);
                        }
                        else
                            displayMessage("EmbarqueCargaInformacionExistente", "", '2');
                    }

                    var piezas = String(ds._data.length);
                    $("#lblEmbarqueEmpaquetadoTotalPiezas").text(piezas);

                    var textoToneladasCargadas = $("#lblEmbarqueEmpaquetadoToneladasCargadas").text();
                    totalToneladasCargadasGeneral = $("#lblEmbarqueEmpaquetadoToneladasCargadas").text() == "" ? 0 : parseInt($("#lblEmbarqueEmpaquetadoToneladasCargadas").text());
                    textoToneladasCargadas = String(parseFloat((totalToneladasCargadasGeneral + totalToneladasCargadas) * 0.001).toFixed(4));

                    $("#lblEmbarqueEmpaquetadoToneladasCargadas").text(textoToneladasCargadas);
                }
                else {
                    displayMessage("", data[0].Mensaje, '2');
                }
            }
        }
        else {
            displayMessage("", "El spool ya esta empaquetado en: " + data[0].Paquete, '2');
        }
        loadingStop();
    });
}

function ajaxCargarSpoolXPlaca() {
    loadingStart();
    $CargaEmbarque.CargaEmbarque.read({ token: Cookies.get("token"), placaID: $("#inputEmbarqueEmpaquetadoPLacaPlana").data("kendoComboBox").value(), proveedorID: $("#inputProveedor").data("kendoComboBox").value(), lenguaje: $("#language").val() }).done(function (data) {
        $("#grid").data('kendoGrid').dataSource.data([]);
        var ds = $("#grid").data("kendoGrid").dataSource;
        var CantidadRegistrosOriginales = ds._data.length;
        var array = data;
        var totalToneladasCargadas = 0;
        var totalToneladasCargadasGeneral = 0;


        for (var i = 0; i < array.length; i++) {
            if (!validarInformacion(array[i])) {
                totalToneladasCargadas += array[i]["Peso"];
                array[i]["Consecutivo"] += CantidadRegistrosOriginales;
                ds.add(array[i]);
            }
            else
                displayMessage("EmbarqueCargaInformacionExistente", "", '2');
        }

        var piezas = String(ds._data.length);
        $("#lblEmbarqueEmpaquetadoTotalPiezas").text(piezas);

        var textoToneladasCargadas = $("#lblEmbarqueEmpaquetadoToneladasCargadas").text();
        totalToneladasCargadasGeneral = 0;
        textoToneladasCargadas = String(parseFloat((totalToneladasCargadasGeneral + totalToneladasCargadas) * 0.001).toFixed(4));

        $("#lblEmbarqueEmpaquetadoToneladasCargadas").text(textoToneladasCargadas);

        loadingStop();
    });
}


function AjaxObtenerSpoolID() {
    $CapturaArmado.Armado.read({ ordenTrabajo: $("#InputOrdenTrabajo").val(), tipo: '1', token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
        $("#InputOrdenTrabajo").val(data.OrdenTrabajo);
        $("#InputID").data("kendoComboBox").dataSource.data(data.idStatus);
        Cookies.set("LetraProyecto", data.OrdenTrabajo.substring(0, 1), { path: '/' });
    });
}


function AjaxCargarCamposPredeterminados() {
    loadingStart();
    $ListadoCamposPredeterminados.ListadoCamposPredeterminados.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), id: 32 }).done(function (data) {
        if (data.toLowerCase() == "spool") {
            $('input:radio[name=EmbarqueEmpaquetadoTipoSeleccion]:nth(0)').attr('checked', true).trigger("change");
        } else if (data.toLowerCase() == "paquete") {
            $('input:radio[name=EmbarqueEmpaquetadoTipoSeleccion]:nth(1)').attr('checked', true).trigger("change");

        } else if (data.toLowerCase() == "codigo") {
            $('input:radio[name=EmbarqueEmpaquetadoTipoSeleccion]:nth(2)').attr('checked', true).trigger("change");
        }

        loadingStop();
    });

}

function ajaxGuardar(arregloCaptura, accion, paqueteID, tipoGuardar) {
    try {
        loadingStart();
        Captura = [];
        Captura[0] = { Detalles: "" };
        ListaDetalles = [];
        var indice = 0;

        if (arregloCaptura.Accion == undefined) {
            for (index = 0; index < arregloCaptura.length; index++) {
                if (arregloCaptura[index].Seleccionado) {
                    ListaDetalles[indice] = { Accion: "", SpoolID: "", CuadranteID: "" };
                    ListaDetalles[indice].Accion = arregloCaptura[index].EmbarquePaqueteID==0 ?1: arregloCaptura[index].Accion;
                    ListaDetalles[indice].SpoolID = arregloCaptura[index].SpoolID;
                    ListaDetalles[indice].CuadranteID = arregloCaptura[index].CuadranteID;
                    indice++;
                }
            }
        }
        else {
            ListaDetalles[indice] = { Accion: "", SpoolID: "", CuadranteID: "" };
            ListaDetalles[indice].Accion = accion == undefined ? arregloCaptura.Accion : accion;
            ListaDetalles[indice].SpoolID = arregloCaptura.SpoolID;
            ListaDetalles[indice].CuadranteID = arregloCaptura.CuadranteID;
        }

        Captura[0].Detalles = ListaDetalles;
        $CargaEmbarque.CargaEmbarque.create(Captura[0], { token: Cookies.get("token"), EmpaquetadoPaqueteID: paqueteID }).done(function (data) {
            if (data.Folio != "error") {

                if (tipoGuardar == 1) {
                    Limpiar();
                    displayMessage("EmbarqueCargaCrearPaquete", "", '1');
                }
                else if (tipoGuardar == 0) {
                    opcionHabilitarView(true, "FieldSetView");

                    for (index = 0; index < arregloCaptura.length; index++) {
                        if (arregloCaptura[index].Seleccionado) {
                            arregloCaptura[index].Paquete = data.Folio;
                            arregloCaptura[index].EmbarquePaqueteID = data.EmbarquePaqueteID;

                        }
                    }
                    AjaxCargarPaquetes();
                    $("#grid").data("kendoGrid").dataSource.sync();
                    displayMessage("EmbarqueCargaCrearPaquete", "", '1');
                }
                else {//actualizo el cuadrante
                        displayMessage("EmbarqueCargaCuadranteActualizado", "", '1');
                }
                

                
            }
            else if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] != "Ok") {
                displayMessage("EmbarqueCargaErrorCrearPaquete", "", '3');
            }

            $("#grid").data("kendoGrid").dataSource.sync();
            loadingStop();
        });


    } catch (e) {
        loadingStop();
        displayMessage("Mensajes_error", e.message, '0');

    }
};



function AjaxCargarCuadrante(area) {
    loadingStart();
    $Cuadrante.Cuadrante.read({ token: Cookies.get("token"), AreaID: area }).done(function (data) {
        $("#inputPopupCuadrante").data("kendoComboBox").value("");
        $("#inputPopupCuadrante").data("kendoComboBox").dataSource.data(data);
        loadingStop();
    });
}