﻿function AjaxGuardarCliente() {
    loadingStart();
    var OrdenCompra = $("#inputOrdenCompra").data("kendoComboBox").value() == undefined ? 0 : $("#inputOrdenCompra").data("kendoComboBox").value();
    var nombreCliente = $("#inputNombreCliente").val();
    var dir = $("#inputDireccion").val();
    var ciudad = $("#inputCiudad").val();
    var estado = $("#inputEstado").val();
    var pais = $("#inputPais").val();    
    if (OrdenCompra != undefined || OrdenCompra != 0) {
        if (nombreCliente != "") {
            $CobroOC.CobroOC.read({ token: Cookies.get("token"), OrdenCompraID: OrdenCompra, Nombre: nombreCliente, Direccion: dir, Ciudad: ciudad, Estado: estado, Pais: pais }).done(function (data) {
                if (data != null) {                    
                        AjaxGetClienteByOC(0);
                        setTimeout(function () {
                            displayNotify("MensajeGuardadoExistoso", "", "0");
                            $("#inputCliente").data("kendoComboBox").value(data);
                            $("#btnCerrarPopup").trigger("click");
                        }, 700);
                }                
            });
        } else {
            displayNotify("lblFaltaCliente", "", "1");
        }
    } else {
        displayNotify("msgFaltaOrdenCompra", "", "1");
    }    
    loadingStop();
}
function AjaxObtenerOrdenesCompra() {
    loadingStart();
    $Dynasol.Dynasol.read({ token: Cookies.get("token") }).done(function (data) {
        if (Error(data)) {
            $("#inputOrdenCompra").data("kendoComboBox").setDataSource([]);
            $("#inputOrdenCompra").data("kendoComboBox").text("");
            $("#inputOrdenCompra").data("kendoComboBox").dataSource.data(data);
            if ($("#inputOrdenCompra").data("kendoComboBox").dataSource._data.length == 2) {
                $("#inputOrdenCompra").data("kendoComboBox").select(1);
                AjaxCargarRevision();
            }
            else {
                $("#inputOrdenCompra").data("kendoComboBox").select(0);
                loadingStop();
            }
        }
    });
}

function AjaxObtenerCatalogoMoneda() {
    loadingStart();
    $CobroOC.CobroOC.read({ token: Cookies.get("token") }).done(function (data) {
        if (Error(data)) {
            $("#inputMoneda").data("kendoComboBox").setDataSource([]);
            $("#inputMoneda").data("kendoComboBox").text("");
            $("#inputMoneda").data("kendoComboBox").dataSource.data(data);            
        }
    });
    loadingStop();
}
function AjaxGetClienteByOC(OrdenCompra) {
    loadingStart();
    $CobroOC.CobroOC.read({ token: Cookies.get("token"), OrdenCompraID: OrdenCompra, Relleno: true }).done(function (data) {
        if (Error(data)) {
            $("#inputCliente").data("kendoComboBox").setDataSource([]);
            $("#inputCliente").data("kendoComboBox").text("");
            if (data.length == 1) {
                $("#inputCliente").data("kendoComboBox").dataSource.data(data);
                $("#inputCliente").data("kendoComboBox").value(data.ClienteID);
                $("#inputCliente").data("kendoComboBox").select(1);
            } else {
                $("#inputCliente").data("kendoComboBox").dataSource.data(data);
            }            
        }
    });
    loadingStop();
}

function AjaxCargarRevision() {
    loadingStart();
    var OrdenCompra = $("#inputOrdenCompra").data("kendoComboBox").value() == undefined ? 0 : $("#inputOrdenCompra").data("kendoComboBox").value();
    $CobroOC.CobroOC.read({ token: Cookies.get("token"), OrdenCompraID: OrdenCompra }).done(function (data) {
        if (Error(data)) {
            $("#grid").data("kendoGrid").dataSource.data([]);
            var ds = $("#grid").data("kendoGrid").dataSource;
            var array = data;
            if (data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].Cobrado > data[i].CantS) {
                        data[i].Deficit = data[i].Cobrado - data[i].CantS;
                    }
                }
                ds.data(data);
            }
            ds.sync();
        }
        loadingStop();
    });
}

function AjaxGuardarCaptura(arregloCaptura, tipoGuardar) {
    loadingStart();
    var Captura = { Detalle: "" };
    var Datos = [];
    for (var i = 0; i < arregloCaptura.length; i++) {
        Datos[i] =
        {
            ColadaID: 0,
            Cobrado: 0,            
            ModificadoPorUsuario: false
        }
        Datos[i].ColadaID = arregloCaptura[i].ColadaID;        
        Datos[i].Cobrado = arregloCaptura[i].Cobrado;
        Datos[i].ModificadoPorUsuario = arregloCaptura[i].ModificadoPorUsuario;
    }
    Captura.Detalle = Datos;

    $CobroOC.CobroOC.create(Captura, { token: Cookies.get("token") }).done(function (data) {
        if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "OK") {
            if (tipoGuardar == 0) {
                opcionHabilitarView(true);
                AjaxCargarRevision();
            } else {
                Limpiar();
                opcionHabilitarView(false);
            }
            displayNotify("MensajeGuardadoExistoso", "", '0');
            cambiosCheckOK = 0;
        } else {
            displayNotify("MensajeGuardadoErroneo", "", '2');
        }
    });
    loadingStop();
}

function Limpiar() {
    $("#inputOrdenCompra").data("kendoComboBox").value("");
    $("#grid").data("kendoGrid").dataSource.data([]);
}