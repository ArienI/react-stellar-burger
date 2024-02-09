function checkResponse(res) {
  if (!res.ok) {
    return res.json().then(json => {
      throw new Error(json.message);
    });
  }
  return res.json();
}

export { checkResponse };
