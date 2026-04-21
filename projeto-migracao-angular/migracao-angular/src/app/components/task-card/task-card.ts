import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-card.html'
})
export class TaskCardComponent {
  //input da tarefa do componente pai (a coluna)
  @Input({ required: true }) task!: Task;

  //eventos para quando o usuário clicar nos botões
  @Output() edit = new EventEmitter<Task>();
  @Output() delete = new EventEmitter<string>();

  //função proximityColor do código antigo
  get proximityColor(): string {
    const today = new Date();
    const due = new Date(this.task.due);
    const diff = Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diff < 0) return 'bg-gray-500'; // passou do prazo
    if (diff <= 1) return 'bg-red-500';
    if (diff <= 3) return 'bg-orange-400';
    if (diff <= 7) return 'bg-yellow-300';
    return 'bg-green-400';
  }

  //unção levelLabel do codigo antigo
  get levelLabel(): string {
    const l = this.task.level;
    return l === 'high' ? 'Alta' : l === 'medium' ? 'Média' : 'Baixa';
  }

  //funções chamadas pelo HTML quando os botões são clicados
  onEdit() {
    this.edit.emit(this.task);
  }

  onDelete() {
    this.delete.emit(this.task.id);
  }

  // Quando o usuário começar a arrastar o card, guardamos o ID da tarefa na "memória" do navegador
  onDragStart(event: DragEvent) {
    if (event.dataTransfer) {
      event.dataTransfer.setData('text/plain', this.task.id);
    }
  }
}