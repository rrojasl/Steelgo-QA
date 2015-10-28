
function SuscribirEventos() {
    suscribirEventoGuardar();
    suscribirEventoAgregar();
    suscribirEventoCancelar();
    SuscribirEventoTaller();
    SuscribirEventosJunta();
    SuscribirEventoSpoolID();
};

function suscribirEventoGuardar() {
    $('#btnGuardar').click(function (e) {
        alert('saber el ds')
        var ds = $("#grid").data("kendoGrid").dataSource;
        alert(ds);
        console.log(JSON.stringify(ds._data));
    });
}

function suscribirEventoCancelar() {
    $('#btnCancelar').click(function (e) {
        alert('se cancela todo y que pagina tiene que abrir');
    });
}

function suscribirEventoAgregar() {
    $('#ButtonAgregar').click(function (e) {
        ObtenerJSonGridSoldadura();
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
            ObtenerJSonGridSoldadura();
        }
    });
}

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
}

function SuscribirEventoSpoolID() {

    $("#InputID").kendoComboBox({
        dataTextField: "IDValido",
        dataValueField: "Valor",
        suggest: true,
        filter: "contains",
        index: 3,
        select: function (e) {
            var dataItem = this.dataItem(e.item.index());
            //if (dataItem.ProveedorID == 0) {
            //    VentanaModal(2);
            //    e.preventDefault();
            //}
            //CargarProveedor(dataItem.ProveedorID, dataItem.Nombre);
            //alert('se selecciono un ID con el status' + dataItem.Status);

            if (dataItem.Status != "1") {
                e.preventDefault();
                $("#InputID").val("");
                console.log("borrar datos");
                alert(dataItem.Status);
            }
            else {
                $("#InputID").val(dataItem.IDValido);
                Cookies.set("Proyecto", dataItem.ProyectoID + '°' + dataItem.Proyecto);
                $("#LabelProyecto").text(dataItem.Proyecto);

                //AjaxObtenerListaTubero();
                AjaxObtenerListaTaller();


                //  AjaxJunta(dataItem.Valor)
            }
        }
        ,
        change: function (e) {
            if ($("#InputID").val().length == 1) {
                $("#InputID").data("kendoComboBox").value(("00" + $("#InputID").val()).slice(-3));
            }
            if ($("#InputID").val() != '' && $("#InputOrdenTrabajo").val() != '')
                AjaxJunta($("#InputID").val())
            //e.select = true;
            //var value = this.value();
            //$("#InputID").val(e.)
            ////if (!value) {
            ////    Proveedor = {};
            ////};
            //alert('evento change ID con el status' + value);
            // $("#InputID").data("kendoComboBox").select(1)
        }
    });

    $("#InputOrdenTrabajo").blur(function (e) {

        if ($("#InputOrdenTrabajo").val().match("^[a-zA-Z][0-9]*$")) {
            try {
                $CapturaArmado.Armado.read({ ordenTrabajo: $("#InputOrdenTrabajo").val(), tipo: '1', token: Cookies.get("token") }).done(function (data) {
                    loadingStart();
                    //console.log("OrdenTrabajo: " + data.OrdenTrabajo);
                    $("#InputOrdenTrabajo").val(data.OrdenTrabajo);
                    //console.log("data.idStatus.IDValido: " + data.idStatus);
                    $("#InputID").data("kendoComboBox").dataSource.data(data.idStatus)

                    loadingStop();

                });
            } catch (e) {
                alert(e.message);
            }
        } else {
            alert('La Orden de trabajo no es valido.');
            $("#InputOrdenTrabajo").focus();
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


    //$("#InputID").blur(function () {

    //    if ($("#InputID").val().length == 1) {
    //        $("#InputID").data("kendoComboBox").value(("00" + $("#InputID").val()).slice(-3));
    //    }
    //    if ($("#InputID").val() != '' && $("#InputOrdenTrabajo").val() != '')
    //        AjaxJunta($("#InputID").val())

    //});
};

$(document.body).keydown(function (e) {
    if (e.altKey && e.keyCode == 77) {
        if ($('input:radio[name=Muestra]:checked').val().trim() == "Todos") {
            $('input:radio[name=Muestra]').val(["Sin Capturar"]).attr('checked', 'checked');
        }
        else {
            $('input:radio[name=Muestra]').val(["Todos"]).attr('checked', 'checked');
        }
    }
});