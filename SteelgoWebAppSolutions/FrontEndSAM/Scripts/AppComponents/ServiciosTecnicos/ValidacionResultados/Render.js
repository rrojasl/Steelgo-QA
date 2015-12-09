function comboBoxDefectos(container, options) {
    var dataItem;
    $('<input required data-text-field="Nombre" id=' + options.model.uid + ' data-value-field="Nombre" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            autoBind: false,
            dataSource: options.model.Defectos,
            template: "<i class=\"fa fa-#=data.Nombre.toLowerCase()#\"></i> #=data.Nombre#",
            select: function (e) {
                dataItem = this.dataItem(e.item.index());
                options.model.DefectoID = dataItem.DefectoID;
                options.model.Nombre = dataItem.Nombre;
            },
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);
                options.model.DefectoID = dataItem.DefectoID;
                options.model.Nombre = dataItem.Nombre;
            }
        }
        );
}

function comboBoxConciliacion(container, options) {
    var dataItem;
    
    $('<input required data-text-field="Nombre" id=' + options.model.uid + ' data-value-field="Nombre" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            autoBind: false,
            dataSource: [
                    { Conciliado: "Rechazado", Nombre: "Rechazado" },
                    { Conciliado: "Aceptado", Nombre: "Aceptado" }
                    ],
            dataTextField: "Nombre",
            dataValueField: "Conciliacion",
            select: function (e) {
                dataItem = this.dataItem(e.item.index());
                options.model.Conciliado = dataItem.Nombre;
            },
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);
                options.model.Conciliado = dataItem.Nombre;
                
                
            }
        }
        );
}


function renderEnlaceEditar(container, options) {
    $('<a  href="" id=' + options.model.uid + ' ">Editar</a>')
        .appendTo(container)
        .click(function () {
            alert('lol')
        });
    
}