interface GetMoodOutput {
  activity: string;
  comments: string;
  created_on: string;
  date: string;
  feeling: string;
  id: string;
  intensity: number;
  updated_on: string;
}

interface PostMoodInput {
  activity: string;
  comments: string;
  date: string;
  feeling: string;
  intensity: number;
}

interface GetMoodsOutput {
  moods: GetMoodOutput[];
}