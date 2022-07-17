const asyncHandler = require('express-async-handler')

const membersDatabase = require("./members.mongo");

const getAllMembers = async () => {
  try {
    return await membersDatabase.find(
      {},
      {
        _id: 0,
        __v: 0,
      }
    );
  } catch (error) {
    console.error("Cannot get members", error);
  }
};

const getOneMemberById = async (id) => {
  const filter = { memberId: id }
  try {
    const memberById = await membersDatabase.findOne(
      filter,
      {
        _id: 0,
        __v: 0,
      }
    );
    return memberById
  } catch (error) {
    console.error(error);
  }
};

// TODO: capitalize first letter of firstName and lastName from the front end.
const getOneMemberByName = async (queriedMember) => {
  // const firstName = member.firstName.toLowerCase();
  // const lastName = member.lastName.toLowerCase();
  // const memberWithoutFirstNameLastName = Object.fromEntries(
  //   Object.entries(member).filter(([key, value]) => !key.includes("Name"))
  // );
  // // make firstName and lastName values lowercase for easy filtering and searching
  // const lowerMember = { firstName, lastName, memberWithoutFirstNameLastName };
  try {
    const memberByQueryParams = await membersDatabase.findOne(queriedMember, {
      _id: 0,
      __v: 0,
    });
    return memberByQueryParams
  } catch (error) {
    console.error(error);
  }
};

const saveMember = async (member) => {
  const newMember = new membersDatabase({ ...member });
  const alreadyFound = { error: "member already found" }
  // Save the document only if the member does not already exist in the database
  try {
    membersDatabase.findOne(
      {
        firstName: newMember.firstName,
        lastName: newMember.lastName,
      },
      (_, existingMember) => {
        if (!existingMember) {
          return newMember.save();
        }
      }
    );
  } catch (error) {
    console.error(`Can't add the user: ${error}`);
  }
};

const editMember = async (updatedMemberFields) => {
  const { memberId } = updatedMemberFields;

  const updatedMember = await getOneMemberById({id: memberId}) 
  if (!updatedMember) {
    throw new Error("The requested member does not exist")
  }  
  const filter = { memberId };
  const update = { ...updatedMemberFields };
  // Find a document with specified memberId and update with all provided values
  try {
    return await membersDatabase.findOneAndUpdate(filter, update);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getAllMembers,
  getOneMemberById,
  getOneMemberByName,
  saveMember,
  editMember,
};
