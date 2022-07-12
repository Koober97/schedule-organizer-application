var timeCurrent = moment();

// set time from 9am to 5pm
const totalHour = 9;
const startHour = 9;


function changeClass(element, target) {
    var classList = ['past', 'present', 'future'];
    var idx = classList.indexOf(target);

    for (var i = 0; i < classList.length; i++) {
        if (i === idx) {
            element.toggleClass(classList[i], true);
        } else {
            element.toggleClass(classList[i], false);
        }
    }
};


// add function to generate all the needed time rows
function generateRows() {
    
    var o1El = $("<o1>");
    o1El.attr("class", "time-block");
    $('div.container').append(o1El);

    // individual rows
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

        label.attr("for", inputEl.attr('id'));
        inputEl.val(localStorage.getItem(inputEl.attr('id')));

        var saveBtn = $('<button>');
        saveBtn.attr("class", "col-1 saveBtn");
        saveBtn.html("<i class='fa fa-save'></i>")

        liEl.append(label).append(inputEl).append(saveBtn);

        saveBtn.click(function(e) {callback(e)});
    }
};

// change color function
function setTime() {

    dateToday = timeNow.format('dddd, MMMMM DD');
    $('#currentDay').text(dateToday);
}

// $('.savedBtn').on('click', function () {
//     var value = $(this).sibling
// }