var date = new Date();
$("h2.date-time").html(date.toLocaleDateString('en-US'));
$("div.delete").click(function (e) {
    $("#table-canvas tr:first-child").hide();
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
    html2canvas(document.getElementById('table-canvas')).then(function (canvas) {
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
     const percentage = addParentTr.find('.input-percentage').val();
 
     // validation
     if (!match && !betAmount && !odd && !matchResult && !percentage) {
         alert('Please enter at least one input');
         return;
     }
 
     // add 
     $("#table-canvas tr:first-child").show();
     $("#table-canvas > tbody").append(`
         <tr class="toggle">
             <td>${match}</td>      
             <td>${betAmount}</td>
             <td>${odd}</td>
             <td>${matchResult}</td>
             <td>${percentage}</td>
             <td></td>
         </tr>
     `);
 
     // make empty
     addParentTr.find('.input-match').val("");
     addParentTr.find('.input-bet-amount').val("");
     addParentTr.find('.input-odd').val("");
     addParentTr.find('.input-match-result').val("");
     addParentTr.find('.input-percentage').val("");
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