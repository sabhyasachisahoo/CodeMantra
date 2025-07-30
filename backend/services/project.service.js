import mongoose from 'mongoose';
import projectModel from '../models/project.model.js';

export const createProject = async ({
    name, userId
}) => {
    if (!name) {
        throw new Error('Name is required')
    }
    if (!userId) {
        throw new Error('UserId is required')
    }

    let project;
    try {


        project = await projectModel.create({
            name,
            users: [userId]
        });


    } catch (error) {
        if (error.code === 11000) {
            console.log(error);
            // Duplicate key error, likely due to unique constraint on project name');
            throw new Error('Project name already exists');
        }
        throw error;
    }

    return project;



};

export const getAllProjects = async ({ userId }) => {
    if (!userId) {
        throw new Error('UserId is required');
    }

    const allUserProjects = await projectModel.find({
        users: userId
    })
    return allUserProjects;
}

export const addUserToProject = async ({ projectId, users, userId }) => {
    if (!projectId) {
        throw new Error('ProjectId is required');
    }
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        throw new Error('Invalid ProjectId');
    }
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new Error('Invalid UserId');
    }
    if (!users) {
        throw new Error('Users are required');
    }
    if (!userId) {
        throw new Error('Users are required');
    }
    if (!Array.isArray(users) || users.some(userId => !mongoose.Types.ObjectId.isValid(userId))) {
        throw new Error('Invalid UserId');
    }
    console.log(userId, projectId);

    const project = await projectModel.findOne({
        _id: projectId,
        users: userId // Ensure the user is part of the project
    });
    console.log(project);
    if (!project) {
        throw new Error('User not Belong to this Project');
    };

     const updatedProject = await projectModel.findOneAndUpdate({
        _id: projectId
    }, {
        $addToSet: {
            users: {
                $each: users
            }
        }
    }, {
        new: true
    })

    return updatedProject

};

export const getProjectById = async ({ projectId }) => {
    if (!projectId) {
        throw new Error("projectId is required")
    }

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        throw new Error("Invalid projectId")
    }

    const project = await projectModel.findOne({
        _id: projectId
    }).populate('users')

    return project;
}