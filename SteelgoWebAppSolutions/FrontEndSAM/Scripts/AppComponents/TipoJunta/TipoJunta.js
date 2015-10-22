//MANDA CARGAR EL GRID 
function changeLanguageCall() {
    CargarGridTipoJunta();
};

//llENA EL DATASOURCE Y PINTA LE GRID
function CargarGridTipoJunta() {
    var ResultadoJason;
    var TipoDato = 1;
    $TipoJunta.TipoJunta.read({ TipoDato, token: Cookies.get("token") }).done(function (data) {
        if (Error(data)) {
            ResultadoJason = data;
            if (ResultadoJason.length > 0) {
                $("#gridTipoJunta").data("kendoGrid").dataSource.data(ResultadoJason);
            } else {
                $("#gridTipoJunta").data("kendoGrid").dataSource.data([]);
            };
        }
    });

    //PINTA EL GRID
    $("#gridTipoJunta").kendoGrid({
        dataSource: {
            data: ResultadoJason,
            schema: {
                model: {
                    fields: {
                        TipoJuntaID: { type: "string", editable: true },
                        Codigo: { type: "string", editable: true },
                        Nombre: { type: "string", editable: true },
                        Calidad: { type: "string", editable: true },
                        Relleno: { type: "string", editable: true },
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
        // toolbar: ["create"],
        columns: [
                    { field: "TipoJuntaID", title: _dictionary.lblTipoJuntaID[$("#language").data("kendoDropDownList").value()], filterable: true, hidden: true },
                    { field: "Codigo", title: _dictionary.lblTipoJuntaCodigo[$("#language").data("kendoDropDownList").value()], filterable: true },
                    { field: "Nombre", title: _dictionary.lblTipoJuntaNombre[$("#language").data("kendoDropDownList").value()], filterable: true },
                    { field: "Calidad", title: _dictionary.lblTipoJuntaCalidad[$("#language").data("kendoDropDownList").value()], filterable: true },
                    { field: "Relleno", title: _dictionary.lblTipoJuntaRelleno[$("#language").data("kendoDropDownList").value()], filterable: true },
                    //{ command: ["edit", "destroy"], title: "&nbsp;", width: "200px" }
        ],
        editable: true,
        // editable: "popup"

        //editable: true,

        edit: function (e) {
            var input = e.container.find(".k-input");
            input.blur(function (e) {
                var TipoDato = 3;

                var ObtenerDato = $("#gridTipoJunta").data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));

                var Codigo = ObtenerDato.Codigo;
                var Nombre = ObtenerDato.Nombre;
                var Calidad = ObtenerDato.Calidad;
                var Relleno = ObtenerDato.Relleno;

                var TipoJuntaID = ObtenerDato.TipoJuntaID;


                if (ValidaCampoTipoJuntas(Calidad, Relleno)) {

                    UpdateTipoJuntas(TipoDato, TipoJuntaID, Codigo, Nombre, Calidad, Relleno);
                }

                else {
                    $TipoJunta.TipoJunta.read({ TipoDato, token: Cookies.get("token") }).done(function (data) {
                        if (Error(data)) {
                            ResultadoJason = data;
                            if (ResultadoJason.length > 0) {
                                $("#gridTipoJunta").data("kendoGrid").dataSource.data(ResultadoJason);
                            } else {
                                $("#gridTipoJunta").data("kendoGrid").dataSource.data([]);
                            };
                        }
                    });

                }
            });

        }

    });
};

function UpdateTipoJuntas(TipoDato, TipoJuntaID, Codigo, Nombre, Calidad, Relleno) {
    try {



        $TipoJunta.TipoJunta.read({ TipoDato, TipoJuntaID, Codigo, Nombre, Calidad, Relleno, token: Cookies.get("token") }).done(function (data) {
            if (Error(data)) {
                ResultadoJason = data;
                if (ResultadoJason.length > 0) {
                    $("#gridTipoJunta").data("kendoGrid").dataSource.data(ResultadoJason);
                } else {
                    $("#gridTipoJunta").data("kendoGrid").dataSource.data([]);
                };
            }

        });


    } catch (e) {
        alert(e.message);
    }


}

function ValidaCampoTipoJuntas(Calidad, Relleno) {
    try {

        if (Calidad == 0 || Calidad == 1) {

            if (Relleno == 0 || Relleno == 1) {
                return true;

            }
            else {
                alert('En este campo solo se puede capturar "1" o "0"');
                return false;
            }

        }
        else {
            alert('En este campo solo se puede capturar "1" o "0"');
            return false;
        }


    } catch (e) {
        alert(e.message);
    }


}

function EliminarTipoJunta() {


}