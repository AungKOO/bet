var date = new Date();
$("h2.date-time").html(date.toLocaleDateString('en-US'));
$("div.delete").click(function (e) {
    $("#table-canvas tr:first-child").hide();
    $("table.table-result").addClass("d-none");
    $("#table-canvas tr.toggle").remove();
});

$("div.delete-last-one").click(function (e) {
    $("#table-canvas tr.toggle:last").remove();
    if ($("#table-canvas tr.toggle").length <= 0) {
        $("#table-canvas tr:first-child").hide();
    }
});

$("div.save").click(function (e) {
    console.log(`save`);
    if ($("#table-canvas tr.toggle").length <= 0) {
        alert('no data');
        return;
    }
    html2canvas(document.getElementById('div-canvas')).then(function (canvas) {
        console.log(canvas.toDataURL());
        canvas.toBlob(function (blob) {
            saveAs(blob, "Table Result.png");
        });
    });
});

function add(that) {
    // get value from input
    const addParentTr = that.parents('tr');
    const match = addParentTr.find('.input-match').val();
    const betAmount = addParentTr.find('.input-bet-amount').val();
    const odd = addParentTr.find('.input-odd').val();
    const matchResult = addParentTr.find('.input-match-result').val();
    const winLoss = addParentTr.find('.win-loss').val();
    const homeAway = addParentTr.find('.home-away').val();
    const percentage = addParentTr.find('.input-percentage').val();
    let total;
    let expectedGoal;
    let currentOdd;
    let w,l;
    // validation
    if (!match) {
        alert('Please enter Match input');
        return;
    }
    //  total add logic

    if (winLoss === 'W')
    {
        // getting odd to indiviudal 1+70 -> 1 , 70
        expectedGoal = parseInt(odd.slice(0, odd.indexOf('+')));
        currentOdd = parseInt(odd.slice(odd.indexOf('+')));
        w = parseInt(matchResult.slice(0, matchResult.indexOf('-')));
        l = parseInt(matchResult.slice(matchResult.indexOf('-')));
        console.log(w, l);
        let result = w - l;
        if (result > expectedGoal)
        {
            total = betAmount;
        }
        else if (result === expectedGoal)
        {
            total = betAmount * (odd / 100);
        }

    }
    else
    {

    }

    // add 
    $("#table-canvas tr:first-child").show();
    $("#table-canvas > tbody").append(`
         <tr class="toggle">
             <td>${match}</td>      
             <td>${betAmount}</td>
             <td>${odd}</td>
             <td>${matchResult}</td>
             <td>${homeAway}</td>
             <td>${winLoss}</td>
             <td>${percentage}</td>
             <td>${total}</td>
         </tr>
     `);

    // reset
    addParentTr.find('.input-match').val("");
    addParentTr.find('.input-bet-amount').val("");
    addParentTr.find('.input-odd').val("");
    addParentTr.find('.input-match-result').val("");
    addParentTr.find('.home-away').val("H");
    addParentTr.find('.win-loss').val("W");
    addParentTr.find('.input-percentage').val(5);
}

$("#table-input input").keypress(function (e) {
    var key = e.which;
    // 13 is enter key
    if (key == 13) {
        console.log('enter key');
        add($(this));
    }
});

$("div.add").click(function (e) {
    add($(this));
});

function caculate() {
    $("table.table-result").removeClass("d-none");
}

$("div.caculate").click(function (e) {

    caculate();
});

// event listener
$("select.win-loss").change(function () {
    const selectedVal = $(this).val();
    if (selectedVal.toLowerCase() == 'w') {
        $('select.input-percentage').val('5');
    } else if (selectedVal.toLowerCase() == 'l') {
        $('select.input-percentage').val('');
    }
});