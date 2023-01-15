jQuery(document).ready(function($) {
    
    $("#fullit").click(function() { 
        $("#hidetext,#hidetext1").toggleClass("d-none");
        $("#sticky-sidebar").toggleClass("width-1");
        
    }); 
    $("#selall").click(function(){
        $("#selme,#selme").prop('checked', $(this).prop('checked'));
    });
    
    var checkboxes = $('#selme,#selme,#selall'),
    submitButt = $('#allselbutt');

    checkboxes.click(function() {
    submitButt.attr("disabled", !checkboxes.is(":checked"));
    });

    var alterClass = function() {
        var ww = document.body.clientWidth;
            if (ww <= 990 && ww >= 550) {
                //console.log("it me <=999 :: "+ww )
                $("#hidetext,#hidetext1").removeClass("d-none");
                $("#sticky-sidebar").removeClass("width-1");
            } else if (ww <= 550) { 
              //console.log("it me <=550 :: "+ww)
                $("#hidetext,#hidetext1").addClass("d-none");
                $("#sticky-sidebar").removeClass("width-1");
            }else if (ww > 990){
               // console.log("it me >990 :: "+ww)
                $("#hidetext,#hidetext1").removeClass("d-none");
                $("#sticky-sidebar").removeClass("width-1");
            }
        };

        $(window).resize(function(){
            alterClass();
        });
        alterClass();

});