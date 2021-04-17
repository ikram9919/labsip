$(document).ready(function () {
    //instance d'authentification 
    const backendApiNoAuth = axios.create({
        baseURL: "https://rs-appbackend.herokuapp.com/auth",
        timeout: 80000,
        headers: { "Content-Type": "application/json" },
    });

    //s'authentifier avec le Chef Labo LTI à changer (hejjaji pour labsip)
    backendApiNoAuth.post(`/login`, { email: 'Abdelowahed.hajjaji@gmail.com', password: 'Abdelowahed.hajjaji' })
        .then(function (response) {
            const user = response.data
            localStorage.setItem("user", JSON.stringify(response.data))

            //instance de l'api apres l'authentification
            const backendApi = axios.create({
                baseURL: "https://rs-appbackend.herokuapp.com/api",
                timeout: 80000,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + user.token,
                },
            });

            //recuperation des utilisateurs du laboratoire
            backendApi.get(`/users/${user.laboratoriesHeaded[0]._id}`)
                .then(function (response) {
                    var images = $('#images');
                    var op = "";
                    response.data.forEach((user)=>{
                        
                        //s'il possede une image de profile
                        if(user.profilePicture!=null || user.profilePicture!=undefined){
                            op+= `<img src="https://rs-appbackend.herokuapp.com/pictures/${user.profilePicture}" style="height:64px;width:64px"/>`
                        }else{
                            op+= `<img src="https://rs-appbackend.herokuapp.com/api/?name=${user.firstName}+${user.lastName}" style="height:64px;width:64px"/>`
                        }
                    })
                    images.html(op)
                    
                }).catch(function (error) {
                    console.log(error)
                })


        })
        .catch(function (error) {
            console.log(error)
        })
})