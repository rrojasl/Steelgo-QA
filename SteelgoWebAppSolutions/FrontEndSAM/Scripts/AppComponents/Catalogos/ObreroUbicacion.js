kendo.ui.Upload.fn._supportsDrop = function () { return false; }
Cookies.set("home", true, { path: '/' });
Cookies.set("navegacion", "33", { path: '/' });


var resultadoJson, PeriodoTiempo, Obrero = {};

var $ObreroUbicacionModel = {
    listContainer: {
        create: "",
        list: "",
        detail: "",
        destroy: ""
    },
    properties: {

        ObreroID: {
            visible: "#ObreroIDDiv",
            editable: "#ObreroID",
            required: "#ObreroID",
        },
        //TipoObreroID: {
        //    visible: "#TipoObreroIDDiv",
        //    editable: "#TipoObreroID",
        //    required: "#TipoObreroID",
        //},
        PatioID: {
            visible: "#PatioIDDiv",
            editable: "#PatioID",
            required: "#PatioID",
        },
        FechaInicioLabor: {
            visible: "#FechaInicioLaborDiv",
            editable: "#FechaInicioLabor",
            required: "#FechaInicioLabor",
        },
        FechaFinLabor: {
            visible: "#FechaFinLaborDiv",
            editable: "#FechaFinLabor",
        },
    }
};



function changeLanguageCall() {
    loadingStart();
    LlenarGrid();
    CargarGridObrero();
    $("#ObreroID").data("kendoComboBox").enable();
    $("#PatioID").data("kendoComboBox").enable();
    $("#TipoObreroID").data("kendoComboBox").enable();
    obtenerTipoObrero();
    obtenerObrero();
    obtenerPatio();
    loadingStop();
};

function LlenarGrid() {
    $ObreroUbicacion.ObreroUbicacion.read({ token: Cookies.get("token") }).done(function (result) {
        if (Error(result)) {
            resultadoJson = result;
            console.log("lista imprime che: " + JSON.stringify(resultadoJson));
            if (resultadoJson.length > 0) {
                $("#grid").data("kendoGrid").dataSource.data(resultadoJson);
            } else {
                $("#grid").data("kendoGrid").dataSource.data([]);
            };
        }

    });
}

function CargarGridObrero() {
    $("#grid").kendoGrid({
        dataSource: {
            data: resultadoJson,
            schema: {
                model: {
                    fields: {
                        ObreroUbicacionID: { type: "int" },
                        ObreroID: { type: "int" },
                        PatioID: { type: "int" },
                        FechaInicioLabor: { type: "string" },
                        FechaFinLabor: { type: "string" },
                        Nombre: { type: "string" },
                        Codigo: { type: "string" },
                    }
                }
            },
            pageSize: 20,
            serverPaging: false,
            serverFiltering: false,
            serverSorting: false
        },
        autoHeight: true,
        sortable: true,
        scrollable: false,
        editable: "inline",
        filterable: {
            extra: false,
            operators: {
                string: {
                    startswith: "Starts with",
                    eq: "Is equal to",
                    neq: "Is not equal to"
                }
            }
        },
        pageable: {
            refresh: false,
            pageSizes: [10, 15, 20],
            info: false,
            input: false,
            numeric: true,
        },
        columns: [
            { field: "ObreroUbicacionID", title: _dictionary.Obrero0001[$("#language").data("kendoDropDownList").value()], filterable: true, hidden: true },
            { field: "ObreroID", title: _dictionary.Obrero0002[$("#language").data("kendoDropDownList").value()], filterable: true, hidden: true },
            { field: "Codigo", title: _dictionary.Obrero0005[$("#language").data("kendoDropDownList").value()], filterable: true },
            { field: "PatioID", title: _dictionary.Obrero0009[$("#language").data("kendoDropDownList").value()], filterable: true, hidden: true },
            { field: "Nombre", title: _dictionary.Obrero0009[$("#language").data("kendoDropDownList").value()], filterable: true },
            { field: "FechaInicioLabor", title: _dictionary.Obrero0010[$("#language").data("kendoDropDownList").value()], filterable: true },
            { field: "FechaFinLabor", title: _dictionary.Obrero0011[$("#language").data("kendoDropDownList").value()], filterable: true },
            { command: { text: _dictionary.Cuantificacion0004[$("#language").data("kendoDropDownList").value()], click: editarObrero }, title: " ", width: "40px" },
            { command: { text: _dictionary.ListadoLlegadaMaterial0017[$("#language").data("kendoDropDownList").value()], click: cancelarTipoObrero }, title: " ", width: "40px" }
        ],
        dataBound: function (e) {
            $(".k-grid input.k-textbox").prop('readonly', true);
            $(".k-grid td .k-button").text('');
            $(".k-grid td:first-child, .k-grid td:last-child").css('text-overflow', 'clip');
        }
    });
};


function cancelarTipoObrero(e) {
    e.preventDefault();
    loadingStart();
    var dataItem = $("#grid").data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));
    var ObreroUbicacionID = dataItem.ObreroUbicacionID;
    if (confirm(_dictionary.Obrero0006[$("#language").data("kendoDropDownList").value()])) {
        $ObreroUbicacion.ObreroUbicacion.destroy({}, { ObreroUbicacionID: ObreroUbicacionID, token: Cookies.get("token") }).done(function (data) {
            LlenarGrid();
            obtenerTipoObrero();
            loadingStop();
        });
    }
    else {
        loadingStop();
    }
};

function editarObrero(e) {
    e.preventDefault();
    var dataItem = $("#grid").data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));
    var combobox = $("#ObreroID").data("kendoComboBox");
    combobox.value(dataItem.ObreroID);
    var combobox2 = $("#PatioID").data("kendoComboBox");
    combobox2.value(dataItem.PatioID);
    $("#ObreroID").val(dataItem.ObreroID);
    $("#ObreroUbicacionID").val(dataItem.ObreroUbicacionID);
    $("#FechaInicioLabor").val(dataItem.FechaInicioLabor);
    $("#FechaFinLabor").val(dataItem.FechaFinLabor);
    VentanaModal(1);
    $("#formaObrero").show();
}


function VentanaModal(modo) {

    var modalTitle = "";
    modalTitle = "Obrero";
    var window = $("#window");
    var win = window.kendoWindow({
        actions: "",
        modal: true,
        title: modalTitle,
        resizable: false,
        visible: false,
        width: "32.6%",
        minWidth: 660,
        position: {
            top: "10%",
            left: "20%"
        }
    }).data("kendoWindow");
    $("#Modo").val(modo);
    window.data("kendoWindow").title(modalTitle);
    window.data("kendoWindow").center().open();

};


$("#Nuevo").click(function (e) {
    limpiarVentanaModal();
    VentanaModal("0");
});


function limpiarVentanaModal() {
    $("#ObreroID").data("kendoComboBox").value("");
    $("#PatioID").data("kendoComboBox").value("");
    $("#TipoObreroID").data("kendoComboBox").value("");
    $("#FechaInicioLabor").val("");
    $("#FechaFinLabor").val("");

}

$("#CancelarObrero").click(function (e) {
    $("#window").data("kendoWindow").close();
});

$("#GuardarObrero").click(function (e) {

    if (validarRequeridosFormaObrero()) {
        GuardarObrero();
    } else {
        displayMessage("notificationslabel0031", "", '1');
    }
});


function GuardarObrero() {

    ObreroUbicacionModal = {
        ObreroUbicacionID: "",
        ObreroID: "",
        PatioID: "",
        FechaInicioLabor: "",
        FechaFinLabor: "",
    };


    ObreroUbicacionModal.ObreroUbicacionID = $("#ObreroUbicacionID").val();
    ObreroUbicacionModal.ObreroID = $("#ObreroID").val();
    ObreroUbicacionModal.PatioID = $("#PatioID").val();
    ObreroUbicacionModal.FechaInicioLabor = $("#FechaInicioLabor").val();
    ObreroUbicacionModal.FechaFinLabor = $("#FechaFinLabor").val();


    if ($("#Modo").val() == "0") {
        console.log("Guardar: " + JSON.stringify(ObreroUbicacionModal));
        $ObreroUbicacion.ObreroUbicacion.create(ObreroUbicacionModal, { token: Cookies.get("token") }).done(function (result) {
            LlenarGrid();
            obtenerTipoObrero();
        });
    }

    else if ($("#Modo").val() == "1") {
        console.log("Editar: " + JSON.stringify(ObreroUbicacionModal));
        $ObreroUbicacion.ObreroUbicacion.update(ObreroUbicacionModal, { token: Cookies.get("token") }).done(function (result) {
            LlenarGrid();
            obtenerTipoObrero();
        });
    }

    $("#window").data("kendoWindow").close();
}


function validarRequeridosFormaObrero() {
    var bool = true;
    $("#formaObreroUbicacion .security_required").each(function (i, elem) {
        if (elem.tagName.toLowerCase() != 'label') {
            if (!$(this).val()) {
                bool = false;
                $(this).closest("div").find("label").addClass("error");
                $(this).closest("div").addClass("clearfix");
            } else {
                $(this).closest("div").find("label").removeClass("error");
                $(this).closest("div").removeClass("clearfix");
            };
        };
    });
    return bool;
};

function Error(data) {
    if (data.ReturnCode) {
        if (data.ReturnCode != 200) {
            if (data.ReturnCode == 401) {
                removeUserSession();
                return true;
            } else {
                displayMessage("notificationslabel0008", data.ReturnMessage, '2');
                return false;
            }
        } else {
            return true;
        }
    } else {
        return true;
    }
};

$("#ObreroID").kendoComboBox({
    dataTextField: "Codigo",
    dataValueField: "ObreroID",
    filter: "contains",
});

$("#TipoObreroID").kendoComboBox({
    dataTextField: "TipoObrero",
    dataValueField: "TipoObreroID",
    filter: "contains",
    change: function (e) {
        var value = this.value();
        if (value != "")
            FiltroObrero(value);
        else
            obtenerObrero();
    },
});

$("#PatioID").kendoComboBox({
    dataTextField: "Nombre",
    dataValueField: "PatioID",
    filter: "contains",
});


function FiltroObrero(TipoObreroID) {
    $Obrero.Obrero.read({ token: Cookies.get("token"), TipoObreroID: TipoObreroID }).done(function (result) {
        ControlErroresObjetosComboBox("ObreroID", result);
    });
}


function obtenerObrero() {
    $Obrero.Obrero.read({ token: Cookies.get("token") }).done(function (result) {
        console.log("lista todos obreros: " + JSON.stringify(result));
        ControlErroresObjetosComboBox("ObreroID", result);
    });
}

function obtenerTipoObrero() {
    $TipoObrero.TipoObrero.read({ token: Cookies.get("token") }).done(function (result) {
        ControlErroresObjetosComboBox("TipoObreroID", result);
    });
}

function obtenerPatio() {
    $Patio.Patio.read({ esAvisoEntrada: 0, token: Cookies.get("token") }).done(function (result) {

        ControlErroresObjetosComboBox("PatioID", result);
    });
}

function ControlErroresObjetosComboBox(control, result) {
    if (Error(result)) {
        $("#" + control).data("kendoComboBox").dataSource.data(result);
    } else {
        $("#" + control).data("kendoComboBox").dataSource.data([]);
    };
};



function startChange() {
    var startDate = start.value(),
    endDate = end.value();

    if (startDate) {
        startDate = new Date(startDate);
        startDate.setDate(startDate.getDate());
        end.min(startDate);
    } else if (endDate) {
        start.max(new Date(endDate));
    } else {
        endDate = new Date();
        start.max(endDate);
        end.min(endDate);
    }
}

function endChange() {
    var endDate = end.value(),
    startDate = start.value();

    if (endDate) {
        endDate = new Date(endDate);
        endDate.setDate(endDate.getDate());
        start.max(endDate);
    } else if (startDate) {
        end.min(new Date(startDate));
    } else {
        endDate = new Date();
        start.max(endDate);
        end.min(endDate);
    }
}

var start = $("#FechaInicioLabor").kendoDatePicker({
    change: startChange
}).data("kendoDatePicker");;
var end = $("#FechaFinLabor").kendoDatePicker({
    change: endChange
}).data("kendoDatePicker");;

start.max(end.value());
end.min(start.value());
