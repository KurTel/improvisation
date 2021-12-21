export default class Words{

    private words: string[] = [];

    constructor() {
    }

    public async load(){
        return await fetch('static/words.txt')
            .then(response => {
                if(response.ok){
                    return response.text();
                }
                else throw new Error('Ошибка при загрузке базы слов!');
            })
            .then(text => {
                this.words = text.split('\n');
                console.log("Слова загружены!");
            })
            .catch((error)=>{console.log(error)})
    }

    public getWords(){
        return this.words;
    }

    public getNextWord(){
        return this.words[Math.floor(Math.random()*this.words.length)];
    }
}