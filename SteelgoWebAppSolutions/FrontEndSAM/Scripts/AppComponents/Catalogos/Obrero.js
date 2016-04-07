kendo.ui.Upload.fn._supportsDrop = function () { return false; }
Cookies.set("home", true, { path: '/' });
Cookies.set("navegacion", "10004", { path: '/' });


var resultadoJson, PeriodoTiempo, Obrero = {};

var $ObreroModel = {
    listContainer: {
        create: "",
        list: "",
        detail: "",
        destroy: ""
    },
    properties: {

        TipoObreroID: {
            visible: "#TipoObreroIDDiv",
            editable: "#TipoObreroID",
            required: "#TipoObreroID",
        },
        Codigo: {
            visible: "#CodigoDiv",
            editable: "#Codigo",
            required: "#Codigo",
        },
        NumeroEmpleado: {
            visible: "#NumeroEmpleadoDiv",
            editable: "#NumeroEmpleado",
            required: "#NumeroEmpleado",
        },
    }
};



function changeLanguageCall() {
    loadingStart();

   
    LlenarGrid();
    CargarGridObrero();
    $("#TipoObreroID").data("kendoComboBox").enable();
    obtenerTipoObrero();
    loadingStop();
};

function LlenarGrid() {
    $Obrero.Obrero.read({ token: Cookies.get("token") }).done(function (result) {
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
                        ObreroID: { type: "int" },
                        TipoObreroID: { type: "int" },
                        NumeroEmpleado: { type: "string" },
                        Codigo: { type: "string" },
                        TipoObrero: { type: "string" },
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
        },
        pageable: {
            refresh: false,
            pageSizes: [10, 15, 20],
            info: false,
            input: false,
            numeric: true,
        },
        columns: [
            { field: "ObreroID", title: _dictionary.Obrero0001[$("#language").data("kendoDropDownList").value()], filterable: true, hidden: true },
            { field: "TipoObreroID", title: _dictionary.Obrero0002[$("#language").data("kendoDropDownList").value()], filterable: true, hidden: true },
            { field: "TipoObrero", title: _dictionary.Obrero0002[$("#language").data("kendoDropDownList").value()], filterable: true },
            { field: "NumeroEmpleado", title: _dictionary.Obrero0004[$("#language").data("kendoDropDownList").value()], filterable: true },
            { field: "Codigo", title: _dictionary.Obrero0005[$("#language").data("kendoDropDownList").value()], filterable: true },
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
    var ObreroID = dataItem.ObreroID;
    if (confirm(_dictionary.Obrero0006[$("#language").data("kendoDropDownList").value()])) {
        $Obrero.Obrero.destroy({}, { ObreroID: ObreroID, token: Cookies.get("token") }).done(function (data) {
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

    $("#TipoObreroID").val(dataItem.TipoObreroID);
    var combobox = $("#TipoObreroID").data("kendoComboBox");
    combobox.value(dataItem.TipoObreroID);

    $("#ObreroID").val(dataItem.ObreroID);
    $("#Codigo").val(dataItem.Codigo);
    $("#NumeroEmpleado").val(dataItem.NumeroEmpleado);

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
    $("#TipoObreroID").val("");
    $("#TipoObrero").val("");
    $("#Codigo").val("");
    $("#NumeroEmpleado").val("");
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

    ObreroModal = {
        ObreroID: "",
        TipoObreroID: "",
        Codigo: "",
        NumeroEmpleado: "",
    };


    ObreroModal.TipoObreroID = $("#TipoObreroID").val();
    ObreroModal.ObreroID = $("#ObreroID").val();
    ObreroModal.Codigo = $("#Codigo").val();
    ObreroModal.NumeroEmpleado = $("#NumeroEmpleado").val();


    if ($("#Modo").val() == "0") {
        console.log("Guardar: " + JSON.stringify(ObreroModal));
        $Obrero.Obrero.create(ObreroModal, { token: Cookies.get("token") }).done(function (result) {
            LlenarGrid();
            obtenerTipoObrero();
        });
    }

    else if ($("#Modo").val() == "1") {
        console.log("Editar: " + JSON.stringify(ObreroModal));
        $Obrero.Obrero.update(ObreroModal, { token: Cookies.get("token") }).done(function (result) {
            LlenarGrid();
            obtenerTipoObrero();
        });
    }

    $("#window").data("kendoWindow").close();
}


function validarRequeridosFormaObrero() {
    var bool = true;
    $("#formaObrero .security_required").each(function (i, elem) {
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

$("#TipoObreroID").kendoComboBox({
    dataTextField: "TipoObrero",
    dataValueField: "TipoObreroID",
    filter: "contains",
});

function obtenerTipoObrero() {
    var llenarCombo = 1;
    $TipoObrero.TipoObrero.read({ token: Cookies.get("token") }).done(function (result) {
        ControlErroresObjetosComboBox("TipoObreroID", result);
    });
}

function ControlErroresObjetosComboBox(control, result) {
    if (Error(result)) {
        console.log("Resultado: comboBox" + JSON.stringify(result));
        $("#" + control).data("kendoComboBox").dataSource.data(result);
    } else {
        $("#" + control).data("kendoComboBox").dataSource.data([]);
    };
};