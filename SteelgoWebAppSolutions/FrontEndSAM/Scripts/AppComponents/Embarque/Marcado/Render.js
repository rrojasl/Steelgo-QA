function comboBoxColor(container, options) {

    var dataItem;
    $('<input required data-text-field="Nombre" data-value-field="Nombre" data-bind="value:' + options.field + '"/>')
          .appendTo(container)
          .kendoComboBox({
              autoBind: false,
              suggest: true,
              filter: "contains",
              dataSource: options.model.ListadoColores,
              template: '<span class="#: data.Nombre #">#: data.Nombre #</span> ',
              select: function (e) {
              },
              change: function (e) {
                  dataItem = this.dataItem(e.sender.selectedIndex);
                  if (dataItem != undefined) {
                      options.model.ColorCinta = dataItem.Nombre;
                      options.model.ColorCintaID = dataItem.ColorID;
                  }
                  else {
                      options.model.ColorCinta = ObtenerDescCorrectaColor(options.model.ListadoColores, options.model.ColorCintaID);
                  }
              }
          }
          );
    loadingStop();
    $(".k-combobox").on('mouseleave', function (send) {
        var e = $.Event("keydown", { keyCode: 27 });
        var item = this;
        if (!tieneClase(item)) {
            $(container).trigger(e);
        }
    });
};

function ObtenerDescCorrectaColor(lista, ColorID) {
    for (var i = 0; i < lista.length; i++) {
        if (lista[i].ColorID == ColorID)
            return lista[i].Nombre;
    }
    return "";
}

function tieneClase(item) {
    for (var i = 0; i < item.classList.length; i++) {
        if (item.classList[i] == "k-state-border-up" || item.classList[i] == "k-state-border-down") {
            return true;
        }
    }
    return false
}