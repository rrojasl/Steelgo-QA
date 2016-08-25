﻿function SuscribirEventos() {
    SuscribirEventoProyecto();
    SuscribirEventoProveedor();
    SuscribirEventoRequisicion();
    SuscribirEventoDefectos();
    SuscribirEventoCondicionesFisicas();
}

function SuscribirEventoProyecto() {
    $("#inputProyecto").kendoComboBox({
        dataTextField: "idProyecto",
        dataValueField: "Proyecto",
        suggest: true,
        delay: 10,
        filter: "contains",
        index: 3,
        change: function (e) {

        }
    })
}

function SuscribirEventoProveedor() {
    $("#inputProveedor").kendoComboBox({
        dataTextField: "idProveedor",
        dataValueField: "Proveedor",
        suggest: true,
        delay: 10,
        filter: "contains",
        index: 3,
        change: function (e) {

        }
    })
}

function SuscribirEventoRequisicion() {
    $("#inputRequisicion").kendoComboBox({
        dataTextField: "idFuente",
        dataValueField: "Fuente",
        suggest: true,
        delay: 10,
        filter: "contains",
        index: 3,
        change: function (e) {

        }
    })
}

function SuscribirEventoDefectos() {
    $("#inputDefectos").kendoComboBox({
        dataTextField: "idFuente",
        dataValueField: "Fuente",
        suggest: true,
        delay: 10,
        filter: "contains",
        index: 3,
        change: function (e) {

        }
    })
}

function SuscribirEventoCondicionesFisicas() {
    $("#inputCondicionesFisicas").kendoComboBox({
        dataTextField: "idFuente",
        dataValueField: "Fuente",
        suggest: true,
        delay: 10,
        filter: "contains",
        index: 3,
        change: function (e) {

        }
    })
}