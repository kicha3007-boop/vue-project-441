// Обёртки над localStorage. В приватном режиме браузера доступ к нему бросает
// исключение, а сохранённая строка может оказаться испорченной: в обоих случаях
// конструктор продолжает работать, только без сохранения.
export const loadState = (key) => {
  try {
    const raw = globalThis.localStorage.getItem(key);
    return raw === null ? null : JSON.parse(raw);
  } catch {
    return null;
  }
};

export const saveState = (key, state) => {
  try {
    globalThis.localStorage.setItem(key, JSON.stringify(state));
    return true;
  } catch {
    return false;
  }
};
