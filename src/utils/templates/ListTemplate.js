import { Button } from '@mui/material';
import './style.css'
import { useNavigate } from 'react-router-dom';

const ListTemplate = ({ templateData, templateType }) => {
    const templateCode = templateType.charCodeAt(0)
    const navigate = useNavigate()

    const handleClick = (data) => {
        navigate(`/${templateType}/${data.id}`, { state: { data } })
    }

    return (
        <div className='content'>
            <header>
                <h1>{templateType}s</h1>
                <Button variant="contained" color="success">
                    Create new {templateType}
                </Button>
            </header>
            <main>
                {templateData.map(t => {
                    return (
                        <div key={templateCode + t.id} className='module'>
                            <h3 onClick={() => handleClick(t)}>
                                {t.name !== undefined ? t.name : t.dayNumber}
                            </h3>
                            <Button variant="contained" color="error">
                                Delete {templateType}
                            </Button>
                        </div>
                    )
                })}
            </main>
        </div>
    )
}

export default ListTemplate