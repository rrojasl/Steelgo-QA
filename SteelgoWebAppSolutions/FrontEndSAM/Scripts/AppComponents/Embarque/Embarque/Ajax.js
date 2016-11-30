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

                    AjaxEmbarqueCargaChofer(ProveedorID, null);
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
                AjaxEmbarqueCargaTractos($("#Tracto").data("kendoComboBox").value(), $("#inputNombreNuevoTracto").val());
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
                AjaxEmbarqueCargaChofer($("#Chofer").data("kendoComboBox").value(), $("#inputNombreNuevoChofer").val());
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
                //$("#grid").data("kendoGrid").dataSource.data(data);
                var ds = $("#grid").data("kendoGrid").dataSource;

                var array = data;
                for (var i = 0; i < array.length; i++) {
                    if (!ExistePlana(array[i])) {
                            ds.add(array[i]);
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