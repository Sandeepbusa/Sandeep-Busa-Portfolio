const menuButton =
    document.querySelector(".menu-button");


const caseMenu =
    document.querySelector(".case-menu");


menuButton.addEventListener(

    "click",

    function () {

        if (

            caseMenu.style.display === "flex"

        ) {

            caseMenu.style.display = "none";

        } else {

            caseMenu.style.display = "flex";

            caseMenu.style.flexDirection = "column";

            caseMenu.style.position = "absolute";

            caseMenu.style.top = "80px";

            caseMenu.style.right = "20px";

            caseMenu.style.padding = "25px";

            caseMenu.style.background = "#242424";

            caseMenu.style.borderRadius = "15px";

        }

    }

);