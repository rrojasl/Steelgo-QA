function SuscribirEventos() {
    SuscribirEventoProyecto();
    SuscribirEventoProveedor();
    SuscribirEventoRequisicion();
    SuscribirEventoRecibido();
    SuscribirEventoCondicionesFisicas();
    SuscribirEventoDefectos();
    SuscribirEventoPlanchado();
    SuscribirEventoGuardar();
}

function SuscribirEventoProyecto() {
    $("#inputProyecto").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "ProyectoID",
        suggest: true,
        delay: 10,
        filter: "contains",
        index: 3,
        change: function (e) {
            var dataItem = this.dataItem(e.sender.selectedIndex);
            if (dataItem != undefined) {

            } else {
                $("#inputProyecto").data("kendoComboBox").value("");
            }
        }
    })
}

function SuscribirEventoProveedor() {
    $("#inputProveedor").kendoComboBox({
        dataTextField: "idProveedor",
        dataValueField: "Proveedor",
        suggest: true,
        delay: 10,
        filter: "contains",
        index: 3,
        change: function (e) {
            var dataItem = this.dataItem(e.sender.selectedIndex);
            if (dataItem != undefined) {

            } else {
                $("#inputProveedor").data("kendoComboBox").value("");
            }
        }
    })
}

function SuscribirEventoRequisicion() {
    $("#inputRequisicion").kendoComboBox({
        dataTextField: "idFuente",
        dataValueField: "Fuente",
        suggest: true,
        delay: 10,
        filter: "contains",
        index: 3,
        change: function (e) {
            var dataItem = this.dataItem(e.sender.selectedIndex);
            if (dataItem != undefined) {

            } else {
                $("#inputRequisicion").data("kendoComboBox").value("");
            }
        }        
    });
}

function SuscribirEventoRecibido() {
    $("#inputDocumentoRecibido").kendoComboBox({
        dataTextField: "DocumentoRecibidoNombre",
        dataValueField: "DocumentoRecibidoID",
        suggest: true,
        delay: 10,
        filter: "contains",
        index: 3,
        change: function (e) {
            var dataItem = this.dataItem(e.sender.selectedIndex);
            if (dataItem != undefined) {

            } else {
                $("#inputDocumentoRecibido").data("kendoComboBox").value("");
            }
        }
    })
}

function SuscribirEventoCondicionesFisicas() {
    $("#inputCondicionesFisicas").kendoComboBox({
        dataTextField: "DocumentoEstatusNombre",
        dataValueField: "DocumentoEstatusID",
        suggest: true,
        delay: 10,
        filter: "contains",
        index: 3,
        change: function (e) {
            var dataItem = this.dataItem(e.sender.selectedIndex);
            if (dataItem != undefined) {
                if (dataItem.DocumentoEstatusID == 2) {
                    $("#divDefectos").show();
                } else {
                    $("#divDefectos").hide();
                }

            } else {
                $("#inputCondicionesFisicas").data("kendoComboBox").value("");
            }
        }
    })
}

function SuscribirEventoDefectos() {
    $("#inputDefectos").kendoComboBox({
        dataTextField: "DefectoDocumentoNombre",
        dataValueField: "DefectoDocumentoID",
        suggest: true,
        delay: 10,
        filter: "contains",
        index: 3,
        change: function (e) {
            var dataItem = this.dataItem(e.sender.selectedIndex);
            if (dataItem != undefined) {

            } else {
                $("#inputDefectos").data("kendoComboBox").value("");
            }
        }
    })
}

function SuscribirEventoPlanchado() {
    $("#ButtonPlanchar").click(function () {

        if ($("#grid").data("kendoGrid").dataSource._data.length > 0) {
            var tipoLlenado = $('input:radio[name=Planchar]:checked').val()
            if (tipoLlenado === "Todos") {
                ventanaConfirm = $("#ventanaConfirm").kendoWindow({
                    iframe: true,
                    title: _dictionary.EntregaPlacasGraficasTituloPopup[$("#language").data("kendoDropDownList").value()],
                    visible: false,
                    width: "auto",
                    height: "auto",
                    modal: true
                }).data("kendoWindow");

                ventanaConfirm.content(_dictionary.EntregaPlacasGraficasPlancharTodos[$("#language").data("kendoDropDownList").value()] +
                             "</br><center><button class='confirm_yes btn btn-blue' id='yesButton'>Si</button><button class='confirm_yes btn btn-blue' id='noButton'> No</button></center>");

                ventanaConfirm.open().center();

                $("#yesButton").click(function (handler) {
                    plancharTodo(tipoLlenado);
                    ventanaConfirm.close();
                });
                $("#noButton").click(function (handler) {
                    ventanaConfirm.close();
                });
            } else {
                plancharTodo(tipoLlenado);
            }
        }
    });
}

function plancharTodo(tipoLlenado) {

    var itemRecibido = $("#inputDocumentoRecibido").data("kendoComboBox").dataItem($("#inputDocumentoRecibido").data("kendoComboBox").select());
    var itemEstatus = $("#inputCondicionesFisicas").data("kendoComboBox").dataItem($("#inputCondicionesFisicas").data("kendoComboBox").select());
    var itemDefecto = $("#inputDefectos").data("kendoComboBox").dataItem($("#inputDefectos").data("kendoComboBox").select());

    if (itemRecibido != undefined && itemRecibido.DocumentoRecibidoID != 0) {
        PlanchaDocumentoRecibido(tipoLlenado);
    }
    if (itemEstatus != undefined && itemEstatus.DocumentoEstatusID != 0) {
        PlanchaDocumentoEstatus(tipoLlenado);
    }

    if (itemDefecto != undefined && itemDefecto.DefectoDocumentoID != 0 && itemEstatus.DocumentoEstatusID==2) {
        PlanchaDocumentoDefecto(tipoLlenado);
    }
}

function SuscribirEventoGuardar() {
    //GuardarYNuevo
    $("#btnGuardarYNuevo, #btnGuardarYNuevo1").click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        AjaxGuardarCaptura(ds._data, true);
    });

    //Guardar
    $("#Guardar, #btnGuardar, #Guardar1, #btnGuardar1").click(function (e) {
        if ($("#Guardar").text() == _dictionary.botonGuardar[$("#language").data("kendoDropDownList").value()]) {
            var ds = $("#grid").data("kendoGrid").dataSource;
            AjaxGuardarCaptura(ds._data, false);
        } else if ($("#Guardar").text() == _dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]) {
            disableEnableView(false);
        }
    });
}

function cleanView() {
    $("#inputProyecto").data("kendoComboBox").value("");
    $("#inputProveedor").data("kendoComboBox").value("");
    $("#inputRequisicion").data("kendoComboBox").value("");
    $("#inputDocumentoRecibido").data("kendoComboBox").value("");
    $("#inputCondicionesFisicas").data("kendoComboBox").value("");
    $("#inputDefectos").data("kendoComboBox").value("");
    $("#grid").data("kendoGrid").dataSource.data([]);
    disableEnableView(false);
    AjaxCargarCamposPredeterminados();
}

function disableEnableView(disable) {
    if (disable) {
        $(".addedSectionInLine").find('*').attr("disabled", true);

        $("#inputProyecto").data("kendoComboBox").enable(false);
        $("#inputProveedor").data("kendoComboBox").enable(false);
        $("#inputRequisicion").data("kendoComboBox").enable(false);
        $("input[name='Muestra']").attr("disabled", true);        
        
        $("#inputDocumentoRecibido").data("kendoComboBox").enable(false);
        $("#inputCondicionesFisicas").data("kendoComboBox").enable(false);
        $("#inputDefectos").data("kendoComboBox").enable(false);
        $("input[name='Planchar']").attr("disabled", true);
        $("#ButtonPlanchar").attr("disabled", true);

        $("#Guardar").text(_dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]);
        $("#btnGuardar").text(_dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]);
        $("#Guardar1").text(_dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]);
        $('#btnGuardar1').text(_dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]);

    } else {
        $(".addedSectionInLine").find('*').attr("disabled", false);

        $("#inputProyecto").data("kendoComboBox").enable(true);
        $("#inputProveedor").data("kendoComboBox").enable(true);
        $("#inputRequisicion").data("kendoComboBox").enable(true);
        $("input[name='Muestra']").attr("disabled", false);

        $("#inputDocumentoRecibido").data("kendoComboBox").enable(true);
        $("#inputCondicionesFisicas").data("kendoComboBox").enable(true);
        $("#inputDefectos").data("kendoComboBox").enable(true);
        $("input[name='Planchar']").attr("disabled", false);
        $("#ButtonPlanchar").attr("disabled", false);

        $("#Guardar").text(_dictionary.botonGuardar[$("#language").data("kendoDropDownList").value()]);
        $("#btnGuardar").text(_dictionary.botonGuardar[$("#language").data("kendoDropDownList").value()]);
        $("#Guardar1").text(_dictionary.botonGuardar[$("#language").data("kendoDropDownList").value()]);
        $('#btnGuardar1').text(_dictionary.botonGuardar[$("#language").data("kendoDropDownList").value()]);
    }
}

function validaInformacion(lista) {
    for (var i = 0; i < lista.length; i++) {
        if (lista[i].DocumentoRecibido == "" || lista[i].DocumentoEstatus == "" ||
            (lista[i].DocumentoEstatusID === 2 && lista[i].DefectoDocumentoID =="")) {
            return false;
        }
    }
    return true;
}