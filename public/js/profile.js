


function random_id  () 
{
    var id_num = Math.random().toString(9).substr(2,3);
    var id_str = Math.random().toString(36).substr(2);
    
    return id_num + id_str;
}


function createTable (userObj){
    var tbl = '';
    tbl +='<table class="table table-hover">';

    // Create header
    tbl+='<thead>';
        tbl+='<tr>';
        tbl+='<th> </th>';
        tbl+='<th>Developer Info</th>';
        tbl+='<th>Options</th>' // Here we load the edit
        tbl+='</tr>';
    tbl+='</thead>';

    // Create body
    tbl+='<tbody>';
    // var propertyNames = Object.getOwnPropertyNames(userObj);
    var propertyNames = ["email", "linkedin", "github", "about"];
    

    for(var i = 0; i < propertyNames.length; i++){
        var row_id = random_id();
        var propertyName = propertyNames[i];
        var propertyValue = userObj[propertyName]; 
        //loop through ajax row data
        tbl +='<tr row_id="'+row_id+'">';

            tbl+='<td>' + propertyName + ':</td>';

            tbl +='<td ><div class="row_data" edit_type="click" col_name="' + propertyName + '">' + propertyValue + '</div></td>';


            //--->edit options > start
            tbl +='<td>';
                
                tbl +='<span class="btn_edit" > <a href="#" class="btn btn-link " row_id="'+row_id+'" > Edit</a> </span>';

                //only show this button if edit button is clicked
                tbl +='<span class="btn_save"> <a href="#" class="btn btn-link"  row_id="'+row_id+'"> Save</a> | </span>';
                tbl +='<span class="btn_cancel"> <a href="#" class="btn btn-link" row_id="'+row_id+'"> Cancel</a> | </span>';

            tbl +='</td>';
            //--->edit options > end
        
        tbl +='</tr>';
    }
    tbl+='</tbody>';
    //--->create table body > end

	tbl +='</table>'	
	//--->create data table > end


    //out put table data
	$(document).find('.tbl_user_data').html(tbl);

	$(document).find('.btn_save').hide();
	$(document).find('.btn_cancel').hide(); 
}


$(document).ready(function () {
    sessionStorage.setItem('loggedin', true);
    

    $("#projectSec").click(function () {
        $("#aboutSec").removeClass("is-active");
        $("#projectCreate").removeClass("is-active");
        $("#projectSec").addClass("is-active");
        $("#projects").removeClass("is-hidden");
        $("#projectCreateForm").addClass("is-hidden");
        $("#info").addClass("is-hidden");
    });

    $("#aboutSec").click(function () {
        $("#projectSec").removeClass("is-active");
        $("#projectCreate").removeClass("is-active");
        $("#aboutSec").addClass("is-active");
        $("#projects").addClass("is-hidden");
        $("#projectCreateForm").addClass("is-hidden");
        $("#info").removeClass("is-hidden");
    });

    $("#projectCreate").click(function () {
        $("#projectSec").removeClass("is-active");
        $("#projectCreateForm").removeClass("is-hidden");
        $("#aboutSec").removeClass("is-active");
        $("#projectCreate").addClass("is-active");
        $("#projects").addClass("is-hidden");
        $("#info").addClass("is-hidden");
    });


    $(document).on("click", "#linkedInEdit", function(event){
        event.preventDefault();

        var linkedInUpdate = {
            data: "In Click HTML"
        }

        $.ajax({
            url: "/api/userLinkedIn/",
            type: "PUT",
            data: linkedInUpdate,
            success: function(result){
                 // After update reload the page
                // location.reload();  
                console.log("In success ajax put")
                console.log(result);
            }

        });
 
    });


    $.ajax({
        url: "/api/userById/",
        type: "GET",
        success: function(result){
            var userObj = result[0]

            createTable(userObj);
        }
    })
 


	//--->make div editable > start
	$(document).on('click', '.row_data', function(event) 
	{
		event.preventDefault(); 

		if($(this).attr('edit_type') == 'button')
		{
			return false; 
		}

		//make div editable
		$(this).closest('div').attr('contenteditable', 'true');
		//add bg css
		$(this).addClass('bg-warning').css('padding','5px');

		$(this).focus();
	})	
	//--->make div editable > end


	//--->save single field data > start
	$(document).on('focusout', '.row_data', function(event) 
	{
		event.preventDefault();

		if($(this).attr('edit_type') == 'button')
		{
			return false; 
		}

		var row_id = $(this).closest('tr').attr('row_id'); 
		
		var row_div = $(this)				
		.removeClass('bg-warning') //add bg css
		.css('padding','')

		var col_name = row_div.attr('col_name'); 
		var col_val = row_div.html(); 

		var arr = {};
		arr[col_name] = col_val;

		//use the "arr"	object for your ajax call
		$.extend(arr, {row_id:row_id});

		//out put to show
		$('.post_msg').html( '<pre class="bg-success">'+JSON.stringify(arr, null, 2) +'</pre>');
		
	})	
	//--->save single field data > end

 
	//--->button > edit > start	
	$(document).on('click', '.btn_edit', function(event) 
	{
		event.preventDefault();
		var tbl_row = $(this).closest('tr');

		var row_id = tbl_row.attr('row_id');

		tbl_row.find('.btn_save').show();
		tbl_row.find('.btn_cancel').show();

		//hide edit button
		tbl_row.find('.btn_edit').hide(); 

		//make the whole row editable
		tbl_row.find('.row_data')
		.attr('contenteditable', 'true')
		.attr('edit_type', 'button')
		.addClass('bg-warning')
		.css('padding','3px')

		//--->add the original entry > start
		tbl_row.find('.row_data').each(function(index, val) 
		{  
			//this will help in case user decided to click on cancel button
			$(this).attr('original_entry', $(this).html());
		}); 		
		//--->add the original entry > end

	});
	//--->button > edit > end


	//--->button > cancel > start	
	$(document).on('click', '.btn_cancel', function(event) 
	{
		event.preventDefault();

		var tbl_row = $(this).closest('tr');

		var row_id = tbl_row.attr('row_id');

		//hide save and cacel buttons
		tbl_row.find('.btn_save').hide();
		tbl_row.find('.btn_cancel').hide();

		//show edit button
		tbl_row.find('.btn_edit').show();

		//make the whole row editable
		tbl_row.find('.row_data')
		.attr('edit_type', 'click')
		.removeClass('bg-warning')
		.css('padding','') 

		tbl_row.find('.row_data').each(function(index, val) 
		{   
			$(this).html( $(this).attr('original_entry') ); 
		});  
	});
	//--->button > cancel > end

	
	//--->save whole row entery > start	
	$(document).on('click', '.btn_save', function(event) 
	{
		event.preventDefault();
		var tbl_row = $(this).closest('tr');

		var row_id = tbl_row.attr('row_id');

		
		//hide save and cacel buttons
		tbl_row.find('.btn_save').hide();
		tbl_row.find('.btn_cancel').hide();

		//show edit button
		tbl_row.find('.btn_edit').show();


		//make the whole row editable
		tbl_row.find('.row_data')
		.attr('edit_type', 'click')
		.removeClass('bg-warning')
		.css('padding','') 

		//--->get row data > start
		var arr = {}; 
		tbl_row.find('.row_data').each(function(index, val) 
		{   
            var col_name = $(this).attr('col_name');  
            console.log(`Column Name ${col_name}`);
            var col_val  =  $(this).html();
            console.log(`Col Value ${col_val}`);
            arr[col_name] = col_val;
            console.log(arr);
		});
		//--->get row data > end

        //use the "arr"	object for your ajax call
        // Below adding row_id to the object
        // $.extend(arr, {row_id:row_id});

        
        $.ajax({
            url: "/api/userUpdate/",
            type: "PUT",
            data: arr,
            success: function(result){
                 // After update reload the page
                // location.reload();  
                console.log("In success ajax put")
                console.log(result);
            }

        });

		//out put to show
		$('.post_msg').html( '<pre class="bg-success">'+JSON.stringify(arr, null, 2) +'</pre>')
		 

	});
	//--->save whole row entery > end

})