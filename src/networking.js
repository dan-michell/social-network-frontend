export default class Networking {
  async fetchData(sort) {
    const [value, order] = sort.split(" ");
    try {
      let response = await fetch(`http://localhost:8080/stories?value=${value}&order=${order}`);
      if (!response.ok) {
        throw new Error("Unable to fetch stories");
      }
      const json = await response.json();
      console.log(json);
      return json;
    } catch (error) {
      console.log(error);
    }
  }

  async postData(title, url) {
    try {
      const response = await fetch("http://localhost:8080/stories", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, url }),
      });
      if (!response.ok) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.log(e);
    }
  }

  async postVote(id, voteData) {
    try {
      const response = await fetch(`http://localhost:8080/stories/${id}/votes`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(voteData),
      });
      if (!response.ok) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.log(e);
    }
  }

  async deletePost(id) {
    try {
      const response = await fetch(`http://localhost:8080/stories/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!response.ok) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.log(e);
    }
  }

  async registerUser(email, password, passwordConformation) {
    try {
      const response = await fetch("http://localhost:8080/users", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, passwordConformation }),
      });
      const json = await response.json();
      return json.response;
    } catch (e) {
      console.log(e);
    }
  }

  async loginUser(email, password) {
    try {
      const response = await fetch("http://localhost:8080/sessions", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const json = await response.json();
      return json;
    } catch (e) {
      console.log(e);
    }
  }

  async logoutUser() {
    try {
      const response = await fetch("http://localhost:8080/sessions", {
        method: "DELETE",
        credentials: "include",
      });
      const json = await response.json();
      return json.response;
    } catch (e) {
      console.log(e);
    }
  }

  async getUser() {
    try {
      const response = await fetch("http://localhost:8080/sessions", {
        credentials: "include",
      });
      const user = await response.json();
      return user;
    } catch (e) {
      console.log(e);
    }
  }

  async fetchComments(id) {
    try {
      let response = await fetch(`http://localhost:8080/stories/${id}/comment`);
      if (!response.ok) {
        throw new Error("Unable to fetch comments");
      }
      const json = await response.json();
      console.log(json);
      return json;
    } catch (error) {
      console.log(error);
    }
  }

  async postComment(id, comment) {
    try {
      const response = await fetch(`http://localhost:8080/stories/${id}/comment`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment }),
      });
      if (!response.ok) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.log(e);
    }
  }
}
