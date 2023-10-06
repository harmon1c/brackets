module.exports = function check(str, bracketsConfig) {
  // Создаем пустой стек (для отслеживания скобок)
  const stack = [];
  // Преобразуем конфигурацию скобок в объект для более удобного доступа к парам скобок
  const bracketPairs = Object.fromEntries(bracketsConfig);
  // Создаем множество открывающих скобок для более быстрой проверки, входит ли символ в этот список
  const openBrackets = new Set(Object.keys(bracketPairs));
  // Создаем множество закрывающих скобок для аналогичной проверки
  const closeBrackets = new Set(Object.values(bracketPairs));
  // Проходим по каждому символу в строке
  for (const char of str) {
    if (openBrackets.has(char)) {
      // Если текущий символ - открывающая скобка, проверяем специальные случаи
      if (closeBrackets.has(char) && stack[stack.length - 1] === char) {
        stack.pop(); // Если текущая скобка такая же, как предыдущая, удаляем предыдущую из стека
      } else {
        stack.push(char); // В противном случае добавляем текущую скобку в стек
      }
    } else if (closeBrackets.has(char)) {
      // Если текущий символ - закрывающая скобка, проверяем соответствие с вершиной стека
      const lastBracket = stack.pop();
      if (bracketPairs[lastBracket] !== char) {
        return false; // Несоответствие пары скобок, возвращаем false
      }
    }
  }
  // Если стек пуст, это означает, что все скобки правильно закрыты
  return stack.length === 0;
}

//Изучить работу со стеком, массивы, объекты.
