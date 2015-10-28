
function AjaxJunta(spoolID) {

    $CapturasRapidas.CapturasRapidas.read({ id: spoolID, sinCaptura: $('input:radio[name=Muestra]:checked').val(), token: Cookies.get("token") }).done(function (data) {
        loadingStart();
        console.log("fecha nueva" + data.FechaArmado);
        $("#Junta").data("kendoComboBox").value("");
        $("#Junta").data("kendoComboBox").dataSource.data(data)
        loadingStop();
    });
}

function AjaxObtenerListaTaller() {
    $Taller.Taller.read({ idProyecto: Cookies.get("Proyecto").split('°')[0], token: Cookies.get("token") }).done(function (data) {
        loadingStart();
        $("#inputTaller").data("kendoComboBox").value("");
        $("#inputTaller").data("kendoComboBox").dataSource.data(data);
        loadingStop();
    });
}


function AjaxObtenerListaSoldadores() {
    $CapturaSoldadura.Soldadura.read({ idProyecto: Cookies.get("Proyecto").split('°')[0], token: Cookies.get("token") }).done(function (data) {
        loadingStart();
        //$("#inputTaller").data("kendoComboBox").value("");
        //$("#inputTaller").data("kendoComboBox").dataSource.data(data)
        loadingStop();
    });
}

function ObtenerJSonGridSoldadura() {
    loadingStart();
    if (ExisteJunta()) {
        try {
            $CapturaSoldadura.Soldadura.read({ JsonCaptura: JSON.stringify(ArregloListadoCaptura()), token: Cookies.get("token") }).done(function (data) {
                var ds = $("#grid").data("kendoGrid").dataSource;
                var array = JSON.parse(data);
                for (var i = 0; i < array.length; i++) {
                    ds.add(array[i]);
                }
            });

        } catch (e) {
            alert("error:" + e.message);
        }
    }
    else
        alert('La junta ya se agregó')

    loadingStop();

}

