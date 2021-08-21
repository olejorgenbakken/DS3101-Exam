// A greeting animation if a user is visiting the site for the first time this session.
if (JSON.parse(sessionStorage.getItem("previousVisit")) == false || JSON.parse(sessionStorage.getItem("previousVisit")) == null) {
    $(".banner").show;

    $(".police-car").animate({
        left: "70%",
    }, 5000, "swing", function () {
        $("#police3").html("<h3>Bye, bye, Sandy</h3>");
        $("#police3").animate({
            top: "100",
        });
        $(this).animate({
            left: "100%",
            top: "-200",
        }, 4000)
    });

    $("#sun").animate({
        top: 100,
        left: "40%",
        width: 60,
        height: 60,
    }, 8000, "swing", function () {
        $(".banner").html("<h2>Kos deg på jobb, sjef</h2><h3>Håper dere tok Grease referansen</h3>");
        $(".banner").animate({
            height: 0,
        }, 6000, "swing", function () {
            $(".banner").hide();
            sessionStorage.setItem("previousVisit", true);
        });
    });
} else {
    $(".banner").hide();
}