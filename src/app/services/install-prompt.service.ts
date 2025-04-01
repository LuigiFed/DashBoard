import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class InstallPromptService {
  public deferredPrompt: any;
  private platformId: Object = inject(PLATFORM_ID);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener('beforeinstallprompt', (e) => {
        console.log('beforeinstallprompt event fired', e);
        e.preventDefault();
        this.deferredPrompt = e;
        console.log('deferredPrompt set', this.deferredPrompt);
        if (this.isMobileDevice()) {
          console.log('Device is mobile, showing install prompt');
          this.showInstallPrompt();
        } else {
          console.log('Device is not mobile, not showing install prompt');
        }
      });
    } else {
      console.log('Not running in a browser environment');
    }
  }

  private isMobileDevice(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      console.log('isMobileDevice:', isMobile, 'userAgent:', navigator.userAgent);
      return isMobile;
    }
    return false;
  }

  private showInstallPrompt(): void {
    if (isPlatformBrowser(this.platformId)) {
      console.log('showInstallPrompt called');
      const installBanner = document.createElement('div');
      installBanner.innerHTML = `
        <p>To install this web app on your device, tap the menu button and then add to home screen.</p>
        <button id="installButton">Install</button>
        <button id="closeButton">Close</button>
      `;

      // Applica gli stili tramite JavaScript
      installBanner.style.position = 'fixed';
      installBanner.style.bottom = '0';
      installBanner.style.left = '0';
      installBanner.style.right = '0';
      installBanner.style.background = 'white';
      installBanner.style.padding = '20px';
      installBanner.style.borderTop = '1px solid #ccc';
      installBanner.style.boxShadow = '0 -2px 5px rgba(0, 0, 0, 0.3)';
      installBanner.style.zIndex = '1000';
      installBanner.style.textAlign = 'center';
      installBanner.style.maxWidth = '600px';
      installBanner.style.margin = '0 auto';

      document.body.appendChild(installBanner);

      const installButton = document.getElementById('installButton');
      const closeButton = document.getElementById('closeButton');

      if (installButton) {
        installButton.style.background = '#1976d2';
        installButton.style.color = 'white';
        installButton.style.border = 'none';
        installButton.style.padding = '10px 20px';
        installButton.style.borderRadius = '5px';
        installButton.style.cursor = 'pointer';
        installButton.style.margin = '5px';

        installButton.addEventListener('click', () => {
          console.log('Install button clicked, calling deferredPrompt.prompt()');
          if (this.deferredPrompt) {
            this.deferredPrompt.prompt();
            this.deferredPrompt.userChoice.then((choiceResult: { outcome: 'accepted' | 'dismissed' }) => {
              console.log('User choice:', choiceResult.outcome);
              if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
              } else {
                console.log('User dismissed the install prompt');
              }
              this.deferredPrompt = null;
              installBanner.remove();
            });
          } else {
            console.log('deferredPrompt is undefined, cannot call prompt()');
          }
        });
      }

      if (closeButton) {
        closeButton.style.background = '#ccc';
        closeButton.style.border = 'none';
        closeButton.style.padding = '10px 20px';
        closeButton.style.borderRadius = '5px';
        closeButton.style.cursor = 'pointer';
        closeButton.style.margin = '5px';

        closeButton.addEventListener('click', () => {
          console.log('Close button clicked');
          installBanner.remove();
        });
      }
    } else {
      console.log('Not running in a browser environment, showInstallPrompt skipped');
    }
  }
}
