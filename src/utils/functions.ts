import { StatusKey } from "./types";

interface ErrorResponse {
  message: string;
}

function checkResponse(res: Response): Promise<any> {
  if (!res.ok) {
    return res.json().then((json: ErrorResponse) => {
      throw new Error(json.message);
    });
  }
  return res.json();
}

const statusTranslations: { [key in StatusKey]: string } = {
  done: 'Выполнен',
  pending: 'Готовится',
  created: 'Создан',
};

function translateStatus(status: string) {
  return statusTranslations[status as StatusKey];
};

export { checkResponse, translateStatus };
