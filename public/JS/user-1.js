jQuery(document).ready(function($) {

    $('#navscreen').click(function(){ 
        $("#mainmobile").toggleClass("d-none");
        $("#navbodyman120").toggleClass("d-none");
    });
    
    // $("#stylingimgman,#stylingimgman").mouseenter(function(){
    //         $(this).removeClass("mybaseremove");
    //         $('#metobroimg,#metobroimg').addClass("mybtn-2");
    //     });
    //     $("#stylingimgman,#stylingimgman").mouseleave(function(){
    //         $(this).addClass("mybaseremove");
    //         $('#metobroimg,#metobroimg').removeClass("mybtn-2");
    //     });

    
    var alterClass = function() {
        var ww = document.body.clientWidth;
            if (ww <= 990 && ww >= 550) {
                //console.log("it me <=990 :: "+ww )
                $("#catblock").removeClass("col-4");
                $("#postbloack").removeClass("col-8");
                $("#homebloack").removeClass("row");
                $("#stylingimgman,#stylingimgman").removeClass("card");
                $("#stylingimgman,#stylingimgman").addClass("cardmobile");
                //mobile remover
                $("#metextman,#metextman").removeClass("whitetext");
                $("#posttexthide,#posttexthide,#bodyna").show();
                $("#navcolorby").addClass("sidenav");
                $("#navcolorby").removeClass("sidenavmobile");
                $("#navscreen").addClass("nav-iconbro");
                $("#navscreen").removeClass("nav-iconbromobile");
                $("#mainmobile").addClass("main");
                $("#mainmobile").removeClass("mainmobile");
                //Function 
                $('#metobroimg,#metobroimg').removeClass("mybtn-2")
                $("#stylingimgman,#stylingimgman").addClass("mybaseremove");
                $("#stylingimgman,#stylingimgman").mouseenter(function(){
                    $(this).removeClass("mybaseremove");
                    $('#metobroimg,#metobroimg').addClass("mybtn-2");
                });
                $("#stylingimgman,#stylingimgman").mouseleave(function(){
                    $(this).addClass("mybaseremove");
                    $('#metobroimg,#metobroimg').removeClass("mybtn-2");
                });
            } else if (ww <= 550) { 
                //console.log("it me <=550 :: "+ww)
                $("#posttexthide,#posttexthide,#bodyna").hide();
                $("#navcolorby").removeClass("sidenav");
                $("#navcolorby").addClass("sidenavmobile");
                $("#navscreen").removeClass("nav-iconbro");
                $("#navscreen").addClass("nav-iconbromobile");
                $("#mainmobile").removeClass("main");
                $("#mainmobile").addClass("mainmobile");
                $("#metextman,#metextman").addClass("whitetext");
                //TABLATE 
                $("#catblock").removeClass("col-4");
                $("#postbloack").removeClass("col-8");
                $("#homebloack").removeClass("row");
                $("#stylingimgman,#stylingimgman").removeClass("card");
                $("#stylingimgman,#stylingimgman").addClass("cardmobile");
                //Function
                $('#metobroimg,#metobroimg').addClass("mybtn-2");
                $("#stylingimgman,#stylingimgman").removeClass("mybaseremove");
                $("#stylingimgman,#stylingimgman").mouseenter(function(){
                    //$("#stylingimgman,#stylingimgman").addClass("mybtn-2");
                    $("#stylingimgman,#stylingimgman").removeClass("mybaseremove");
                });
                $("#stylingimgman,#stylingimgman").mouseleave(function(){
                    //$("#stylingimgman,#stylingimgman").addClass("mybtn-2");
                    $("#stylingimgman,#stylingimgman").removeClass("mybaseremove");
                });
            }else if (ww > 990){
                //console.log("it me >990 :: "+ww)
                $("#metextman,#metextman").removeClass("whitetext");
                $("#stylingimgman,#stylingimgman").addClass("card");
                $("#stylingimgman,#stylingimgman").removeClass("cardmobile");
                $("#navscreen").addClass("nav-iconbro");
                $("#mainmobile").addClass("main");
                $("#navscreen").removeClass("nav-iconbromobile");
                $("#navcolorby").addClass("sidenav");
                $("#navcolorby").removeClass("sidenavmobile");
                $("#catblock").addClass("col-4");
                $("#postbloack").addClass("col-8");
                $("#homebloack").addClass("row");
                $("#posttexthide,#posttexthide,#bodyna").show();
                //Function 
                $('#metobroimg,#metobroimg').removeClass("mybtn-2")
                $("#stylingimgman,#stylingimgman").addClass("mybaseremove");
                $("#stylingimgman,#stylingimgman").mouseenter(function(){
                    $(this).removeClass("mybaseremove");
                    $('#metobroimg,#metobroimg').addClass("mybtn-2");
                });
                $("#stylingimgman,#stylingimgman").mouseleave(function(){
                    $(this).addClass("mybaseremove");
                    $('#metobroimg,#metobroimg').removeClass("mybtn-2");
                });
            }
        };

        $(window).resize(function(){
            alterClass();
        });
        alterClass();
    
    // $(document).ready(function() {
    //     function checkWidth() {
    //         var windowSize = $(window).width();
    
    //         if (windowSize <= 990 && windowSize >= 550) {
    //             console.log("screen width is less than 990 : "+windowSize);
    //         }
    //         else if (windowSize <= 550) {
    //             console.log("screen width is less than 550 : "+windowSize);
    //         }
    //         else if (windowSize > 990) {
    //             console.log("screen width is great than 990 : "+windowSize);
    //         }
    //     }
    
    //     checkWidth();
    //     $(window).resize(checkWidth);
    // });

  });  