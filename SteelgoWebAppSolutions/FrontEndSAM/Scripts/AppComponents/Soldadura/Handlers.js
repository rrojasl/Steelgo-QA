
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
        var ds = $("#grid").data("kendoGrid").dataSource;
        console.log(JSON.stringify(ds._data));
        AjaxGuardarCaptura(ds._data);
    });
    $('#btnGuardarYNuevo').click(function (e) {

        var ds = $("#grid").data("kendoGrid").dataSource;
        AjaxGuardarCaptura(ds._data);
        Limpiar();
    });
}

function suscribirEventoCancelar() {
    $('#btnCancelar').click(function (e) {
        Limpiar();
    });
}

function suscribirEventoAgregar() {
    $('#ButtonAgregar').click(function (e) {
        loadingStart();
        ObtenerJSonGridSoldadura();
        loadingStop();
    });
}
function SuscribirEventoFecha() {
    $('#FechaSoldadura').closest('.k-widget').keydown(function (e) {
        if (e.keyCode == 13) {
            PlanchaFecha();
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
            PlanchaTaller();
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
            ObtenerJSonGridSoldadura();
        }
    });
}

function SuscribirEventoEliminar(idtable) {
    $("#" + idtable + " .deleteRow").on("click", function () {
        var td = $(this).parent();
        var tr = td.parent();
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



function Limpiar() {

    $("#InputOrdenTrabajo").val("");
    $("#InputID").data("kendoComboBox").value("");
    $("#Junta").data("kendoComboBox").value("");

    var radioButtons = document.getElementsByName('Muestra');
    for (var x = 0; x < radioButtons.length; x++) {
        if (radioButtons[x].checked) {
            radioButtons[x].checked = false;
        }
    }

    $("#FechaSoldadura").data("kendoDatePicker").value("");
    $("#inputTaller").data("kendoComboBox").value("");

    var radioButtonsLLena = document.getElementsByName('LLena');

    for (var x = 0; x < radioButtonsLLena.length; x++) {
        if (radioButtonsLLena[x].checked) {
            radioButtonsLLena[x].checked = false;
        }
    }



    $("#grid").data('kendoGrid').dataSource.data([]);
}
