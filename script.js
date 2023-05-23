    // Variável para armazenar o ID da monitoria selecionada para atualização
    let selectedMonitoriaId = null;

    // Função para mostrar/ocultar o formulário de adicionar monitoria
    document.getElementById('show-add-form-button').addEventListener('click', function() {
      document.getElementById('add-monitoria-form').style.display = 'block';
      document.getElementById('show-add-form-button').style.display = 'none';
    });

    // Função para mostrar/ocultar o formulário de atualizar monitoria
    document.getElementById('show-update-form-button').addEventListener('click', function() {
      document.getElementById('update-monitoria-form').style.display = 'block';
      document.getElementById('show-update-form-button').style.display = 'none';
    });

    // Função para carregar a lista de monitorias
    function loadMonitoriaList() {
      var monitoriaList = document.getElementById('monitoria-list');
      monitoriaList.innerHTML = '';

      fetch('http://localhost:3000/monitoria')
        .then(response => response.json())
        .then(data => {
          data.forEach(monitoria => {
            var listItem = document.createElement('li');
            listItem.innerHTML = `<b>Matéria:</b> ${monitoria.Matéria}<br>
                                  <b>Monitor:</b> ${monitoria.Monitor}<br>
                                  <b>Aluno:</b> ${monitoria.Aluno}<br>
                                  <b>Horário:</b> ${monitoria.Horário}<br>
                                  <b>Data:</b> ${monitoria.Data}`;

            var updateButton = document.createElement('button');
            updateButton.textContent = '✎';
            updateButton.classList.add('warning')
            updateButton.addEventListener('click', function() {
              selectMonitoriaForUpdate(monitoria);
            });

            var deleteButton = document.createElement('button');
            deleteButton.textContent = '🗑️';
            deleteButton.classList.add('danger')
            deleteButton.addEventListener('click', function() {
              deleteMonitoria(monitoria.id);
            });

            listItem.appendChild(updateButton);
            listItem.appendChild(deleteButton);
            monitoriaList.appendChild(listItem);

            listItem.classList.add('list-group-item')
          });
        });
    }

    // Função para adicionar uma nova monitoria
    document.getElementById('add-monitoria-form').addEventListener('submit', function(event) {
      event.preventDefault();
      var materia = document.getElementById('materia-input').value;
      var monitor = document.getElementById('monitor-input').value;
      var aluno = document.getElementById('aluno-input').value;
      var horario = document.getElementById('horario-input').value;
      var data = document.getElementById('data-input').value;

      fetch('http://localhost:3000/monitoria', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ Matéria: materia, Monitor: monitor, Aluno: aluno, Horário: horario, Data: data })
      })
      .then(() => {
        loadMonitoriaList();
        document.getElementById('materia-input').value = '';
        document.getElementById('monitor-input').value = '';
        document.getElementById('aluno-input').value = '';
        document.getElementById('horario-input').value = '';
        document.getElementById('data-input').value = '';
        document.getElementById('add-monitoria-form').style.display = 'none';
        document.getElementById('show-add-form-button').style.display = 'block';
      });
    });

    // Função para selecionar uma monitoria para atualização
    function selectMonitoriaForUpdate(monitoria) {
      selectedMonitoriaId = monitoria.id;
      document.getElementById('update-materia-input').value = monitoria.Matéria;
      document.getElementById('update-monitor-input').value = monitoria.Monitor;
      document.getElementById('update-aluno-input').value = monitoria.Aluno;
      document.getElementById('update-horario-input').value = monitoria.Horário;
      document.getElementById('update-data-input').value = monitoria.Data;
      document.getElementById('update-monitoria-form').style.display = 'block';
      document.getElementById('show-update-form-button').style.display = 'none';
    }

    // Função para atualizar uma monitoria
    document.getElementById('update-monitoria-form').addEventListener('submit', function(event) {
      event.preventDefault();
      var materia = document.getElementById('update-materia-input').value;
      var monitor = document.getElementById('update-monitor-input').value;
      var aluno = document.getElementById('update-aluno-input').value;
      var horario = document.getElementById('update-horario-input').value;
      var data = document.getElementById('update-data-input').value;

      fetch(`http://localhost:3000/monitoria/${selectedMonitoriaId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ Matéria: materia, Monitor: monitor, Aluno: aluno, Horário: horario, Data: data })
      })
      .then(() => {
        selectedMonitoriaId = null;
        document.getElementById('update-materia-input').value = '';
        document.getElementById('update-monitor-input').value = '';
        document.getElementById('update-aluno-input').value = '';
        document.getElementById('update-horario-input').value = '';
        document.getElementById('update-data-input').value = '';
        document.getElementById('update-monitoria-form').style.display = 'none';
        document.getElementById('show-update-form-button').style.display = 'block';
        loadMonitoriaList();
      });
    });

    // Função para excluir uma monitoria
    function deleteMonitoria(monitoriaId) {
      fetch(`http://localhost:3000/monitoria/${monitoriaId}`, {
        method: 'DELETE'
      })
      .then(() => {
        loadMonitoriaList();
      });
    }

    // Carregar a lista de monitorias ao carregar a página
    loadMonitoriaList();