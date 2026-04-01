import React, { useState } from "react";

function App() {
  const [form, setForm] = useState({
    username: "",
    useremail: "",
    userpassword: ""
  });

  const [message, setMessage] = useState({});

  // handle input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // validation
  const checkValidation = () => {
    let errors = {};

    if (!form.username.trim()) {
      errors.username = "Please enter your name";
    }

    if (!form.useremail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      errors.useremail = "Enter valid email format";
    }

    if (form.userpassword.length < 6) {
      errors.userpassword = "Password must be at least 6 characters";
    }

    setMessage(errors);
    return Object.keys(errors).length === 0;
  };

  // submit
  const submitForm = (e) => {
    e.preventDefault();

    if (checkValidation()) {
      alert("Submitted Successfully!");

      setForm({
        username: "",
        useremail: "",
        userpassword: ""
      });

      setMessage({});
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <h1>User Registration</h1>

      <form onSubmit={submitForm}>
        <div>
          <input
            type="text"
            name="username"
            placeholder="Name"
            value={form.username}
            onChange={handleChange}
          />
          {message.username && <p style={{ color: "red" }}>{message.username}</p>}
        </div>

        <div>
          <input
            type="text"
            name="useremail"
            placeholder="Email"
            value={form.useremail}
            onChange={handleChange}
          />
          {message.useremail && <p style={{ color: "red" }}>{message.useremail}</p>}
        </div>

        <div>
          <input
            type="password"
            name="userpassword"
            placeholder="Password"
            value={form.userpassword}
            onChange={handleChange}
          />
          {message.userpassword && <p style={{ color: "red" }}>{message.userpassword}</p>}
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default App;