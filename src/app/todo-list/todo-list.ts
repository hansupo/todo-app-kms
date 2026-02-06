import { Component } from '@angular/core';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSlideToggle } from '@angular/material/slide-toggle';

interface Task {
  text: string;
  done: boolean;
  createdAt: number;
}

@Component({
  selector: 'app-todo-list',
  imports: [NgFor, NgIf, NgClass, FormsModule, MatSlideToggle],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css',
})
export class TodoList {
  newTask = '';
  tasks: Task[] = [];

  addTask() {
    const text = this.newTask.trim();
    if (!text) return;

    this.tasks.push({
      text,
      done: false,
      createdAt: Date.now(),
    });

    this.newTask = '';
    this.sortTasks();
  }

  toggleTask(task: Task) {
    task.done = !task.done;
    this.sortTasks();
  }

  private sortTasks() {
    this.tasks.sort(
      (a, b) => Number(a.done) - Number(b.done) || a.createdAt - b.createdAt,
    );
  }

  trackByIndex(index: number) {
    return index;
  }
}
