import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { TableConfig, TrashIcon, History } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  ChatAIContainer,
  ChatAIMain,
  ChatAIHeader,
  ChatAIBody,
  ChatAIFooter,
  ChatAIInput,
  ChatAIMessage,
  ChatAIEmpty,
  ChatAISubmitButton,
  ChatSystemInstructionsInput,
  ChatNavigator
} from "../components/ChatAIComponents";
import Sidebar from "../Examples/sidebar";
import { useParams } from "react-router-dom";

// Memoized message component
const MemoizedMessage = React.memo(({ msg, onSelect, id }) => (
  <div key={msg.id} className="flex">
    {msg.role === "user" && (
      <div id={id}
        onClick={(e) => onSelect(msg,e)}
        className={`h-4 w-4 rounded border border-blue-500 m-4 cursor-pointer`}
      ></div>
    )}
    <ChatAIMessage message={msg.text} isUser={msg.role === "user"} />
  </div>
));

const ChatAI = () => {
  const baseURL = "http://localhost:3300/api/chats";
  //slug from the current url
  const {id} = useParams()
  const [systemInstructions, setSystemInstructions] = useState("");
  const [showSIinput, setShowSIInput] = useState(false);
  const [chatMsgs, setChatMsgs] = useState([]);
  const [inputMsg, setInputMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [chatID, setChatID] = useState(id);
  const [contextChats, setContextChats] = useState([]);
  const [chatPages, setChatPages] = useState([]);
  const [pageTitle, setPageTitle] = useState("");
  const [chatPage,setChatPage] = useState("New");
  const navigator = useRef(null)
  const navigate = useNavigate()

  //  Fetch chat messages (only when chatID changes)
  useEffect(() => {
    if (!chatID && !id && id ==="new") return;
    (async () => {
      try {
        const res = await fetch(`${baseURL}/${chatID}`);
        console.log(chatID)
        const data = await res.json();
        setChatMsgs(
          data.messages.map((m, i) => ({
            id: i,
            text: m.text,
            role: m.role === "assistant" ? "model" : m.role
          }))
        );
        setChatPage(data.title)
        navigate(`/chat/${chatID}`)
      } catch {
        setError("Failed to load chats");
      }
    })();
  }, [chatID,]);

  //  Fetch all chat pages (once)
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${baseURL}/allChats`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ context: contextChats })
        });
        const data = await res.json();
        setChatPages(data);
      } catch {
        setError("Failed to load chat pages");
      }
    })();
  }, []);

  const handleSendMessage = useCallback(async () => {
    if (!inputMsg.trim()) return;
    if (!chatID) {setError("Please select a chat page");return;}
    const newMessage = { text: inputMsg, role: "user" };
    setChatMsgs((prev) => [...prev, newMessage]);
    setInputMsg("");
    setLoading(true);
    try {
      const res = await fetch(`${baseURL}/${chatID || ""}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: inputMsg,
          systemInstructions,
          history: contextChats
        })
      });
      const data = await res.json();
      setChatMsgs((prev) => [
        ...prev,
        { text: data.text, role: data.role }
      ]);
    } catch {
      setError("Failed to send message");
    } finally {
      setLoading(false);
    }
  }, [inputMsg, chatID, contextChats, systemInstructions]);

  const toggleSIInput = useCallback(() => {
    setShowSIInput((prev) => !prev);
  }, []);

  const handleCreatePage = useCallback(
    async (e) => {
      if (e.key === "Enter" && pageTitle.trim()) {
        setPageTitle("");
        try {
          const res = await fetch(`${baseURL}/createChat`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ pageTitle })
          });
          const data = await res.json();
          setChatPages((prev) => [...prev, data]);
        } catch {
          setError("Failed to create chat");
        }
      }
    },
    [pageTitle]
  );

  const handleSelectContext = useCallback((msg,e) => {
    setContextChats((prev) => {
      const exists = prev.includes(msg);
      const nextMsg = chatMsgs[chatMsgs.indexOf(msg) + 1];
      if (exists) {e.target.classList.remove("bg-blue-500");return prev.filter((m) => m !== msg && m !== nextMsg)};
      e.target.classList.add("bg-blue-500");
      return [...prev, msg, nextMsg];
    });
  }, [chatMsgs]);

  const renderAIHeader = useMemo(
    () => (
      <ChatAIHeader>
        <div className="flex items-center justify-center">
          <Sidebar title="Your Library">
            {chatPages.map((page) => (
              <div
                key={page._id}
                onClick={() => setChatID(page._id)}
                className="p-2 border-b text-sm cursor-pointer hover:bg-gray-100 flex justify-between"
              >
                {page.title}
                <button>
                  <TrashIcon
                    className="ml-2 hover:text-red-500 text-gray-300"
                    onClick={async (e) => {
                      e.stopPropagation();
                      try {
                        await fetch(`${baseURL}/deleteChat/${page._id}`, {
                          method: "DELETE"
                        });
                        setChatPages((prev) => prev.filter((p) => p._id !== page._id));
                      } catch {
                        setError("Failed to delete chat");
                      }
                    }}
                  />
                </button>
              </div>
            ))}
            <input
              type="text"
              value={pageTitle}
              onChange={(e) => setPageTitle(e.target.value)}
              onKeyDown={handleCreatePage}
              placeholder="Add a chat page..."
              className="w-full p-2 border border-gray-300 text-sm outline-none"
            />
          </Sidebar>
          <h1 className="text-2xl m-2 text-center">{chatPage}</h1>
        </div>
        <button className="lg:hidden block z-20" onClick={()=>{navigator.current.classList.toggle("hidden")}}>
          <History/>
        </button>
      </ChatAIHeader>
    ),
    [chatPages, pageTitle, handleCreatePage,chatPage]
  );

  const renderSelectedContext = useMemo(
    () =>
      contextChats.length > 0 && (
        <div className="absolute bg-white p-2 rounded-lg shadow">
          Selected: {contextChats.length / 2} messages
        </div>
      ),
    [contextChats]
  );

  const renderChatNavigator = useMemo(
    ()=> (
      <div className="w-full lg:max-w-sm overflow-y-auto max-h-screen h-full bg-white bg-opacity-60 m-2 border rounded lg:block hidden min-w-60 absolute lg:static" ref={navigator}>
        <ChatNavigator messages={chatMsgs}/>
      </div>
    ), [chatMsgs]
  )

  const renderChatBody = useMemo(
    () => (
      <ChatAIBody>
        {chatMsgs.length === 0 && !loading && !error && <ChatAIEmpty />}
        {!chatID && "Please select a chat"}
        {chatMsgs.map((msg,index) => (
          <MemoizedMessage id={index} key={msg.id} msg={msg} onSelect={handleSelectContext} />
        ))}
      </ChatAIBody>
    ),
    [chatMsgs, loading, error, handleSelectContext]
  );

  return (
    <ChatAIContainer>
      <ChatAIMain>
        {renderAIHeader}
        {renderSelectedContext}
        {renderChatBody}
        <ChatAIFooter>
          <ChatAIInput value={inputMsg} onChange={(e) => setInputMsg(e.target.value)} />
          <ChatAISubmitButton onClick={handleSendMessage} />
          <button onClick={toggleSIInput} className="ml-2 p-2 bg-gray-200 rounded-lg">
            <TableConfig />
          </button>
          {showSIinput && (
            <ChatSystemInstructionsInput
              value={systemInstructions}
              onChange={(e) => setSystemInstructions(e.target.value)}
            />
          )}
        </ChatAIFooter>
      </ChatAIMain>
        {renderChatNavigator}
    </ChatAIContainer>
  );
};

export default ChatAI;
