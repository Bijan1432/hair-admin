import webApi from "./webApi/webApi";

//content post
export const editContent = async (type, data, onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/edit-content", {
      type: type,
      title: data.title,
      content: data.content,
    });
    if (res.status === 200) {
      onSuccess(res.data);
    } else {
      console.log("err");
      onFailure(res.data);
    }
  } catch (error) {
    onFailure(error.response.data);
  }
};

//content get
export const getContent = async (type, onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/get-content", {
      type: type,
    });
    if (res.status === 200) {
      onSuccess(res.data);
    } else {
      console.log("err");
      onFailure(res.data);
    }
  } catch (error) {
    onFailure(error.response.data);
  }
};
