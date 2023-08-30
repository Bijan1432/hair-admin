import webApi from "./webApi/webApi";

export const postHair = async (image, colour, data, onSuccess, onFailure) => {
  try {
    await webApi.post("/uploads/image", image).then(async (result) => {
      console.log(result.data, "resultreult", colour);
      const images = [];
      await Promise.all(
        colour.map(async (_, index) => {
          console.log(index); // This will give you 0, 1, 2, ...
          images.push({
            url: result.data[index].filePath,
            filename: result.data[index].fileName,
            colour: colour[index],
          });
          console.log(images);
        })
      );
      console.log("images", images);

      const res = await webApi.post("/add-hair", {
        name: data.hairName,
        images: images,
        status: data.status,
      });
      if (res.status === 200) {
        onSuccess(res.data);
      } else {
        onFailure(res.data);
      }
    });
  } catch (error) {
    onFailure(error.response);
  }
};

//get Hair
export const getHair = async (id, onSuccess, onFailure) => {
  try {
    const res = await webApi.post(`/get-hair/${id}`);
    if (res.data) {
      onSuccess(res.data[0]);
    } else {
      onFailure("No Record Found!!");
    }
  } catch (error) {
    onFailure(error);
  }
};
//get all Hair
export const getHairAll = async (onSuccess, onFailure) => {
  try {
    const res = await webApi.get("/get-all-hair");
    let data = [];
    if (res.data.length > 0) {
      res.data.map((r, i) => {
        data.push({
          id: i + 1,
          name: r.name,
          status: r.status,
          images: r.images,
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
//edit Hair
export const editHair = async (data, colour,imagesToRemove, onSuccess, onFailure) => {
  try {
    // console.log("typeOf==>", colour);
    const images = [];
    await Promise.all(
      colour.map(async (r, i) => {
        if (typeof r.image === "object") {
          const result = await webApi.post("/uploads/image", r.image);
          console.log(result, "result===");
          images.push({
            url: result.data[0].filePath,
            filename: result.data[0].fileName,
            colour: r.varientColour,
          });
        }
      })
    );

    console.log("images===>>", images);
    // await webApi.post("/uploads/image", image)
    // .then(async (result) => {
    //   console.log(result, "result===");
    // });

    // const images = [];
    // await Promise.all(
    //   colour.map(async (_, index) => {
    //     console.log(index); // This will give you 0, 1, 2, ...
    //     images.push({
    //       url: result.data[index].filePath,
    //       filename: result.data[index].fileName,
    //       colour: colour[index],
    //     });
    //     console.log("reched3", images);
    //   })
    // );
    // console.log("reched1", images);

    const res = await webApi.post(`/edit-hair/${data.id}`, {
      name: data.hairName,
      images: images,
      status: data.status,
      imagesToRemove:imagesToRemove,
    });
    console.log("reched2", res);

    if (res.status === 200) {
      onSuccess(res.data);
    } else {
      onFailure(res.data);
    }
  } catch (error) {
    onFailure(error.response);
  }
};
