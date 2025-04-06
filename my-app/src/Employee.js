import React from "react";

function Employee({ lastName, firstName, patronymic, salary }) {
  return (
    <p>
      Фамилия: <span>{lastName}</span>, Имя: <span>{firstName}</span>, Отчество:{" "}
      <span>{patronymic}</span>, Зарплата: <span>{salary}</span>
    </p>
  );
}

export default Employee;
