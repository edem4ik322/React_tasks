import React, { useState, useEffect, useRef, useMemo, useCallback, useContext, useTransition  } from 'react';
import { nanoid } from "nanoid";
import uuid from "react-uuid";
import User from "./User";
import { User1, User2, User3, User4 } from './User1';
import Employee from "./Employee";
import { styles } from './styles';
import styled from 'styled-components';
import { createContext } from 'react';

const MyContext = createContext(null);

const baseStyles = {
  container: { padding: '20px', fontFamily: 'Arial' },
  section: { marginBottom: '20px', border: '1px solid #ccc', padding: '10px', fontFamily: 'Arial' },
  h1: { fontSize: '24px', margin: '10px 0' },
  button: { margin: '5px', padding: '5px 10px' },
  input: { margin: '5px', padding: '5px' },
  nav: { display: 'flex', flexDirection: 'column' },
  link: { textDecoration: 'none', color: 'blue', margin: '5px 0' },
  activeLink: { fontWeight: 'bold', color: 'brown' },
  control: { display: 'flex', gap: '10px' },
  main: { display: 'flex', gap: '20px' },
};

const Container = styled.div`
  width: 300px;
  border: 2px solid black;
  padding: 20px;
  text-align: center;
`;

const Button1 = styled.button`
  background-color: blue;
  color: white;
  padding: 10px 20px;
  margin: 5px;
  border: none;
  cursor: pointer;
`;

const Button2 = styled(Button1)`
  background-color: green;
`;

const Container1 = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  gap: 10px;
`;

const Button3 = styled.button`
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  background-color: ${(props) => (props.disabled ? "gray" : "blue")};
  color: white;
  border: none;
  border-radius: 5px;
  opacity: ${(props) => (props.disabled ? 0.6 : 1)};
`;

const Button10511 = styled.button`
  background-color: ${(props) => (props.$warn ? 'yellow' : 'green')};
  color: ${(props) => (props.$warn ? 'red' : 'white')};
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const DIVA_106_1 = styled.div`
  width: 150px;
  height: 150px;
  background-color: yellow;
  border: 2px solid;
`;

const DIVB_106_2 = styled(DIVA_106_1)`
  background-color: green;
  border-width: 3px;
`;

const Container1063 = styled.div`
  display: flex;
  flex-direction: column;
  width: 150px;
`;

const initDate = {
  year: 2025,
  month: 12,
  day: 31,
};

const Task5 = () => {
  const [username, setUsername] = useState('');
  useEffect(() => {
    localStorage.setItem('username_task5', username);
  }, [username]);
  return (
      <div style={baseStyles.section}>
        <h1 style={baseStyles.h1}>5: Запись имени в localStorage</h1>
        <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Введите имя"
            style={baseStyles.input}
        />
        <p>Имя сохраняется в localStorage (ключ: username_task5)</p>
      </div>
  );
};

const Task6 = () => {
  const [bgColor, setBgColor] = useState('white');
  const [isBlockVisible, setIsBlockVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (sectionRef.current && sectionRef.current.contains(e.target)) {
        setBgColor(bgColor === 'white' ? 'lightgray' : 'white');
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [bgColor]);

  const toggleBlock = (e) => {
    e.stopPropagation();
    setIsBlockVisible(!isBlockVisible);
  };

  return (
      <div ref={sectionRef} style={{ ...baseStyles.section, backgroundColor: bgColor }}>
        <h1 style={baseStyles.h1}>6: Смена фона и показ/скрытие блока</h1>
        <p>Кликните внутри секции, чтобы сменить фон</p>
        <button onClick={toggleBlock} style={baseStyles.button}>
          {isBlockVisible ? 'Скрыть блок' : 'Показать блок'}
        </button>
        {isBlockVisible && (
            <div style={{ background: 'lightblue', padding: '10px', marginTop: '10px' }}>
              Этот блок показывается/скрывается по кнопке
            </div>
        )}
      </div>
  );
};

const Task9 = () => {
  const Parent = () => <Daughter />;
  const Daughter = () => {
    const age = useContext(MyContext);
    return (
        <div>
          <p>Возраст из контекста: {age}</p>
          <Grandson />
        </div>
    );
  };
  const Grandson = () => {
    const age = useContext(MyContext);
    return <p>Возраст / 2: {age / 2}</p>;
  };
  return (
      <div style={baseStyles.section}>
        <h1 style={baseStyles.h1}>9: Передача возраста через контекст</h1>
        <MyContext.Provider value={42}>
          <Parent />
        </MyContext.Provider>
      </div>
  );
};

const Task10 = () => {
  const [age, setAge] = useState(50);
  return (
      <div style={baseStyles.section}>
        <h1 style={baseStyles.h1}>10: Обновление контекста</h1>
        <MyContext.Provider value={age}>
          <p>Текущий возраст: {age}</p>
          <button onClick={() => setAge(age - 2)} style={baseStyles.button}>
            Уменьшить на 2
          </button>
        </MyContext.Provider>
      </div>
  );
};

const Task12 = () => {
  const [textState, setTextState] = useState('text');
  const [textRefDisplay, setTextRefDisplay] = useState('text');
  const textRef = useRef('text');

  const handleRefClick = () => {
    textRef.current += '!';
    setTextRefDisplay(textRef.current);
  };

  return (
      <div style={baseStyles.section}>
        <h1 style={baseStyles.h1}>12: Добавление ! с useState и useRef</h1>
        <p onClick={() => setTextState(textState + '!')} style={{ cursor: 'pointer' }}>
          {textState} (useState, кликните)
        </p>
        <p>{textRefDisplay} (useRef)</p>
        <button onClick={handleRefClick} style={baseStyles.button}>
          Добавить ! (useRef)
        </button>
      </div>
  );
};

const Task13 = () => {
  const inputRef = useRef(null);
  const handleFocusClear = () => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.value = '';
    }
  };
  return (
      <div style={baseStyles.section}>
        <h1 style={baseStyles.h1}>13: Фокус и очистка инпута</h1>
        <input ref={inputRef} style={baseStyles.input} placeholder="Введите текст" />
        <button onClick={handleFocusClear} style={baseStyles.button}>
          Фокус и очистка
        </button>
      </div>
  );
};

const Task14 = () => {
  const [text, setText] = useState('react');
  const [num, setNum] = useState(0);
  const triple = (n) => {
    let start = performance.now();
    while (performance.now() - start < 500) {}
    return n * 3;
  };
  const resultWithMemo = useMemo(() => triple(num), [num]);
  const resultWithoutMemo = triple(num);

  return (
      <div style={baseStyles.section}>
        <h1 style={baseStyles.h1}>14: useMemo для оптимизации</h1>
        <p onClick={() => setText(text + '!')} style={{ cursor: 'pointer' }}>
          {text} (кликните)
        </p>
        <p onClick={() => setNum(num + 1)} style={{ cursor: 'pointer' }}>
          Без useMemo: {resultWithoutMemo} (кликните)
        </p>
        <p onClick={() => setNum(num + 1)} style={{ cursor: 'pointer' }}>
          С useMemo: {resultWithMemo} (кликните)
        </p>
      </div>
  );
};

const Task15 = () => {
  const [name, setName] = useState('');
  const TextWithoutMemo = () => {
    console.log('Text without memo rendered');
    return <p>long text (без memo)</p>;
  };
  const TextWithMemo = React.memo(() => {
    console.log('Text with memo rendered');
    return <p>long text (с memo)</p>;
  });

  return (
      <div style={baseStyles.section}>
        <h1 style={baseStyles.h1}>15: memo для предотвращения рендера</h1>
        <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Введите имя"
            style={baseStyles.input}
        />
        <TextWithoutMemo />
        <TextWithMemo />
        <p>Откройте консоль, чтобы увидеть разницу в рендеринге</p>
      </div>
  );
};

const Task16 = () => {
  const [text, setText] = useState('text');
  const [products, setProducts] = useState([]);
  const addProductWithoutCallback = () => setProducts([...products, `Product ${products.length + 1}`]);
  const addProductWithCallback = useCallback(() => setProducts((prev) => [...prev, `Product ${prev.length + 1}`]), []);

  const ProductsWithoutMemo = ({ addItem }) => {
    console.log('Products without memo rendered');
    return (
        <div>
          <ul>{products.map((item, i) => <li key={i}>{item}</li>)}</ul>
          <button onClick={addItem} style={baseStyles.button}>
            Add Product (без memo)
          </button>
        </div>
    );
  };

  const ProductsWithMemo = React.memo(({ addItem }) => {
    console.log('Products with memo rendered');
    return (
        <div>
          <ul>{products.map((item, i) => <li key={i}>{item}</li>)}</ul>
          <button onClick={addItem} style={baseStyles.button}>
            Add Product (с memo и useCallback)
          </button>
        </div>
    );
  });

  return (
      <div style={baseStyles.section}>
        <h1 style={baseStyles.h1}>16: useCallback для стабильной функции</h1>
        <p onClick={() => setText(text + '!')} style={{ cursor: 'pointer' }}>
          {text} (кликните)
        </p>
        <ProductsWithoutMemo addItem={addProductWithoutCallback} />
        <ProductsWithMemo addItem={addProductWithCallback} />
        <p>Откройте консоль, чтобы увидеть разницу в рендеринге</p>
      </div>
  );
};

const Task17 = () => {
  const [isPending, startTransition] = useTransition();
  const [filterTerm, setFilterTerm] = useState('');
  const products = ['Product 1', 'Product 2', 'Item 3', 'Item 4'];
  const filteredProducts = useMemo(
      () => products.filter((p) => p.toLowerCase().includes(filterTerm.toLowerCase())),
      [filterTerm]
  );

  return (
      <div style={baseStyles.section}>
        <h1 style={baseStyles.h1}>17: useTransition для фильтрации</h1>
        <input
            value={filterTerm}
            onChange={(e) => startTransition(() => setFilterTerm(e.target.value))}
            placeholder="Фильтр продуктов"
            style={baseStyles.input}
        />
        {isPending && <p>Обновление...</p>}
        <ul>{filteredProducts.map((p, i) => <li key={i}>{p}</li>)}</ul>
      </div>
  );
};

const Task22_to_47 = () => {
  const [pathname, setPathname] = useState('/');
  const [students, setStudents] = useState([]);

  const getStudent = (id) => students.find((s) => s.id === id) || null;

  const createStudent = (e) => {
    e.preventDefault();
    const id = Math.random().toString(36).slice(2, 8);
    const newStudent = { id, name: `Student ${id}` };
    setStudents([newStudent, ...students]);
    setPathname(`/students/${id}`);
  };

  const updateStudent = (id, updates) => {
    setStudents(students.map((s) => (s.id === id ? { ...s, ...updates } : s)));
    setPathname(`/students/${id}`);
  };

  const deleteStudent = (id) => {
    setStudents(students.filter((s) => s.id !== id));
    setPathname('/');
  };

  const Root = () => (
      <div style={baseStyles.main}>
        <div id="menu">
          <form onSubmit={createStudent}>
            <button type="submit" style={baseStyles.button}>Add Student</button>
          </form>
          {students.length ? (
              <nav style={baseStyles.nav}>
                {students.map((student) => (
                    <a
                        key={student.id}
                        href={`/students/${student.id}`}
                        style={pathname === `/students/${student.id}` ? baseStyles.activeLink : baseStyles.link}
                        onClick={(e) => {
                          e.preventDefault();
                          setPathname(`/students/${student.id}`);
                        }}
                    >
                      {student.name || <i>Unnamed</i>}
                    </a>
                ))}
              </nav>
          ) : (
              <p><i>No students here...</i></p>
          )}
        </div>
      </div>
  );

  const Student = ({ student }) => (
      <div>
        <h2>Student Details</h2>
        <p>Name: {student?.name || <i>unnamed</i>}</p>
        <p>Surname: {student?.surname || <i>unknown</i>}</p>
        <p>Year: {student?.year || <i>unknown</i>}</p>
        <p>Specialty: {student?.specialty || <i>unknown</i>}</p>
        <div style={baseStyles.control}>
          <button onClick={() => setPathname(`/students/${student.id}/edit`)} style={baseStyles.button}>Edit</button>
          <button onClick={() => deleteStudent(student.id)} style={baseStyles.button}>Delete</button>
        </div>
        <a href="/" style={baseStyles.link} onClick={(e) => { e.preventDefault(); setPathname('/'); }}>
          Back to Home
        </a>
      </div>
  );

  const EditStudent = ({ student }) => {
    const handleSubmit = (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const updates = Object.fromEntries(formData);
      updateStudent(student.id, updates);
    };
    return (
        <form onSubmit={handleSubmit}>
          <h2>Edit Student</h2>
          <div>
            <label>Name: </label>
            <input defaultValue={student?.name} name="name" style={baseStyles.input} />
          </div>
          <div>
            <label>Surname: </label>
            <input defaultValue={student?.surname} name="surname" style={baseStyles.input} />
          </div>
          <div>
            <label>Year: </label>
            <input defaultValue={student?.year} name="year" style={baseStyles.input} />
          </div>
          <div>
            <label>Specialty: </label>
            <input defaultValue={student?.specialty} name="specialty" style={baseStyles.input} />
          </div>
          <button type="submit" style={baseStyles.button}>Save</button>
          <a href={`/students/${student.id}`} style={baseStyles.link} onClick={(e) => { e.preventDefault(); setPathname(`/students/${student.id}`); }}>
            Cancel
          </a>
        </form>
    );
  };

  const Index = () => (
      <div>
        <p>Hi, React Router!</p>
        <p>This is an application for my students :)</p>
        <a href="/" style={baseStyles.link} onClick={(e) => { e.preventDefault(); setPathname('/'); }}>
          Back to Home
        </a>
      </div>
  );

  const studentId = pathname.split('/')[2];
  const currentStudent = getStudent(studentId);

  return (
      <div style={baseStyles.section}>
        <h1 style={baseStyles.h1}>22-47: React Router</h1>
        {pathname === '/' && <Root />}
        {pathname === '/index' && <Index />}
        {pathname.startsWith('/students/') && !pathname.endsWith('/edit') && currentStudent && <Student student={currentStudent} />}
        {pathname.endsWith('/edit') && currentStudent && <EditStudent student={currentStudent} />}
        {pathname.startsWith('/students/') && !currentStudent && !pathname.endsWith('/edit') && (
            <div>
              <h2>404 Not Found</h2>
              <p>Студент не найден</p>
              <a href="/" style={baseStyles.link} onClick={(e) => { e.preventDefault(); setPathname('/'); }}>
                Back to Home
              </a>
            </div>
        )}
      </div>
  );
};

function App() {
  const t13_1_1 = 'text1';
	const t13_1_2 = 'text1';
  const t14_1_1 = 'user';
	const t14_1_2  = '30';
  const t15_1_1 = [1, 2, 3, 4, 5];
  const t16_1_1 = {name: 'john', surname: 'smit'};
  const t17_1_1 = 'block'
  const t19_1_1 = <li>text1</li>;
	const t19_1_2 = <li>text2</li>;
	const t19_1_3 = <li>text3</li>;
  const t20_1_1 =( <ul>
  <li>text1</li>
  <li>text2</li>
  <li>text3</li>
  </ul>
  )
  const t24_1_1 = 3;
	const t24_1_2 = 2;
  const t24_2_1 = 'john';
	const t24_2_2 = 'smit';
  const t24_3_1 = 4;
  let t26_1_1_1;
  let t26_1_1_2;
	const t26_1_1_show = true;

	if (t26_1_1_show) {
		t26_1_1_1 = <p>text1</p>;
	}
  const t26_1_1_show2 = false;

	if (t26_1_1_show2) {
		t26_1_1_2 = <p>text2</p>;
	}
  const t27_1_1 = true;
  const t28_1_1 = 19;
  const t29_1_1 = true;
  const t30_1_1 = false;
  function t31_1_1(t_31_1_2) {
    return String(t_31_1_2)
      .split("")
      .reduce((t_31_1_2, digit) => t_31_1_2 + Number(digit), 0);
  }
  const t31_1_1_sum = t31_1_1(123);
  const t32_1_1_sum = t31_1_1(12345);
	function t33_1_1_1() {
		alert(1);
	}
	function t33_1_1_2() {
		alert(2);
	}
  function t34_1_1_1() {alert(1);}
  function t34_1_1_2() {alert(2);}
  function t34_1_1_3() {alert(3);}

  function t35_1_1(event) {
    console.log(event);
  }
  function t35_1_2(event) {
    console.log(event.target);
  }
  function t36_2_1(arg1, arg2) {
		console.log(arg1, arg2);
	}
  function t36_3_1(even, arg1, arg2) {
		console.log(even, arg1, arg2);
	}
  function t36_4_1(arg1, even, arg2) {
		console.log(arg1, even, arg2);
	}

  const t37_1_1 = [
    <li key="1">1</li>,
    <li key="2">2</li>,
    <li key="3">3</li>,
    <li key="4">4</li>,
    <li key="5">5</li>,
  ];

  const t38_1_1 = [];
  for (let i = 1; i <= 5; i++) {
    t38_1_1.push(<li key={i}>{i}</li>);
  }

  const t39_1_1_1 = ['a', 'b', 'c', 'd', 'e'];
  const t39_1_1_2 = t39_1_1_1.map(function(item, index) {
    return <li key={index}>{item}</li>;
  });

  const t40_1_1_1 = ['a', 'b', 'c', 'd', 'e'];
  const t40_1_1_2 = t40_1_1_1.map(function(item, s) {
		return <li key={s}> {item} </li>;
	});

  const t41_1_1_1 = [
    {name: 'user1', surn: 'surn1', age: 30},
    {name: 'user2', surn: 'surn2', age: 31},
    {name: 'user3', surn: 'surn3', age: 32},
  ];

  const t41_1_1_2 = t41_1_1_1.map(function(item, s) {
		return <li key={s}> {item.name}, {item.surn}, {item.age} </li>;
	});

  const t42_1_1_1 = [
    {id: 1, name: 'user1', surn: 'surn1', age: 30},
    {id: 2, name: 'user2', surn: 'surn2', age: 31},
    {id: 3, name: 'user3', surn: 'surn3', age: 32},
  ];

  const t42_1_1_2 = t42_1_1_1.map(function(item) {
		return <li key={item.id}> {item.name}, {item.surn}, {item.age} </li>;
	});

  const t43_1_1_1 = [
    {id: 1, name: 'user1', surn: 'surn1', age: 30},
    {id: 2, name: 'user2', surn: 'surn2', age: 31},
    {id: 3, name: 'user3', surn: 'surn3', age: 32},
  ];

  const t43_1_1_2 = t43_1_1_1.map(function(item) {
		return <tr key={item.id}>
			<td>{item.name}</td>
			<td>{item.surn}</td>
      <td>{item.age}</td>
		</tr>; })

  const t47_1_1 = nanoid();

  function t48_1_1() {
    return nanoid();
  }

  function t48_1_2() {
    return uuid();
  }

  const t49_1_1_1 = [
    {id: t48_1_2(), name: 'product1', cost: 100},
    {id: t48_1_2(), name: 'product2', cost: 200},
    {id: t48_1_2(), name: 'product3', cost: 300},
  ];

  const t49_1_1_2 = t49_1_1_1.map(function(item) {
		return <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>{item.cost}</td>
        </tr>;
  });

  const [t52_1_1] = useState('John');
  const [t52_1_2] = useState('Doe');
  const [t52_1_3] = useState(30);

const [t53_1_1, setName] = useState('click btn');

	function t53_1_2() {
		setName('123x');
	}
  function t53_1_3() {
		setName('x321');
	}

  const [t54_1_1, setBan] = useState(false);

  const [t54_2_1, setBan2] = useState(false);

  const [t55_1_1, setAge] = useState(21);

  const [t56_1_1, setText1] = useState('text');
  const [t56_1_2, setText2] = useState('text');

  const [t57_1_1, setText] = useState('asdg');

  function t57_1_2(event) {
    setText(event.target.value);
  }

  const [t58_1_1, setText3] = useState('10');

  function t58_1_2(event) {
    setText3(event.target.value);
  }

  const [t58_2_1, setText4] = useState('68');

  function t58_2_2(event) {
    setText4(event.target.value);
  }

  const [t59_1_1, setValue1] = useState(0);
  const [t59_1_2, setValue2] = useState(0);
  const [t59_1_3, setValue3] = useState(0);
  const [t59_1_4, setValue4] = useState(0);
  const [t59_1_5, setValue5] = useState(0);

  function handleChange1(event) {
    setValue1(+event.target.value);
  }

  function handleChange2(event) {
    setValue2(+event.target.value);
  }

  function handleChange3(event) {
    setValue3(+event.target.value);
  }

  function handleChange4(event) {
    setValue4(+event.target.value);
  }

  function handleChange5(event) {
    setValue5(+event.target.value);
  }

  const t59_1_1_1 = (t59_1_1 + t59_1_2 + t59_1_3 + t59_1_4 + t59_1_5) / 5;

  const [t60_1_1, setValue6] = useState(0);
	const [t60_1_2, setValue7] = useState(0);
	const [t60_1_3, setResult] = useState(0);

  const [t60_2_1, setT60_2_1] = useState('');
  const [t60_2_2, setT60_2_2] = useState('');
  const [t60_2_3, setT60_2_3] = useState(null);

  function handleCalculate() {
    const d1 = new Date(t60_2_1);
    const d2 = new Date(t60_2_2);
    const diffTime = Math.abs(d2 - d1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setT60_2_3(diffDays);
  }

  const [t60_3_1, setT60_3_1] = useState('');
  const [t60_3_2, setT60_3_2] = useState('');
  const [t60_3_3, setT60_3_3] = useState(null);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setT60_3_1(today);
    setT60_3_2(today);
  }, []);

  function handleCalculate1() {
    const d1 = new Date(t60_3_1);
    const d2 = new Date(t60_3_2);
    const diffTime = Math.abs(d2 - d1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setT60_3_3(diffDays);
  }

  const [t60_4_1, setT60_4_1] = useState('');
  const [t60_4_2, setT60_4_2] = useState(0);

  function handleBlur() {
    const sum = t60_4_1
      .split('')
      .reduce((acc, digit) => acc + parseInt(digit, 10), 0);
    setT60_4_2(sum);
  }

  const [t60_5_1, setT60_5_1] = useState('');
  const [t60_5_2, setT60_5_2] = useState(1);

  function handleBlur1() {
    const num = parseInt(t60_5_1, 10);
    if (num <= 1) {
      setT60_5_2(num);
      return;
    }

    let product = 1;
    for (let i = 1; i <= num; i++) {
      if (num % i === 0) {
        product *= i;
      }
    }

    setT60_5_2(product);
  }

  const [t60_6_1, setT60_6_1] = useState('');

  function handleChange_1(event) {
    setT60_6_1(event.target.value);
  }

  function toTranslit_1(str) {
    const translitMap = {
      а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'yo', ж: 'zh', з: 'z',
      и: 'i', й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r', с: 's',
      т: 't', у: 'u', ф: 'f', х: 'kh', ц: 'ts', ч: 'ch', ш: 'sh', щ: 'shch', ы: 'y',
      э: 'e', ю: 'yu', я: 'ya', ' ': ' ', ',': ',', '.': '.', ':': ':', ';': ';'
    };
    return str.split('').map(char => translitMap[char] || char).join('');
  }

  const [t60_6_2, setT60_6_2] = useState('');

  function handleChange_2(event) {
    setT60_6_2(event.target.value);
  }

  function sumNumbers_2(str) {
    const numbers = str.split('\n').map(line => parseFloat(line)).filter(num => !isNaN(num));
    return numbers.reduce((acc, num) => acc + num, 0);
  }

  const [t62_1_1_checked, t62_1_1_setChecked] = useState(false);
	const [t62_1_1_message, t62_1_1_setMessage] = useState('');

	function t62_1_2_handleClick() {
		t62_1_1_setMessage(t62_1_1_checked ? 'Привет, пользователь!' : 'До свидания!');
	}

  const [t62_2_1_htmlChecked, t62_2_1_setHtmlChecked] = useState(false);
	const [t62_2_2_cssChecked, t62_2_2_setCssChecked] = useState(false);
	const [t62_2_3_jsChecked, t62_2_3_setJsChecked] = useState(false);

  const [t63_1_1_checked, t63_1_1_setChecked] = useState(false);

  const [t63_2_1_checked, t63_2_1_setChecked] = useState(false);

  const [t64_1_1_value, t64_1_1_setValue] = useState('');

	function t64_1_2_handleChange(event) {
		t64_1_1_setValue(event.target.value);
	}

  const t65_1_1_texts = ['Казань', 'Сочи', 'Краснодар', 'Ростов-на-Дону'];
	const [t65_1_1_value, t65_1_1_setValue] = useState('');

	const t65_1_2_options = t65_1_1_texts.map((text, index) => {
		return <option key={index}>{text}</option>;
	});

  const [t66_1_1_value, t66_1_1_setValue] = useState('');

  const [t68_1_1_value, t68_1_1_setValue] = useState('1');

	function t68_1_2_changeHandler(event) {
		t68_1_1_setValue(event.target.value);
	}

  const [t68_2_1_value, t68_2_1_setValue] = useState('');

	function t68_2_2_changeHandler(event) {
		t68_2_1_setValue(event.target.value);
	}

  const [date, setDate] = useState(initDate);

  const getDayOfWeek = (year, month, day) => {
    const dateObj = new Date(year, month - 1, day); // Месяцы в Date начинаются с 0
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return daysOfWeek[dateObj.getDay()];
  };

  const handleChange = (prop, event) => {
    setDate({ ...date, [prop]: event.target.value });}

    const [notes, setNotes] = useState([1, 2, 3, 4, 5]);
    const [inputValue, setInputValue] = useState('');

    const addNote = () => {
      if (inputValue) {
        setNotes([...notes, inputValue]);
        setInputValue('');
      }
    };
    const result = notes.map((note, index) => {
      return <li key={index}>{note}</li>;
    });

    const [t74_1_1, sett74_1_1] = useState([1, 2, 3, 4, 5]);

    function t74_1_2(index) {
      let t74_1_3 = [...t74_1_1];
      t74_1_3[index] = t74_1_3[index] ** 2;
      sett74_1_1(t74_1_3);}

      const [t74_2_1, sett74_2_1] = useState([1, 2, 3, 4, 5]);

      function t74_2_2(index) {
        let t74_2_3 = [...t74_2_1];
        t74_2_3.splice(index, 1);
        sett74_2_1(t74_2_3);
      }

      const [t74_3_1] = useState([1, 2, 3, 4, 5]);
      const [t74_3_2, sett74_3_2] = useState('');

      function t74_3_3(index) {
        sett74_3_2(t74_3_1[index]);
      }

      const [t74_4_1, sett74_4_1] = useState([1, 2, 3, 4, 5]);
      const [t74_4_2, sett74_4_2] = useState('');
      const [t74_4_3, sett74_4_3] = useState(null);

      function t74_4_4(index) {
        sett74_4_3(index);
        sett74_4_2(t74_4_1[index]);
      }

      function t74_4_5() {
        let t74_4_6 = [...t74_4_1];
        t74_4_6[t74_4_3] = t74_4_2;
        sett74_4_1(t74_4_6);
      }

      const [t74_5_1, sett74_5_1] = useState([1, 2, 3, 4, 5]);

      function t74_5_2() {
        sett74_5_1([...t74_5_1].reverse());
      }

      const [t75_1_1, sett75_1_1] = useState([
        {
          id: 'GYi9G_uC4gBF1e2SixDvu',
          prop1: 'value11',
          prop2: 'value12',
          prop3: 'value13',
        },
        {
          id: 'IWSpfBPSV3SXgRF87uO74',
          prop1: 'value21',
          prop2: 'value22',
          prop3: 'value23',
        },
        {
          id: 'JAmjRlfQT8rLTm5tG2m1L',
          prop1: 'value31',
          prop2: 'value32',
          prop3: 'value33',
        },
      ]);

      function t75_1_2() {
        const t75_1_3 = {
          id: Math.random().toString(36).substr(2, 9),
          prop1: 'new1',
          prop2: 'new2',
          prop3: 'new3',
        };
        sett75_1_1([...t75_1_1, t75_1_3]);
      }

      const [t75_2_1, sett75_2_1] = useState([
        {
          id: 'GYi9G_uC4gBF1e2SixDvu',
          prop1: 'value11',
          prop2: 'value12',
          prop3: 'value13',
        },
        {
          id: 'IWSpfBPSV3SXgRF87uO74',
          prop1: 'value21',
          prop2: 'value22',
          prop3: 'value23',
        },
        {
          id: 'JAmjRlfQT8rLTm5tG2m1L',
          prop1: 'value31',
          prop2: 'value32',
          prop3: 'value33',
        },
      ]);

      const [t75_2_2, sett75_2_2] = useState('');
      const [t75_2_3, sett75_2_3] = useState('');
      const [t75_2_4, sett75_2_4] = useState('');

      function t75_2_5() {
        const t75_2_6 = {
          id: Math.random().toString(36).substr(2, 9),
          prop1: t75_2_2,
          prop2: t75_2_3,
          prop3: t75_2_4,
        };
        sett75_2_1([...t75_2_1, t75_2_6]);
        sett75_2_2('');
        sett75_2_3('');
        sett75_2_4('');
      }

      const [t76_1_1, sett76_1_1] = useState([
        { id: '1a', prop1: 'value1', prop2: 'value2', prop3: 'value3' },
        { id: '2b', prop1: 'value4', prop2: 'value5', prop3: 'value6' },
        { id: '3c', prop1: 'value7', prop2: 'value8', prop3: 'value9' },
      ]);

      function t76_1_2(id) {
        sett76_1_1(t76_1_1.filter((t76_1_3) => t76_1_3.id !== id));
      }

      const [t76_2_1] = useState([
        { id: '1a', prop1: 'value1', prop2: 'value2', prop3: 'value3' },
        { id: '2b', prop1: 'value4', prop2: 'value5', prop3: 'value6' },
        { id: '3c', prop1: 'value7', prop2: 'value8', prop3: 'value9' },
      ]);

      const [t76_2_2, sett76_2_2] = useState('');
      const [t76_2_3, sett76_2_3] = useState('');
      const [t76_2_4, sett76_2_4] = useState('');

      function t76_2_5(id) {
        const t76_2_6 = t76_2_1.find((t76_2_7) => t76_2_7.id === id);
        if (t76_2_6) {
          sett76_2_2(t76_2_6.prop1);
          sett76_2_3(t76_2_6.prop2);
          sett76_2_4(t76_2_6.prop3);
        }
      }

      const [t76_3_1, sett76_3_1] = useState([
        { id: '1a', prop1: 'value1', prop2: 'value2', prop3: 'value3' },
        { id: '2b', prop1: 'value4', prop2: 'value5', prop3: 'value6' },
        { id: '3c', prop1: 'value7', prop2: 'value8', prop3: 'value9' },
      ]);

      const [t76_3_2, sett76_3_2] = useState('');
      const [t76_3_3, sett76_3_3] = useState('');
      const [t76_3_4, sett76_3_4] = useState('');
      const [t76_3_5, sett76_3_5] = useState(null);

      function t76_3_6(id) {
        const t76_3_7 = t76_3_1.find((t76_3_8) => t76_3_8.id === id);
        if (t76_3_7) {
          sett76_3_2(t76_3_7.prop1);
          sett76_3_3(t76_3_7.prop2);
          sett76_3_4(t76_3_7.prop3);
          sett76_3_5(id);
        }
      }

      function t76_3_9() {
        if (t76_3_5) {
          sett76_3_1(
            t76_3_1.map((t76_3_10) =>
              t76_3_10.id === t76_3_5
                ? { ...t76_3_10, prop1: t76_3_2, prop2: t76_3_3, prop3: t76_3_4 }
                : t76_3_10
            )
          );
          sett76_3_5(null);
        }
      }

      const [t77_1_1, setT77_1_1] = useState([
        { id: 1, name: "name1", desc: "long description 1", show: false },
        { id: 2, name: "name2", desc: "long description 2", show: false },
        { id: 3, name: "name3", desc: "long description 3", show: false },
      ]);

      const t77_1_2 = (t77_1_3) => {
        setT77_1_1((t77_1_4) =>
          t77_1_4.map((t77_1_5) =>
            t77_1_5.id === t77_1_3 ? { ...t77_1_5, show: !t77_1_5.show } : t77_1_5
          )
        );
      };
      const lastName1 = "Смирнов";
      const firstName1 = "Алексей";
      const patronymic1 = "Александрович";
      const salary1 = "65000";

      const lastName2 = "Козлов";
      const firstName2 = "Дмитрий";
      const patronymic2 = "Сергеевич";
      const salary2 = "70000";

      const lastName3 = "Новиков";
      const firstName3 = "Михаил";
      const patronymic3 = "Игоревич";
      const salary3 = "68000";

      const users1 = [
        { id: 1, name: "user1", surn: "surn1", age: 30 },
        { id: 2, name: "user2", surn: "surn2", age: 31 },
        { id: 3, name: "user3", surn: "surn3", age: 32 },
      ];

      const userList = users1.map((user1) => (
        <User1 key={user1.id} name={user1.name} surn={user1.surn} age={user1.age} />
      ));

      const [users2] = useState([
        { id: 1, name: "user1", surname: "surn1", age: 30 },
        { id: 2, name: "user2", surname: "surn2", age: 31 },
        { id: 3, name: "user3", surname: "surn3", age: 32 },
      ]);

      const userList1 = users2.map((user2) => (
        <User2
          key={user2.id}
          name={user2.name}
          surname={user2.surname}
          age={user2.age}
        />
      ));

      const initUsers = [
        { id: 1, name: 'user1', surname: 'surn1', age: 30 },
        { id: 2, name: 'user2', surname: 'surn2', age: 31 },
        { id: 3, name: 'user3', surname: 'surn3', age: 32 },
      ];

      const [users3] = useState(initUsers);

      const userItems = users3.map(user3 => (
        <User3
          key={user3.id}
          id={user3.id}
          name={user3.name}
          surname={user3.surname}
          age={user3.age}
        />
      ));

      const initUsers1 = [
        { id: 1, name: 'user1', surname: 'surn1', age: 30, banned: false },
        { id: 2, name: 'user2', surname: 'surn2', age: 31, banned: false },
        { id: 3, name: 'user3', surname: 'surn3', age: 32, banned: false },
      ];

      const [users4, setUsers] = useState(initUsers1);

      // Функция для бана пользователя
      const banUser = (id) => {
        setUsers(users4.map(user4 =>
          user4.id === id ? { ...user4, banned: true } : user4
        ));
      };

      const [temperature, setTemperature] = useState({ fahrenheit: 32, celsius: 0 });

      const handleFahrenheitChange = (event) => {
        const fahrenheit = event.target.value;
        setTemperature({
          fahrenheit,
          celsius: fahrenheitToCelsius(fahrenheit),
        });
      };

      const handleCelsiusChange = (event) => {
        const celsius = event.target.value;
        setTemperature({
          celsius,
          fahrenheit: celsiusToFahrenheit(celsius),
        });
      };

  const [notes10_d, setNotes10_d] = useState([1, 2, 3, 4, 5]);
  const [value11_d, setValue11_d] = useState('');
  const [editIndex10_d, setEditIndex10_d] = useState(null);
  const [sum10_d, setSum10_d] = useState(15);

  function startEdit10_d(index10_d) {
    setEditIndex10_d(index10_d);
    setValue11_d(notes10_d[index10_d]);
  }

  function changeItem10_d(event10_d) {
    const updatedValue10_d = event10_d.target.value;
    setValue11_d(updatedValue10_d);

    const updatedNotes10_d = [...notes10_d];
    updatedNotes10_d[editIndex10_d] = updatedValue10_d;
    setNotes10_d(updatedNotes10_d);
  }

  function handleChange10_d(event10_d) {
    setValue11_d(event10_d.target.value);
  }

  function handleBlur10_d(event10_d) {
    setNotes10_d([...notes10_d, event10_d.target.value]);
    setSum10_d(getSum10_d([...notes10_d, event10_d.target.value]));
  }

  function getSum10_d(arr10_d) {
    return arr10_d.reduce((acc10_d, elem10_d) => acc10_d + Number(elem10_d), 0);
  }

  const class1 = {
    width: '300px',
    border: '2px solid black',
    padding: '20px',
    textAlign: 'center',
  };

  const class2 = {
    backgroundColor: 'blue',
    color: 'white',
    padding: '10px 20px',
    margin: '5px',
  };

  const class3 = {
    backgroundColor: 'green',
    color: 'white',
    padding: '10px 20px',
    margin: '5px',
  };

  // Для div:
  const wd1 = '300px';
  const br1 = '2px solid black';
  const pd1 = '20px';
  const ta1 = 'center';

  // Для первой кнопки:
  const bco1 = 'blue';
  const co1 = 'white';
  const pd2 = '10px 20px';
  const mg1 = '5px';

  // Для второй кнопки:
  const bco2 = 'green';

  return (
      <>

        <h1>Задание 7.1</h1>
        <div>
          NewText
        </div>

        <h1>Задание 7.2</h1>
        <div>
          NewText
        </div>
        <div>NewText</div>

        <h1>Задание 7.3</h1>
        <div className='test'>
          NewText
        </div>
        <div className='test2'>NewText</div>

        <h1>Задание 8.1</h1>
        <ul>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
              <li key={item}>{item}</li>
          ))}
        </ul>

        <h1>Задание 9.1</h1>
        <ul>
          <li>text1</li>
          <li>text2</li>
          <li>text3</li>
        </ul>

        <h1>Задание 10.1</h1>
        <ul>
          <li>text1</li>
          <li>text2</li>
          <li>text3</li>
        </ul>
        <ul>
          <li>text1</li>
          <li>text2</li>
          <li>text3</li>
        </ul>

        <h1>Задание 13.1</h1>
        <div>
          <p>{t13_1_1}</p>
          <p>{t13_1_2}</p>
        </div>

        <h1>Задание 14.1</h1>
        <div>
          name: {t14_1_1}
          age: {t14_1_2}
        </div>

        <h1>Задание 15.1</h1>
        <ul>
          <li>{t15_1_1[0]}</li>
          <li>{t15_1_1[1]}</li>
          <li>{t15_1_1[2]}</li>
          <li>{t15_1_1[3]}</li>
          <li>{t15_1_1[4]}</li>
        </ul>

        <h1>Задание 16.1</h1>
        <p>
          name: <span>{t16_1_1.name}</span>,
          surname: <span>{t16_1_1.surname}</span>,
        </p>

        <h1>Задание 17.1</h1>
        <div id={t17_1_1}>
          text
        </div>

        <h1>Задание 19.1</h1>
        <ul>
          {t19_1_1}
          {t19_1_2}
          {t19_1_3}
        </ul>

        <h1>Задание 20.1</h1>
        {t20_1_1}

        <h1>Задание 21.1</h1>
        <div>
          <input/> <br/> <input/>
        </div>

        <h1>Задание 23.1</h1>
        <div>
          <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
            <li>6</li>
            <li>7</li>
            <li>8</li>
            <li>9</li>
            <li>10</li>
          </ul>
        </div>

        <h1>Задание 23.2</h1>
        <div>
          <table>
            <tbody>
            <tr>
              <td>1</td>
              <td>2</td>
              <td>3</td>
            </tr>
            <tr>
              <td>4</td>
              <td>5</td>
              <td>6</td>
            </tr>
            <tr>
              <td>7</td>
              <td>8</td>
              <td>9</td>
            </tr>
            </tbody>
          </table>
        </div>

        <h1>Задание 24.1</h1>
        <div>
          {t24_1_1 + t24_1_2}
        </div>

        <h1>Задание 24.2</h1>
        <div>
          result: {t24_2_1 + ' ' + t24_2_2}
        </div>

        <h1>Задание 24.3</h1>
        <div>
          result: {Math.sqrt(t24_3_1)}
        </div>

        <h1>Задание 26.1</h1>
        {t26_1_1_1}
        {t26_1_1_2}

        <h1>Задание 27.1</h1>
        {t27_1_1 && (
            <div>
              <p>text</p>
              <p>text</p>
            </div>
        )}

        <h1>Задание 28.1</h1>
        <div>
          {t28_1_1 > 18 ? (
              <p>Вы совершеннолетний, доступ разрешен.</p>
          ) : (
              <p>Вам еще нет 18 лет, доступ запрещен.</p>
          )}
        </div>

        <h1>Задание 29.1</h1>
        <div>
          {t29_1_1 && <p>вы авторизованы</p>}
        </div>

        <h1>Задание 30.1</h1>
        <div>
          {!t30_1_1 && <p>вы авторизованы</p>}
        </div>

        <h1>Задание 31.1</h1>
        <div>{t31_1_1_sum}</div>

        <h1>Задание 31.1</h1>
        <div>{t31_1_1_sum}</div>

        <h1>Задание 32.1</h1>
        <p>{t32_1_1_sum}</p>

        <h1>Задание 33.1</h1>
        <div>
          <button onClick={t33_1_1_1}>act1</button>
          <button onClick={t33_1_1_2}>act2</button>
        </div>
        ;

        <h1>Задание 34.1</h1>
        <div>
          <button onClick={t34_1_1_1}>act1</button>
          <button onClick={t34_1_1_2}>act2</button>
          <button onClick={t34_1_1_3}>act3</button>
        </div>
        ;

        <h1>Задание 35.1</h1>
        <button onClick={t35_1_1}>click</button>

        <h1>Задание 35.2</h1>
        <button onClick={t35_1_2}>click</button>

        <h1>Задание 36.2</h1>
        <button onClick={() => t36_2_1('eee', 'yyy')}>act</button>

        <h1>Задание 36.3</h1>
        <button onClick={(even) => t36_3_1(even, 'eee', 'yyy')}>act</button>

        <h1>Задание 36.4</h1>
        <button onClick={(even) => t36_4_1('eee', even, 'yyy')}>act</button>

        <h1>Задание 37.1</h1>
        <ul>
          {t37_1_1}
        </ul>

        <h1>Задание 38.1</h1>
        <ul>
          {t38_1_1}
        </ul>

        <h1>Задание 39.1</h1>
        <ul>
          {t39_1_1_2}
        </ul>

        <h1>Задание 40.1</h1>
        <ul>
          {t40_1_1_2}
        </ul>

        <h1>Задание 41.1</h1>
        <ul>
          {t41_1_1_2}
        </ul>

        <h1>Задание 42.1</h1>
        <ul>
          {t42_1_1_2}
        </ul>

        <h1>Задание 43.1</h1>
        <table>
          <thead>
          <tr>
            <td>name</td>
            <td>surn</td>
            <td>age</td>
          </tr>
          </thead>
          <tbody>
          {t43_1_1_2}
          </tbody>
        </table>

        <h1>Задание 47.1</h1>
        <div>
          <h2>Random ID (nanoid):</h2>
          <p>{t47_1_1}</p>
        </div>

        <h1>Задание 48.1</h1>
        <div>
          <h2>Random ID (nanoid):</h2>
          <p>{t48_1_1()}</p>
        </div>

        <h1>Задание 48.2</h1>
        <div>
          <h2>Random ID (uuid):</h2>
          <p>{t48_1_2()}</p>
        </div>

        <h1>Задание 49.1</h1>
        <table>
          <thead>
          <tr>
            <td>id</td>
            <td>name</td>
            <td>cost</td>
          </tr>
          </thead>
          <tbody>
          {t49_1_1_2}
          </tbody>
        </table>

        <h1>Задание 52.1</h1>
        <div>
          <span>{t52_1_1} </span>
          <span>{t52_1_2} </span>
          <span>{t52_1_3}</span>
        </div>

        <h1>Задание 53.1</h1>
        <div>
          <span>{t53_1_1}</span> <br/>
          <button onClick={t53_1_2}>btn(123x)</button>
          <button onClick={t53_1_3}>btn(x321)</button>
        </div>

        <h1>Задание 54.1</h1>
        <div>
          <span>{t54_1_1 ? 'banned' : 'not banned'}</span> <br/>
          <button onClick={() => setBan(true)}>ban</button>
          <button onClick={() => setBan(false)}>unban</button>
        </div>

        <h1>Задание 54.2</h1>
        <div>
          <span>{t54_2_1 ? 'banned' : 'not banned'}</span> <br/>
          {!t54_2_1 && (<button onClick={() => setBan2(true)}>ban</button>)}
          {t54_2_1 && (<button onClick={() => setBan2(false)}>unban</button>)}
        </div>

        <h1>Задание 55.1</h1>
        <div>
          <span>{t55_1_1}</span> <br/>
          <button onClick={() => setAge(t55_1_1 + 1)}>+</button>
          <button onClick={() => setAge(t55_1_1 > 0 ? t55_1_1 - 1 : t55_1_1)}>-</button>
        </div>

        <h1>Задание 56.1</h1>
        <div>
          <input t56_1_1={t56_1_1} onChange={event => setText1(event.target.value)}/>
          <input t56_1_2={t56_1_2} onChange={event => setText2(event.target.value)}/>
          <p>text: {t56_1_1}</p>
          <p>text: {t56_1_2}</p>
        </div>

        <h1>Задание 57.1</h1>
        <div>
          <input value={t57_1_1} onChange={t57_1_2}/>
          <p>Количество символов: {t57_1_1.length}</p>
        </div>

        <h1>Задание 58.1</h1>
        <div>
          <input value={t58_1_1} onChange={t58_1_2}/>
          <p>Год рождения: {2025 - t58_1_1}</p>
        </div>


        <h1>Задание 58.2</h1>
        <div>
          <input value={t58_2_1} onChange={t58_2_2}/>
          <p>Фаренгейты в цельсиях: {((t58_2_1 - 32) * 5) / 9}</p>
        </div>

        <h1>Задание 59.1</h1>
        <div>
          <input type="number" value={t59_1_1} onChange={handleChange1}/>
          <input type="number" value={t59_1_2} onChange={handleChange2}/>
          <input type="number" value={t59_1_3} onChange={handleChange3}/>
          <input type="number" value={t59_1_4} onChange={handleChange4}/>
          <input type="number" value={t59_1_5} onChange={handleChange5}/>
          <p>Среднее арифметическое: {t59_1_1_1}</p>
        </div>

        <h1>Задание 60.1</h1>
        <div>
          <input value={t60_1_1} onChange={event => setValue6(event.target.value)}/>
          <input value={t60_1_2} onChange={event => setValue7(event.target.value)}/>

          <button onClick={() => setResult(Number(t60_1_1) + Number(t60_1_2))}>Сложение</button>
          <button onClick={() => setResult(Number(t60_1_1) - Number(t60_1_2))}>Вычитание</button>
          <p>result: {t60_1_3}</p>
        </div>

        <h1>Задание 60.2</h1>
        <div>
          <input type="date" value={t60_2_1} onChange={(e) => setT60_2_1(e.target.value)}/>
          <input type="date" value={t60_2_2} onChange={(e) => setT60_2_2(e.target.value)}/>
          <button onClick={handleCalculate}>Посчитать разницу</button>
          <p>Разница в днях: {t60_2_3 !== null ? t60_2_3 : 'Введите даты и нажмите кнопку'}</p>
        </div>

        <h1>Задание 60.3</h1>
        <div>
          <input type="date" value={t60_3_1} onChange={(e) => setT60_3_1(e.target.value)}/>
          <input type="date" value={t60_3_2} onChange={(e) => setT60_3_2(e.target.value)}/>
          <button onClick={handleCalculate1}>Посчитать разницу</button>
          <p>Разница в днях: {t60_3_3 !== null ? t60_3_3 : 'Введите даты и нажмите кнопку'}</p>
        </div>

        <h1>Задание 60.4</h1>
        <div>
          <input type="number" value={t60_4_1} onChange={(e) => setT60_4_1(e.target.value)} onBlur={handleBlur}/>
          <p>Сумма цифр: {t60_4_2}</p>
        </div>

        <h1>Задание 60.5</h1>
        <div>
          <input type="number" value={t60_5_1} onChange={(e) => setT60_5_1(e.target.value)} onBlur={handleBlur1}/>
          <p>Произведение делителей: {t60_5_2}</p>
        </div>

        <h1>Задание 61.1</h1>
        <div>
          <textarea value={t60_6_1} onChange={handleChange_1}/>
          <p>{toTranslit_1(t60_6_1)}</p>
        </div>

        <h1>Задание 61.2</h1>
        <div>
          <textarea value={t60_6_2} onChange={handleChange_2}/>
          <p>Сумма: {sumNumbers_2(t60_6_2)}</p>
        </div>

        <h1>Задание 62.1</h1>
        <div>
          <input type="checkbox" checked={t62_1_1_checked} onChange={() => t62_1_1_setChecked(!t62_1_1_checked)}/>
          <button onClick={t62_1_2_handleClick}>Кликни меня</button>
          <p>{t62_1_1_message}</p>
        </div>

        <h1>Задание 62.2</h1>
        <div>
          <label>
            <input type="checkbox" checked={t62_2_1_htmlChecked}
                   onChange={() => t62_2_1_setHtmlChecked(!t62_2_1_htmlChecked)}/>
            HTML
          </label>
          <p>HTML: {t62_2_1_htmlChecked ? 'Знаю' : 'Не знаю'}</p>

          <label>
            <input type="checkbox" checked={t62_2_2_cssChecked}
                   onChange={() => t62_2_2_setCssChecked(!t62_2_2_cssChecked)}/>
            CSS
          </label>
          <p>CSS: {t62_2_2_cssChecked ? 'Знаю' : 'Не знаю'}</p>

          <label>
            <input type="checkbox" checked={t62_2_3_jsChecked}
                   onChange={() => t62_2_3_setJsChecked(!t62_2_3_jsChecked)}/>
            JS
          </label>
          <p>JS: {t62_2_3_jsChecked ? 'Знаю' : 'Не знаю'}</p>
        </div>

        <div>
          <h1>Задание 63.1</h1>
          <input type="checkbox" checked={t63_1_1_checked} onChange={() => t63_1_1_setChecked(!t63_1_1_checked)}/>
          <div>
            {t63_1_1_checked ? (
                <div>
                  <h2>Ура, вам уже есть 18</h2>
                  <p>здесь расположен контент только для взрослых</p>
                </div>
            ) : (
                <div>
                  <p>увы, вам еще нет 18 лет:(</p>
                </div>
            )}
          </div>
        </div>

        <div>
          <h1>Задание 63.2</h1>
          <input type="checkbox" checked={t63_2_1_checked} onChange={() => t63_2_1_setChecked(!t63_2_1_checked)}/>
          <div>{t63_2_1_checked && <p>Этот абзац видим только если чекбокс отмечен</p>}</div>
        </div>

        <div>
          <h1>Задание 64.1</h1>
          <select value={t64_1_1_value} onChange={t64_1_2_handleChange}>
            <option value="Не ври, точно не Казань">Казань</option>
            <option value="Сочи">Сочи</option>
            <option value="Краснодар">Краснодар</option>
            <option value="Ростов-на-Дону">Ростов-на-Дону</option>
          </select>
          <p>ваш выбор: {t64_1_1_value}</p>
        </div>


        <div>
          <h1>Задание 65.1</h1>
          <select value={t65_1_1_value} onChange={(event) => t65_1_1_setValue(event.target.value)}>
            {t65_1_2_options}
          </select>
          <p>ваш выбор: {t65_1_1_value}</p>
        </div>

        <div>
          <h1>Задание 66.1</h1>
          <select value={t66_1_1_value} onChange={(event) => t66_1_1_setValue(event.target.value)}>
            <option value="0-12">от 0 до 12 лет</option>
            <option value="13-17">от 13 до 17 лет</option>
            <option value="18-25">от 18 до 25 лет</option>
            <option value="26+">старше 25 лет</option>
          </select>
          <p>
            {t66_1_1_value === '0-12' && 'Вы выбрали возрастную группу от 0 до 12 лет'}
            {t66_1_1_value === '13-17' && 'Вы выбрали возрастную группу от 13 до 17 лет'}
            {t66_1_1_value === '18-25' && 'Вы выбрали возрастную группу от 18 до 25 лет'}
            {t66_1_1_value === '26+' && 'Вы выбрали возрастную группу старше 25 лет'}
          </p>
        </div>

        <div>
          <h1>Задание 68.1</h1>
          <input
              type="radio"
              name="radio"
              value="1"
              checked={t68_1_1_value === '1'}
              onChange={t68_1_2_changeHandler}
          />
          <input
              type="radio"
              name="radio"
              value="2"
              checked={t68_1_1_value === '2'}
              onChange={t68_1_2_changeHandler}
          />
          <input
              type="radio"
              name="radio"
              value="3"
              checked={t68_1_1_value === '3'}
              onChange={t68_1_2_changeHandler}
          />
          <p>Выбранное значение: {t68_1_1_value}</p>
        </div>

        <div>
          <h1>Задание 68.2</h1>
          <input
              type="radio"
              name="language"
              value="JavaScript"
              checked={t68_2_1_value === 'JavaScript'}
              onChange={t68_2_2_changeHandler}
          />
          <label>JavaScript</label>

          <input
              type="radio"
              name="language"
              value="Python"
              checked={t68_2_1_value === 'Python'}
              onChange={t68_2_2_changeHandler}
          />
          <label>Python</label>

          <input
              type="radio"
              name="language"
              value="Ruby"
              checked={t68_2_1_value === 'Ruby'}
              onChange={t68_2_2_changeHandler}
          />
          <label>Ruby</label>

          <p>
            Ваш выбор: {t68_2_1_value}
            {t68_2_1_value === 'JavaScript' && <span> - Отличный выбор, JavaScript!</span>}
          </p>
        </div>

        <div>
          <h1>Задание 71</h1>
          <p>
            Год: {date.year}, Месяц: {date.month}, День: {date.day}, День
            недели: {getDayOfWeek(date.year, date.month, date.day)}
          </p>
          <input value={date.year} onChange={(e) => handleChange('year', e)}/>
          <input value={date.month} onChange={(e) => handleChange('month', e)}/>
          <input value={date.day} onChange={(e) => handleChange('day', e)}/>
        </div>

        <div>
          <h1>Задание 72</h1>
          <ul>
            {result}
          </ul>
          <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
          />
          <button onClick={addNote}>Добавить</button>
        </div>

        <h1>Задание 74.1</h1>
        <div>
          <ul>
            {t74_1_1.map((t74_1_4, t74_1_5) => (
                <li key={t74_1_5} onClick={() => t74_1_2(t74_1_5)}>
                  {t74_1_4}
                </li>
            ))}
          </ul>
        </div>

        <h1>Задание 74.2</h1>
        <div>
          <ul>
            {t74_2_1.map((t74_2_4, t74_2_5) => (
                <li key={t74_2_5}>
                  {t74_2_4}
                  <button onClick={() => t74_2_2(t74_2_5)}>Удалить</button>
                </li>
            ))}
          </ul>
        </div>

        <h1>Задание 74.3</h1>
        <div>
          <ul>
            {t74_3_1.map((t74_3_4, t74_3_5) => (
                <li key={t74_3_5} onClick={() => t74_3_3(t74_3_5)}>
                  {t74_3_4}
                </li>
            ))}
          </ul>
          <input value={t74_3_2} onChange={(e) => sett74_3_2(e.target.value)}/>
        </div>

        <h1>Задание 74.4</h1>
        <div>
          <ul>
            {t74_4_1.map((t74_4_7, t74_4_8) => (
                <li key={t74_4_8} onClick={() => t74_4_4(t74_4_8)}>
                  {t74_4_7}
                </li>
            ))}
          </ul>
          <input
              value={t74_4_2}
              onChange={(e) => sett74_4_2(e.target.value)}
              onBlur={t74_4_5}
          />
        </div>
        <h1>Задание 74.5</h1>
        <div>
          <ul>
            {t74_5_1.map((t74_5_3, t74_5_4) => (
                <li key={t74_5_4}>{t74_5_3}</li>
            ))}
          </ul>
          <button onClick={t74_5_2}>Перевернуть порядок</button>
        </div>

        <h1>Задание 75.1</h1>
        <div>
          <ul>
            {t75_1_1.map((t75_1_4) => (
                <li key={t75_1_4.id}>
                  <span>{t75_1_4.prop1}</span>
                  <span>{t75_1_4.prop2}</span>
                  <span>{t75_1_4.prop3}</span>
                </li>
            ))}
          </ul>
          <button onClick={t75_1_2}>Добавить элемент</button>
        </div>

        <h1>Задание 75.2</h1>
        <div>
          <ul>
            {t75_2_1.map((t75_2_7) => (
                <li key={t75_2_7.id}>
                  <span>{t75_2_7.prop1}</span>
                  <span>{t75_2_7.prop2}</span>
                  <span>{t75_2_7.prop3}</span>
                </li>
            ))}
          </ul>
          <input
              value={t75_2_2}
              onChange={(e) => sett75_2_2(e.target.value)}
              placeholder="Prop1"
          />
          <input
              value={t75_2_3}
              onChange={(e) => sett75_2_3(e.target.value)}
              placeholder="Prop2"
          />
          <input
              value={t75_2_4}
              onChange={(e) => sett75_2_4(e.target.value)}
              placeholder="Prop3"
          />
          <button onClick={t75_2_5}>Добавить элемент</button>
        </div>

        <h1>Задание 76.1</h1>
        <div>
          <ul>
            {t76_1_1.map((t76_1_4) => (
                <li key={t76_1_4.id}>
                  <span>{t76_1_4.prop1}</span>
                  <span>{t76_1_4.prop2}</span>
                  <span>{t76_1_4.prop3}</span>
                  <button onClick={() => t76_1_2(t76_1_4.id)}>Удалить</button>
                </li>
            ))}
          </ul>
        </div>
        <h1>Задание 76.2</h1>
        <div>
          <ul>
            {t76_2_1.map((t76_2_8) => (
                <li key={t76_2_8.id}>
                  <span>{t76_2_8.prop1}</span>
                  <span>{t76_2_8.prop2}</span>
                  <span>{t76_2_8.prop3}</span>
                  <button onClick={() => t76_2_5(t76_2_8.id)}>Заполнить инпуты</button>
                </li>
            ))}
          </ul>
          <input value={t76_2_2} readOnly/>
          <input value={t76_2_3} readOnly/>
          <input value={t76_2_4} readOnly/>
        </div>
        <h1>Задание 76.3</h1>
        <div>
          <ul>
            {t76_3_1.map((t76_3_11) => (
                <li key={t76_3_11.id}>
                  <span>{t76_3_11.prop1}</span>
                  <span>{t76_3_11.prop2}</span>
                  <span>{t76_3_11.prop3}</span>
                  <button onClick={() => t76_3_6(t76_3_11.id)}>Заполнить инпуты</button>
                </li>
            ))}
          </ul>
          <input value={t76_3_2} onChange={(e) => sett76_3_2(e.target.value)}/>
          <input value={t76_3_3} onChange={(e) => sett76_3_3(e.target.value)}/>
          <input value={t76_3_4} onChange={(e) => sett76_3_4(e.target.value)}/>
          <button onClick={t76_3_9}>Обновить li</button>
        </div>

        <h1>Задание 77.1</h1>
        <div>
          {t77_1_1.map((t77_1_6) => (
              <p key={t77_1_6.id}>
                {t77_1_6.name}{" "}
                {t77_1_6.show && <i>{t77_1_6.desc}</i>}
                <button onClick={() => t77_1_2(t77_1_6.id)}>
                  {t77_1_6.show ? "Скрыть" : "Показать"}
                </button>
              </p>
          ))}
        </div>

        <h1>Задание 79.1</h1>
        <div>
          <User/>
        </div>

        <h1>Задание 80.1</h1>
        <div>
          <User/>
          <User/>
          <User/>
        </div>

        <h1>Задание 81.1</h1>
        <div>
          <Employee lastName="Смирнов" firstName="Алексей" patronymic="Александрович" salary="65000"/>
          <Employee lastName="Козлов" firstName="Дмитрий" patronymic="Сергеевич" salary="70000"/>
          <Employee lastName="Новиков" firstName="Михаил" patronymic="Игоревич" salary="68000"/>
        </div>

        <h1>Задание 82.1</h1>
        <div>
          <Employee
              lastName={lastName1}
              firstName={firstName1}
              patronymic={patronymic1}
              salary={salary1}
          />
          <Employee
              lastName={lastName2}
              firstName={firstName2}
              patronymic={patronymic2}
              salary={salary2}
          />
          <Employee
              lastName={lastName3}
              firstName={firstName3}
              patronymic={patronymic3}
              salary={salary3}
          />
        </div>

        <h1>Задание 83.1</h1>
        <div>
          <table border="1">
            <thead>
            <tr>
              <th>Имя</th>
              <th>Фамилия</th>
              <th>Возраст</th>
            </tr>
            </thead>
            <tbody>
            {users1.map((user1) => (
                <User1 key={user1.id} name={user1.name} surn={user1.surn} age={user1.age}/>
            ))}
            </tbody>
          </table>
        </div>

        <h1>Задание 84.1</h1>
        <div>
          <table border="1">
            <thead>
            <tr>
              <th>Имя</th>
              <th>Фамилия</th>
              <th>Возраст</th>
            </tr>
            </thead>
            <tbody>{userList}</tbody>
          </table>
        </div>

        <h1>Задание 85.1</h1>
        <div>{userList1}</div>
        ;

        <h1>Задание 86.1</h1>
        <div>{userItems}</div>
        ;


        <h1>Задание 87.1</h1>
        <div>
          {users4.map(user4 => (
              <User4
                  key={user4.id}
                  id={user4.id}
                  name={user4.name}
                  surname={user4.surname}
                  age={user4.age}
                  banned={user4.banned}
                  banUser={banUser}
              />
          ))}
        </div>

        <h1>Задание 96.1</h1>
        <div>
          <label>
            Температура в Фаренгейтах:
            <input
                type="number"
                value={temperature.fahrenheit}
                onChange={handleFahrenheitChange}
            />
          </label>
          <label>
            Температура в Цельсиях:
            <input
                type="number"
                value={temperature.celsius}
                onChange={handleCelsiusChange}
            />
          </label>
        </div>

        <div>
          <h1>Задание 96.2</h1>
          <div>
            <p>{sum10_d}</p>
            <input value={value11_d} onChange={handleChange10_d} onBlur={handleBlur10_d}/>
          </div>
          <h1>Задание 96.3</h1>
          <div>
            {notes10_d.map((note10_d, index10_d) => (
                <p key={index10_d} onClick={() => startEdit10_d(index10_d)}>
                  {note10_d}
                </p>
            ))}
            <input value={value11_d} onChange={changeItem10_d}/>
          </div>
        </div>

        <h1>Задание 99.1</h1>
        <div className="class1">
          <button className="class2">Button 1</button>
          <button className="class3">Button 2</button>
        </div>

        <h1>Задание 99.2</h1>
        <div style={class1}>
          <button style={class2}>Button 1</button>
          <button style={class3}>Button 2</button>
        </div>

        <h1>Задание 100.1</h1>
        <div style={styles.class1}>
          <button style={styles.class2}>Button 1</button>
          <button style={styles.class3}>Button 2</button>
        </div>

        <h1>Задание 101.1</h1>
        <div style={{
          width: '300px',
          border: '2px solid black',
          padding: '20px',
          textAlign: 'center'
        }}>
          <button style={{
            backgroundColor: 'blue',
            color: 'white',
            padding: '10px 20px',
            margin: '5px'
          }}>
            Button 1
          </button>
          <button style={{
            backgroundColor: 'green',
            color: 'white',
            padding: '10px 20px',
            margin: '5px'
          }}>
            Button 2
          </button>
        </div>

        <h1>Задание 102.1</h1>
        <div style={{
          width: wd1,
          border: br1,
          padding: pd1,
          textAlign: ta1
        }}>
          <button style={{
            backgroundColor: bco1,
            color: co1,
            padding: pd2,
            margin: mg1
          }}>
            Button 1
          </button>
          <button style={{
            backgroundColor: bco2,
            color: co1,
            padding: pd2,
            margin: mg1
          }}>
            Button 2
          </button>
        </div>

        <h1>Задание 103.1</h1>
        <Container>
          <Button1>Button 1</Button1>
          <Button2>Button 2</Button2>
        </Container>

        <h1>Задание 104.1</h1>
        <Container1>
          <Button3 disabled>Disabled Button</Button3>
          <Button3>Normal Button</Button3>
          <Button3 type="reset">Reset Button</Button3>
        </Container1>

        <h1>Задание 105.1</h1>
        <div>
          <Button10511>Normal Button</Button10511>
          <Button10511 $warn>Warning Button</Button10511>
        </div>

        <h1>Задание 106</h1>
        <Container1063>
          <DIVA_106_1>DIV A</DIVA_106_1>
          <DIVB_106_2>DIV B</DIVB_106_2>
          <DIVA_106_1>DIV A</DIVA_106_1>
        </Container1063>

        <h1>Высший учебник React</h1>
        <div style={baseStyles.container}>
          <Task5/>
          <Task6/>
          <Task9/>
          <Task10/>
          <Task12/>
          <Task13/>
          <Task14/>
          <Task15/>
          <Task16/>
          <Task17/>
          <Task22_to_47/>
        </div>

      </>
  );


}

function fahrenheitToCelsius(fahrenheit) {
  return (fahrenheit - 32) * (5 / 9);
}

function celsiusToFahrenheit(celsius) {
  return celsius * (9 / 5) + 32;
}

export default App;