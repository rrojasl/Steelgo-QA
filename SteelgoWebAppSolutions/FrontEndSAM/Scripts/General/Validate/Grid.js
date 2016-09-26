﻿function getGridFilterableMaftec(val) {
    return {
        mode: "menu, row",
        extra: true,
        operators: {
            string: {
                startswith: _dictionary.KendoGridFilterable0001[$("#language").data("kendoDropDownList").value()],
                eq: _dictionary.KendoGridFilterable0002[$("#language").data("kendoDropDownList").value()],
                neq: _dictionary.KendoGridFilterable0003[$("#language").data("kendoDropDownList").value()],
            },
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
        extra: true, 
        cell: {
            operator: "gte,lte",
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

function RowEmpty($grid) {
    $("tr", $grid).each(function (index) {
        var $row = $(this);
        $row.css("background-color", "");
        $("td", $(this)).each(function (index) {
            if ($(this).text() == "") {
                $row.css("background-color", "#ffcccc");
            }
        });
    });
}

function ExistRowEmpty(rows) {
    for (var i = 0; i < rows.length; i++) {
        if (rows[i].Estatus == 0)
            return true;
    }
    return false;
}