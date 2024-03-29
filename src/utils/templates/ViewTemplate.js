import { Button } from '@mui/material';
import './style.css'
import { useNavigate } from 'react-router-dom';

const ViewTemplate = ({ templateData, templateType }) => {
    const navigate = useNavigate()
    let templateCode, childTemplate = 'unit'

    if (templateData) {
        templateCode = templateData.learningObj[0].charCodeAt(0)
    }

    if (templateType === 'unit') {
        childTemplate = 'lesson'
    } else if (templateType === 'lesson') {
        childTemplate = 'exercise'
    }

    const handleClick = () => {
        navigate(`/${childTemplate}`)
    }

    return (
        <div className='content'>
            <header>
                <h1>
                    {templateData.name !== undefined ? templateData.name : templateData.dayNumber}
                </h1>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleClick}
                >
                    {childTemplate}s
                </Button>
            </header>
            <main>
                <p className='desc'>
                    {templateData.desc !== undefined ? templateData.desc : templateData.lessonPlan}
                </p>
                <div className='objectives'>
                    <h3>Learning Objectives:</h3>
                    {templateData.learningObj.map((o, i) => {
                        return <p key={templateCode + i}>{i + 1}. {o}</p>
                    })}
                </div>
            </main>
        </div>
    )
}

export default ViewTemplate