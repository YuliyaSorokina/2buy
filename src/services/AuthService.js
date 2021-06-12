import FetchService from "./FetchService";

class AuthService {

    loginUser(credentials) {
        return FetchService.handleFetch('/auth/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(credentials)
        })
            .then(data => {
                    localStorage.setItem("token", data.value);
                    //window.location.href = "/";
                }
            );
    }

    getCurrentUser = async () => {
        return await FetchService.handleFetch('/auth/user');
    }

    logoutUser() {
        return FetchService.handleFetch('/auth/logout', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(localStorage.getItem("token"))
        })
            .then(result => {
                    localStorage.removeItem("token");
                }
            )
            .catch(e => {
                localStorage.removeItem("token");
            });
    }
}

export default new AuthService();