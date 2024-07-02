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
    return this._makeRequest(`/cards/${id}/likes/`, isLiked ? "PUT" : "DELETE");
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

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3000";

const api = (token) =>
  new Api(BASE_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

export default api;
