import { cn } from "@/shared/lib/utils"
import { Title } from "./title"
import { ArrowLeft } from "lucide-react"
import { Button } from "../ui"
import Link from "next/link"

interface InfoBlockProps {
    title: string
    text: string
    className?: string
    imageUrl?: string
}

export const InfoBlock = ({ title, text, className, imageUrl }: InfoBlockProps) => {
    return (
        <div className={cn(className, "flex items-center justify-between w-[840px] gap-12")}>
            <div className="flex flex-col">
                <div className="w-[445px]">
                    <Title text={title} size="lg" className="font-extrabold"/>
                    <p className="text-lg text-gray-400">{text}</p>

                    <div className="flex gap-5 mt-11">
                        <Link href="/" >
                            <Button variant="outline">
                                <ArrowLeft />
                                На главную
                            </Button>
                        </Link>
                        <a href="">
                            <Button variant="outline" className="text-gray-500 border-gray-500 hover:bg-gray-50">
                                Обновить
                            </Button>
                        </a>
                    </div>
                </div>
            </div>
            {imageUrl && <img src={imageUrl} alt="Info image" width={300} />}
        </div>
    )
}