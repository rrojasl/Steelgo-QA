kendo.ui.Upload.fn._supportsDrop = function () { return false; };
Cookies.set("home", true, { path: '/' });
Cookies.set("navegacion", "35", { path: '/' });

var resultadoJson;



function changeLanguageCall() {
    loadingStart();
    LlenarGridPQR();
    CargarGridPQR();
    loadingStop();
};



function LlenarGridPQR() {

    LlenaGridAjax();


}


function CargarGridPQR() {

    $("#grid").kendoGrid({
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

function LimpiaControles() {
    $('#NombreId').val('');
    $('#Espesor').val('');
    $('#chkPreheat').prop('checked', false);
    $('#chkPwht').prop('checked', false);

    $('#ProcesoSoldaduraID').data("kendoComboBox").value("");
    $('#NumeroPID').data("kendoComboBox").value("");
    $('#GrupoPID').data("kendoComboBox").value("");
    $('#AporteID').data("kendoComboBox").value("");
    $('#MezclaID').data("kendoComboBox").value("");
    $('#RespaldoID').data("kendoComboBox").value("");
    $('#GrupoFID').data("kendoComboBox").value("");

};

function LLenaControles(e)
{
    var dataItem = $("#grid").data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));

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


};
