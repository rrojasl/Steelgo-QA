function SuscribirEventos() {
    SuscribirEventoCarro();
    SuscribirEventoZona();
    SuscribirEventoCuadrante();
    SuscribirEventoGuardar();
    suscribirEventoDescargar();
    SuscribirEventoPlanchar();
    suscribirEventoChangeRadio();
    suscribirEventoBoton();
};

function MostrarDatos() {
    if ($('input:radio[name=LLena]:checked').val() != undefined) {
        CambiarDetalleGridPorIDCarroSeleccionado($("#inputCarro").data("kendoComboBox").dataItem($("#inputCarro").data("kendoComboBox").select()).MedioTransporteID);
        modificado = false;
        if ($('input:radio[name=Muestra]:checked').val() === "Todos") {
            FiltroMostrar(1);
        }
        else {
            FiltroMostrar(0);
        }
    }
    else {
        displayNotify("", "selecciona sin captura o todos.", '1');
    }
};
function suscribirEventoBoton() {
    $("#btnBuscar").click(function (e) {
        if ($("#inputCarro").data("kendoComboBox").dataItem($("#inputCarro").data("kendoComboBox").select()) != undefined && $("#inputCarro").data("kendoComboBox").dataItem($("#inputCarro").data("kendoComboBox").select()).MedioTransporteID != 0) {
            MostrarDatos();
        }
        else {
            displayNotify("", "selecciona un carro porfavor", '1');
        }

    });
};
function SuscribirEventoPlanchar() {
    $("#ButtonPlanchar").click(function (e) {

        if ($('input:radio[name=LLena]:checked').val() === "Todos") {
            windowTemplate = kendo.template($("#windowTemplate").html());

            ventanaConfirm = $("#ventanaConfirm").kendoWindow({
                iframe: true,
                title: _dictionary.CapturaAvanceTitulo[$("#language").data("kendoDropDownList").value()],
                visible: false, //the window will not appear before its .open method is called
                width: "auto",
                animation: false,
                height: "auto",
                modal: true
            }).data("kendoWindow");

            ventanaConfirm.content(_dictionary.CapturaMensajeArmadoPlancharTodos[$("#language").data("kendoDropDownList").value()] +
                         "</br><center><button class='confirm_yes btn btn-blue' id='yesButton'>Si</button><button class='confirm_yes btn btn-blue' id='noButton'> No</button></center>");

            ventanaConfirm.open().center();

            $("#yesButton").click(function (handler) {
                plancharTodo();
                ventanaConfirm.close();
            });
            $("#noButton").click(function (handler) {
                ventanaConfirm.close();
            });
        }
        else {
            plancharTodo();
        }
    });
}

function plancharTodo() {
    if ($("#inputCuadrante").data("kendoComboBox").dataItem($("#inputCuadrante").data("kendoComboBox").select()) != undefined) {
        PlanchaCuadrante();
    }
}


function SuscribirEventoCarro() {


    $('#inputCarro').kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "MedioTransporteID ",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            dataItem = this.dataItem(e.sender.selectedIndex);
            
                if (editado) {
                    ventanaConfirm = $("#ventanaConfirm").kendoWindow({
                        iframe: true,
                        title: _dictionary.WarningTitle[$("#language").data("kendoDropDownList").value()],
                        visible: false, //the window will not appear before its .open method is called
                        width: "auto",
                        height: "auto",
                        modal: true,
                        animation: {
                            close: false,
                            open: false
                        }
                    }).data("kendoWindow");

                    ventanaConfirm.content(_dictionary.CapturaReportePruebasMensajeEliminarDatosCapturados[$("#language").data("kendoDropDownList").value()] +
                                "</br><center><button class='btn btn-blue' id='yesButton'>Si</button><button class='btn btn-blue' id='noButton'> No</button></center>");

                    ventanaConfirm.open().center();

                    $("#yesButton").click(function () {
                        oldItem = dataItem;
                        AjaxObtenerDetalleGrid(dataItem.MedioTransporteID);
                        ventanaConfirm.close();
                    });
                    $("#noButton").click(function () {
                        $("#inputCarro").data("kendoComboBox").value(oldItem.MedioTransporteID);
                        ventanaConfirm.close();
                    });
                }
                else {
                    oldItem = dataItem;
                    AjaxObtenerDetalleGrid(dataItem.MedioTransporteID);
                }
            
        }
    });

}



//SuscribirEventoCuadrante()
function SuscribirEventoZona() {
    $("#inputZona").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "ZonaID",
        suggest: true,
        delay: 10,
        filter: "contains",
        index: 3,
        change: function (e) {
            var dataItem = this.dataItem(e.sender.selectedIndex);
                AjaxCargarCuadrante(dataItem.ZonaID);
        }
    });
}

function SuscribirEventoCuadrante() {
    $('#inputCuadrante').kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "CuadranteID",
        suggest: true,
        filter: "contains",
        change: function () {
            if ($("#inputCuadrante").data("kendoComboBox").dataItem($("#inputCuadrante").data("kendoComboBox").select()) != undefined) {
                console.log("definir inputCuadrante");
            }
            else {
                $("#inputCuadrante").data("kendoComboBox").value("");
                console.log("valor lleno");
            }
        }
    });
}




















//suscribirEventoChangeRadio()

function suscribirEventoChangeRadio() {
    //$('input:radio[name=Muestra]:nth(0)').change(function () {

    //    FiltroMostrar(0);


    //});
    //$('input:radio[name=Muestra]:nth(1)').change(function () {

    //    FiltroMostrar(1);

    //});
}
//suscribirEventoChangeRadio()


//FiltroMostrar()
function FiltroMostrar(mostrar) {
    var ds = $("#grid").data("kendoGrid").dataSource;

    if (mostrar == 0) {
        var curr_filters = ds.filter().filters;
        if (curr_filters[0].filters != undefined)
            ds.filter(curr_filters[0].filters[0])

        else
            ds.filter(curr_filters[0])
        ds.sync();
    }
    else {

        var curr_filters = ds.filter().filters;
        ds.filter(curr_filters[0])
        ds.sync();
        var filters = ds.filter();
        filters.logic = "or"

        filters.filters.push({ field: "Accion", operator: "eq", value: 2 });
        filters.filters.push({ field: "Accion", operator: "eq", value: 4 });
        ds.sync();
    }
}

//FiltroMostrar()

function suscribirEventoDescargar() {
    $('#CapturaAvanceDescargar').click(function (e) {
        if (("#inputCuadrantePopup").value() != "") {
            //ajaxAplicarDescarga(currentDataItemGridDownload)
            win.close();
        }
    });
}

function SuscribirEventoGuardar() {

    $('#btnGuardarYNuevo,#btnGuardarYNuevo1').click(function (e) {
        if ($("#grid").data("kendoGrid").dataSource._data.length > 0) {
            ajaxGuardar($("#grid").data("kendoGrid").dataSource._data,1);
        }
    });

    $('#btnGuardar,#Guardar, #btnGuardar1, #Guardar1 ').click(function (e) {
        if ($("#grid").data("kendoGrid").dataSource._data.length > 0) {
            if ($('#botonGuardar2').text() == _dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]) {
                ajaxGuardar($("#grid").data("kendoGrid").dataSource._data,0);
            }
            else if ($('#botonGuardar2').text() == _dictionary.textoEditar[$("#language").data("kendoDropDownList").value()]) {
                opcionHabilitarView(false, "FieldSetView")
            }
        }
    });
};

function opcionHabilitarView(valor, name) {

    if (valor) {
        $('#FieldSetView').find('*').attr('disabled', true);
        $('#FieldSetViewMiddle').find('*').attr('disabled', true);


        $("#inputCarro").data("kendoComboBox").enable(false);
        $("#inputCuadrante").data("kendoComboBox").enable(false);

        $('#botonGuardar').text(_dictionary.textoEditar[$("#language").data("kendoDropDownList").value()]);
        $('#botonGuardar2').text(_dictionary.textoEditar[$("#language").data("kendoDropDownList").value()]);

        $("#inputZona").data("kendoComboBox").enable(false);


    }
    else {
        $('#FieldSetView').find('*').attr('disabled', false);
        $('#FieldSetViewMiddle').find('*').attr('disabled', false);
        $("#inputCarro").data("kendoComboBox").enable(true);
        $("#inputCuadrante").data("kendoComboBox").enable(true);
        $('#botonGuardar').text(_dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]);
        $('#botonGuardar2').text(_dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]);
        $("#inputZona").data("kendoComboBox").enable(true);

    }
}