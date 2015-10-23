//MANDA CARGAR EL GRID 
function changeLanguageCall() {
    loadingStart();
    CargarGridPQR();
    ObtenerNumeroP();
    ObtenerProcesoSoldadura();
    ObtenerGrupoP();
    ObtenerAporte();
    ObtenerMezcla();
    ObtenerRespaldo();
    ObtenerGrupoF();
    loadingStop();
};

//llENA EL DATASOURCE Y PINTA LE GRID
function CargarGridPQR() {
    loadingStart();

    var ResultadoJason = "";
    var TipoDato = 1;

    $PQR.PQR.read({ TipoDato, token: Cookies.get("token") }).done(function (data) {

        if (Error(data)) {

            ResultadoJason = data;
            if (ResultadoJason.length > 0) {

                $("#gridPQR").data("kendoGrid").dataSource.data(ResultadoJason);
                loadingStop();
            } else {

                $("#gridPQR").data("kendoGrid").dataSource.data([]);
                loadingStop();
            };
        }
    });

    //PINTA EL GRID
    $("#gridPQR").kendoGrid({
        dataSource: {
            data: ResultadoJason,
            schema: {
                model: {
                    fields: {
                        PQRID: { type: "string", editable: true },
                        Nombre: { type: "string", editable: true },
                        PREHEAT: { type: "string", editable: true },
                        PWHT: { type: "string", editable: true },
                        Espesor: { type: "string", editable: true },
                        ProcesoSoldaduraID: { type: "string", editable: true },
                        NumeroP: { type: "string", editable: true },
                        GrupoP: { type: "string", editable: true },
                        Aporte: { type: "string", editable: true },
                        Mezcla: { type: "string", editable: true },
                        Respaldo: { type: "string", editable: true },
                        GrupoF: { type: "string", editable: true },
                    }
                }
            },
            pageSize: 5,
            serverPaging: false,
            serverFiltering: false,
            serverSorting: false,
        },
        navigatable: true,
        autoHeight: true,
        sortable: true,
        scrollable: false,
        pageable: {
            refresh: false,
            pageSizes: [5, 10, 15, 20],
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
                    { field: "ProcesoSoldaduraID", title: _dictionary.lblPQRProcesoSoldaduraID[$("#language").data("kendoDropDownList").value()], filterable: true },
                    { field: "NumeroP", title: _dictionary.lblPQRNumeroP[$("#language").data("kendoDropDownList").value()], filterable: true },
                     { field: "GrupoP", title: _dictionary.lblPQRGrupoP[$("#language").data("kendoDropDownList").value()], filterable: true },
                    { field: "Aporte", title: _dictionary.lblPQRAporte[$("#language").data("kendoDropDownList").value()], filterable: true },
                    { field: "Mezcla", title: _dictionary.lblPQRMezcla[$("#language").data("kendoDropDownList").value()], filterable: true },
                    { field: "Respaldo", title: _dictionary.lblPQRRespaldo[$("#language").data("kendoDropDownList").value()], filterable: true },
                    { field: "GrupoF", title: _dictionary.lblPQRGrupoF[$("#language").data("kendoDropDownList").value()], filterable: true },
                    { command: { text: _dictionary.lblAccionEditaPQR[$("#language").data("kendoDropDownList").value()], click: editarPQR }, title: " ", width: "40px" },
                    { command: { text: _dictionary.lblAccionCancelaPQR[$("#language").data("kendoDropDownList").value()], click: EliminaPQR }, title: " ", width: "40px" }


        ],
    });
};





function editarPQR(e) {
    e.preventDefault();
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

    var CMBProcesoSoldadura = $("#ProcesoSoldaduraID").data("kendoComboBox");
    CMBProcesoSoldadura.value(dataItem.ProcesoSoldaduraID);


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


    var CMBNumeroP = $("#NumeroPID").data("kendoComboBox");
    CMBNumeroP.value(dataItem.NumeroP);

    var CMBGrupoP = $("#GrupoPID").data("kendoComboBox");
    CMBGrupoP.value(dataItem.GrupoP);

    var CMBAporte = $("#AporteID").data("kendoComboBox");
    CMBAporte.value(dataItem.Aporte);

    var CMBMezcla = $("#MezclaID").data("kendoComboBox");
    CMBMezcla.value(dataItem.Mezcla);

    var CMBRespaldo = $("#RespaldoID").data("kendoComboBox");
    CMBRespaldo.value(dataItem.Respaldo);

    var CMBGrupoF = $("#GrupoFID").data("kendoComboBox");
    CMBGrupoF.value(dataItem.GrupoF);


    VentanaModal();
    $("#windowPQR").show();


}



function EliminaPQR(e) {
    e.preventDefault();
    loadingStart();

    if (confirm(_dictionary.lblConfirmaElimanarPQR[$("#language").data("kendoDropDownList").value()])) {

        var dataItem = $("#gridPQR").data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));
        $PQR.PQR.update({}, { TipoDeDato: 4, PQRID: dataItem.PQRID, token: Cookies.get("token") }).done(function (data) {
            loadingStart();
            CargarGridPQR();
            loadingStop();

        });



    }
    else {
        loadingStop();

    }


};

function VentanaModal() {

    var modalTitle = "";
    modalTitle = "Editar PQR";
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
    $("#Modo").val();
    window.data("kendoWindow").title(modalTitle);
    window.data("kendoWindow").center().open();

};










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
            Filtros();
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
            Filtros();
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
            Filtros();
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
            Filtros();
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
            Filtros();
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
            Filtros();
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
            Filtros();
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
    } else {
        $("#" + control).data("kendoComboBox").dataSource.data([]);
    };
};



$("#CancelaEditarPQR").click(function (e) {
    $("#windowPQR").data("kendoWindow").close();
});





$("#EditaPQR").click(function (e) {


    var PQRID = $("#IdPQR").val();
    var Nombre = $("#NombreId").val();
    var PREHEAT = $("#chkPreheat").is(':checked');
    var PWHT = $("#chkPwht").is(':checked');
    var Espesor = $("#Espesor").val();
    var ProcesoSoldadura = $("#ProcesoSoldaduraID").val();
    var NumeroP = $("#NumeroPID").val();
    var GrupoP = $("#GrupoPID").val();
    var Aporte = $("#AporteID").val();
    var Mezcla = $("#MezclaID").val();
    var Respaldo = $("#RespaldoID").val();
    var GrupoF = $("#GrupoFID").val();

    if (isNaN(Espesor)) {
        alert('En campo "Espesor" solo acepta números decimales');
    }
    else {


        $PQR.PQR.update({}, { PQRID, Nombre, PREHEAT, PWHT, Espesor, ProcesoSoldadura, NumeroP, GrupoP, Aporte, Mezcla, Respaldo, GrupoF, token: Cookies.get("token") }).done(function (data) {

            CargarGridPQR();
            $("#windowPQR").data("kendoWindow").close();

        });

    }




});






