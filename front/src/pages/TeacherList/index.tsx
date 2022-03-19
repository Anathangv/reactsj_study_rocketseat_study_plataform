import React, { FormEvent, useState } from 'react';
import Input from '../../componentes/Input';
import PageHeadder from '../../componentes/PageHeader';
import Select from '../../componentes/Select';

import TeacherItem, {Teacher} from '../../componentes/TeacherItem'
import api from '../../services/api';

import './styles.css';

function TeacherList(){
  const [teachers,setTeachers] = useState([]);

  const [subject, setSubject] = useState('');
  const [week_day, setWeek_day] = useState('');
  const [time, setTime] = useState('');

  async function searchTeachers(e: FormEvent){
  e.preventDefault();

  const response = await api.get('classes',{
    params: {
      subject,
      week_day,
      time,
    }
  });

  setTeachers(response.data);
}

    return(
        <div id="page-teacher-list" className="container">
            <PageHeadder title="Estes são os proffys disponíveis.">
                <form id="search-teachers" onSubmit={searchTeachers}>
                  <Select 
                    name="subject" 
                    label="Matéria"
                    value={subject}
                    onChange={ (e) => {setSubject(e.target.value) }}
                    options={[
                      {value: 'Artes', label:'Artes'},
                      {value: 'Biologia', label:'Biologia'},
                      {value: 'Ciências', label:'Ciências'},
                      {value: 'Português', label:'Português'}
                    ]}
                  />
                  <Select 
                    name="week_day" 
                    label="Dia da semana"
                    value={week_day}
                    onChange={ (e) => {setWeek_day(e.target.value) }}
                    options={[
                      {value: '0', label:'Domingo'},
                      {value: '1', label:'Segunda'},
                      {value: '2', label:'Terça'},
                      {value: '3', label:'Quarta'},
                      {value: '4', label:'Quinta'},
                      {value: '5', label:'Sexta'},
                      {value: '6', label:'Sabado'},
                    ]}
                  />
                  <Input 
                    type="time" 
                    name="time" 
                    label="Hora"
                    value={time}
                    onChange={ (e) => {setTime(e.target.value) }}
                  />

                  <button type="submit" >Buscar</button>
                </form>
            </PageHeadder>
            <main>
              {teachers.map( (teacher : Teacher) => {
                return <TeacherItem key={teacher.id} teacher={teacher}/>;
              })}
            </main>
        </div>
    );
}

export default TeacherList;
