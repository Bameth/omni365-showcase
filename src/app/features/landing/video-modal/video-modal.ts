import { Component, EventEmitter, Output, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-video-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video-modal.html',
  styleUrls: ['./video-modal.css']
})
export class VideoModal implements AfterViewInit, OnDestroy {
  @Output() close = new EventEmitter<void>();
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;
  @ViewChild('videoContainer') videoContainer!: ElementRef<HTMLDivElement>;

  isOpen = false;
  isPlaying = false;
  isLoading = true;
  videoDuration = '0:00';
  videoSrc = 'assets/video/saas.mp4';

  ngAfterViewInit() {
    // Écouter les événements clavier
    document.addEventListener('keydown', this.handleKeyPress.bind(this));
  }

  ngOnDestroy() {
    document.removeEventListener('keydown', this.handleKeyPress.bind(this));
  }

  openModal() {
    this.isOpen = true;
    this.isLoading = true;

    // Empêcher le scroll de la page
    document.body.style.overflow = 'hidden';
    document.body.classList.add('modal-open');

    // Sur mobile, scroll vers le haut pour éviter les problèmes de viewport
    if (window.innerWidth < 640) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  closeModal() {
    if (this.videoPlayer?.nativeElement) {
      this.videoPlayer.nativeElement.pause();
    }
    this.isOpen = false;
    this.isPlaying = false;

    // Rétablir le scroll
    document.body.style.overflow = '';
    document.body.classList.remove('modal-open');

    this.close.emit();
  }

  onVideoLoaded() {
    this.isLoading = false;
    const duration = this.videoPlayer.nativeElement.duration;
    this.videoDuration = this.formatDuration(duration);
  }

  onVideoPlay() {
    this.isPlaying = true;
  }

  onVideoPause() {
    this.isPlaying = false;
  }

  onVideoEnded() {
    this.isPlaying = false;
  }

  playVideo() {
    if (this.videoPlayer?.nativeElement) {
      this.videoPlayer.nativeElement.play();
    }
  }

  restartVideo() {
    if (this.videoPlayer?.nativeElement) {
      this.videoPlayer.nativeElement.currentTime = 0;
      this.videoPlayer.nativeElement.play();
    }
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      this.videoContainer.nativeElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }

  handleKeyPress(event: KeyboardEvent) {
    if (!this.isOpen) return;

    switch (event.key) {
      case 'Escape':
        this.closeModal();
        break;
      case ' ':
        event.preventDefault();
        if (this.isPlaying) {
          this.videoPlayer.nativeElement.pause();
        } else {
          this.videoPlayer.nativeElement.play();
        }
        break;
      case 'f':
      case 'F':
        this.toggleFullscreen();
        break;
    }
  }

  formatDuration(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  }
}
