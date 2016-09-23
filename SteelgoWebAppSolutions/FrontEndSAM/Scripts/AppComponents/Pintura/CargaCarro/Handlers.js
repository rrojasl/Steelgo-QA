function SuscribirEventos() {
    SuscribirEventoProyecto();
    SuscribirEventoCarro();
    SuscribirEventoSpoolID();
    SuscribirEventoCambiarVista();
    SuscribirEventoTipoSeleccion();

    $("#styleEscritorio").addClass("active");
    $("#stylePatio").removeClass("active");
    $("#contenedorPrincipalEscritorio").show();
    $("#contenedorPrincipalPatio").hide();
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

function SuscribirEventoCarro() {
    $("#inputCarroEscritorio").kendoComboBox({
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
                $("#inputCarroEscritorio").data("kendoComboBox").value("");
            }
        }
    });
    $("#inputCarroPatio").kendoComboBox({
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
                $("#inputCarroPatio").data("kendoComboBox").value("");
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
        delay: 10,
        change: function (e) {
            dataItem = this.dataItem(e.sender.selectedIndex);

            if (dataItem != undefined) {

            }
            else {
                $("#InputID").data("kendoComboBox").value("");
            }
            //$("#chkCerrar").attr("checked", false);
            //$("#chkCerrar2").attr("checked", false);
        }
    });

    $("#InputOrdenTrabajo").blur(function (e) {

        //if ($("#InputOrdenTrabajo").val() != "") {
        //    if ($("#InputOrdenTrabajo").val().match("^[a-zA-Z][0-9]*$")) {
        //        try {
        //            AjaxObtenerSpoolID();
        //        } catch (e) {
        //            displayNotify("Mensajes_error", e.message, '0');
        //        }
        //    } else {
        //        $("#InputOrdenTrabajo").val("");
        //        displayNotify("CapturaArmadoMensajeOrdenTrabajo", "", '1');
        //    }
        //}

    });


    $("#InputOrdenTrabajo").focus(function (e) {
        //$("#InputOrdenTrabajo").val("");
        //$("#InputID").data("kendoComboBox").value("");
        //$("#InputID").data("kendoComboBox").setDataSource();
    });

    $('#InputID').closest('.k-widget').keydown(function (e) {

        //if (e.keyCode == 37) {
        //    $("#InputOrdenTrabajo").focus();

        //}
        //else if (e.keyCode == 40) {
        //    $("#InputID").data("kendoComboBox").select();
        //}
        //else if (e.keyCode == 13) {
        //    if ($('#InputID').data("kendoComboBox").value() != undefined) {
        //        AjaxAgregarCarga();
        //    }
        //    else {
        //        $("#InputID").data("kendoComboBox").value("");
        //        displayNotify("NoExisteSpoolID", '', '2');
        //    }
        //}
    });

}

function SuscribirEventoCambiarVista() {
    $('#styleEscritorio').click(function () {
        $("#styleEscritorio").addClass("active");
        $("#stylePatio").removeClass("active");

        $("#inputProyecto").data("kendoComboBox").value("");

        //$("#inputCarroBacklog").data("kendoComboBox").dataSource.data([]);
        //$("#inputCarroBacklog").data("kendoComboBox").value("");

        //$("#chkCerrar").attr("checked", false);
        //$("#labelM22").text("");
        //$("#labelToneladas2").text("");
        //$("#grid[nombre='grid-backlog']").data('kendoGrid').dataSource.data([]);

        $("#contenedorPrincipalEscritorio").show();
        $("#contenedorPrincipalPatio").hide();
    });
    $('#stylePatio').click(function () {
        $("#styleEscritorio").removeClass("active");
        $("#stylePatio").addClass("active");

        $("#inputProyecto").data("kendoComboBox").value("");
        //$("#inputCarro").data("kendoComboBox").dataSource.data([]);
        //$("#inputCarro").data("kendoComboBox").value("");

        //$("#chkCerrar2").attr("checked", false);
        //$("#labelM2").text("");
        //$("#labelToneladas").text("");



        //$("#InputOrdenTrabajo").val("");
        //$("#InputID").data("kendoComboBox").dataSource.data([]);
        //$("#InputID").data("kendoComboBox").value("");
        //$("#grid").data('kendoGrid').dataSource.data([]);

        $("#contenedorPrincipalEscritorio").hide();
        $("#contenedorPrincipalPatio").show();

    });


}

function SuscribirEventoTipoSeleccion() {
    $('input:radio[name=TipoSeleccion]:nth(0)').change(function () {
        $("#InputIDDiv").show();
        $("#divCodigo").hide();
        $("#inputCodigo").val('');

    });

    $('input:radio[name=TipoSeleccion]:nth(1)').change(function () {
        $("#InputIDDiv").hide();
        $("#divCodigo").show();
        $("#InputOrdenTrabajo").val('');
        $("#InputID").data("kendoComboBox").value("");
    });
}