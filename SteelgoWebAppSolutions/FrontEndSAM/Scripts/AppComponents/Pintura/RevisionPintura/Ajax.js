﻿var datoSeleccionado;
var tipoBusquedaSeleccionada;

function AjaxCargarCamposPredeterminados() {
    var TipoMuestraPredeterminadoID = 3073;
    $CamposPredeterminados.CamposPredeterminados.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), id: TipoMuestraPredeterminadoID }).done(function (data) {
        if (data == "Spool") {
            $('input:radio[name=TipoBusqueda]:nth(0)').trigger("click");

        }
        else if (data == "nc") {
            $('input:radio[name=TipoBusqueda]:nth(1)').trigger("click");
        }
    });
    // AjaxCargarTipoLlenado();
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

function AjaxEjecutarBusquedaSpoolConSP()
{
    $RevisionPintura.RevisionPintura.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), proyectoid: $("#inputProyecto").data("kendoComboBox").value(), dato: datoSeleccionado, tipoBusqueda: tipoBusquedaSeleccionada }).done(function (data) {
        var array = data;
        var elementosModificados = "";
        $("#grid").data("kendoGrid").dataSource.data([]);
        var ds = $("#grid").data("kendoGrid").dataSource;
        for (var i = 0; i < array.length; i++) {
            ds.insert(0, array[i]);
            if (elementosModificados != "")
                elementosModificados += ", " + array[i].NombreSpool;
            else
                elementosModificados = array[i].NombreSpool;
        }

        if ($('input:radio[name=TipoBusqueda]:checked').val() == "spool" && elementosModificados != "") {
            editado = true;
            $("#inputSpool").val("")
            //displayNotify("InformacionAgregada", "", '0');
        }
        else if (elementosModificados != "") {
            editado = true;
            $("#inputNc").val("")
            //displayNotify("InformacionAgregada", "", '0');
        }
        else {
            displayNotify("ErrorSpoolAgregarProyectoIncorrecto", "", '1');
        }
    });
}

function AjaxConsultarSpoolsConSP() {
    tipoBusquedaSeleccionada = $('input:radio[name=TipoBusqueda]:checked').val() == "spool" ? 1 : 2;
    datoSeleccionado= tipoBusquedaSeleccionada == 1 ? $("#inputSpool").val() : $("#inputNc").val();
    $RevisionPintura.RevisionPintura.read({ token: Cookies.get("token"), proyectoid: $("#inputProyecto").data("kendoComboBox").value(), dato: datoSeleccionado, tipoBusqueda: tipoBusquedaSeleccionada }).done(function (numeroData) {
        if (numeroData > 0 && numeroData < 100) {
            AjaxEjecutarBusquedaSpoolConSP();
        }
        else if (numeroData > 0) {
            var ventanaConfirmBusqueda = $("#ventanaConfirm").kendoWindow({
                iframe: true,
                title: _dictionary.EntregaPlacasGraficasTituloPopup[$("#language").data("kendoDropDownList").value()],
                visible: false,
                width: "45%",
                height: "auto",
                draggable: false,
                actions: [],
                modal: true,
                animation: {
                    close: false,
                    open: false
                }
            }).data("kendoWindow");
            ventanaConfirmBusqueda.content('<center>' + _dictionary.SPAMensajeAlertaCantidadRegistros[$("#language").data("kendoDropDownList").value()] + '</center>' +
                "</br><center><button class='btn btn-blue' id='btnContinuarBusqueda'>Si</button> <button class='btn btn-blue' id='btnCancelarBusqueda'>No</button></center>");

            ventanaConfirmBusqueda.open().center();
            $("#btnContinuarBusqueda").click(function () {
                AjaxEjecutarBusquedaSpoolConSP();
                ventanaConfirmBusqueda.close();
            });
            $("#btnCancelarBusqueda").click(function () {
                ventanaConfirmBusqueda.close();
            });
        }
    });
};

function AjaxGuardar(arregloCaptura, tipoGuardar) {

    loadingStart();
    Captura = [];
    Captura[0] = { Detalles: "" };
    ListaDetalles = [];
    var row = 0;
    for (index = 0; index < arregloCaptura.length; index++) {
        $("#grid").data("kendoGrid").dataSource._data[index].RowOk = true;
        if (arregloCaptura[index].GenerarRevision) {
            ListaDetalles[row] = { Accion: "", SpoolID: "",SistemaPinturaID:"",SistemaPinturaColorID:"", ComentarioID: "", Estatus: 1 };
            ListaDetalles[row].Accion = arregloCaptura[index].Accion;
            ListaDetalles[row].SpoolID = arregloCaptura[index].SpoolID;
            ListaDetalles[row].SistemaPinturaID = arregloCaptura[index].SistemaPinturaID;
            ListaDetalles[row].ComentarioID = arregloCaptura[index].ComentarioID;
            ListaDetalles[row].SistemaPinturaColorID = arregloCaptura[index].SistemaPinturaColorID;
            if (arregloCaptura[index].ComentarioID == "" || arregloCaptura[index].ComentarioID == null || arregloCaptura[index].ComentarioID == undefined|| arregloCaptura[index].ComentarioID == 0) {
                ListaDetalles[row].Estatus = 0;
                $("#grid").data("kendoGrid").dataSource._data[index].RowOk = false;
            }
            if (arregloCaptura[index].NoPintable == false && (arregloCaptura[index].Color == "" || arregloCaptura[index].Color == undefined || arregloCaptura[index].Color == null))
            {
                ListaDetalles[row].Estatus = 0;
                $("#grid").data("kendoGrid").dataSource._data[index].RowOk = false;
            }
            row++;
        }
    };
    Captura[0].Detalles = ListaDetalles;

    if (ListaDetalles.length > 0) {
        if (!ExistRowEmpty(ListaDetalles)) {
            if (Captura[0].Detalles.length > 0) {
                AjaxEjecutarGuardado(Captura[0], tipoGuardar);
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

                    AjaxEjecutarGuardado(Captura[0], tipoGuardar);
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
    }
    else {
        displayNotify("AdverteciaExcepcionGuardado", "", '1');
        $("#grid").data("kendoGrid").dataSource.sync();
        loadingStop();
    }

};

function AjaxEjecutarGuardado(rows, tipoGuardar) {
    loadingStart();
    $RevisionPintura.RevisionPintura.create(rows, { token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {

        if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "Ok") {
            displayNotify("MensajeGuardadoExistoso", "", '0');
            loadingStop();

            if (tipoGuardar == 1) {
                $("#btnCancelar").trigger("click");
            }
            else {
                opcionHabilitarView(true, "FieldSetView");
                AjaxCambiarAccionAModificacion();
            }
        }
        else {
            //mensaje = "No se guardo la informacion el error es: " + data.ReturnMessage[0] + "-2";
            displayNotify("MensajeGuardadoErroneo", "", '2');
            loadingStop();

        }
    });
}

function AjaxCambiarAccionAModificacion() {
    var capturaListado = [];
    capturaListado[0] = { Detalles: "" };
    var listado = ArregloListadoSpoolsCapturados();

    capturaListado[0].Detalles = listado;

    $("#grid").data("kendoGrid").dataSource.data([]);

    loadingStart();
    $RevisionPintura.RevisionPintura.update(capturaListado[0], { token: Cookies.get("token"), lenguaje: $("#language").val(), SinCaptura: $('input:radio[name=Muestra]:checked').val() }).done(function (data) {
        if (Error(data)) {
            var ds = $("#grid").data("kendoGrid").dataSource;
            var array = data;

            for (var i = 0; i < array.length; i++) {
                ds.insert(array[i], 0);
            }

            if (data.length > 0)
                ds.page(1);
            $("#grid").data("kendoGrid").dataSource.sync();
        }

        loadingStop();
    });
}

function AjaxCargarColorPinturaRender(sistemaPinturaID, options) {
    $SistemaPinturaAplicable.SistemaPinturaAplicable.read({ token: Cookies.get("token"), SistemaPinturaID: sistemaPinturaID, Lenguaje: $("#language").val() }).done(function (data) {
        if (data.length > 0) {
            options.model.ListaColorPintura = data;
            $("#grid").data("kendoGrid").refresh();
        }
    });
}