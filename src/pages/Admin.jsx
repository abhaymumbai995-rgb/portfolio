import React, {
  useEffect,
  useState,
} from "react";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

function Admin() {
  // =========================
  // STATES
  // =========================

  const [projects, setProjects] =
    useState([]);

  const [profile, setProfile] =
    useState({
      name: "",
      role: "",
      about: "",
      email: "",
      github: "",
      linkedin: "",
      profileImage: "",
    });

  const [projectForm, setProjectForm] =
    useState({
      title: "",
      description: "",
      technologies: "",
      image: "",
      liveUrl: "",
      githubUrl: "",
      featured: false,
    });

  const [editingProjectId, setEditingProjectId] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [message, setMessage] =
    useState("");

  const [contactMessages, setContactMessages] =
    useState([]);

  const [contactLoading, setContactLoading] =
    useState(false);

  // =========================
  // TOKEN
  // =========================

  const token =
    localStorage.getItem(
      "portfolio_token"
    );

  // =========================
  // FETCH PROJECTS
  // =========================

  const fetchProjects = async () => {
    try {
      const response = await fetch(
        `${API_URL}/projects`
      );

      const data =
        await response.json();

      setProjects(
        data.projects || []
      );
    } catch (error) {
      console.error(
        "Projects fetch error:",
        error
      );
    }
  };

  // =========================
  // FETCH PROFILE
  // =========================

  const fetchProfile = async () => {
    try {
      const response = await fetch(
        `${API_URL}/profile`
      );

      const data =
        await response.json();

      if (data.profile) {
        setProfile(data.profile);
      }
    } catch (error) {
      console.error(
        "Profile fetch error:",
        error
      );
    }
  };

  // =========================
  // FETCH CONTACT MESSAGES
  // =========================

  const fetchContactMessages =
    async () => {
      setContactLoading(true);

      try {
        const response = await fetch(
  `${API_URL}/contact`,
  {
    headers: {
      Authorization:
        `Bearer ${token}`,
    },
  }
);
        const data =
          await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ||
              "Failed to fetch messages."
          );
        }

        setContactMessages(
          data.messages || []
        );
      } catch (error) {
        console.error(
          "Contact messages fetch error:",
          error
        );
      } finally {
        setContactLoading(false);
      }
    };

  // =========================
  // INITIAL LOAD
  // =========================

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      await Promise.all([
        fetchProjects(),
        fetchProfile(),
        fetchContactMessages(),
      ]);

      setLoading(false);
    };

    loadData();
  }, []);

  // =========================
  // PROFILE CHANGE
  // =========================

  const handleProfileChange = (
    e
  ) => {
    const {
      name,
      value,
    } = e.target;

    setProfile({
      ...profile,
      [name]: value,
    });
  };

  // =========================
  // SAVE PROFILE
  // =========================

  const handleProfileSubmit =
    async (e) => {
      e.preventDefault();

      setMessage("");

      try {
        const response = await fetch(
          `${API_URL}/profile`,
          {
            method: "PUT",
            headers: {
              "Content-Type":
                "application/json",
              Authorization:
                `Bearer ${token}`,
            },
            body: JSON.stringify(
              profile
            ),
          }
        );

        const data =
          await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ||
              "Profile update failed."
          );
        }

        setMessage(
          "Profile updated successfully! ✅"
        );

        await fetchProfile();
      } catch (error) {
        console.error(
          "Profile update error:",
          error
        );

        setMessage(
          error.message ||
            "Something went wrong."
        );
      }
    };

  // =========================
  // PROJECT FORM CHANGE
  // =========================

  const handleProjectChange = (
    e
  ) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setProjectForm({
      ...projectForm,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    });
  };

  // =========================
  // ADD / UPDATE PROJECT
  // =========================

  const handleProjectSubmit =
    async (e) => {
      e.preventDefault();

      setMessage("");

      try {
        const url = editingProjectId
          ? `${API_URL}/projects/${editingProjectId}`
          : `${API_URL}/projects`;

        const method =
          editingProjectId
            ? "PUT"
            : "POST";

        const response = await fetch(
          url,
          {
            method,
            headers: {
              "Content-Type":
                "application/json",
              Authorization:
                `Bearer ${token}`,
            },
            body: JSON.stringify(
              projectForm
            ),
          }
        );

        const data =
          await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ||
              "Project operation failed."
          );
        }

        setMessage(
          editingProjectId
            ? "Project updated successfully! ✅"
            : "Project added successfully! ✅"
        );

        setProjectForm({
          title: "",
          description: "",
          technologies: "",
          image: "",
          liveUrl: "",
          githubUrl: "",
          featured: false,
        });

        setEditingProjectId(null);

        await fetchProjects();
      } catch (error) {
        console.error(
          "Project submit error:",
          error
        );

        setMessage(
          error.message ||
            "Something went wrong."
        );
      }
    };

  // =========================
  // EDIT PROJECT
  // =========================

  const handleEditProject = (
    project
  ) => {
    setEditingProjectId(
      project._id
    );

    setProjectForm({
      title:
        project.title || "",
      description:
        project.description || "",
      technologies:
        Array.isArray(
          project.technologies
        )
          ? project.technologies.join(
              ", "
            )
          : project.technologies ||
            "",
      image:
        project.image || "",
      liveUrl:
        project.liveUrl || "",
      githubUrl:
        project.githubUrl || "",
      featured:
        project.featured || false,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================
  // DELETE PROJECT
  // =========================

  const handleDeleteProject =
    async (id) => {
      const confirmDelete =
        window.confirm(
          "Are you sure you want to delete this project?"
        );

      if (!confirmDelete) {
        return;
      }

      try {
        const response = await fetch(
          `${API_URL}/projects/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        const data =
          await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ||
              "Project delete failed."
          );
        }

        setMessage(
          "Project deleted successfully! 🗑️"
        );

        await fetchProjects();
      } catch (error) {
        console.error(
          "Project delete error:",
          error
        );

        setMessage(
          error.message ||
            "Something went wrong."
        );
      }
    };

  // =========================
  // DELETE CONTACT MESSAGE
  // =========================

  const handleDeleteMessage =
    async (id) => {
      const confirmDelete =
        window.confirm(
          "Are you sure you want to delete this message?"
        );

      if (!confirmDelete) {
        return;
      }

      try {
        const response = await fetch(
          `${API_URL}/contact/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        const data =
          await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ||
              "Message delete failed."
          );
        }

        setMessage(
          "Contact message deleted successfully! 🗑️"
        );

        await fetchContactMessages();
      } catch (error) {
        console.error(
          "Contact delete error:",
          error
        );

        setMessage(
          error.message ||
            "Something went wrong."
        );
      }
    };

  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {
    localStorage.removeItem(
      "portfolio_token"
    );

    localStorage.removeItem(
      "portfolio_admin"
    );

    window.location.href = "/login";
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="admin-page">
        <div className="admin-loading">
          Loading Admin Dashboard...
        </div>
      </div>
    );
  }

  // =========================
  // MAIN JSX
  // =========================

  return (
    <div className="admin-page">

      {/* =========================
          ADMIN NAVBAR
      ========================= */}

      <nav className="admin-navbar">

        <div className="admin-logo">
          Portfolio Admin
        </div>

        <button
          className="admin-logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </nav>

      {/* =========================
          ADMIN CONTAINER
      ========================= */}

      <main className="admin-container">

        {/* =========================
            HEADER
        ========================= */}

        <div className="admin-header">

          <div>
            <h1>
              Admin Dashboard
            </h1>

            <p>
              Manage your portfolio
              website.
            </p>
          </div>

        </div>

        {/* =========================
            MESSAGE
        ========================= */}

        {message && (
          <div className="admin-message">
            {message}
          </div>
        )}

        {/* =========================
            STATS
        ========================= */}

        <div className="admin-stats">

          <div className="admin-stat-card">
            <h3>
              {projects.length}
            </h3>

            <p>
              Total Projects
            </p>
          </div>

          <div className="admin-stat-card">
            <h3>
              {
                contactMessages.length
              }
            </h3>

            <p>
              Contact Messages
            </p>
          </div>

          <div className="admin-stat-card">
            <h3>
              Portfolio
            </h3>

            <p>
              Website Status
            </p>
          </div>

        </div>
                {/* =========================
            PROFILE MANAGEMENT
        ========================= */}

        <section className="admin-section">

          <div className="admin-section-header">

            <div>
              <h2>
                Profile Management
              </h2>

              <p>
                Update your portfolio
                profile information.
              </p>
            </div>

          </div>

          <form
            className="profile-form"
            onSubmit={
              handleProfileSubmit
            }
          >

            <div className="form-group">
              <label htmlFor="profile-name">
                Name
              </label>

              <input
                id="profile-name"
                name="name"
                type="text"
                value={
                  profile.name
                }
                onChange={
                  handleProfileChange
                }
                placeholder="Your name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="profile-role">
                Role
              </label>

              <input
                id="profile-role"
                name="role"
                type="text"
                value={
                  profile.role
                }
                onChange={
                  handleProfileChange
                }
                placeholder="MERN Stack Developer"
              />
            </div>

            <div className="form-group">
              <label htmlFor="profile-email">
                Email
              </label>

              <input
                id="profile-email"
                name="email"
                type="email"
                value={
                  profile.email
                }
                onChange={
                  handleProfileChange
                }
                placeholder="your@email.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="profile-github">
                GitHub URL
              </label>

              <input
                id="profile-github"
                name="github"
                type="url"
                value={
                  profile.github
                }
                onChange={
                  handleProfileChange
                }
                placeholder="https://github.com/yourusername"
              />
            </div>

            <div className="form-group">
              <label htmlFor="profile-linkedin">
                LinkedIn URL
              </label>

              <input
                id="profile-linkedin"
                name="linkedin"
                type="url"
                value={
                  profile.linkedin
                }
                onChange={
                  handleProfileChange
                }
                placeholder="https://linkedin.com/in/yourusername"
              />
            </div>

            <div className="form-group">
              <label htmlFor="profile-image">
                Profile Image URL
              </label>

              <input
                id="profile-image"
                name="profileImage"
                type="url"
                value={
                  profile.profileImage
                }
                onChange={
                  handleProfileChange
                }
                placeholder="https://..."
              />
            </div>

            <div className="form-group">
              <label htmlFor="profile-about">
                About
              </label>

              <textarea
                id="profile-about"
                name="about"
                rows="5"
                value={
                  profile.about
                }
                onChange={
                  handleProfileChange
                }
                placeholder="Write something about yourself..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="save-project-btn"
            >
              Save Profile
            </button>

          </form>

        </section>

        {/* =========================
            ADD / EDIT PROJECT
        ========================= */}

        <section className="admin-section">

          <div className="admin-section-header">

            <div>
              <h2>
                {editingProjectId
                  ? "Edit Project"
                  : "Add Project"}
              </h2>

              <p>
                Add or update your
                portfolio projects.
              </p>
            </div>

            {editingProjectId && (
              <button
                type="button"
                className="admin-add-btn"
                onClick={() => {
                  setEditingProjectId(
                    null
                  );

                  setProjectForm({
                    title: "",
                    description: "",
                    technologies:
                      "",
                    image: "",
                    liveUrl: "",
                    githubUrl:
                      "",
                    featured:
                      false,
                  });
                }}
              >
                Cancel Edit
              </button>
            )}

          </div>

          <form
            className="project-form"
            onSubmit={
              handleProjectSubmit
            }
          >

            <div className="form-group">
              <label htmlFor="project-title">
                Project Title
              </label>

              <input
                id="project-title"
                name="title"
                type="text"
                value={
                  projectForm.title
                }
                onChange={
                  handleProjectChange
                }
                placeholder="My Project"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="project-description">
                Description
              </label>

              <textarea
                id="project-description"
                name="description"
                rows="5"
                value={
                  projectForm.description
                }
                onChange={
                  handleProjectChange
                }
                placeholder="Project description..."
                required
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="project-technologies">
                Technologies
              </label>

              <input
                id="project-technologies"
                name="technologies"
                type="text"
                value={
                  projectForm.technologies
                }
                onChange={
                  handleProjectChange
                }
                placeholder="React, Node.js, MongoDB"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="project-image">
                Project Image URL
              </label>

              <input
                id="project-image"
                name="image"
                type="url"
                value={
                  projectForm.image
                }
                onChange={
                  handleProjectChange
                }
                placeholder="https://..."
              />
            </div>

            <div className="form-group">
              <label htmlFor="project-live">
                Live Demo URL
              </label>

              <input
                id="project-live"
                name="liveUrl"
                type="url"
                value={
                  projectForm.liveUrl
                }
                onChange={
                  handleProjectChange
                }
                placeholder="https://..."
              />
            </div>

            <div className="form-group">
              <label htmlFor="project-github">
                GitHub URL
              </label>

              <input
                id="project-github"
                name="githubUrl"
                type="url"
                value={
                  projectForm.githubUrl
                }
                onChange={
                  handleProjectChange
                }
                placeholder="https://github.com/..."
              />
            </div>

            <label className="featured-checkbox">

              <input
                type="checkbox"
                name="featured"
                checked={
                  projectForm.featured
                }
                onChange={
                  handleProjectChange
                }
              />

              <span>
                Featured Project
              </span>

            </label>

            <button
              type="submit"
              className="save-project-btn"
            >
              {editingProjectId
                ? "Update Project"
                : "Add Project"}
            </button>

          </form>

        </section>

        {/* =========================
            MANAGE PROJECTS
        ========================= */}

        <section className="admin-section">

          <div className="admin-section-header">

            <div>
              <h2>
                Manage Projects
              </h2>

              <p>
                Edit or delete existing
                projects.
              </p>
            </div>

          </div>

          <div className="admin-projects">

            {projects.length === 0 ? (
              <p className="admin-loading">
                No projects found.
              </p>
            ) : (
              projects.map(
                (project) => (
                  <div
                    className="admin-project-card"
                    key={
                      project._id
                    }
                  >

                    <div className="admin-project-info">

                      <h3>
                        {
                          project.title
                        }
                      </h3>

                      <p>
                        {
                          project.description
                        }
                      </p>

                      <div className="admin-tech">

                        {Array.isArray(
                          project.technologies
                        )
                          ? project.technologies.map(
                              (
                                tech,
                                index
                              ) => (
                                <span
                                  key={
                                    index
                                  }
                                >
                                  {tech}
                                </span>
                              )
                            )
                          : project.technologies}

                      </div>

                    </div>

                    <div className="admin-project-actions">

                      <button
                        type="button"
                        onClick={() =>
                          handleEditProject(
                            project
                          )
                        }
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleDeleteProject(
                            project._id
                          )
                        }
                      >
                        Delete
                      </button>

                    </div>

                  </div>
                )
              )
            )}

          </div>

        </section>
                {/* =========================
            CONTACT MESSAGES
        ========================= */}

        <section className="admin-section">

          <div className="admin-section-header">

            <div>
              <h2>
                📩 Contact Messages
              </h2>

              <p>
                Messages received from
                visitors.
              </p>
            </div>

            <button
              type="button"
              className="admin-add-btn"
              onClick={
                fetchContactMessages
              }
            >
              Refresh
            </button>

          </div>

          {contactLoading ? (
            <div className="admin-loading">
              Loading messages...
            </div>
          ) : contactMessages.length === 0 ? (
            <div className="admin-loading">
              No contact messages yet.
            </div>
          ) : (
            <div className="contact-messages">

              {contactMessages.map(
                (contact) => (
                  <div
                    className="contact-message-card"
                    key={
                      contact._id
                    }
                  >

                    {/* MESSAGE HEADER */}

                    <div className="contact-message-header">

                      <div>
                        <h3>
                          {contact.name}
                        </h3>

                        <a
                          href={`mailto:${contact.email}`}
                          className="contact-email"
                        >
                          {contact.email}
                        </a>
                      </div>

                      <span className="contact-date">
                        {contact.createdAt
                          ? new Date(
                              contact.createdAt
                            ).toLocaleString()
                          : "No date"}
                      </span>

                    </div>

                    {/* MESSAGE */}

                    <div className="contact-message-body">

                      <p>
                        {contact.message}
                      </p>

                    </div>

                    {/* ACTIONS */}

                    <div className="contact-message-actions">

                      <a
                        href={`mailto:${contact.email}`}
                        className="contact-reply-btn"
                      >
                        Reply
                      </a>

                      <button
                        type="button"
                        className="contact-delete-btn"
                        onClick={() =>
                          handleDeleteMessage(
                            contact._id
                          )
                        }
                      >
                        Delete
                      </button>

                    </div>

                  </div>
                )
              )}

            </div>
          )}

        </section>

      </main>

    </div>
  );
}

export default Admin;