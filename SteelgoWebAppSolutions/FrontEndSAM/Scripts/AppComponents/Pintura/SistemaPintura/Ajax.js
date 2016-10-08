﻿function AjaxObtenerProyectos() {
    loadingStart();

    $Proyectos.Proyectos.read({ token: Cookies.get("token") }).done(function (data) {
        if (Error(data)) {
            $("#inputProyecto").data("kendoMultiSelect").dataSource.data([]);
            $("#inputProyecto").data("kendoMultiSelect").value("");
            data.shift();
            $("#inputProyecto").data("kendoMultiSelect").dataSource.data(data);
            AjaxCargarNuevoSistemaPintura();
        }
        loadingStop();
    });
}


function AjaxObtenerColor() {
    loadingStart();

    $PinturaGeneral.PinturaGeneral.read({ token: Cookies.get("token"), Lenguaje: $("#language").val() }).done(function (data) {
        if (Error(data)) {
            $("#inputColor").data("kendoMultiSelect").dataSource.data([]);
            $("#inputColor").data("kendoMultiSelect").value("");
            data.shift();
            $("#inputColor").data("kendoMultiSelect").dataSource.data(data);

            if ($("#inputSistemaPinturaID").val() != "") {
                $("#divComboProyecto").css("display", "block");
                $("#divMultiselectProyecto").css("display", "none");
                AjaxCargarEdicionSistemaPintura();
            }
            else {
                AjaxObtenerProyectos();
            }


        }
        loadingStop();
    });
}


function AjaxCargarNuevoSistemaPintura() {
    var SistemaPinturaID = 0, ProyectoID = 0;
    if ($("#inputSistemaPinturaID").val() != "") {
        SistemaPinturaID = $("#inputSistemaPinturaID").val();
        ProyectoID = $("#comboProyecto").data("kendoComboBox").value();
    }


    loadingStart();
    $SistemaPintura.SistemaPintura.read({ token: Cookies.get("token"), Lenguaje: $("#language").val(), SistemaPinturaID: SistemaPinturaID, ProyectoID: ProyectoID }).done(function (data) {
        if (Error(data)) {
            $("#grid").data("kendoGrid").dataSource.data([]);
            var ds = $("#grid").data("kendoGrid").dataSource;
            var array = data;

            for (var i = 0; i < array.length; i++) {
                ds.add(array[i]);
            }
        }
        loadingStop();

    });

}


function AjaxCargarEdicionSistemaPintura() {
    var SistemaPinturaID = 0;
    if ($("#inputSistemaPinturaID").val() != "") {
        SistemaPinturaID = $("#inputSistemaPinturaID").val();

        loadingStart();
        $SistemaPintura.SistemaPintura.read({ token: Cookies.get("token"), Lenguaje: $("#language").val(), SistemaPinturaID: SistemaPinturaID }).done(function (data) {
            if (Error(data)) {
                if (data.length > 0) {
                    $("#inputNombre").val(data[0].Nombre);
                    $("#inputSistemaPinturaID").val(data[0].SistemaPinturaID);

                    if (data[0].NoPintable) {
                        $("#inputNoAplicable").prop("checked", true);
                        $("#inputColor").data("kendoMultiSelect").enable(false);
                    }
                    if (data[0].listadoColor.length > 0) {
                        var valores = [];
                        for (var i = 0; i < data[0].listadoColor.length; i++) {
                            valores[i] = data[0].listadoColor[i].ColorID;
                        };

                        $("#inputColor").data("kendoMultiSelect").value(valores);
                    }
                    $("#comboProyecto").data("kendoComboBox").dataSource.data(data[0].listadoProyectos);
                    if ($("#comboProyecto").data("kendoComboBox").dataSource._data.length == 2) {
                        $("#comboProyecto").data("kendoComboBox").select(1);
                        AjaxCargarNuevoSistemaPintura();
                    }
                    else {
                        $("#comboProyecto").data("kendoComboBox").select(0);
                        loadingStop();
                    }

                }
            }
            loadingStop();

        });
    }

}



function AjaxGuardarCaptura(arregloCaptura, tipoGuardar) {
    try {
        $("#grid").data("kendoGrid").dataSource.sync();
        var SistemaPinturaID = 0, Nombre = "", ProyectoID = 0, NoPintable = 0;
        Captura = [];
        ListasCaptura = [];
        Captura[0] = { Detalles: "", ListadoColor: "", ListadoProyectos: "" };
        ListaSPNuevo = [];
        ListaSPNuevo[0] = { Nombre: "", NoPintable:"", Accion:"" };

        ListasCaptura[0] = { ListaSPNuevo: "", ListaSPProyecto: "", ListaSPColor: "", ListaSPProyectoProceso: "" };
        ListaDetalles = [];
        ListaColor = [];
        ListaProyectos = [];


        NoPintable = ($("#inputNoAplicable").is(':checked')) ? 1 : 0;
        var necesitaColor = false;
        var ds = $("#grid").data("kendoGrid").dataSource;
        for (var i = 0; i < ds._data.length; i++) {
            if (ds._data[i].Agregar && (ds._data[i].Proceso == "Intermedio" || ds._data[i].Proceso == "Acabado")) {
                necesitaColor = true;
            }
        }


        SistemaPinturaID = $("#inputSistemaPinturaID").val() == "" ? 0 : $("#inputSistemaPinturaID").val();
        Nombre = $("#inputNombre").val();
        if (Nombre == "") {
            displayNotify("", "El campo nombre no puede ir vacio", 1);
            return;
        }
        if ($("#inputSistemaPinturaID").val() == "") {
            if ($("#inputColor").data("kendoMultiSelect")._values.length == 0 && necesitaColor) {
                displayNotify("", "Selecciona al menos un color", 1);
                return;
            }
            else {
                for (var i = 0; i < $("#inputColor").data("kendoMultiSelect")._values.length; i++) {
                    ListaColor[i] = {Accion: "", ColorID: "" };
                    ListaColor[i].ColorID = $("#inputColor").data("kendoMultiSelect")._values[i];
                    ListaColor[i].Accion = 1;
                }
            }
        }
        
        if ($('#comboProyecto').is(':visible')) {
            if ($("#comboProyecto").data("kendoComboBox").text() != "") {
                ProyectoID = $("#comboProyecto").data("kendoComboBox").value();
            }
            else {
                displayNotify("", "Selecciona un proyecto", 1);
                return;
            }
        }
        else {
            if ($("#inputProyecto").data("kendoMultiSelect")._values.length == 0) {
                displayNotify("", "Selecciona al menos un proyecto", 1);
                return;
            }
            else {
                for (var i = 0; i < $("#inputProyecto").data("kendoMultiSelect")._values.length; i++) {
                    ListaProyectos[i] = { ProyectoID: "", Accion: "" };
                    ListaProyectos[i].ProyectoID = $("#inputProyecto").data("kendoMultiSelect")._values[i];
                    ListaProyectos[i].Accion = 1;
                }
            }
        }

        ListaSPNuevo[0].Nombre= Nombre;
        ListaSPNuevo[0].NoPintable=NoPintable;
        ListaSPNuevo[0].Accion = 1;

        var i = 0;
        for (index = 0; index < arregloCaptura.length; index++) {
            if (arregloCaptura[index].Agregar) {
                ListaDetalles[i] = { Accion: "", ProcesoPinturaID: "", MetrosLote: "", NumeroPruebas: "", ProyectoID: "", ListadoPruebas: [], Estatus: 1 };

                ListaDetalles[i].Accion = arregloCaptura[index].Accion;
                ListaDetalles[i].ProcesoPinturaID = arregloCaptura[index].ProcesoPinturaID;
                ListaDetalles[i].MetrosLote = arregloCaptura[index].MetrosLote;
                ListaDetalles[i].NumeroPruebas = arregloCaptura[index].NumeroPruebas;
                ListaDetalles[i].ProyectoID = ;

                for (var j = 0; j < arregloCaptura[index].listadoPruebasDetalle.length; j++) {
                    ListaDetalles[i].ListadoPruebas[j] = { Accion: "", ProyectoProcesoPruebaID: "", SistemaPinturaProyectoProcesoID: "", UnidadMedidaID: "", UnidadMinima: "", UnidadMaxima: "" };
                    ListaDetalles[i].ListadoPruebas[j].Accion = arregloCaptura[index].listadoPruebasDetalle[j].Accion;
                    ListaDetalles[i].ListadoPruebas[j].ProyectoProcesoPruebaID = arregloCaptura[index].listadoPruebasDetalle[j].ProyectoProcesoPruebaID;
                    ListaDetalles[i].ListadoPruebas[j].SistemaPinturaProyectoProcesoID = arregloCaptura[index].SistemaPinturaProyectoProcesoID;
                    ListaDetalles[i].ListadoPruebas[j].UnidadMedidaID = arregloCaptura[index].listadoPruebasDetalle[j].UnidadMedidaID;
                    ListaDetalles[i].ListadoPruebas[j].UnidadMinima = arregloCaptura[index].listadoPruebasDetalle[j].UnidadMinima;
                    ListaDetalles[i].ListadoPruebas[j].UnidadMaxima = arregloCaptura[index].listadoPruebasDetalle[j].UnidadMaxima;
                }


                if (arregloCaptura[index].Agregar && (arregloCaptura[index].MetrosLote == "" || arregloCaptura[index].NumeroPruebas == "")) {
                    ListaDetalles[i].Estatus = 0;
                    $('tr[data-uid="' + arregloCaptura[index].uid + '"] ').css("background-color", "#ffcccc");
                }
                i++;
            }
        }

        
        ListasCaptura[0].ListaSPNuevo = ListaSPNuevo;
        ListasCaptura[0].ListaSPProyecto = ListaProyectos;
        ListasCaptura[0].ListaSPColor = ListaColor;
        ListasCaptura[0].ListaSPProyectoProceso = ListaDetalles;
        Captura[0].Detalles = ListasCaptura;


        //if (!ExistRowEmpty(ListaDetalles)) {
                loadingStart();
                $SistemaPintura.SistemaPintura.create(Captura[0], { token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {                   
                    if (Error(data)) {
                        if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "Ok") {
                            if (tipo<add name="SqlServer" connectionString="server=LAPMAFTEC04;initial catalog=steelgo-sam3;User=sa;Password=maftec04;MultipleActiveResultSets=True;Connect Timeout=2000" /> == 1) {
                                $("#grid").data("kendoGrid").dataSource.data([]);
                                opcionHabilitarView(false, "FieldSetView");
                            }
                            else {
                                $("#grid").data("kendoGrid").dataSource.data([]);
                                opcionHabilitarView(true, "FieldSetView");
                            }
                            displayNotify("MensajeGuardadoExistoso", "", "0");
                        }
                        else if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] != "Ok") {
                            mensaje = "No se guardo la informacion el error es: " + data.ReturnMessage[0] + "-2"
                            displayNotify("MensajeGuardadoErroneo", "", '2');
                        }
                    }
                });
        //}
        //else {
        //    loadingStop();


        //    ventanaConfirm = $("#ventanaConfirm").kendoWindow({
        //        iframe: true,
        //        title: _dictionary.EntregaPlacasGraficasTituloPopup[$("#language").data("kendoDropDownList").value()],
        //        visible: false, //the window will not appear before its .open method is called
        //        width: "auto",
        //        height: "auto",
        //        modal: true,
        //        animation: {
        //            close: false,
        //            open: false
        //        }
        //    }).data("kendoWindow");

        //    ventanaConfirm.content(_dictionary.EntregaPlacasGraficasMensajePreguntaGuardado[$("#language").data("kendoDropDownList").value()] +
        //        "</br><center><button class='btn btn-blue' id='yesButton'>Si</button><button class='btn btn-blue' id='noButton'> No</button></center>");

        //    ventanaConfirm.open().center();



        //    $("#yesButton").click(function () {
        //        loadingStart();

        //        ArregloGuardado = [];
        //        var indice = 0;
        //        for (var i = 0; i < Captura[0].Detalles.length; i++) {
        //            if (Captura[0].Detalles[i].Estatus == 1) {
        //                ArregloGuardado[indice] = Captura[0].Detalles[i];
        //                indice++;
        //            }
        //        }

        //        Captura[0].Detalles = [];
        //        Captura[0].Detalles = ArregloGuardado;


        //        if (ArregloGuardado.length > 0) {
        //            //$AsignarRequisicion.AsignarRequisicion.create(Captura[0], { token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
        //            //    editado = true;
        //            //    if (Error(data)) {
        //            //        if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "Ok") {
        //            //            if (tipo<add name="SqlServer" connectionString="server=LAPMAFTEC04;initial catalog=steelgo-sam3;User=sa;Password=maftec04;MultipleActiveResultSets=True;Connect Timeout=2000" /> == 1) {
        //            //                AjaxCargarRequisicionAsignacion();
        //            //                opcionHabilitarView(false, "FieldSetView");
        //            //            }
        //            //            else {
        //            //                $("#grid").data("kendoGrid").dataSource.data([]);
        //            //                AjaxCargarRequisicionAsignacion();
        //            //                opcionHabilitarView(true, "FieldSetView");

        //            //            }
        //            //            displayNotify("MensajeGuardadoExistoso", "", '0');
        //            //            editado = false;
        //            //        }
        //            //        else if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] != "Ok") {
        //            //            mensaje = "No se guardo la informacion el error es: " + data.ReturnMessage[0] + "-2"
        //            //            displayNotify("MensajeGuardadoErroneo", "", '2');
        //            //        }
        //            //    }
        //            //});
        //            loadingStop();
        //        }
        //        else {
        //            loadingStop();
        //            displayNotify("MensajeAdverteciaExcepcionGuardado", "", '1');
        //        }
        //        opcionHabilitarView(false, "FieldSetView");
        //        ventanaConfirm.close();
        //    });
        //    $("#noButton").click(function () {
        //        ventanaConfirm.close();
        //        opcionHabilitarView(false, "FieldSetView");
        //    });

        //}

    } catch (e) {
        loadingStop();
        displayNotify("", e.message, '1');

    }

};