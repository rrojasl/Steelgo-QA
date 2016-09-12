var CampoMuestra = 29;
var CampoLlena = 3054;


function AjaxObtenerProyectos() {
    loadingStart();

    $Proyectos.Proyectos.read({ token: Cookies.get("token") }).done(function (data) {
        $("#inputProyecto").data("kendoComboBox").value("");
        $("#inputProyecto").data("kendoComboBox").dataSource.data(data);

        if ($("#inputProyecto").data("kendoComboBox").dataSource._data.length == 2) {
            $("#inputProyecto").data("kendoComboBox").select(1);
            $("#inputProyecto").data("kendoComboBox").trigger("change");
        }
        else {
            $("#inputProyecto").data("kendoComboBox").select(0);
            loadingStop();
        }


    });
}


function AjaxPruebas() {
    if ($("#inputProyecto").val() != "") {
        loadingStart();
        $ServiciosTecnicosGeneral.ServiciosTecnicosGeneral.read({ token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
            if (Error(data)) {
                $("#inputPrueba").data("kendoComboBox").value("");
                $("#inputPrueba").data("kendoComboBox").dataSource.data(data);

                if ($("#inputPrueba").data("kendoComboBox").dataSource._data.length == 2) {
                    $("#inputPrueba").data("kendoComboBox").select(1);
                    
                }
                else {

                }
                AjaxCargarRequisicionAsignacion();
            }
            
        });
    }
};


function AjaxRequisicion() {
    if ($("#inputPrueba").data("kendoComboBox").value() != "") {
        loadingStart();
        $ServiciosTecnicosGeneral.ServiciosTecnicosGeneral.read({ token: Cookies.get("token"), ProyectoID: $("#inputProyecto").data("kendoComboBox").value(), TipoPruebaID: $("#inputPrueba").data("kendoComboBox").value(), estatusID: 2 }).done(function (data) {
            if (Error(data)) {
                $("#inputRequisicion").data("kendoComboBox").value("");
                $("#inputRequisicion").data("kendoComboBox").dataSource.data(data);

                if ($("#inputRequisicion").data("kendoComboBox").dataSource._data.length == 2) {
                    $("#inputRequisicion").data("kendoComboBox").select(1);
                    $("#inputRequisicion").data("kendoComboBox").trigger("change");

                }
                

            }

        });
    }
};



function AjaxObtenerEquipo() {
    loadingStart();
    if ($("#inputProveedor").data("kendoComboBox").text() != "") {
        $ServiciosTecnicosGeneral.ServiciosTecnicosGeneral.read({ token: Cookies.get("token"), ProveedorID: $("#inputProveedor").data("kendoComboBox").value(), TipoPruebaID: $("#inputPrueba").data("kendoComboBox").value(),estatusID: 2, lenguaje: $("#language").val() }).done(function (data) {
            $("#inputEquipo").data("kendoComboBox").value("");
            $("#inputEquipo").data("kendoComboBox").dataSource.data(data);

            if ($("#inputEquipo").data("kendoComboBox").dataSource._data.length == 2) {
                $("#inputEquipo").data("kendoComboBox").select(1);
                $("#inputEquipo").data("kendoComboBox").trigger("change");
            }
            else {
                $("#inputEquipo").data("kendoComboBox").select(0);
                loadingStop();
            }

        });
    }
    else {
        loadingStop();
        $("#inputEquipo").data("kendoComboBox").setDataSource();
        $("#inputEquipo").data("kendoComboBox").value("");
    }
}

function AjaxObtenerTurno() {
    loadingStart();
    var RequiereEquipo = $('#inputPrueba').data("kendoComboBox").dataSource._data[$('#inputPrueba').data("kendoComboBox").selectedIndex].RequiereEquipo;
    if ($("#inputProveedor").data("kendoComboBox").text() != "") {
        if (!RequiereEquipo) {

            $ServiciosTecnicosGeneral.ServiciosTecnicosGeneral.read({ token: Cookies.get("token"), TipoPruebaID: $("#inputPrueba").data("kendoComboBox").value(), ProveedorID: $("#inputProveedor").data("kendoComboBox").value(), EquipoID: 0, lenguaje: $("#language").val() }).done(function (data) {
                $("#inputTurno").data("kendoComboBox").value("");
                $("#inputTurno").data("kendoComboBox").dataSource.data(data);

                if ($("#inputTurno").data("kendoComboBox").dataSource._data.length == 2) {
                    $("#inputTurno").data("kendoComboBox").select(1);
                    $("#inputTurno").data("kendoComboBox").trigger("change");
                }
                else {
                    $("#inputTurno").data("kendoComboBox").select(0);
                    loadingStop();
                }
                $("#inputTurno").data("kendoComboBox").value("");

            });
        }
        else {
            if ($("#inputEquipo").data("kendoComboBox").value() != "") {
                $ServiciosTecnicosGeneral.ServiciosTecnicosGeneral.read({ token: Cookies.get("token"), TipoPruebaID: $("#inputPrueba").data("kendoComboBox").value(), ProveedorID: $("#inputProveedor").data("kendoComboBox").value(), EquipoID: $("#inputEquipo").data("kendoComboBox").value(), lenguaje: $("#language").val() }).done(function (data) {
                    $("#inputTurno").data("kendoComboBox").value("");
                    $("#inputTurno").data("kendoComboBox").dataSource.data(data);

                    if ($("#inputTurno").data("kendoComboBox").dataSource._data.length == 2) {
                        $("#inputTurno").data("kendoComboBox").select(1);
                        $("#inputTurno").data("kendoComboBox").trigger("change");
                    }
                    else {
                        $("#inputTurno").data("kendoComboBox").select(0);
                        loadingStop();
                    }


                });
            }
        }
    }
    else {
        $("#inputTurno").data("kendoComboBox").setDataSource();
        $("#inputTurno").data("kendoComboBox").value("");
    }

}



function AjaxObtenerProveedor() {
    if ($("#inputPrueba").data("kendoComboBox").value() != "") {
        loadingStart();
        var patioID = $('#inputProyecto').data("kendoComboBox").dataSource._data[$('#inputProyecto').data("kendoComboBox").selectedIndex].PatioID;
        $ServiciosTecnicosGeneral.ServiciosTecnicosGeneral.read({ token: Cookies.get("token"), ProyectoID: $("#inputProyecto").data("kendoComboBox").value(), PatioID: 6, TipoPruebaID: $("#inputPrueba").data("kendoComboBox").value() }).done(function (data) {
            if (Error(data)) {
                $("#inputProveedor").data("kendoComboBox").value("");
                $("#inputProveedor").data("kendoComboBox").dataSource.data(data);

                if ($("#inputProveedor").data("kendoComboBox").dataSource._data.length == 2) {
                    $("#inputProveedor").data("kendoComboBox").select(1);
                    $("#inputProveedor").data("kendoComboBox").trigger("change");
                    var RequiereEquipo = $('#inputPrueba').data("kendoComboBox").dataSource._data[$('#inputPrueba').data("kendoComboBox").selectedIndex].RequiereEquipo;
                    if (!RequiereEquipo) {
                        AjaxObtenerTurno();

                    }
                    else {
                        AjaxObtenerEquipo();

                    }
                }
                else {

                }
            }
            loadingStop();
        });
    }
}





function ObtenerDato(fecha, tipoDatoObtener) {
    var cultura = $("#language").val();

    switch (tipoDatoObtener) {
        case 1://anho
            return fecha.split('/')[2]
            break;
        case 2://mes
            if (cultura = 'es-MX')
                return fecha.split('/')[1]
            else
                return fecha.split('/')[0]
            break;
        case 3://dia
            if (cultura = 'es-MX')
                return fecha.split('/')[0]
            else
                return fecha.split('/')[1]
            break;
    }
}

function AjaxCargarRequisicionAsignacion() {

    if ($("#inputProyecto").data("kendoComboBox").value() != "") {
        var patioID = $('#inputProyecto').data("kendoComboBox").dataSource._data[$('#inputProyecto').data("kendoComboBox").selectedIndex].PatioID;
        loadingStart();
        $AsignarRequisicion.AsignarRequisicion.read({ lenguaje: $("#language").val(), token: Cookies.get("token"), mostrar: $('input:radio[name=Muestra]:checked').val(), TipoPruebaID: $("#inputPrueba").val() == "" ? 0 : $("#inputPrueba").val(), ProyectoID: $("#inputProyecto").data("kendoComboBox").value(), PatioID: patioID, RequisicionID: $("#inputRequisicion").val() == "" ? 0 : $("#inputRequisicion").val() }).done(function (data) {
            if (Error(data)) {
                $("#grid").data("kendoGrid").dataSource.data([]);
                //$("#grid").data("kendoGrid").dataSource.data(data);
                var ds = $("#grid").data("kendoGrid").dataSource;
                var array = data;
                for (var i = 0; i < array.length; i++) {
                    array[i].Fecha = new Date(ObtenerDato(array[i].Fecha, 1), ObtenerDato(array[i].Fecha, 2), ObtenerDato(array[i].Fecha, 3));//año, mes, dia
                    ds.add(array[i]);
                }

            }
            loadingStop();
            if ($("#inputPrueba").data("kendoComboBox").text() != "") {
                AjaxRequisicion();
            }

        });

    }

}

function AjaxCargarCamposPredeterminados() {
    loadingStart();
    $CamposPredeterminados.CamposPredeterminados.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), id: CampoMuestra }).done(function (data) {
        if (Error(data)) {
            if (data == "sin captura") {
                $('input:radio[name=Muestra]:nth(0)').trigger("click");

                $("#styleSinCaptura").addClass("active");
                $("#styleTodos").removeClass("active");
            }
            else if (data == "Todos") {

                $('input:radio[name=Muestra]:nth(1)').trigger("click");
                $("#styleTodos").addClass("active");
                $("#styleSinCaptura").removeClass("active");
            }

        }
        loadingStop();
    });

    $CamposPredeterminados.CamposPredeterminados.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), id: CampoLlena }).done(function (data) {
        if (Error(data)) {
            if (data == "Vacios") {
                $('input:radio[name=Planchar]:nth(0)').trigger("click");
            }
            else if (data == "Todos") {
                $('input:radio[name=Planchar]:nth(1)').trigger("click");
            }
        }
        loadingStop();
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
            ListaDetalles[i] = { Accion: "", RequisicionAsignacionID: "", RequisicionID: "", TipoPruebaProveedorID: "", ProveedorEquipoID: "", CapacidadTurnoEquipoID: "", CapacidadTurnoProveedorID: "", Fecha: "", Estatus: 1 };

            ListaDetalles[i].Accion = arregloCaptura[index].Accion;
            ListaDetalles[i].RequisicionAsignacionID = arregloCaptura[index].RequisicionAsignacionID;
            ListaDetalles[i].RequisicionID = arregloCaptura[index].RequisicionID;
            ListaDetalles[i].TipoPruebaProveedorID = arregloCaptura[index].TipoPruebaProveedorID;
            ListaDetalles[i].ProveedorEquipoID = arregloCaptura[index].ProveedorEquipoID;
            ListaDetalles[i].CapacidadTurnoEquipoID = arregloCaptura[index].CapacidadTurnoEquipoID;
            ListaDetalles[i].CapacidadTurnoProveedorID = arregloCaptura[index].CapacidadTurnoProveedorID;
            ListaDetalles[i].Fecha = kendo.toString(arregloCaptura[index].Fecha, String(_dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()].replace('{', '').replace('}', '').replace("0:", ""))).trim();

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

        if (!ExistRowEmpty(ListaDetalles)) {
            if (Captura[0].Detalles.length > 0) {
                loadingStart();
                $AsignarRequisicion.AsignarRequisicion.create(Captura[0], { token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
                    if (Error(data)) {
                        if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "Ok") {
                            if (tipoGuardar == 1) {
                                setTimeout(function () { AjaxObtenerProyectos(); }, 500);
                                opcionHabilitarView(false, "FieldSetView");
                            }
                            else {
                                $("#grid").data("kendoGrid").dataSource.data([]);
                                AjaxCargarRequisicionAsignacion();
                                opcionHabilitarView(true, "FieldSetView");

                            }
                            displayNotify("CapturaMensajeGuardadoExitoso", "", "0");
                        }
                        else if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] != "Ok") {
                            mensaje = "No se guardo la informacion el error es: " + data.ReturnMessage[0] + "-2"
                            displayNotify("CapturaMensajeGuardadoErroneo", "", '2');
                        }
                    }
                });
                loadingStop();
            }
            else {
                loadingStop();
            }
        }
        else {
            loadingStop();


            ventanaConfirm = $("#ventanaConfirm").kendoWindow({
                iframe: true,
                title: _dictionary.EntregaPlacasGraficasTituloPopup[$("#language").data("kendoDropDownList").value()],
                visible: false, //the window will not appear before its .open method is called
                width: "auto",
                height: "auto",
                modal: true,
                animation: {
                    close: false,
                    open: false
                }
            }).data("kendoWindow");

            ventanaConfirm.content(_dictionary.EntregaPlacasGraficasMensajePreguntaGuardado[$("#language").data("kendoDropDownList").value()] +
                "</br><center><button class='btn btn-blue' id='yesButton'>Si</button><button class='btn btn-blue' id='noButton'> No</button></center>");

            ventanaConfirm.open().center();



            $("#yesButton").click(function () {
                loadingStart();

                ArregloGuardado = [];
                var indice = 0;
                for (var i = 0; i < Captura[0].Detalles.length; i++) {
                    if (Captura[0].Detalles[i].Estatus == 1) {
                        ArregloGuardado[indice] = Captura[0].Detalles[i];
                        indice++;
                    }
                }

                Captura[0].Detalles = [];
                Captura[0].Detalles = ArregloGuardado;


                if (ArregloGuardado.length > 0) {
                    $AsignarRequisicion.AsignarRequisicion.create(Captura[0], { token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
                        if (Error(data)) {
                            if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "Ok") {
                                if (tipoGuardar == 1) {
                                    AjaxCargarRequisicionAsignacion();
                                    opcionHabilitarView(false, "FieldSetView");
                                }
                                else {
                                    $("#grid").data("kendoGrid").dataSource.data([]);
                                    AjaxCargarRequisicionAsignacion();
                                    opcionHabilitarView(true, "FieldSetView");

                                }
                                displayNotify("MensajeGuardadoExistoso", "", '0');
                            }
                            else if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] != "Ok") {
                                mensaje = "No se guardo la informacion el error es: " + data.ReturnMessage[0] + "-2"
                                displayNotify("MensajeGuardadoErroneo", "", '1');
                            }
                        }
                    });
                    loadingStop();
                }
                else {
                    loadingStop();
                    displayNotify("AdverteciaExcepcionGuardado", "", '1');
                }
                opcionHabilitarView(false, "FieldSetView");
                ventanaConfirm.close();
            });
            $("#noButton").click(function () {
                ventanaConfirm.close();
                opcionHabilitarView(false, "FieldSetView");
            });

        }

    } catch (e) {
        loadingStop();
        displayNotify("", e.message, '1');

    }

};