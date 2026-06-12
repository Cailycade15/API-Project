import { useState } from "react"
import type { Todo, Todo_Add } from "../../Types/Todo"
import Edit_Text_Field from "../Edit_Text_Field/Edit_Text_Field"
import Loader from "../Loader/Loader"
import cl from "./Show_List.module.css"

type Props = {
  list: Todo[],
  add_todo: (newItem: Todo_Add) => void,
  delete_todo: (id: number) => void
}

function Show_List({list, add_todo, delete_todo}: Props) {

  const count_td = 4
  const [isAddBlock, setIsAddBlock] = useState<boolean>(false)

  const [newTitle, setNewTitle]             = useState<string>("")
  const [newDescription, setNewDescription] = useState<string>("")
  const [newCompleted, setNewCompleted]     = useState<string>("")

  

  return (
    <>
      <table>
        <thead>
          <tr>
            <td>Title</td>
            <td>Description</td>
            <td>Completed</td>
            <td>Action</td>
          </tr>
        </thead>

        <tbody>
        {
          isAddBlock ? (
            <tr>
              <td><input id="input_new_title" type="text" 
                          value = {newTitle}
                          onChange={(e) => setNewTitle(e.target.value)}/>
              </td>

              <td><input id="input_new_description" type="text"
                          value = {newDescription}
                          onChange={(e) => setNewDescription(e.target.value)}/>
              </td>

              <td><input id="input_new_completed" type="text"
                          value = {newCompleted}
                          onChange={(e) => setNewCompleted(e.target.value)}/>
              </td>

              <td><button className={cl.add_button} 
                          onClick={() => {
                            add_todo({title: newTitle, description: newDescription, completed: newCompleted})
                            setIsAddBlock(false)
                          }}
                        > Add </button>
              </td>
            </tr>
          )
          : (
            <tr><td colSpan={count_td} className={cl.add_todo_td_button} onClick={() => setIsAddBlock(true)}> ADD TODO </td></tr>
          )
        }
          
        {
            !list || list.length === 0 ? (
            <tr>
                <td colSpan={count_td} style={{textAlign: "center"}}>
                  <div style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%"
                    }}>
                    <Loader/>
                    </div>
                </td>
            </tr>
            ) : (
            list.map((item) => (
                <tr key={item.id}>
                <td><Edit_Text_Field 
                      value={item.title} 
                      onSave={(newValue) => {
                        console.log("save:", newValue)
                        // тут позже API update
                      }}
                    />
                </td>
                <td>
                  <Edit_Text_Field 
                      value={item.description} 
                      onSave={(newValue) => {
                        console.log("save:", newValue)
                        // тут позже API update
                      }}
                    />
                  </td>
                <td className={item.completed === "done" ? cl.done : cl.pending}>
                    {item.completed}
                </td>
                <td><button className={cl.delete_button} onClick={() => delete_todo(item.id)}>Delete</button></td>
              </tr>
            ))
            )
        }
        </tbody>
      </table>
    </>
  )
}

export default Show_List;
