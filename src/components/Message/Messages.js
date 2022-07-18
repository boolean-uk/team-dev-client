import Button from '@mui/material/Button'
import TextareaAutosize from '@mui/material/TextareaAutosize'
import client from '../../utils/client'
import { useState } from 'react'
import { useContext } from 'react'
import { loggedInUserContext } from '../../Helper/loggedInUserContext'

const Messages = ({openConversation, setOpenConversation}) => {

    const { loggedInUser } = useContext(loggedInUserContext)
    const [messageContent, setMessageContent] = useState(' ')
    
    const textAreaChangeHandler =(event) =>{
        event.preventDefault()
        const {value , name} = event.target
        setMessageContent({
            [name] : value
        })
    }

    const sendMessage = async() => {
        const messageConvo = {content : messageContent.messageInput, userId: loggedInUser.id, conversationId: openConversation.id }
        try{
            const res = await client
              .post('/messages', messageConvo)
              setOpenConversation({...openConversation, messages:[...openConversation.messages, res.data.data]})
          }catch(error){
            console.error(error.response)
          }
          setMessageContent({...messageContent, messageInput: ' '})
    }
    
    return(
        <>
        <div className='message-board'>
         <ul>
            {openConversation?.messages?.length > 0 && openConversation.messages.map((message, index) =>{
                const { content, createdBy } = message 
                return(
                    <li className={loggedInUser.id === message.userId ? 'loggedInUser' : 'notLoggedInUser' } key={index}>
                        {content} ({createdBy}) 
                    </li>
                )
            })}
         </ul>
        <div className='message-form'>
            <form>
                <TextareaAutosize
                className='input-message-box'
                aria-label="empty textarea"
                placeholder='Insert your message here...'
                name='messageInput'
                onChange={textAreaChangeHandler}
                value={messageContent.messageInput}   
                />
            </form>
            <Button className='input-message-form'onClick={sendMessage}variant='contained'>Send Message</Button>
            </div>
        </div>
        
        </>
    )
}

export default Messages