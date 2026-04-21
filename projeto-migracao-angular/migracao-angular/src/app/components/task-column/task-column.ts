import { Component, Input, Output, EventEmitter, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskCardComponent } from '../task-card/task-card';
import { TaskService } from '../../services/task';
import { Task, TaskStatus } from '../../models/task.model';

@Component({
  selector: 'app-task-column',
  standalone: true,
  imports: [CommonModule, TaskCardComponent],
  templateUrl: './task-column.html'
})
export class TaskColumnComponent {
  //DADOS QUE A COLUNA RECEBE DE FORA
  @Input({ required: true }) title!: string;
  @Input({ required: true }) status!: TaskStatus;

  //AVISOS QUE A COLUNA MANDA PARA FORA
  @Output() editTask = new EventEmitter<Task>();

  //INJETANDO O SERVIÇO (Nosso "banco de dados")
  private taskService = inject(TaskService);

  //se a coluna for "todo", ela só pega tarefas "todo". Se algo mudar, isso atualiza sozinho.
  filteredTasks = computed(() => {
    return this.taskService.tasks().filter(t => t.status === this.status);
  });

  //REPASSANDO CLIQUES DOS BOTÕES PARA O SERVIÇO
  onDelete(id: string) {
    this.taskService.deleteTask(id);
  }

  onEdit(task: Task) {
    this.editTask.emit(task);
  }

  //FUNÇÕES DO DRAG AND DROP (A parte de SOLTAR)
  onDragOver(event: DragEvent) {
    event.preventDefault(); //exogencia do navegadir
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const id = event.dataTransfer?.getData('text/plain'); 
    if (id) {
      //pede pro serviço atualizar o status da tarefa para o status DESTA coluna
      this.taskService.updateTaskStatus(id, this.status);
    }
  }
}