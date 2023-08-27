import webApi from "./webApi/webApi";

//cat
export const postBlogCategory = async (data, token, onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/post/blogCategory", data, {
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

export const getBlogCategory = async (onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/get/blogCategory");
    let data = [];
    if (res.data.length > 0) {
      res.data.map((r, i) => {
        data.push({
          // id: i + 1,
          label: r.name,
          value: r.blogCat_id,
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

export const getBlogCategoryList = async (onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/get/blogCategory");
    let data = [];
    if (res.data.length > 0) {
      res.data.map((r, i) => {
        data.push({
          id: i + 1,
          name: r.name,
          slug: r.slug,
          description: r.description,
          blogCat_id: r.blogCat_id,
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

export const getBlogCatEdit = async (blogCat_id, onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/get/blogCategory", {
      blogCat_id: blogCat_id,
    });
    let data = [];
    if (res.data.length > 0) {
      onSuccess(res.data[0]);
    } else {
      onFailure("No Record Found!!");
    }
  } catch (error) {
    onFailure(error);
  }
};

export const editBlogCat = async (data, token, onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/edit/blogCategory", data, {
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

//blog
export const postBlog = async (image, data, token, onSuccess, onFailure) => {
  try {
    await webApi.post("/blogUploads/image", image).then(async (result) => {
      const res = await webApi.post(
        "/post/blog",
        {
          data: data,
          image: result.data,
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

export const getBlog = async (onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/get/blog");
    let data = [];
    if (res.data.length > 0) {
      res.data.map((r, i) => {
        data.push({
          id: i + 1,
          title: r.title,
          slug: r.slug,
          description: r.description,
          blog_id: r.blog_id,
          published: r.published,
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

export const getBlogEdit = async (blog_id, onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/get/blog", {
      blog_id: blog_id,
    });
    let data = [];
    if (res.data.length > 0) {
      onSuccess(res.data[0]);
    } else {
      onFailure("No Record Found!!");
    }
  } catch (error) {
    onFailure(error);
  }
};

export const editBlog = async (image, data, token, onSuccess, onFailure) => {
  try {
    await webApi.post("/blogUploads/image", image).then(async (result) => {
      const result2 = await webApi.post(
        "edit/blog",
        {
          data: data,
          image: result.data,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (result2.status === 200) {
        onSuccess("Blog Edited!!! ✔✔✔");
      }
    });
  } catch (error) {
    onFailure("Something!! Went Wrong Please Try again later!!! : " + error);
  }
};
