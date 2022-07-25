$(function () {
  //write your code here

  // code for creating the tables for car1 and car2

  let table = $("<table></table>").addClass("table table-style");
  let tbody = $("<tbody></tbody>");
  $("#firstCarRaceInfo").append(table);
  table.append(tbody);
  let table1 = $("<table></table>").addClass("table table-style");
  let tbody1 = $("<tbody></tbody>");
  $("#secondCarRaceInfo").append(table1);
  table1.append(tbody1);

  // code for creating the table with the results from previous race

  let car1place = localStorage.getItem("Car1place");
  let car1second = localStorage.getItem("Car1seconds");
  let car2place = localStorage.getItem("Car2place");
  let car2second = localStorage.getItem("Car2seconds");
  if (
    localStorage.getItem("Car1place") === null &&
    localStorage.getItem("Car2place") === null
  ) {
    $("#previousResults").css({ display: "none" });
  } else {
    let table2 = $("<table></table>")
      .addClass("table table-style")
      .css({ marginTop: "56px" });
    let tbody2 = $("<tbody></tbody>");
    $("#previousResults").append(table2).css({ display: "block" });
    table2.append(tbody2);
    let tr = $("<tr></tr>");
    $(tr)
      .html(`<td><span class="car-1 font-weight-bold">Car 1</span> finished in: <b class="car-1">${car1place}</b> place with a 
  time of: 
     <b class="car-1">${car1second}</b> milliseconds!</td>`);
    tbody2.append(tr);

    let tr1 = $("<tr></tr>");
    $(tr1)
      .html(`<td><span class="car-2 font-weight-bold">Car 2</span> finished in: <b class="car-2">${car2place}</b> place with a 
  time of: 
       <b class="car-2">${car2second}</b> milliseconds!</td>`);
    tbody2.append(tr1);
  }

  // click event on race button

  $("#raceBtn").on("click", () => {
    let carWidth = $(".car1").width();
    let raceTruckWidth = $(window).width() - carWidth;
    let race1 = Math.floor(Math.random() * 3000 + 1);
    let race2 = Math.floor(Math.random() * 3000 + 1);
    let place = "first";
    let isCompleted = false;

    function check() {
      if (isCompleted == false) {
        isCompleted = true;
      } else {
        place = "second";
      }
    }
    function createTable() {
      let tr = $("<tr></tr>");
      $(tr).html(`<td>Finished in: <b class="car-1">${place}</b> place with a 
  time of: 
     <b class="car-1">${race1}</b> milliseconds!</td>`);
      tbody.append(tr);
    }
    function createTable1() {
      let tr1 = $("<tr></tr>");
      $(tr1).html(`<td>Finished in: <b class="car-2">${place}</b> place with a 
  time of: 
       <b class="car-2">${race2}</b> milliseconds!</td>`);
      tbody1.append(tr1);
    }
    function disabled() {
      $("#raceBtn").attr("disabled", "true").addClass("disabledBtn");
      $("#startOver").attr("disabled", "true").addClass("disabledBtn");
    }

    let largerNumber;
    if (race1 > race2) {
      largerNumber = parseInt(race1 - race2);
    } else {
      largerNumber = parseInt(race2 - race1);
    }

    function doCount() {
      let counter = 4;
      setInterval(function () {
        counter--;

        if (counter > 0) {
          $("#count").css({ display: "block" });
          $("#coun").html(counter).css({ display: "block" });
          $(".car2").stop();
          $(".car1").stop();
        } else if (counter === 0) {
          $("#count").css({ display: "none" });
          $("#coun").css({ display: "none" });
          clearInterval(counter);
          disabled();
          $(".car2")
            .animate(
              {
                left: raceTruckWidth,
              },
              race1,
              function () {
                check();
                createTable();
                $("#count").fadeIn("3000");
                $("#flag").fadeIn("3000");
                localStorage.setItem("Car1place", place);
                localStorage.setItem("Car1seconds", race1);
              }
            )
            .delay(largerNumber)
            .queue(function () {
              $("#startOver").removeAttr("disabled").removeClass("disabledBtn");
            });

          $(".car1")
            .animate(
              {
                left: raceTruckWidth,
              },
              race2,
              function () {
                check();
                createTable1();
                $("#count").fadeIn("3000");
                $("#flag").fadeIn("3000");
                localStorage.setItem("Car2place", place);
                localStorage.setItem("Car2seconds", race2);
              }
            )
            .delay(largerNumber)
            .queue(function () {
              $("#startOver").removeAttr("disabled").removeClass("disabledBtn");
            });
          console.log(largerNumber);
        }
      }, 1000);
    }

    doCount();
  });

  // click event on start over button

  $("#startOver").on("click", () => {
    $(".car1").css({
      left: "0px",
    });

    $(".car2").css({
      left: "0px",
    });
    $("#count").css({ display: "none" });
    $("#flag").css({ display: "none" });
    $("#raceBtn").removeAttr("disabled").removeClass("disabledBtn");
  });
});
