$(document).ready(function() {
  var id = 1;
  var playerInfo;

  $.ajax({
    url: "/getpost/:id",
    dataType: "json",
    type: "GET",
    success: function(data) {
      playerInfo = JSON.parse(data);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log("ERROR:", jqXHR, textStatus, errorThrown);
    }
  });

  console.log("client done")
}
