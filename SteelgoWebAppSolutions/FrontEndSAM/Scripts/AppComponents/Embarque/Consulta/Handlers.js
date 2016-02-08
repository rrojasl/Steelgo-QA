function SuscribirEventos() {
    suscribirEventoArea();
    suscribirEventoCuadrante();
    suscribirEventoBuscar();
}

SuscribirEventos();

function suscribirEventoArea() {
        $("#Area").kendoComboBox({
            dataTextField: "Nombre",
            dataValueField: "AreaID",
            suggest: true,
            filter: "contains",
            index: 3,
            change: function (e) {
                if ($("#Area").data("kendoComboBox").dataItem($("#Area").data("kendoComboBox").select()) != undefined) {
                    AjaxCargarCuadrante($("#Area").data("kendoComboBox").value());
                }
                else {
                    $("#Area").data("kendoComboBox").value("");
                }
            }
        });
}

function suscribirEventoCuadrante() {
    $("#Cuadrante").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "CuadranteID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            if ($("#Cuadrante").data("kendoComboBox").dataItem($("#Cuadrante").data("kendoComboBox").select()) != undefined) {
                AjaxCargarDatos($("#Area").data("kendoComboBox").value(), $("#Cuadrante").data("kendoComboBox").value());
            }
            else {
                $("#Cuadrante").data("kendoComboBox").value("");
            }
            
        }
    });
}


function suscribirEventoBuscar() {
    $("#btnAgregar").click(function (e) {
        if ($("#Area").data("kendoComboBox").dataItem($("#Area").data("kendoComboBox").select()) != undefined) {
            if ($("#Cuadrante").data("kendoComboBox").dataItem($("#Cuadrante").data("kendoComboBox").select()) != undefined) {
                AjaxCargarDatos($("#Area").data("kendoComboBox").value(), $("#Cuadrante").data("kendoComboBox").value());
            }
            else {
                $("#Cuadrante").data("kendoComboBox").value("");
            }
        }
        else {
            $("#Area").data("kendoComboBox").value("");
        }
    });
}
