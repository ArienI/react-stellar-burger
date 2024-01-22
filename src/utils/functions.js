function checkResponse(res) {
  if (!res.ok) {
    throw new Error('Ошибка!');
  }
  return res.json();
}

export { checkResponse };
