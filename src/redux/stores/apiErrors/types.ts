export interface IError {
  name: string;
  status?: number;
  title: string;
  description: string;
}

export interface IErrorsData {
  items: Array<IError>;
}
