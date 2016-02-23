function SuscribirEventos() {
    SuscribirEventoSpoolID();
    SuscribirEventosJunta();
    suscribirEventoAgregar();
    suscribirEventoGuardar();
    suscribirEventoCancelar();
    SuscribirEventoTubero();
    SuscribirEventoTaller();
    SuscribeEventosTipoCaptura();
    suscribirEventoChangeRadio();
    suscribirEventoChangeRadioTipoListado();
    SuscribirEventoMuestraJunta();
    GuardarDetalleAdicional();
    SuscribirEventoPlanchar();
    SuscribirEventoCancelarAdicionales();
    suscribirEventoAdicionales();
};
 

function suscribirEventoAdicionales() {

    $(document).on('click', '.botonAdicionales', function (e) {
        var grid = $("#grid").data("kendoGrid"),
        dataItem = grid.dataItem($(e.target).closest("tr"));
        LlenarGridPopUp(dataItem);
    });
}

    function SuscribirEventoCancelarAdicionales() {
        $("#CancelarTrabajosAdicionales").click(function (e) {
            $("#windowGrid").data("kendoWindow").close();
        });
    }


    function SuscribirEventoPlanchar() {
        $("#ButtonPlanchar").click(function (e) {
            if ($("#grid").data("kendoGrid").dataSource._data.length > 0) {


                if ($('input:radio[name=LLena]:checked').val() === "Todos") {
                    windowTemplate = kendo.template($("#windowTemplate").html());

                    ventanaConfirm = $("#ventanaConfirm").kendoWindow({
                        iframe: true,
                        title: _dictionary.CapturaAvanceTitulo[$("#language").data("kendoDropDownList").value()],
                        visible: false, //the window will not appear before its .open method is called
                        width: "auto",
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
            }
        });
    }

    function plancharTodo() {
        if ($("#inputTubero").data("kendoComboBox").dataItem($("#inputTubero").data("kendoComboBox").select()) != undefined) {
            PlanchaTubero();
        }
        if ($("#inputTaller").data("kendoComboBox").dataItem($("#inputTaller").data("kendoComboBox").select()) != undefined) {
            PlanchaTaller();
        }
        if ($("#FechaArmado").val() != "") {
            PlanchaFecha();
        }
    }

    function GuardarDetalleAdicional() {
        $('#GuardarTrabajosAdicionales').click(function () {
            var ds = $("#gridPopUp").data("kendoGrid").dataSource;
            modeloRenglon.ListaDetalleTrabajoAdicional = ds._data;
            $("#windowGrid").data("kendoWindow").close();
            $("#grid").data("kendoGrid").dataSource.sync();
        });
    }

    function SuscribeEventosTipoCaptura() {
        $("#presentationReporte").addClass("active");

        $('#aReporte').click(function () {
            $("#presentationReporte").addClass("active");
            $("#presentationReporteListado").removeClass("active");

        });
        $('#aListado').click(function () {
            $("#presentationReporteListado").addClass("active");
            $("#presentationReporte").removeClass("active");

        });
    }

    function suscribirEventoChangeRadio() {
        $('input:radio[name=Muestra]:nth(0)').change(function () {
            if ($("#InputID").val() != "" && $("#InputOrdenTrabajo").val()) {
                AjaxJunta($("#InputID").val());
                FiltroMostrar(0);
            }
        });
        $('input:radio[name=Muestra]:nth(1)').change(function () {
            if ($("#InputID").val() != "" && $("#InputOrdenTrabajo").val()) {
                AjaxJunta($("#InputID").val());
                FiltroMostrar(1);
            }
        });

    }



    function EventoGuardar() {
        var ds = $("#grid").data("kendoGrid").dataSource;
        if ($('#botonGuardar').text() == _dictionary.DetalleAvisoLlegada0017[$("#language").data("kendoDropDownList").value()]) {
            AjaxGuardarCaptura(ds._data,0);
        }
        else if ($('#botonGuardar').text() == _dictionary.DetalleAvisoLlegada0082[$("#language").data("kendoDropDownList").value()])
            opcionHabilitarView(false, "FieldSetView")
    }

    function suscribirEventoGuardar() {
        $('#btnGuardar').click(function (e) {
            EventoGuardar();
        });

        $("#Guardar").click(function () {
            EventoGuardar();
        });

        $('#btnGuardarYNuevo').click(function (e) {
            var ds = $("#grid").data("kendoGrid").dataSource;
            AjaxGuardarCaptura(ds._data,1)
            
        });

        $('#GuardarPie').click(function (e) {

            EventoGuardar();
        });
        $('#btnGuardar').click(function (e) {

            EventoGuardar();
        });
        $('#DetalleAvisoLlegada0062').click(function (e) {
            var ds = $("#grid").data("kendoGrid").dataSource;
            AjaxGuardarCaptura(ds._data,1)
            //Limpiar();
        });
    }

    function opcionHabilitarRadioTipoCaptura(valor) {
        var combobox = $("#InputID").data("kendoComboBox");
        if (valor) {
        }
        else {
        }
    }


    function Limpiar() {

        $("#InputOrdenTrabajo").val("");


        $("#InputID").data("kendoComboBox").value("");

        $("#Junta").data("kendoComboBox").dataSource.data([]);

        //var radioButtons = document.getElementsByName('Muestra');

        //for (var x = 0; x < radioButtons.length; x++) {
        //    if (radioButtons[x].checked) {
        //        radioButtons[x].checked = false;

        //    }
        //}

        $("#FechaArmado").data("kendoDatePicker").value("");

        $("#inputTubero").data("kendoComboBox").value("");

        $("#inputTaller").data("kendoComboBox").value("");

        //var radioButtonsLLena = document.getElementsByName('LLena');

        //for (var x = 0; x < radioButtonsLLena.length; x++) {
        //    if (radioButtonsLLena[x].checked) {
        //        radioButtonsLLena[x].checked = false;

        //    }
        //}
        $("#grid").data('kendoGrid').dataSource.data([]);
    
        $("#grid").data('kendoGrid').dataSource.sync();
    }

    function suscribirEventoCancelar() {
        $('#btnCancelar').click(function (e) {
        });
    }

    function suscribirEventoAgregar() {
        $('#ButtonAgregar').click(function (e) {
        
            if ($('input:radio[name=TipoAgregado]:checked').val() == "Reporte" ) {
                AjaxCargarReporteJuntas();
            }
            else {
                if ($('input:radio[name=TipoAgregado]:checked').val() == "Listado" && $("#Junta").val() != "" ) {
                    if ($("#Junta").data("kendoComboBox").dataItem($("#Junta").data("kendoComboBox").select()) != undefined) {
                        ObtenerJSonGridArmado();
                    }
                    else
                        displayMessage("NoExisteJunta", '', '2');
                }
                else
                    displayMessage("JuntaSinSeleccionar", "", '2');
            }
        });
    }

    function SuscribirEventoTubero() {
        $('#inputTubero').kendoComboBox({
            dataTextField: "Codigo",
            dataValueField: "ObreroID",
            suggest: true,
            filter: "contains",
            index: 3,
            change: function (e)
            {
                dataItem = this.dataItem(e.sender.selectedIndex);
                if (dataItem == undefined) {
                    $("#inputTubero").data("kendoComboBox").value("");
                }
            }
        });
        $('#inputTubero').closest('.k-widget').keydown(function (e) {
            if (e.keyCode == 13) {
                if ($("#inputTubero").data("kendoComboBox").dataItem($("#inputTubero").data("kendoComboBox").select()) != undefined) {

                    //PlanchaTubero();
                }
                else
                    $("#inputTubero").data("kendoComboBox").value("");
            }
             
        });
    }

    function SuscribirEventoTaller() {
        $('#inputTaller').kendoComboBox({
            dataTextField: "Nombre",
            dataValueField: "TallerID",
            suggest: true,
            filter: "contains",
            index: 3
        });
        $('#inputTaller').closest('.k-widget').keydown(function (e) {
            if (e.keyCode == 13) {
                if ($("#inputTaller").data("kendoComboBox").dataItem($("#inputTaller").data("kendoComboBox").select()) != undefined) {
                    //PlanchaTaller();
                }
                else {
                    $("#inputTaller").data("kendoComboBox").value("");
                }
                
            }
        });
    }

    function SuscribirEventosJunta() {
        $('#Junta').kendoComboBox({
            dataTextField: "Etiqueta",
            dataValueField: "JuntaSpoolID",
            suggest: true,
            filter: "contains",
            index: 3
        });

        $('#Junta').closest('.k-widget').keydown(function (e) {

            if (e.keyCode == 37) {
                $("#InputID").data("kendoComboBox").input.focus();
                $("#Junta").val("");
            }
            else if (e.keyCode == 39) {
                $("#ButtonAgregar").focus();
            }
            else if (e.keyCode == 13) {
                if ($("#Junta").data("kendoComboBox").dataItem($("#Junta").data("kendoComboBox").select()) != undefined) {


                    if ($('input:radio[name=TipoAgregado]:checked').val() == "Reporte") {
                        deshabilitaSpool();
                        ObtenerJSonGridArmado();
                        opcionHabilitarRadioTipoCaptura(false);
                    }
                    else if ($('input:radio[name=TipoAgregado]:checked').val() == "Listado") {


                        if ($("#Junta").val() != "") {
                            habilitaSpool();
                            opcionHabilitarRadioTipoCaptura(false);
                            ObtenerJSonGridArmado();
                        }
                        else
                            displayMessage("JuntaSinSeleccionar", "", '2');
                    }
                    else {
                        displayMessage("Mensajes_error", "Favor de seleccionar un Tipo de Captura", '2');
                    }
                }
                else
            
                    displayMessage("NoExisteJunta", '', '2');
            }
        });
    }

    function deshabilitaSpool() {
        $("#InputOrdenTrabajo").prop("disabled", true);
        $("#InputID").data("kendoComboBox").enable(false);

    }

    function habilitaSpool() {
        $("#InputOrdenTrabajo").prop("disabled", false);
        $("#InputID").data("kendoComboBox").enable(true);

    }


    function SuscribirEventoSpoolID() {
        var dataItem;
        $("#InputID").kendoComboBox({
            dataTextField: "IDValido",
            dataValueField: "Valor",
            suggest: true,
            filter: "contains",
            index: 3,
            select: function (e) {
                dataItem = this.dataItem(e.item.index());
                if (dataItem != undefined) {
                    if (dataItem.Status != "1") {
                        e.preventDefault();
                        $("#InputID").val("");
                        console.log("borrar datos");
                        displayMessage("Mensajes_error", dataItem.Status, '1');
                    }
                    else {
                        $("#InputID").val(dataItem.IDValido);
                        Cookies.set("Proyecto", dataItem.ProyectoID + '°' + dataItem.Proyecto);
                        $("#LabelProyecto").text(dataItem.Proyecto);
                        AjaxObtenerListaTubero();
                        AjaxObtenerListaTaller();
                    }
                }
            }
            ,
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);
                if (dataItem != undefined) {
                    if ($("#InputID").val().length == 1) {
                        $("#InputID").data("kendoComboBox").value(("00" + $("#InputID").val()).slice(-3));
                    }
                    if ($("#InputID").val() != '' && $("#InputOrdenTrabajo").val() != '') {
                        Cookies.set("Proyecto", dataItem.ProyectoID + '°' + dataItem.Proyecto);
                        $("#LabelProyecto").text(dataItem.Proyecto);
                        AjaxJunta($("#InputID").data("kendoComboBox").dataItem($("#InputID").data("kendoComboBox").select()).Valor);
                    }

                    AjaxObtenerListaTubero();
                    AjaxObtenerListaTaller();
                }
                else
                    displayMessage("NoExisteSpoolID", '', '2');
            }
        });

        $("#InputOrdenTrabajo").blur(function (e) {

            if ($("#InputOrdenTrabajo").val().match("^[a-zA-Z][0-9]*$")) {
                try {
                    AjaxObtenerSpoolID();
                } catch (e) {
                    displayMessage("Mensajes_error", e.message, '3');

                }
            } else {
                displayMessage("CapturaArmadoMensajeOrdenTrabajo", "", '1');
                //$("#InputOrdenTrabajo").focus();
            }
        });

        $("#InputOrdenTrabajo").focus(function (e) {
            $("#InputOrdenTrabajo").val("");
            $("#InputID").data("kendoComboBox").value("");
            $("#InputID").data("kendoComboBox").setDataSource();
        });

        $('#InputID').closest('.k-widget').keydown(function (e) {

            if (e.keyCode == 37) {
                $("#InputOrdenTrabajo").focus();
            }
            else if (e.keyCode == 39) {
                $("#Junta").data("kendoDropDownList").input.focus();
            }
            else if (e.keyCode == 40 && $("#InputID").data("kendoComboBox").select() != -1) {
                $("#InputID").data("kendoComboBox").select();
                AjaxJunta($("#InputID").data("kendoComboBox").dataItem($("#InputID").data("kendoComboBox").select()).Valor);
            }
            else if (e.keyCode == 13) {
                if ($("#InputID").data("kendoComboBox").dataItem($("#InputID").data("kendoComboBox").select()) != undefined) {
                    if ($('input:radio[name=TipoAgregado]:checked').val() == "Reporte") {
                        if ($("#InputID").data("kendoComboBox").select() != -1)
                            AjaxCargarReporteJuntas();
                    }
                }
                else
                    displayMessage("NoExisteSpoolID", '', '2');
            }
        });

    };

    function SuscribirEventoEliminar(idtable) {
        $("#" + idtable + " .deleteRow").on("click", function () {
            var td = $(this).parent();
            var tr = td.parent();
            //change the background color to red before removing
            tr.css("background-color", "#FF3700");

            tr.fadeOut(400, function () {
                tr.remove();
            });
        });
    };


    function eventoCambioTipoListado() {

        if ($('input:radio[name=TipoAgregado]:checked').val() == "Reporte") {
            $("#JuntaDiv").css('display', 'none');
            $("#MuestraDiv").css('display', 'block');
            Limpiar();
            AjaxCargarCamposPredeterminadosOcultaJunta();
        }
        else if ($('input:radio[name=TipoAgregado]:checked').val() == "Listado") {
            $("#JuntaDiv").css('display', 'block');
            $("#MuestraDiv").css('display', 'block');
            Limpiar();
            AjaxCargarCamposPredeterminadosOcultaJunta();
        }
    }

    function suscribirEventoChangeRadioTipoListado() {

        $('input:radio[name=TipoAgregado]:nth(0)').change(function () {
            $("#grid").data("kendoGrid").dataSource.data([]);
            eventoCambioTipoListado();
        });
        $('input:radio[name=TipoAgregado]:nth(1)').change(function () {
            $("#grid").data("kendoGrid").dataSource.data([]);
            eventoCambioTipoListado();
        });
    }


    function SuscribirEventoMuestraJunta() {

        if ($('input:radio[name=TipoAgregado]').val() == "Reporte") {
            $("#JuntaDiv").hide();
            // $("#MuestraDiv").hide();
        }
        else if ($('input:radio[name=TipoAgregado]').val() == "Listado") {
            $("#JuntaDiv").show();
            // $("#MuestraDiv").show();
        }
    }

    function opcionHabilitarView(valor, name) {

        if (valor) {
            $('#FieldSetView').find('*').attr('disabled', true);
            $("#InputID").data("kendoComboBox").enable(false);
            $("#inputTubero").data("kendoComboBox").enable(false);
            $("#inputTaller").data("kendoComboBox").enable(false);
            $("#FechaArmado").data("kendoDatePicker").enable(false);
            $('#botonGuardar').text("Editar");
            $("#DetalleAvisoLlegada0017").text("Editar");

            $("#GuardarPie").text("Editar");
            $('#btnGuardarPiePagina').text("Editar");


        }
        else {
            $('#FieldSetView').find('*').attr('disabled', false);
            $("#InputID").data("kendoComboBox").enable(true);
            $("#inputTubero").data("kendoComboBox").enable(true);
            $("#inputTaller").data("kendoComboBox").enable(true);
            $("#FechaArmado").data("kendoDatePicker").enable(true);
            $('#botonGuardar').text("Guardar");
            $("#DetalleAvisoLlegada0017").text("Guardar");

            $("#GuardarPie").text("Guardar");
            $('#btnGuardarPiePagina').text("Guardar");

        }
    }