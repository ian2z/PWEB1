//classe weight com vetores de peso
class Weight {
    private scores: number[];

    constructor(scores: number[]) {
        this.scores = scores;
    }

    //get das notas
    public getScores(): number[] {
        return this.scores;
    }
}

//classe answer com o nome e o vetor de resposta do aluno
class Answer {
    private studentName: string;
    private values: string[];

    constructor(studentName: string, values: string[]) {
        this.studentName = studentName;
        this.values = values;
    }

    public getStudentName(): string {
        return this.studentName;
    }

    public getValues(): string[] {
        return this.values;
    }
}

//classe Exam com a estrutura principal
class Exam {
    private weight: Weight;
    private answer: Answer; //gabarito
    private answers: Array<Answer>; //resposta do aluno

    constructor(answer: Answer, weight: Weight) {
        this.answer = answer;
        this.weight = weight;
        this.answers = [];
    }

    public add(exam: Answer): void {
        this.answers.push(exam);
    }

    //metodo para calcular a note do aluno
    private calculateScore(studentAnswer: Answer): number {
        let score = 0;
        const officialAnswers = this.answer.getValues();
        const weights = this.weight.getScores();
        const studentValues = studentAnswer.getValues();

        //percorrendo o gabarito e comparando as respostas
        for (let i = 0; i < officialAnswers.length; i++) {
            if (studentValues[i] === officialAnswers[i]) {
                score += weights[i] || 0;
            }
        }
        return score;
    }

    private getAllScores(): number[] {
        return this.answers.map(exam => this.calculateScore(exam));
    }

    public avg(): number {
        const scores = this.getAllScores();
        if (scores.length === 0) return 0;
        
        const total = scores.reduce((acc, curr) => acc + curr, 0);
        return total / scores.length;
    }

    public min(count: number = 1): number[] {
        return this.getAllScores().sort((a, b) => a - b).slice(0, count);
    }

    public max(count: number = 1): number[] {
        return this.getAllScores().sort((a, b) => b - a).slice(0, count);
    }

    public lt(limit: number): number[] {
        return this.getAllScores().filter(score => score < limit);
    }

    public gt(limit: number): number[] {
        return this.getAllScores().filter(score => score > limit);
    }
}

//criando os pesos
const pesosProva = new Weight([2, 2, 2, 2, 2]);

//criando o gabarito
const gabaritoOficial = new Answer("Gabarito", ["a", "b", "a", "c", "d"]);

//inicializando o sistema de exame
const sistema = new Exam(gabaritoOficial, pesosProva);

//cadastrando a prova dos alunos
const provaAlunoA = new Answer("Aluno A", ["a", "b", "b", "b", "b"]);
const provaAlunoB = new Answer("Aluno B", ["a", "b", "a", "c", "d"]);
const testeIan = new Answer("Ian", ["a", "a", "c", "d", "a"]);
const testeFulano = new Answer("Fulano", ["a", "a", "a", "d", "d"]);

sistema.add(provaAlunoA);
sistema.add(provaAlunoB);
sistema.add(testeIan);
sistema.add(testeFulano);

//testando os resultados
console.log("Média geral:", sistema.avg());
console.log("Nota máxima:", sistema.max(1));
console.log("Nota mínima", sistema.min(1));
console.log("Notas menores que 6:", sistema.lt(6)); 