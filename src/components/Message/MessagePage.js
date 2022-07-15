import Header from '../Header/Header'
import ConvoList from '../Message/ConvoList.js'
import Messages from '../Message/Messages.js'
import ConvoForm from '../Message/ConvoForm.js'
import '../Message/MessagePage.css'
import { useEffect, useState } from 'react'
import { useContext } from 'react'
import { loggedInUserContext } from '../../Helper/loggedInUserContext'
import client from '../../utils/client'


const MessagePage = () => { 
    const { loggedInUser } = useContext(loggedInUserContext)
    const [conversations, setConversations] = useState([])
    const [openConversation,  setOpenConversation] = useState()

   useEffect(() => {
        client
          .get(`/users/${loggedInUser.id}/conversations`)
          .then((res) => setConversations(res.data.data.conversations))
          .catch((err) => console.error(err.response));
      },[loggedInUser.id])

    return(
        <>
        <Header/>
        <div className='center-grid'>
        <div className="two-row-grid">
            <section className="nav-convo-form">
                <ConvoForm setConversations={setConversations}/>
            </section>
            <section className='two-column-grid'>
                <ConvoList conversations={conversations} setOpenConversation={setOpenConversation} setConversations={setConversations}/>
                <Messages openConversation={openConversation} setOpenConversation={setOpenConversation}/>
            </section>
        </div>
        </div>
        </>
    )
}

export default MessagePage