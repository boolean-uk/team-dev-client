import ListTemplate from '../../utils/templates/ListTemplate'

const temporaryModuleDataToBeDeletedLater = [
    {
        id: 1,
        name: 'User Interfaces',
        desc: 'This is the user interfaces module',
        learningObj: ['Objective 1', 'Objective 2']
    },
    {
        id: 2,
        name: 'Development Approaches',
        desc: 'This is the development approaches module',
        learningObj: ['Objective A', 'Objective B']
    }
]

const templateType = 'module'

const ModuleList = () => {
    return (
        <>
            <ListTemplate
                templateData={temporaryModuleDataToBeDeletedLater}
                templateType={templateType}
            />
        </>
    )
}

export default ModuleList