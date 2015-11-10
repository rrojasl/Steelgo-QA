//MANDA CARGAR EL GRID AL CARGAR LA PÁGINA
function changeLanguageCall() {
    CargarGridCamposPredeterminados();
};

//LLENA EL DATASOURCE Y PINTA EL GRID DE KENDO 
function CargarGridCamposPredeterminados() {
    var ResultadoJason;
    var TipoDato = 1;
    $ListadoCamposPredeterminados.ListadoCamposPredeterminados.read({ TipoDato, token: Cookies.get("token") }).done(function (data) {
        if (Error(data)) {
            ResultadoJason = data;
            if (ResultadoJason.length > 0) {
                $("#gridCamposPredeterminados").data("kendoGrid").dataSource.data(ResultadoJason);
            } else {
                $("#gridCamposPredeterminados").data("kendoGrid").dataSource.data([]);
            };
        }
    });

    //PINTA EL GRID LLENO
    $("#gridCamposPredeterminados").kendoGrid({
        dataSource: {
            data: ResultadoJason,
            schema: {
                model: {

                    fields: {
                        id_CampoPredeterminado: { type: "string", editable: false },
                        pagina: { type: "string", editable: false },
                        NombreDelCampo: { type: "string", editable: false },
                        TipoDelCampo: { type: "string", editable: false },
                        ValorPorDefecto: { type: "string", editable: true },
                    }
                }
            },
            pageSize: 20,
            serverPaging: false,
            serverFiltering: false,
            serverSorting: false,

        },
        navigatable: true,
        autoHeight: true,
        sortable: true,
        scrollable: false,
        editable: "inline",
        filterable: {
            extra: false,

        },
        pageable: {
            refresh: false,
            pageSizes: [5, 10, 15, 20],
            info: false,
            input: false,
            numeric: true,
        },
        columns: [
                    { field: "id_CampoPredeterminado", title: _dictionary.lblIdCampoPredeterminadoID[$("#language").data("kendoDropDownList").value()], filterable: true, hidden: true },
                    { field: "pagina", title: _dictionary.lblIdCampoPredeterminadoPagina[$("#language").data("kendoDropDownList").value()], filterable: true },
                    { field: "NombreDelCampo", title: _dictionary.lblIdCampoPredeterminadoNombreCampo[$("#language").data("kendoDropDownList").value()], filterable: true },
                    { field: "TipoDelCampo", title: _dictionary.lblIdCampoPredeterminadoTipoCampo[$("#language").data("kendoDropDownList").value()], filterable: true },
                    { field: "ValorPorDefecto", title: _dictionary.lblIdCampoPredeterminadoValorPorDefecto[$("#language").data("kendoDropDownList").value()], filterable: false }
        ],
        editable: true,

        edit: function (e) {
            var input = e.container.find(".k-input");
            input.blur(function (e) {

                var TIPO = 3;
                var ValorPorDefecto = input.val();
                var IdDato = $("#gridCamposPredeterminados").data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));
                var ID = IdDato.id_CampoPredeterminado;
                var TipoCampo = IdDato.TipoDelCampo;

                if (ValidaCampoCapturado(TipoCampo, ValorPorDefecto)) {
                    UpdateCampoPredeterminado(TIPO, ValorPorDefecto, ID);
                }
                else {

                    $ListadoCamposPredeterminados.ListadoCamposPredeterminados.read({ TipoDato, token: Cookies.get("token") }).done(function (data) {
                        if (Error(data)) {
                            ResultadoJason = data;
                            if (ResultadoJason.length > 0) {
                                $("#gridCamposPredeterminados").data("kendoGrid").dataSource.data(ResultadoJason);
                            } else {
                                $("#gridCamposPredeterminados").data("kendoGrid").dataSource.data([]);
                            };
                        }
                    });

                }
            });
        },
    });
};

//VALIDA QUE EL TIPO DE CAMPO INTRODUCIDO SEA CORRECTO

function ValidaCampoCapturado(TipoCampo, ValorPorDefecto) {
    try {


        switch (TipoCampo) {
            case 'Número':
                if (isNaN(ValorPorDefecto)) {
                    alert('Este campo solo acepta números.');
                    return false;
                }
                else {
                    return true;
                }
                break;
            case 'Fecha':

                var Signo = ValorPorDefecto.charAt(0);
              

                if (Signo == '+' || Signo == '-') {

                    if (isNaN(ValorPorDefecto)) {
                        alert('Este campo solo acepta números, positivos o negativos.');
                        return false;
                    }
                    else {
                        if (ValorPorDefecto > 183 || ValorPorDefecto < -183) {
                            alert('Este valor debe estar entre 0 y 183, negativo o positivo.');
                            return false;
                        }
                        else {
                            return true;
                        }
                    }
                }
                else {
                    alert('Este valor debe empezar con un signo "+" o "-"');
                    return false;
                }
                break;
            case 'Bool':
                ValorPorDefecto = ValorPorDefecto.toLowerCase();
                if (ValorPorDefecto == 'true' || ValorPorDefecto == 'false') {
                    return true;
                }
                else {
                    alert('Este valor solo puede ser "True" o "False".');
                    return false;
                }
                break;
            case 'Texto':
                return true;
                break;
        }




    } catch (e) {
        alert(e.message);
    }


}



//GUARDA EL CAMPO QUE SE VAYA A EDITAR
function UpdateCampoPredeterminado(TIPO, ValorPorDefecto, ID) {
    try {

        $ListadoCamposPredeterminados.ListadoCamposPredeterminados.read({ TIPO, ValorPorDefecto, ID, token: Cookies.get("token") }).done(function (result) {
            if (Error(result)) {
                ResultadoJason = result;
                if (ResultadoJason.length > 0) {
                    $("#gridCamposPredeterminados").data("kendoGrid").dataSource.data(ResultadoJason);
                } else {
                    $("#gridCamposPredeterminados").data("kendoGrid").dataSource.data([]);
                };
            }
        });
    }
    catch (e) {
        alert('el error es ' + ' ' + e.message);
    }
}





















