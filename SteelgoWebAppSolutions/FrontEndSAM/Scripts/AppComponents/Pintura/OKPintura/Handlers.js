function SuscribirEventos() {
    SuscribirEventoProyecto();
    suscribirEventoElementosAsignados();
    SuscribirEventoCerrarPopUpJuntas();
    suscribirEventoDescarGaCSV();
    SuscribirEventoCargarCSV();
    suscribirEventoMostrar();
    suscribirEventoGuardar();
    suscribirEventoPlanchar();
}

function suscribirEventoGuardar() {
    $("#BotonGuardar").click(function () {
        if ($('#BotonGuardar').text() == _dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]) {
            ajaxGuardar();
        }
        else if ($('#BotonGuardar').text() == _dictionary.textoEditar[$("#language").data("kendoDropDownList").value()]) {
            opcionHabilitarView(false, "FieldSetView")
        }

        
    });

};

function suscribirEventoPlanchar() {
    $("#ButtonPlanchar").click(function (e) {
        for (var i = 0; i < $("#grid").data("kendoGrid").dataSource._data.length; i++) {
            $("#grid").data("kendoGrid").dataSource._data[i].OkPintura = true;
        }
        $("#grid").data("kendoGrid").dataSource.sync();
    });
   
};

function suscribirEventoMostrar() {
    $("#ButtonBuscar").click(function (e) {
        ajaxObtenerInformacion();
    });
};

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
                if (dataItem.ProyectoID != 0) {

                }
            } else {
                $("#inputProyecto").data("kendoComboBox").value("");
            }
        }
    });
};

function suscribirEventoElementosAsignados() {

    $(document).on('click', '.EnlaceDetalleJunta', function (e) {
        e.preventDefault();

        if ($('#BotonGuardar').text() == _dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]) {

            var grid = $("#grid").data("kendoGrid"),
            dataItem = grid.dataItem($(e.target).closest("tr"));

            LlenarGridPopUp();
        }
    });
};

function SuscribirEventoCerrarPopUpJuntas() {
    $("#CerrarDetalleJunta").click(function (e) {
        e.preventDefault();

        $("#windowGrid").data("kendoWindow").close();
    });
};

function SuscribirEventoCargarCSV() {
    $('#btnCargaCsv, btnCargaCsv1').click(function (e) {
        //var proyectoID = $("#inputProyecto").data("kendoComboBox").value();
        //if (proyectoID != 0 && proyectoID != undefined && proyectoID != "") {
        $("#files").val("");
        $("#files").click();
        //displayNotify("", "Se actualizo correctamente la informacion.", '0');
        //}
        //else {
        //    displayNotify("SPAProyectoCargaMasiva", "", '1');
        //}
    })

    document.getElementById("files").addEventListener("change", function (evt) {
        displayNotify("", "Se actualizo correctamente la informacion.", '0');
    });
};

function suscribirEventoDescarGaCSV() {
    $("#btnDescargaCsv, #btnDescargaCsv1").click(function (e) {
        window.location.href = "/PlantillaOkPintura.csv";
    });
};

function opcionHabilitarView(valor, name) {
    var $menu = $('.save-group');

    if (valor) {
        $('#FieldSetView').find('*').attr('disabled', true);
       
        $("#botonGuardar").text(_dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]);
        $('#botonGuardar2').text(_dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]);
        $("#botonGuardar3").text(_dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]);
        $('#botonGuardar4').text(_dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]);
    }
    else {
        $('#FieldSetView').find('*').attr('disabled', false);
        

        $("#ButtonPlanchar").attr("disabled", false);
        $("#botonGuardar").text(_dictionary.botonGuardar[$("#language").data("kendoDropDownList").value()]);
        $("#botonGuardar2").text(_dictionary.botonGuardar[$("#language").data("kendoDropDownList").value()]);
        $("#botonGuardar3").text(_dictionary.botonGuardar[$("#language").data("kendoDropDownList").value()]);
        $('#botonGuardar4').text(_dictionary.botonGuardar[$("#language").data("kendoDropDownList").value()]);
    }
}