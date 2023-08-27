import webApi from "./webApi/webApi";

//mainCategory
export const postMainCategory = async (data, token, onSuccess, onFailure) => {
  console.log("token", token);
  try {
    const res = await webApi.post("/post/mainCategory", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
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

export const getMainCategory = async (onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/get/mainCategory");
    let data = [];
    if (res.data.length > 0) {
      res.data.map((r, i) => {
        data.push({
          id: i + 1,
          name: r.name,
          slug: r.slug,
          description: r.description,
          main_id: r.main_id,
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

export const editMainCategory = async (data, token, onSuccess, onFailure) => {
  try {
    const result = await webApi.post(
      "/edit/mainCategory",
      {
        data: data,
        main_id: data.main_id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (result.status === 200) {
      onSuccess(result.data);
    }
  } catch (error) {
    onFailure(error);
  }
};

export const getMainCategoryForEdit = async (main_id, onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/get/mainCategory", { main_id: main_id });
    if (res.status === 200) {
      onSuccess(res.data[0]);
    }
  } catch (error) {
    onFailure(error);
  }
};

export const mainCategoryDropdown = async (onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/get/mainCategory");
    let data = [];
    if (res.data.length > 0) {
      res.data
        .filter((r) => r.status == "active")
        .map((r, i) => {
          data.push({
            // id: i + 1,
            label: r.name,
            value: r.main_id,
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

//subCategory
export const postSubCategory = async (data, token, onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/post/subCategory", data, {
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

export const getSubCategory = async (onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/get/subCategory");
    let data = [];
    if (res.data.length > 0) {
      res.data.map((r, i) => {
        data.push({
          id: i + 1,
          name: r.name,
          slug: r.slug,
          description: r.description,
          SubMain_id: r.SubMain_id,
          mainCategory: r.main_cat_name,
          mainCategory_id: r.mainCategory_id,
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

export const getSubCategoryForEdit = async (SubMain_id, onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/get/subCategory", { SubMain_id: SubMain_id });
    if (res.status === 200) {
      onSuccess(res.data[0]);
    }
  } catch (error) {
    onFailure(error);
  }
};

export const editSubCategory = async (data, token, onSuccess, onFailure) => {
  try {
    const result = await webApi.post(
      "/edit/subCategory",
      {
        data: data,
        SubMain_id: data.SubMain_id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (result.status === 200) {
      onSuccess(result.data);
    }
  } catch (error) {
    onFailure(error);
  }
};
export const subCategoryDropdown = async (onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/get/subCategory");
    let data = [];
    if (res.data.length > 0) {
      res.data
        .filter((r) => r.status == "active")
        .map((r, i) => {
          data.push({
            // id: i + 1,
            label: r.name,
            value: r.SubMain_id,
            mainCategory: r.mainCategory,
            mainCategory_id: r.mainCategory_id,
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

export const subCategoryModelDropdown = async (onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/get/subModelCategory");
    let data = [];
    if (res.data.length > 0) {
      res.data
        .filter((r) => r.status == "active")
        .map((r, i) => {
          data.push({
            // id: i + 1,
            label: r.name,
            value: r.subModel_id,
            subMainCategory: r.subMainCategory,
            subMainCategory_id: r.subMainCategory_id,
            mainCategory: r.mainCategory,
            mainCategory_id: r.mainCategory_id,
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

//sub model
export const postSubModelCategory = async (data, token, onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/post/subModelCategory", data, {
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

export const getSubModelCategory = async (onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/get/subModelCategory");
    let data = [];
    if (res.data.length > 0) {
      res.data.map((r, i) => {
        data.push({
          id: i + 1,
          name: r.name,
          slug: r.slug,
          description: r.description,
          subMainCategory: r.subMain_cat_name,
          subMainCategory_id: r.subMainCategory_id,
          mainCategory: r.main_cat_name,
          mainCategory_id: r.mainCategory_id,
          subModel_id: r.subModel_id,
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

export const getSubModelCategoryForEdit = async (SubMain_id, onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/get/subModelCategory", { subModel_id: SubMain_id });
    if (res.status === 200) {
      onSuccess(res.data[0]);
    }
  } catch (error) {
    onFailure(error);
  }
};

export const editSubModelCategory = async (data, token, onSuccess, onFailure) => {
  try {
    const result = await webApi.post(
      "/edit/subModelCategory",
      {
        data: data,
        subModel_id: data.subModel_id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (result.status === 200) {
      onSuccess(result.data);
    }
  } catch (error) {
    onFailure(error);
  }
};
