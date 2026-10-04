import { useEffect, useState } from "react";
import "./App.css";

function App() {
  // =========================
  // MOBILE MENU
  // =========================

  const [menuOpen, setMenuOpen] = useState(false);

  // =========================
  // PROJECTS
  // =========================

  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] =
    useState(true);

  // =========================
  // CONTACT FORM
  // =========================

  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [contactLoading, setContactLoading] =
    useState(false);

  const [contactStatus, setContactStatus] =
    useState("");

  // =========================
  // FETCH PROJECTS
  // =========================

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          `${(import.meta.env.VITE_API_URL || "https://portfolio-2-7ap9.onrender.com/api")}/projects`
        );

        const data = await response.json();

        setProjects(data.projects || []);
      } catch (error) {
        console.error(
          "Failed to fetch projects:",
          error
        );
      } finally {
        setLoadingProjects(false);
      }
    };

    fetchProjects();
  }, []);

  // =========================
  // CLOSE MOBILE MENU
  // =========================

  const closeMenu = () => {
    setMenuOpen(false);
  };

  // =========================
  // CONTACT SUBMIT
  // =========================

  const handleContactSubmit = async (e) => {
    e.preventDefault();

    setContactLoading(true);
    setContactStatus("");

    try {
      const response = await fetch(
        `${(import.meta.env.VITE_API_URL || "https://portfolio-2-7ap9.onrender.com/api")}/contact`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(contactData),
        }
      );

      const text = await response.text();

let data = {};

try {
  data = text ? JSON.parse(text) : {};
} catch {
  throw new Error(
    "Server returned an invalid response."
  );
}

if (!response.ok) {
  throw new Error(
    data.message ||
      "Failed to send message."
  );
}

      setContactStatus(
        "Message sent successfully! ✅"
      );

      setContactData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error(
        "Contact form error:",
        error
      );

      setContactStatus(
        error.message ||
          "Something went wrong."
      );
    } finally {
      setContactLoading(false);
    }
  };

  return (
    <div>

      {/* =========================
          NAVBAR
      ========================= */}

      <nav className="navbar">

        <div className="navbar-container">

          <a
            href="#home"
            className="logo"
            onClick={closeMenu}
          >
            Abhay
          </a>

          <div className="nav-links">

            <a href="#home">Home</a>

            <a href="#about">About</a>

            <a href="#skills">Skills</a>

            <a href="#projects">Projects</a>

            <a href="#contact">Contact</a>

          </div>

          <button
            className="menu-btn"
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
          >
            {menuOpen ? "✕" : "☰"}
          </button>

        </div>

        {menuOpen && (

          <div className="mobile-menu">

            <a
              href="#home"
              onClick={closeMenu}
            >
              Home
            </a>

            <a
              href="#about"
              onClick={closeMenu}
            >
              About
            </a>

            <a
              href="#skills"
              onClick={closeMenu}
            >
              Skills
            </a>

            <a
              href="#projects"
              onClick={closeMenu}
            >
              Projects
            </a>

            <a
              href="#contact"
              onClick={closeMenu}
            >
              Contact
            </a>

          </div>

        )}

      </nav>


      {/* =========================
          HERO
      ========================= */}

      <section
        id="home"
        className="hero"
      >

        <div className="hero-content">

          <p className="hero-greeting">
            Hello, I'm
          </p>

          <h1>
            Abhay
          </h1>

          <h2>
            MERN Stack Developer
          </h2>

          <p className="hero-description">
            I create modern, responsive and
            user-friendly web applications
            using React, Node.js, Express.js
            and MongoDB.
          </p>

          <div className="hero-buttons">

            <a
              href="#projects"
              className="primary-btn"
            >
              View My Work
            </a>

            <a
              href="#contact"
              className="secondary-btn"
            >
              Contact Me
            </a>

          </div>

          <div className="social-links">

            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>

          </div>

        </div>

        <div className="hero-image">

          <div className="profile-avatar">
            👨‍💻
          </div>

        </div>

      </section>


      {/* =========================
          ABOUT
      ========================= */}

      <section
        id="about"
        className="section about-section"
      >

        <h2>
          About Me
        </h2>

        <p className="section-subtitle">
          Get to know more about me and
          my development journey.
        </p>

        <div className="about-container">

          <div className="about-content">

            <h3>
              Abhay
            </h3>

            <h4>
              MERN Stack Developer
            </h4>

            <p>
              I build modern and responsive
              web applications using MERN stack.
            </p>

          </div>

          <div className="about-info">

            <div className="info-card">

              <span>💻</span>

              <h3>
                Development
              </h3>

              <p>
                Building modern web applications
                with MERN stack.
              </p>

            </div>

            <div className="info-card">

              <span>🚀</span>

              <h3>
                Learning
              </h3>

              <p>
                Continuously learning new
                technologies and tools.
              </p>

            </div>

            <div className="info-card">

              <span>📱</span>

              <h3>
                Responsive
              </h3>

              <p>
                Creating websites that work
                across all devices.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =========================
          SKILLS
      ========================= */}

      <section
        id="skills"
        className="section skills-section"
      >

        <h2>
          My Skills
        </h2>

        <p className="section-subtitle">
          Technologies and tools I use to
          build modern web applications.
        </p>

        <div className="skills-grid">

          <div className="skill-card">

            <div className="skill-icon">
              🌐
            </div>

            <h3>
              HTML5
            </h3>

            <p>
              Semantic and structured web pages
            </p>

          </div>

          <div className="skill-card">

            <div className="skill-icon">
              🎨
            </div>

            <h3>
              CSS3
            </h3>

            <p>
              Responsive and modern UI design
            </p>

          </div>

          <div className="skill-card">

            <div className="skill-icon">
              🟨
            </div>

            <h3>
              JavaScript
            </h3>

            <p>
              Dynamic and interactive web
              applications
            </p>

          </div>

          <div className="skill-card">

            <div className="skill-icon">
              ⚛️
            </div>

            <h3>
              React.js
            </h3>

            <p>
              Modern component-based frontend
              development
            </p>

          </div>

          <div className="skill-card">

            <div className="skill-icon">
              🟢
            </div>

            <h3>
              Node.js
            </h3>

            <p>
              Backend and server-side development
            </p>

          </div>

          <div className="skill-card">

            <div className="skill-icon">
              🚂
            </div>

            <h3>
              Express.js
            </h3>

            <p>
              REST API and backend development
            </p>

          </div>

          <div className="skill-card">

            <div className="skill-icon">
              🍃
            </div>

            <h3>
              MongoDB
            </h3>

            <p>
              NoSQL database and data management
            </p>

          </div>

        </div>

      </section>


      {/* =========================
          PROJECTS
      ========================= */}

      <section
        id="projects"
        className="section projects-section"
      >

        <h2>
          My Projects
        </h2>

        <p className="section-subtitle">
          Some of the projects I have built
          using modern web technologies.
        </p>

        {loadingProjects ? (

          <p className="projects-loading">
            Loading projects...
          </p>

        ) : projects.length === 0 ? (

          <p className="projects-loading">
            No projects available.
          </p>

        ) : (

          <div className="projects">

            {projects.map((project) => (

              <div
                className="project-card"
                key={project._id}
              >

                <div className="project-image">

                  {project.image ? (

                    <img
                      src={project.image}
                      alt={project.title}
                    />

                  ) : (

                    "💻"

                  )}

                </div>

                <div className="project-content">

                  <h3>
                    {project.title}
                  </h3>

                  <p>
                    {project.description}
                  </p>

                  <div className="project-tech">

                    {project.technologies?.map(
                      (tech, index) => (

                        <span key={index}>
                          {tech}
                        </span>

                      )
                    )}

                  </div>

                  <div className="project-buttons">

                    {project.liveUrl && (

                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Live Demo
                      </a>

                    )}

                    {project.githubUrl && (

                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        GitHub
                      </a>

                    )}

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </section>


      {/* =========================
          CONTACT
      ========================= */}

      <section
        id="contact"
        className="section contact-section"
      >

        <h2>
          Contact Me
        </h2>

        <p className="section-subtitle">
          Have a project or opportunity in mind?
          Feel free to get in touch.
        </p>

        <div className="contact-container">

          <div className="contact-info">

            <h3>
              Let's Work Together
            </h3>

            <p>
              I'm always interested in learning,
              building new projects and working
              on interesting web development ideas.
            </p>

            <div className="contact-item">

              <span>
                📧
              </span>

              <div>

                <h4>
                  Email
                </h4>

                <p>
                  your@email.com
                </p>

              </div>

            </div>

            <div className="contact-item">

              <span>
                💻
              </span>

              <div>

                <h4>
                  GitHub
                </h4>

                <p>
                  github.com/yourusername
                </p>

              </div>

            </div>

            <div className="contact-item">

              <span>
                🔗
              </span>

              <div>

                <h4>
                  LinkedIn
                </h4>

                <p>
                  linkedin.com/in/yourusername
                </p>

              </div>

            </div>

          </div>


          {/* =========================
              CONTACT FORM
          ========================= */}

          <form
            className="contact-form"
            onSubmit={handleContactSubmit}
          >

            <div className="form-group">

              <label htmlFor="name">
                Your Name
              </label>

              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={contactData.name}
                onChange={(e) =>
                  setContactData({
                    ...contactData,
                    name: e.target.value,
                  })
                }
                required
              />

            </div>


            <div className="form-group">

              <label htmlFor="email">
                Your Email
              </label>

              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={contactData.email}
                onChange={(e) =>
                  setContactData({
                    ...contactData,
                    email: e.target.value,
                  })
                }
                required
              />

            </div>


            <div className="form-group">

              <label htmlFor="message">
                Message
              </label>

              <textarea
                id="message"
                rows="6"
                placeholder="Write your message..."
                value={contactData.message}
                onChange={(e) =>
                  setContactData({
                    ...contactData,
                    message: e.target.value,
                  })
                }
                required
              ></textarea>

            </div>


            {contactStatus && (

              <p className="contact-status">
                {contactStatus}
              </p>

            )}


            <button
              type="submit"
              className="contact-btn"
              disabled={contactLoading}
            >
              {contactLoading
                ? "Sending..."
                : "Send Message"}
            </button>

          </form>

        </div>

      </section>


      {/* =========================
          FOOTER
      ========================= */}

      <footer className="footer">

        <p>
          © {new Date().getFullYear()} Abhay.
          All rights reserved.
        </p>

        <p>
          Built with React.js & MERN Stack 🚀
        </p>

      </footer>

    </div>
  );
}

export default App;