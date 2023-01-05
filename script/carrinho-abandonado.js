window.onload = () => {
    function getUserData() {
        let userData = {
            userName: "",
            userFirstName: "",
            userLastName: "",
            userCel: ""
        }

        let userInfoArray = document.querySelectorAll("div.ch-vspace-md p")[1].innerText.split('\n');
        

        userData.userName = userInfoArray[0];
        userData.userFirstName = userInfoArray[0].split(" ")[0];
        userData.userLastName = userInfoArray[0].split(" ")[0];
        userData.userCel = document.querySelectorAll("div.ch-vspace-md p")[1].innerText.split('\n')[1];
        userData.userEmail = document.querySelectorAll("div.ch-vspace-md p")[0].innerText;

        return userData;
    }

    console.log(getUserData());
}