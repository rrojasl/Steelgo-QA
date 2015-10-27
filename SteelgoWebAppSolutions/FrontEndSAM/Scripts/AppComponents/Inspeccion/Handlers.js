function SuscribirEventos() {
    SuscribirEventoSpoolID();
    SuscribirEventosJunta();
    SuscribirEventoInspector();
    SuscribirEventoDefecto();
    suscribirEventoGuardar();
    suscribirEventoCancelar();
    suscribirEventoAgregar();
    
};

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

                AjaxObtenerListaTubero();
                AjaxObtenerListaTaller();
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
                    $("#InputOrdenTrabajo").val(data.OrdenTrabajo);
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
            ObtenerJSonGridArmado();
        }
    });
}
function SuscribirEventoInspector() {
    $('#inputInspector').kendoComboBox({
        dataTextField: "Codigo",
        dataValueField: "ObreroID",
        suggest: true,
        filter: "contains",
        index: 3
    });


}
function SuscribirEventoDefecto() {
    $('#inputDefecto').kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "DefectoID",
        suggest: true,
        filter: "contains",
        index: 3
    });

}
function suscribirEventoGuardar() {
    $('#btnGuardar').click(function (e) {

        var ds = $("#grid").data("kendoGrid").dataSource;

        AjaxGuardar(ds._data);

    });
}
function suscribirEventoCancelar() {
    $('#btnCancelar').click(function (e) {
        alert('se cancela todo y que pagina tiene que abrir');
    });
}
function suscribirEventoAgregar() {
    $('#ButtonAgregar').click(function (e) {

        ObtenerJSonGrid();
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
};