function SuscribirEventos() {
    SuscribirEventoProyecto();
    SuscribirEventoSistemaPintura();
    SuscribirEventoColor();
    SuscribirEventoPlanchado();
    SuscribirEventoTipoBusqueda();
    SuscribirEventoCargarCsv();
    SuscribirEventoBusqueda();
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
            LimpiaCargaProyecto();
            if (dataItem != undefined) {
                if(dataItem.ProyectoID!=0){
                    AjaxCargarSistemaPintura(dataItem.ProyectoID);
                }
            } else {
                $("#inputProyecto").data("kendoComboBox").value("");
            }
        }
    });
}

function SuscribirEventoSistemaPintura() {
    $("#inputSistemaPintura").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "SistemaPinturaID",
        suggest: true,
        delay: 10,
        filter: "contains",
        index: 3,
        change: function (e) {
            var dataItem = this.dataItem(e.sender.selectedIndex);
            LimpiaCargaSP();
            if (dataItem != undefined) {
                if(dataItem.SistemaPinturaID!=0){                    
                    AjaxCargarColorPintura(dataItem.SistemaPinturaID);
                }
            } else {
                $("#inputSistemaPintura").data("kendoComboBox").value("");
            }
        }
    });
}

function SuscribirEventoColor() {
    $("#inputColorPintura").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "ColorPinturaID",
        suggest: true,
        delay: 10,
        filter: "contains",
        index: 3,
        change: function (e) {
            var dataItem = this.dataItem(e.sender.selectedIndex);

            if (dataItem != undefined) {

            } else {
                $("#inputColorPintura").data("kendoComboBox").value("");
            }
        }
    });
}

function SuscribirEventoPlanchado() {
    $("#btnPlanchar").click(function () {

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
                    //limpiaPlanchado();
                    ventanaConfirm.close();
                });
                $("#noButton").click(function (handler) {
                    ventanaConfirm.close();
                });
            } else {
                plancharTodo(tipoLlenado);
                //limpiaPlanchado();
            }
        }
    });
}

function SuscribirEventoTipoBusqueda() {
    $('#styleSpool').click(function (e) {
        $("#divSpool").show();
        $("#divNc").hide();
    });
    $('#styleNc').click(function (e) {
        $("#divSpool").hide();
        $("#divNc").show();
    });
}

function SuscribirEventoCargarCsv() {
    $("#btnCargaCsv, #btnCargaCsv1").click(function (e) {
        windowLoadFile = $("#windowLoadFile").kendoWindow({
            iframe: true,
            title: _dictionary.SPATituloCargarCsv[$("#language").data("kendoDropDownList").value()],
            visible: false,
            width: "65%",
            modal: true,
            animation: {
                close: false,
                open: false
            }
        }).data("kendoWindow");

        windowLoadFile.open().center();

    });
}

function LimpiaCargaProyecto() {

    $("#inputSistemaPintura").data("kendoComboBox").dataSource.data([]);
    $("#inputSistemaPintura").data("kendoComboBox").value("");
    $("#inputColorPintura").data("kendoComboBox").dataSource.data([]);
    $("#inputColorPintura").data("kendoComboBox").value("");
}

function LimpiaCargaSP() {
    $("#inputColorPintura").data("kendoComboBox").dataSource.data([]);
    $("#inputColorPintura").data("kendoComboBox").value("");
}

function SuscribirEventoBusqueda() {
    $("#btnBuscar").click(function (e) {
        var Proyecto = $("#inputProyecto").data("kendoComboBox").dataItem($("#inputProyecto").data("kendoComboBox").select());
        var tipoBusqueda = 0;
        var cadena = "";

        if (Proyecto != undefined && Proyecto.ProyectoID != "" && Proyecto.ProyectoID != 0) {
            if ($("#styleSpool").hasClass("active")) {
                if ($("#inputSpool").val() != null && $("#inputSpool").val() != "") {
                    tipoBusqueda = 1;
                    cadena = $("#inputSpool").val().trim();
                    AjaxCargarDetalleSpool(Proyecto.ProyectoID, tipoBusqueda, cadena);
                } else {
                    displayNotify("SPAMensajeIngresaSpool", "", '1');
                }

            } else if ($("#styleNc").hasClass("active")) {
                if ($("#inputNc").val() != null && $("#inputNc").val() != "") {
                    tipoBusqueda = 2;
                    cadena = $("#inputNc").val().trim();
                    AjaxCargarDetalleSpool(Proyecto.ProyectoID, tipoBusqueda, cadena);
                } else {
                    displayNotify("SPAMensajeIngresaNc", "", '1');
                }
            }

        } else {
            displayNotify("MensajeSeleccionaProyecto", "", '1');
        }
    });
}