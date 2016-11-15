
function AjaxZona() {


    loadingStart();
    
    $IntermedioAcabado.IntermedioAcabado.read({ token: Cookies.get("token") }).done(function (data) {
        
        if (Error(data)) {

            /*var data = [{ ProyectoID: 1, Nombre: 'Proyecto 1' }, { ProyectoID: 2, Nombre: 'Proyecto 2' }];*/
            $("#inputZona").data("kendoComboBox").value("");
            $("#inputZona").data("kendoComboBox").dataSource.data(data);
            if (data.length == 2) {
                $("#inputZona").data("kendoComboBox").select(1);
                AjaxCuadrante(data[1].ZonaID)
            }
            //else
            //    ajaxResultadosDetalle($("#inputProyecto").data("kendoComboBox").value(), $("#inputProveedor").data("kendoComboBox").value(), $("#inputRequisicion").data("kendoComboBox").value());
        }
        loadingStop();
    });


    
}

function AjaxCuadrante(zonaID) {


    loadingStart();

    $IntermedioAcabado.IntermedioAcabado.read({ token: Cookies.get("token"), ZonaID: zonaID }).done(function (data) {

        if (Error(data)) {

            /*var data = [{ ProyectoID: 1, Nombre: 'Proyecto 1' }, { ProyectoID: 2, Nombre: 'Proyecto 2' }];*/
            $("#inputCuadrante").data("kendoComboBox").value("");
            $("#inputCuadrante").data("kendoComboBox").dataSource.data(data);
            ////if (data.length == 2) {
            ////    $("#inputProyecto").data("kendoComboBox").select(1);
            ////    AjaxProveedor(data[1].ProyectoID, data[1].PatioID)
            ////    AjaxPruebas(data[1].ProyectoID);
            ////}
            //else
            //    ajaxResultadosDetalle($("#inputProyecto").data("kendoComboBox").value(), $("#inputProveedor").data("kendoComboBox").value(), $("#inputRequisicion").data("kendoComboBox").value());
        }
        loadingStop();
    });



}

function AjaxSistemaPintura(zonaID, cuadranteID) {


    loadingStart();

    $IntermedioAcabado.IntermedioAcabado.read({ token: Cookies.get("token"), ZonaID: zonaID, CuadranteID: cuadranteID }).done(function (data) {

        if (Error(data)) {

            /*var data = [{ ProyectoID: 1, Nombre: 'Proyecto 1' }, { ProyectoID: 2, Nombre: 'Proyecto 2' }];*/
            $("#inputSistemaPintura").data("kendoComboBox").value("");
            $("#inputSistemaPintura").data("kendoComboBox").dataSource.data(data);
            ////if (data.length == 2) {
            ////    $("#inputProyecto").data("kendoComboBox").select(1);
            ////    AjaxProveedor(data[1].ProyectoID, data[1].PatioID)
            ////    AjaxPruebas(data[1].ProyectoID);
            ////}
            //else
            //    ajaxResultadosDetalle($("#inputProyecto").data("kendoComboBox").value(), $("#inputProveedor").data("kendoComboBox").value(), $("#inputRequisicion").data("kendoComboBox").value());
        }
        loadingStop();
    });



}

function AjaxColores(zonaID, cuadranteID, sistemaPinturaID) {


    loadingStart();

    $IntermedioAcabado.IntermedioAcabado.read({ token: Cookies.get("token"), ZonaID: zonaID, CuadranteID: cuadranteID, SistemaPinturaID: sistemaPinturaID }).done(function (data) {

        if (Error(data)) {

            /*var data = [{ ProyectoID: 1, Nombre: 'Proyecto 1' }, { ProyectoID: 2, Nombre: 'Proyecto 2' }];*/
            $("#inputColor").data("kendoComboBox").value("");
            $("#inputColor").data("kendoComboBox").dataSource.data(data);
            ////if (data.length == 2) {
            ////    $("#inputProyecto").data("kendoComboBox").select(1);
            ////    AjaxProveedor(data[1].ProyectoID, data[1].PatioID)
            ////    AjaxPruebas(data[1].ProyectoID);
            ////}
            //else
            //    ajaxResultadosDetalle($("#inputProyecto").data("kendoComboBox").value(), $("#inputProveedor").data("kendoComboBox").value(), $("#inputRequisicion").data("kendoComboBox").value());
        }
        loadingStop();
    });



}


