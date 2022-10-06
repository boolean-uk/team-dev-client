import CreateTemplate from '../../utils/templates/CreateTemplate'
import { useLocation } from 'react-router-dom'

const UnitCreate = () => {
    const location = useLocation()

    return (
        <CreateTemplate templateType={location.state.templateType} />
    )
}

export default UnitCreate