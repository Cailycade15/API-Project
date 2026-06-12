import { useState } from 'react'
import cl from "./Edit_Text_Field.module.css"

type Props ={
    value: string,
    onSave: (newValue: string) => void;
}

function Edit_Text_Field({value, onSave}: Props) {

    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [text, setText] = useState<string>(value)

    const handleSave = () => {
        setIsEditing(false)
        onSave(text)
    }

  return (
    <>
        {
            isEditing ? (
                <input 
                    value={text}
                    autoFocus
                    onChange={(e) => setText(e.target.value)}
                    onBlur={handleSave}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") handleSave()
                    }}
                />
            )
            : (
                <span onClick={() => setIsEditing(true)}> {text}</span>
            )
        }
    </>
  )
}

export default Edit_Text_Field;
