function changeLanguageCall() {
    CargarGrid();
};
function CargarGrid() {
    $("#grid").kendoGrid({
        autoBind: true,
        dataSource: {
            data: [{ Embarque: 1, Plana: 18, Proyecto: "Ramones", PapelesCliente: true, paplelesAduana: true, SolicitarPermiso: true, AporbadoCliente: true, AprobadoAduana: true, OKEmbarque: true, FechaEnvio:"12/12/2015" },
                  { Embarque: 2, Plana: 19, Proyecto: "Ramones", PapelesCliente: false, paplelesAduana: false, SolicitarPermiso: false, AporbadoCliente: false, AprobadoAduana: false, OKEmbarque: false, FechaEnvio: "" }],
            schema: {
                model: {
                    fields: {
                        Embarque: { type: "string", editable: false },
                        Plana: { type: "string", editable: false },
                        Proyecto: { type: "string", editable: false },
                        PapelesCliente: { type: "bool", editable: false },
                        paplelesAduana: { type: "bool", editable: false },
                        SolicitarPermiso: { type: "bool", editable: false },
                        AporbadoCliente: { type: "bool", editable: false },
                        AprobadoAduana: { type: "bool", editable: false },
                        OKEmbarque: { type: "bool", editable: false },
                        FechaEnvio: { type: "bool", editable: false },
                       
                    }
                }
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
            { field: "Embarque", title: "Embarque", filterable: true, width:"125px" },
            { field: "Plana", title: "Plana", filterable: true, width: "100px" },
            { field: "Proyecto", title: "Proyecto", filterable: true, width: "125px" },
            { field: "PapelesCliente", title: "Papeles cliente", filterable: true, template: "<input name='fullyPaid' class='ob-paid' type='checkbox' data-bind='checked: PapelesCliente' #= PapelesCliente ? checked='checked' : '' #/>", width: "125px" },
            { field: "paplelesAduana", title: "Papeles aduana", filterable: true, template: "<input name='fullyPaid' class='ob-paid' type='checkbox' data-bind='checked: paplelesAduana' #= paplelesAduana ? checked='checked' : '' #/>", width: "125px" },
            { field: "SolicitarPermiso", title: "Solicitar permisos", filterable: true, template: "<input name='fullyPaid' class='ob-paid' type='checkbox' data-bind='checked: SolicitarPermiso' #= SolicitarPermiso ? checked='checked' : '' #/>", width: "125px" },
            { field: "AporbadoCliente", title: "Aprobado cliente", filterable: true, template: "<input name='fullyPaid' class='ob-paid' type='checkbox' data-bind='checked: AporbadoCliente' #= AporbadoCliente ? checked='checked' : '' #/>", width: "125px" },
            { field: "AprobadoAduana", title: "Aprobado aduana", filterable: true, template: "<input name='fullyPaid' class='ob-paid' type='checkbox' data-bind='checked: AprobadoAduana' #= AprobadoAduana ? checked='checked' : '' #/>", width: "125px" },
            { field: "OKEmbarque", title: "OK embaruqe", filterable: true, template: "<input name='fullyPaid' class='ob-paid' type='checkbox' data-bind='checked: OKEmbarque' #= OKEmbarque ? checked='checked' : '' #/>", width: "125px" },
            { field: "FechaEnvio", title: "Fecha Envío", filterable: true, width: "125px" },
            { field: "", title: " ", filterable: true, template: "<button  type='button' class='btn btn-blue'> <span>Enviar</span></button>", width: "125px" },
        ]
    });
};