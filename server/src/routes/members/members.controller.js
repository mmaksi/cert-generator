const { v4: uuidv4 } = require("uuid");
const {
  saveMember,
  editMember,
  getAllMembers,
  getOneMemberById,
  getOneMemberByName,
} = require("../../models/members.model");

const httpGetAllMembers = async (req, res) => {
  try {
    const allMembers = await getAllMembers();
    return res.status(200).json(allMembers);
  } catch (error) {
    return res.status(500).json(error);    
  }
};

const httpGetOneMemberById = async ({ params }, res) => {
  if (!params.id) return res.status(400).json({ error: "memberId is not specified" });

  try {
    const memberById = await getOneMemberById(params.id);

    if (memberById === null)
      return res.status(404).json({ error: "member not found" });
    return res.status(200).json(memberById);

  } catch (error) {
    return res.status(500).json(error);
  }
};

const httpGetOneMemberByName = async ({ query: queriedMember }, res) => {
  let { firstName, lastName } = queriedMember;

  if (firstName && lastName) {
    try {
      const memberByQueryParams = await getOneMemberByName(queriedMember);
      if (memberByQueryParams === null)
        return res.status(404).json({ error: "member not found" });
      return res.status(200).json(memberByQueryParams);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  return res
    .status(400)
    .json({ error: "firstName or lastName queries are missing" });
};

const httpAddNewMember = async ({ body: member, user }, res) => {
  if (
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
    if (user.user === "admin") {
      const memberId = uuidv4();
      const generatedId = uuidv4().split("-")[0];
      member = { memberId, generatedId, ...member };

      const checkMemberExists = await getOneMemberByName({
        firstName: member.firstName,
        lastName: member.lastName,
      });

      if (checkMemberExists)
        return res.status(400).json({ error: "member already exists" });
      try {
        await saveMember(member);
      } catch (error) {
        return res.status(500).json(error);
      }
      return res.status(201).json(member);
    }
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
    const requestedMember = await getOneMemberById(updatedMember.memberId) 
    if (requestedMember) {
      await editMember(updatedMember);
      return res.status(201).json(updatedMember);
    }
    return res.status(404).json({ error: "requested member does not exist" });
  }
};

module.exports = {
  httpGetAllMembers,
  httpGetOneMemberById,
  httpGetOneMemberByName,
  httpAddNewMember,
  httpEditMember,
};
