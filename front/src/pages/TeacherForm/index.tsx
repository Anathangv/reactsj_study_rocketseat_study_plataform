import React, {FormEvent, useState} from 'react';
import {useHistory} from 'react-router-dom'

import Input from '../../componentes/Input';
import PageHeadder from '../../componentes/PageHeader';
import Select from '../../componentes/Select';
import TextArea from '../../componentes/TextArea';
import api from '../../services/api';

import './styles.css';

function TeacherForms(){
  const history = useHistory();

  const [name, setName] = useState('');
  const [avatar, setAvartar] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [bio, setBio] = useState('');
  
  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('');
  
  const [scheduleItens, setScheduleItens] = useState([
    {week_day: 0, from: '', to: ''}
  ])

  function addNewScheduleItem() {
    setScheduleItens([
      ...scheduleItens,
      {week_day: 0, from: '', to: ''}
    ]);
  }

  function handleCreateClass(e: FormEvent){
    e.preventDefault();

    api.post('classes', {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost: Number(cost),
      schedule: scheduleItens
    }).then(() => {
      alert('Cadastro realizado com sucesso!');

      history.push('/');
    }).catch(() => {
      alert('Erro no cadastro!');
    });

    console.log(scheduleItens);
  }
  
  function setScheduleItemValue(position: number, field: string, value: string){
    const updatedScheduleItens = scheduleItens.map((scheduleIten, index) => {
      if(index === position){
        return {...scheduleIten, [field]: value }
      }
      return scheduleIten;
    })
    setScheduleItens(updatedScheduleItens);
  }

  return(
    <div id="page-teacher-form" className="container"> 
      <PageHeadder 
        title="Quel legal você quer participar"
        description="O primeiro passo é preencher esse formulário de inscrição"
      />
      
      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus Dados</legend>
            <Input 
              name="name" 
              label="Nome Completo" 
              value={name} 
              onChange={ (e) => { setName(e.target.value) }}
            />
            <Input 
              name="avatar" 
              label="Avatar"
              value={avatar} 
              onChange={ (e) => { setAvartar(e.target.value) }}
            />
            <Input 
              name="whatsapp" 
              label="Whatsapp"
              value={whatsapp} 
              onChange={ (e) => { setWhatsapp(e.target.value) }}
            />
            <TextArea 
              name="bio" 
              label="Biografia" 
              value={bio} 
              onChange={ (e) => { setBio(e.target.value) }}
            />
          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>
            <Select 
              name="subject" 
              label="Matéria"
              value={subject}
              onChange={(e) => { setSubject(e.target.value) }}
              options={[
                {value: 'Artes', label:'Artes'},
                {value: 'Biologia', label:'Biologia'},
                {value: 'Ciências', label:'Ciências'},
                {value: 'Português', label:'Português'}
              ]}/>
            <Input 
              name="cost" 
              label="Custo da sua hora por aula"
              value={cost}
              onChange={(e) => { setCost(e.target.value) }}
            />
          </fieldset>

          <fieldset>
            <legend>
              Horários Disponíveis
              <button type="button" onClick={addNewScheduleItem}>
                + Novo horário
              </button>
            </legend>

            {scheduleItens.map( (scheduleIten, index) => {
              return(
                <div className="schedule-item">
                  <Select 
                    name="week_day" 
                    label="Dia da semana"
                    value={scheduleIten.week_day}
                    onChange={ (e) => setScheduleItemValue(index, 'week_day', e.target.value)}
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
                    name="from" 
                    label="Das" 
                    type="time"
                    value={scheduleIten.from}
                    onChange={ (e) => setScheduleItemValue(index, 'from', e.target.value)}
                    />
                  <Input 
                    name="to" 
                    label="Até" 
                    type="time" 
                    value={scheduleIten.to}
                    onChange={ (e) => setScheduleItemValue(index, 'to', e.target.value)}
                  />
                </div>
              );
            })}
          </fieldset>

          <footer>
            <p>
              Importante! <br/>
              Preencha todos os dados
            </p>
            <button type="submit">
              Salvar Cadastro
            </button>
          </footer>
        </form>
      </main>
    </div>
  );
}

export default TeacherForms;