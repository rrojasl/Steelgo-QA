
function ObtenerListadoProcesoSoldaduraPopUpAjax() {
   
    $PQR.PQR.read({ TipoDato: 1, ConsultaProcesoSoldadura: 0, token: Cookies.get("token") }).done(function (data) {
        $("#ProcesoSoldaduraID").data("kendoComboBox").dataSource.data(data);
    });

};


function ObtenerListadoNumeroPPopUpAjax()
{

    $PQR.PQR.read({ TipoDato:1, ConsultaNumeroP:"NumeroPID", token: Cookies.get("token") }).done(function (data) {
        $("#NumeroPID").data("kendoComboBox").dataSource.data(data);
    });


};

function ObtenerListadoGrupoPPPopUpAjax() {

    $PQR.PQR.read({ ConsultaGrupoP:"GrupoPID", TipoDato:1, token: Cookies.get("token") }).done(function (data) {
        $("#GrupoPID").data("kendoComboBox").dataSource.data(data);
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

