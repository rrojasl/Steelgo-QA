﻿

function changeLanguageCall() {
    CargarGrid();
    inicio();
};


function inicio() {
    SuscribirEventos();
    AjaxCargarCamposPredeterminados(true);
    AjaxObtenerProyectos();
}


function CargarGrid() {

    $("#grid").kendoGrid({
        dataSource: {
            data: [],
            schema: {
                model: {
                    fields: {

                        NumeroControl: { type: "string", editable: false },
                        EtiquetaJunta: { type: "string", editable: false },
                        Descripcion: { type: "string", editable: false },
                        Diametro: { type: "number", editable: false },
                        Preeliminar: { type: "boolean", editable: false },
                        TipoJunta: { type: "string", editable: false },
                    }
                }
            },
        },
        edit: function (e) {
            setTimeout(function () {
                var inputName = e.container.find('input');

                inputName.select();
            });
            if ($('#Guardar').text() == _dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]) {
                this.closeCell();
            };
        },
        selectable: true,
        pageable: {
            refresh: false,
            pageSizes: [10, 25, 50, 100],
            info: false,
            input: false,
            numeric: true,
        },
        filterable: getGridFilterableMaftec(),
        columns: [
            { field: "Requisicion", title: "Requisición", filterable: getGridFilterableCellNumberMaftec(), width: "100px" },
            { field: "TipoPrueba", title: "Prueba", filterable: getGridFilterableCellNumberMaftec(), width: "100px" },
            { field: "NumeroControl", title: "Spool ID", filterable: getGridFilterableCellMaftec(), width: "100px" },
            { field: "EtiquetaJunta", title: "Jta", filterable: getGridFilterableCellMaftec(), width: "70px" },
            { field: "TipoJunta", title: "Tipo Jta", filterable: getGridFilterableCellMaftec(), width: "100px" },
            { field: "Diametro", title: "Diam", filterable: getGridFilterableCellNumberMaftec(), width: "90px" },
            { field: "Clasificacion", title: "Clasificación", filterable: getGridFilterableCellNumberMaftec(), width: "90px" },
            
            
            {
                field: "Preeliminar", title: "Captura preeliminar", width: "70px",
                filterable: {
                    multi: true,
                    messages: {
                        isTrue: _dictionary.lblVerdadero[$("#language").data("kendoDropDownList").value()],
                        isFalse: _dictionary.lblFalso[$("#language").data("kendoDropDownList").value()],
                        style: "max-width:100px;"
                    },
                    dataSource: [{ Etiquetado: true }, { Etiquetado: false }]
                },
                template: "<input name='fullyPaid' class='ob-paid' disabled type='checkbox'  />", width: "100px", attributes: { style: "text-align:center;" }
            },

        ],

        editable: true,
        navigatable: true
    });
    CustomisaGrid($("#grid")); 
};