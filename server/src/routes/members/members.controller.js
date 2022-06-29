const { v4: uuidv4 } = require("uuid");
const {
  saveMember,
  editMember,
  getAllMembers,
  getOneMemberById,
  getOneMemberByName,
} = require("../../models/members.model");

const httpGetAllMembers = async (req, res) => {
  const allMembers = await getAllMembers()
  return res.status(200).json(allMembers);
};

const httpGetOneMemberById = async ({ params }, res) => {
  const memberById = await getOneMemberById(params);
  if (memberById === null) return res.status(404).json({error: "member not found"});
  return res.status(200).json(memberById);
};

const httpGetOneMemberByName = async ({query: queriedMember}, res) => {
  let { firstName, lastName } = queriedMember

  if (firstName && lastName) {
    const memberByQueryParams = await getOneMemberByName(queriedMember)
    if (memberByQueryParams === null) return res.status(404).json({error: "member not found"});
    return res.status(200).json(memberByQueryParams);
  }
  return res.status(400).json({ error: "firstName or lastName queries are missed" });
}

const httpAddNewMember = async ({body: member}, res) => {
  if (
    !member.generatedId ||
    !member.firstName ||
    !member.lastName ||
    !member.address ||
    !member.specification ||
    !member.supervisor ||
    !member.kpi ||
    member.isEmployee === undefined ||
    member.isIntern === undefined ||
    !member.hardSkills ||
    !member.softSkills ||
    !member.projects ||
    !member.duration ||
    !member.startDate ||
    !member.endDate
  ) {
    return res.status(400).json({ error: "required data is missing" });
  } else {
    const memberId = uuidv4();
    member = { memberId, ...member };
    await saveMember(member);
    return res.status(201).json(member);
  }
};

const httpEditMember = async (req, res) => {
  const updatedMember = req.body;
  if (
    !updatedMember.memberId || // required for findOneAndUpdate filter property
    !updatedMember.firstName ||
    !updatedMember.lastName ||
    !updatedMember.address ||
    !updatedMember.specification ||
    !updatedMember.supervisor ||
    !updatedMember.kpi ||
    updatedMember.isEmployee === undefined ||
    updatedMember.isIntern === undefined ||
    !updatedMember.hardSkills ||
    !updatedMember.softSkills ||
    !updatedMember.projects ||
    !updatedMember.duration ||
    !updatedMember.startDate ||
    !updatedMember.endDate
  ) {
    return res.status(400).json({ error: "required data is missing" });
  } else {
    await editMember(updatedMember);
    return res.status(201).json(updatedMember);
  }
};

module.exports = {
  httpGetAllMembers,
  httpGetOneMemberById,
  httpGetOneMemberByName,
  httpAddNewMember,
  httpEditMember,
};

