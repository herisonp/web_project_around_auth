class Api {
  constructor(baseUrl, options) {
    this._baseUrl = baseUrl;
    this._options = options;
  }

  _makeRequest(endpoint, method = "GET", body = null) {
    const options = {
      method,
      headers: { ...this._options.headers },
    };

    if (body) {
      options.headers["Content-Type"] = "application/json";
      options.body = JSON.stringify(body);
    }

    return fetch(`${this._baseUrl}${endpoint}`, options).then((res) => {
      if (!res.ok) Promise.reject(`Error: ${res.status}`);
      return res.json();
    });
  }

  getInitialCards() {
    return this._makeRequest("/cards");
  }

  postCard(card) {
    return this._makeRequest("/cards", "POST", card);
  }

  deleteCardById(id) {
    return this._makeRequest(`/cards/${id}`, "DELETE");
  }

  changeLikeCardStatus(id, isLiked) {
    return this._makeRequest(`/cards/likes/${id}`, isLiked ? "PUT" : "DELETE");
  }

  getUserInfo() {
    return this._makeRequest("/users/me");
  }

  editUser(data) {
    return this._makeRequest("/users/me", "PATCH", data);
  }

  editAvatar(avatar) {
    return this._makeRequest("/users/me/avatar", "PATCH", avatar);
  }
}

const api = new Api("https://around.nomoreparties.co/v1/web_ptbr_09", {
  headers: {
    authorization: "1146a04f-7181-45eb-9b96-3a5b76f79b15",
    "Content-Type": "application/json",
  },
});

export default api;
