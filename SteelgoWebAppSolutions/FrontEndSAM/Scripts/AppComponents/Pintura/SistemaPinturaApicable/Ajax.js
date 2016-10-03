function AjaxCargarColor() {
    var c = [
      { ColorID: 0, Color: "" },
      { ColorID: 1, Color: "Aluminio" },
      { ColorID: 2, Color: "Amarillo" },
      { ColorID: 3, Color: "Azul" },
    ];

    $("#inputColor").data("kendoComboBox").dataSource.data([]);
    $("#inputColor").data("kendoComboBox").dataSource.data(c);
}