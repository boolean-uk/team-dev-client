import ListTemplate from '../../utils/templates/ListTemplate'

const temporaryUnitDataToBeDeletedLater = [
    {
        id: 1,
        name: 'JavaScript',
        desc: 'This is the JavaScript unit',
        learningObj: ['JS Objective 1', 'JS Objective 2']
    },
    {
        id: 2,
        name: 'React',
        desc: 'This is the React unit',
        learningObj: ['React Objective A', 'React Objective B']
    }
]

const templateType = 'unit'

const UnitList = () => {
    return (
        <ListTemplate
            templateData={temporaryUnitDataToBeDeletedLater}
            templateType={templateType}
        />
    )
}

export default UnitList