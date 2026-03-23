const userColors = new Map<string, number>();
const colors = [
  31,  // vermelho
  33,  // amarelo
  //sistema em cima 
  129, // roxo
  208, // laranja
  15,  // branco
  177, // roxo claro
  214, // laranja claro
  96, // ciano claro
];
let colorIndex = 0;

export const messageFormatter = (nick: string, content: string) => {
  if (!userColors.has(nick)) {
    const color = colors[colorIndex % colors.length]!;
    userColors.set(nick, color);
    colorIndex++;
  }

  const color = userColors.get(nick)!;
    return `\x1b[1m\x1b[38;5;${color}m(${nick}): ${content}\x1b[0m`;
};