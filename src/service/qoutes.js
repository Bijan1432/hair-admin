import { DateTimeFormater } from "../utils/DateAndTime";
import webApi from "./webApi/webApi";

export const getQoutes = async (token,onSuccess, onFailure) => {
  try {
    const result = await webApi.post("/get/qoutes",{},{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (result.status === 200) {
      let data = [];
      result.data.map((r, i) => {
        data.push({
          id: i + 1,
          name: r.name,
          email: r.email,
          phone: r.phone,
          productSlug: r.productSlug,
          productName: r.productName,
          message: r.message,
          time: DateTimeFormater(r.createdAt),
        });
      });
      onSuccess(data);
    }
  } catch (error) {
    onFailure(error);
  }
};
