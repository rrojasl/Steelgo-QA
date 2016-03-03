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

function ExistRowEmpty(rows)
{
    for (var i = 0; i < rows.length; i++) {
        if (rows[i].Estatus == 0)
            return true;
    }
    return false;
}