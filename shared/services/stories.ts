import { Story, StoryItem } from "@prisma/client"
import { axiosInstance } from "./instance"

export interface IStory extends Story {
    items: StoryItem[]
}

export const getAll = async () => {
    const { data } = await axiosInstance.get<IStory[]>("/stories")    
    return data
}