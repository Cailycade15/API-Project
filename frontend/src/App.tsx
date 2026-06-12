import { useEffect, useState } from 'react'
import Show_List from "./Components/Show_List/Show_List"
import type { Todo, Todo_Add } from "./Types/Todo"
import cl from "./App.module.css"

function App() {

  const api_link = "http://127.0.0.1:8000/"

  const [list, setList] = useState<Todo[]>([])

  const updateList = () => {
    fetch(api_link + "todos")
    .then(response => response.json())
    .then(data => {
      setTimeout(() => {setList(data)}, 1000);
    })
    .catch(error => {
      console.error('Ошибка11111:', error);
    });
  }
  
  useEffect(() => {
    updateList()
  }, [])

  const add_todo = (item: Todo_Add) => {
    fetch(api_link + "add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: item.title,
        description: item.description,
        completed: item.completed
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log("Ответ сервера:", data);
        updateList()
      })
      .catch(error => {
        console.error('Ошибка11111:', error);
      });
  }

  const delete_todo = (id: number) => {
    fetch(api_link + "delete/" + id, {
      method: "DELETE",
    })
    .then(res => res.json())
    .then(data => {
      console.log("Ответ сервера:", data);
      updateList()
    })
    .catch(error => {
      console.error('Ошибка11111:', error);
    });
  }
  
  

  return (
    <>
      <Show_List list={list} add_todo={add_todo} delete_todo={delete_todo}/>
    </>
  )
}

export default App
