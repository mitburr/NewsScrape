$(function() {
    $(".save").on("click", function(event) {
        console.log("neato article homie")
      var id = $(this).data("idNumber");
      var newSaved = !$(this).data("newSaved");
      console.log(id)
      var data = {
          Saved: newSaved,
            idNumber: id,
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
$(function(){
    $("#scrape").on("click", function(event){
        console.log("scraping")
        $.ajax("/scrape",{
            type:"GET",
        }).then(
            function(){
                console.log("scraped");
                location.reload();
            }
        )
    })
})