import ListTemplate from '../../utils/templates/ListTemplate'

const temporaryLessonDataToBeDeletedLater = [
    {
        id: 1,
        dayNumber: 'DN26',
        lessonPlan: 'This is the lesson plan for DN26',
        learningObj: ['Learning Obj 1', 'Learning Obj 2']
    },
    {
        id: 2,
        dayNumber: 'DN27',
        lessonPlan: 'This is the lesson plan for DN27',
        learningObj: ['Learning Obj A', 'Learning Obj B']
    }
]

const templateType = 'lesson'

const LessonList = () => {
    return (
        <>
            <ListTemplate
                templateData={temporaryLessonDataToBeDeletedLater}
                templateType={templateType}
            />
        </>
    )
}

export default LessonList