import { useState, useContext, useEffect} from "react"
import FeedbackContext from "../context/FeedbackContext"


function RatingSelect({select}) {

    const [selected, setSelected] = useState()

    const {feedbackEdit} = useContext(FeedbackContext)

    useEffect(() => {
        setSelected(feedbackEdit.item.rating)
    }, [feedbackEdit])


    const handleChange = (e) => {
        setSelected(+e.currentTarget.value)
        select(+e.currentTarget.value)
    }

  return (
    <ul className="rating">
        <li>
            <input 
            type="radio"
            id = "num1"
            name = "rating"
            value="1"
            onChange={handleChange}
            checked={selected === 1}
            />
            <label htmlFor="num1">1</label>
        </li>
        <li>
            <input 
            type="radio"
            id = "num10"
            name = "rating"
            value="10"
            onChange={handleChange}
            checked={selected === 10}
            />
            <label htmlFor="num10">10</label>
        </li>

    </ul>
  )
}

export default RatingSelect
