$(function() {
    $(".save").on("click", function(event) {
        console.log("neato article homie")
      var id = $(this).data("idNumber");
      var newSaved = !$(this).data("newSaved");
      var idNumber = !$(this).data("idNumber")
      console.log(idNumber)
      var data = {
          Saved: newSaved,
            idNumber: idNumber,
        };
        console.log(data);
  
      // Send the PUT request.
      $.ajax("/save/" + id, {
        type: "PUT",
        data: data
      }).then(
        function() {
          console.log("changed Saved to", newSaved);
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
});  