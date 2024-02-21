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

export { checkResponse };
