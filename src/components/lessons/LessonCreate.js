import CreateTemplate from '../../utils/templates/CreateTemplate'
import { useLocation } from 'react-router-dom'

const LessonCreate = () => {
    const location = useLocation()

    return (
        <CreateTemplate templateType={location.state.templateType} />
    )
}

export default LessonCreate