import webApi from "./webApi/webApi";

export const postProduct = async (
  image,
  data,
  token,
  specification,
  faq,
  description,
  onSuccess,
  onFailure
) => {
  try {
    await webApi.post("/uploads/image", image).then(async (result) => {
      console.log(result, "resultreult");
      const res = await webApi.post(
        "/post/product",
        {
          data: data,
          specification: specification,
          faq: faq,
          image: result.data,
          description: description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        onSuccess(res.data);
      } else {
        onFailure(res.data);
      }
    });
  } catch (error) {
    onFailure(error.response.data);
  }
};

export const uploadImages = async (image, onSuccess, onFailure) => {
  try {
    const result = await webApi.post("/uploads/image", image);
    console.log("result=>>image", result);
    if (result.status === 200) {
      onSuccess(result.data);
    }
  } catch (error) {
    console.log("result=>>image/err", error);
    onFailure(error);
  }
};

export const getProducts = async (slug, onSuccess, onFailure) => {
  try {
    const result = await webApi.get("/get-all-hair", { slug: slug });
    // console.log("r=>>2",result?.data?.data?.hair);
    const hair = result?.data?.data?.hair;
    if (result.status === 200) {
      let data = [];
      hair.map((r, i) => {
        data.push({
          id: i + 1,
          name: r.name,
          images: r.images,
          type: r.type,
          mode: r.mode,
          bangs: r.bangs,
          status: r.status,
          product_id: r._id,
        });
      });
      onSuccess(data);
    }
  } catch (error) {
    onFailure(error);
  }
};

export const searchHair = async (name, onSuccess, onFailure) => {
  try {
    const result = await webApi.post("/search-hair", {
      name: name,
    });
    const hair = result?.data?.data?.hair;
    if (result.status === 200) {
      let data = [];
      hair.map((r, i) => {
        data.push({
          id: i + 1,
          name: r.name,
          images: r.images,
          status: r.status,
          product_id: r._id,
        });
      });
      console.log("data=>", data);
      onSuccess(data);
    }
  } catch (error) {
    onFailure(error);
  }
};
export const getProductsEdit = async (product_id, onSuccess, onFailure) => {
  try {
    const result = await webApi.post("get/product/all", {
      product_id: product_id,
    });

    if (result.status === 200) {
      onSuccess(result.data[0]);
    }
  } catch (error) {
    onFailure(error);
  }
};

export const getFaq = async (product_id, onSuccess, onFailure) => {
  try {
    const result = await webApi.post("get/faq", {
      product_id: product_id,
    });

    if (result.status === 200) {
      let data = [];
      result.data.map((r, i) => {
        data.push({
          faqTitle: r.title,
          faqDescription: r.description,
        });
      });
      onSuccess(data);
    }
  } catch (error) {
    onFailure(error);
  }
};

export const editProduct = async (
  image,
  data,
  token,
  specification,
  faq,
  description,
  onSuccess,
  onFailure
) => {
  try {
    await webApi.post("/uploads/image", image).then(async (result) => {
      const res = await webApi.post(
        "edit/product",
        {
          data: data,
          specification: specification,
          faq: faq,
          image: result.data,
          description: description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        onSuccess(res.data);
      } else {
        onFailure(res.data);
      }
    });
  } catch (error) {
    onFailure(error);
  }
};

export const editProductWithOutImage = async (
  data,
  token,
  specification,
  faq,
  description,
  onSuccess,
  onFailure
) => {
  try {
    const res = await webApi.post(
      "edit/product",
      {
        data: data,
        specification: specification,
        faq: faq,
        description: description,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.status === 200) {
      onSuccess(res.data);
    } else {
      onFailure(res.data);
    }
  } catch (error) {
    onFailure(error);
  }
};

// export const getImage = async (files, onSuccess, onFailure) => {
//   try {
//     let image = {};
//     files.map(async (r, i) => {
//       const result = await webApi.post(
//         "/get/image",
//         {
//           filePath: r.filePath,
//         },
//         { responseType: "arraybuffer" }
//       );
//       const blob = new Blob([result.data], { type: "image/png" });
//       const imageUrl = URL.createObjectURL(blob);
//       console.log(imageUrl,"image/png")
//       image.push(imageUrl);

//     });
//     onSuccess(image);
//   } catch (error) {
//     onFailure(error);
//   }
// };
