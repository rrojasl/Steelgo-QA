
function ObtenerListadoProcesoSoldaduraPopUpAjax() {
   
    $PQR.PQR.read({ TipoDato: 1, ConsultaProcesoSoldadura: 0, token: Cookies.get("token") }).done(function (data) {
        
        $("#ProcesoSoldaduraRellenoID").data("kendoComboBox").dataSource.data(data);
        $("#ProcesoSoldaduraRaizID").data("kendoComboBox").dataSource.data(data);
    });

};


function ObtenerListadoNumeroPPopUpAjax()
{

    $PQR.PQR.read({ TipoDato:1, ConsultaNumeroP:"NumeroPID", token: Cookies.get("token") }).done(function (data) {
        $("#NumeroPID").data("kendoComboBox").dataSource.data(data);
    });


};

function ObtenerListadoGrupoPPPopUpAjax() {

    
    $PQR.PQR.read({ ConsultaGrupoP: "GrupoPID", TipoDato: 1, token: Cookies.get("token") }).done(function (data) {
        console.log(data);
        $("#GrupoPMaterialBase1ID").data("kendoComboBox").dataSource.data(data);
        $("#GrupoPMaterialBase2ID").data("kendoComboBox").dataSource.data(data);
    });

};

function ObtenerListadoAportePopUpAjax() {

    $PQR.PQR.read({ token: Cookies.get("token"), ConsultaAporte:"AporteID", TipoDato:1 }).done(function (data) {
        $("#AporteID").data("kendoComboBox").dataSource.data(data);
    });

};



function ObtenerListadoMezclaPopUpAjax() {

    $PQR.PQR.read({ token: Cookies.get("token"), ConsultaMezcla:12345, TipoDato:1 }).done(function (data) {
        $("#MezclaID").data("kendoComboBox").dataSource.data(data);
    });


};



function ObtenerListadoRespaldoPopUpAjax() {

    $PQR.PQR.read({ ConsultaRespaldo:0, token: Cookies.get("token"), TipoDato:1 }).done(function (data) {
        $("#RespaldoID").data("kendoComboBox").dataSource.data(data);
    });


};


function ObtenerListadoGrupoFPopUpAjax() {

    $PQR.PQR.read({ token: Cookies.get("token"), TipoDato:1, var1:"1", var2:"2" }).done(function (data) {
        $("#GrupoFID").data("kendoComboBox").dataSource.data(data);
    });
};


function ObtenerListadoCodigoPopUpAjax() {

    $PQR.PQR.read({ token: Cookies.get("token"), TipoDato: 1, var1: "1", var2: "2", var3: "3" }).done(function (data) {
        $("#CodigoID").data("kendoComboBox").dataSource.data(data);
    });

};



function agregarPQR(PQRModal) {
    console.log("LLEGO AL AJAX");

    console.log(PQRModal);

    $PQR.PQR.create(PQRModal, { token: Cookies.get("token") }).done(function (data) {
        loadingStart();
        LlenarGridPQR();
        $("#windowPQR").data("kendoWindow").close();
        loadingStop();
    });

};

function EditaPQR(PQRModal) {
    $PQR.PQR.update(PQRModal, { token: Cookies.get("token") }).done(function (data) {
        loadingStart();
        LlenarGridPQR();
        $("#windowPQR").data("kendoWindow").close();
        loadingStop();
    });

};

