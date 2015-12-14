function comboBoxColor(container, options) {

    var dataItem;
    $('<input required data-text-field="Nombre" data-value-field="Nombre" data-bind="value:' + options.field + '"/>')
          .appendTo(container)
          .kendoComboBox({
              autoBind: false,
              dataSource: options.model.ListadoColores,
              template: '<span class="#: data.Nombre #">#: data.Nombre #</span> ',
              select: function (e) {
              },
              change: function (e) {
                  dataItem = this.dataItem(e.sender.selectedIndex);
                  options.model.ColorCinta = dataItem.Nombre;
                  options.model.ColorCintaID = dataItem.ColorID;
              }
          }
          );
    loadingStop();
};