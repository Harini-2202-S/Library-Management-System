import { useState, useEffect } from "react";
import { FaCommentDots, FaTimes } from "react-icons/fa"; // Import icons
import "./Chatbot.css"; // Importing CSS styles

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [libraryData, setLibraryData] = useState(null);

  // Fetch library data on component mount
  useEffect(() => {
    fetch("/libraryData.json")
      .then((response) => response.json())
      .then((data) => setLibraryData(data))
      .catch((error) => console.error("Error loading library data:", error));
  }, []);

  const getLibraryResponse = (query) => {
    if (!libraryData) return "Loading library data...";

    const lowerQuery = query.toLowerCase();

    if (lowerQuery.includes("timing") || lowerQuery.includes("hours"))
      return libraryData.library_timing;
    if (lowerQuery.includes("membership")) return libraryData.membership_info;
    if (lowerQuery.includes("book search") || lowerQuery.includes("search"))
      return libraryData.book_search;
    if (
      lowerQuery.includes("borrowing rules") ||
      lowerQuery.includes("borrow rules")
    )
      return libraryData.borrowing_rules;
    if (lowerQuery.includes("return policy") || lowerQuery.includes("fine"))
      return libraryData.return_policy;
    if (
      lowerQuery.includes("digital resources") ||
      lowerQuery.includes("online")
    )
      return libraryData.digital_resources;
    if (lowerQuery.includes("events") || lowerQuery.includes("workshops"))
      return libraryData.events_and_workshops;
    if (lowerQuery.includes("contact") || lowerQuery.includes("help"))
      return libraryData.contact_info;

    return "I'm sorry, I can only answer library-related questions. Please ask about timings, membership, books, or borrowing rules.";
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    const botMessage = { text: getLibraryResponse(input), sender: "bot" };

    setMessages([...messages, userMessage, botMessage]);
    setInput("");
  };

  return (
    <div className="chatbot-wrapper">
      {/* Floating Chatbot Icon */}
      {!isOpen && (
        <button className="chatbot-icon" onClick={() => setIsOpen(true)}>
          <FaCommentDots size={28} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-container">
          <div className="chat-header">
            VLIB Chatbot 
            <button className="chat-close" onClick={() => setIsOpen(false)}>
              <FaTimes />
            </button>
          </div>
          <div className="chat-window">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me about the library..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
