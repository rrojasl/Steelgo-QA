kendo.ui.Upload.fn._supportsDrop = function () { return false; }
Cookies.set("home", true, { path: '/' });
Cookies.set("navegacion", "10002", { path: '/' });


var resultadoJson, PeriodoTiempo, TipoTrabajoAdicional = {};

var $TipoTrabajosAdicionalesModel = {
    listContainer: {
        create: "",
        list: "",
        detail: "",
        destroy: ""
    },
    properties: {

        TipoTrabajoAdicional: {
            visible: "#TipoTrabajoAdicionalDiv",
            editable: "#TipoTrabajoAdicional",
            required: "#TipoTrabajoAdicional",
        },
    }
};



function changeLanguageCall() {
    loadingStart();
    LlenarGrid();
    CargarGridTrabajosAdicionales();
    loadingStop();
};

function LlenarGrid() {
    $TipoTrabajoAdicional.TipoTrabajoAdicional.read({ token: Cookies.get("token") }).done(function (result) {
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

function CargarGridTrabajosAdicionales() {
    $("#grid").kendoGrid({
        dataSource: {
            data: resultadoJson,
            schema: {
                model: {
                    fields: {
                        TipoTrabajoAdicionalID: { type: "int" },
                        TipoTrabajoAdicional: { type: "string" },
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
            { field: "TipoTrabajoAdicionalID", title: _dictionary.TrabajosAdicionales0002[$("#language").data("kendoDropDownList").value()], filterable: true, hidden: true },
            { field: "TipoTrabajoAdicional", title: _dictionary.TrabajosAdicionales0002[$("#language").data("kendoDropDownList").value()], filterable: true },
            { command: { text: _dictionary.Cuantificacion0004[$("#language").data("kendoDropDownList").value()], click: editarTipoTrabajoAdicional }, title: " ", width: "40px" },
            { command: { text: _dictionary.ListadoLlegadaMaterial0017[$("#language").data("kendoDropDownList").value()], click: cancelarTipoTrabajoAdicional }, title: " ", width: "40px" }
        ],
        dataBound: function (e) {
            $(".k-grid input.k-textbox").prop('readonly', true);
            $(".k-grid td .k-button").text('');
            $(".k-grid td:first-child, .k-grid td:last-child").css('text-overflow', 'clip');
        }
    });
};


function cancelarTipoTrabajoAdicional(e) {
    e.preventDefault();
    loadingStart();
    var dataItem = $("#grid").data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));
    var TipoTrabajoAdicionalID = dataItem.TipoTrabajoAdicionalID;
    if (confirm(_dictionary.TrabajosAdicionales0001[$("#language").data("kendoDropDownList").value()])) {
        $TipoTrabajoAdicional.TipoTrabajoAdicional.destroy({}, { TipoTrabajoAdicionalID: TipoTrabajoAdicionalID, token: Cookies.get("token") }).done(function (data) {
            if (data.ReturnMessage == "OK") {
                LlenarGrid();
                loadingStop();
            }
            else {
                displayMessage("notificationslabel0008", data.ReturnMessage, '2');
                loadingStop();
            }
        });
    }
    else {
        loadingStop();
    }
};

function editarTipoTrabajoAdicional(e) {
    e.preventDefault();
    var dataItem = $("#grid").data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));

    $("#TipoTrabajoAdicionalID").val(dataItem.TipoTrabajoAdicionalID);
    $("#TipoTrabajoAdicional").val(dataItem.TipoTrabajoAdicional);

    VentanaModal(1);
    $("#formaTrabajoAdicional").show();
}


function VentanaModal(modo) {

    var modalTitle = "";
    modalTitle = "Tipo Trabajo Adicional";
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
    $("#TipoTrabajoAdicionalID").val("");
    $("#TipoTrabajoAdicional").val("");
}

$("#CancelarTrabajoAdicional").click(function (e) {
    $("#window").data("kendoWindow").close();
});

$("#GuardarTrabajoAdicional").click(function (e) {

    if (validarRequeridosFormaTrabajoAdicional()) {
        GuardarTrabajoAdicional();
    } else {
        displayMessage("notificationslabel0031", "", '1');
    }
});


function GuardarTrabajoAdicional() {

    TrabajoAdicionalModal = {
        TipoTrabajoAdicionalID: "",
        TipoTrabajoAdicional: "",
    };


    TrabajoAdicionalModal.TipoTrabajoAdicionalID = $("#TipoTrabajoAdicionalID").val();
    TrabajoAdicionalModal.TipoTrabajoAdicional = $("#TipoTrabajoAdicional").val();

    if ($("#Modo").val() == "0") {
        console.log("Guardar: " + JSON.stringify(TrabajoAdicionalModal));
        $TipoTrabajoAdicional.TipoTrabajoAdicional.create(TrabajoAdicionalModal, { token: Cookies.get("token") }).done(function (result) {
            LlenarGrid();
        });
    }

    else if ($("#Modo").val() == "1") {
        console.log("Editar: " + JSON.stringify(TrabajoAdicionalModal));
        $TipoTrabajoAdicional.TipoTrabajoAdicional.update(TrabajoAdicionalModal, { token: Cookies.get("token") }).done(function (result) {
            LlenarGrid();
        });
    }

    $("#window").data("kendoWindow").close();
}


function validarRequeridosFormaTrabajoAdicional() {
    var bool = true;
    $("#formaTipoTrabajoAdicional .security_required").each(function (i, elem) {
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