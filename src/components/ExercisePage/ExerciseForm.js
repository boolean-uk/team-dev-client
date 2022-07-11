import { TextField, Button, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";

export default function ExerciseForm({data}) {
  const [formData, setFormData] = useState({exerciseName: "", githubUrl:"", course:"", module:"", unit:""})

  const handleChange = (e) => {
  setFormData({...formData, [e.target.name]: e.target.value})
  }

  let courses, modules, units
  if (data) {
  courses = data.map(course => course)
  modules = courses.reduce((acc, cur) => {
    return [...acc, ...cur.modules]
  }, [])
  units = modules.reduce((acc, cur) => {
    return [...acc, ...cur.units]
  }, [])
  }
  return (
    <div className="container-form">
    <form className="exercise-form">
   <TextField id="standard-basic" onChange={handleChange} value={formData.exerciseName} name="exerciseName" label="Exercise Name" variant="standard" focused />
   <TextField id="standard-basic" onChange={handleChange} value={formData.githubUrl} name="githubUrl" label="GitHub URL" variant="standard" focused />

   <FormControl fullWidth>
   <InputLabel id="demo-simple-select-label">Course</InputLabel>
   <Select name="course" value={formData.course} onChange={handleChange} 
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    label="Course"
   >
    {data && courses.map(course => (
        <MenuItem value={course.courseName} key={course.id}>{course.courseName}</MenuItem>
    )
    )}
   </Select>
   </FormControl>

   <FormControl fullWidth>
   <InputLabel id="demo-simple-select-label">Module</InputLabel>
   <Select name="module" value={formData.module} onChange={handleChange}
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    label="Module"
   >
    {data && modules.map(module => (
        <MenuItem value={module.moduleName} key={module.id}>{module.moduleName}</MenuItem>
    )
    )}
   </Select>
   </FormControl>

   <FormControl fullWidth>
   <InputLabel id="demo-simple-select-label">Unit Name</InputLabel>
   <Select name="unit" value={formData.unit} onChange={handleChange}
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    label="Unit Name"
   >
    {data && units.map(unit => (
        <MenuItem value={unit.unitName} key={unit.id}>{unit.unitName}</MenuItem>
    )
    )}
   </Select>
   </FormControl>
   <Box sx={{ '& button': { m: 1 } }}>
   <Button variant="contained" size="large">Submit</Button>
   </Box>
   </form>
   </div>
  );
}

