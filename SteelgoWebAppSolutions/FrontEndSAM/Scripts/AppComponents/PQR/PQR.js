kendo.ui.Upload.fn._supportsDrop = function () { return false; };
Cookies.set("home", true, { path: '/' });
Cookies.set("navegacion", "35", { path: '/' });

var resultadoJson, EjecutaAccion, ResultadoMensaje;

var $PqrSaveModel = {
    listContainer: {
        create: "",
        list: "",
        detail: "",
        destroy: ""
    },
    properties: {
        Nombre: {
            visible: "#PQRNombreDiv",
            editable: "#NombreId",
            required: "#NombreId",
        },
        PREHEAT: {
            visible: "#PQRPreheatDiv",
            editable: "#PREHEAT",
            required: "#PREHEAT",
        },
        PWHT: {
            visible: "#PQRPWHTDiv",
            editable: "#PWHT",
            required: "#PWHT",
        },
        Espesor: {
            visible: "#PQREspesorDiV",
            editable: "#Espesor",
            required: "#Espesor",
        },
        Codigo: {
            visible: "#PQRProcesoSoldaduraDiv",
            editable: "#ProcesoSoldaduraID",
            required: "#ProcesoSoldaduraID",
        },
        NumeroP: {
            visible: "#PQRNumeroPDiv",
            editable: "#NumeroPID",
            required: "#NumeroPID",
        },
        GrupoP: {
            visible: "#PQRGrupoPDiv",
            editable: "#GrupoPID",
            required: "#GrupoPID",
        },
        Aporte: {
            visible: "#PQRAporteDiv",
            editable: "#AporteID",
            required: "#AporteID",
        },
        Mezcla: {
            visible: "#PQRMezclaDiv",
            editable: "#MezclaID",
            required: "#MezclaID",
        },
        Respaldo: {
            visible: "#PQRRespaldoDiv",
            editable: "#RespaldoID",
            required: "#RespaldoID",
        },
        GrupoF: {
            visible: "#PQRGrupoFDiv",
            editable: "#GrupoFID",
            required: "#GrupoFID",
        },
    }
};

//Funciones que se inician al cargar la página
function changeLanguageCall() {
    loadingStart();
    cargarcombos();
    LlenarGridPQR();
    CargarGridPQR();
    loadingStop();
};


//#region CargaCombos


function cargarcombos() {
    ObtenerNumeroP();
    ObtenerProcesoSoldadura();
    ObtenerGrupoP();
    ObtenerAporte();
    ObtenerMezcla();
    ObtenerRespaldo();
    ObtenerGrupoF();
}

function ObtenerNumeroP() {
    var TipoDato = 1
    var ConsultaNumeroP = 'NumeroP';
    var NumeroP = [];

    $("#NumeroPID").kendoComboBox({
        dataTextField: "NumeroP",
        dataValueField: "NumeroPID",
        select: function (e) {
            var dataItem = this.dataItem(e.item.index());

            CargarNumeroP(dataItem.NumeroPID, dataItem.NumeroP);


        },
        change: function (e) {
            var value = this.value();
            if (!value) {
                NumeroP = [];
            }
            // Filtros();
        },
        filter: "contains",
    });


    $PQR.PQR.read({ TipoDato, ConsultaNumeroP, token: Cookies.get("token") }).done(function (data) {
        ControlErroresObjetosComboBox("NumeroPID", data);
    });


};
function CargarNumeroP(id, value) {
    NumeroP = [];
    _numeroP = {};
    _numeroP["NumeroPID"] = id;
    _numeroP["NumeroP"] = value;
    NumeroP.push(_numeroP);
};

function ObtenerProcesoSoldadura() {
    var TipoDato = 1
    var ConsultaProcesoSoldadura = 1;
    var ProcesoSoldadura = [];

    $("#ProcesoSoldaduraID").kendoComboBox({
        dataTextField: "Codigo",
        dataValueField: "ProcesoSoldaduraID",
        select: function (e) {
            var dataItem = this.dataItem(e.item.index());

            CargarProcesoSoldadura(dataItem.ProcesoSoldaduraID, dataItem.Codigo);


        },
        change: function (e) {
            var value = this.value();
            if (!value) {
                ProcesoSoldadura = [];
            }
            // Filtros();
        },
        filter: "contains",
    });


    $PQR.PQR.read({ TipoDato, ConsultaProcesoSoldadura, token: Cookies.get("token") }).done(function (data) {
        ControlErroresObjetosComboBox("ProcesoSoldaduraID", data);
    });


};
function CargarProcesoSoldadura(id, value) {

    Codigo = [];
    _codigo = {};
    _codigo["ProcesoSoldaduraID"] = id;
    _codigo["Codigo"] = value;
    Codigo.push(_codigo);
};


function ObtenerGrupoP() {
    var TipoDato = 1
    var ConsultaGrupoP = 'GrupoPID';
    var GrupoP = [];

    $("#GrupoPID").kendoComboBox({
        dataTextField: "GrupoP",
        dataValueField: "GrupoPID",
        select: function (e) {
            var dataItem = this.dataItem(e.item.index());
            CargarGrupoP(dataItem.GrupoPID, dataItem.GrupoP);
        },
        change: function (e) {
            var value = this.value();
            if (!value) {
                GrupoP = [];
            }
            // Filtros();
        },
        filter: "contains",
    });


    $PQR.PQR.read({ ConsultaGrupoP, TipoDato, token: Cookies.get("token") }).done(function (data) {
        ControlErroresObjetosComboBox("GrupoPID", data);
    });


};
function CargarGrupoP(id, value) {
    GrupoP = [];
    _grupoP = {};
    _grupoP["GrupoPID"] = id;
    _grupoP["GrupoP"] = value;
    GrupoP.push(_grupoP);
};

function ObtenerAporte() {
    var TipoDato = 1
    var ConsultaAporte = 'AporteID';
    var Aporte = [];

    $("#AporteID").kendoComboBox({
        dataTextField: "Aporte",
        dataValueField: "AporteID",
        select: function (e) {
            var dataItem = this.dataItem(e.item.index());

            CargarAporte(dataItem.AporteID, dataItem.Aporte);


        },
        change: function (e) {
            var value = this.value();
            if (!value) {
                Aporte = [];
            }
            // Filtros();
        },
        filter: "contains",
    });


    $PQR.PQR.read({ token: Cookies.get("token"), ConsultaAporte, TipoDato }).done(function (data) {
        ControlErroresObjetosComboBox("AporteID", data);
    });


};
function CargarAporte(id, value) {
    Aporte = [];
    _aporte = {};
    _aporte["GrupoPID"] = id;
    _aporte["GrupoP"] = value;
    Aporte.push(_aporte);
};

function ObtenerMezcla() {
    var TipoDato = 1
    var ConsultaMezcla = 0;
    var Mezcla = [];

    $("#MezclaID").kendoComboBox({
        dataTextField: "Mezcla",
        dataValueField: "MezclaID",
        select: function (e) {
            var dataItem = this.dataItem(e.item.index());
            CargarMezcla(dataItem.MezclaID, dataItem.Mezcla);


        },
        change: function (e) {
            var value = this.value();
            if (!value) {
                Mezcla = [];
            }
            // Filtros();
        },
        filter: "contains",
    });


    $PQR.PQR.read({ token: Cookies.get("token"), ConsultaMezcla, TipoDato }).done(function (data) {
        ControlErroresObjetosComboBox("MezclaID", data);
    });


};
function CargarMezcla(id, value) {
    Mezcla = [];
    _mezcla = {};
    _mezcla["MezclaID"] = id;
    _mezcla["Mezcla"] = value;
    Mezcla.push(_mezcla);
};

function ObtenerRespaldo() {
    var TipoDato = 1
    var ConsultaRespaldo = 0;
    var Respaldo = [];

    $("#RespaldoID").kendoComboBox({
        dataTextField: "Respaldo",
        dataValueField: "RespaldoID",
        select: function (e) {
            var dataItem = this.dataItem(e.item.index());
            CargarRespaldo(dataItem.RespaldoID, dataItem.Respaldo);


        },
        change: function (e) {
            var value = this.value();
            if (!value) {
                Respaldo = [];
            }
            // Filtros();
        },
        filter: "contains",
    });


    $PQR.PQR.read({ ConsultaRespaldo, token: Cookies.get("token"), TipoDato }).done(function (data) {
        ControlErroresObjetosComboBox("RespaldoID", data);
    });


};
function CargarRespaldo(id, value) {
    Respaldo = [];
    _respaldo = {};
    _respaldo["RespaldoID"] = id;
    _respaldo["Respaldo"] = value;
    Respaldo.push(_respaldo);
};

function ObtenerGrupoF() {
    var TipoDato = 1
    var GrupoF = [];
    var var1 = "11";
    var var2 = "--";


    $("#GrupoFID").kendoComboBox({
        dataTextField: "GrupoF",
        dataValueField: "GrupoFID",
        select: function (e) {
            var dataItem = this.dataItem(e.item.index());
            CargarGrupoF(dataItem.GrupoFID, dataItem.GrupoF);


        },
        change: function (e) {
            var value = this.value();
            if (!value) {
                GrupoF = [];
            }
            //Filtros();
        },
        filter: "contains",
    });


    $PQR.PQR.read({ token: Cookies.get("token"), TipoDato, var1, var2 }).done(function (data) {
        ControlErroresObjetosComboBox("GrupoFID", data);
    });


};
function CargarGrupoF(id, value) {
    GrupoF = [];
    _grupof = {};
    _grupof["GrupoFID"] = id;
    _grupof["GrupoF"] = value;
    GrupoF.push(_grupof);
};

function ControlErroresObjetosComboBox(control, data) {
    if (Error(data)) {
        $("#" + control).data("kendoComboBox").dataSource.data(data);
        $("#" + control).data("kendoComboBox").select(0);
    } else {
        $("#" + control).data("kendoComboBox").dataSource.data([]);
    };
};



//#endregion


//#region CargarGrid

function LlenarGridPQR() {
    var TipoDato = 1;

    $PQR.PQR.read({ TipoDato, token: Cookies.get("token") }).done(function (data) {
        if (Error(data)) {
            resultadoJson = data;
            if (resultadoJson.length > 0) {
                $("#gridPQR").data("kendoGrid").dataSource.data(resultadoJson);
            } else {
                $("#gridPQR").data("kendoGrid").dataSource.data([]);
            };
        }

    });
}


function CargarGridPQR() {

    $("#gridPQR").kendoGrid({
        dataSource: {
            data: resultadoJson,
            schema: {
                model: {
                    fields: {
                        PQRID: { type: "string" },
                        Nombre: { type: "string" },
                        PREHEAT: { type: "string" },
                        PWHT: { type: "string" },
                        Espesor: { type: "string" },
                        Codigo: { type: "string" },
                        NumeroP: { type: "string" },
                        GrupoP: { type: "string" },
                        Aporte: { type: "string" },
                        Mezcla: { type: "string" },
                        Respaldo: { type: "string" },
                        GrupoF: { type: "string" },

                        ProcesoSoldaduraID: { type: "int" },
                        NumeroPID: { type: "int" },
                        GrupoPID: { type: "int" },
                        AporteID: { type: "int" },
                        MezclaID: { type: "int" },
                        RespaldoID: { type: "int" },
                        GrupoFID: { type: "int" },
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
                    startswith: "Empieza con",
                    eq: "Es igual a",
                    neq: "No es igual a"
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
           { field: "PQRID", title: _dictionary.lblPQRID[$("#language").data("kendoDropDownList").value()], filterable: true, hidden: true },
                    { field: "Nombre", title: _dictionary.lblPQRNombre[$("#language").data("kendoDropDownList").value()], filterable: true },
                    { field: "PREHEAT", title: _dictionary.lblPQRPREHEAT[$("#language").data("kendoDropDownList").value()], filterable: true },
                    { field: " PWHT", title: _dictionary.lblPQRPWHT[$("#language").data("kendoDropDownList").value()], filterable: true },
                    { field: "Espesor", title: _dictionary.lblPQREspesor[$("#language").data("kendoDropDownList").value()], filterable: true },
                    { field: "Codigo", title: _dictionary.lblPQRProcesoSoldaduraID[$("#language").data("kendoDropDownList").value()], filterable: true },
                    { field: "NumeroP", title: _dictionary.lblPQRNumeroP[$("#language").data("kendoDropDownList").value()], filterable: true },
                     { field: "GrupoP", title: _dictionary.lblPQRGrupoP[$("#language").data("kendoDropDownList").value()], filterable: true },
                    { field: "Aporte", title: _dictionary.lblPQRAporte[$("#language").data("kendoDropDownList").value()], filterable: true },
                    { field: "Mezcla", title: _dictionary.lblPQRMezcla[$("#language").data("kendoDropDownList").value()], filterable: true },
                    { field: "Respaldo", title: _dictionary.lblPQRRespaldo[$("#language").data("kendoDropDownList").value()], filterable: true },
                    { field: "GrupoF", title: _dictionary.lblPQRGrupoF[$("#language").data("kendoDropDownList").value()], filterable: true },

                    { field: "ProcesoSoldaduraID", title: _dictionary.lblPQRProcesoSoldaduraID[$("#language").data("kendoDropDownList").value()], filterable: true, hidden: true },
                    { field: "NumeroPID", title: _dictionary.lblPQRNumeroP[$("#language").data("kendoDropDownList").value()], filterable: true, hidden: true },
                     { field: "GrupoPID", title: _dictionary.lblPQRGrupoP[$("#language").data("kendoDropDownList").value()], filterable: true, hidden: true },
                    { field: "AporteID", title: _dictionary.lblPQRAporte[$("#language").data("kendoDropDownList").value()], filterable: true, hidden: true },
                    { field: "MezclaID", title: _dictionary.lblPQRMezcla[$("#language").data("kendoDropDownList").value()], filterable: true, hidden: true },
                    { field: "RespaldoID", title: _dictionary.lblPQRRespaldo[$("#language").data("kendoDropDownList").value()], filterable: true, hidden: true },
                    { field: "GrupoFID", title: _dictionary.lblPQRGrupoF[$("#language").data("kendoDropDownList").value()], filterable: true, hidden: true },

            { command: { text: _dictionary.Cuantificacion0004[$("#language").data("kendoDropDownList").value()], click: editarPQR }, title: " ", width: "40px" },
            { command: { text: _dictionary.ListadoLlegadaMaterial0017[$("#language").data("kendoDropDownList").value()], click: EliminarPQR }, title: " ", width: "40px" }
        ],
        dataBound: function (e) {
            $(".k-grid input.k-textbox").prop('readonly', true);
            $(".k-grid td .k-button").text('');
            $(".k-grid td:first-child, .k-grid td:last-child").css('text-overflow', 'clip');
        }
    });
};
//#endregion

//#region EditarPQR/AgregarPQR

function editarPQR(e) {

    LLenaControles(e);

    EjecutaAccion = 0;
    VentanaModal();
    $("#windowPQR").show();

}

$("#AAgregarPQR").click(function (e) {

    $('#NombreId').val('');
    $('#Espesor').val('');
    $('#chkPreheat').prop('checked', false);
    $('#chkPwht').prop('checked', false);
    EjecutaAccion = 1;
    VentanaModal();

});

function VentanaModal() {
    var modalTitle = "";
    modalTitle = "PQR";
    var window = $("#windowPQR");
    var win = window.kendoWindow({
        actions: "",
        modal: true,
        title: modalTitle,
        resizable: false,
        visible: false,
        width: "50%%",
        minWidth: 660,
        position: {
            top: "10%",
            left: "20%"
        }
    }).data("kendoWindow");
    window.data("kendoWindow").title(modalTitle);
    window.data("kendoWindow").center().open();

};


function LLenaControles(e) {

    var dataItem = $("#gridPQR").data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));

    $("#IdPQR").val(dataItem.PQRID)

    $("#NombreId").val(dataItem.Nombre)

    var ChkPreheat = dataItem.PREHEAT;
    if (ChkPreheat == true) {

        var data = kendo.observable({
            optionCheck: true
        });
        kendo.bind($("#chkPreheat"), data);
    }
    else {

        var data = kendo.observable({
            optionCheck: false
        });
        kendo.bind($("#chkPreheat"), data);
    }

    $("#Espesor").val(dataItem.Espesor);

    var ChkPWHT = dataItem.PWHT;
    if (ChkPWHT == true) {

        var data = kendo.observable({
            optionCheckPWHT: true
        });
        kendo.bind($("#chkPwht"), data);
    }
    else {

        var data = kendo.observable({
            optionCheckPWHT: false
        });
        kendo.bind($("#chkPwht"), data);
    }

    var CMBProcesoSoldadura = $("#ProcesoSoldaduraID").data("kendoComboBox");
    CMBProcesoSoldadura.value(dataItem.ProcesoSoldaduraID);


    var CMBNumeroP = $("#NumeroPID").data("kendoComboBox");
    CMBNumeroP.value(dataItem.NumeroPID);

    var CMBGrupoP = $("#GrupoPID").data("kendoComboBox");
    CMBGrupoP.value(dataItem.GrupoPID);

    var CMBAporte = $("#AporteID").data("kendoComboBox");
    CMBAporte.value(dataItem.AporteID);

    var CMBMezcla = $("#MezclaID").data("kendoComboBox");
    CMBMezcla.value(dataItem.MezclaID);

    var CMBRespaldo = $("#RespaldoID").data("kendoComboBox");
    CMBRespaldo.value(dataItem.RespaldoID);

    var CMBGrupoFID = $("#GrupoFID").data("kendoComboBox");
    CMBGrupoFID.value(dataItem.GrupoFID)



}

$("#CancelaEditarPQR").click(function (e) {
    $("#windowPQR").data("kendoWindow").close();
    cargarcombos();
});



$("#EditaPQR").click(function (e) {
    PQRModal = {
        PQRID: "",
        Nombre: "",
        PREHEAT: "",
        PWHT: "",
        Espesor: "",
        ProcesoSoldaduraID: "",
        NumeroP: "",
        GrupoP: "",
        Aporte: "",
        Mezcla: "",
        Respaldo: "",
        GrupoF: "",
    };

    PQRModal.PQRID = $("#IdPQR").val();
    PQRModal.Nombre = $("#NombreId").val();
    PQRModal.PREHEAT = $("#chkPreheat").is(':checked');
    PQRModal.PWHT = $("#chkPwht").is(':checked');
    PQRModal.Espesor = $("#Espesor").val();
    PQRModal.ProcesoSoldaduraID = $("#ProcesoSoldaduraID").val();
    PQRModal.NumeroP = $("#NumeroPID").val();
    PQRModal.GrupoP = $("#GrupoPID").val();
    PQRModal.Aporte = $("#AporteID").val();
    PQRModal.Mezcla = $("#MezclaID").val();
    PQRModal.Respaldo = $("#RespaldoID").val();
    PQRModal.GrupoF = $("#GrupoFID").val();


    if (validarRequeridosPQR()) {

    var PQRID = PQRModal.PQRID = $("#IdPQR").val();
    var nombrePQR = PQRModal.Nombre = $("#NombreId").val();
    var Accion = 6;
    $PQR.PQR.read({ nombrePQR, token: Cookies.get("token"), PQRID, Accion}).done(function (data) {

        if (data.ReturnMessage == "Error") {

            $(this).closest("div").find("label").addClass("error");
            $(this).closest("div").addClass("clearfix");
            displayMessage("lblExisteNombrePQR", "", '1');
        }
        else if (isNaN($("#Espesor").val())) {
            $(this).closest("div").find("label").addClass("error");
            $(this).closest("div").addClass("clearfix");
            displayMessage("lblValidaEspesorPQR", "", '1');
        }

        else {
            $(this).closest("div").find("label").removeClass("error");
            $(this).closest("div").removeClass("clearfix");

            if (PQRModal.PQRID == 0) {
                $PQR.PQR.create(PQRModal, { token: Cookies.get("token") }).done(function (data) {
                    loadingStart();
                    LlenarGridPQR();
                    $("#windowPQR").data("kendoWindow").close();
                    loadingStop();
                });

            }
            else {
                $PQR.PQR.update(PQRModal, { token: Cookies.get("token") }).done(function (data) {
                    loadingStart();
                    LlenarGridPQR();
                    $("#windowPQR").data("kendoWindow").close();
                    loadingStop();
                });
            }
        }
    });

    } else {
        displayMessage("notificationslabel0031", "", '1');
    }





});


function validarRequeridosPQR(){
    var bool = true;
    $("#CamposRequeridosPQR .security_required").each(function (i, elem) {
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


//#endregion

//#region Elimina

function EliminarPQR(e) {
    e.preventDefault();
    loadingStart();
    var dataItem = $("#gridPQR").data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));
    if (confirm(_dictionary.lblConfirmaElimanarPQR[$("#language").data("kendoDropDownList").value()])) {

        $PQR.PQR.update({}, { TipoDeDato: 4, PQRID: dataItem.PQRID, token: Cookies.get("token") }).done(function (data) {
            LlenarGridPQR();
            loadingStop();

        });
    }
    else {
        loadingStop();
    }


};
//#endregion




















