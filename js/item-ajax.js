$( document ).ready(function() {


    var page = 1;
    var current_page = 1;
    var total_page = 0;
    var is_ajax_fire = 0;
    
    
    manageData();
    
    
    /* manage data list */
    function manageData() {
        $.ajax({
            dataType: 'json',
            url: url+'api/getData.php',
            data: {page:page}
        }).done(function(data){
            total_page = Math.ceil(data.total/10);
            current_page = page;
    
    
            $('#pagination').twbsPagination({
                totalPages: total_page,
                visiblePages: current_page,
                onPageClick: function (event, pageL) {
                    page = pageL;
                    if(is_ajax_fire != 0){
                      getPageData();
                    }
                }
            });
    
    
            manageRow(data.data);
            is_ajax_fire = 1;
    
    
        });
    
    
    }
    
    
    /* Get Page Data*/
    function getPageData() {
        $.ajax({
            dataType: 'json',
            url: url+'api/getData.php',
            data: {page:page}
        }).done(function(data){
            manageRow(data.data);
        });
    }
    
 
    /* Add new Item table row */
    function manageRow(data) {
        var	rows = '';
        $.each( data, function( key, value ) {
              rows = rows + '<tr>';
              rows = rows + '<td>'+value.name+'</td>';
              rows = rows + '<td>'+value.email+'</td>';
              rows = rows + '<td>'+value.gender+'</td>';
              rows = rows + '<td>'+value.birthdate+'</td>';
              rows = rows + '<td>'+value.country+'</td>';
              rows = rows + '<td>'+value.image+'</td>';
              rows = rows + '<td>'+value.hobbies+'</td>';
              
              rows = rows + '<td data-id="'+value.id+'">';
            rows = rows + '<button data-toggle="modal" data-target="#edit-item" class="btn btn-primary edit-item">Edit</button> ';
            rows = rows + '<button class="btn btn-danger remove-item">Delete</button>';
            rows = rows + '</td>';
              rows = rows + '</tr>';
        });
    
    
        $("tbody").html(rows);
    }
       // ,email,gender,birthdate,country,image,hobbies
    
    /* Create new Item */
    $(".crud-submit").click(function(e){
        e.preventDefault();
        var form_action = $("#create-item").find("form").attr("action");
        var name = $("#create-item").find("input[name='name']").val();
        var email = $("#create-item").find("email[name='email']").val();
        var gender = $("#create-item").find("radio[name='gender']").val();
        var birthdate = $("#create-item").find("date[name='birthdate']").val();
        var country = $("#create-item").find("input[name='country']").val();
        var image = $("#create-item").find("file[name='image']").val();

        var hobbies = $("#create-item").find("checkbox[name='hobbies[]']").val();

    
        if(name != '' && email != ''){
            $.ajax({
                dataType: 'json',
                type:'POST',
                url: url + form_action,
                data:{name:name, email:email, gender:gender, birthdate:birthdate, country:country,image:image,hobbies:hobbies}
            }).done(function(data){
                $("#create-item").find("input[name='name']").val('');
                $("#create-item").find("email[name='email']").val('');
                $("#create-item").find("radio[name='gender']").val('');
                $("#create-item").find("date[name='birthdate']").val('');
                $("#create-item").find("input[name='country']").val('');
                $("#create-item").find("file[name='image']").val('');
                $("#create-item").find("checkbox[name='hobbies[]']").val('');
                
                getPageData();
                $(".modal").modal('hide');
                toastr.success('user Created Successfully.', 'Success Alert', {timeOut: 5000});
            });
        }else{
            alert('You are missing Details..')
        }
    
    
    });
    
    
    /* Remove Item */
    $("body").on("click",".remove-item",function(){
        var id = $(this).parent("td").data('id');
        var c_obj = $(this).parents("tr");
    
    
        $.ajax({
            dataType: 'json',
            type:'POST',
            url: url + 'api/delete.php',
            data:{id:id}
        }).done(function(data){
            c_obj.remove();
            toastr.success(' Deleted Successfully.', 'Success Alert', {timeOut: 5000});
            getPageData();
        });
    
    
    });
    
    
    /* Edit Item */
    $("body").on("click",".edit-item",function(){
    
    
        var id = $(this).parent("td").data('id');
        var title = $(this).parent("td").prev("td").prev("td").text();
        var description = $(this).parent("td").prev("td").text();
    
    
        $("#edit-item").find("input[name='name']").val(name);
        $("#edit-item").find("email[name='email']").val(email);
        $("#edit-item").find("radio[name='gender']").val(gender);
        $("#edit-item").find("date[name='birthdate']").val(birthdate);
        $("#edit-item").find("input[name='country']").val(country);
        $("#edit-item").find("file[name='image']").val(image);
        $("#edit-item").find("checkbox[name='hobbies[]']").val(hobbies);
        
        $("#edit-item").find(".edit-id").val(id);
    
        
    });
    
    
    /* Updated new Item */
    $(".crud-submit-edit").click(function(e){
    
    
        e.preventDefault();
        var form_action = $("#edit-item").find("form").attr("action");

        var name= $("#edit-item").find("input[name='name']").val();
        var email= $("#edit-item").find("email[name='email']").val();
        var gender= $("#edit-item").find("radio[name='gender']").val();
        var birthdate= $("#edit-item").find("date[name='birthdate']").val();
        var country= $("#edit-item").find("input[name='country']").val();
        var image= $("#edit-item").find("file[name='image']").val();
        var hobbies= $("#edit-item").find("checkbox[name='hobbies[]']").val();
        var id = $("#edit-item").find(".edit-id").val();
    
    
        if(name != '' && email != ''){
            $.ajax({
                dataType: 'json',
                type:'POST',
                url: url + form_action,
                data:{name:name, email:email,gender:gender,birthdate:birthdate,country:country,image:image,hobbies:hobbies}
            }).done(function(data){
                getPageData();
                $(".modal").modal('hide');
                toastr.success(' Updated Successfully.', 'Success Alert', {timeOut: 5000});
            });
        }else{
            alert('You are missing details.')
        }
    
    
    });
    });
    
