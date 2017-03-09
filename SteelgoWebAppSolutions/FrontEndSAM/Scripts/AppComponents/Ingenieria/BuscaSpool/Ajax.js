
function AjaxTipoSalida() {


    //loadingStart();
    //console.log($CapturaReporteRT);
    $BuscaSpool.BuscaSpool.read({ token: Cookies.get("token") }).done(function (data) {
    //$Proyectos.Proyectos.read({ token: Cookies.get("token") }).done(function (data) {
        if (Error(data)) {
            currentTipoSalidaArray = data;
            //$("#inputProyecto").data("kendoComboBox").value("");
            //$("#inputProyecto").data("kendoComboBox").dataSource.data(data);
            
        }
        //loadingStop();
    });



}

function AjaxTipoCorte() {


    //loadingStart();
    //console.log($CapturaReporteRT);
    $BuscaSpool.BuscaSpool.read({ tkn: Cookies.get("token") }).done(function (data) {
        //$Proyectos.Proyectos.read({ token: Cookies.get("token") }).done(function (data) {
        if (Error(data)) {
            currentTipoCorteArray = data;
            //$("#inputProyecto").data("kendoComboBox").value("");
            //$("#inputProyecto").data("kendoComboBox").dataSource.data(data);

        }
        //loadingStop();
    });



}

function AjaxTipoJuntasCatalog() {

    loadingStart();
    $TipoJunta.TipoJunta.read({ token: Cookies.get("token") }).done(function (data) {
        if (Error(data)) {
            currentTipoJuntasArray = data;

        }
        loadingStop();
    });

}

function AjaxCedulaCatalog() {

    loadingStart();
    $Cedula.Cedula.read({ token: Cookies.get("token") }).done(function (data) {
        if (Error(data)) {
            currentCedulaArray = data;

        }
        loadingStop();
    });

}

function AjaxAceroCatalog() {

    loadingStart();
    $Acero.Acero.read({ token: Cookies.get("token") }).done(function (data) {
        if (Error(data)) {
            currentAceroArray = data;

        }
        loadingStop();
    });

}

function AjaxGetLoop(proyectoID, proyectoSpoolID, proyectoSoporteID, nombreLoop) {


    loadingStart();
    $BuscaSpool.BuscaSpool.read({ token: Cookies.get("token"), ProyectoID: proyectoID, ProyectoSpoolID: proyectoSpoolID, ProyectoSoporteID: proyectoSoporteID, NombreLoop: nombreLoop }).done(function (data) {

        if (Error(data)) {
            if (data != null && data != undefined) {
                if (data.LoopID == 0) {//No exite
                    //if (currentSpoolMaster.detalleSalidas != null) {
                    //    for (var i = 0; i < currentSpoolMaster.detalleSalidas.length; i++) {
                    //        if ($('#content_' + i).length > 0)
                    //            $('#content_' + i).remove();
                    //    }
                    //}
                    initSpoolMasterTotal();
                }
                else {//si existe el Loop
                    currentSpoolMaster = {
                        LoopID: data.LoopID,
                        UsuarioID: 0,
                        ProyectoID: data.ProyectoID,
                        ProyectoNombre: '',
                        NombreLoop: data.NombreLoop,
                        Dibujo: data.Dibujo,
                        PND: data.PND,
                        RequierePWHT: data.RequierePWHT,
                        RevisionCliente: 0,
                        RevisionSteelgo: '',
                        Acero1: '',
                        Acero2: '',
                        Especificacion: '',
                        PDI: 0.0,
                        SistemaPintura: '',
                        ColorPintura: '',

                        PinturaSistemaColor: [],

                        detalleSalidas: data.detalleSalidas
                    };

                    for (var i = 0; i < currentSpoolMaster.detalleSalidas.length; i++) {
                        currentSpoolMaster.detalleSalidas[i].SalidasEstandar = [];
                        currentSpoolMaster.detalleSalidas[i].SalidasJuntasCerradas = [];

                        if (!(currentSpoolMaster.Acero1.indexOf(currentSpoolMaster.detalleSalidas[i].Acero1) !== -1)) {
                            currentSpoolMaster.Acero1 += currentSpoolMaster.detalleSalidas[i].Acero1 + '/';
                        }
                        if (currentSpoolMaster.detalleSalidas[i].FamiliarAcero2ID != null) {
                            if (!(currentSpoolMaster.Acero2.indexOf(currentSpoolMaster.detalleSalidas[i].Acero2) !== -1)) {
                                currentSpoolMaster.Acero2 += currentSpoolMaster.detalleSalidas[i].Acero2 + '/';
                            }
                        }

                        if (!(currentSpoolMaster.Especificacion.indexOf(currentSpoolMaster.detalleSalidas[i].Especificacion) !== -1)) {
                            currentSpoolMaster.Especificacion += currentSpoolMaster.detalleSalidas[i].Especificacion + '/';
                        }

                        if (currentSpoolMaster.detalleSalidas[i].PDI != 0) {
                            currentSpoolMaster.PDI += currentSpoolMaster.detalleSalidas[i].PDI;
                        }

                        AddPinturaSistemaColor(currentSpoolMaster.detalleSalidas[i].SistemaPintura, currentSpoolMaster.detalleSalidas[i].ColorPintura);

                        for (var j = 0; j < currentSpoolMaster.detalleSalidas[i].detalleAgrupadoSalidas.length; j++) {

                            var newData = {
                                Salidas_AgrupadoID: currentSpoolMaster.detalleSalidas[i].detalleAgrupadoSalidas[j].Salidas_AgrupadoID,
                                Detalle_SalidasID: currentSpoolMaster.detalleSalidas[i].detalleAgrupadoSalidas[j].Detalle_SalidasID,
                                SpoolID: currentSpoolMaster.detalleSalidas[i].SpoolID,
                                PosicionSalida: currentSpoolMaster.detalleSalidas[i].detalleAgrupadoSalidas[j].PosicionSalida,
                                ClaveSalida: currentSpoolMaster.detalleSalidas[i].detalleAgrupadoSalidas[j].ClaveSalida,
                                TipoSalidaID: currentSpoolMaster.detalleSalidas[i].detalleAgrupadoSalidas[j].TipoSalidaID,
                                TipoSalida: currentSpoolMaster.detalleSalidas[i].detalleAgrupadoSalidas[j].TipoSalida,
                                TipoSalidaLista: currentSpoolMaster.detalleSalidas[i].detalleAgrupadoSalidas[j].TipoSalidaLista,
                                DetalleMaterialSpoolID: currentSpoolMaster.detalleSalidas[i].detalleAgrupadoSalidas[j].MaterialSpoolID,
                                DetalleMaterialSpool: currentSpoolMaster.detalleSalidas[i].detalleAgrupadoSalidas[j].ItemCode,
                                DetalleMaterialSpoolLista: currentSpoolMaster.detalleSalidas[i].detalleAgrupadoSalidas[j].DetalleMaterialSpoolLista,
                                SpoolItemCodeID: currentSpoolMaster.detalleSalidas[i].detalleAgrupadoSalidas[j].SpoolItemCodeID,
                                SpoolItemCode: currentSpoolMaster.detalleSalidas[i].detalleAgrupadoSalidas[j].SpoolItemCode,
                                SpoolItemCodeLista: currentSpoolMaster.detalleSalidas[i].detalleAgrupadoSalidas[j].SpoolItemCodeLista,
                                ItemCodeSelect: currentSpoolMaster.detalleSalidas[i].detalleAgrupadoSalidas[j].SpoolItemCode,
                                DetalleJuntaSpoolID: currentSpoolMaster.detalleSalidas[i].detalleAgrupadoSalidas[j].JuntaSpoolID,
                                DetalleJuntaSpool: currentSpoolMaster.detalleSalidas[i].detalleAgrupadoSalidas[j].Etiqueta,
                                DetalleJuntaSpoolLista: currentSpoolMaster.detalleSalidas[i].detalleAgrupadoSalidas[j].DetalleJuntaSpoolLista,
                                Nivel: currentSpoolMaster.detalleSalidas[i].detalleAgrupadoSalidas[j].Nivel,
                                PosicionSalidaPadre: currentSpoolMaster.detalleSalidas[i].detalleAgrupadoSalidas[j].PosicionSalidaPadre,
                                ClaveSalidaPadre: currentSpoolMaster.detalleSalidas[i].detalleAgrupadoSalidas[j].ClaveSalidaPadre,
                                Salidas_AgrupadoID_Padre: currentSpoolMaster.detalleSalidas[i].detalleAgrupadoSalidas[j].Salidas_AgrupadoID_Padre,

                                TipoJuntaID: currentSpoolMaster.detalleSalidas[i].detalleAgrupadoSalidas[j].TipoJuntaID,
                                TipoJunta: currentSpoolMaster.detalleSalidas[i].detalleAgrupadoSalidas[j].TipoJunta,
                                Cedula: currentSpoolMaster.detalleSalidas[i].detalleAgrupadoSalidas[j].Cedula,
                                FamiliaAceroMaterial1ID: currentSpoolMaster.detalleSalidas[i].detalleAgrupadoSalidas[j].FamiliaAceroMaterial1ID,
                                FamiliaAceroMaterial1: currentSpoolMaster.detalleSalidas[i].detalleAgrupadoSalidas[j].FamiliaAceroMaterial1,
                                FamiliaAceroMaterial2ID: currentSpoolMaster.detalleSalidas[i].detalleAgrupadoSalidas[j].FamiliaAceroMaterial2ID,
                                FamiliaAceroMaterial2: currentSpoolMaster.detalleSalidas[i].detalleAgrupadoSalidas[j].FamiliaAceroMaterial2,
                                Diametro: currentSpoolMaster.detalleSalidas[i].detalleAgrupadoSalidas[j].Diametro,

                                TipoCorte1ID: currentSpoolMaster.detalleSalidas[i].detalleAgrupadoSalidas[j].TipoCorte1ID,
                                TipoCorte1: currentSpoolMaster.detalleSalidas[i].detalleAgrupadoSalidas[j].TipoCorte1,
                                TipoCorte1Lista: currentSpoolMaster.detalleSalidas[i].detalleAgrupadoSalidas[j].TipoCorte1Lista,
                                TipoCorte2ID: currentSpoolMaster.detalleSalidas[i].detalleAgrupadoSalidas[j].TipoCorte2ID,
                                TipoCorte2: currentSpoolMaster.detalleSalidas[i].detalleAgrupadoSalidas[j].TipoCorte2,
                                TipoCorte2Lista: currentSpoolMaster.detalleSalidas[i].detalleAgrupadoSalidas[j].TipoCorte2Lista,
                                Cantidad: currentSpoolMaster.detalleSalidas[i].detalleAgrupadoSalidas[j].Cantidad

                            };
                            if (currentSpoolMaster.detalleSalidas[i].detalleAgrupadoSalidas[j].ClaveSalida.match('^JC')) {
                                currentSpoolMaster.detalleSalidas[i].SalidasJuntasCerradas[currentSpoolMaster.detalleSalidas[i].SalidasJuntasCerradas.length] = newData;

                                //currentSpoolMaster.detalleSalidas[i].detalleAgrupadoSalidas[j];
                                //currentSpoolMaster.detalleSalidas[i].SalidasJuntasCerradas[currentSpoolMaster.detalleSalidas[i].SalidasJuntasCerradas.length].DetalleMaterialSpoolID = 0;
                            }
                            else {
                                currentSpoolMaster.detalleSalidas[i].SalidasEstandar[currentSpoolMaster.detalleSalidas[i].SalidasEstandar.length] = newData;
                                //currentSpoolMaster.detalleSalidas[i].SalidasEstandar[currentSpoolMaster.detalleSalidas[i].SalidasEstandar.length].DetalleMaterialSpoolID = 0;
                            }

                        }
                    }

                    $("#inputNombreLoop").val(currentSpoolMaster.NombreLoop);
                    $("#inputDibujo").val(currentSpoolMaster.Dibujo);
                    $("#inputPND").val(currentSpoolMaster.PND);
                    $('#inputRequierePWHT:checked').val(currentSpoolMaster.RequierePWHT);

                    reloadControls();
                    reCalculaReglas();

                }
            }
            
        }
        loadingStop();
    });

}

function AjaxDetalleSpoolXNombre(posicion, proyectoID, nombreSpool) {
    loadingStart();
    //console.log($CapturaReporteRT);
    $BuscaSpool.BuscaSpool.read({ token: Cookies.get("token"), ProyectoID: proyectoID, Spool: nombreSpool }).done(function (data) {
        if (data != null) {
            //if (proyectoID == data.ProyectoID) {
                currentSpoolMaster.detalleSalidas[posicion].SpoolID = data.SpoolID;
                currentSpoolMaster.detalleSalidas[posicion].NombreSpool = data.NombreSpool;
                currentSpoolMaster.detalleSalidas[posicion].RevisionCliente = data.RevisionCliente;
                currentSpoolMaster.detalleSalidas[posicion].RevisionSteelgo = data.RevisionSteelgo;
                currentSpoolMaster.detalleSalidas[posicion].Especificacion = data.Especificacion;
                currentSpoolMaster.detalleSalidas[posicion].FamiliaAcero1ID = data.FamiliaAcero1ID;
                currentSpoolMaster.detalleSalidas[posicion].Acero1 = data.Acero1;
                currentSpoolMaster.detalleSalidas[posicion].FamiliaAcero2ID = data.FamiliaAcero2ID;
                currentSpoolMaster.detalleSalidas[posicion].Acero2 = data.Acero2;
                currentSpoolMaster.detalleSalidas[posicion].SistemaPintura = data.SistemaPintura;
                currentSpoolMaster.detalleSalidas[posicion].ColorPintura = data.ColorPintura;
                currentSpoolMaster.detalleSalidas[posicion].PDI = data.PDI;

                if (!(currentSpoolMaster.Acero1.indexOf(data.Acero1) !== -1)) {
                    currentSpoolMaster.Acero1 += data.Acero1 + '/';
                }
                if (data.FamiliarAcero2ID != null) {
                    if (!(currentSpoolMaster.Acero2.indexOf(data.Acero2) !== -1)) {
                        currentSpoolMaster.Acero2 += data.Acero2 + '/';
                    }
                }

                if (!(currentSpoolMaster.Especificacion.indexOf(data.Especificacion) !== -1)) {
                    currentSpoolMaster.Especificacion += data.Especificacion + '/';
                }

                if (data.PDI != 0) {
                    currentSpoolMaster.PDI += data.PDI;
                }

                AddPinturaSistemaColor(data.SistemaPintura, data.ColorPintura);

                //if (!(currentSpoolMaster.SistemaPintura.indexOf(data.SistemaPintura) !== -1)) {
                //    currentSpoolMaster.SistemaPintura += data.SistemaPintura + '/';
                //}
                //if (!(currentSpoolMaster.ColorPintura.indexOf(data.ColorPintura) !== -1)) {
                //    currentSpoolMaster.ColorPintura += data.ColorPintura + '/';
                //}
                reCalculaReglas();

                //AjaxListadoJuntaSpool(posicion, data.SpoolID);
                AjaxDetalleMateriales(posicion, proyectoID, data.SpoolID);
            //} else
            //    displayNotify("", "El spool" + data.NombreSpool + " no pertenece al proyecto configurado", "2");


        }
        else
            displayNotify('El spool ' + nombreSpool + ', no existe');
        loadingStop();
    });
}

function AjaxDetalleMateriales(posicion, proyectoID, spoolID) {


    loadingStart();
    $BuscaSpool.BuscaSpool.read({ token: Cookies.get("token"), Spool: spoolID }).done(function (data) {

        if (Error(data)) {
            //$("#gridPopUp").data("kendoGrid").dataSource.data(data);


            //VentanaModalDetallePlaca2();
            
            AjaxListadoSpool(posicion, proyectoID, spoolID, data);
        }
        loadingStop();
    });

}

//Obtiene la lista del Spool-IC
function AjaxListadoSpool(posicion, proyectoID, spoolID, detalleMaterialesSpool) {
    loadingStart();

    var Proyecto = $("#inputProyecto").data("kendoComboBox").dataItem($("#inputProyecto").data("kendoComboBox").select());

    $BuscaSpool.BuscaSpool.read({ token: Cookies.get("token"), ProyectoID: Proyecto.ProyectoSpoolID, SpoolContiene: currentSpoolMaster.detalleSalidas[posicion].NombreSpool.substring(0, 5) }).done(function (data) {
        if (Error(data)) {

            //AjaxListadoJuntaSpool(posicion, proyectoID, spoolID, detalleMaterialesSpool, data);
            AjaxListadoSoportes(posicion, proyectoID, spoolID, detalleMaterialesSpool, data);
        }
        loadingStop();
    });

}

function AjaxListadoSoportes(posicion, proyectoID, spoolID, detalleMaterialesSpool, detalleListadoSpool) {
    loadingStart();

    var Proyecto = $("#inputProyecto").data("kendoComboBox").dataItem($("#inputProyecto").data("kendoComboBox").select());

    $BuscaSpool.BuscaSpool.read({ token: Cookies.get("token"), ProyectoID: Proyecto.ProyectoSoporteID, SpoolContiene: currentSpoolMaster.detalleSalidas[posicion].NombreSpool.substring(0, 5) }).done(function (data) {
        if (Error(data)) {
            data[data.length] = {
                SpoolID: -1,
                Nombre: 'Tubo'
            };
            //AjaxListadoJuntaSpool(posicion, proyectoID, spoolID, detalleMaterialesSpool, detalleListadoSpool, data);
            AjaxListadoItemCode(posicion, proyectoID, spoolID, detalleMaterialesSpool, detalleListadoSpool, data);
        }
        loadingStop();
    });

}

function AjaxListadoItemCode(posicion, proyectoID, spoolID, detalleMaterialesSpool, detalleListadoSpool, detalleListadoSoportes) {
    loadingStart();

    var Proyecto = $("#inputProyecto").data("kendoComboBox").dataItem($("#inputProyecto").data("kendoComboBox").select());

    //$BuscaSpool.BuscaSpool.read({ token: Cookies.get("token"), ProyectoID: Proyecto.ProyectoSpoolID, SpoolContiene: currentSpoolMaster.detalleSalidas[posicion].NombreSpool.substring(0, 5) }).done(function (data) {
    $BuscaSpool.BuscaSpool.read({ token: Cookies.get("token"), Spool: spoolID }).done(function (data) {
        if (Error(data)) {

            AjaxListadoJuntaSpool(posicion, proyectoID, spoolID, detalleMaterialesSpool, detalleListadoSpool, detalleListadoSoportes, data);
        }
        loadingStop();
    });

}

function AjaxListadoJuntaSpool(posicion, proyectoID, spoolID, detalleMaterialesSpool, detalleListadoSpool, detalleListadoSoportes, detalleListadoItemCodes) {


    loadingStart();
    $BuscaSpool.BuscaSpool.read({ token: Cookies.get("token"), SpoolID: spoolID }).done(function (data) {

        if (Error(data)) {
            
            var salidas = $("#inputSalidas_" + posicion).data("kendoNumericTextBox").value();
            var salidasJuntasCerradas = $("#inputJuntasCerradas_" + posicion).data("kendoNumericTextBox").value();

            data[data.length] = {
                JuntaSpoolID: -1,
                Etiqueta: 'Agregar'
            };

            addNewDetalleSalidaAgrupado(currentSpoolMaster.detalleSalidas[posicion].SpoolID, salidas, salidasJuntasCerradas, detalleMaterialesSpool, detalleListadoSpool, detalleListadoSoportes, detalleListadoItemCodes, data);

            RenderGridRowsDynamic();
        }
        loadingStop();
    });

}

function AjaxDetalleJunta(posicion, posicionSalida, claveSalida, juntaSpoolID) {
    loadingStart();

    $BuscaSpool.BuscaSpool.read({ token: Cookies.get("token"), JuntaSpoolID: juntaSpoolID }).done(function (data) {
        if (Error(data)) {

            if (data.length == 1) {                

                
                //currentSpoolMaster.PDI += data[0].Diametro;//¿Porque al PDI del spool le incrementas el valor del diametro de la junta?
                reCalculaReglas();

                if (claveSalida =='JC') {
                    currentSpoolMaster.detalleSalidas[posicion].SalidasJuntasCerradas[posicionSalida].TipoJuntaID = data[0].TipoJuntaID;
                    currentSpoolMaster.detalleSalidas[posicion].SalidasJuntasCerradas[posicionSalida].TipoJunta = data[0].TipoJunta;
                    currentSpoolMaster.detalleSalidas[posicion].SalidasJuntasCerradas[posicionSalida].Cedula = data[0].Cedula;
                    currentSpoolMaster.detalleSalidas[posicion].SalidasJuntasCerradas[posicionSalida].FamiliaAceroMaterial1ID = data[0].FamiliaAceroMaterial1ID;
                    currentSpoolMaster.detalleSalidas[posicion].SalidasJuntasCerradas[posicionSalida].FamiliaAceroMaterial1 = data[0].FamiliaAceroMaterial1;
                    currentSpoolMaster.detalleSalidas[posicion].SalidasJuntasCerradas[posicionSalida].FamiliaAceroMaterial2ID = data[0].FamiliaAceroMaterial2ID;
                    currentSpoolMaster.detalleSalidas[posicion].SalidasJuntasCerradas[posicionSalida].FamiliaAceroMaterial2 = data[0].FamiliaAceroMaterial2;
                    currentSpoolMaster.detalleSalidas[posicion].SalidasJuntasCerradas[posicionSalida].Diametro = data[0].Diametro;
                }
                else {
                    currentSpoolMaster.detalleSalidas[posicion].SalidasEstandar[posicionSalida].TipoJuntaID = data[0].TipoJuntaID;
                    currentSpoolMaster.detalleSalidas[posicion].SalidasEstandar[posicionSalida].TipoJunta = data[0].TipoJunta;
                    currentSpoolMaster.detalleSalidas[posicion].SalidasEstandar[posicionSalida].Cedula = data[0].TipoJunta;
                    currentSpoolMaster.detalleSalidas[posicion].SalidasEstandar[posicionSalida].FamiliaAceroMaterial1ID = data[0].FamiliaAceroMaterial1ID;
                    currentSpoolMaster.detalleSalidas[posicion].SalidasEstandar[posicionSalida].FamiliaAceroMaterial1 = data[0].FamiliaAceroMaterial1;
                    currentSpoolMaster.detalleSalidas[posicion].SalidasEstandar[posicionSalida].FamiliaAceroMaterial2ID = data[0].FamiliaAceroMaterial2ID;
                    currentSpoolMaster.detalleSalidas[posicion].SalidasEstandar[posicionSalida].FamiliaAceroMaterial2 = data[0].FamiliaAceroMaterial2;
                    currentSpoolMaster.detalleSalidas[posicion].SalidasEstandar[posicionSalida].Diametro = data[0].Diametro;
                }

                if (claveSalida == 'JC')
                    posicionSalida += currentSpoolMaster.detalleSalidas[posicion].SalidasEstandar.length;

                $("#grid_" + posicion).data("kendoGrid").dataSource._data[posicionSalida].TipoJuntaID = data[0].TipoJuntaID;
                $("#grid_" + posicion).data("kendoGrid").dataSource._data[posicionSalida].TipoJunta = data[0].TipoJunta;
                $("#grid_" + posicion).data("kendoGrid").dataSource._data[posicionSalida].Cedula = data[0].Cedula;
                $("#grid_" + posicion).data("kendoGrid").dataSource._data[posicionSalida].FamiliaAceroMaterial1ID = data[0].FamiliaAceroMaterial1ID;
                $("#grid_" + posicion).data("kendoGrid").dataSource._data[posicionSalida].FamiliaAceroMaterial1 = data[0].FamiliaAceroMaterial1;
                $("#grid_" + posicion).data("kendoGrid").dataSource._data[posicionSalida].FamiliaAceroMaterial2ID = data[0].FamiliaAceroMaterial2ID;
                $("#grid_" + posicion).data("kendoGrid").dataSource._data[posicionSalida].FamiliaAceroMaterial2 = data[0].FamiliaAceroMaterial2;
                $("#grid_" + posicion).data("kendoGrid").dataSource._data[posicionSalida].Diametro = data[0].Diametro;

                $("#grid_" + posicion).data("kendoGrid").refresh();
            }
        }
        loadingStop();
    });

}

function AjaxProyecto() {
    loadingStart();
    $Proyectos.Proyectos.read({ tkn: Cookies.get("token") }).done(function (data) {
        if (Error(data)) {
            var proyectoId = 0;
            $("#inputProyecto").data("kendoComboBox").dataSource.data([]);

            if (data.length > 0) {
                $("#inputProyecto").data("kendoComboBox").dataSource.data(data);
                if (data.length == 2) {
                    for (var x = 0; x < data.length; x++) {
                        if (data[x].ProyectoID != 0)
                            proyectoId = data[x].ProyectoID;
                    }
                }

                $("#inputProyecto").data("kendoComboBox").value(proyectoId);
                $("#inputProyecto").data("kendoComboBox").trigger("change");
            }
        }
        loadingStop();
    });
}

function AjaxProveedor(proyectoID, patioID) {
    loadingStart();
    //console.log($CapturaReporteRT);
    $ReporteRT.ReporteRT.read({ token: Cookies.get("token"), proyectoID: proyectoID, patioID: patioID }).done(function (data) {
        //$Almacenaje.Almacenaje.read({ token: Cookies.get("token") }).done(function (data) {
        if (Error(data)) {

            //var data = null;
            //data = [{ ProveedorID: 1, Nombre: 'Juan 1.1' }, { ProveedorID: 2, Nombre: 'Juan 1.2' }, { ProveedorID: 3, Nombre: 'Juan 1.3' }];

            $("#inputProveedor").data("kendoComboBox").value("");
            $("#inputProveedor").data("kendoComboBox").dataSource.data(data);

            //if (data.length == 2) {
                $("#inputProveedor").data("kendoComboBox").select(1);
                AjaxRequisicion($("#inputProyecto").data("kendoComboBox").value(), data[1].ProveedorID)
            //}
            //else
            //    ajaxResultadosDetalle($("#inputProyecto").data("kendoComboBox").value(), $("#inputProveedor").data("kendoComboBox").value(), $("#inputRequisicion").data("kendoComboBox").value());
        }
        loadingStop();
    });

}

function AjaxPruebas(ProyectoID) {
    //if ($("#inputProyecto").val() != "") {
    loadingStart();
    $ReporteRT.ReporteRT.read({ token: Cookies.get("token"), proyectoID: ProyectoID, x: $("#language").val(), y: "" }).done(function (data) {
        var tipoPruebaID = 0;
        $("#inputPrueba").data("kendoComboBox").dataSource.data([]);
        $("#inputPrueba").data("kendoComboBox").dataSource.data(data);
    });
    //}
};

function AjaxRequisicion(proyectoID, proveedorID) {
    loadingStart();
    //console.log($CapturaReporteRT);
    $ReporteRT.ReporteRT.read({ token: Cookies.get("token"), proyectoID: proyectoID, proveedorID: proveedorID, distinct: 0 }).done(function (data) {
        //$Almacenaje.Almacenaje.read({ token: Cookies.get("token") }).done(function (data) {
        if (Error(data)) {

            //var data = null;
            //data = [{ RequisicionID: 1, Folio: 'Folio 1', FuenteID: 1, TurnoID: 1 }, { RequisicionID: 2, Folio: 'Folio 2', FuenteID: 2, TurnoID: 2 }, { RequisicionID: 3, Folio: 'Folio 3', FuenteID: 2, TurnoID: 3 }, { RequisicionID: 4, Folio: 'Folio 4', FuenteID: 1, TurnoID: '' }];

            $("#inputRequisicion").data("kendoComboBox").value("");
            $("#inputRequisicion").data("kendoComboBox").dataSource.data(data);

            //if (data.length == 2) {
                $("#inputRequisicion").data("kendoComboBox").select(1);

                $("#inputFuente").data("kendoComboBox").value(data[1].FuenteID);
                $("#inputTurno").data("kendoComboBox").value(data[1].TurnoID);
                $("#inputPrueba").data("kendoComboBox").value(data[1].TipoPruebaID);
            //}

                $("#btnAgregar").trigger("click");
            //ajaxResultadosDetalle($("#inputProyecto").data("kendoComboBox").value(), $("#inputProveedor").data("kendoComboBox").value(), $("#inputRequisicion").data("kendoComboBox").value());

        }
        loadingStop();
    });

}

function AjaxFuente() {//Equipo
    loadingStart();
    //console.log($CapturaReporteRT);
    $ReporteRT.ReporteRT.read({ token: Cookies.get("token"), lenguaje: "es-MX", x: "" }).done(function (data) {
        //$Almacenaje.Almacenaje.read({ token: Cookies.get("token") }).done(function (data) {
        if (Error(data)) {
            //var data = [{ FuenteID: 1, Fuente: 'Fuente 1' }, { FuenteID: 2, Fuente: 'Fuente 2' }, { FuenteID: 3, Fuente: 'Fuente 3' }];
            $("#inputFuente").data("kendoComboBox").value("");
            $("#inputFuente").data("kendoComboBox").dataSource.data(data);
        }
        loadingStop();
    });

}

function AjaxTurno() {
    loadingStart();
    //console.log($CapturaReporteRT);
    $ReporteRT.ReporteRT.read({ token: Cookies.get("token"), tipoPruebaID: 1, proveedorID: 0, equipoID: 1, lenguaje: "es-MX" }).done(function (data) {
        //$Almacenaje.Almacenaje.read({ token: Cookies.get("token") }).done(function (data) {
        if (Error(data)) {
            //var data = [{ TurnoID: 1, Turno: 'Turno 1' }, { TurnoID: 2, Turno: 'Turno 2' }, { TurnoID: 3, Turno: 'Turno 3' }, { TurnoID: 4, Turno: 'Turno 4' }];
            $("#inputTurno").data("kendoComboBox").value("");
            $("#inputTurno").data("kendoComboBox").dataSource.data(data);
        }
        loadingStop();
    });

}

function ajaxResultadosDetalle(proyectoID, proveedorID, requisicionID) {
    loadingStart();

    $ValidacionRT.ValidacionRT.read({ token: Cookies.get("token"), proyectoID: (($("#inputProyecto").data("kendoComboBox").value() != "") ? ($("#inputProyecto").data("kendoComboBox").value()) : (0)), tipoPruebaID: (($("#inputPrueba").data("kendoComboBox").value() != "") ? ($("#inputPrueba").data("kendoComboBox").value()) : (0)), proveedorID: (($("#inputProveedor").data("kendoComboBox").value() != "") ? ($("#inputProveedor").data("kendoComboBox").value()) : (0)), requisicionID: (($("#inputRequisicion").data("kendoComboBox").value() != "") ? ($("#inputRequisicion").data("kendoComboBox").value()) : (0)), equipoID: (($("#inputFuente").data("kendoComboBox").value() != "") ? ($("#inputFuente").data("kendoComboBox").value()) : (0)), turnoID: (($("#inputTurno").data("kendoComboBox").value() != "") ? ($("#inputTurno").data("kendoComboBox").value()) : (0)), lenguaje: $("#language").val() }).done(function (data) {
        if (Error(data)) {
            $("#grid").data('kendoGrid').dataSource.data([]);
            var ds = $("#grid").data("kendoGrid").dataSource;
            for (var i = 0; i < data.length; i++) {
                ds.add(data[i]);
            }
        }
        loadingStop();
    });
}

function AjaxGuardarCaptura(guardarYNuevo) {

    currentSpoolMaster.ProyectoID = $("#inputProyecto").data("kendoComboBox").dataItem($("#inputProyecto").data("kendoComboBox").select()).ProyectoID;
    currentSpoolMaster.NombreLoop = $("#inputNombreLoop").val();
    currentSpoolMaster.Dibujo = $("#inputDibujo").val();
    currentSpoolMaster.PND = $("#inputPND").val();
    currentSpoolMaster.RequierePWHT = $('#inputRequierePWHT:checked').val();

    if (currentSpoolMaster.detalleSalidas.length > 0) {
        var Captura = [];
        Captura[0] = {
            LoopID: currentSpoolMaster.LoopID,
            ProyectoID: currentSpoolMaster.ProyectoID,
            NombreLoop: currentSpoolMaster.NombreLoop,
            Dibujo: currentSpoolMaster.Dibujo,
            PND: currentSpoolMaster.PND,
            RequierePWHT: currentSpoolMaster.RequierePWHT,

            detalleSalidas: []
        };
        //var listaDetalles = [];

        for (var i = 0; i < currentSpoolMaster.detalleSalidas.length; i++) {
            Captura[0].detalleSalidas[i] = {
                Detalle_SalidasID: currentSpoolMaster.detalleSalidas[i].Detalle_SalidasID,
                LoopID: currentSpoolMaster.LoopID,
                SpoolID: currentSpoolMaster.detalleSalidas[i].SpoolID,
                Posicion: currentSpoolMaster.detalleSalidas[i].Posicion,//Falta en base
                RevisionSteelgo: currentSpoolMaster.detalleSalidas[i].RevisionSteelgo,
                RevisionCliente: currentSpoolMaster.detalleSalidas[i].RevisionCliente,
                FamiliaAcero1ID: currentSpoolMaster.detalleSalidas[i].FamiliaAcero1ID,
                FamiliaAcero2ID: currentSpoolMaster.detalleSalidas[i].FamiliaAcero2ID,//No se que poner
                Especificacion: currentSpoolMaster.detalleSalidas[i].Especificacion,
                PDI: currentSpoolMaster.detalleSalidas[i].PDI,
                SistemaPintura: currentSpoolMaster.detalleSalidas[i].SistemaPintura,
                ColorPintura: currentSpoolMaster.detalleSalidas[i].ColorPintura,

                detalleAgrupadoSalidas: []
            };
            for (var j = 0; j < currentSpoolMaster.detalleSalidas[i].SalidasEstandar.length; j++) {
                Captura[0].detalleSalidas[i].detalleAgrupadoSalidas[j] = {
                    Salidas_AgrupadoID: currentSpoolMaster.detalleSalidas[i].SalidasEstandar[j].Salidas_AgrupadoID,
                    Detalle_SalidasID: currentSpoolMaster.detalleSalidas[i].SalidasEstandar[j].Detalle_SalidasID,
                    SpoolID: currentSpoolMaster.detalleSalidas[i].SpoolID,
                    TipoSalidaID: currentSpoolMaster.detalleSalidas[i].SalidasEstandar[j].TipoSalidaID,
                    Nivel: currentSpoolMaster.detalleSalidas[i].SalidasEstandar[j].Nivel,
                    ClaveSalida: currentSpoolMaster.detalleSalidas[i].SalidasEstandar[j].ClaveSalida,
                    PosicionSalida: currentSpoolMaster.detalleSalidas[i].SalidasEstandar[j].PosicionSalida,
                    PosicionSalidaPadre: currentSpoolMaster.detalleSalidas[i].Posicion,
                    ClaveSalidaPadre: '',
                    MaterialSpoolID: currentSpoolMaster.detalleSalidas[i].SalidasEstandar[j].DetalleMaterialSpoolID,
                    SpoolItemCodeID: currentSpoolMaster.detalleSalidas[i].SalidasEstandar[j].SpoolItemCodeID,
                    JuntaSpoolID: currentSpoolMaster.detalleSalidas[i].SalidasEstandar[j].DetalleJuntaSpoolID,
                    TipoJuntaID: currentSpoolMaster.detalleSalidas[i].SalidasEstandar[j].TipoJuntaID,
                    Cedula: currentSpoolMaster.detalleSalidas[i].SalidasEstandar[j].Cedula,
                    FamiliaAceroMaterial1ID: currentSpoolMaster.detalleSalidas[i].SalidasEstandar[j].FamiliaAceroMaterial1ID,
                    FamiliaAceroMaterial2ID: currentSpoolMaster.detalleSalidas[i].SalidasEstandar[j].FamiliaAceroMaterial2ID,
                    Diametro: currentSpoolMaster.detalleSalidas[i].SalidasEstandar[j].Diametro,
                    TipoCorte1ID: currentSpoolMaster.detalleSalidas[i].SalidasEstandar[j].TipoCorte1ID,
                    TipoCorte2ID: currentSpoolMaster.detalleSalidas[i].SalidasEstandar[j].TipoCorte2ID,
                    Cantidad: currentSpoolMaster.detalleSalidas[i].SalidasEstandar[j].Cantidad,

                    //ItemCodeSelect: '',
                    
                };
            }

            for (var j = 0; j < currentSpoolMaster.detalleSalidas[i].SalidasJuntasCerradas.length; j++) {
                Captura[0].detalleSalidas[i].detalleAgrupadoSalidas[j + currentSpoolMaster.detalleSalidas[i].SalidasEstandar.length] = {
                    Salidas_AgrupadoID: currentSpoolMaster.detalleSalidas[i].SalidasJuntasCerradas[j].Salidas_AgrupadoID,
                    Detalle_SalidasID: currentSpoolMaster.detalleSalidas[i].SalidasJuntasCerradas[j].Detalle_SalidasID,
                    SpoolID: currentSpoolMaster.detalleSalidas[i].SpoolID,
                    TipoSalidaID: currentSpoolMaster.detalleSalidas[i].SalidasJuntasCerradas[j].TipoSalidaID,
                    Nivel: currentSpoolMaster.detalleSalidas[i].SalidasJuntasCerradas[j].Nivel,
                    ClaveSalida: currentSpoolMaster.detalleSalidas[i].SalidasJuntasCerradas[j].ClaveSalida,
                    PosicionSalida: currentSpoolMaster.detalleSalidas[i].SalidasJuntasCerradas[j].PosicionSalida,
                    PosicionSalidaPadre: currentSpoolMaster.detalleSalidas[i].Posicion,
                    ClaveSalidaPadre: '',
                    MaterialSpoolID: currentSpoolMaster.detalleSalidas[i].SalidasJuntasCerradas[j].DetalleMaterialSpoolID,
                    SpoolItemCodeID: currentSpoolMaster.detalleSalidas[i].SalidasJuntasCerradas[j].SpoolItemCodeID,
                    JuntaSpoolID: currentSpoolMaster.detalleSalidas[i].SalidasJuntasCerradas[j].DetalleJuntaSpoolID,
                    TipoJuntaID: currentSpoolMaster.detalleSalidas[i].SalidasJuntasCerradas[j].TipoJuntaID,
                    Cedula: currentSpoolMaster.detalleSalidas[i].SalidasJuntasCerradas[j].Cedula,
                    FamiliaAceroMaterial1ID: currentSpoolMaster.detalleSalidas[i].SalidasJuntasCerradas[j].FamiliaAceroMaterial1ID,
                    FamiliaAceroMaterial2ID: currentSpoolMaster.detalleSalidas[i].SalidasJuntasCerradas[j].FamiliaAceroMaterial2ID,
                    Diametro: currentSpoolMaster.detalleSalidas[i].SalidasJuntasCerradas[j].Diametro,
                    TipoCorte1ID: currentSpoolMaster.detalleSalidas[i].SalidasJuntasCerradas[j].TipoCorte1ID,
                    TipoCorte2ID: currentSpoolMaster.detalleSalidas[i].SalidasJuntasCerradas[j].TipoCorte2ID,
                    Cantidad: currentSpoolMaster.detalleSalidas[i].SalidasJuntasCerradas[j].Cantidad,

                    //ItemCodeSelect: '',

                };
            }
        }

        
        $BuscaSpool.BuscaSpool.create(Captura[0], { token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
            if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "Ok") {
                //buscaLoop();
                if (guardarYNuevo) {
                    //cleanView();
                    for (var i = 0; i < currentSpoolMaster.detalleSalidas.length; i++) {
                        if ($('#content_' + i).length > 0)
                            $('#content_' + i).remove();
                    }
                    initSpoolMasterTotal();

                    $("#inputNombreLoop").val('');
                    $("#inputDibujo").val('');
                    $("#inputPND").val('');
                    $('#inputRequierePWHT:checked').val(false);

                    reloadControls();
                    reCalculaReglas();

                } else {

                    //AjaxObtieneDetalleRequisicion();
                    //ajaxResultadosDetalle($("#inputProyecto").data("kendoComboBox").value(), $("#inputProveedor").data("kendoComboBox").value(), $("#inputRequisicion").data("kendoComboBox").value());
                    buscaLoop();
                    //disableEnableView(true);
                }

                displayNotify("EntregaPlacasGraficasMensajeGuardadoExistoso", "", '0');
            } else {
                displayNotify("CapturaReporteGuardadoErroneo", "", '2');
            }
        });
        
    }
}

function AjaxGuardarCaptura_viejo(ds, guardarYNuevo) {
    if (ds.length > 0) {
        var RequisicionID = 0;
        var Captura = [];
        Captura[0] = { Detalles: "" }
        var CapturaValidacion = [];
        CapturaValidacion[0] = { Detalles: "" }
        var listaDetalles = [];
        var listaDetallesValidacion = [];
        var cont = 0;
        for (var i = 0; i < ds.length; i++) {
            //valida que tenga numero de placas y se ha capturado tamaño y densidad

            listaDetalles[cont] = {
                ReporteRTID: 0,
                RequisicionID: 0,
                OrdenTrabajoID: 0,
                SpoolID: 0,
                JuntaSpoolID: 0,
                Accion: "",
                Estatus: 0,
                Junta: "",
                ClasificacionPND: "",
                TipoPrueba: "",
                Observaciones: "",
                CodigoAsme: "",
                NumeroPlacas: 0,
                Densidad: 0,
                Tamano: 0,
                NumeroControl: "",
                ResultadoConciliacionID: 0,
                RazonNoConciliacionID: 0,
                ListaDetallePorPlacas: [],
                Estatus: 1
            };

            
            listaDetallesValidacion[cont] = {
                Accion: "",
                Estatus: 0,
                ReporteRTID: 0,
                ResultadoConciliacionID: 0,
                RazonNoConciliacionID: 0,
                ComentarioValidacion: "",
                UsuarioIDConciliacion: 0,
                ProveedorIDConciliacion: 0
            };


            listaDetalles[cont].ReporteRTID = ds[i].ReporteRTID;
            listaDetalles[cont].RequisicionID = ds[i].RequisicionID;
            listaDetalles[cont].OrdenTrabajoID = ds[i].OrdenTrabajoID;
            listaDetalles[cont].SpoolID = ds[i].SpoolID;
            listaDetalles[cont].JuntaSpoolID = ds[i].JuntaSpoolID;
            listaDetalles[cont].Accion = ds[i].Accion;
            listaDetalles[cont].Junta = ds[i].Junta;
            listaDetalles[cont].ClasificacionPND = ds[i].ClasificacionPND;
            listaDetalles[cont].TipoPrueba = ds[i].TipoPrueba;
            listaDetalles[cont].Observaciones = ds[i].Observaciones;
            listaDetalles[cont].CodigoAsme = ds[i].CodigoAsme;
            listaDetalles[cont].NumeroPlacas = ds[i].NumeroPlacas;
            listaDetalles[cont].Densidad = ds[i].Densidad;
            listaDetalles[cont].Tamano = ds[i].Tamano;
            listaDetalles[cont].ResultadoConciliacion = ds[i].ResultadoConciliacion;
            listaDetalles[cont].ResultadoConciliacion = ds[i].ResultadoConciliacion;

            listaDetallesValidacion[cont].Accion = ds[i].Accion;
            listaDetallesValidacion[cont].Estatus = ds[i].EstatusRequisicion;
            listaDetallesValidacion[cont].ReporteRTID = ds[i].RequisicionID;
            listaDetallesValidacion[cont].ResultadoConciliacionID = ds[i].ResultadoConciliacionID;
            listaDetallesValidacion[cont].RazonNoConciliacionID = ds[i].RazonNoConciliacionID;
            listaDetallesValidacion[cont].ComentarioValidacion = ds[i].Comentarios;
            listaDetallesValidacion[cont].UsuarioIDConciliacion = 0;
            listaDetallesValidacion[cont].ProveedorIDConciliacion = ((currentUsuarioProveedor == null) ? (0) : (currentUsuarioProveedor.ProveedorID));

            var informacion = [];
            for (var j = 0; j < ds[i].ListaDetallePorPlacas.length; j++) {
                informacion[j] = { ReporteRTResultadosID: 0, ReporteRTID: 0, OrdenTrabajoID: 0, SpoolID: 0, JuntaSpoolID: 0, SpoolJunta: "", Junta: "", EtiquetaJunta: "", NumeroControl: "", Ubicacion: "", Resultado: "", Accion: "" }
                informacion[j].ReporteRTID = ds[i].ListaDetallePorPlacas[j].ReporteRTID;
                informacion[j].OrdenTrabajoID = ds[i].ListaDetallePorPlacas[j].OrdenTrabajoID;
                informacion[j].SpoolID = ds[i].ListaDetallePorPlacas[j].SpoolID;
                informacion[j].JuntaSpoolID = ds[i].ListaDetallePorPlacas[j].JuntaSpoolID;
                informacion[j].ResultadoID = ds[i].ListaDetallePorPlacas[j].ResultadoID;
                informacion[j].Resultado = ds[i].ListaDetallePorPlacas[j].Resultado;
                informacion[j].Ubicacion = ds[i].ListaDetallePorPlacas[j].Ubicacion;
                informacion[j].Accion = ds[i].ListaDetallePorPlacas[j].Accion;
                listaDetalles[cont].ListaDetallePorPlacas = informacion;

                var detalles = [];
                for (var k = 0; k < ds[i].ListaDetallePorPlacas[j].ListaDetalleDefectos.length; k++) {
                    detalles[k] = { ResultadosDefectoID: 0, ReporteResultadosID: 0, OrdenTrabajoID: 0, SpoolID: 0, JuntaSpoolID: 0, DefectoID: 0, InicioMM: 0, FinMM: 0, Accion: 1 }
                    detalles[k].OrdenTrabajoID = ds[i].ListaDetallePorPlacas[j].ListaDetalleDefectos[k].OrdenTrabajoID;
                    detalles[k].SpoolID = ds[i].ListaDetallePorPlacas[j].ListaDetalleDefectos[k].SpoolID;
                    detalles[k].JuntaSpoolID = ds[i].ListaDetallePorPlacas[j].ListaDetalleDefectos[k].JuntaSpoolID;
                    detalles[k].DefectoID = ds[i].ListaDetallePorPlacas[j].ListaDetalleDefectos[k].DefectoID;
                    detalles[k].Defecto = ds[i].ListaDetallePorPlacas[j].ListaDetalleDefectos[k].Defecto;
                    detalles[k].InicioMM = ds[i].ListaDetallePorPlacas[j].ListaDetalleDefectos[k].InicioMM;
                    detalles[k].FinMM = ds[i].ListaDetallePorPlacas[j].ListaDetalleDefectos[k].FinMM;
                    detalles[k].Accion = ds[i].ListaDetallePorPlacas[j].ListaDetalleDefectos[k].Accion;
                    detalles[k].Posicion = ds[i].ListaDetallePorPlacas[j].ListaDetalleDefectos[k].Posicion;
                    detalles[k].Ubicacion = ds[i].ListaDetallePorPlacas[j].ListaDetalleDefectos[k].Ubicacion;
                }
                listaDetalles[cont].ListaDetallePorPlacas[j].ListaDetalleDefectos = detalles;
            }
            
            if ((ds[i].NumeroPlacas > 0) && ($.isNumeric(ds[i].Tamano)) && ($.isNumeric(ds[i].Densidad)) && ds[i].Tamano > 0 && ds[i].Densidad > 0 && (ds[i].ResultadoConciliacionID != 0) && (ds[i].RazonNoConciliacionID != 0) && (ds[i].Comentarios != "")) {
                
                if (ds[i].ListaDetallePorPlacas.length > 0) {
                    for (var l = 0; l < ds[i].ListaDetallePorPlacas.length; l++) {
                        if (!(($.isNumeric(ds[i].ListaDetallePorPlacas[l].ResultadoID)) || ($.isNumeric(ds[i].ListaDetallePorPlacas[l].ResultadoID != 0)))) {
                            listaDetalles[cont].Estatus = 0 //el elemento esta mal.
                            $('tr[data-uid="' + ds[i].uid + '"] ').css("background-color", "#ffcccc");
                            
                            break;
                        }
                        else {
                            listaDetalles[cont].Estatus = 1 // el elemento esta bien.
                            $('tr[data-uid="' + ds[i].uid + '"] ').css("background-color", "#FFFFFF"); // si antes estaba rojo , lo completa el usuario entonces ya se pone de color blanco.

                        }

                    }
                }
                else {
                    listaDetalles[cont].Estatus = 0 //el elemento esta mal.
                    $('tr[data-uid="' + ds[i].uid + '"] ').css("background-color", "#ffcccc");
                    
                }
                
            }
            else {
                listaDetalles[cont].Estatus = 0 //el elemento esta mal.
                $('tr[data-uid="' + ds[i].uid + '"] ').css("background-color", "#ffcccc");
                
            }
            
            cont++;


            Captura[0].Detalles = listaDetalles;

            CapturaValidacion[0].Detalles = listaDetallesValidacion;
        }

        if (!ExistRowEmpty(listaDetalles)) {
            $ReporteRT.ReporteRT.create(Captura[0], { token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
                if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "Ok") {

                    $ValidacionRT.ValidacionRT.create(CapturaValidacion[0], { token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data2) {
                        if (data2.ReturnMessage.length > 0 && data2.ReturnMessage[0] == "Ok") {


                            if (guardarYNuevo) {
                                cleanView();
                            } else {

                                //AjaxObtieneDetalleRequisicion();
                                ajaxResultadosDetalle($("#inputProyecto").data("kendoComboBox").value(), $("#inputProveedor").data("kendoComboBox").value(), $("#inputRequisicion").data("kendoComboBox").value());
                                disableEnableView(true);
                            }

                            displayNotify("EntregaPlacasGraficasMensajeGuardadoExistoso", "", '0');
                        }
                    });
                } else {
                    displayNotify("CapturaReporteGuardadoErroneo", "", '2');
                }

            });
        } else {

            ventanaConfirm = $("#ventanaConfirm").kendoWindow({
                iframe: true,
                title: _dictionary.WarningTitle[$("#language").data("kendoDropDownList").value()],
                visible: false,
                width: "auto",
                height: "auto",
                modal: true,
                animation: {
                    close: false,
                    open: false
                }
            }).data("kendoWindow");

            ventanaConfirm.content(_dictionary.ListadoCatalogos0011[$("#language").data("kendoDropDownList").value()] +
                "</br><center><button class='btn btn-blue' id='yesButton'>Si</button><button class='btn btn-blue' id='noButton'>No</button></center>");

            ventanaConfirm.open().center();
            $("#yesButton").click(function () {

                var elemento = 0;

                while (elemento < Captura[0].Detalles.length &&  Captura[0].Detalles.length !=0 ) {
                    if (Captura[0].Detalles[elemento].Estatus == 0) {
                        Captura[0].Detalles.pop(Captura[0].Detalles[elemento]);
                    }
                    else
                        elemento++;
                }

                if (Captura[0].Detalles.length > 0) {
                    $ReporteRT.ReporteRT.create(Captura[0], { token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
                        if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "Ok") {

                            if (guardarYNuevo) {
                                cleanView();
                            } else {

                                //AjaxObtieneDetalleRequisicion();
                                ajaxResultadosDetalle($("#inputProyecto").data("kendoComboBox").value(), $("#inputProveedor").data("kendoComboBox").value(), $("#inputRequisicion").data("kendoComboBox").value());
                                disableEnableView(true);
                            }

                            displayNotify("ReporteRTMensajeGuardadoExistoso", "", '0');
                        } else {
                            displayNotify("ReporteRTMensajeGuardadoErroneo", "", '2');
                        }
                        ventanaConfirm.close();
                    });
                } else {
                    ventanaConfirm.close();
                    displayNotify("ReporteRTExcepcionGuardado", "", '1');
                }

            });
            $("#noButton").click(function () {
                ventanaConfirm.close();
            });
        }
    }
}


