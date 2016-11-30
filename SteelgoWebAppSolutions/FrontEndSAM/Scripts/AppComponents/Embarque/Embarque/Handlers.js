var ChoferInicial = 0;
var proveedorInicial = 0;
var TractoInicial = 0;

function SuscribirEventos() {
    suscribirEventoProyecto();
    suscribirEventoProveedor();
    suscribirEventoTracto();
    suscribirEventoChofer();
    suscribirEventoPlana();
    suscribirEventoAgregar();
    suscribirEventoEmbarque();
    suscribirEventoGuardar();
    SuscribirEventoCancelarPopup();
    SuscribirEventoGuardarProveedor();
    SuscribirEventoGuardarTracto();
    SuscribirEventoGuardarChofer();
}

SuscribirEventos();


function suscribirEventoGuardar() {

    $('.accionGuardar').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;

        if ($("#Tracto").data("kendoComboBox").dataItem($("#Tracto").data("kendoComboBox").select()) != undefined) {
            if ($("#Chofer").data("kendoComboBox").dataItem($("#Chofer").data("kendoComboBox").select()) != undefined) {

                if ($('#Guardar').text() == "Guardar" || $('#Guardar').text() == "Save") {
                    opcionHabilitarView(true, "FieldSetView");
                    AjaxGuardarPlanas(ds._data);
                }
                else if ($('#Guardar').text() == "Editar" || $('#Guardar').text() == "Edit") {
                    opcionHabilitarView(false, "FieldSetView")
                }

            }
            else {
                displayNotify("", "Debe seleccionar un Chofer", "1");
            }
        }
        else {

            displayNotify("", "Debe seleccionar un tracto", "1");
        }
    });
}

function suscribirEventoAgregar() {

    $('#btnAgregar').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        if (ds._data.length < 2) {
            if ($("#Plana").data("kendoComboBox").text() != "") {
                var cargaPlanaID = $("#Plana").data("kendoComboBox").dataItem($("#Plana").data("kendoComboBox").select()).CargaPlanaID;
                AjaxAgregaRenglon(cargaPlanaID);
            }
            else {
                displayNotify('','Seleccione una plana a agregar','1');
            }
        }
        else {
            displayNotify('', 'El embarque unicamente puede tener como maximo 2 planas', '1');
        }
    });
}


function suscribirEventoProveedor() {
    $("#Proveedor").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "ProveedorID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {

            var dataItem = this.dataItem(e.sender.selectedIndex);
            if (dataItem != undefined) {
                var ds = $("#grid").data("kendoGrid").dataSource;
                if (ds._data.length == 0) {
                    proveedorInicial = $("#Proveedor").data("kendoComboBox").value();
                    if (dataItem.ProveedorID == -1) {
                        CargaPopupNuevoProveedor();
                        
                        $("#Tracto").data("kendoComboBox").value("");
                        $("#Tracto").data("kendoComboBox").dataSource.data([]);
                        $("#Chofer").data("kendoComboBox").setDataSource();
                        $("#Chofer").data("kendoComboBox").value("");
                        $("#Chofer").data("kendoComboBox").dataSource.data([]);
                    } else {
                        AjaxEmbarqueCargaTractos(dataItem.ProveedorID, null);
                        
                        $("#Tracto").data("kendoComboBox").value("");
                        $("#Tracto").data("kendoComboBox").dataSource.data([]);
                        $("#Chofer").data("kendoComboBox").setDataSource();
                        $("#Chofer").data("kendoComboBox").value("");
                        $("#Chofer").data("kendoComboBox").dataSource.data([]);
                    }

                }
                else {
                    var ventanaConfirm = $("#ventanaConfirmCaptura").kendoWindow({
                        iframe: true,
                        title: _dictionary.EntregaPlacasGraficasTituloPopup[$("#language").data("kendoDropDownList").value()],
                        visible: false,
                        width: "auto",
                        height: "auto",
                        modal: true,
                        close: function () {
                            $('input:radio[name=LLena]:nth(0)').select();
                        }
                    }).data("kendoWindow");

                    ventanaConfirm.content(_dictionary.EntregaPlacasGraficasMensajeDatosCapturadosNoGuardados[$("#language").data("kendoDropDownList").value()] +
                        "</br><center><button class='btn btn-blue' id='yesButtonProy'>Si</button><button class='btn btn-blue' id='noButtonProy'>No</button></center>");

                    ventanaConfirm.open().center();
                    $("#yesButtonProy").click(function () {
                        proveedorInicial = $("#Proveedor").data("kendoComboBox").value();
                        AjaxEmbarqueCargaTractos(dataItem.ProveedorID, null);

                        
                        $("#Tracto").data("kendoComboBox").setDataSource();
                        $("#Tracto").data("kendoComboBox").value("");
                        $("#Tracto").data("kendoComboBox").dataSource.data([]);
                        $("#Chofer").data("kendoComboBox").setDataSource();
                        $("#Chofer").data("kendoComboBox").value("");
                        $("#Chofer").data("kendoComboBox").dataSource.data([]);

                        ventanaConfirm.close();
                    });
                    $("#noButtonProy").click(function () {
                        $("#Proveedor").data("kendoComboBox").value(proveedorInicial);
                        ventanaConfirm.close();
                        //$('input:radio[name=LLena]:nth(0)').select();
                    });
                }


            }
            else {
                $("#Proveedor").data("kendoComboBox").value("");
            }

        }
    });
}

function suscribirEventoProyecto() {
    $("#Proyecto").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "ProyectoID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {

            var dataItem = this.dataItem(e.sender.selectedIndex);
            if (dataItem != undefined) {
                var ds = $("#grid").data("kendoGrid").dataSource;
                if (ds._data.length == 0) {
                    proyectoInicial = $("#Proyecto").data("kendoComboBox").value();
                    $("#Plana").data("kendoComboBox").setDataSource();
                    $("#Plana").data("kendoComboBox").value("");
                    $("#Plana").data("kendoComboBox").dataSource.data([]);

                    $("#Proveedor").data("kendoComboBox").setDataSource();
                    $("#Proveedor").data("kendoComboBox").value("");
                    $("#Proveedor").data("kendoComboBox").dataSource.data([]);
                    AjaxObtenerPlanas(dataItem.ProyectoID, null);
                    AjaxEmbarqueCargaProveedores(dataItem.ProyectoID, null);
                }
                else {
                    var ventanaConfirm = $("#ventanaConfirmCaptura").kendoWindow({
                        iframe: true,
                        title: _dictionary.EntregaPlacasGraficasTituloPopup[$("#language").data("kendoDropDownList").value()],
                        visible: false,
                        width: "auto",
                        height: "auto",
                        modal: true,
                        close: function () {
                            $('input:radio[name=LLena]:nth(0)').select();
                        }
                    }).data("kendoWindow");

                    ventanaConfirm.content(_dictionary.EntregaPlacasGraficasMensajeDatosCapturadosNoGuardados[$("#language").data("kendoDropDownList").value()] +
                        "</br><center><button class='btn btn-blue' id='yesButtonProy'>Si</button><button class='btn btn-blue' id='noButtonProy'>No</button></center>");

                    ventanaConfirm.open().center();
                    $("#yesButtonProy").click(function () {
                        proyectoInicial = $("#Proyecto").data("kendoComboBox").value();
                        AjaxEmbarqueCargaProveedores(dataItem.ProyectoID, null);
                        AjaxObtenerPlanas(dataItem.ProyectoID, null);
                        

                        $("#Proveedor").data("kendoComboBox").setDataSource();
                        $("#Proveedor").data("kendoComboBox").value("");
                        $("#Proveedor").data("kendoComboBox").dataSource.data([]);
                        $("#grid").data("kendoGrid").dataSource.data([]);

                        ventanaConfirm.close();
                    });
                    $("#noButtonProy").click(function () {
                        $("#Proyecto").data("kendoComboBox").value(proyectoInicial);
                        ventanaConfirm.close();
                        //$('input:radio[name=LLena]:nth(0)').select();
                    });
                }


            }
            else {
                $("#Proyecto").data("kendoComboBox").value("");

            }


        }
    });
}

function suscribirEventoEmbarque() {
    $("#Embarque").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "EmbarqueID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            if ($("#Embarque").data("kendoComboBox").dataItem($("#Embarque").data("kendoComboBox").select()) != undefined) {

            }
            else {
                $("#Embarque").data("kendoComboBox").value("");
            }
        }
    });
}

function suscribirEventoTracto() {
    $("#Tracto").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "TractoID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            var dataItem = this.dataItem(e.sender.selectedIndex);
            var ds = $("#grid").data("kendoGrid").dataSource;
            if (dataItem != undefined) {
                if (ds._data.length == 0) { 
                    TractoInicial = $("#Tracto").data("kendoComboBox").value();
                    if (dataItem.TractoID == -1) {
                        CargaPopupNuevoTracto();

                        $("#Tracto").data("kendoComboBox").value("");

                    } else {

                    }

                }
                else {
                    var ventanaConfirm = $("#ventanaConfirmCaptura").kendoWindow({
                        iframe: true,
                        title: _dictionary.EntregaPlacasGraficasTituloPopup[$("#language").data("kendoDropDownList").value()],
                        visible: false,
                        width: "auto",
                        height: "auto",
                        modal: true,
                        close: function () {
                            $('input:radio[name=LLena]:nth(0)').select();
                        }
                    }).data("kendoWindow");

                    ventanaConfirm.content(_dictionary.EntregaPlacasGraficasMensajeDatosCapturadosNoGuardados[$("#language").data("kendoDropDownList").value()] +
                        "</br><center><button class='btn btn-blue' id='yesButtonProy'>Si</button><button class='btn btn-blue' id='noButtonProy'>No</button></center>");

                    ventanaConfirm.open().center();
                    $("#yesButtonProy").click(function () {
                        TractoInicial = $("#Tracto").data("kendoComboBox").value();
                        $("#Tracto").data("kendoComboBox").setDataSource();
                        $("#Tracto").data("kendoComboBox").value("");
                        $("#Tracto").data("kendoComboBox").dataSource.data([]);

                        ventanaConfirm.close();
                    });
                    $("#noButtonProy").click(function () {
                        $("#Tracto").data("kendoComboBox").value(TractoInicial);
                        ventanaConfirm.close();
                        //$('input:radio[name=LLena]:nth(0)').select();
                    });
                }


            }
            else {
                $("#Tracto").data("kendoComboBox").value("");
            }
        }
    });
}

function suscribirEventoChofer() {
    $("#Chofer").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "ChoferID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            var dataItem = this.dataItem(e.sender.selectedIndex);
            
            var ds = $("#grid").data("kendoGrid").dataSource;
            if (ds._data.length == 0) {
                if (dataItem != undefined) {
                    TractoInicial = $("#Tracto").data("kendoComboBox").value();
                    if (dataItem.ChoferID == -1) {
                        CargaPopupNuevoChofer();

                        $("#Chofer").data("kendoComboBox").value("");

                    } else {

                    }
                }
                else {
                    $("#Chofer").data("kendoComboBox").value("");
                }

            }
            else {
                var ventanaConfirm = $("#ventanaConfirmCaptura").kendoWindow({
                    iframe: true,
                    title: _dictionary.EntregaPlacasGraficasTituloPopup[$("#language").data("kendoDropDownList").value()],
                    visible: false,
                    width: "auto",
                    height: "auto",
                    modal: true,
                    close: function () {
                        $('input:radio[name=LLena]:nth(0)').select();
                    }
                }).data("kendoWindow");

                ventanaConfirm.content(_dictionary.EntregaPlacasGraficasMensajeDatosCapturadosNoGuardados[$("#language").data("kendoDropDownList").value()] +
                    "</br><center><button class='btn btn-blue' id='yesButtonProy'>Si</button><button class='btn btn-blue' id='noButtonProy'>No</button></center>");

                ventanaConfirm.open().center();
                $("#yesButtonProy").click(function () {
                    TractoInicial = $("#Tracto").data("kendoComboBox").value();
                    $("#Chofer").data("kendoComboBox").setDataSource();
                    $("#Chofer").data("kendoComboBox").value("");
                    $("#Chofer").data("kendoComboBox").dataSource.data([]);

                    ventanaConfirm.close();
                });
                $("#noButtonProy").click(function () {
                    $("#Chofer").data("kendoComboBox").value(ChoferInicial);
                    ventanaConfirm.close();
                    //$('input:radio[name=LLena]:nth(0)').select();
                });
            }



        }

    });
}

function suscribirEventoPlana() {
    $("#Plana").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "PlanaID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            if ($("#Plana").data("kendoComboBox").dataItem($("#Plana").data("kendoComboBox").select()) != undefined) {
                //AjaxCargarDestino($('#Plana').data("kendoComboBox").dataSource._data[$('#Plana').data("kendoComboBox").selectedIndex].ProyectoID);
            }
            else {
                $("#Plana").data("kendoComboBox").value("");
            }
        }
    });

    $('#Plana').closest('.k-widget').keydown(function (e) {
        if (e.keyCode == 13) {
            if ($("#Plana").data("kendoComboBox").dataItem($("#Plana").data("kendoComboBox").select()) != undefined) {
                AgregaRenglon($("#Plana").data("kendoComboBox").value(), $("#Plana").data("kendoComboBox").text());
                //AjaxCargarDestino($('#Plana').data("kendoComboBox").dataSource._data[$('#Plana').data("kendoComboBox").selectedIndex].ProyectoID);
            }
            else {
                $("#Plana").data("kendoComboBox").value("");
            }
        }
    });

}


function opcionHabilitarView(valor, name) {

    if (valor) {
        $('#FieldSetView').find('*').attr('disabled', true);
        $("#Chofer").data("kendoComboBox").enable(false);
        $("#Plana").data("kendoComboBox").enable(false);
        $("#Tracto").data("kendoComboBox").enable(false);
        $("#Proveedor").data("kendoComboBox").enable(false);

        $("#btnAgregar").prop('disabled', true);

        //$('#Guardar1').text(_dictionary.textoEditar[$("#language").data("kendoDropDownList").value()]);
        //$("#Guardar").text(_dictionary.textoEditar[$("#language").data("kendoDropDownList").value()]);

    }
    else {
        $('#FieldSetView').find('*').attr('disabled', false);
        $("#Chofer").data("kendoComboBox").enable(true);
        $("#Plana").data("kendoComboBox").enable(true);
        $("#Tracto").data("kendoComboBox").enable(true);
        $("#Proveedor").data("kendoComboBox").enable(true);

        $("#btnAgregar").prop('disabled', false);
        //$('#Guardar1').text(_dictionary.textoGuardar[$("#language").data("kendoDropDownList").value()]);
        //$("#Guardar").text(_dictionary.textoGuardar[$("#language").data("kendoDropDownList").value()]);

    }
}

function SuscribirEventoGuardarProveedor() {
    $('#GuardarNuevoProveedor').click(function (e) {
        if ($("#inputNombreNuevoProveedor").val() != "") {
            GuardarNuevoProveedor();
        }
        else {
            displayNotify('', 'Ingrese un nombre para el proveedor', 1);
        }
    });
}

function SuscribirEventoGuardarTracto() {
    $('#GuardarNuevoTracto').click(function (e) {
        if ($("#inputNombreNuevoTracto").val() != "") {
            GuardarNuevoTracto();
        }
        else {
            displayNotify('', 'Ingrese un nombre para el tracto', 1);
        }
    });
}


function SuscribirEventoGuardarChofer() {
    $('#GuardarNuevoChofer').click(function (e) {
        if ($("#inputNombreNuevoChofer").val() != "") {
            GuardarNuevoChofer();
        }
        else {
            displayNotify('', 'Ingrese un nombre para el chofer', 1);
        }
    });
}


function SuscribirEventoCancelarPopup() {
    $('#CancelarNuevoProveedor').click(function (e) {
        $("#Proveedor").data("kendoComboBox").text("");
        windowNewProvider.close();
    });
    $('#CancelarNuevoTracto').click(function (e) {
        $("#Tracto").data("kendoComboBox").text("");
        windowNewTracto.close();
    });
    $('#CancelarNuevoChofer').click(function (e) {
        $("#Chofer").data("kendoComboBox").text("");
        windowNewChofer.close();
    });


}