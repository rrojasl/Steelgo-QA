function getGridFilterableMaftec(val) {
    return {
        mode: "menu, row",
        extra: false,
        operators: {
            string: {
                startswith: _dictionary.KendoGridFilterable0001[$("#language").data("kendoDropDownList").value()],
                eq: _dictionary.KendoGridFilterable0002[$("#language").data("kendoDropDownList").value()],
                neq: _dictionary.KendoGridFilterable0003[$("#language").data("kendoDropDownList").value()],
            }
        },
        cell: {
            showOperators: false,
            operator: "contains"
        }
    }
}

function getGridFilterableCellMaftec() {
    return {
        cell: {
            operator: "contains",
            template: function (args) {
                args.css("width", "95%").addClass("general-input").keydown(function (e) {
                    setTimeout(function () {
                        $(e.target).trigger("change");
                    });
                });
            },
            showOperators: false
        }
    }
}

function getGridFilterableCellNumberMaftec() {
    return {
        cell: {
            operator: "eq",
            template: function (args) {
                //$(args).prop('type', 'number');
                args.css("width", "95%").addClass("general-input").keydown(function (e) {
                    setTimeout(function () {
                        $(e.target).trigger("change");
                    });
                });
            },
            showOperators: false
        }
    }
}

function getGridFilterableCellMaftecpopUp() {
    return {
        cell: {
            operator: "contains",
            template: function (args) {
                args.css("width", "95%").addClass("general-input").keydown(function (e) {
                    setTimeout(function () {
                        $(e.target).trigger("change");
                    });
                });
            },
            showOperators: false
        }
    }
}

function getKendoGridFilterableDateMaftec() {
    return {
        cell: {
            template: function (args) {
                args.kendoDatePicker({
                    format: "dd/MM/yyyy"
                });
            },
            showOperators: false
        }
    }
}