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


function AjaxObtenerPlanas(ProyectoID) {
    loadingStart();
    $EmbarqueGeneral.EmbarqueGeneral.read({ token: Cookies.get("token"), ProyectoID: ProyectoID, PlanaCerrada: 1 }).done(function (data) {
        if (Error(data)) {
            $("#Plana").data("kendoComboBox").dataSource.data([]);
            var PlanaID = 0;

            if (data.length > 0) {

                if (data.length < 3) {
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].PlanaID != 0) {
                            PlanaID = data[i].PlanaID;
                        }
                    }
                }
                $("#Plana").data("kendoComboBox").dataSource.data(data);

                $("#Plana").data("kendoComboBox").value(PlanaID);
                $("#Plana").data("kendoComboBox").trigger("change");
            }
        }
        loadingStop();
    });
}



function AjaxEmbarqueCargaProveedores(ProyectoID, nuevoProveedor) {
    loadingStart();

    $Proveedores.Proveedores.read({ token: Cookies.get("token"), ProyectoID: ProyectoID, TipoProveedor: 2 }).done(function (data) {
        if (Error(data)) {
            if (data.length > 0) {
                var ProveedorId = 0;
                if (data.length > 0) {
                    $("#Proveedor").data("kendoComboBox").dataSource.data(data);
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
                    $("#Proveedor").data("kendoComboBox").dataSource.data(data);
                    $("#Proveedor").data("kendoComboBox").value(ProveedorId);
                    $("#Proveedor").data("kendoComboBox").trigger("change");
                }
                else {
                    $("#Proveedor").data("kendoComboBox").value("");
                }
            }
        }
        loadingStop();
    });
}



function AjaxEmbarqueCargaTractos(ProveedorID, nuevoTracto) {
    loadingStart();
    $EmbarqueGeneral.EmbarqueGeneral.read({ token: Cookies.get("token"), ProveedorID: ProveedorID, Tractos: 1 }).done(function (data) {
        if (Error(data)) {
            if (data.length > 0) {
                var TractoID = 0;
                if (data.length > 0) {

                    if (data.length) {
                        for (var i = 0; i < data.length; i++) {
                            if (data[i].TractoID != 0) {
                                TractoID = data[i].TractoID;

                            }
                        }
                    }
                    else {
                        if (nuevoTracto != null) {
                            for (var i = 0; i < data.length; i++) {
                                if (data[i].Nombre == nuevoTracto) {
                                    TractoID = data[i].TractoID;
                                }
                            }
                        }
                    }

                    data.splice(1, 0, {
                        TractoID: -1, Nombre: "Agregar nuevo tracto"
                    });
                    $("#Tracto").data("kendoComboBox").dataSource.data(data);
                    $("#Tracto").data("kendoComboBox").value(TractoID);
                    $("#Tracto").data("kendoComboBox").trigger("change");                    
                }
                else {
                    $("#Tracto").data("kendoComboBox").value("");
                }
            }
        }
        loadingStop();
    });
}


function AjaxEmbarqueCargaChofer(ProveedorID, nuevoChofer) {
    loadingStart();

    $EmbarqueGeneral.EmbarqueGeneral.read({ token: Cookies.get("token"), ProveedorID: ProveedorID, Chofer: 2 }).done(function (data) {
        if (Error(data)) {
            if (data.length > 0) {

                var ChoferID = 0;
                if (data.length > 0) {

                    if (data.length < 3) {
                        for (var i = 0; i < data.length; i++) {
                            if (data[i].ChoferID != 0) {
                                ChoferID = data[i].ChoferID;

                            }
                        }
                    }
                    else {
                        if (nuevoChofer != null) {
                            for (var i = 0; i < data.length; i++) {
                                if (data[i].Nombre == nuevoChofer) {
                                    ChoferID = data[i].ChoferID;
                                }
                            }
                        }
                    }

                    data.splice(1, 0, {
                        ChoferID: -1, Nombre: "Agregar nuevo chofer"
                    });
                    $("#Chofer").data("kendoComboBox").dataSource.data(data);

                    $("#Chofer").data("kendoComboBox").value(ChoferID);
                    $("#Chofer").data("kendoComboBox").trigger("change");


                }
                else {
                    $("#Chofer").data("kendoComboBox").value("");
                }
            }
        }
        loadingStop();
    });
}

function AjaxObtenerEmbarque(ProveedorID, nombreEmbarque) {
    loadingStart();
    $PreparacionEmbarque.PreparacionEmbarque.read({ token: Cookies.get("token"), ProveedorID: ProveedorID, Lenguaje: $("#language").val(), Enviado: 0 }).done(function (data) {
        if (Error(data)) {
            $("#Embarque").data("kendoComboBox").dataSource.data([]);
            var EmbarqueID = 0;

            if (data.length > 0) {

                if (data.length < 3) {
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].EmbarqueID != 0) {
                             EmbarqueID = data[i].EmbarqueID;
                        }
                    }
                } else {
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].Nombre == nombreEmbarque) {
                            EmbarqueID = data[i].EmbarqueID;
                        }
                    }
                }

                $("#Embarque").data("kendoComboBox").dataSource.data(data);

                $("#Embarque").data("kendoComboBox").value(EmbarqueID);
                $("#Embarque").data("kendoComboBox").trigger("change");
            }
        }
        loadingStop();
    });
}



function GuardarNuevoProveedor() {
    $Proveedores.Proveedores.read({ token: Cookies.get("token"), NombreProveedor: $("#inputNombreNuevoProveedor").val(), ProyectoID: $("#Proyecto").data("kendoComboBox").value(), Descripcion: "", Direccion: "", Telefono: "", TipoProveedor: 2 }).done(function (data) {
        if (Error(data)) {
            if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "Ok") {
                AjaxEmbarqueCargaProveedores($("#Proyecto").data("kendoComboBox").value(), $("#inputNombreNuevoProveedor").val());
                windowNewProvider.close();
                displayNotify("MensajeGuardadoExistoso", "", "0");
            }
            else if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] != "Ok") {

                displayNotify("", "Ya existe un proveedor con ese nombre ", '2');
            }

        }
    });
}



function GuardarNuevoTracto() {
    $EmbarqueGeneral.EmbarqueGeneral.read({ token: Cookies.get("token"), NombreTracto: $("#inputNombreNuevoTracto").val(), ProveedorID: $("#Proveedor").data("kendoComboBox").value(), TipoProveedor: 2 }).done(function (data) {
        if (Error(data)) {
            if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "Ok") {
                AjaxEmbarqueCargaTractos($("#Proveedor").data("kendoComboBox").value(), $("#inputNombreNuevoTracto").val());
                windowNewTracto.close();
                displayNotify("MensajeGuardadoExistoso", "", "0");
            }
            else if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] != "Ok") {

                displayNotify("", "Ya existe un tracto con ese nombre ", '2');
            }

        }
    });
}

function GuardarNuevoChofer() {
    $EmbarqueGeneral.EmbarqueGeneral.read({ token: Cookies.get("token"), NombreChofer: $("#inputNombreNuevoChofer").val(), ProveedorID: $("#Proveedor").data("kendoComboBox").value() }).done(function (data) {
        if (Error(data)) {
            if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "Ok") {
                AjaxEmbarqueCargaChofer($("#Proveedor").data("kendoComboBox").value(), $("#inputNombreNuevoChofer").val());
                windowNewChofer.close();
                displayNotify("MensajeGuardadoExistoso", "", "0");
            }
            else if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] != "Ok") {

                displayNotify("", "Ya existe un chofer con ese nombre ", '2');
            }

        }
    });
}


function AjaxAgregaRenglon(cargaPlanaID) {

    loadingStart();

    $PreparacionEmbarque.PreparacionEmbarque.read({ token: Cookies.get("token"), CargaPlanaID: cargaPlanaID }).done(function (data) {
        var cadenaPlana = "";
        if (Error(data)) {
            if (data.length > 0) {
                var ds = $("#grid").data("kendoGrid").dataSource;

                var array = data;
                for (var i = 0; i < array.length; i++) {
                    if (!ExistePlana(array[i])) {
                        if (data[i].EmbarqueDetalleID == 0) {
                            ds.add(array[i]);
                        } else {
                            displayNotify("", "La plana ya se encuentra en el embarque " + data[i].NombreEmbarque, '2');
                        }
                    } else {
                        displayNotify("", "La Plana ya existe en la captura" , '2');
                    }
                }
            }
        }
        loadingStop();
    });

}


function ExistePlana(row) {
    var jsonGrid = $("#grid").data("kendoGrid").dataSource._data;

    for (var i = 0; i < jsonGrid.length; i++) {
        if (jsonGrid[i].PlanaID == row.PlanaID) {
            return true
        }
    }
    return false;

}

function AjaxObtieneDetalle(embarqueID) {
    loadingStart();
    $PreparacionEmbarque.PreparacionEmbarque.read({ token: Cookies.get("token"), EmbarqueID: embarqueID, }).done(function (data) {
        $("#grid").data("kendoGrid").dataSource.data([]);
        if(data!=null){
            var ds = $("#grid").data("kendoGrid").dataSource;

            for (var i = 0; i < data.length; i++) {
                ds.add(data[i]);
            }
        }
        loadingStop();
    });
}

function AbrirPopUpGuardar(Embarque, tipoGuardado) {
    var fechaPredeterminada;
    $("#InputTipoGuardado").val(tipoGuardado);
    if (Embarque.EmbarqueID == 0) {
        $("#inputNombreEmbarque").val("");
        $("#inputNombreEmbarque").attr("disabled", false);

        var idFechaPaquete = 3068;
        $CamposPredeterminados.CamposPredeterminados.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), id: idFechaPaquete }).done(function (data) {
            fechaPredeterminada = kendo.toString(data, _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()]);
            $("#inputFechaEmbarque").val(fechaPredeterminada);
        });
    } else {
        $("#inputNombreEmbarque").val(Embarque.Nombre);
        $("#inputNombreEmbarque").attr("disabled", true);

        fechaPredeterminada = kendo.toString(Embarque.FechaCreacion, _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()]);
        $("#inputFechaEmbarque").val(fechaPredeterminada);

    }
    divNuevoEmbarque.open().center();
}

function AjaxGuardarCaptura(ds, tipoGuardado, proveedorID) {
    loadingStart();
    Captura = [];
    Captura[0] = {
        Detalles : ""
    }
    var listaDetalle = [];
    var embarqueID = $("#Embarque").data("kendoComboBox").value();
    var nombreEmbarque = $("#inputNombreEmbarque").val();
    var tractoID = $("#Tracto").data("kendoComboBox").value();
    var choferID = $("#Chofer").data("kendoComboBox").value();
    var fechaCreacion = $("#inputFechaEmbarque").val();


    if (ds.length > 0) {
        for (var i = 0; i < ds.length; i++) {
            listaDetalle [i] = {Accion: "", EmbarqueDetalleID: "", EmbarqueID: "", CargaPlanaID: ""};
            listaDetalle[i].Accion = ds[i].Accion;
            listaDetalle[i].EmbarqueDetalleID = ds[i].EmbarqueDetalleID;
            listaDetalle[i].EmbarqueID = ds[i].EmbarqueID;
            listaDetalle[i].CargaPlanaID = ds[i].CargaPlanaID;
        }

    }

    Captura[0].Detalles = listaDetalle;
    $PreparacionEmbarque.PreparacionEmbarque.create(Captura[0], {
        token: Cookies.get("token"), lenguaje: $("#language").val(), EmbarqueID: embarqueID,
        NombreEmbarque: nombreEmbarque, TractoID: tractoID, ChoferID: choferID, FechaCreacion: fechaCreacion
    }).done(function (data) {
        if (Error(data)) {
            if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "Ok") {
                if (tipoGuardado != "1") {
                    Limpiar();
                } else {
                    var paqueteID = parseInt(data.ReturnMessage[1]);
                    opcionHabilitarView(true, "FieldSetView");
                    $("#grid").data("kendoGrid").dataSource.data([]);

                    AjaxObtenerEmbarque(proveedorID, nombreEmbarque);
                }
                displayNotify("MensajeGuardadoExistoso", "", '0');
            } else if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "existe") {

                displayNotify("", "Ya existe un embarque con ese nombre", '2');
            }
            else {
                displayNotify("MensajeGuardadoErroneo", "", '2');
            }
        }
    });
}

function AjaxEliminarEmbarque(embarqueID) {
    $PreparacionEmbarque.PreparacionEmbarque.read({ token: Cookies.get("token"), EmbarqueID: embarqueID, Lenguaje: $("#language").val() }).done(function (data) {
        if (Error(data)) {
            if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "Ok") {
                Limpiar();
                displayNotify("", "El embarque se eliminó correctamente", '0');
            }
            else {
                displayNotify("", "El embarque no se pudo eliminar", '2');
            }
        }
    });
}