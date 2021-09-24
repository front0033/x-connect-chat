export interface IError {
  status?: number;
  title: string;
}

export interface IErrorsData {
  items: Array<IError>;
}
