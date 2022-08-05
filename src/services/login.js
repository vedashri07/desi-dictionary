
export const login = async (res) => {


    try {
        const response = await fetch('https://desidictionary.app/user/login', {
            mode: 'cors',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
    
            },
            body: JSON.stringify({
                name: res.profileObj.name,
                email: res.profileObj.email,
                google_id: res.profileObj.googleId,
                picture: res.profileObj.imageUrl,
                email_verified: "True"
            }),
    
    
    
        });
        const data = await response.json();
        return data;
    }
    catch (e) {
        console.log(e)
    }


 
}



