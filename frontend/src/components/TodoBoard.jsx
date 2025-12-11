import {Trash2, Edit, CheckCircle,MoreVertical} from "lucide-react"

export const TodoBoard = ({children,className, ...props}) =>{
    return (
        <div className="p-4 w-full flex flex-col items-center" {...props}>{children}</div>
    )
}

export const TodoCards = ({children,className, ...props}) =>{
    return (
        <div className="bg-blue-200 p-4 w-full rounded m-2 flex items-center max-w-6xl relative" {...props}>{children}</div>
    )
}

export const TodoDeleteButton = ({...props}) => {
    return (
        <div className="flex items-center justify-center" {...props}>
            <Trash2 className="text-red-600 hover:text-red-800 cursor-pointer"/>
        </div>
    )
}

export const TodoEditButton = ({...props}) => {
    return (
        <div className="flex items-center justify-center mx-4" {...props}>
            <Edit className="text-gray-600 hover:text-gray-800 cursor-pointer"/>
        </div>
    )
}

export const TodoCompleteButton = ({task,...props}) => {
    return (
        <label {...props}
        htmlFor={task.id}
        className={`w-6 h-6 flex items-center mx-2 justify-center border-2 rounded-md cursor-pointer transition
          ${task.completed ? "bg-gray-500 border-gray-600" : "border-gray-400"}
        `}
      >
        {task.completed && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-white"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path stroke="#A0AEC0" strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </label>
    )
}

export const TodoInputContainer = ({children,className, ...props}) =>{
    return (
        <div className="p-4 w-full rounded m-2 flex items-center max-w-6xl" {...props}>{children}</div>
    )
}

export const TodoInput = ({...props}) =>{
    return (
        <input className="border-2 border-gray-300 p-2 rounded w-full outline-none" {...props} />
    )
}

export const TodoButton = ({children,...props}) =>{
    return (
        <button className="bg-blue-500 text-white px-4 py-2 rounded ml-2 hover:bg-blue-600 flex items-center" {...props}>{children}</button>
    )
}

export const TodoInPlaceInput = ({value, onChange, ...props}) => {
    return (
      <input
        className="border-2 border-gray-300 p-2 rounded w-full bg-transparent outline-none"
        value={value}
        onChange={onChange}
        {...props}
      />
    )
}

export const TodoPageSelector = ({children,className, ...props}) =>{
    return (
        <select className="p-2 rounded m-2 flex items-center outline-none" {...props}>{children}</select>
    )
}

export const TodoPageOption = ({children,className, ...props}) =>{
    return (
        <option className="p-4 w-full rounded m-2 flex items-center max-w-6xl" {...props}>{children}</option>
    )
}

export const TodoAddPagePromptBox = ({children,className, ...props}) =>{
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20" {...props}>{children}</div>
    )
}

export const TodoMoreOptionsButton = ({...props}) => {
    return (
        <div className="flex items-center justify-center" {...props}>
            <MoreVertical className="text-gray-600 hover:text-gray-800 cursor-pointer"/>
        </div>
    )
}

export const TodoMoreOptionsCard = ({children,className, ...props}) =>{
    return (
        <div className="absolute bg-white p-4 rounded-lg shadow right-0 mt-8 top-2 hidden m-4 w-[300px] z-10" {...props}>{children}</div>
    )
}