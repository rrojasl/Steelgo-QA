function editarPQR(e) {
    LLenaControles(e);
    VentanaModal();
};




function EliminarPQR(e) {
    if (confirm(_dictionary.lblConfirmaElimanarPQR[$("#language").data("kendoDropDownList").value()])) {
        EliminaPQRAjax(e);
    }
    else {
        loadingStop();
    }
};




$("#AAgregarPQR").click(function () {
    LimpiaControles();
    VentanaModal();
});


