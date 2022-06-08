import React, { useState } from "react";

const defaultUser = {
  userName: "",
  password: "",
};

const RegisterForm = () => {
  const [user, setUser] = useState(defaultUser);

  // TODO: change the submitHandler in the "SignInForm" component
  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        "https://immense-shelf-33121.herokuapp.com/v1/users/register",
        user
      );
      console.log(user, "user"); // TODO: check this should not log an empty object. Delete this line.
      // reset form after submission
      setUser(defaultUser);
    } catch (error) {
      // TODO: check if there is an error to let the user know through UI that only one admin can be created
    }
  };

  const changeHandler = (event) => {
    const { name, value } = event.target;
    // we used the same "name" and "value" names as the defaultUser object keys
    setUser({ ...defaultUser, [name]: value });
  };

  return (
    <form onSubmit={submitHandler}>
      <label>First Name</label>
      <input
        type="text"
        name="userName"
        value={user.userName}
        required
        onChange={changeHandler}
      />
      <input
        type="password"
        name="password"
        value={user.password}
        required
        onChange={changeHandler}
      />
    </form>
  );
};

export default RegisterForm;
