import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SupabaseService } from './supabase';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('learn-supabase-todoapp');

  constructor(private supabase: SupabaseService) {
    this.supabase.client.from('todos').select('*').then(console.log);
  }
}
