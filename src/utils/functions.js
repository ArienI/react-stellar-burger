function checkResponse(res) {
  if (!res.ok) {
    throw new Error('Ошибка!');
  }
  return res;
}

export { checkResponse };
