import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    private platformId = inject(PLATFORM_ID);
    private isDarkThemeSubject = new BehaviorSubject<boolean>(false);
    isDarkTheme$: Observable<boolean> = this.isDarkThemeSubject.asObservable();

    constructor() {
        if (isPlatformBrowser(this.platformId)) {
            // Cargar preferencia guardada
            const savedTheme = localStorage.getItem('theme');

            if (savedTheme) {
                this.isDarkThemeSubject.next(savedTheme === 'dark');
            } else {
                // Detectar preferencia del sistema
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                this.isDarkThemeSubject.next(prefersDark);
            }

            // Escuchar cambios en las preferencias del sistema
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                if (localStorage.getItem('theme') === null) {
                    this.isDarkThemeSubject.next(e.matches);
                }
            });
        }
    }

    toggleTheme(): void {
        const current = this.isDarkThemeSubject.value;
        this.isDarkThemeSubject.next(!current);

        if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('theme', !current ? 'dark' : 'light');
            document.documentElement.setAttribute('data-theme', !current ? 'dark' : 'light');
        }
    }

    setDarkTheme(isDark: boolean): void {
        this.isDarkThemeSubject.next(isDark);

        if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
        }
    }
}