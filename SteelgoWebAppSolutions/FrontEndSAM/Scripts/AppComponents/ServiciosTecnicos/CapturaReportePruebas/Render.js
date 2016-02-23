function RenderGridDetalle(container, options) {
    $('<div name=' + options.model.SpoolJunta  + '/>')
  .appendTo(container)
  .kendoGrid({
      dataSource: {
          data:options.model.NumeroPlacas=="0" ?"": options.model.listaDetallePruebas,
          schema: {
              model: {
                  fields: {
                      Ubicacion: { type: "string", editable: true },
                      Nombre: { type: "string", editable: true },
                      DetalleResultados: { type: "string", editable: true },
                  }
              }
          },
      },
      selectable: true,
      columns: [
      
        { field: "Ubicacion", title: _dictionary.ValidacionResultadosCabeceraUbicacion[$("#language").data("kendoDropDownList").value()], filterable: true },
        { field: "Nombre", title: _dictionary.CapturaReportePruebasHeaderResultado[$("#language").data("kendoDropDownList").value()], filterable: true, editor: comboBoxResultado },
        { field: "DetalleResultados", title: _dictionary.CapturaReportePruebasHeaderDetalleDefectos[$("#language").data("kendoDropDownList").value()], filterable: false, width: "400px", editor: renderEnlaceEditar, template: "Click para ver los defectos" },
       
        {
            command: {
                text: _dictionary.botonCancelar[$("#language").data("kendoDropDownList").value()],
                click: function (e) {
                    e.preventDefault();
                    dataItem = this.dataItem($(e.currentTarget).closest("tr"));

                   
                    if (confirm(_dictionary.CapturaEliminar[$("#language").data("kendoDropDownList").value()])) {
                        var dataSource = this.dataSource;
                        dataSource.remove(dataItem);
                    }
                    options.model.NumeroPlacas =String(dataSource._data.length);
                    
                    this.dataSource.sync();
                }
            }, width: "100px"
        }

      ],
      editable: true,
      navigatable: true,
  });

};

function CargarGridPopUp() {
    
    $("#gridPopUp").kendoGrid({
        autoBind: true,
        dataSource: {
            data: [],
            schema: {
                model: {
                    fields: {

                        Nombre: { type: "string", editable: true },
                        InicioDefecto: { type: "string", editable: true },
                        FinDefecto: { type: "string", editable: true },
                    }
                }
            }, filter: {
                logic: "or",
                filters: [
                  { field: "Accion", operator: "eq", value: 1 },
                  { field: "Accion", operator: "eq", value: 2 },
                    { field: "Accion", operator: "eq", value: 0 },
                    { field: "Accion", operator: "eq", value: undefined }
                ]
            },

        },
        navigatable: true,
        filterable: {
            extra: false
        },
        click: function (e) {
        },
        editable: true,
        autoHeight: true,
        sortable: true,
        scrollable: true,
        columns: [
                { field: "Nombre", title: _dictionary.CapturaReportePruebasHeaderDefecto[$("#language").data("kendoDropDownList").value()], filterable: true, editor: comboBoxDefectos, width: "20px" },
                { field: "InicioDefecto", title: _dictionary.CapturaReportePruebasHeaderInicio[$("#language").data("kendoDropDownList").value()], filterable: true, width: "15px" },
                { field: "FinDefecto", title: _dictionary.CapturaReportePruebasHeaderFin[$("#language").data("kendoDropDownList").value()], filterable: true, width: "15px" },
            {
                command: {
                    name: "",
                    title: "",
                    text: _dictionary.botonCancelar[$("#language").data("kendoDropDownList").value()],
                    click: function (e) {
                        e.preventDefault();
                        var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                        var dataSource = this.dataSource;
                        if (confirm(_dictionary.CapturaReportePruebasMensajeEliminarDefecto[$("#language").data("kendoDropDownList").value()])) {
                            dataItem.Accion = 3;
                        }
                        dataSource.sync();
                    }
                },
                width: "10px"
            }
        ],
        editable: "incell",
        toolbar: [{ name: "create" }]

    });
    CustomisaGrid($("#gridPopUp"));
};

function renderEnlaceEditar(container, options) {
    $('<a  id=' + options.model.uid + ' "><span >' + _dictionary.ValidacionResultadosEnlaceEditar[$("#language").data("kendoDropDownList").value()] + '</span></a>')
        .appendTo(container)
        .click(AjaxObtenerRenglonEdicionDefectos(options.model));

}

function VentanaModal() {

    var modalTitle = "";
    modalTitle = _dictionary.ValidacionResultadosRequisicion[$("#language").data("kendoDropDownList").value()];
    var window = $("#windowGrid");
    var win = window.kendoWindow({
        modal: true,
        title: modalTitle,
        resizable: false,
        visible: true,
        width: "50%",
        minWidth: 30,
        position: {
            top: "1%",
            left: "1%"
        },
        actions: [
            "Pin",
            "Minimize",
            "Maximize",
            "Close"
        ],
    }).data("kendoWindow");
    window.data("kendoWindow").title(modalTitle);
    window.data("kendoWindow").center().open();

};



function comboBoxDefectos(container, options) {
    var dataItem;
    $('<input required data-text-field="Nombre" id=' + options.model.uid + ' data-value-field="Nombre" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            autoBind: false,
            dataSource: comboDefectos,
            template: "<i class=\"fa fa-#=data.Nombre.toLowerCase()#\"></i> #=data.Nombre#",
            select: function (e) {
                dataItem = this.dataItem(e.item.index());
                options.model.DefectoID = dataItem.DefectoID;
                options.model.Nombre = dataItem.Nombre;
            },
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);
                if (dataItem != undefined) {
                    options.model.DefectoID = dataItem.DefectoID;
                    options.model.Nombre = dataItem.Nombre;
                }
                else
                    options.model.Nombre = ObtenerDescCorrectaDefectos(comboDefectos, options.model.DefectoID);
            }
        }
        );
}


function ObtenerDescCorrectaDefectos(lista, DefectoID) {
    for (var i = 0; i < lista.length; i++) {
        if (lista[i].DefectoID == DefectoID)
            return lista[i].Nombre;
    }
    return "";
}

function comboBoxResultado(container, options) {
    var dataItem;

    $('<input required data-text-field="Nombre" id=' + options.model.uid + ' data-value-field="Nombre" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            autoBind: false,
            dataSource: [
                    { Resultado: 0, Nombre: _dictionary.ValidacionResultadosComboRechazado[$("#language").data("kendoDropDownList").value()] },
                    { Resultado: 1, Nombre: _dictionary.ValidacionResultadosComboAceptado[$("#language").data("kendoDropDownList").value()] }
            ],
            dataTextField: "Nombre",
            dataValueField: "Conciliacion",
            select: function (e) {
                dataItem = this.dataItem(e.item.index());
                options.model.Nombre = dataItem.Nombre;
                options.model.Resultado = dataItem.Resultado;
            },
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);
                if (dataItem != undefined) {
                    options.model.Nombre = dataItem.Nombre;
                    options.model.Resultado = dataItem.Resultado;
                }
                else
                    options.model.Nombre = ObtenerDescCorrectaResultados(this.dataSource._data, options.model.Resultado);
                

            }
        }
        );
}



function ObtenerDescCorrectaResultados(lista, Resultado) {
    for (var i = 0; i < lista.length; i++) {
        if (lista[i].Resultado == Resultado)
            return lista[i].Nombre;
    }
    return "";
}