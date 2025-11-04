import db from '../db.js';

// SKILL
const createSkill = async (skillForm, skillImage) => {
    return await db.Skill.create({
        title: skillForm.title,
        body: skillForm.description,
        image: skillImage
    })
}

const listSkills = async () => {
    return await db.Skill.find({});
}

const listSkill = async (id) => {
    return await db.Skill.findOne({_id: id})
}

const removeSkill = async (skillId) => await db.Skill.findOneAndDelete(skillId);

export default {
    createSkill,
    listSkills,
    listSkill,
    removeSkill
}