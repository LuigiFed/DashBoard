import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InstallPromptService {
  private deferredPrompt: any;

  constructor() {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
      if (this.isMobileDevice()) {
        this.showInstallPrompt();
      }
    });
  }

  private isMobileDevice(): boolean {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  private showInstallPrompt(): void {
    const installBanner = document.createElement('div');
    installBanner.innerHTML = `
      <div style="position: fixed; bottom: 20px; left: 20px; background: white; padding: 20px; border: 1px solid #ccc; border-radius: 5px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3); z-index: 1000;">
        <p>To install this web app on your device, tap the menu button and then add to home screen.</p>
        <button id="installButton" style="background: #1976d2; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">Install</button>
        <button id="closeButton" style="background: #ccc; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">Close</button>
      </div>
    `;
    document.body.appendChild(installBanner);

    const installButton = document.getElementById('installButton');
    const closeButton = document.getElementById('closeButton');

    if (installButton) {
      installButton.addEventListener('click', () => {
        this.deferredPrompt.prompt();
        this.deferredPrompt.userChoice.then((choiceResult: { outcome: 'accepted' | 'dismissed' }) => { // Tipo specificato
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the install prompt');
          } else {
            console.log('User dismissed the install prompt');
          }
          this.deferredPrompt = null;
          installBanner.remove();
        });
      });
    }

    if (closeButton) {
      closeButton.addEventListener('click', () => {
        installBanner.remove();
      });
    }
  }
}
