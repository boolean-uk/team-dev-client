import { useState } from "react"
import client from "../../utils/client"
import { useContext } from "react"
import { loggedInUserContext } from "../../Helper/loggedInUserContext"

const ConvoList = ({conversations, setOpenConversation, setConversations}) => {
    const { loggedInUser } = useContext(loggedInUserContext)
    const [activeId, setActiveId] = useState()
     
    const viewConversation = async(conversation) => { 
        await client
        .get(`/users/${loggedInUser.id}/conversations`)
        .then((res) => setConversations(res.data.data.conversations))
        .catch((err) => console.error(err.response));
        
        setOpenConversation(conversation)
        setActiveId(conversation.id)
    }
    return(
        <>
        <div className='convolist-container'>
            <ul className="centering-ul">
                {conversations?.length > 0 && conversations.map((conversation, index) => {
                    const { name, users } = conversation
                    return(
                        <li className={activeId === conversation.id ?'convo-list click-convo' : 'convo-list'} onClick={() => {viewConversation(conversation)}} key={index}>
                            {name} ({users.length})
                        </li>
                    )
                })}
            </ul>

        </div>
        </>
    )
}

export default ConvoList