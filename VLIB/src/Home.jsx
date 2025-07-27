import "./Home.css";
import React, { useEffect, useRef } from "react";
import CountUp from "react-countup";

const Home = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (imageRef.current) {
        const rect = imageRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        imageRef.current.style.setProperty("--x", `${x}px`);
        imageRef.current.style.setProperty("--y", `${y}px`);
      }
    };

    const imgElement = imageRef.current;
    if (imgElement) {
      imgElement.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (imgElement) {
        imgElement.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  const stats = [
    { title: "Total Books Available", count: 64074, icon: "📚" },
    { title: "Books Issued Today", count: 735, icon: "🏷️" },
    { title: "Active Members", count: 1393, icon: "👥" },
    { title: "Media Resources", count: 4303, icon: "💿" },
    // { title: "E-Books & Journals Count 🔍", count: 15735, icon: "📰" },
  ];

  return (
    <div className="home">
      <div className="home">
        <header className="header">
          <div className="image-container" ref={imageRef}>
            <img
              src="https://images.pexels.com/photos/2908984/pexels-photo-2908984.jpeg?cs=srgb&dl=pexels-technobulka-2908984.jpg&fm=jpg"
              alt="Library Logo"
              className="header-image"
            />
            <div className="quote">
              <h1>VIT LIBRARY</h1>
              <p>Empowering Knowledge, Enriching Minds</p>
            </div>
            <div className="light"></div>
          </div>
        </header>
      </div>

      <section className="library-overview">
        <h2>VIT Library</h2>
        <p>
          The VIT Chennai Central Library is a state-of-the-art, multi-floor
          facility equipped with advanced security, digital resources, and
          automation. It houses a vast collection of books, journals, and
          multimedia across various disciplines. Features like RFID-enabled
          self-checkout, WEB-OPAC, and digital access ensure a seamless research
          and learning experience.
        </p>
        <p>
          <strong>Resources Available:</strong>
        </p>
        <ul>
          <li>
            Total Books: <strong>64,074</strong>
          </li>
          <li>
            Back Volumes: <strong>2,439</strong>
          </li>
          <li>
            Print Journals: <strong>266</strong> (126 National, 140
            International)
          </li>
          <li>
            E-Books: <strong>17,393</strong>
          </li>
          <li>
            CD/DVD: <strong>4,303</strong>
          </li>
          <li>
            Magazines: <strong>60</strong>
          </li>
        </ul>
      </section>

      {/* Services */}
      <section className="services">
        <h2>Library Services</h2>
        <ul>
          <li>Circulation Service</li>
          <li>Reference Service</li>
          <li>Online Public Access Catalogue (WebOPAC)</li>
          <li>Resource Sharing (Inter Library Loan)</li>
          <li>Multimedia Resource Service</li>
          <li>Tele / Video Conferencing</li>
          <li>Online Databases & E-Learning Facilities</li>
        </ul>
      </section>

      {/* Memberships */}
      <section className="membership">
        <h2>Library Membership</h2>
        <p>
          All students, faculty members, and staff are members of the library.
        </p>
        <p>
          <strong>Institutional Memberships:</strong>
        </p>
        <ul>
          <li>British Council Library (BCL), Chennai</li>
          <li>American Information Resources Center, Chennai</li>
          <li>DELNET (Developing Library Network), Delhi</li>
          <li>INFLIBNET, Ahmedabad</li>
          <li>MALIBNET, Chennai</li>
        </ul>
      </section>

      <div className="library-section">
        <div className="library-header">Central Library - Resources</div>
        <div className="library-content">
          <div className="library-item">
            <span className="library-title">Books</span>
            <span className="library-value">64,074</span>
          </div>
          <div className="library-item">
            <span className="library-title">Journal Back Volumes</span>
            <span className="library-value">2,439</span>
          </div>
          <div className="library-item">
            <span className="library-title">Periodicals</span>
            <span className="library-value">326</span>
          </div>
          <div className="library-item">
            <span className="library-title">E-Journals</span>
            <span className="library-value">15,735+</span>
          </div>
          <div className="library-item">
            <span className="library-title">E-Books</span>
            <span className="library-value">17,393</span>
          </div>
          <div className="library-item">
            <span className="library-title">Media Resources</span>
            <span className="library-value">4,303</span>
          </div>
        </div>
      </div>

      {/* <div className="bulletin-board">
        <div className="paper">
          <h2>📜 Rules and Regulations</h2>
          <ul>
            <li>Open access system is followed in the Library.</li>
            <li>Wearing ID card is compulsory inside the library.</li>
            <li>Bio-metric Entry and Exit is compulsory.</li>
            <li>
              Strict and absolute silence shall be observed in the Library.
            </li>
            <li>
              Speaking on mobile phones inside the library is strictly
              prohibited.
            </li>
            <li>
              Bags, big handbags, raincoats, jerkins, and casual wears are
              strictly prohibited.
            </li>
            <li>
              Members should keep their belongings at the entrance. Avoid
              leaving valuables unattended.
            </li>
            <li>Borrowed books should not be taken back inside the library.</li>
            <li>
              If the due date falls on a holiday, the next working day will be
              considered.
            </li>
            <li>Books will not be issued on another member's ID card.</li>
            <li>Lost or damaged books must be replaced or paid for.</li>
            <li>Books are issued based on availability.</li>
            <li>No sub-lending of books is allowed.</li>
            <li>
              Marking, underlining, or clipping books is strictly forbidden.
            </li>
            <li>
              Absence from the university does not excuse delayed returns.
            </li>
            <li>The librarian may recall books at any time.</li>
            <li>One online renewal is allowed via WEBOPAC.</li>
            <li>
              Borrowers are responsible for books issued against their ID.
            </li>
            <li>
              No individual reminders; defaulters' lists will be displayed.
            </li>
            <li>New books and journals will be on display for a week.</li>
            <li>
              Reference books, newspapers, and journals should not be taken out.
            </li>
            <li>The library accepts book donations.</li>
          </ul>
        </div>
      </div> */}

      {/* Animated Library Stats Section */}
      <section className="library-stats">
        <h2 className="stats-title">📊 Library Statistics</h2>
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-box">
              <div className="stat-icon">{stat.icon}</div>
              <h3 className="stat-title">{stat.title}</h3>
              <p className="stat-number">
                <CountUp
                  start={0}
                  end={stat.count}
                  duration={3}
                  separator=","
                />
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
