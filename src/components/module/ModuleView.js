import ViewTemplate from '../../utils/templates/ViewTemplate'
import { useLocation } from 'react-router-dom'

const ModuleView = () => {
    const location = useLocation()

    return (
        <ViewTemplate
            templateData={location.state.data}
            templateType='module'
        />
    )
}

export default ModuleView