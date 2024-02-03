import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pomodoro-timer';

  minutes: number = 25;
  seconds: number = 0;
  intervalId: any;
  alarmAudio: HTMLAudioElement | undefined;

  alarmPlayed: boolean = false;
  alarmActive: boolean = false;


  constructor() { }

  ngOnInit() {
  }

  increaseMinutes() {
    this.minutes = this.minutes + 1;
  }

  decreaseMinutes() {
    if (this.minutes > 1) {
      this.minutes = this.minutes - 1;
    }
  }

  startTimer() {

    this.intervalId = setInterval(() => {
      if (this.seconds > 0) {
        this.seconds--;
      } else if (this.minutes > 0) {
        this.minutes--;
        this.seconds = 59;
      } else {
        if (!this.alarmPlayed) {
          this.playAlarm();
          this.alarmPlayed = true;
        }
      }
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.intervalId);

    
    this.stopAlarm();
  }

  restartTimer() {
    this.alarmPlayed = false;
    this.minutes = 25;
    this.seconds = 0;

    // Pare o alarme ao reiniciar o cronômetro
    this.stopAlarm();
  }

  playAlarm() {

    if (!this.alarmAudio) {
      this.alarmAudio = new Audio();
      this.alarmAudio.src = '/assets/SZA - Good Days (Audio).mp3';
    }

    // Inicie a reprodução do áudio
    this.alarmAudio.play();
    this.alarmActive = true;
  }

  stopAlarm() {

    if (this.alarmAudio && !this.alarmAudio.paused) {
      this.alarmAudio.pause();
      this.alarmAudio.currentTime = 0; // Reinicie a reprodução para o início
    if (!this.alarmPlayed) {
      this.restartTimer();
    }
  }
    //this.stopAlarm();
    
  }

  

  stopAlarmManually() {
    this.stopAlarm();
  }
  
}
