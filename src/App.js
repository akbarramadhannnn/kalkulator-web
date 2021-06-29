import { useState, useCallback } from 'react';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState([
    {
      value: '',
    },
    {
      value: '',
    },
    {
      value: '',
    },
  ]);
  const [inputCheckbox, setInputCheckbox] = useState([]);
  const [hasil, setHasil] = useState(0);

  const handleChangeInput = useCallback(
    (e, i) => {
      const { checked, value, type } = e.target;

      if (type === 'text') {
        if (isNaN(value)) return false;
        const oldState = [...inputValue];
        oldState[i].value = Number(value);
        setInputValue(oldState);
      }

      if (type === 'checkbox') {
        if (checked) {
          setInputCheckbox((oldState) => [...oldState, Number(value)]);
        } else {
          const dataFilter = inputCheckbox.filter(
            (item, i) => item !== Number(value)
          );
          setInputCheckbox(dataFilter);
        }
      }
    },
    [inputValue, inputCheckbox]
  );

  const handleTambah = useCallback((a, b) => {
    return a + b;
  }, []);

  const handleKurang = useCallback((a, b) => {
    return a - b;
  }, []);

  const handleKali = useCallback((a, b) => {
    return a * b;
  }, []);

  const handleBagi = useCallback((a, b) => {
    return a / b;
  }, []);

  const handleSubmitHasil = useCallback(
    (params) => {
      const data = [];
      var hasil;

      for (let i = 0; i < inputCheckbox.length; i++) {
        if (inputValue[inputCheckbox[i]]) {
          if (inputValue[inputCheckbox[i]].value !== '') {
            data.push(inputValue[inputCheckbox[i]].value);
          }
        }
      }

      if (data.length > 1) {
        if (params === 'tambah') {
          hasil = data.reduce(handleTambah);
        }

        if (params === 'kurang') {
          hasil = data.reduce(handleKurang);
        }

        if (params === 'kali') {
          hasil = data.reduce(handleKali);
        }

        if (params === 'bagi') {
          hasil = data.reduce(handleBagi);
        }
        setHasil(hasil);
      }

      if (data.length > 0 && data.length < 2) {
        setHasil(data[0]);
      }
    },
    [
      inputValue,
      inputCheckbox,
      handleTambah,
      handleKurang,
      handleKali,
      handleBagi,
    ]
  );

  return (
    <div className="App">
      <div className="card">
        {inputValue.map((d, i) => {
          return (
            <div key={i} className="input-area">
              <input
                type="text"
                name="text"
                value={d.value}
                onChange={(e) => handleChangeInput(e, i)}
              />

              <input
                type="checkbox"
                name="checkbox"
                checked={inputCheckbox.includes(i)}
                value={i}
                onChange={(e) => handleChangeInput(e, i)}
              />
            </div>
          );
        })}

        <div className="sum-area">
          <div>
            <button onClick={() => handleSubmitHasil('tambah')}>+</button>
          </div>

          <div>
            <button onClick={() => handleSubmitHasil('kurang')}>-</button>
          </div>

          <div>
            <button onClick={() => handleSubmitHasil('kali')}>x</button>
          </div>

          <div>
            <button onClick={() => handleSubmitHasil('bagi')}>/</button>
          </div>
        </div>

        <hr />

        <div className="hasil-area">
          <div>Hasil :</div>

          <div>{hasil}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
