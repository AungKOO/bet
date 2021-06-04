var date = new Date();
$("h2.date-time").html(date.toLocaleDateString('en-US'));
$("div.delete").click(function (e) { 
    $("table tr.toggle").empty();
});