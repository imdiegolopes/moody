import { createHttpClient } from "../clients/http";


export async function getMoods() {
  try {
    const response = await createHttpClient({
      url: "/v1/moods",
      method: "GET",
    });

    return response as GetMoodOutput[];
  } catch (error) {
    return [];
  }
}

export async function createMood(mood: PostMoodInput) {
  try {
    const response = await createHttpClient({
      url: "/v1/moods",
      method: "POST",
      data: mood,
    });

    return response;
  } catch (error) {
    return [];
  }
}
