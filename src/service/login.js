import webApi from "./webApi/webApi";

export const registerUser = async (data, onSuccess, onFailure) => {
  console.log("datadata=>", data);
  try {
    const res = await webApi.post("/register", {
      name: data.firstName + " " + data.password,
      email: data.email,
      password: data.password,
    });
    if (res.status === 200) {
      onSuccess(res.data);
    } else {
      onFailure(res.data);
    }
  } catch (error) {
    onFailure(error.response.data);
  }
};

export const authCheck = async (token, onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/check/auth", null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status === 200) {
      onSuccess(res.data);
    } else {
      onFailure(res.data);
    }
  } catch (error) {
    onFailure(error.response.data);
  }
};
