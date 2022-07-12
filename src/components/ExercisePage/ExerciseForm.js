import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import client from '../../utils/client';

export default function ExerciseForm({ data, setExercises, exercises }) {
  const [formData, setFormData] = useState({
    exerciseName: '',
    githubUrl: '',
    course: '',
    module: '',
    unit: '',
  });
  const [course, setCourse] = useState();
  const [module, setModule] = useState();
  const [, setUnit] = useState();

  const handleChange = (e) => {
    if (e.target.name === 'course') {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        module: '',
        unit: '',
      });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    handleFilterChange(e);
  };

  const handleFilterChange = (e) => {
    if (e.target.name === 'course') {
      const filteredCourseArr = data.filter(
        (course) => course.courseName === e.target.value
      );
      setCourse(...filteredCourseArr);
    }
    if (e.target.name === 'module') {
      const filteredModuleArr = course.modules.filter(
        (module) => module.moduleName === e.target.value
      );
      setModule(...filteredModuleArr);
    }
    if (e.target.name === 'unit') {
      const filteredUnitArr = module.units.filter(
        (unit) => unit.unitName === e.target.value
      );
      setUnit(...filteredUnitArr);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const unitId = Number(formData.unit.split(' ')[0]);
    const formattedFormData = {
      exercise_name: formData.exerciseName,
      github_url: formData.githubUrl,
      unit_id: unitId,
    };

    client
      .post('/exercises', formattedFormData)
      .then((res) => {
        const {
          exercise_name: exerciseName,
          github_url: githubUrl,
          id,
          unit_id: unitId,
        } = res.data.data.exercise;
        const formattedExercise = { exerciseName, githubUrl, id, unitId };
        setExercises([...exercises, formattedExercise]);
      })
      .catch((err) => console.error(err.response));
  };

  return (
    <div className='container-form'>
      <form className='exercise-form' onSubmit={handleSubmit}>
        <TextField
          id='standard-basic'
          onChange={handleChange}
          value={formData.exerciseName}
          name='exerciseName'
          label='Exercise Name'
          variant='standard'
          focused
        />

        <TextField
          id='standard-basic'
          onChange={handleChange}
          value={formData.githubUrl}
          name='githubUrl'
          label='GitHub URL'
          variant='standard'
          focused
        />

        <FormControl fullWidth>
          <InputLabel id='demo-simple-select-label'>Course</InputLabel>
          <Select
            name='course'
            value={formData.course}
            onChange={handleChange}
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            label='Course'
          >
            {data?.map((course) => (
              <MenuItem value={course.courseName} key={course.id}>
                {course.courseName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id='demo-simple-select-label'>Module</InputLabel>
          <Select
            name='module'
            value={formData.module}
            onChange={handleChange}
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            label='Module'
          >
            {course?.modules.map((module) => (
              <MenuItem value={module.moduleName} key={module.id}>
                {module.moduleName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id='demo-simple-select-label'>Unit Name</InputLabel>
          <Select
            name='unit'
            value={formData.unit}
            onChange={handleChange}
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            label='Unit Name'
          >
            {module?.units.map((unit) => (
              <MenuItem value={`${unit.id} ${unit.unitName}`} key={unit.id}>
                {unit.unitName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box sx={{ '& button': { m: 1 } }}>
          <Button variant='contained' size='large' type='submit'>
            Submit
          </Button>
        </Box>
      </form>
    </div>
  );
}
