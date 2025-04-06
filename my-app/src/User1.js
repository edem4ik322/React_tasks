import React from "react";

function User1({ name, surn, age }) {
  return (
    <tr>
      <td>{name}</td>
      <td>{surn}</td>
      <td>{age}</td>
    </tr>
  );
}

function User2({ name, surname, age }) {
  return (
    <div>
      <p>Имя: {name}</p>
      <p>Фамилия: {surname}</p>
      <p>Возраст: {age}</p>
    </div>
  );
}

function User3({ id, name, surname, age }) {
  return (
    <div>
      <p>ID: {id}</p>
      <p>Имя: {name}</p>
      <p>Фамилия: {surname}</p>
      <p>Возраст: {age}</p>
    </div>
  );
}

function User4({ id, name, surname, age, banned, banUser }) {
  return (
    <div>
      <p>Name: {name}</p>
      <p>Surname: {surname}</p>
      <p>Age: {age}</p>
      <p>Status: {banned ? 'Banned' : 'Active'}</p>
      {/* Кнопка для бана */}
      {!banned && <button onClick={() => banUser(id)}>Ban</button>}
    </div>
  );
}

export { User1, User2, User3, User4 };