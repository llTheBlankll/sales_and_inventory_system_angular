function refreshDatePicker() {
  $(function() {
    var elems = document.querySelectorAll('.datepicker');
    var instances = M.Datepicker.init(elems, {
      format: "mm-dd-yyyy"
    });
  })
}

function activateDropdowns() {
  $(".dropdown-trigger").dropdown();
}

function activateModals() {
  $(".modal").modal();
}

function activateSelectors() {
  $("select").formSelect();
}