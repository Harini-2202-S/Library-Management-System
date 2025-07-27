import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import "./HelpPage.css";

const faqs = [
  {
    question: "How do I borrow a book from the library?",
    answer:
      "You can borrow a book by logging into your account and selecting the book you want. Then, visit the library counter to check it out.",
  },
  {
    question: "Can I renew my borrowed book online?",
    answer:
      "Yes, you can renew your borrowed books through the library portal under 'My Loans'.",
  },
  {
    question: "What happens if I return a book late?",
    answer:
      "Late returns will result in a fine of $1 per day. Please return books on time to avoid penalties.",
  },
  {
    question: "How can I reserve a book?",
    answer:
      "Log in to your account, search for the book, and click 'Reserve'. You will be notified when the book is available.",
  },
];

const HelpPage = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="help-page">
      <motion.h1
        className="help-title"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Need Help? We've Got Answers!
      </motion.h1>

      <motion.div
        className="faq-container"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            className="faq-item"
            onClick={() => toggleFAQ(index)}
            initial={{ y: 10, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <div className="faq-question">
              {faq.question}
              {openFAQ === index ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            <motion.div
              className="faq-answer"
              animate={{
                height: openFAQ === index ? "auto" : 0,
                opacity: openFAQ === index ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              {openFAQ === index && <p>{faq.answer}</p>}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default HelpPage;
