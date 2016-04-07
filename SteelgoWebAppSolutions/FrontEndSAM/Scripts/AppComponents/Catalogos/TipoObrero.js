kendo.ui.Upload.fn._supportsDrop = function () { return false; }
Cookies.set("home", true, { path: '/' });
Cookies.set("navegacion", "31", { path: '/' });


var resultadoJson, PeriodoTiempo, TipoObrero = {};

var $TipoObreroModel = {
    listContainer: {
        create: "",
        list: "",
        detail: "",
        destroy: ""
    },
    properties: {

        TipoObrero: {
            visible: "#TipoObreroDiv",
            editable: "#TipoObrero",
            required: "#TipoObrero",
        },
        TipoObreroJefe: {
            visible: "#TipoObreroJefeDiv",
            editable: "#TipoObreroJefe",
        },
    }
};



function changeLanguageCall() {
    loadingStart();
    LlenarGrid();
    CargarGridTipoObrero();
    obtenerTipoObreroJefe();
    $("#TipoObreroJefe").data("kendoComboBox").enable();
    loadingStop();
};

function LlenarGrid() {
    $TipoObrero.TipoObrero.read({ token: Cookies.get("token") }).done(function (result) {
        if (Error(result)) {
            resultadoJson = result;
            console.log("lista imprime che: " + JSON.stringify(resultadoJson));
            $("#grid").data("kendoGrid").dataSource.data([]);
            if (resultadoJson.length > 0) {
                $("#grid").data("kendoGrid").dataSource.data(resultadoJson);
            } else {
                $("#grid").data("kendoGrid").dataSource.data([]);
            };
        }

    });
}

function CargarGridTipoObrero() {
    $("#grid").kendoGrid({
        dataSource: {
            data: resultadoJson,
            schema: {
                model: {
                    fields: {
                        TipoObreroID: { type: "int" },
                        TipoObrero: { type: "string" },
                        TipoObreroJefe: { type: "int" },
                        TipoObreroJefeNombre: { type: "string" },
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
            { field: "TipoObreroID", title: _dictionary.Obrero0001[$("#language").data("kendoDropDownList").value()], filterable: true, hidden: true },
            { field: "TipoObrero", title: _dictionary.Obrero0002[$("#language").data("kendoDropDownList").value()], filterable: true },
            { field: "TipoObreroJefe", title: _dictionary.Obrero0003[$("#language").data("kendoDropDownList").value()], filterable: true, hidden: true },
            { field: "TipoObreroJefeNombre", title: _dictionary.Obrero0003[$("#language").data("kendoDropDownList").value()], filterable: true },
            { command: { text: _dictionary.Cuantificacion0004[$("#language").data("kendoDropDownList").value()], click: editarTipoObrero }, title: " ", width: "40px" },
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
    e.stopPropagation();

    var dataItem = $("#grid").data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));
    var TipoObreroID = dataItem.TipoObreroID;
    if (confirm(_dictionary.TrabajosAdicionales0001[$("#language").data("kendoDropDownList").value()])) {
        $TipoObrero.TipoObrero.destroy({}, { TipoObreroID: TipoObreroID, token: Cookies.get("token") }).done(function (data) {
            if (data.ReturnMessage == "OK") {
                LlenarGrid();
                obtenerTipoObreroJefe();
            }
            else {
                displayMessage("notificationslabel0008", data.ReturnMessage, '2');

            }
        });
    }
};

function editarTipoObrero(e) {
    e.preventDefault();
    var dataItem = $("#grid").data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));

    if (dataItem.TipoObreroJefeNombre.trim() != "N/A") {
        var combobox = $("#TipoObreroJefe").data("kendoComboBox");
        combobox.value(dataItem.TipoObreroJefe);
    }


    $("#TipoObreroID").val(dataItem.TipoObreroID);
    $("#TipoObrero").val(dataItem.TipoObrero);
    $("#TipoObreroJefe").val(dataItem.TipoObreroJefe);
    VentanaModal(1);
    $("#formaTipoObrero").show();
}


function VentanaModal(modo) {

    var modalTitle = "";
    modalTitle = "Tipo Obrero";
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
    e.preventDefault();
    limpiarVentanaModal();
    VentanaModal("0");
});


function limpiarVentanaModal() {
    $("#TipoObreroID").val("");
    $("#TipoObrero").val("");
    $("#TipoObreroJefe").data("kendoComboBox").value("");
}

$("#CancelarTrabajoAdicional").click(function () {

    $("#window").data("kendoWindow").close();
});

$("#GuardarTrabajoAdicional").click(function () {

    if (validarRequeridosFormaTipoObrero()) {
        GuardarTipoObrero();
    } else {
        displayMessage("notificationslabel0031", "", '1');
    }
});


function GuardarTipoObrero() {

    TipoObreroModal = {
        TipoObreroID: "",
        TipoObrero: "",
        TipoObreroJefe: "",
    };


    TipoObreroModal.TipoObreroID = $("#TipoObreroID").val();
    TipoObreroModal.TipoObrero = $("#TipoObrero").val();
    TipoObreroModal.TipoObreroJefe = $("#TipoObreroJefe").val();

    if ($("#TipoObreroJefe").val() == "") {
        $("#TipoObreroJefe").val("0");
    }

    if ($("#Modo").val() == "0") {
        console.log("Guardar: " + JSON.stringify(TipoObreroModal));
        $TipoObrero.TipoObrero.create(TipoObreroModal, { token: Cookies.get("token") }).done(function (result) {
            LlenarGrid();
            obtenerTipoObreroJefe();
        });
    }

    else if ($("#Modo").val() == "1") {
        console.log("Editar: " + JSON.stringify(TipoObreroModal));
        $TipoObrero.TipoObrero.update(TipoObreroModal, { token: Cookies.get("token") }).done(function (result) {
            LlenarGrid();
            obtenerTipoObreroJefe();
        });
    }

    $("#window").data("kendoWindow").close();
}


function validarRequeridosFormaTipoObrero() {
    var bool = true;
    $("#formaTipoObrero .security_required").each(function (i, elem) {
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

$("#TipoObreroJefe").kendoComboBox({
    dataTextField: "TipoObrero",
    dataValueField: "TipoObreroID",
    filter: "contains",
});

function obtenerTipoObreroJefe() {
    $TipoObrero.TipoObrero.read({ token: Cookies.get("token") }).done(function (result) {
        console.log("Read: " + JSON.stringify(result));
        ControlErroresObjetosComboBox("TipoObreroJefe", result);
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