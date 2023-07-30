import "./App.css";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

function App() {
  const [input, setInput] = useState();
  const [chats, setChats] = useState([]);
  const [selectModel, setSelectmodel] = useState(null);
  const [model, setModel] = useState([]);
  const count = useRef("");
  const handelSumbit = async (e) => {
    e.preventDefault();
    const chatLog = [...chats, { user: "me", chat: input }];
    setChats(chatLog);
    setInput("");
    try {
      const response = await axios.post("http://localhost:8000/", {
        chats: chatLog.map((chat) => chat.chat).join(" "),
        model: selectModel,
      });
      // const res = await response.json();
      console.log(response);
      setChats((chats) => [...chats, { user: "gpt", chat: response.data.chat }]);
    } catch (error) {
      // handle error
      console.log(error);
    }
  };

  const onPressEnter = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      handelSumbit(e);
    }
  };

  useEffect(() => {
    const getUsers = async () => {
      const response = await axios.get("http://localhost:8000/");
      count.current = response.data.model;
      setModel(response.data.model);
      setSelectmodel(count.current[0].id);
    };

    getUsers();
  }, []);

  const handelModel = (e) => {
    setSelectmodel(e.target.value);
  };

  return (
    <div className="App">
      <aside className="left-panel">
        <button className="btn">
          {/* Plus svg */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          New Chat
        </button>
        <div>
          <select
            value={selectModel}
            onChange={handelModel}
            className="btn selectModel"
          >
            {model &&
              model.map((m) => (
                <option name={m.id}>
                  <p>{m.id}</p>
                </option>
              ))}
          </select>
        </div>
      </aside>
      <section className="main">
        <div className="main_chat">
          {chats.map((chat) =>
            chat.user === "me" ? (
              <div className="me">
                <div className="chat">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                    />
                  <div>{chat.chat}</div>
                </div>
              </div>
            ) : (
              <div className="gpt">
                <div className="chat">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"></svg>
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                    />
                  <div>{chat.chat}</div>
                </div>
                              </div>
                            )
                          )}
                        </div>
                        <div className="chatBox">
                          <form onSubmit={handelSumbit}>
                            <textarea
                              type="text"
                              value={input}
                              className="inField"
                              onChange={(e) => setInput(e.target.value)}
                              rows="1"
                              onKeyDown={onPressEnter}
                            />
                          </form>
                        </div>
                      </section>
                    </div>
                  );
                }
                
                export default App;
                