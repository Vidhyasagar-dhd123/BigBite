//All components to create chatGPT like interface
import {Loader,SendIcon, } from 'lucide-react';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export const ChatAIContainer = React.memo(({children}) => {
    return (<div className="w-full h-screen flex flex-row grow justify-center items-center relative">{children}</div>)
})

export const ChatAIMain = React.memo(({children}) => {
    return (<div className="w-full md:w-11/12 h-full m-0 md:m-4 border grow border-gray-300 rounded-lg shadow-lg flex flex-col items-center">{children}</div>)
})

export const ChatAIHeader = React.memo(({children}) => {
    return (<div className="w-full h-16 border-b border-gray-300 flex justify-between lg:justify-start items-center font-semibold text-lg p-4">{children}</div>)
})

export const ChatAIBody = React.memo(({children}) => {
    return (<div className="w-full h-full overflow-y-auto max-w-6xl">{children}</div>)
}
)
export const ChatAIFooter = ({children}) => {
    return (<div className="w-full h-16 border rounded border-gray-300 flex items-center p-4 sticky bottom-0 bg-white">{children}</div>)
}

export const ChatAIInput = ({value, onChange, onKeyDown}) => {
    return (
        <input 
            type='text'
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            className="w-full h-12 border border-gray-300 rounded-lg p-4 outline-none"
            placeholder="Type your message..."
        /> )
}

export const ChatAIMessage = ({message, isUser}) => {
    return (
        <div className={`w-full flex ${isUser ? 'justify-end' : 'justify-start'} m-0 md:mb-4 md:p-4 p-0`}>
            <div className={`rounded-lg p-4 ${isUser ? 'bg-blue-200 text-white' : ' text-blue-800 overflow-x-auto'}`}>
                <MarkdownRenderer>{message}</MarkdownRenderer>
            </div>
        </div>
    )
}

export const ChatAILoading = () => {
    return (
        <div className="w-full flex justify-center items-center">
            <Loader className="animate-spin" />
        </div>
    )
}

export const ChatAIError = ({error}) => {
    return (
        <div className="w-full bg-red-100 text-red-700 p-4 rounded-lg">
            {error}
        </div>
    )
}
export const ChatAIEmpty = () => {
    return (
        <div className="w-full text-center text-gray-500">
            No messages yet.
        </div>
    )
}

export const ChatAISubmitButton = ({onClick, isLoading}) => {
    return (
        <button
            onClick={onClick}
            className="p-2 m-2 ml-4 flex items-center justify-center bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition duration-200"
            disabled={isLoading}
        >
            {isLoading ? <Loader className="animate-spin" /> : <SendIcon />}
        </button>
    )
}

export const ChatSystemInstructionsInput = ({instructions,setInstructions,...props}) => {
    //Fixed position
    return (
        <textarea
            {...props}
            className="fixed bottom-20 left-1/2 transform -translate-x-1/2 w-11/12 h-24 border border-gray-300 rounded-lg p-4 bg-white shadow-lg"
            placeholder="Enter system instructions..."
        />
    )
}

function MarkdownRenderer({ children: markdown }) {
  return (
    <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl !max-w-full !w-full text-justify">
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        code({node, inline, className, children, ...props}) {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <SyntaxHighlighter
              style={dracula}
              language={match[1]}
              PreTag="div"
              {...props}
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code className={className} {...props}>{children}</code>
          );
        }
      }}
    >
      {markdown}
    </ReactMarkdown></div>
  );
}

export const ChatNavigator = ({messages=[]})=>{
    return <div>
    {   messages.length===0?<div className='text-gray-500 p-2 m-2 rounded bg-white'>You Did Not Ask Any Question</div>:
        messages.map((msg,id)=>{
            if(msg.role==="user")
                return <div key={id} className='bg-gray-200 p-2 m-2 rounded'><a href={`#${id}`}>{msg.text.slice(0,50)}...</a></div>
            return <></>
        })
    }
    </div>
}