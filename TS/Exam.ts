//definindo os tipos para as questões, respostas e pesos
export type Answer = Record<string, string>;
export type Weight = Record<string, number>;

class Exam {
    private weight: Weight;
    private answer: Answer;
    private exams: Array<Answer>;

    constructor(answer: Answer, weight: Weight) {
        this.answer = answer;
        this.weight = weight;
        this.exams = []; //inicializando a lista de provas
    }

    //metodo utilizado para adicionar a prova de uma aluno na lista
    public add(exam: Answer): void {
        this.exams.push(exam);
    }

    private calculateScore(studentAnswer: Answer): number {
        let score = 0;
        //percorrendo as questoes do gabarito
        for (const question in this.answer) {
            //somando o peso, se a questao for correta
            if (studentAnswer[question] === this.answer[question]) {
                score += this.weight[question] || 0;
            }
        }
        return score;
    }

    //get de todas as notas
    private getAllScores(): number[] {
        return this.exams.map(exam => this.calculateScore(exam));
    }

    //metodo avg que retorna a media de todas as notas
    public avg(): number {
        const scores = this.getAllScores();
        //evitando a divisao por zero
        if (scores.length === 0) return 0; 

        const total = scores.reduce((acc, current) => acc + current, 0);
        return total / scores.length;
    }

    //retorna a contagem das menores notas, 1 se nao informado
    public min(count: number = 1): number[] {
        const scores = this.getAllScores();
        //ordenando o array de notas em forma crescente
        return scores.sort((a, b) => a -b).slice(0, count);
    }

    //retorna contagem das maiores notas, 1 se nao informado
    public max(count: number = 1): number[] {
        const scores = this.getAllScores();
        //ordenando o array de notas em forma decescente
        return scores.sort((a, b) => b - a).slice(0, count);
    }

    //notas menores que o limite
    public lt(limit: number): number[] {
        return this.getAllScores().filter(score => score < limit);
    }

    //notas maiores que o limite
    public gt(limit: number): number[] {
        return this.getAllScores().filter(score => score > limit);
    }
}

// --- TESTE ---

// 1. Criar os pesos e o gabarito conforme a primeira imagem
const pesos: Weight = { "1": 2, "2": 2, "3": 2, "4": 2, "5": 2 };
const gabarito: Answer = { "1": "a", "2": "b", "3": "a", "4": "c", "5": "d" };

// 2. Instanciar a classe
const sistemaAvaliacao = new Exam(gabarito, pesos);

// 3. Criar a prova do aluno (que deveria tirar nota 4.0)
const provaAluno: Answer = { "1": "a", "2": "b", "3": "b", "4": "b", "5": "b" };

// 4. Adicionar a prova e testar
sistemaAvaliacao.add(provaAluno);

console.log("Média das provas:", sistemaAvaliacao.avg());
console.log("Nota máxima:", sistemaAvaliacao.max());