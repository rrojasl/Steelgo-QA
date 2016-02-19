function comboBoxDestino(container, options) {

    var dataItem;
    $('<input required data-text-field="Nombre" data-value-field="Nombre" data-bind="value:' + options.field + '"/>')
          .appendTo(container)
          .kendoComboBox({
              autoBind: false,
              suggest: true,
              filter: "contains",
              dataSource: options.model.ListaDestinos,
              template: '<span class="#: data.Nombre #">#: data.Nombre #</span> ',
              select: function (e) {
              },
              change: function (e) {
                  dataItem = this.dataItem(e.sender.selectedIndex);
                  if (dataItem != undefined) {
                      options.model.Nombre = dataItem.Nombre;
                      options.model.DestinoID = dataItem.DestinoID;
                  }
                  else {
                      options.model.ColorCinta = ObtenerDescCorrectaColor(options.model.ListaDestinos, options.model.DestinoID);
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

function ObtenerDescCorrectaColor(lista, DestinoID) {
    for (var i = 0; i < lista.length; i++) {
        if (lista[i].DestinoID == DestinoID)
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