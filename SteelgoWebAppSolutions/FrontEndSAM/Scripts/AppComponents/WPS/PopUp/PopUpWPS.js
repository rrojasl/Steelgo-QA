kendo.ui.Upload.fn._supportsDrop = function () { return false; };
Cookies.set("home", true, { path: '/' });
Cookies.set("navegacion", "10015", { path: '/' });


var $WPSSaveModel = {
    listContainer: {
        create: "",
        list: "",
        detail: "",
        destroy: ""
    },
    properties: {
        NombreWPS: {
            visible: "#DivNombreWPS",
            editable: "#NomnreWPS",
            required: "#NomnreWPS"
        },
        PQRRaiz: {
            visible: "#DivNombrePQRRaiz",
            editable: "#PQRRaizNombre",
            required: "#PQRRaizNombre"
        },
        PQRRelleno: {
            visible: "#DivNombrePQRRelleno",
            editable: "#PQRRellenoNombre",
            required: "#PQRRellenoNombre"
        }
    }
};




CargaInicial();

function CargaInicial() {
    ConvertirCombos();
    obtenerPQRAjax();
    obtenerGrupoPAjax();
};

function ConvertirCombos() {

    $("#PQRRaizNombre").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "PQRID",
        select: function (e) {

            dataItem = this.dataItem(e.item.index());
            var PQRIDBuscar = dataItem.PQRID;
            ObtenerDatosAutomaticosDeRaiz(PQRIDBuscar);
        },


    });


    $("#PQRRellenoNombre").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "PQRID",
        select: function (e) {

            dataItem = this.dataItem(e.item.index());
            var PQRIDBuscar = dataItem.PQRID;
            ObtenerDatosAutomaticosDeRelleno(PQRIDBuscar);
        },
    });

    $("#grupoPRelleno").kendoComboBox({
        dataTextField: "GrupoMaterialBase1",
        dataValueField: "GrupoMaterialBase1PID",
    });

    $("#grupoPRaiz").kendoComboBox({
        dataTextField: "GrupoMaterialBase1",
        dataValueField: "GrupoMaterialBase1PID",
    });

};

function AsignarValoresItemSeleccionado(e) {
    var DataItem = $("#grid").data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));

    var WPSID = DataItem.WPSID;
    $("#WPSID").val(WPSID);

    var NombreWPS = DataItem.WPSNombre;
    $("#NomnreWPS").val(NombreWPS);


    //#region Raices
    var CMBPQRD = $("#PQRRaizNombre").data("kendoComboBox");
    CMBPQRD.value(DataItem.PQRRaizId);



    var CMBGrupoPRAIZ = $("#grupoPRaiz").data("kendoComboBox");
    CMBGrupoPRAIZ.value(DataItem.GrupoPId);


    var pwhRaizValor = DataItem.PWHT;

    if (pwhRaizValor == 'SI') {
        var data = kendo.observable({
            optionCheck: true
        });
        kendo.bind($("#PWHRaiz"), data);
    }
    else {
        var data = kendo.observable({
            optionCheck: false
        });
        kendo.bind($("#PWHRaiz"), data);
    }

    var EMINRZ = DataItem.EspesorMinimoRaiz;
    $("#EspesoirMinimoRaiz").val(EMINRZ);
    var EMAXRZ = DataItem.EspesorMaximoRaiz;
    $("#EspesoirMaximoRaiz").val(EMAXRZ);
    //#endregion



    //#region Rellenos
    var CMBPQRD2 = $("#PQRRellenoNombre").data("kendoComboBox");
    CMBPQRD2.value(DataItem.PQRRellenoId);


    var CMBGrupoPRelleno = $("#grupoPRelleno").data("kendoComboBox");
    CMBGrupoPRelleno.value(DataItem.GrupoPId);


    if (pwhRaizValor == 'SI') {
        var data = kendo.observable({
            optionCheck: true
        });
        kendo.bind($("#PWHRelleno"), data);
    }
    else {
        var data = kendo.observable({
            optionCheck: false
        });
        kendo.bind($("#PWHRelleno"), data);
    }

    var EMINRLL = DataItem.EspesorMinimoRelleno;
    $("#EspesoirMinimoRelleno").val(EMINRLL);
    var EMAXRLL = DataItem.EspesorMaximoRelleno;
    $("#EspesoirMaximoRelleno").val(EMAXRLL);
    //#endregion

};

function validarRequeridosWPS() { 
    var bool = true;
    $("#ValidaCamposRequeridosWPS .security_required").each(function (i, elem) {
       
        if (elem.tagName.toLowerCase() != 'label' && elem.tagName.toLowerCase() != 'span') {
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

function calcularDatosAutomaticosRelleno(PQRSeleccionado_GrupoP, PQRSeleccionado_PWHT) {

    var CMBPQRD = $("#grupoPRelleno").data("kendoComboBox");
    CMBPQRD.value(PQRSeleccionado_GrupoP);




    if (PQRSeleccionado_PWHT == true) {
        var data = kendo.observable({
            optionCheck: true
        });
        kendo.bind($("#PWHRelleno"), data);
    }
    else {
        var data = kendo.observable({
            optionCheck: false
        });
        kendo.bind($("#PWHRelleno"), data);
    }



};

function calcularDatosAutomaticosRaiz(PQRSeleccionado_GrupoP, PQRSeleccionado_PWHT) {

    var CMBPQRD = $("#grupoPRaiz").data("kendoComboBox");
    CMBPQRD.value(PQRSeleccionado_GrupoP);

    if (PQRSeleccionado_PWHT == true) {
        var data = kendo.observable({
            optionCheck: true
        });
        kendo.bind($("#PWHRaiz"), data);
    }
    else {
        var data = kendo.observable({
            optionCheck: false
        });
        kendo.bind($("#PWHRaiz"), data);
    }

};

function calcularEspesorMaximoRaiz(ProcesoSoldaduraRaiz, EspesorRellenoRaiz) {
  
    if (ProcesoSoldaduraRaiz == 'Gmaw STT') {

        $("#EspesoirMaximoRaiz").val(1.1);
    }
    else {

           if (EspesorRellenoRaiz > 1.5) {
            $("#EspesoirMaximoRaiz").val(8);
        }
        else {

            var resultado = parseFloat(EspesorRellenoRaiz) * 2;
            $("#EspesoirMaximoRaiz").val(resultado);
        }



    }


};


function calcularEspesorMaximoRelleno(ProcesoSoldaduraRelleno, EspesorRellenoRelleno) {

    if (EspesorRellenoRelleno > 1.5) {
            $("#EspesoirMaximoRelleno").val(8);
        }
        else {

        var resultado = parseFloat(EspesorRellenoRelleno) * 2;
            $("#EspesoirMaximoRelleno").val(resultado);
        }

};