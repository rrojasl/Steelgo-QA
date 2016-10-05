function SuscribirEventos() {
    SuscribirEventoProyecto();
    SuscribirEventoSistemaPintura();
    SuscribirEventoColor();
    SuscribirEventoPlanchado();
    SuscribirEventoTipoBusqueda();
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
    });
}

function SuscribirEventoSistemaPintura() {
    $("#inputSistemaPintura").kendoComboBox({
        dataTextField: "SistemaPintura",
        dataValueField: "SistemaPinturaID",
        suggest: true,
        delay: 10,
        filter: "contains",
        index: 3,
        change: function (e) {
            var dataItem = this.dataItem(e.sender.selectedIndex);
            $("#inputColor").data("kendoComboBox").dataSource.data([]);
            if (dataItem != undefined) {
                if(dataItem.SistemaPinturaID!=0){                    
                    AjaxCargarColor();
                }
            } else {
                $("#inputSistemaPintura").data("kendoComboBox").value("");
            }
        }
    });
}

function SuscribirEventoColor() {
    $("#inputColor").kendoComboBox({
        dataTextField: "Color",
        dataValueField: "ColorID",
        suggest: true,
        delay: 10,
        filter: "contains",
        index: 3,
        change: function (e) {
            var dataItem = this.dataItem(e.sender.selectedIndex);

            if (dataItem != undefined) {

            } else {
                $("#inputColor").data("kendoComboBox").value("");
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