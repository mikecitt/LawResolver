export interface LawDocument extends Document {}

export interface JudgementDocument extends Document {
  law: string;
}

interface Document {
  id: string;
  name: string;
}
