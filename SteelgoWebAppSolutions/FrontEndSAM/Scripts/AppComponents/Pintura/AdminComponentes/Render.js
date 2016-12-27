function renderCantidad(container, options) {
    $('<input name="' + options.field + '"/>')
            .appendTo(container)
            .kendoNumericTextBox({
                decimals: 0,
                step: 1,
                min: 0,
               format:"#"
            });
}

