function AjaxCargarCamposPredeterminados() {
    var campoPredeterminado = 3070;
    $CamposPredeterminados.CamposPredeterminados.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), id: campoPredeterminado }).done(function (data) {
        if (data == "Pendientes") {
            $('#btnPendientes').trigger("click");
        }
        else if (data == "Transitados") {
            $('#btnTransito').trigger("click");
        }
        loadingStop();
        AjaxObtenerContadorPorEstatus();
    });
}

function AjaxObtenerContadorPorEstatus() {
    loadingStart();
    $ListadoEmbarque.ListadoEmbarque.read({ token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
        $("#nPendientes").text("");
        $("#nTransito").text("");

        if (data.length > 0) {
            $("#nPendientes").text(" "+data[0].Pendientes);
            $("#nTransito").text(" "+data[0].Transito);
        }
        loadingStop();
    });
}

function AjaxObtenerDetalleListadoEmbarque(estatus) {
    loadingStart();
    $ListadoEmbarque.ListadoEmbarque.read({ token: Cookies.get("token"), Lenguaje: $("#language").val(), EstatusEmbarque: estatus }).done(function (data) {
        $("#grid").data('kendoGrid').dataSource.data([]);
        var ds = $("#grid").data("kendoGrid").dataSource;

        if (data.length > 0) {
            ds.data(data);
            ds.page(1);
        } else
            ds.page(0);

        ds.sync();
        loadingStop();
    });
}

function AjaxGuardarCaptura(ds, tipoGuardado) {
    loadingStart();

    var Captura = [];
    var ListaDetalle = [];
    var index = 0;
    Captura[0] = { listaDetalle: "" };

    for (var i = 0; i < ds.length; i++) {
        ListaDetalle[i] = {
            EmbarqueID: 0, DestinoID: 0, SolicitudPermiso: "", FechaPermiso: "", AprobadoAduana: 0,
            AprobadoCliente: 0, OkEmbarque: 0, EstatusCaptura: 0, BitacoraAduana: 0
        }

        ListaDetalle[i].EmbarqueID = ds[i].EmbarqueID;
        ListaDetalle[i].DestinoID = ds[i].DestinoID;
        ListaDetalle[i].SolicitudPermiso = ds[i].FolioSolicitudPermiso;
        ListaDetalle[i].FechaPermiso = ds[i].FechaSolicitudPermiso == null ? "" : kendo.toString(ds[i].FechaSolicitudPermiso, String(_dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()].replace('{', '').replace('}', '').replace("0:", ""))).trim();
        ListaDetalle[i].AprobadoAduana = ds[i].AprobadoAduana;
        ListaDetalle[i].AprobadoCliente = ds[i].AprobadoCliente;
        ListaDetalle[i].OkEmbarque = ds[i].OkEmbarque;

        if (ds[i].DestinoAntID != ds[i].DestinoID || ds[i].FolioSolicitudPermiso != ds[i].SolicitudPermisoAnt ||
            ListaDetalle[i].FechaPermiso != ds[i].FechaSolicitudAnt || ds[i].AprobadoCliente != ds[i].AprobadoClienteAnt
            || ds[i].AprobadoAduana != ds[i].AprobadoAduanaAnt || ds[i].OkEmbarque != ds[i].OkEmbarqueAnt)
            ListaDetalle[i].EstatusCaptura = 1;

        if (ds[i].AprobadoAduana != ds[i].AprobadoAduanaAnt)
            ListaDetalle[i].BitacoraAduana = 1;

    }

    Captura[0].listaDetalle = ListaDetalle;
    $ListadoEmbarque.ListadoEmbarque.create(Captura[0], { token: Cookies.get("token"), lenguaje: $("#language").val()}).done(function (data) {
        if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "Ok") {
            if (tipoGuardado != "1") {
                AjaxObtenerDetalleListadoEmbarque(estatus);
                opcionHabilitarView(false, "FieldSetView");
            } else {
                var estatus = $("#btnPendientes").hasClass("active") ? 1 : 2;
                opcionHabilitarView(true, "FieldSetView");
                $("#grid").data("kendoGrid").dataSource.data([]);
                AjaxObtenerDetalleListadoEmbarque(estatus);

            }
            displayNotify("MensajeGuardadoExistoso", "", '0');
        } else if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] != "Ok")
            displayNotify("EmbarqueEmpaquetadoErrorPaqueteExiste", "", '2');
        
        loadingStop();
    });
}

function AjaxObtenerDetalleListadoEmbarque(estatus) {
    loadingStart();
    $ListadoEmbarque.ListadoEmbarque.read({ token: Cookies.get("token"), Lenguaje: $("#language").val(), EstatusEmbarque: estatus }).done(function (data) {
        $("#grid").data('kendoGrid').dataSource.data([]);
        var ds = $("#grid").data("kendoGrid").dataSource;

        if (data.length > 0) {
            ds.data(data);
            ds.page(1);
        } else
            ds.page(0);

        ds.sync();
        loadingStop();
    });
}