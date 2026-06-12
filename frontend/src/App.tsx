import { useEffect, useState } from 'react'
import Show_List from "./Components/Show_List/Show_List"
import type { Todo } from "./Types/Todo"
import cl from "./App.module.css"

function App() {

  const api_link = "http://127.0.0.1:8000/"

  const [list, setList] = useState<Todo[]>([])
  
  useEffect(() => {
    fetch(api_link + "todos")
      .then(response => response.json())
      .then(data => {
        setTimeout(() => {setList(data)}, 1000);
      })
      .catch(error => {
        console.error('Ошибка11111:', error);
      });
  }, [])


  
  

  return (
    <>
      <Show_List list={list}/>
    </>
  )
}

export default App
