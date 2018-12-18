export const snakify = phrase => phrase.toLowerCase().replace(/\s/g, "-");
export const unSnakify = snakePhrase => snakePhrase.replace(/-/g, " ");