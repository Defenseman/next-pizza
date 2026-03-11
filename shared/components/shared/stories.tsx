'use client';

import { useEffect, useState } from "react";
import { Api } from "@/shared/services/api-client";
import { IStory } from "@/shared/services/stories";
import { Container } from "./container";
import { cn } from "@/shared/lib/utils";
import { X } from "lucide-react";
import ReactStories from "react-insta-stories";

export const Stories = () => {
    const [stories, setStories] = useState<IStory[]>([])
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [selectedStory, setSelectedStory] = useState<IStory | null>(null)

    useEffect(() => {
        const fetchStories = async () => {
            const stories = await Api.stories.getAll()
            setStories(stories)
            console.log("Stories:", stories)
        }
        fetchStories()
    }, [])

    const onClickStory = (story: IStory) => {
        if (story.items.length === 0) return
        setSelectedStory(story)
        setIsOpen(true)
    }
    
    return (
        <Container className={cn("flex items-center justify-between my-10")}>
            {stories.length === 0 && 
                [...Array(6)].map((_, i) => (
                    <div key={i} className="w-[200px] h-[250px] bg-gray-200 rounded-md animate-pulse" />
                ))
            }
            {
                stories.map((story) => (
                    <img 
                        key={story.id} 
                        src={story.previewImageUrl} 
                        alt={"Story image"} 
                        height={250}
                        width={200}
                        onClick={() => onClickStory(story)} 
                        className="rounded-md cursor-pointer" 
                    />
                ))
            }

            {
                isOpen && <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/80 z-30">
                    <div className="relative" style={{width: 520}}>
                        <button className="absolute -right-10 -top-5 z-30 cursor-pointer" onClick={() => setIsOpen(false)}>
                            <X className="absolute top-0 right-0 w-8 h-8 text-white/50"/>
                        </button>

                        <ReactStories 
                            onAllStoriesEnd={() => setIsOpen(false)}
                            stories={selectedStory?.items.map((item) => ({url: item.sourceUrl})) || []}
                            defaultInterval={3000}
                            width={520}
                            height={800}
                        />
                    </div>
                </div>
            }
        </Container>
    );
};
