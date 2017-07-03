﻿function AjaxObtenerSpoolID() {

    var OrdenTrabajoOrigianl = $("#InputOrdenTrabajo").val();
    $Armado.Armado.read({ ordenTrabajo: $("#InputOrdenTrabajo").val(), tipo: '1', token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
        dataSpoolArray = data;
        if (Error(data)) {
            if (data.OrdenTrabajo != "") {
                LineaCaptura.OrdenTrabajoSpool = data.OrdenTrabajo;
                $("#InputOrdenTrabajo").val(data.OrdenTrabajo);
            }
            else {
                $("#InputOrdenTrabajo").val(OrdenTrabajoOrigianl);
                displayNotify("CapturaArmadoMensajeOrdenTrabajoNoEncontrada", "", '1');
            }
            $("#InputID").data("kendoComboBox").dataSource.data([]);
            $("#InputID").data("kendoComboBox").value("");
            $("#InputID").data("kendoComboBox").dataSource.data(data.idStatus);
            Cookies.set("LetraProyecto", data.OrdenTrabajo.substring(0, 1), { path: '/' });
            $("#InputID").data("kendoComboBox").enable(true);
            $("#InputID").data("kendoComboBox").input.focus();
        }
    });
};

function ajaxGuardar(data) {
    loadingStart();
    displayNotify("", "se guardo correctamente la informacion", '0');
    opcionHabilitarView(true, "FieldSetView");
    loadingStop();
};

function AjaxEnviarImagenBase64(imgSerializada) {
    loadingStart();

    Captura = [];
    Captura[0] = { Detalles: "" };
    ListaDetalles = [];
    ListaDetalles[0] = { imgSerializada: "" };
    ListaDetalles[0].imgSerializada = imgSerializada;
    Captura[0].Detalles = ListaDetalles;

    $PinturaGeneral.PinturaGeneral.create(Captura[0], { token: Cookies.get("token") }).done(function (data) {
        if (Error(data)) {
            alert("termino de guardar segun..")
            loadingStop();
        }
    });
}

function AjaxObtenerPruebasSpoolID(SpoolID, ProyectoProcesoPruebaID, SistemaPinturaColorID) {
    loadingStart();
    $PruebasPorLote.PruebasPorLote.read({ token: Cookies.get("token"), spoolID: SpoolID, proyectoProcesoPruebaID: ProyectoProcesoPruebaID, SistemaPinturaColorID: SistemaPinturaColorID, lenguaje: $("#language").val(), tipo: 1/*Para diferenciar entre el controler de pruebas por proceso y pruebas de un spool*/ }).done(function (data) {
        if (Error(data)) {
            $("#grid").data("kendoGrid").dataSource.data([]);
            $("#grid").data("kendoGrid").dataSource.data(data);
            $("#grid").data("kendoGrid").dataSource.sync();
            editado = true;
        }
        loadingStop();
    });
   




}

function ajaxGuardar(data, guardarYNuevo) {
    //loadingStart();
    //displayNotify("", "se guardo correctamente la informacion", '0');
    //opcionHabilitarView(true, "FieldSetView");
    //loadingStop();

    Captura = [];
    Captura[0] = { Detalles: "" };
    ListaDetalles = [];


    var index = 0;
    for (var i = 0; i < data.length; i++) {
        $("#grid").data("kendoGrid").dataSource._data[i].RowOk = true;
        ListaDetalles[index] = { Accion: "", SpoolID: "", ProyectoProcesoPruebaID: "", UnidadMedida: "", FechaPrueba: "", ResultadoEvaluacion: "", Estatus: 1, SistemaPinturaColorID: "" };
        ListaDetalles[index].Accion = (data[i].Accion == undefined || data[i].Accion == 0 || data[i].Accion == null) ? 1 : data[i].Accion;
        ListaDetalles[index].SpoolID = $("#inputProceso").data("kendoComboBox").dataItem($("#inputProceso").data("kendoComboBox").select()).SpoolID;
        ListaDetalles[index].ProyectoProcesoPruebaID = $("#inputPrueba").data("kendoComboBox").dataItem($("#inputPrueba").data("kendoComboBox").select()).ProyectoProcesoPruebaID;
        ListaDetalles[index].UnidadMedida = data[i].UnidadMedida;
        ListaDetalles[index].ResultadoEvaluacion = data[i].ResultadoEvaluacion == "No" ? 0 : 1;
        ListaDetalles[index].FechaPrueba = data[i].FechaPrueba == null ? "" : kendo.toString(data[i].FechaPrueba, String(_dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()].replace('{', '').replace('}', '').replace("0:", ""))).trim();
        ListaDetalles[index].SistemaPinturaColorID = $("#inputProceso").data("kendoComboBox").dataItem($("#inputProceso").data("kendoComboBox").select()).ProcesoPinturaID != 4 ? 0 : $("#inputColor").data("kendoComboBox").dataItem($("#inputColor").data("kendoComboBox").select()).SistemaPinturaColorID;

        if (data[i].UnidadMedida == "" || data[i].FechaPrueba == "" || data[i].UnidadMedida == undefined || data[i].FechaPrueba == undefined || data[i].UnidadMedida == null || data[i].FechaPrueba == null)
            $("#grid").data("kendoGrid").dataSource._data[i].RowOk = false;
        index++;
    }
    Captura[0].Detalles = ListaDetalles;


    if (!ExistRowErrors($("#grid").data("kendoGrid").dataSource._data)) {
        if (Captura[0].Detalles.length > 0) {
            AjaxEjecutarGuardado(Captura[0], guardarYNuevo);
        }
        else {
            loadingStop();
        }
    }
    else {
        loadingStop();
        $("#grid").data("kendoGrid").dataSource.sync();
        ventanaConfirm = $("#ventanaConfirm").kendoWindow({
            iframe: true,
            title: _dictionary.TituloPopUpError[$("#language").data("kendoDropDownList").value()],
            visible: false, //the window will not appear before its .open method is called
            width: "auto",
            height: "auto",
            modal: true,
            actions: [],
            animation: {
                close: false,
                open: false
            }
        }).data("kendoWindow");

        ventanaConfirm.content(_dictionary.MensajeConfirmacionGuardadoGeneral[$("#language").data("kendoDropDownList").value()] +
            "</br><center><button class='btn btn-blue' id='yesButton'>" + _dictionary.EntregaPlacasGraficasbotonSi[$("#language").data("kendoDropDownList").value()] + "</button><button class='btn btn-blue' id='noButton'>" + _dictionary.EntregaPlacasGraficasbotonNo[$("#language").data("kendoDropDownList").value()] + "</button></center>");

        ventanaConfirm.open().center();

        $("#yesButton").click(function () {
            loadingStart();

            ArregloGuardado = [];
            var indice = 0;
            for (var i = 0; i < Captura[0].Detalles.length; i++) {
                if (Captura[0].Detalles[i].Estatus == 1) {
                    ArregloGuardado[indice] = ListaDetalles[i];
                    indice++;
                }
            }

            Captura[0].Detalles = [];
            Captura[0].Detalles = ArregloGuardado;

            if (Captura[0].Detalles.length > 0) {

                AjaxEjecutarGuardado(Captura[0], guardarYNuevo);
            }
            else {
                loadingStop();
                displayNotify("AdverteciaExcepcionGuardado", "", '1');
            }

            ventanaConfirm.close();
        });

        $("#noButton").click(function () {
            ventanaConfirm.close();
        });

    }

};

function ajaxObtenerProcesosPorSpool(dato,catalogo)
{
    loadingStart();
    $PruebasPorLote.PruebasPorLote.read({ token: Cookies.get("token"), dato: dato, lenguaje: $("#language").val(), catalogo: catalogo }).done(function (data) {
        if (Error(data)) {
            if (catalogo == 1) {
                $("#inputProceso").data("kendoComboBox").dataSource.data(data);
                $("#inputProceso").data("kendoComboBox").value("");
                if (data.length == 2) {
                    $("#inputProceso").data("kendoComboBox").select(1);
                    $("#inputProceso").data("kendoComboBox").trigger("change");
                }

                if (data.length == 0) {
                    displayNotify("PinturaCargaCarroSinSpools", "", '1');
                    $('.k-grid-add').click(function () { return false; });
                }
                else {
                    $('.k-grid-add').unbind('click');

                }
            }
            else if (catalogo == 2)
            {
                $("#inputPrueba").data("kendoComboBox").dataSource.data(data);
                $("#inputPrueba").data("kendoComboBox").value("");
                if (data.length == 2) {
                    $("#inputPrueba").data("kendoComboBox").select(1);
                    $("#inputPrueba").data("kendoComboBox").trigger("change");
                }
            }
        }
        loadingStop();
    });

}

function AjaxColores(sistemaPinturaProyectoID) {
    loadingStart();
    $AvanceCuadrante.AvanceCuadrante.read({ token: Cookies.get("token"), sistemaPinturaProyectoID: sistemaPinturaProyectoID, lenguaje: $("#language").val() }).done(function (data) {
        if (Error(data)) {
            $("#inputColor").data("kendoComboBox").dataSource.data(data);
            $("#inputColor").data("kendoComboBox").value("");
            if (data.length == 2) {
                $("#inputColor").data("kendoComboBox").select(1);
                $("#inputColor").data("kendoComboBox").trigger("change");
            }
        }
        loadingStop();
    });
}

function AjaxEjecutarGuardado(data, guardarYNuevo) {
    $PruebasPorLote.PruebasPorLote.create(data, { token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
        if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "Ok") {
            displayNotify("MensajeGuardadoExistoso", "", '0');
            if (guardarYNuevo == 1) {
                opcionHabilitarView(false, "FieldSetView");
                Limpiar();
                editado = false;
            }
            else {
                $("#grid").data("kendoGrid").dataSource.data([]);
                AjaxObtenerPruebasSpoolID($("#inputProceso").data("kendoComboBox").dataItem($("#inputProceso").data("kendoComboBox").select()).SpoolID, $("#inputPrueba").data("kendoComboBox").dataItem($("#inputPrueba").data("kendoComboBox").select()).ProyectoProcesoPruebaID, $("#inputProceso").data("kendoComboBox").dataItem($("#inputProceso").data("kendoComboBox").select()).ProcesoPinturaID != 4 ? 0 : $("#inputColor").data("kendoComboBox").dataItem($("#inputColor").data("kendoComboBox").select()).SistemaPinturaColorID);
                opcionHabilitarView(true, "FieldSetView");
            }
            loadingStop();
        }
        else {
            displayNotify("MensajeGuardadoErroneo", "", '2');
            loadingStop();

        }
    });
}

