"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

const baseURL = "http://localhost:8080/api/v1/user";

interface User {
  id: number;
  name: string;
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState<User>({ id: "", name: "" });

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setUsers(response.data);
    });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios.post(baseURL, newUser).then((response) => {
      setUsers([...users, response.data]);
      setNewUser({ id: 0, name: "" });
    });
  };

  return (
      <div className="container mx-auto">
        <header className="py-5">
          <nav className="bg-white py-2 rounded-xl my-2">
            <ul className="flex flex-row gap-6">
              <li className="text-black">Home</li>
              <li className="text-black">Users</li>
              <li className="text-black">Services</li>
              <li className="text-black">Contact</li>
            </ul>
          </nav>
        </header>
        <h1>Users</h1>
        <form onSubmit={handleSubmit} className="my-4">
          <input
              type="text"
              name="id"
              value={newUser.id}
              onChange={handleInputChange}
              placeholder="User ID"
              className="border p-2 mr-2 text-black"
          />
          <input
              type="text"
              name="name"
              value={newUser.name}
              onChange={handleInputChange}
              placeholder="User Name"
              className="border p-2 mr-2 text-black"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Add User
          </button>
        </form>
        {users &&
            users.length > 0 &&
            users.map((user: User) => (
                <div key={user.id} className="my-4 bg-white rounded-2xl p-2">
                  <p className="text-black">User: {user.id}</p>
                  <p className="text-black">Password: {user.name}</p>
                </div>
            ))}
      </div>
  );
}