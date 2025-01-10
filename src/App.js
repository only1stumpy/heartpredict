import React, {useState} from 'react';
import './App.css';
import logo_header from './img/logo_header.png';
import logo from './img/logo.png';

function App() {
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState({
    diseaseStatus: '',
    diseaseProbability: ''
  });
  const [formData, setFormData] = useState({
    age: '',
    sex: '',
    cp: '',
    trestbps: '',
    chol: '',
    fbs: '',
    restecg: '',
    thalach: '',
    exang: '',
    oldpeak: '',
    slope: '',
    ca: '',
    thal: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]:value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Отправляемые данные:', formData); // Лог перед отправкой

    // Проверка, что все поля заполнены
    const form = e.target;
    const isFormValid = form.checkValidity();

    if (!isFormValid) {
      alert("Пожалуйста, заполните все обязательные поля!");
      return;
    }

    try {
      // Отправка данных на сервер
      const response = await fetch('http://localhost:8000/predict_heart_disease', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setResults({
          diseaseStatus: data.result === "Вероятность заболевания сердца" ? 'Присутствует' : 'Отсутствует',
          diseaseProbability: 'Высокая вероятность' // Пример, нужно добавить логику для вероятности
        });

        setShowResults(true);
      } else {
        alert(`Ошибка: ${data.error_message}`);
      }
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
      alert("Произошла ошибка при отправке данных.");
    }
  };

  const handleClose = () => {
    setShowResults(false);
  };
  return (
    <div className='font-mont text-[#1D1B21] font-normal bg-[#FCF6F3]' id="start">
      <header className='w-full h-[100px] sticky top-0 z-50 bg-[#FFFBF9] flex items-center px-10 justify-between drop-shadow-md'>
        <img src={logo_header} alt='logo' className='bg-[#FCF6F3] p-1 rounded-xl' />
        <nav className='flex justify-between text-2xl w-[500px]'>
          <a href='#start' className='hover:bg-[#D01809] p-3 rounded-2xl duration-300 transition ease-in-out hover:text-[#FFFBF9]'>О нас</a>
          <a href='#sost' className='hover:bg-[#D01809] p-3 rounded-2xl duration-300 transition ease-in-out hover:text-[#FFFBF9]'>Проверить себя</a>
          <a href='#start' className='hover:bg-[#D01809] p-3 rounded-2xl duration-300 transition ease-in-out hover:text-[#FFFBF9]'>Контакты</a>
        </nav>
      </header>
        <div className='w-screen h-[820px] flex justify-center items-center text-2xl flex-col'>
          <img src={logo} alt='logo' />
          <p className='w-[1000px] text-center mt-6'>Heart Predict — это онлайн-платформа, которая использует искусственный
          интеллект для предсказания риска сердечно-сосудистых заболеваний. 
          Сайт позволяет пользователям пройти тест на основе их личных данных,
          таких как возраст, пол, уровень холестерина, давление и другие факторы,
          чтобы получить оценку состояния их сердечно-сосудистой системы.</p>
        </div>
        <div className='w-screen px-[250px]'>
          <h1 className='text-[#1D1B21] font-bold text-center text-4xl mb-[70px]' id="sost">Проверьте состояние своей<br/>
          сердечно-сосудистой системы</h1>
          <form className='p-6'onSubmit={handleSubmit}>
            <div className='mb-4 grid grid-cols-3 gap-4'>
              <div>
                <label htmlFor='age' className='block text-2xl font-normal mb-4'>Возраст</label>
                <input id='age' type='text' className='w-full p-3 border border-[#D1D5DB] rounded-xl h-14' placeholder='Введите ваш возраст' required value={formData.age} onChange={handleChange}/>
              </div>
              <div>
                <label htmlFor='sex' className='block text-2xl font-normal mb-4'>Пол</label>
                <select id='sex' className='w-full p-3 border border-[#D1D5DB] rounded-xl h-14' required value={formData.sex} onChange={handleChange}>
                  <option value="">Выберите</option>
                  <option value='1'>Мужской</option>
                  <option value='0'>Женский</option>
                </select>
              </div>
              <div>
                <label htmlFor='cp' className='block text-2xl font-normal mb-4'>Тип боли в груди</label>
                <input id='cp' type='text' className='w-full p-3 border border-[#D1D5DB] rounded-xl h-14' placeholder='Введите тип боли в груди' required value={formData.cp} onChange={handleChange}/>
              </div>
            </div>
            <div className='mb-4 grid grid-cols-2 gap-4'>
              <div>
                <label htmlFor='trestbps' className='block text-2xl font-normal mb-4'>Артериальное давление</label>
                <input id='trestbps' type='text' className='w-full p-3 border border-[#D1D5DB] rounded-xl h-14' placeholder='Введите артериальное давление в состоянии покоя' required value={formData.trestbps} onChange={handleChange}/>
              </div>
              <div>
                <label htmlFor='chol' className='block text-2xl font-normal mb-4'>Уровень холестерина</label>
                <input id='chol' type='text' className='w-full p-3 border border-[#D1D5DB] rounded-xl h-14' placeholder='Введите уровень холестерина' required value={formData.chol} onChange={handleChange}/>
              </div>
            </div>
            <div className='mb-4 grid grid-cols-2 gap-4'>
              <div>
                <label htmlFor='fbs' className='block text-2xl font-normal mb-4'>Уровень сахара в крови</label>
                <select id='fbs' className='w-full p-3 border border-[#D1D5DB] rounded-xl h-14' required value={formData.fbs} onChange={handleChange}>
                  <option value="">Выберите</option>
                  <option value='0'>Меньше 120 mg/ml</option>
                  <option value='1'>Больше 120 mg/ml</option>
                </select>
              </div>
              <div>
                <label htmlFor='restecg' className='block text-2xl font-normal mb-4'>Результаты ЭКГ</label>
                <input id='restecg' type='text' className='w-full p-3 border border-[#D1D5DB] rounded-xl h-14' placeholder='Введите результаты ЭКГ' required value={formData.restecg} onChange={handleChange}/>
              </div>
            </div>
            <div className='mb-4 grid grid-cols-2 gap-4'>
              <div>
                <label htmlFor='thalach' className='block text-2xl font-normal mb-4'>Макс. частота сердечных сокращений</label>
                <input id='thalach' type='text' className='w-full p-3 border border-[#D1D5DB] rounded-xl h-14' placeholder='Введите максимальную частоту сердечных сокращений' required value={formData.thalach} onChange={handleChange}/>
              </div>
              <div>
                <label htmlFor='exang' className='block text-2xl font-normal mb-4'>Наличие стенокардии</label>
                <select id='exang' className='w-full p-3 border border-[#D1D5DB] rounded-xl h-14' required value={formData.exang} onChange={handleChange}>
                  <option value="">Выберите</option>
                  <option value='0'>Стенокардия отсутствует</option>
                  <option value='1'>Стенокардия присутствует</option>
                </select>
              </div>
            </div>
            <div className='mb-4 grid grid-cols-2 gap-4'>
              <div>
                <label htmlFor='oldpeak' className='block text-2xl font-normal mb-4'>Депрессия ST</label>
                <input id='oldpeak' type='text' className='w-full p-3 border border-[#D1D5DB] rounded-xl h-14' placeholder='Введите депрессию ST, вызванную физической нагрузкой' required value={formData.oldpeak} onChange={handleChange}/>
              </div>
              <div>
                <label htmlFor='slope' className='block text-2xl font-normal mb-4'>Наклон сегмента ST</label>
                <input id='slope' type='text' className='w-full p-3 border border-[#D1D5DB] rounded-xl h-14' placeholder='Введите наклон сегмента ST на пике нагрузки' required value={formData.slope} onChange={handleChange}/>
              </div>
            </div>
            <div className='mb-4 grid grid-cols-2 gap-4'>
              <div>
                <label htmlFor='ca' className='block text-2xl font-normal mb-4'>Количество крупных сосудов</label>
                <input id='ca' type='text' className='w-full p-3 border border-[#D1D5DB] rounded-xl h-14' placeholder='Введите количество крупных сосудов' required value={formData.ca} onChange={handleChange}/>
              </div>
              <div>
                <label htmlFor='thal' className='block text-2xl font-normal mb-4'>Состояние таллия</label>
                <input id='thal' type='text' className='w-full p-3 border border-[#D1D5DB] rounded-xl h-14' placeholder='Введите состояние таллия' required value={formData.thal} onChange={handleChange}/>
              </div>
            </div>
            <button type='submit' className='mt-[54px] w-full py-3 bg-[#D01809] text-[#FCF6F3] font-bold text-2xl rounded-xl hover:bg-[#ff1500] transition duration-300'>
            Получить результат
            </button>
          </form>
        </div>
        {showResults && (
        <div className='fixed top-0 left-0 right-0 bottom-0 bg-[#00000090] flex justify-center items-center z-50'>
          <div className='bg-white p-6 rounded-xl'>
            <h2 className='text-xl font-bold mb-4'>Ваши результаты:</h2>
            <p className='mb-2'>
              Наличие сердечно-сосудистой болезни: {results.diseaseStatus}
            </p>
            <p className='mb-4'>
              Вероятность болезни: {results.diseaseProbability}
            </p>
            <button
              className='bg-[#D01809] text-white py-2 px-6 rounded-xl hover:bg-[#ff1500] transition duration-300'
              onClick={handleClose}
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
