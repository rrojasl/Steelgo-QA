function AjaxCargarCamposPredeterminados() {
    loadingStart();
    var TipoMuestraPredeterminadoID = 3066;
    $CamposPredeterminados.CamposPredeterminados.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), id: TipoMuestraPredeterminadoID }).done(function (data) {
        if (data == "Spool") {
            $('input:radio[name=EmbarqueCargaTipoSeleccion]:nth(0)').attr('checked', true);
            $('input:radio[name=EmbarqueCargaTipoSeleccion]:nth(1)').attr('checked', false);
            $('input:radio[name=EmbarqueCargaTipoSeleccion]:nth(2)').attr('checked', false);

        }
        else if (data == "Paquete") {
            $('input:radio[name=EmbarqueCargaTipoSeleccion]:nth(0)').attr('checked', false);
            $('input:radio[name=EmbarqueCargaTipoSeleccion]:nth(1)').attr('checked', true);
            $('input:radio[name=EmbarqueCargaTipoSeleccion]:nth(2)').attr('checked', false);
        }
        else if (data == "Codigo") {
            $('input:radio[name=EmbarqueCargaTipoSeleccion]:nth(0)').attr('checked', false);
            $('input:radio[name=EmbarqueCargaTipoSeleccion]:nth(1)').attr('checked', false);
            $('input:radio[name=EmbarqueCargaTipoSeleccion]:nth(2)').attr('checked', true);
        }
    });

    //AjaxCargaMostrarPredeterminado();
    loadingStop();
};

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


function AjaxCargarProyecto() {
    $Proyectos.Proyectos.read({ token: Cookies.get("token") }).done(function (data) {
        $("#inputProyecto").data("kendoComboBox").dataSource.data([]);
        var proyectoId = 0;

        if (data.length > 0) {
            $("#inputProyecto").data("kendoComboBox").dataSource.data(data);
            if (data.length < 3) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].ProyectoID != 0) {
                        proyectoId = data[i].ProyectoID;
                    }
                }
            }

            $("#inputProyecto").data("kendoComboBox").value(proyectoId);
            $("#inputProyecto").data("kendoComboBox").trigger("change");
        }
    });
}


function AjaxObtenerPlanas(ProveedorID, nuevaPlana) {
    $EmbarqueGeneral.EmbarqueGeneral.read({ token: Cookies.get("token"), ProveedorID: ProveedorID }).done(function (data) {
        $("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").dataSource.data([]);
        var PlanaID = 0;

        if (data.length > 0) {

            if (data.length < 3) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].PlanaID != 0) {
                        PlanaID = data[i].PlanaID;
                    }
                }
            }
            else {
                if (nuevaPlana != null) {
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].Nombre == nuevaPlana) {
                            PlanaID = data[i].PlanaID;
                        }
                    }
                }
            }

            data.splice(1, 0, {
                PlanaID: -1, Nombre: _dictionary.EmbarqueCargaNuevaPlana[$("#language").data("kendoDropDownList").value()]
            });
            $("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").dataSource.data(data);
            $("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").value(PlanaID);
            $("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").trigger("change");
        }
    });
}



function AjaxEmbarqueCargaProveedores(ProyectoID, nuevoProveedor) {
    loadingStart();

    $Proveedores.Proveedores.read({ token: Cookies.get("token"), ProyectoID: ProyectoID }).done(function (data) {
        if (data.length > 0) {
            $("#inputProveedor").data("kendoComboBox").value("");
            $("#inputProveedor").data("kendoComboBox").trigger("change");
            var ProveedorId = 0;
            if (data.length > 0) {
                $("#inputProveedor").data("kendoComboBox").dataSource.data(data);
                if (data.length == 2) {
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].ProveedorID != 0) {
                            ProveedorId = data[i].ProveedorID;
                            
                        }
                    }
                }
                else {
                    if (nuevoProveedor != null) {
                        for (var i = 0; i < data.length; i++) {
                            if (data[i].Nombre == nuevoProveedor) {
                                ProveedorId = data[i].ProveedorID;
                            }
                        }
                    }
                }

                data.splice(1, 0, {
                    ProveedorID: -1, Nombre: _dictionary.EmbarqueCargaAgregarNuevoProveedor[$("#language").data("kendoDropDownList").value()]
                });
                $("#inputProveedor").data("kendoComboBox").dataSource.data(data);
                $("#inputProveedor").data("kendoComboBox").value(ProveedorId);
                $("#inputProveedor").data("kendoComboBox").trigger("change");
            }
            else {
                $("#inputProveedor").data("kendoComboBox").value("");
            }
        }
        loadingStop();
    });
}

function AjaxAgregarCarga() {

    if (!$("#inputCerrar").is(":checked")) {
        var peso = 0;
        if ($("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").text() != '' && $("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").value() != undefined) {
            $CargaPlana.CargaPlana.read({ token: Cookies.get("token"), CargaPlanaID: 0, TipoConsulta: ObtenerTipoConsulta(), OrdenTrabajoSpoolID: $("#InputID").data("kendoComboBox").value() }).done(function (data) {
                if (data.length > 0) {
                    //$("#grid").data("kendoGrid").dataSource.data(data);
                    var ds = $("#grid").data("kendoGrid").dataSource;

                    var array = data;
                    for (var i = 0; i < array.length; i++) {
                        if (!ExisteSpool(array[i])) {
                            array[i].Consecutivo = $("#grid").data("kendoGrid").dataSource._data.length + 1;
                            ds.add(array[i]);
                        }
                    }
                    $('#lblEmbarqueCargaTotalPiezas').text($("#grid").data("kendoGrid").dataSource._data.length);

                    for (var i = 0; i < array.length; i++) {
                        peso = peso + array[i].Peso;
                    }
                    peso = peso / 1000;
                    $('#lblEmbarqueCargaToneladasCargadas').text(peso);

                }
                loadingStop();
            });
        }
    }
    else {
        displayNotify('EmarqueCargaMensajePlanaCerrada', '', 1);
    }
}


function AjaxObtenerGrid() {
    if ($("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").text() != '' && $("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").value() != undefined) {
        $CargaPlana.CargaPlana.read({ token: Cookies.get("token"), PlanaID: 0, Todos: 1 }).done(function (data) {
            if (data.length > 0) {
                $("#grid").data("kendoGrid").dataSource.data([]);
                //$("#grid").data("kendoGrid").dataSource.data(data);
                var ds = $("#grid").data("kendoGrid").dataSource;
                var array = data;
                for (var i = 0; i < array.length; i++) {
                    ds.add(array[i]);
                }
            }
            $('#lblEmbarqueCargaTotalPiezas').text($("#grid").data("kendoGrid").dataSource._data.length);

            if (data.length > 0) {
                var peso = 0;
                for (var i = 0; i < array.length; i++) {
                    peso = peso + array[i].Peso;
                }
                peso = peso / 1000;
                $('#lblEmbarqueCargaToneladasCargadas').text(peso);
            }
            loadingStop();
        });
    }
}



function ExisteSpool(row) {
    var jsonGrid = $("#grid").data("kendoGrid").dataSource._data;

    for (var i = 0; i < jsonGrid.length; i++) {
        if (jsonGrid[i].SpoolID == row.SpoolID) {
            return true
        }
    }
    return false;

}


function AjaxCargarZona() {
    loadingStart();
    $Zona.Zona.read({ token: Cookies.get("token") }).done(function (data) {
        var ZonaId = 0;
        if (data.length > 0) {
            $("#inputZonaPopup").data("kendoComboBox").dataSource.data(data);

            if (data.length < 3) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].ZonaID != 0) {
                        ZonaId = data[i].ZonaID;
                    }
                }
            }
            $("#inputZonaPopup").data("kendoComboBox").value(ZonaId);
            $("#inputZonaPopup").data("kendoComboBox").trigger("change");
        }

        loadingStop();
    });
}


function AjaxCargarCuadrante(zonaID) {
    $Cuadrante.Cuadrante.read({ token: Cookies.get("token"), ZonaID: zonaID }).done(function (data) {
        var CuadranteId = 0;

        if (data.length > 0) {
            $("#inputCuadrantePopup").data("kendoComboBox").dataSource.data(data);

            if (data.length < 3) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].CuadranteID != 0) {
                        CuadranteId = data[i].CuadranteID;
                    }
                }
            }

            $("#inputCuadrantePopup").data("kendoComboBox").value(CuadranteId);
            $("#inputCuadrantePopup").data("kendoComboBox").trigger("change");
        }
    });
}


function AjaxDescargarSpool() {

}

function GuardarNuevoProveedor() {
    $Proveedores.Proveedores.read({ token: Cookies.get("token"), NombreProveedor: $("#inputNombreNuevoProveedor").val(), ProyectoID: $("#inputProyecto").data("kendoComboBox").value(), Descripcion: "", Direccion: "", Telefono: "" }).done(function (data) {
        if (Error(data)) {
            if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "Ok") {
                AjaxEmbarqueCargaProveedores($("#inputProyecto").data("kendoComboBox").value(), $("#inputNombreNuevoProveedor").val());
                windowNewProvider.close();
                displayNotify("MensajeGuardadoExistoso", "", "0");
            }
            else if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] != "Ok") {

                displayNotify("", "Ya existe un proveedor con ese nombre ", '2');
            }

        }
    });
}

function GuardarNuevaPlana() {
    $EmbarqueGeneral.EmbarqueGeneral.read({ token: Cookies.get("token"), NombrePlana: $("#inputNombreNuevaPlana").val(), ProveedorID: $("#inputProveedor").data("kendoComboBox").value() }).done(function (data) {
        if (Error(data)) {
            if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "Ok") {
                AjaxObtenerPlanas($("#inputProveedor").data("kendoComboBox").value(), $("#inputNombreNuevaPlana").val());
                windowNewPlate.close();
                displayNotify("MensajeGuardadoExistoso", "", "0");
            }
            else if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] != "Ok") {

                displayNotify("", "Ya existe una plana para ese proveedor con ese nombre", '2');
            }
        }

    });
}




function AjaxGuardarCaptura(arregloCaptura, tipoGuardar) {
    try {
        $("#grid").data("kendoGrid").dataSource.sync();
        var pruebas = false;
        Captura = [];
        Captura[0] = { Detalles: "" };
        ListaDetalles = [];
        var i = 0;

        for (index = 0; index < arregloCaptura.length; index++) {
            ListaDetalles[i] = { Accion: "",DetalleCargaID: "", SpoolID: "", TipoPruebaProveedorID: "", ProveedorEquipoID: "", CapacidadTurnoEquipoID: "", CapacidadTurnoProveedorID: "", Fecha: "", Estatus: 1 };

            ListaDetalles[i].Accion = arregloCaptura[index].Accion;
            ListaDetalles[i].DetalleCargaID = arregloCaptura[index].DetalleCargaID;
            ListaDetalles[i].SpoolID = arregloCaptura[index].SpoolID;
            ListaDetalles[i].TipoPruebaProveedorID = arregloCaptura[index].TipoPruebaProveedorID;
            ListaDetalles[i].ProveedorEquipoID = arregloCaptura[index].ProveedorEquipoID;
            ListaDetalles[i].CapacidadTurnoEquipoID = arregloCaptura[index].CapacidadTurnoEquipoID;
            ListaDetalles[i].CapacidadTurnoProveedorID = arregloCaptura[index].CapacidadTurnoProveedorID;


            if (arregloCaptura[index].Accion == 1 || arregloCaptura[index].Accion == 2) {
                if (arregloCaptura[index].Proveedor == "") {
                    ListaDetalles[i].Estatus = 0;
                    $('tr[data-uid="' + arregloCaptura[index].uid + '"] ').css("background-color", "#ffcccc");
                }
                if (arregloCaptura[index].RequiereEquipo) {
                    if (arregloCaptura[index].Equipo == "" || arregloCaptura[index].TurnoLaboral == "") {
                        ListaDetalles[i].Estatus = 0;
                        $('tr[data-uid="' + arregloCaptura[index].uid + '"] ').css("background-color", "#ffcccc");
                    }
                }
                else {
                    if (arregloCaptura[index].TurnoLaboral == "") {
                        ListaDetalles[i].Estatus = 0;
                        $('tr[data-uid="' + arregloCaptura[index].uid + '"] ').css("background-color", "#ffcccc");
                    }
                }
            }
            else {
                if (arregloCaptura[index].Accion == 4) {
                    if (!(arregloCaptura[index].Proveedor == "" && arregloCaptura[index].Equipo == "" && arregloCaptura[index].TurnoLaboral == "")) {
                        ListaDetalles[i].Estatus = 0;
                        $('tr[data-uid="' + arregloCaptura[index].uid + '"] ').css("background-color", "#ffcccc");
                    }
                }
            }

            i++;

        }


        Captura[0].Detalles = ListaDetalles;

        if (Captura[0].Detalles.length > 0) {
            loadingStart();
            $CargaPlana.CargaPlana.create(Captura[0], { token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
                editado = true;
                if (Error(data)) {
                    if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "Ok") {
                        if (tipoGuardar == 1) {
                            $("#grid").data("kendoGrid").dataSource.data([]);
                            setTimeout(function () { AjaxCargarCamposPredeterminados(); AjaxCargarProyecto(); }, 500);
                            opcionHabilitarView(false, "FieldSetView");
                        }
                        else {
                            $("#grid").data("kendoGrid").dataSource.data([]);
                            AjaxObtenerGrid();
                            opcionHabilitarView(true, "FieldSetView");

                        }
                        displayNotify("MensajeGuardadoExistoso", "", "0");
                        editado = false;
                    }
                    else if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] != "Ok") {
                        mensaje = "No se guardo la informacion el error es: " + data.ReturnMessage[0] + "-2"
                        displayNotify("MensajeGuardadoErroneo", "", '2');
                    }
                }
            });
            loadingStop();
        }
        else {
            loadingStop();
        }


    } catch (e) {
        loadingStop();
        displayNotify("", e.message, '1');

    }

};

