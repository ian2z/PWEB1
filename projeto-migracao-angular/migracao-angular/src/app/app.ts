import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ISSO resolve o erro do ngModel
import { TaskColumnComponent } from './components/task-column/task-column'; // Ajuste o final se o seu arquivo for apenas task-column.ts
import { TaskService } from './services/task';
import { Task, TaskLevel } from './models/task.model';

@Component({
  selector: 'app-root',
  standalone: true,
  // ISSO resolve o erro do app-task-column não ser conhecido
  imports: [CommonModule, FormsModule, TaskColumnComponent], 
  templateUrl: './app.html',
})
export class App { // O Angular reclamou que a "type 'App'" não tinha as variáveis. 
  
  taskService = inject(TaskService);

  // AS VARIÁVEIS QUE O HTML ESTAVA PROCURANDO:
  isModalOpen = signal(false);
  editingTaskId = signal<string | null>(null);

  formData = {
    title: '',
    due: '',
    level: 'low' as TaskLevel,
    desc: ''
  };

  openModal() {
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
    this.resetForm();
  }

  // A FUNÇÃO QUE O HTML ESTAVA PROCURANDO:
  startEdit(task: Task) {
    this.editingTaskId.set(task.id);
    this.formData = {
      title: task.title,
      due: task.due,
      level: task.level,
      desc: task.desc || ''
    };
    this.openModal();
  }

  // A FUNÇÃO DE SUBMIT QUE O HTML ESTAVA PROCURANDO:
  onSubmit() {
    if (!this.formData.title || !this.formData.due) return;

    const currentEditingId = this.editingTaskId();
    
    if (currentEditingId) {
      const currentTask = this.taskService.tasks().find(t => t.id === currentEditingId);
      if (currentTask) {
        this.taskService.updateTask({
          id: currentEditingId,
          status: currentTask.status,
          ...this.formData
        });
      }
    } else {
      this.taskService.addTask(this.formData);
    }
    
    this.closeModal();
  }

  private resetForm() {
    this.editingTaskId.set(null);
    this.formData = { title: '', due: '', level: 'low', desc: '' };
  }
}