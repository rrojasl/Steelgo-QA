function changeLanguageCall() {
    CargarGrid();
    AjaxObtenerCatalogoClasificacion();
    AjaxObtenerCatalogoPersistencia();
    setTimeout(function () { AjaxPinturaCargaMedioTransporte(); }, 1100);
    setTimeout(function () { AjaxCargarCamposPredeterminados(); }, 1000);
    document.title = _dictionary.PinturaHeaderCargaCarro[$("#language").data("kendoDropDownList").value()];
}

IniciarCapturaPinturaCarga();
function IniciarCapturaPinturaCarga() {
    SuscribirEventos();


}

function LimpiarCarro() {
    $("#inputMedioTransporte").val('');
    $("#inputNumeroVeces").val('');
    $("#inputPesoMaximo").val('');
    $("#inputArea").val('');

}

function CargarGrid() {
    $("#grid").kendoGrid({
        edit: function (e) {
            if ($('#botonGuardar').text() == _dictionary.MensajeGuardar[$("#language").data("kendoDropDownList").value()]) {

            }
            else {
                this.closeCell();
            }

        },
        autoBind: true,
        dataSource: {

            schema: {
                model: {
                    fields: {
                        SpoolID: { type: "string", editable: false },
                        SistemaPintura: { type: "string", editable: false },
                        Area: { type: "number", editable: false },
                        Peso: { type: "number", editable: false }
                    }
                }
            },
            filter: {
                logic: "or",
                filters: [
                  { field: "Accion", operator: "eq", value: 1 },
                  { field: "Accion", operator: "eq", value: 2 }
                ]
            },
            pageSize: 20,
            serverPaging: false,
            serverFiltering: false,
            serverSorting: false
        },
        navigatable: true,
        filterable: {
            extra: false
        },
        editable: true,
        autoHeight: true,
        sortable: true,
        scrollable: true,
        pageable: {
            refresh: false,
            pageSizes: [10, 15, 20],
            info: false,
            input: false,
            numeric: true,
        },
        columns: [
            { field: "SpoolJunta", title: _dictionary.PinturaCargaSpool[$("#language").data("kendoDropDownList").value()], filterable: true },
            { field: "SistemaPintura", title: _dictionary.PinturaCargaSistemaPintura[$("#language").data("kendoDropDownList").value()], filterable: true },
            { field: "Area", type: 'number', title: _dictionary.PinturaCargaArea[$("#language").data("kendoDropDownList").value()], filterable: true },
            { field: "Peso", type: 'number', title: _dictionary.PinturaCargaPeso[$("#language").data("kendoDropDownList").value()], filterable: true },
            { command: { text: _dictionary.botonCancelar[$("#language").data("kendoDropDownList").value()], click: eliminarCaptura }, title: "", width: "99px" }
        ]
    });


}


function eliminarCaptura(e) {
    e.preventDefault();
     
    if ($('#botonGuardar').text() == _dictionary.MensajeGuardar[$("#language").data("kendoDropDownList").value()]) {
        var filterValue = $(e.currentTarget).val();
        var dataItem = $("#grid").data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));
         
        ventanaConfirm = $("#ventanaConfirm").kendoWindow({
            iframe: true,
            title: _dictionary.WarningTitle[$("#language").data("kendoDropDownList").value()],
            visible: false, //the window will not appear before its .open method is called
            width: "400px",
            height: "auto",
            modal: true
        }).data("kendoWindow");
          
        ventanaConfirm.content(_dictionary.CapturaAvanceIntAcabadoPreguntaBorradoCaptura[$("#language").data("kendoDropDownList").value()] +
                "</br><center><button class='btn btn-blue' id='yesButton'>Si</button><button class='btn btn-blue' id='noButton'> No</button></center>");

        ventanaConfirm.open().center();

        $("#yesButton").click(function () {
            var dataSource = $("#grid").data("kendoGrid").dataSource;


            if (dataItem.Accion === 1)
            { dataSource.remove(dataItem); }
            else
                dataItem.Accion = 3

            dataSource.sync();

            ImprimirAreaTonelada();
            ventanaConfirm.close();
        });
        $("#noButton").click(function () {
            ventanaConfirm.close();
        });
    }
}

function validarInformacion(row) {
    var ds = $("#grid").data("kendoGrid").dataSource;
    var existe = false;

    for (var i = 0; i < ds._data.length; i++) {
        if (ds._data[i]["SpoolID"] == row.SpoolID && ds._data[i]["Accion"] != 3) {
            existe = true;
            break;
        }
    }
    return existe;
}

function ValidarDatosNuevoCarro(ListaDetalles) {
    var error = false;

    if (ListaDetalles.Nombre == "") {
        displayMessage("Mensajes_error", "Escriba nombre de carro", '2');
        error = true;
    }

    if (ListaDetalles.NumeroVecesUsoMaximo == "" && ListaDetalles.PersistenciaID == 1) {
        displayMessage("Mensajes_error", "Escriba número de veces que puede ser utilizado el carro", '2');
        error = true;
    }

    if (ListaDetalles.PesoMaximo == "") {
        displayMessage("Mensajes_error", "Escriba peso de carro", '2');
        error = true;
    }

    if (ListaDetalles.Area == "") {
        displayMessage("Mensajes_error", "Escriba área de carro", '2');
        error = true;
    }
    return error;
}