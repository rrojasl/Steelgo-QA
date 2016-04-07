Cookies.set("home", true, { path: '/' });
Cookies.set("navegacion", "10030", { path: '/' });

var $CondicionClimatologica = {
    listContainer: {
        create: "",
        list: "",
        detail: "",
        destroy: ""
    },
    properties: {
        PatioID: {
            visible: "#divinputPatio",
            editable: "#inputPatio",
            required: "#inputPatio"
        },
        ZonaID: {
            visible: "#divArea",
            editable: "#Area",
            required: "#Area"
        },
        FechaToma: {
            visible: "#divinputMedicionesfechaToma",
            editable: "#inputMedicionesfechaToma",
            required: "#inputMedicionesfechaToma"
        },
        HoraToma: {
            visible: "#divinputMedicionesHoraToma",
            editable: "#inputMedicionesHoraToma",
            required: "#inputMedicionesHoraToma"

        },
        TemperaturaAmbiente: {
            visible: "#divinputMedicionesTempAmbiente",
            editable: "#inputMedicionesTempAmbiente",
            required: "#inputMedicionesTempAmbiente"
        },
        HerramientaTempAmbienteID: {
            visible: "#divinputEquipoTomaTempAmbID",
            editable: "#inputEquipoTomaTempAmbID",
            required: "#inputEquipoTomaTempAmbID"
        },
        PorcentajeHumedad: {
            visible: "#divinputMedicionesHumedad",
            editable: "#inputMedicionesHumedad",
            required: "#inputMedicionesHumedad"
        },
        HerramientaHumedadID: {
            visible: "#divinputEquipoTomaHumedadID",
            editable: "#inputEquipoTomaHumedadID",
            required: "#inputEquipoTomaHumedadID"
        },
        PuntoRocio: {
            visible: "#divinputMedicionesPuntoRocio",
            editable: "#inputMedicionesPuntoRocio",
            required: "#inputMedicionesPuntoRocio"
        },
        HerramientaPuntoRocioID: {
            visible: "#divinputEquipoTomaPtoRocioID",
            editable: "#inputEquipoTomaPtoRocioID",
            required: "#inputEquipoTomaPtoRocioID"
        },
        CampoX: {
            visible: "#divinputMedicionesCampoX",
            editable: "#inputMedicionesCampoX",
            required: "#inputMedicionesCampoX"
        },
        HerramientaCampoXID: {
            visible: "#divinputEquipoTomaCampoXID",
            editable: "#inputEquipoTomaCampoXID",
            required: "#inputEquipoTomaCampoXID"
        }
    }
};