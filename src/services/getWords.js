
export const getWords = async () => {

    const token = localStorage.getItem('token');
    const userid = localStorage.getItem('userid');
    console.log(localStorage, "admin")
    const requestOptions = {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
            "token": token,
            "userid": userid,
            "userType": "1"
        })
    };
    try {
        const response = await fetch('https://desidictionary.app/adminDashboard/', requestOptions);
        console.log(requestOptions.body, "body")
        const data = await response.json();
        return data;
    }
    catch (e) {
        console.log(e)
    }

}