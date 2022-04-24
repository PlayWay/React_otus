export interface EventButton {
  name: string;
  src: string;
  color: string;
}

export interface TypesEventButton extends EventButton {
  type: number;
}
