const Project = require("../models/Project");
const mongoose = require("mongoose");
const createProject = async (req, res) => {
  try {
    const project = await Project.create(req.body);

    res.status(201).json({
      message: "Project created successfully.",
      project,
    });
  } catch (error) {
    console.error("Create Project Error:", error);

    res.status(500).json({
      message: "Server error.",
    });
  }
};

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({
      createdAt: -1,
    });

    res.json({
      projects,
    });
  } catch (error) {
    console.error("Get Projects Error:", error);

    res.status(500).json({
      message: "Server error.",
    });
  }
};

const getProjectById = async (req, res) => {
  try {
          if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid project ID.",
      });
    }
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        message: "Project not found.",
      });
    }

    res.json({
      project,
    });
  } catch (error) {
    console.error("Get Project Error:", error);

    res.status(500).json({
      message: "Server error.",
    });
  }
};

const updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!project) {
      return res.status(404).json({
        message: "Project not found.",
      });
    }

    res.json({
      message: "Project updated successfully.",
      project,
    });
  } catch (error) {
    console.error("Update Project Error:", error);

    res.status(500).json({
      message: "Server error.",
    });
  }
};

const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(
      req.params.id
    );

    if (!project) {
      return res.status(404).json({
        message: "Project not found.",
      });
    }

    res.json({
      message: "Project deleted successfully.",
    });
  } catch (error) {
    console.error("Delete Project Error:", error);

    res.status(500).json({
      message: "Server error.",
    });
  }
};

module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
};