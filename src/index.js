const express = require('express');
const cors = require('cors');
const {uuid} = require('uuidv4');

const app = express();

app.use(cors());
app.use(express.json());

const projects = [];

app.get('/projects', (req, res)=>{
  const { title } = req.query;

  const result = title ? projects.filter(project=>project.title.includes(title)) : projects;
  
  return res.json(result);
});

app.post('/projects', (req, res)=>{
  const { title, owner} = req.body;

  const project = {
    id: uuid(),
    title,
    owner,
  };

  projects.push(project);

  return res.json(project);
});

app.put('/projects', (req, res)=>{
  const { id } = req.params;
  const { title, owner } = req.body;

  const projIndex = projects.findIndex(project=>project.id === id);

  if(projIndex < 0){
    return res.status(400).json({ error: 'project not found.'});
  }

  const project ={
    id,
    title,
    owner,
  }

  projects[projIndex] = project;

  return res.json(project);
});

app.delete('/projects', (req, res)=>{
  const { id } = req.params;

  const projIndex = projects.findIndex(project=>project.id === id);

  if(projIndex < 0){
    return res.status(400).json({ error: 'project not found.'});
  }

  projects.splice(projIndex, 1);

  return res.status(204).send();
});

app.listen(3333, ()=>{
  console.log('🎈 Back-end started!');
});