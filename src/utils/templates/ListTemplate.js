import { Button } from '@mui/material';
import './style.css'
import { useNavigate } from 'react-router-dom';

const ListTemplate = ({ templateData, templateType }) => {
    const navigate = useNavigate()
    const templateCode = templateType.charCodeAt(0)
    let parentTemplate = 'Curriculum'

    if (templateType === 'unit') {
        parentTemplate = 'Module'
    } else if (templateType === 'lesson') {
        parentTemplate = 'Unit'
    }

    const handleClick = (action, data) => {
        if (action === 'view') {
            navigate(`/${templateType}/${data.id}`, { state: { data } })
        } else {
            navigate(`/${templateType}/create`, { state: { templateType } })
        }
    }

    return (
        <div className='content'>
            <header>
                <h1>{parentTemplate} X - {templateType}s</h1>
                <Button
                    variant="contained"
                    color="success"
                    onClick={() => handleClick('create')}
                >
                    Create new {templateType}
                </Button>
            </header>
            <main>
                {templateData.map(t => {
                    return (
                        <div key={templateCode + t.id} className='module'>
                            <h3 onClick={() => handleClick('view', t)}>
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