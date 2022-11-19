export function fetchUsers() {
  return fetch("/api/v1/session", {
    method: "GET",
  })
    .catch((err) => Promise.reject({ error: "network-error" }))
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => Promise.reject(err));
      }
      return response.json();
    });
}

export function fetchUser() {
  return fetch("/api/v1/session/:name", {
    method: "GET",
  })
    .catch((err) => Promise.reject({ error: "network-error" }))
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => Promise.reject(err));
      }
      return response.json();
    });
}

export function fetchLogin(username) {
  return fetch("/api/v1/session", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ username }),
  })
    .catch((err) => Promise.reject({ error: "network-error" }))
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => Promise.reject(err));
      }
      return response.json();
    });
}

export function fetchLogout() {
  return fetch("/api/v1/session/", {
    method: "DELETE",
  }).catch((err) => Promise.reject({ error: "network-error" }));
}

export function fetchGetMessage() {
  return fetch("/api/v1/message/", {
    method: "GET",
  })
    .catch((err) => Promise.reject({ error: "network-error" }))
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => Promise.reject(err));
      }
      return response.json();
    });
}

export function fetchPostMessage(message) {
  return fetch("/api/v1/message", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ message }),
  })
    .catch((err) => Promise.reject({ error: "network-error" }))
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => Promise.reject(err));
      }
      return response.json();
    });
}
