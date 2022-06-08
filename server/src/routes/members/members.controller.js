const { v4: uuidv4 } = require("uuid");
const {
  saveMember,
  editMember,
  getAllMembers,
  getOneMemberById,
  getOneMemberByName,
} = require("../../models/members.model");

const httpGetAllMembers = async (req, res) => {
  return res.status(200).json(await getAllMembers());
};

const httpGetOneMemberById = async (req, res) => {
  const id = req.params;
  return res.status(200).json(await getOneMemberById(id));
};

const httpGetOneMemberByName = async (req, res) => {
  queriedMember = req.query // { firstName: 'Mark', lastName: 'Maksi' }
  const firstName = queriedMember.firstName.toLowerCase()
  const lastName = queriedMember.lastName.toLowerCase()
  lowerCaseQueriedMember = {firstName, lastName}
  return res.status(200).json(await getOneMemberByName(lowerCaseQueriedMember));
}

const httpAddNewMember = async (req, res) => {
  let member = req.body;
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
    res.status(400).json({ error: "required data is missing" });
  } else {
    const memberId = uuidv4();
    member = { memberId, ...member };
    await saveMember(member);
    res.status(201).json(member);
  }
};

const httpEditMember = async (req, res) => {
  const updatedMember = req.body;
  if (
    !updatedMember.memberId || // required for findOneAndUpdate filter property
    !updatedMember.generatedId ||
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

const httpRegisterMember = async (req, res) => {
  
  memberExists
}

const httpSignInMember = async (req, res) => {

  memberExists
}

module.exports = {
  httpGetAllMembers,
  httpGetOneMemberById,
  httpGetOneMemberByName,
  httpAddNewMember,
  httpEditMember,
  httpRegisterMember,
  httpSignInMember,
};

