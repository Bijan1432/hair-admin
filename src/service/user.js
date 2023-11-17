import webApi from "./webApi/webApi";

export const getUserList = async (onSuccess, onFailure) => {
  try {
    const res = await webApi.get("/users");
    let data = [];
    console.log("user", res.data.data.users);
    if (res.data.data.users.length > 0) {
      res.data.data.users.map((r, i) => {
        data.push({
          id: i + 1,
          _id: r._id,
          name: r.name,
          email: r.email,
          dob: r.dob,
          gender: r.gender,
          status: r.status,
        });
      });
      onSuccess(data);
    } else {
      onFailure("No Record Found!!");
    }
  } catch (error) {
    onFailure(error);
  }
};
export const updateuser = async (id, data, onSuccess, onFailure) => {
  try {
    const res = await webApi.post(`/update-user/${id}`, {
      name: data.name,
      email: data.email,
      status: data.status,
      gender: data.gender,
      dob: data.dob,
      role: data.role,
    });
    console.log("user", res.data);
    if (res.status === 200) {
      onSuccess(res.data);
    }
  } catch (error) {
    onFailure(error);
  }
};
export const deleteuser = async (id, onSuccess, onFailure) => {
  try {
    const res = await webApi.post(`/delete-user/${id}`);
    console.log("user", res.data);
    if (res.status === 200) {
      onSuccess(res.data);
    }
  } catch (error) {
    onFailure(error);
  }
};

export const searchUser = async (name, onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/search/users", {
      name: name,
    });
    let data = [];

    if (res.data.data.users.length > 0) {
      res.data.data.users.map((r, i) => {
        data.push({
          id: i + 1,
          _id: r._id,
          name: r.name,
          email: r.email,
          dob: r.dob,
          gender: r.gender,
          status: r.status,
        });
      });
      onSuccess(data);
    } else {
      onFailure("No Record Found!!");
    }
  } catch (error) {
    onFailure(error);
  }
};

export const getUser = async (id, onSuccess, onFailure) => {
  try {
    const result = await webApi.get("/user/" + id);
    if (result.status === 200) {
      onSuccess(result.data.data);
    }
  } catch (error) {
    onFailure(error);
  }
};

export const updateImage = async(id,formData,onSuccess,onFailure)=>{
  try {
    const image = await webApi.post("/uploads/imageProfile",formData)

    if(image.status ===200){
      const res = await webApi.post(`/update-user/${id}`, {
        image:image?.data
      });
      onSuccess(res.data)
    }

  } catch (error) {
    onFailure(error)
  }
}