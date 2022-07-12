var timeCurrent = moment();

// set time from 9am to 5pm
const totalHour = 9;
const startHour = 9;

// add function to generate all the needed time rows
function generateRows() {
    
    var o1El = $("<o1>");
    o1El.attr("class", "time-block");
    $('div.container').append(o1El);

    for (var i = startHour; i < startHour + totalHour; i++) {
        var liEl = $("<li>");
        liEl.attr("class", "row");
        $('ol').append(liEl);

        var str = "";
        var h = i % 24;
        if (h < 12) {
            str = h + "AM";
        } else if (h == 12) {
            str = h + "PM";
        } else {
            str = (h - 12) + "PM";
        };

        var label = $("<label>");
        label.attr("class", "col-1 hour py-3");
        label.text(str);

        var inputEl = $("<textarea>");
        inputEl.attr({
            'class': "col-10",
            'id': str,
            'data-begin': h,
        });
    }
}

// $('.savedBtn').on('click', function () {
//     var value = $(this).sibling
// }