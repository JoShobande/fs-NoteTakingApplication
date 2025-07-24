import { Loader2 } from "lucide-react"


interface LoadingStateProps{
    description:string
}

const LoadingState = ({description}:LoadingStateProps) => {

    return (
        <div className="flex flex-col items-center justify-center py-10 h-full">
        <Loader2 className="animate-spin h-[80px] w-[80px] mr-2 text-blue-600" />
        <span>{description}...</span>
        </div>
    )
      
}

export default LoadingState

  