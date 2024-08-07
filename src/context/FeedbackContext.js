import {createContext, useEffect, useState} from "react"


const FeedbackContext = createContext()

export const FeedbackProvider =  ({children}) => {

const [isLoading, setIsLoading] = useState(true)
const [feedback, setFeedback] = useState([])
const [feedbackEdit, setFeedbackEdit] = useState({
    item : {},
    edit: false,
})

useEffect(() => {
fetchFeedback()
}, [])

const fetchFeedback = async () => {
    const response = await fetch("/feedback")
    const data = await response.json()
    setFeedback(data)
    setIsLoading(false)
}

const deleteFeedback = (id) => {
    if(window.confirm("Are you sure you want to delete?")) {
        setFeedback(feedback.filter((item) => item.id !== id ))
    }
}

const addFeedback = async (newFeedback) => {
    const response = await fetch("/feedback", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newFeedback)
    })
    const data = await response.json()

    setFeedback([data, ...feedback])
}

const updateFeedback = (id, updItem) => {
setFeedback(feedback.map((item) => item.id === id ? {...item, ...updItem } : item))
}


const editFeedback = (item) => {
    setFeedbackEdit({
        item, 
        edit: true
    })
}


    return <FeedbackContext.Provider 
    value={{
        feedback, 
        deleteFeedback, 
        addFeedback, 
        editFeedback,
        feedbackEdit,
        updateFeedback,
        isLoading

        }}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext