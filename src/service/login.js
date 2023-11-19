import webApi from "./webApi/webApi";

export const registerUser = async (data,formData, onSuccess, onFailure) => {
  console.log("datadata=>", data);
  try {
    const image = await webApi.post("/uploads/imageProfile",formData)
    // const imageHair = await webApi.post("/uploads/imageHair",formData2)

    let res=''
    if(image.status === 200){
       res = await webApi.post("/register", {
        name: data.firstName + " " + data.lastName,
        email: data.email,
        password: data.password,
        image:image?.data,
        // hairImage:imageHair?.data
      });
    }else{
      res = await webApi.post("/register", {
        name: data.firstName + " " + data.lastName,
        email: data.email,
        password: data.password,
        // image:image?.data
      });
    }
   
    if (res.status === 200) {
      onSuccess(res.data);
    } else {
      onFailure(res.data);
    }
  } catch (error) {
    onFailure(error.response);
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
    onFailure(error.response);
  }
};
