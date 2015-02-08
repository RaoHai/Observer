$(function () {
    console.log(">>>", $("[data-confirm]"));
    $("[data-confirm]").click(function (e) {
        if (!confirm($(this).data("confirm-message") || "are you sure ? ")) {
            e.preventDefault();
        }
    });
}());