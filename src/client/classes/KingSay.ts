import Words from "./Words";

export default class KingSay{
    words: Words = new Words();

    inputTime = 0;
    inputTimeElement: HTMLElement = null;
    startButton: HTMLElement = null;
    stopButton: HTMLElement = null;
    timeBox: HTMLElement = null;
    wordBox: HTMLElement = null;

    audioctx = new AudioContext();
    newWordAudio: any = null;

    // @ts-ignore
    timerID = null;

    outputTimeString = "";

    constructor(){
        this.inputTimeElement = document.getElementById('inputTime');
        this.startButton = document.getElementById('startButton');
        this.stopButton = document.getElementById('stopButton');
        this.timeBox = document.getElementById('timeBox');
        this.wordBox = document.getElementById('wordBox');

        Promise.all([this.words.load(), this.loadAudio()] ).
        then(()=>{
            console.log(this.words.getWords());
            this.init();
        });
    };

    init(){
        this.startButton.addEventListener('click', ()=>{this.startTimer()});
        this.stopButton.addEventListener('click', ()=>{this.stopTimer()});
    }

    startTimer(){
        this.stopTimer();
        this.inputTime = +(this.inputTimeElement as HTMLInputElement).value;
        if(this.inputTime === 0){
            alert('Enter correct time and bigger then 0');
            return;
        }

        let playSound = this.audioctx.createBufferSource();
        playSound.buffer = this.newWordAudio;
        playSound.connect(this.audioctx.destination);
        playSound.start(this.audioctx.currentTime);

        this.wordBox.innerHTML = this.words.getNextWord();

        this.inputTime = this.inputTime * 60;

        this.updateTime();
        this.updateTimer();

        this.timerID = setInterval(()=>{
            this.updateTime();
            this.updateTimer();
        }, 1000);
    }

    stopTimer(){
        clearInterval(this.timerID);
        this.timerID = null;
    }

    updateTimer(){
        this.timeBox.innerHTML = this.outputTimeString;
    }

    updateTime(){
        let sec = this.inputTime % 60;
        let min = Math.floor((this.inputTime - sec)/60);
        this.outputTimeString = `${min}:${sec}`;
        this.inputTime--;
        if(this.inputTime < 0){
            this.startTimer();
            return;
        }
    }

    async loadAudio(){
        return fetch("static/next-word.mp3")
            .then(data => data.arrayBuffer())
            .then(arrayBuffer => this.audioctx.decodeAudioData(arrayBuffer))
            .then(decodedAudio => {
                this.newWordAudio = decodedAudio;
            })
            .catch(error=>console.log(error));
    }
}