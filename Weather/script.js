

    
    const endpoint = "http://api.weatherstack.com/current?access_key=02cc53a67dfd794ba50fa581604ee49b&query=Formia";
    $.ajax({
        url: endpoint,
        
        type:"GET",
        cache: false,
        dataType: "json",
        success: function(result){
            console.log(result);
        }
    });


  
