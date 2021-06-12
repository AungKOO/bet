var date = new Date();
$("h2.date-time").html(date.toLocaleDateString("en-US")); // local broswer date
// hide the table result if there is no data
$("#table-canvas tr:first-child").hide();
// clicking delete all button
$("div.delete").click(function (e) {
  $("#table-canvas tr:first-child").hide();
  $("table.table-result").addClass("d-none");
  $("#table-canvas tr.toggle").remove();
});
// clicking delete last one button
$("div.delete-last-one").click(function (e) {
  $("#table-canvas tr.toggle:last").remove();
  if ($("#table-canvas tr.toggle").length <= 0) {
    $("#table-canvas tr:first-child").hide();
  }
});

// clicking save button
$("div.save").click(function (e) {
  console.log(`save`);
  if ($("#table-canvas tr.toggle").length <= 0) {
    alert("no data");
    return;
  }
  html2canvas(document.getElementById("div-canvas")).then(function (canvas) {
    console.log(canvas.toDataURL());
    canvas.toBlob(function (blob) {
      saveAs(blob, "Table Result.png");
    });
  });
});

function add(that) {
  // get value from input
  const addParentTr = that.parents("tr");
  const match = addParentTr.find(".input-match").val();
  const betAmount = parseInt(addParentTr.find(".input-bet-amount").val());
  const odd = addParentTr.find(".input-odd").val();
  const matchResult = addParentTr.find(".input-match-result").val();
  const winLoss = addParentTr.find(".win-loss").val();
  const homeAway = addParentTr.find(".home-away").val();
  const percentage = parseInt(addParentTr.find(".input-percentage").val());
  let total;
  let expectedGoal;
  let currentOdd;
  var left, right, result;
  // check Home or Away
  // console.log(homeAway);
  left = parseInt(matchResult.slice(0, matchResult.indexOf("-")));
  right = parseInt(matchResult.slice(matchResult.indexOf("-") + 1));
  // alert(result);
  // validation
  if (!match) {
    alert("Please enter Match input");
    return;
  }
  //  total result of each row
  if (winLoss === "W") {
    if (homeAway === "H") {
      result = left - right;
    } else if (homeAway === "A") {
      result = right - left;
    }
    console.log(`left: ${left}`);
    console.log(`right: ${right}`);
    console.log(result);
    // getting odd to indiviudal 1+70 -> 1 , 70
    expectedGoal = parseInt(odd.slice(0, odd.indexOf("+")));
    currentOdd = parseInt(odd.slice(odd.indexOf("+") + 1));
    console.log(typeof expectedGoal);
    console.log(typeof currentOdd);

    if (result > expectedGoal) {
      total = betAmount - betAmount * (percentage / 100);
    } else if (result == expectedGoal) {
      total = betAmount * (currentOdd / 100);
      total = total - total * (percentage / 100);
    }
  } else {
    // getting odd to indiviudal 1+70 -> 1 , 70
    expectedGoal = parseInt(odd.slice(0, odd.indexOf("-")));
    currentOdd = parseInt(odd.slice(odd.indexOf("-") + 1));

    if (result < expectedGoal) {
      total = -betAmount;
    } else if (result == expectedGoal) {
      total = -(betAmount * (currentOdd / 100));
    }
  }

  // add
  $("#table-canvas tr:first-child").show();
  isNaN(percentage)
    ? $("#table-canvas > tbody").append(`
         <tr class="toggle">
             <td>${match}</td>      
             <td>${betAmount}</td>
             <td>${odd}</td>
             <td>${matchResult}</td>
             <td>${homeAway}</td>
             <td>${winLoss}</td>
             <td></td>
             <td>${total}</td>
         </tr>
     `)
    : $("#table-canvas > tbody").append(`
         <tr class="toggle">
             <td>${match}</td>      
             <td>${betAmount}</td>
             <td>${odd}</td>
             <td>${matchResult}</td>
             <td>${homeAway}</td>
             <td>${winLoss}</td>
             <td>-${percentage}%</td>
             <td>${total}</td>
         </tr>
     `);

  // reset
  addParentTr.find(".input-match").val("");
  addParentTr.find(".input-bet-amount").val("");
  addParentTr.find(".input-odd").val("");
  addParentTr.find(".input-match-result").val("");
  addParentTr.find(".home-away").val("H");
  addParentTr.find(".win-loss").val("W");
  addParentTr.find(".input-percentage").val(5);
}

// press enter key to work add button
$("#table-input input").keypress(function (e) {
  var key = e.which;
  // 13 is enter key
  if (key == 13) {
    console.log("enter key");
    add($(this));
  }
});

// click add button
$("div.add").click(function (e) {
  add($(this));
});

function caculate() {
  const inputRemain = $(".input-remain").val();
  let remain = inputRemain ? parseInt(inputRemain) : 0;
  console.log(remain, typeof remain);
  let overall = 0;
  $("#table-canvas tr.toggle")
    .find("td:last")
    .each(function (index) {
      console.log(parseInt($(this).text()));
      overall += parseInt($(this).text());
    });
  $("td#overall").html(overall);
  $("td#remain").html(remain);
  $("td#total").html(overall + remain);
  $(".input-remain").val("");

  $("table.table-result").removeClass("d-none");
}

// clicking caculate button
$("div.caculate").click(function (e) {
  caculate();
});

// event listener
$("select.win-loss").change(function () {
  const selectedVal = $(this).val();
  if (selectedVal.toLowerCase() == "w") {
    $("select.input-percentage").val("5");
  } else if (selectedVal.toLowerCase() == "l") {
    $("select.input-percentage").val("");
  }
});

$("input[type=text].input-name").change(function () {
  let name = $(this).val();
  $("h2#user-name").html(name);
  $(this).val("");
});
// $("td .input-odd").keypress(function (e) {
//   // let odd = $(".input-odd").val();
//   // let goal =
//   //   odd.indexOf("-") === -1
//   //     ? parseInt(odd.slice(0, odd.indexOf("+")))
//   //     : (goal = parseInt(odd.slice(0, odd.indexOf("-"))));
//   // if (e.which === 13 || e.which == 9)
//   // {
//   //   if (goal > 15)
//   // {
//   //   alert();
//   // } 
//   // }
//   if (e.which == 13)
//   {
//     alert("Enter");
//   } else if (e.which == 9)
//   {
//     alert("Tab");
//   }
// });
