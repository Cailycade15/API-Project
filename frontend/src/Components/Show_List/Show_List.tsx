import type { Todo } from "../../Types/Todo"
import Edit_Text_Field from "../Edit_Text_Field/Edit_Text_Field"
import Loader from "../Loader/Loader"
import cl from "./Show_List.module.css"

type Props = {
  list: Todo[]
}

function Show_List({list}: Props) {

  return (
    <>
      <table>
        <thead>
          <tr>
            <td>Title</td>
            <td>Description</td>
            <td>Completed</td>
          </tr>
        </thead>

        <tbody>
        
        {
            !list || list.length === 0 ? (
            <tr>
                <td colSpan={3} style={{textAlign: "center"}}>
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
