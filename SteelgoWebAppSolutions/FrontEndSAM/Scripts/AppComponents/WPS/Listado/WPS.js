var resultadoJson
var win

function changeLanguageCall() {
    loadingStart();
    ObtenerJSONParaGrid();
    CargarGrid();
    loadingStop();


};

function CargarGrid() {


    $("#grid").kendoGrid({
        dataSource: {
            data: resultadoJson,
            schema: {
                model: {
                    fields: {
                        WPSID: { type: "int" },
                        WPSNombre: { type: "string" },
                        PQRRaizId: { type: "int" },
                        NombrePQRRaiz: { type: "string" },
                        PQRRellenoId: { type: "int" },
                        NombrePQRRelleno: { type: "string" },
                        GrupoPId: { type: "int" },
                        GrupoP: { type: "string" },
                        PWHTId: { type: "int" },
                        PWHT: { type: "string" },
                        EspesorMaximoRaiz: { type: "string" },
                        EspesorMinimoRaiz: { type: "string" },
                        EspesorMaximoRelleno: { type: "string" },
                        EspesorMinimoRelleno: { type: "string" },



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
        scrollable: true,
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

                    { field: "WPSID", title: _dictionary.WPSID[$("#language").data("kendoDropDownList").value()], filterable: true, width: "110px", hidden: true },
                    { field: "WPSNombre", title: _dictionary.WPSNombre[$("#language").data("kendoDropDownList").value()], filterable: true, width: "110px" },
                    { field: "PQRRaizId", title: _dictionary.WPSpqrraizId[$("#language").data("kendoDropDownList").value()], filterable: true, width: "110px", hidden: true },
                    { field: "NombrePQRRaiz", title: _dictionary.WPSPQRRAIZ[$("#language").data("kendoDropDownList").value()], filterable: true, width: "100px" },
                    { field: "PQRRellenoId", title: _dictionary.WPSpqrrellenoId[$("#language").data("kendoDropDownList").value()], filterable: true, width: "90px", hidden: true },
                    { field: "NombrePQRRelleno", title: _dictionary.WPSPQRRelleno[$("#language").data("kendoDropDownList").value()], filterable: true, width: "110px" },
                    { field: "GrupoPId", title: _dictionary.WPSGrupoPId[$("#language").data("kendoDropDownList").value()], filterable: true, width: "110px", hidden: true },
                    { field: "GrupoP", title: _dictionary.WPSPQRGrupoP[$("#language").data("kendoDropDownList").value()], filterable: true, width: "130px" },
                    { field: "PWHTId", title: _dictionary.WPSpwhtid[$("#language").data("kendoDropDownList").value()], filterable: true, width: "150px", hidden: true },
                    { field: "PWHT", title: _dictionary.WPSPWHT[$("#language").data("kendoDropDownList").value()], filterable: true, width: "90px" },

                    { field: "EspesorMaximoRaiz", title: _dictionary.WPSEspesorMaximoRaiz[$("#language").data("kendoDropDownList").value()], filterable: true, width: "125px" },
                    { field: "EspesorMinimoRaiz", title: _dictionary.WPSEspesorMinimoRaiz[$("#language").data("kendoDropDownList").value()], filterable: true, width: "125px" },
                    { field: "EspesorMaximoRelleno", title: _dictionary.WPSEspesorMaximoRelleno[$("#language").data("kendoDropDownList").value()], filterable: true, width: "145px" },
                    { field: "EspesorMinimoRelleno", title: _dictionary.WPSEspesorMinimoRelleno[$("#language").data("kendoDropDownList").value()], filterable: true, width: "145px" },
                    { command: { text: _dictionary.botonCancelar[$("#language").data("kendoDropDownList").value()], click: EliminaWPS }, title: "", width: "90px" },
                    { command: { text: _dictionary.botonDetalle[$("#language").data("kendoDropDownList").value()], click: EditaWPS }, title: "", width: "90px" }
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
    modalTitle = "WPS";
    var window = $("#windowWPS");

    if (win == undefined) {

        win = window.kendoWindow({
            actions: "",
            modal: true,
            title: modalTitle,
            resizable: false,
            visible: false,
            width: "50%",
            minWidth: 660,
            position: {
                top: "10%",
                left: "20%"
            }
        }).data("kendoWindow");

    }

    window.data("kendoWindow").title(modalTitle);
    window.data("kendoWindow").center().open();

};



function AbrirVentanaModalVista() {
    VentanaModal();
    $("#windowWPS").show();
};



function LimpiarControlesParaAgregar() {

    $("#WPSID").val(0);

    $("#NomnreWPS").val("");


    $("#PQRRaizNombre").data("kendoComboBox").value("");
    $("#PQRRellenoNombre").data("kendoComboBox").value("");


    $("#grupoPRelleno").data("kendoComboBox").value("");
    $("#PWHRaiz").prop('checked', false);
    $("#EspesoirMaximoRaiz").val(0);
    $("#EspesoirMinimoRaiz").val(0);


    $("#grupoPRaiz").data("kendoComboBox").value("");
    $("#PWHRelleno").prop('checked', false);
    $("#EspesoirMaximoRelleno").val(0);
    $("#EspesoirMinimoRelleno").val(0);



};




