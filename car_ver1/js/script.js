$( document ).ready(function() {
	$.getJSON("/ajax.php?action=users", function(data) {
		 $.each(data, function(key, val) {
  			
  			 		$("#result").append("<tr><td>" +
			        val.email +  "</td><td>" +
			        val.firstname +  "</td><td>" +
			        val.lastname + "</td><td>" +
			        val.message + "</td><td>" +
			         "<button type=\"button\" class=\"btn btn-primary btn-lg\" data-toggle=\"modal\" data-target=\"#myModal2\"> Delete</button>"
			          + "</td><td>" +
			         "<button type=\"button\" class=\"btn btn-primary btn-lg\" data-toggle=\"modal\" data-target=\"#myModal\"> Edit</button>"
			         + "</td></tr>");
    		
  		});
  	});


$.getJSON("/ajax.php?action=cars", function(data) {
		 $.each(data, function(key, val) {
  			
  			 		$("#result_car").append("<tr><td>" +
			        val.model +  "</td><td>" +
			        val.eng_type +  "</td><td>" +
			        val.gear_type + "</td><td>" +
			        val.dayprice + "</td><td>" +
			        val.capacity + "</td><td>" +
			        "<button type=\"button\" class=\"btn btn-primary btn-lg\" data-toggle=\"modal\" data-target=\"#myModal3\"> Edit</button>"
			         + "</td><td>" +
			         "<button type=\"button\" class=\"btn btn-primary btn-lg\" data-toggle=\"modal\" data-target=\"#myModal4\"> DELETE</button>"
			         + "</td></tr>");

			            		
  		});
  	});



$.getJSON("/ajax.php?action=order", function(data) {
		 $.each(data, function(key, val) {
  			
  			 		$("#result_car").append("<tr><td>" +
			        val.id +  "</td><td>" +
			        val.start + "</td><td>" +
			        val.end + "</td><td>" +
			        val.car + "</td><td>" +
			        val.discount + "</td><td>" +
			        val.price + "</td><td>" +
			        "<button type=\"button\" class=\"btn btn-primary btn-lg\" data-toggle=\"modal\" data-target=\"#myModal5\"> Edit</button>"
			         + "</td><td>" +
			         "<button type=\"button\" class=\"btn btn-primary btn-lg\" data-toggle=\"modal\" data-target=\"#myModal6\"> DELETE</button>"
			         + "</td></tr>");
			            		
  		});
  	});




					function search_clients() {

					 fields = $('#client-search').serializeArray();

					 $.ajax({
					  type: "POST",
					  url: "ajax.php?action=client_search",
					  data: fields,	
					  success: function(result) {
					  $("#result").empty();
					  $("#result").append("<tr><td class=\"table-back\">Email</td><td class=\"table-back\">Name</td><td class=\"table-back\">LastName</td>"
                       + "<td class=\"table-back\">Message</td><td class=\"table-back\">Delete</td><td class=\"table-back\">Edit</td></tr>");

					  $.each(result, function(key, val) {
					       $("#result").append("<tr><td>" +
					           val.email +  "</td><td>" +
					           val.firstname +  "</td><td>" +
					           val.lastname + "</td><td>" +
					           val.message + "</td><td>" +
					            "<button type=\"button\" class=\"btn btn-primary btn-lg\" data-toggle=\"modal\" data-target=\"#myModal2\"> Delete</button>"
					             + "</td><td>" +
					            "<button type=\"button\" class=\"btn btn-primary btn-lg\" data-toggle=\"modal\" data-target=\"#myModal\"> Edit</button>"
					            + "</td></tr>");
					  });
					  },
					 			 dataType: "json"
					 });
					}




			$("#result").addClass("table table-bordered form-style-9");
			$("#result_car").addClass("table table-bordered form-style-9");
			$("#result_order").addClass("table table-bordered form-style-9");

			$('#client-search').keyup(search_clients);
			$('#client-search').change(search_clients);

function user_forms () {
		var fields = $('#user_form').serializeArray();
		$.ajax({
			type: "POST",
			url: "ajax.php?action=addusers",
			data: fields,
			success: function(result) {
				$("#results" ).append(result);
			},
			dataType: "html"
		});
}

});





