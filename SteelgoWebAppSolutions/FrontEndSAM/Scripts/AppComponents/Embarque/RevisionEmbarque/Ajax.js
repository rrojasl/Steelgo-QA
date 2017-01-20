function AjaxCargarProyecto() {
    loadingStart();
    $Proyectos.Proyectos.read({ token: Cookies.get("token") }).done(function (data) {
        if (Error(data)) {
            $("#Proyecto").data("kendoComboBox").dataSource.data([]);
            var proyectoId = 0;

            if (data.length > 0) {
                $("#Proyecto").data("kendoComboBox").dataSource.data(data);
                if (data.length < 3) {
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].ProyectoID != 0) {
                            proyectoId = data[i].ProyectoID;
                        }
                    }
                }

                $("#Proyecto").data("kendoComboBox").value(proyectoId);
                $("#Proyecto").data("kendoComboBox").trigger("change");
            }
        }
        loadingStop();
    });
}

function AjaxCargarEmbarques(proyectoID) {
    loadingStart();
    $RevisionEmbarque.RevisionEmbarque.read({ token: Cookies.get("token"), ProyectoID: proyectoID }).done(function (data) {
        $("#Embarque").data("kendoComboBox").dataSource.data([]);
            var EmbarqueID = 0;
            if (data.length > 0) {
                $("#Embarque").data("kendoComboBox").dataSource.data(data);

                if (data.length < 3) {
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].EmbarqueID != 0) {
                            EmbarqueID = data[i].EmbarqueID;
                        }
                    }
                }

                $("#Embarque").data("kendoComboBox").value(EmbarqueID);
                $("#Embarque").data("kendoComboBox").trigger("change");
            }
        loadingStop();
    });
}

function AjaxObtenerSpoolID() {
    try {
        loadingStart();
        $CapturasRapidas.CapturasRapidas.read({ ordenTrabajo: $("#InputOrdenTrabajo").val(), tipo: '1', token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
            if (Error(data)) {
                $("#InputOrdenTrabajo").val(data.OrdenTrabajo);
                $("#InputID").data("kendoComboBox").dataSource.data(data.idStatus)
                Cookies.set("LetraProyecto", data.OrdenTrabajo.substring(0, 1), { path: '/' });
                loadingStop();
            }
        });
    } catch (e) {
        displayNotify("Mensajes_error", e.message, '2');
    }
}

function AjaxObtieneDetalle(EmbarqueID) {
    loadingStart();
    $RevisionEmbarque.RevisionEmbarque.read({ token: Cookies.get("token"), EmbarqueID: EmbarqueID, }).done(function (data) {
        if (Error(data)) {
            if (data.length > 0) {
                $("#grid").data("kendoGrid").dataSource.data([]);
                
                var ds = $("#grid").data("kendoGrid").dataSource;
                var array = data;
                for (var i = 0; i < array.length; i++) {
                    ds.add(array[i]);
                }
                ds.sync();
            }
        }
        loadingStop();
    });
}