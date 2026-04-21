import { Injectable, signal } from '@angular/core';
import { Task, TaskStatus } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  
  //aplicando SIGNAL nos objetos
  tasks = signal<Task[]>(this.seedTasks());

  constructor() { }

  // --- Métodos do CRUD ---

  //equivalente ao onFormSubmit para nova tarefa
  addTask(taskData: Omit<Task, 'id' | 'status'>) {
    const newTask: Task = {
      ...taskData,
      id: this.generateUid(),
      status: 'todo'
    };
    //.update() é como alterar o valor de um signal com base no valor anterior
    this.tasks.update(currentTasks => [...currentTasks, newTask]);
  }

  //equivalente ao onFormSubmit para editar tarefa
  updateTask(updatedTask: Task) {
    this.tasks.update(currentTasks => 
      currentTasks.map(t => t.id === updatedTask.id ? updatedTask : t)
    );
  }

  //equivalente ao deleteTask do JS
  deleteTask(id: string) {
    this.tasks.update(currentTasks => currentTasks.filter(t => t.id !== id));
  }

  //equivalente ao moveTaskTo do JS (usado no Drag and Drop)
  updateTaskStatus(id: string, newStatus: TaskStatus) {
    this.tasks.update(currentTasks => 
      currentTasks.map(t => t.id === id ? { ...t, status: newStatus } : t)
    );
  }

  //funções auxiliares usadas apenas pelo service

  private seedTasks(): Task[] {
    return [
      { id: this.generateUid(), title: 'Ler capítulo 3 de Algoritmos', due: this.addDaysISO(2), level: 'high', desc: 'Priorizar exercícios 3.1-3.5', status: 'todo' },
      { id: this.generateUid(), title: 'Resolver lista de TS', due: this.addDaysISO(5), level: 'medium', desc: 'Atenção a generics', status: 'doing' },
      { id: this.generateUid(), title: 'Revisão rápida: HTML/CSS', due: this.addDaysISO(10), level: 'low', desc: '30 minutos', status: 'done' }
    ];
  }

  private generateUid(): string {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }

  private addDaysISO(n: number): string {
    const d = new Date();
    d.setDate(d.getDate() + n);
    return d.toISOString().slice(0, 10);
  }
}