import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Dashboard from "./Dashboard";
import Home from "./Home";
import Books from "./components/Books";
import Footer from "./components/Footer";
import Wishlist from "./components/Wishlist";
import Signup from "./components/Signup";
import BookDetails from "./components/BookDetails";
import Gallery from "./gallery";
import EventsPage from "./EventsPage";
import HelpPage from "./HelpPage";
import Chatbot from "./Chatbot";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/elibrary" element={<Books />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/book/:title" element={<BookDetails />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/help" element={<HelpPage />} />
        </Routes>
        <Chatbot />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
