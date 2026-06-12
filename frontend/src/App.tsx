import { useEffect, useState } from 'react'

function App() {

  const api_link = "http://127.0.0.1:8000/"
  const [list, setList] = useState([])
  
  useEffect(() => {
    fetch(api_link + "todos")
      .then(response => response.json())
      .then(data => {
        console.log("Data: ", data)
        setList(data);
      })
      .catch(error => {
        console.error('Ошибка11111:', error);
      });
  }, [])

  
  

  return (
    <>
      {
        list.map((item, index) => (
          <div key={item.id}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <span>{item.completed}</span>
          </div>
        ))
      }
    </>
  )
}

export default App
