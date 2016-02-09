function SuscribirEventos() {
    suscribirEventoGuardar();
    suscribirEventoAgregar();
    suscribirEventoCancelar();
    suscribirEventoTipoPrueba();
    suscribirEventoProyecto();
    SuscribirEventoSpoolID();
    SuscribirEventosJunta();
    SuscribirEventoOcultarDivJunta();
}


function SuscribirEventoOcultarDivJunta() {
    $('#containerDiv').css('display', 'none');
}


function suscribirEventoGuardar() {
    $('#Guardar').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        if ($('#botonGuardar').text() == "Guardar") {
            if ($("#Fecha").val() != "" && ValidaFormatoFecha($("#Fecha").val(), $("#language").val())) {
                //opcionHabilitarView(true, "FieldSetView");
                AjaxGuardarCaptura(ds._data, 0);
            }
            else
                displayMessage("Mensajes_error", "El campo fecha no puede estar vacio", '1');
        }
        else if ($('#botonGuardar').text() == "Editar")
            opcionHabilitarView(false, "FieldSetView")
    });
    

    $('#btnGuardar').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        if ($('#botonGuardar').text() == "Guardar") {
            if ($("#Fecha").val() != "" && ValidaFormatoFecha($("#Fecha").val(), $("#language").val())) {
                // opcionHabilitarView(true, "FieldSetView");
                AjaxGuardarCaptura(ds._data, 0);
            }
            else
                displayMessage("Mensajes_error", "El campo fecha no puede estar vacio", '1');
        }
        else if ($('#botonGuardar').text() == "Editar")
            opcionHabilitarView(false, "FieldSetView")
    });

    
    $('#btnGuardarYNuevo').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        if ($('#botonGuardar').text() == "Guardar") {
            if ($("#Fecha").val() != "" && ValidaFormatoFecha($("#Fecha").val(), $("#language").val())) {
                //opcionHabilitarView(true, "FieldSetView");
                AjaxGuardarCaptura(ds._data,1);
                //Limpiar();
            }
            else
                displayMessage("Mensajes_error", "El campo fecha no puede estar vacio", '1');
        }
        else if ($('#botonGuardar').text() == "Editar")
            opcionHabilitarView(false, "FieldSetView")
    });

   

    
    $('#GuardarPie').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        if ($('#botonGuardar').text() == "Guardar") {
            if ($("#Fecha").val() != "" && ValidaFormatoFecha($("#Fecha").val(), $("#language").val())) {
                //opcionHabilitarView(true, "FieldSetView");
                AjaxGuardarCaptura(ds._data, 0);
            }
            else
                displayMessage("Mensajes_error", "El campo fecha no puede estar vacio", '1');
        }
        else if ($('#botonGuardar').text() == "Editar")
            opcionHabilitarView(false, "FieldSetView")
    });

    $('#btnGuardar1').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        if ($('#botonGuardar').text() == "Guardar") {
            if ($("#Fecha").val() != "" && ValidaFormatoFecha($("#Fecha").val(), $("#language").val())) {
                //opcionHabilitarView(true, "FieldSetView");
                AjaxGuardarCaptura(ds._data, 0);
            }
            else
                displayMessage("Mensajes_error", "El campo fecha no puede estar vacio", '1');
        }
        else if ($('#botonGuardar').text() == "Editar")
            opcionHabilitarView(false, "FieldSetView");
    });

    $('#btnGuardarYNuevo1').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        if ($('#botonGuardar').text() == "Guardar") {
            if ($("#Fecha").val() != "" && ValidaFormatoFecha($("#Fecha").val(), $("#language").val())) {
                //opcionHabilitarView(true, "FieldSetView");
                AjaxGuardarCaptura(ds._data, 1);
                //Limpiar();
            }
            else
                displayMessage("Mensajes_error", "El campo fecha no puede estar vacio", '1');
        }
        else if ($('#botonGuardar').text() == "Editar")
            opcionHabilitarView(false, "FieldSetView")
    });
    

}

function suscribirEventoCancelar() {
    $('#btnCancelar').click(function (e) {
        Limpiar();
    });
}

function suscribirEventoAgregar() {
    $('#ButtonAgregar').click(function (e) {
        
            AgregarJuntaNueva();
        
    });
}

function suscribirEventoProyecto() {
    var dataItem;
    $("#Proyecto").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "ProyectoID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            dataItem = this.dataItem(e.sender.selectedIndex);
            if (dataItem != undefined) {
                ajaxObtenerTipoPruebas();
            }
            else {
                $("#Proyecto").data("kendoComboBox").value("");

            }
        }
    });
}

function suscribirEventoTipoPrueba() {
    var dataItem;
    $("#tipoPrueba").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "PruebasID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            dataItem = this.dataItem(e.sender.selectedIndex);
            if (dataItem != undefined) {
                ajaxObtenerJuntasSoldadas($("#tipoPrueba").data("kendoComboBox").value());
            }
            else {
                $("#tipoPrueba").data("kendoComboBox").value("");

            }
        }
       
    });
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
                    AjaxJunta($("#InputID").data("kendoComboBox").value());

                }
            }
        }
    });


    $("#InputOrdenTrabajo").blur(function (e) {

        if ($("#InputOrdenTrabajo").val().match("^[a-zA-Z][0-9]*$")) {
            try {
                loadingStart();
                $GenerarRequisicion.GenerarRequisicion.read({ ordenTrabajo: $("#InputOrdenTrabajo").val(), tipo: '1', token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
                    $("#InputOrdenTrabajo").val(data.OrdenTrabajo);
                    $("#InputID").data("kendoComboBox").dataSource.data(data.idStatus);
                    Cookies.set("LetraProyecto", data.OrdenTrabajo.substring(0, 1), { path: '/' });
                    loadingStop();
                });
            } catch (e) {
                displayMessage("Mensajes_error", e.message, '0');
            }
        } else {
            displayMessage("CapturaSoldaduraMensajeOrdenTrabajo", "", '1');
            
        }
    });



    $("#InputOrdenTrabajo").focus(function (e) {
        $("#InputOrdenTrabajo").val("");
        $("#InputID").data("kendoComboBox").value("");
        $("#InputID").data("kendoComboBox").setDataSource()
    });

    $('#InputID').closest('.k-widget').keydown(function (e) {

        if (e.keyCode == 37) {
            $("#InputOrdenTrabajo").focus();
        }
        else if (e.keyCode == 39) {
            $("#Junta").data("kendoComboBox").input.focus();
        }
        else if (e.keyCode == 40)
            $("#InputID").data("kendoComboBox").select();
        

    });
};

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

                AgregarJuntaNueva();
            }
            else
                $("#Junta").data("kendoComboBox").value("");
                displayMessage("NoExisteJunta", '', '2');
        }
    });
}

function Limpiar() {

    $("#InputOrdenTrabajo").val("");
    $("#Observacion").val("");
    $("#Folio").text("");
    $("#InputID").data("kendoComboBox").value("");
    $("#Junta").data("kendoComboBox").value("");
    $("#Proyecto").data("kendoComboBox").value("");
    $("#tipoPrueba").data("kendoComboBox").value("");

  

    $("#Fecha").data("kendoDatePicker").value("");


    $("#grid").data('kendoGrid').dataSource.data([]);
}

function opcionHabilitarView(valor, name) {

    if (valor) {
        $('#FieldSetView').find('*').attr('disabled', true);
        $("#Proyecto").data("kendoComboBox").enable(false);
        $("#tipoPrueba").data("kendoComboBox").enable(false);
        
        $("#InputID").data("kendoComboBox").enable(false);
        $("#Junta").data("kendoComboBox").enable(false);
        $("#Fecha").data("kendoDatePicker").enable(false);
        $('#botonGuardar').text("Editar");
        $("#DetalleAvisoLlegada0017").text("Editar");

        $("#botonGuardar2").text("Editar");
        $('#botonGuardar').text("Editar");
        $('#botonGuardar4').text("Editar");
        $('#botonGuardar3').text("Editar");
        
        
    }
    else {
        $('#FieldSetView').find('*').attr('disabled', false);
        $("#Proyecto").data("kendoComboBox").enable(true);
        $("#tipoPrueba").data("kendoComboBox").enable(true);

        $("#InputID").data("kendoComboBox").enable(true);
        $("#Junta").data("kendoComboBox").enable(true);
        $("#Fecha").data("kendoDatePicker").enable(true);
        $('#botonGuardar').text("Guardar");
        $("#DetalleAvisoLlegada0017").text("Guardar");

        $("#botonGuardar2").text("Guardar");
        $('#botonGuardar').text("Guardar");
        $('#botonGuardar4').text("Guardar");
        $('#botonGuardar3').text("Guardar");

    }
}