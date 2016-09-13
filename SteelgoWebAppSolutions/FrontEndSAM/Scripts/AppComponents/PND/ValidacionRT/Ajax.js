var TipoMuestraPredeterminadoID = 3055;

function AjaxCargarCamposPredeterminados() {
    $CamposPredeterminados.CamposPredeterminados.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), id: TipoMuestraPredeterminadoID }).done(function (data) {
        if (Error(data)) {
            if (data == "sin captura") {
                $('input:radio[name=Muestra]:nth(0)').trigger("click");
            }
            else if (data == "Todos") {
                $('input:radio[name=Muestra]:nth(1)').trigger("click");
            }
            AjaxGetListaProyectos();
        }
    });
};

function AjaxGetListaProyectos() {
    $ValidacionRT.ValidacionRT.read({ token: Cookies.get("token") }).done(function (data) {
        if (Error(data)) {
            $("#inputProyecto").data("kendoComboBox").dataSource.data(data);

            if ($("#inputProyecto").data("kendoComboBox").dataSource._data.length == 2) {
                $("#inputProyecto").data("kendoComboBox").select(1);
                $("#inputProyecto").data("kendoComboBox").trigger("change");
            }
        }
    });
}

function AjaxGetListaTiposDePrueba() {
    $ValidacionRT.ValidacionRT.read({ token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
        if (Error(data)) {
            $("#inputTipoPrueba").data("kendoComboBox").dataSource.data(data);

            if ($("#inputTipoPrueba").data("kendoComboBox").dataSource._data.length == 2) {
                $("#inputTipoPrueba").data("kendoComboBox").select(1);
                $("#inputTipoPrueba").data("kendoComboBox").trigger("change");
            }
        }
    });
}

function AjaxGetListaProveedor() {
    $ValidacionRT.ValidacionRT.read({ token: Cookies.get("token"), ProyectoID: $("#inputProyecto").data("kendoComboBox").value(), TipoPruebaID: $("#inputTipoPrueba").data("kendoComboBox").value() }).done(function (data) {
        if (Error(data)) {
            $("#inputProveedor").data("kendoComboBox").dataSource.data(data);

            if ($("#inputProveedor").data("kendoComboBox").dataSource._data.length == 2) {
                $("#inputProveedor").data("kendoComboBox").select(1);
                $("#inputProveedor").data("kendoComboBox").trigger("change");
            }
        }
    });
}

function AjaxGetListaRequisiciones(proyectoID, tipoPruebaID, proveedorID) {
    $ValidacionRT.ValidacionRT.read({ token: Cookies.get("token"), ProyectoID: proyectoID, TipoPruebaID: tipoPruebaID, ProveedorID: proveedorID, estatusID: 2 }).done(function (data) {
        if (Error(data)) {
            $("#inputRequisicion").data("kendoComboBox").dataSource.data(data);

            if ($("#inputRequisicion").data("kendoComboBox").dataSource._data.length == 2) {
                $("#inputRequisicion").data("kendoComboBox").select(1);
                $("#inputRequisicion").data("kendoComboBox").trigger("change");
            }
        }
    });
}

function LoginProveedor() {
    var modalTitle = "";
    var Correcto
    modalTitle = _dictionary.lblVentanaVRLogin[$("#language").data("kendoDropDownList").value()];
    var ventanaConfirm = $("#ventanaConfirm");
    var window = ventanaConfirm.kendoWindow({
        modal: true,
        title: modalTitle,
        resizable: false,
        visible: true,
        width: "50%",
        minWidth: 30,
        close: function () {
            if (Correcto) {

            }
            else if (!Correcto) {
                $('#proveedorContainerDiv').hide();
                $('#usuarioContainerDiv').hide();

                $('#lblUsuarioVRValue').text("");
                $('#lblProveedorVRValue').text("");

                $('input[name="Revision"]').prop('checked', false);
            }
            else {
                $('#proveedorContainerDiv').hide();
                $('#usuarioContainerDiv').hide();

                $('#lblUsuarioVRValue').text("");
                $('#lblProveedorVRValue').text("");

                $('input[name="Revision"]').prop('checked', false);
            }
        },
        position: {
            top: "1%",
            left: "1%"
        }
    }).data("kendoWindow");

    window.content('<div id="ventanaConfirm" z-index: inherit">' +
                        '<div class="col-sm-11 col-md-11 col-lg-11">' +
                            '<div class="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12">' +
                                '<label id=""><span>' + _dictionary.lblUsuarioVRLogin[$("#language").data("kendoDropDownList").value()] + '</span></label>' +
                                '<input id="ProveedorLogin" class="form-control" />' +
                            '</div>' +
                            '<div class="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12">' +
                                '<label id=""><span>' + _dictionary.lblContraseniaVRLogin[$("#language").data("kendoDropDownList").value()] + '</span></label>' +
                                '<input id="PasswordLogin" type="password" class="form-control" />' +
                            '</div>' +
                            '<div class="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12">' +
                                '<center><button class="btn btn-blue" id="YesButton"> Aceptar</button>&nbsp;<button class="btn btn-blue" id="NoButton"> Cancelar</button></center>' +
                            '</div>' +
                        '</div>' +
                    '</div>');

    ventanaConfirm.data("kendoWindow").title(modalTitle);
    ventanaConfirm.data("kendoWindow").center().open();

    $("#YesButton").click(function (handler) {
        var User = $('#ProveedorLogin').val();
        var Pass = $('#PasswordLogin').val();

        var proveedorID = $('#inputProveedor').val();
        var proyectoID = $("#inputProyecto").data("kendoComboBox").val();

        $ValidacionRT.ValidacionRT.read({ token: Cookies.get("token"), ProveedorID: proveedorID, ProyectoID: proyectoID, NombreProveedor: User, Password: Pass }).done(function (data) {
            if (Error(data)) {
                $("#inputProveedor").data("kendoComboBox").dataSource.data(data);

                if ($("#inputProveedor").data("kendoComboBox").dataSource._data.length == 2) {
                    $("#inputProveedor").data("kendoComboBox").select(1);
                    $("#inputProveedor").data("kendoComboBox").trigger("change");
                }
            }
        });

        //$('#proveedorContainerDiv').show();
        //$('#usuarioContainerDiv').show();

        //$('#lblUsuarioVRValue').text("samAdmin");
        //$('#lblProveedorVRValue').text("samAdmin");

        //Correcto = true;
        //window.close();
    });

    $("#NoButton").click(function (handler) {
        $('#proveedorContainerDiv').hide();
        $('#usuarioContainerDiv').hide();

        $('#lblUsuarioVRValue').text("");
        $('#lblProveedorVRValue').text("");

        $('input[name="Revision"]').prop('checked', false);

        Correcto = false;
        window.close();
    });
}