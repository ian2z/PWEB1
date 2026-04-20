App Task Manager - Exercício avaliativo

Pequena aplicação estática (HTML + Tailwind + JS) para gerenciar tarefas de estudo.

Como abrir:

1. Abra `web/app-task-manager/index.html` diretamente no navegador (Drag & drop) ou inicie um servidor estático, por exemplo:

   python -m http.server 8000

2. A aplicação usa armazenamento local do navegador (localStorage). Não há backend.

Funcionalidades:

- Cards de tarefas divididos em 3 colunas: `Para fazer`, `Em andamento`, `Concluídas`.
- Cada card contém: título, data de término, nível de importância, breve descrição e uma bola colorida indicando proximidade.
- Adicionar nova tarefa pelo formulário.
- Arrastar e soltar cards entre colunas.
- Editar ou excluir tarefas.