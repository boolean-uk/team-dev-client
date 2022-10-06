import CreateTemplate from '../../utils/templates/CreateTemplate'
import { useLocation } from 'react-router-dom'

const ModuleCreate = () => {
    const location = useLocation()

    return (
        <CreateTemplate templateType={location.state.templateType} />
    )
}

export default ModuleCreate